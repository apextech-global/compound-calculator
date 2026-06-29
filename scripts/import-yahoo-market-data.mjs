import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const symbols = ["VOO", "SPY", "QQQ", "AAPL", "TSLA", "NVDA"];
const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputDir = path.join(rootDir, "data", "raw-market-data");
const outputDir = path.join(rootDir, "public", "market-data");

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === "\"" && nextCharacter === "\"") {
      current += "\"";
      index += 1;
      continue;
    }

    if (character === "\"") {
      inQuotes = !inQuotes;
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());

  return values;
}

function isValidDate(value) {
  return value.trim() !== "" && !Number.isNaN(Date.parse(value));
}

function parsePrice(value) {
  const price = Number(value);

  return Number.isFinite(price) && price > 0 ? price : null;
}

function parseYahooDailyCsv(csv) {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (rows.length <= 1) {
    return [];
  }

  const [header, ...dataRows] = rows;
  const headers = parseCsvLine(header).map((item) => item.toLowerCase());
  const dateIndex = headers.indexOf("date");
  const closeIndex = headers.indexOf("close");
  const adjustedCloseIndex = headers.indexOf("adj close");

  if (dateIndex === -1 || closeIndex === -1) {
    throw new Error("CSV is missing required Date and Close columns.");
  }

  return dataRows
    .map((row) => {
      const columns = parseCsvLine(row);
      const date = columns[dateIndex] ?? "";
      const adjustedClose =
        adjustedCloseIndex === -1
          ? null
          : parsePrice(columns[adjustedCloseIndex] ?? "");
      const close = adjustedClose ?? parsePrice(columns[closeIndex] ?? "");

      if (!isValidDate(date) || close === null) {
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
    monthlyRows.set(row.date.slice(0, 7), row);
  }

  return [...monthlyRows.values()];
}

function formatClose(value) {
  return Number(value.toFixed(6)).toString();
}

async function importSymbol(symbol) {
  const inputPath = path.join(inputDir, `${symbol.toLowerCase()}.csv`);
  const outputPath = path.join(outputDir, `${symbol.toLowerCase()}.csv`);

  let csv;

  try {
    csv = await readFile(inputPath, "utf8");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      const code = error.code;

      if (code === "ENOENT") {
        console.warn(
          `[warn] ${symbol}: missing ${path.relative(process.cwd(), inputPath)}`
        );
        return false;
      }
    }

    throw error;
  }

  const dailyRows = parseYahooDailyCsv(csv);
  const monthlyRows = toMonthlyCloses(dailyRows);

  if (monthlyRows.length === 0) {
    throw new Error("No valid monthly rows were produced.");
  }

  const output = [
    "date,close",
    ...monthlyRows.map((row) => `${row.date},${formatClose(row.close)}`),
  ].join("\n");

  await writeFile(outputPath, `${output}\n`, "utf8");

  console.log(
    `[ok] ${symbol}: imported ${monthlyRows.length} monthly closes to ${path.relative(
      process.cwd(),
      outputPath
    )}`
  );

  return true;
}

async function main() {
  await mkdir(inputDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });

  let successCount = 0;

  for (const symbol of symbols) {
    try {
      const imported = await importSymbol(symbol);

      if (imported) {
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
    `Yahoo market data import complete: ${successCount}/${symbols.length} tickers imported.`
  );
}

main();
