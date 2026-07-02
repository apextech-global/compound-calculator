import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const instrumentsPath = path.join(rootDir, "lib", "instruments.ts");
const outputDir = path.join(rootDir, "data", "raw-market-data");
const publicMarketDataDir = path.join(rootDir, "public", "market-data");
const statusFilePath = path.join(rootDir, "data", "market-data-status.json");
const providerName = "Yahoo Finance chart API";
const requestHeaders = {
  "user-agent": "Mozilla/5.0",
  accept: "application/json,text/plain,*/*",
  "accept-language": "en-US,en;q=0.9",
};
const providers = [
  {
    name: providerName,
    hosts: ["query1.finance.yahoo.com", "query2.finance.yahoo.com"],
  },
];

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    symbols: null,
    keys: null,
    delay: 2000,
    missingOnly: false,
  };

  for (const arg of args) {
    if (arg.startsWith("--symbols=")) {
      options.symbols = arg
        .slice("--symbols=".length)
        .split(",")
        .map((value) => value.trim().toUpperCase())
        .filter(Boolean);
    } else if (arg.startsWith("--keys=")) {
      options.keys = arg
        .slice("--keys=".length)
        .split(",")
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);
    } else if (arg.startsWith("--delay=")) {
      const delay = Number(arg.slice("--delay=".length));

      if (Number.isFinite(delay) && delay >= 0) {
        options.delay = delay;
      }
    } else if (arg === "--missing-only") {
      options.missingOnly = true;
    }
  }

  return options;
}

function getStringProperty(block, propertyName) {
  const match = block.match(new RegExp(`${propertyName}:\\s*"([^"]+)"`, "m"));

  return match?.[1] ?? null;
}

async function loadAssets() {
  const source = await readFile(instrumentsPath, "utf8");
  const objects = source.match(/\{\n[\s\S]*?\n  \}/g) ?? [];

  return objects
    .map((block) => {
      const symbol = getStringProperty(block, "symbol");
      const displaySymbol = getStringProperty(block, "displaySymbol");
      const name = getStringProperty(block, "name");
      const dataKey = getStringProperty(block, "dataKey");
      const country = getStringProperty(block, "country");
      const assetType = getStringProperty(block, "assetType");
      const currency = getStringProperty(block, "currency");

      if (!symbol || !displaySymbol || !name || !dataKey) {
        return null;
      }

      return {
        yahooSymbol: getYahooSymbol({ symbol }),
        symbol,
        displaySymbol,
        dataKey,
        name,
        country,
        assetType,
        currency,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.dataKey.localeCompare(b.dataKey));
}

function getYahooSymbol(asset) {
  return asset.symbol?.trim() || null;
}

async function hasPublicHistoricalCsv(dataKey) {
  const csvPath = path.join(publicMarketDataDir, `${dataKey}.csv`);

  try {
    const fileStat = await stat(csvPath);

    return fileStat.size > 0;
  } catch {
    return false;
  }
}

async function selectAssets(assets, { symbols, keys, missingOnly }) {
  let selectedAssets = assets;

  if (symbols?.length) {
    const symbolSet = new Set(symbols);

    selectedAssets = selectedAssets.filter((asset) =>
      symbolSet.has(asset.yahooSymbol?.toUpperCase()) ||
      symbolSet.has(asset.symbol.toUpperCase()) ||
      symbolSet.has(asset.displaySymbol.toUpperCase())
    );
  } else if (keys?.length) {
    const keySet = new Set(keys);

    selectedAssets = selectedAssets.filter((asset) => keySet.has(asset.dataKey));
  }

  if (!missingOnly) {
    return selectedAssets;
  }

  const missingAssets = [];

  for (const asset of selectedAssets) {
    if (!(await hasPublicHistoricalCsv(asset.dataKey))) {
      missingAssets.push(asset);
    }
  }

  return missingAssets;
}

function getYahooChartUrl(symbol, host) {
  const period2 = Math.floor(Date.now() / 1000);
  const params = new URLSearchParams({
    period1: "0",
    period2: String(period2),
    interval: "1d",
    events: "history",
    includeAdjustedClose: "true",
  });

  return `https://${host}/v8/finance/chart/${encodeURIComponent(symbol)}?${params}`;
}

function toDateString(timestamp) {
  const date = new Date(timestamp * 1000);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

function parsePrice(value) {
  return Number.isFinite(value) ? value : null;
}

function isValidRows(rows) {
  return (
    Array.isArray(rows) &&
    rows.length > 0 &&
    rows.every(
      (row) =>
        row &&
        typeof row.date === "string" &&
        !Number.isNaN(Date.parse(row.date)) &&
        Number.isFinite(row.close) &&
        row.close > 0
    )
  );
}

function formatNumber(value) {
  return value === null ? "" : Number(value.toFixed(6)).toString();
}

function parseYahooChartData(payload) {
  const result = payload?.chart?.result?.[0];
  const error = payload?.chart?.error;

  if (error) {
    throw new Error(error.description ?? "Yahoo chart API returned an error.");
  }

  if (!result) {
    throw new Error("Yahoo chart response is missing result data.");
  }

  const timestamps = Array.isArray(result.timestamp) ? result.timestamp : [];
  const quote = result.indicators?.quote?.[0] ?? {};
  const adjustedClose = result.indicators?.adjclose?.[0]?.adjclose ?? [];

  return timestamps
    .map((timestamp, index) => {
      const date = toDateString(timestamp);
      const open = parsePrice(quote.open?.[index]);
      const high = parsePrice(quote.high?.[index]);
      const low = parsePrice(quote.low?.[index]);
      const close = parsePrice(quote.close?.[index]);
      const adjClose = parsePrice(adjustedClose[index]) ?? close;
      const volume = Number.isFinite(quote.volume?.[index])
        ? quote.volume[index]
        : null;

      if (!date || close === null) {
        return null;
      }

      return { date, open, high, low, close, adjClose, volume };
    })
    .filter(Boolean)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

function toCsv(rows) {
  return [
    "Date,Open,High,Low,Close,Adj Close,Volume",
    ...rows.map((row) =>
      [
        row.date,
        formatNumber(row.open),
        formatNumber(row.high),
        formatNumber(row.low),
        formatNumber(row.close),
        formatNumber(row.adjClose),
        row.volume === null ? "" : String(row.volume),
      ].join(",")
    ),
  ].join("\n");
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchAsset(asset) {
  let lastError = null;

  for (const provider of providers) {
    for (const host of provider.hosts) {
      try {
        const response = await fetch(getYahooChartUrl(asset.yahooSymbol, host), {
          headers: {
            ...requestHeaders,
            referer: `https://finance.yahoo.com/quote/${asset.yahooSymbol}/history/`,
          },
        });

        if (!response.ok) {
          lastError = new Error(
            `${provider.name} ${host} returned HTTP ${response.status}`
          );
          continue;
        }

        const rows = parseYahooChartData(await response.json());

        if (rows.length === 0) {
          throw new Error("No valid daily rows returned.");
        }

        return rows;
      } catch (error) {
        lastError = error;
      }
    }
  }

  throw lastError ?? new Error("Yahoo Finance request failed.");
}

async function readStatusFile() {
  try {
    return JSON.parse(await readFile(statusFilePath, "utf8"));
  } catch {
    return {};
  }
}

async function writeStatusFile(status) {
  const sortedStatus = Object.fromEntries(
    Object.entries(status).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  );

  await mkdir(path.dirname(statusFilePath), { recursive: true });
  await writeFile(
    statusFilePath,
    `${JSON.stringify(sortedStatus, null, 2)}\n`,
    "utf8"
  );
}

function createStatusEntry(asset, status, overrides = {}) {
  return {
    symbol: asset.yahooSymbol ?? asset.symbol,
    name: asset.name,
    source: providerName,
    lastSuccessfulFetchAt: null,
    rowsSaved: 0,
    status,
    ...overrides,
  };
}

async function saveAsset(asset) {
  if (!asset.yahooSymbol) {
    throw new Error("No Yahoo symbol mapping. Manual CSV import required.");
  }

  const rows = await fetchAsset(asset);
  const outputPath = path.join(outputDir, `${asset.dataKey}.csv`);

  if (!isValidRows(rows)) {
    throw new Error("Fetched data had no valid rows. Existing raw CSV was kept.");
  }

  await writeFile(outputPath, `${toCsv(rows)}\n`, "utf8");

  console.log(`[ok] ${asset.name}`);
  console.log(`     yahoo symbol: ${asset.yahooSymbol}`);
  console.log(`     dataKey: ${asset.dataKey}`);
  console.log(`     daily rows saved: ${rows.length}`);
  console.log(`     output file path: ${path.relative(rootDir, outputPath)}`);

  return rows.length;
}

async function main() {
  const options = parseArgs();
  const defaultAssets = await loadAssets();
  const assets = await selectAssets(defaultAssets, options);

  await mkdir(outputDir, { recursive: true });

  if (assets.length === 0) {
    console.warn("[warn] No matching assets selected.");
    return;
  }

  let successCount = 0;
  const status = await readStatusFile();
  const selectedDataKeys = new Set(assets.map((asset) => asset.dataKey));

  for (const asset of defaultAssets) {
    if (!status[asset.dataKey]) {
      status[asset.dataKey] = createStatusEntry(asset, "skipped");
    }

    if (!selectedDataKeys.has(asset.dataKey)) {
      status[asset.dataKey] = {
        ...createStatusEntry(asset, "skipped"),
        ...status[asset.dataKey],
        symbol: asset.yahooSymbol ?? asset.symbol,
        name: asset.name,
        source: providerName,
        status: "skipped",
      };
    }
  }

  for (let index = 0; index < assets.length; index += 1) {
    const asset = assets[index];

    if (!asset.yahooSymbol) {
      console.warn(`[skip] ${asset.name}`);
      console.warn(`       display symbol: ${asset.displaySymbol}`);
      console.warn(`       dataKey: ${asset.dataKey}`);
      console.warn("       reason: no Yahoo symbol mapping; manual CSV required.");
      status[asset.dataKey] = createStatusEntry(asset, "skipped", {
        ...status[asset.dataKey],
        status: "skipped",
        lastError: "No Yahoo symbol mapping. Manual CSV import required.",
      });
      continue;
    }

    try {
      const rowsSaved = await saveAsset(asset);

      successCount += 1;
      status[asset.dataKey] = createStatusEntry(asset, "success", {
        lastSuccessfulFetchAt: new Date().toISOString(),
        rowsSaved,
      });
    } catch (error) {
      const lastError = error instanceof Error ? error.message : String(error);
      console.error(`[fail] ${asset.name}`);
      console.error(`       yahoo symbol: ${asset.yahooSymbol}`);
      console.error(`       dataKey: ${asset.dataKey}`);
      console.error(`       reason: ${lastError}`);
      console.error("       existing raw CSV was not overwritten.");

      status[asset.dataKey] = createStatusEntry(asset, "failed", {
        ...status[asset.dataKey],
        symbol: asset.yahooSymbol,
        name: asset.name,
        source: providerName,
        status: "failed",
        lastError,
      });
    }

    if (index < assets.length - 1 && options.delay > 0) {
      await sleep(options.delay);
    }
  }

  console.log(
    `Yahoo raw data fetch complete: ${successCount}/${assets.length} assets saved.`
  );
  await writeStatusFile(status);
  console.log(
    `Market data status saved: ${path.relative(rootDir, statusFilePath)}`
  );
  console.log("Next run: npm run import-market-data");
}

main();
