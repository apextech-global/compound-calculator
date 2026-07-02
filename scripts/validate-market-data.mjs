import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const marketDataDir = path.join(rootDir, "public", "market-data");

function parseRow(line) {
  const [date = "", close = ""] = line.split(",").map((value) => value.trim());
  const price = Number(close);

  return {
    date,
    close: price,
    valid:
      date !== "" &&
      !Number.isNaN(Date.parse(date)) &&
      Number.isFinite(price) &&
      price > 0,
  };
}

async function validateFile(fileName) {
  const filePath = path.join(marketDataDir, fileName);
  const csv = await readFile(filePath, "utf8");
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    throw new Error("file has no data rows");
  }

  if (lines[0].toLowerCase() !== "date,close") {
    throw new Error("header must be date,close");
  }

  const rows = lines.slice(1).map(parseRow);

  if (rows.some((row) => !row.valid)) {
    throw new Error("file contains invalid dates or prices");
  }

  for (let index = 1; index < rows.length; index += 1) {
    if (Date.parse(rows[index].date) < Date.parse(rows[index - 1].date)) {
      throw new Error("dates are not sorted ascending");
    }
  }

  return rows.length;
}

async function main() {
  const files = (await readdir(marketDataDir))
    .filter((file) => file.toLowerCase().endsWith(".csv"))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    throw new Error("No public market data CSV files found.");
  }

  let validCount = 0;

  for (const file of files) {
    const rowCount = await validateFile(file);
    validCount += 1;
    console.log(`[ok] ${file}: ${rowCount} rows`);
  }

  console.log(`Market data validation passed: ${validCount}/${files.length} files.`);
}

main().catch((error) => {
  console.error(
    `[fail] Market data validation failed: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
  process.exit(1);
});
