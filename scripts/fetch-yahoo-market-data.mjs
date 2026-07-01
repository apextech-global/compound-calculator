import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultAssets = [
  {
    yahooSymbol: "CSPX.L",
    dataKey: "cspx-l",
    name: "iShares Core S&P 500 UCITS ETF",
  },
  {
    yahooSymbol: "VWRA.L",
    dataKey: "vwra-l",
    name: "Vanguard FTSE All-World UCITS ETF",
  },
  {
    yahooSymbol: "IWDA.L",
    dataKey: "iwda-l",
    name: "iShares Core MSCI World UCITS ETF",
  },
  {
    yahooSymbol: "0050.TW",
    dataKey: "0050-tw",
    name: "Yuanta Taiwan Top 50 ETF",
  },
  {
    yahooSymbol: "1155.KL",
    dataKey: "1155-kl",
    name: "Maybank",
  },
  {
    yahooSymbol: "ES3.SI",
    dataKey: "es3-si",
    name: "SPDR Straits Times Index ETF",
  },
  {
    yahooSymbol: "2800.HK",
    dataKey: "2800-hk",
    name: "Tracker Fund of Hong Kong",
  },
  {
    yahooSymbol: "QQQ",
    dataKey: "qqq",
    name: "Invesco QQQ Trust",
  },
];

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "data", "raw-market-data");
const requestHeaders = {
  "user-agent": "Mozilla/5.0",
  accept: "application/json,text/plain,*/*",
  "accept-language": "en-US,en;q=0.9",
};

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    symbols: null,
    keys: null,
    delay: 2000,
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
    }
  }

  return options;
}

function selectAssets({ symbols, keys }) {
  if (symbols?.length) {
    const symbolSet = new Set(symbols);

    return defaultAssets.filter((asset) =>
      symbolSet.has(asset.yahooSymbol.toUpperCase())
    );
  }

  if (keys?.length) {
    const keySet = new Set(keys);

    return defaultAssets.filter((asset) => keySet.has(asset.dataKey));
  }

  return defaultAssets;
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

  for (const host of ["query1.finance.yahoo.com", "query2.finance.yahoo.com"]) {
    try {
      const response = await fetch(getYahooChartUrl(asset.yahooSymbol, host), {
        headers: {
          ...requestHeaders,
          referer: `https://finance.yahoo.com/quote/${asset.yahooSymbol}/history/`,
        },
      });

      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status} from ${host}`);
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

  throw lastError ?? new Error("Yahoo Finance request failed.");
}

async function saveAsset(asset) {
  const rows = await fetchAsset(asset);
  const outputPath = path.join(outputDir, `${asset.dataKey}.csv`);

  await writeFile(outputPath, `${toCsv(rows)}\n`, "utf8");

  console.log(`[ok] ${asset.name}`);
  console.log(`     yahoo symbol: ${asset.yahooSymbol}`);
  console.log(`     dataKey: ${asset.dataKey}`);
  console.log(`     daily rows saved: ${rows.length}`);
  console.log(`     output file path: ${path.relative(rootDir, outputPath)}`);

  return true;
}

async function main() {
  const options = parseArgs();
  const assets = selectAssets(options);

  await mkdir(outputDir, { recursive: true });

  if (assets.length === 0) {
    console.warn("[warn] No matching assets selected.");
    return;
  }

  let successCount = 0;

  for (let index = 0; index < assets.length; index += 1) {
    const asset = assets[index];

    try {
      const saved = await saveAsset(asset);

      if (saved) {
        successCount += 1;
      }
    } catch (error) {
      console.error(`[fail] ${asset.name}`);
      console.error(`       yahoo symbol: ${asset.yahooSymbol}`);
      console.error(`       dataKey: ${asset.dataKey}`);
      console.error(
        `       reason: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    if (index < assets.length - 1 && options.delay > 0) {
      await sleep(options.delay);
    }
  }

  console.log(
    `Yahoo raw data fetch complete: ${successCount}/${assets.length} assets saved.`
  );
  console.log("Next run: npm run import-market-data");
}

main();
