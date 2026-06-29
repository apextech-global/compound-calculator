import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const symbols = ["VOO", "SPY", "QQQ", "AAPL", "TSLA", "NVDA"];
const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "public", "market-data");
const requestHeaders = {
  "user-agent": "Mozilla/5.0",
  accept: "application/json,text/plain,*/*",
  "accept-language": "en-US,en;q=0.9",
};

function getYahooChartUrl(symbol, host) {
  const period2 = Math.floor(Date.now() / 1000);
  const params = new URLSearchParams({
    period1: "0",
    period2: String(period2),
    interval: "1d",
    events: "history",
    includeAdjustedClose: "true",
  });

  return `https://${host}/v8/finance/chart/${symbol}?${params}`;
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

async function updateSymbol(symbol) {
  let response;

  for (const host of ["query1.finance.yahoo.com", "query2.finance.yahoo.com"]) {
    response = await fetch(getYahooChartUrl(symbol, host), {
      headers: {
        ...requestHeaders,
        referer: `https://finance.yahoo.com/quote/${symbol}/history/`,
      },
    });

    if (response.ok) {
      break;
    }
  }

  if (!response?.ok) {
    throw new Error(`HTTP ${response.status} from Yahoo Finance.`);
  }

  const dailyRows = parseYahooChartData(await response.json());
  const monthlyRows = toMonthlyCloses(dailyRows);

  if (monthlyRows.length === 0) {
    throw new Error("No valid monthly rows were produced.");
  }

  const output = [
    "date,close",
    ...monthlyRows.map((row) => `${row.date},${formatClose(row.close)}`),
  ].join("\n");

  const outputPath = path.join(outputDir, `${symbol.toLowerCase()}.csv`);
  await writeFile(outputPath, `${output}\n`, "utf8");

  console.log(
    `[ok] ${symbol}: saved ${monthlyRows.length} monthly closes to ${path.relative(
      process.cwd(),
      outputPath
    )}`
  );

  return true;
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  let successCount = 0;

  for (const symbol of symbols) {
    try {
      const updated = await updateSymbol(symbol);

      if (updated) {
        successCount += 1;
      }
    } catch (error) {
      console.error(
        `[fail] ${symbol}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  console.log(
    `Yahoo chart data update complete: ${successCount}/${symbols.length} tickers updated.`
  );

  if (successCount === 0) {
    process.exitCode = 1;
  }
}

main();
