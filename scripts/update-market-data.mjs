import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const symbols = ["VOO", "SPY", "QQQ", "AAPL", "TSLA", "NVDA"];
const outputDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "market-data"
);
const requestHeaders = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  accept: "text/csv,application/csv,text/plain,*/*",
  "accept-language": "en-US,en;q=0.9",
};
const cookies = new Map();

function getStooqUrl(symbol) {
  return `https://stooq.com/q/d/l/?s=${symbol.toLowerCase()}.us&i=d`;
}

function getCookieHeader() {
  return [...cookies].map(([key, value]) => `${key}=${value}`).join("; ");
}

function storeCookies(headers) {
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
        cookies.set(
          pair.slice(0, separatorIndex).trim(),
          pair.slice(separatorIndex + 1).trim()
        );
      }
    }
  }
}

async function stooqFetch(url, init = {}) {
  const cookie = getCookieHeader();
  const response = await fetch(url, {
    ...init,
    headers: {
      ...requestHeaders,
      ...(cookie ? { cookie } : {}),
      ...init.headers,
    },
  });

  storeCookies(response.headers);

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
    throw new Error("CSV is missing required Date and Close columns.");
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

function toMonthlyCloses(dailyRows) {
  const monthlyRows = new Map();

  for (const row of dailyRows) {
    const monthKey = row.date.slice(0, 7);
    monthlyRows.set(monthKey, row);
  }

  return [...monthlyRows.values()];
}

function formatClose(value) {
  return Number(value.toFixed(6)).toString();
}

async function updateSymbol(symbol) {
  const url = getStooqUrl(symbol);
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

  const dailyRows = parseDailyCsv(csv);
  const monthlyRows = toMonthlyCloses(dailyRows);

  if (monthlyRows.length === 0) {
    throw new Error("No valid monthly rows were produced.");
  }

  const output = [
    "date,close",
    ...monthlyRows.map((row) => `${row.date},${formatClose(row.close)}`),
  ].join("\n");

  const filePath = path.join(outputDir, `${symbol.toLowerCase()}.csv`);
  await writeFile(filePath, `${output}\n`, "utf8");

  console.log(
    `[ok] ${symbol}: saved ${monthlyRows.length} monthly closes to ${path.relative(
      process.cwd(),
      filePath
    )}`
  );
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  let successCount = 0;

  for (const symbol of symbols) {
    try {
      await updateSymbol(symbol);
      successCount += 1;
    } catch (error) {
      console.error(
        `[fail] ${symbol}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  console.log(
    `Market data update complete: ${successCount}/${symbols.length} tickers updated.`
  );

  if (successCount === 0) {
    process.exitCode = 1;
  }
}

main();
