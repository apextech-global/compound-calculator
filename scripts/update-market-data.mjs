import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const instrumentsPath = path.join(rootDir, "lib", "instruments.ts");
const outputDir = path.join(rootDir, "public", "market-data");

const prioritySymbols = [
  "VOO",
  "SPY",
  "QQQ",
  "CSPX.L",
  "VWRA.L",
  "IWDA.L",
  "0050.TW",
  "0056.TW",
  "1155.KL",
  "1023.KL",
  "1295.KL",
  "ES3.SI",
  "2800.HK",
];

const requestHeaders = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  accept: "application/json,text/plain,*/*",
  "accept-language": "en-US,en;q=0.9",
};
const stooqCookies = new Map();
let yahooRateLimited = false;
let stooqFailureCount = 0;
let stooqUnavailable = false;
const requestTimeoutMs = 5_000;
const maxStooqFailures = 3;

function getStringProperty(block, propertyName) {
  const match = block.match(
    new RegExp(`${propertyName}:\\s*"([^"]+)"`, "m")
  );

  return match?.[1] ?? null;
}

async function loadInstruments() {
  const source = await readFile(instrumentsPath, "utf8");
  const objects = source.match(/\{\n[\s\S]*?\n  \}/g) ?? [];

  return objects
    .map((block) => {
      const symbol = getStringProperty(block, "symbol");
      const dataKey = getStringProperty(block, "dataKey");
      const currency = getStringProperty(block, "currency");
      const exchange = getStringProperty(block, "exchange");

      if (!symbol || !dataKey || !currency || !exchange) {
        return null;
      }

      return { symbol, dataKey, currency, exchange };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const aPriority = prioritySymbols.indexOf(a.symbol);
      const bPriority = prioritySymbols.indexOf(b.symbol);

      if (aPriority !== -1 || bPriority !== -1) {
        return (
          (aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority) -
          (bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority)
        );
      }

      return a.symbol.localeCompare(b.symbol);
    });
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

  return `https://${host}/v8/finance/chart/${encodeURIComponent(
    symbol
  )}?${params}`;
}

function toDateString(timestamp) {
  const date = new Date(timestamp * 1000);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

function parsePrice(value) {
  return Number.isFinite(value) && value > 0 ? value : null;
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
  const close = quote.close ?? [];

  return timestamps
    .map((timestamp, index) => {
      const date = toDateString(timestamp);
      const price =
        parsePrice(adjustedClose[index]) ?? parsePrice(close[index]);

      if (!date || price === null) {
        return null;
      }

      return { date, close: price };
    })
    .filter(Boolean)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

function toMonthlyCloses(dailyRows) {
  const monthlyRows = new Map();

  for (const row of dailyRows) {
    monthlyRows.set(row.date.slice(0, 7), row);
  }

  return [...monthlyRows.values()];
}

function formatClose(value) {
  return Number(value.toFixed(6)).toString();
}

function isValidDate(value) {
  return value.trim() !== "" && !Number.isNaN(Date.parse(value));
}

function parseDailyCsv(csv) {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (rows.length <= 1) {
    return [];
  }

  const [header, ...dataRows] = rows;
  const headers = header.split(",").map((item) => item.trim().toLowerCase());
  const dateIndex = headers.indexOf("date");
  const closeIndex = headers.indexOf("close");

  if (dateIndex === -1 || closeIndex === -1) {
    throw new Error("CSV is missing required date and close columns.");
  }

  return dataRows
    .map((row) => {
      const columns = row.split(",").map((item) => item.trim());
      const date = columns[dateIndex] ?? "";
      const close = Number(columns[closeIndex]);

      if (!isValidDate(date) || !Number.isFinite(close) || close <= 0) {
        return null;
      }

      return { date, close };
    })
    .filter(Boolean)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

async function fetchYahooDailyRows(instrument) {
  if (yahooRateLimited) {
    throw new Error("Yahoo Finance is rate limited for this run.");
  }

  let lastStatus = "no response";

  for (const host of ["query1.finance.yahoo.com", "query2.finance.yahoo.com"]) {
    const response = await fetch(getYahooChartUrl(instrument.symbol, host), {
      signal: AbortSignal.timeout(requestTimeoutMs),
      headers: {
        ...requestHeaders,
        referer: `https://finance.yahoo.com/quote/${instrument.symbol}/history/`,
      },
    });

    lastStatus = `HTTP ${response.status} from ${host}`;

    if (response.status === 429) {
      yahooRateLimited = true;
    }

    if (response.ok) {
      return parseYahooChartData(await response.json());
    }
  }

  throw new Error(lastStatus);
}

function getStooqCookieHeader() {
  return [...stooqCookies]
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");
}

function storeStooqCookies(headers) {
  let values = [];

  if (typeof headers.getSetCookie === "function") {
    values = headers.getSetCookie();
  }

  if (values.length === 0) {
    const setCookie = headers.get("set-cookie");

    if (setCookie) {
      values = [setCookie];
    }
  }

  for (const value of values) {
    for (const cookie of value.split(/,(?=[^;,]+=)/)) {
      const [pair] = cookie.split(";");
      const separatorIndex = pair.indexOf("=");

      if (separatorIndex > 0) {
        stooqCookies.set(
          pair.slice(0, separatorIndex).trim(),
          pair.slice(separatorIndex + 1).trim()
        );
      }
    }
  }
}

async function stooqFetch(url, init = {}) {
  const cookie = getStooqCookieHeader();
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(requestTimeoutMs),
    headers: {
      ...requestHeaders,
      accept: "text/csv,application/csv,text/plain,*/*",
      ...(cookie ? { cookie } : {}),
      ...init.headers,
    },
  });

  storeStooqCookies(response.headers);

  return response;
}

function solveStooqChallenge(html) {
  const challengeMatch = html.match(/const c="([^"]+)",d=(\d+)/);

  if (!challengeMatch) {
    return null;
  }

  const [, challenge, difficulty] = challengeMatch;
  const prefix = "0".repeat(Number(difficulty));
  let nonce = 0;

  while (
    !createHash("sha256")
      .update(`${challenge}${nonce}`)
      .digest("hex")
      .startsWith(prefix)
  ) {
    nonce += 1;
  }

  return { challenge, nonce };
}

async function verifyStooqBrowser(url, html) {
  const solution = solveStooqChallenge(html);

  if (!solution) {
    return false;
  }

  const response = await stooqFetch("https://stooq.com/__verify", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://stooq.com",
      referer: url,
    },
    body: new URLSearchParams({
      c: solution.challenge,
      n: String(solution.nonce),
    }),
  });

  return response.ok;
}

function getStooqSymbol(symbol) {
  const lowerSymbol = symbol.toLowerCase();

  if (lowerSymbol.endsWith(".l")) {
    return lowerSymbol.replace(/\.l$/, ".uk");
  }

  if (lowerSymbol.endsWith(".kl")) {
    return lowerSymbol.replace(/\.kl$/, ".my");
  }

  if (lowerSymbol.endsWith(".si")) {
    return lowerSymbol.replace(/\.si$/, ".sg");
  }

  if (lowerSymbol.endsWith(".t")) {
    return lowerSymbol.replace(/\.t$/, ".jp");
  }

  if (lowerSymbol.includes(".")) {
    return lowerSymbol;
  }

  return `${lowerSymbol}.us`;
}

async function fetchStooqDailyRows(instrument) {
  if (stooqUnavailable) {
    throw new Error("Stooq is unavailable for this run.");
  }

  const stooqSymbol = getStooqSymbol(instrument.symbol);
  const url = `https://stooq.com/q/d/l/?s=${stooqSymbol}&i=d`;
  let response = await stooqFetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Stooq.`);
  }

  let csv = await response.text();

  if (csv.startsWith("<!DOCTYPE html>")) {
    const verified = await verifyStooqBrowser(url, csv);

    if (verified) {
      response = await stooqFetch(url, {
        headers: {
          referer: url,
        },
      });
      csv = await response.text();
    }
  }

  if (csv.startsWith("<!DOCTYPE html>") || csv.includes("Access denied")) {
    throw new Error("Stooq did not return CSV data.");
  }

  return parseDailyCsv(csv);
}

async function fetchDailyRows(instrument) {
  try {
    const rows = await fetchYahooDailyRows(instrument);
    return { rows, source: "Yahoo Finance" };
  } catch (yahooError) {
    try {
      const rows = await fetchStooqDailyRows(instrument);
      return { rows, source: "Stooq" };
    } catch (stooqError) {
      stooqFailureCount += 1;

      if (stooqFailureCount >= maxStooqFailures) {
        stooqUnavailable = true;
      }

      throw new Error(
        `Yahoo: ${
          yahooError instanceof Error ? yahooError.message : String(yahooError)
        }; Stooq: ${
          stooqError instanceof Error ? stooqError.message : String(stooqError)
        }`
      );
    }
  }
}

async function updateInstrument(instrument) {
  const { rows: dailyRows, source } = await fetchDailyRows(instrument);
  const monthlyRows = toMonthlyCloses(dailyRows);

  if (monthlyRows.length === 0) {
    throw new Error("No valid monthly rows were produced.");
  }

  const output = [
    "date,close",
    ...monthlyRows.map((row) => `${row.date},${formatClose(row.close)}`),
  ].join("\n");

  const outputPath = path.join(outputDir, `${instrument.dataKey}.csv`);
  await writeFile(outputPath, `${output}\n`, "utf8");

  console.log(
    `[ok] ${instrument.symbol} (${instrument.exchange}, ${instrument.currency}, ${source}): saved ${monthlyRows.length} monthly closes to ${path.relative(
      process.cwd(),
      outputPath
    )}`
  );

  return true;
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const instruments = await loadInstruments();

  if (instruments.length === 0) {
    throw new Error("No instruments found in lib/instruments.ts.");
  }

  let successCount = 0;

  console.log(`Updating market data for ${instruments.length} instruments...`);
  console.log(`Priority instruments first: ${prioritySymbols.join(", ")}`);

  for (const instrument of instruments) {
    try {
      const updated = await updateInstrument(instrument);

      if (updated) {
        successCount += 1;
      }
    } catch (error) {
      console.warn(
        `[warn] ${instrument.symbol} (${instrument.exchange}, ${instrument.currency}): ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  console.log(
    `Market data update complete: ${successCount}/${instruments.length} instruments updated.`
  );
}

main().catch((error) => {
  console.error(
    `[fatal] ${error instanceof Error ? error.message : String(error)}`
  );
  process.exitCode = 1;
});
