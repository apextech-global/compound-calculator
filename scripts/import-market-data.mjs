import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

function normalizeHeader(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isValidDate(value) {
  return value.trim() !== "" && !Number.isNaN(Date.parse(value));
}

function parsePrice(value) {
  const price = Number(
    value
      .trim()
      .replace(/,/g, "")
      .replace(/^\$/, "")
  );

  return Number.isFinite(price) && price > 0 ? price : null;
}

function getColumnIndex(headers, names) {
  return names
    .map((name) => headers.indexOf(name))
    .find((index) => index !== -1);
}

function parseDailyRows(csv) {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (rows.length <= 1) {
    return [];
  }

  const [header, ...dataRows] = rows;
  const headers = parseCsvLine(header).map(normalizeHeader);
  const dateIndex = getColumnIndex(headers, ["date"]);
  const adjustedCloseIndex = getColumnIndex(headers, [
    "adj close",
    "adjusted close",
    "adj. close",
  ]);
  const closeIndex = getColumnIndex(headers, ["close"]);
  const priceIndex = getColumnIndex(headers, ["price"]);
  const lastIndex = getColumnIndex(headers, ["last"]);

  if (dateIndex === undefined) {
    throw new Error("CSV is missing a Date column.");
  }

  if (
    adjustedCloseIndex === undefined &&
    closeIndex === undefined &&
    priceIndex === undefined &&
    lastIndex === undefined
  ) {
    throw new Error("CSV is missing Adj Close, Close, Price, or Last column.");
  }

  return dataRows
    .map((row) => {
      const columns = parseCsvLine(row);
      const date = columns[dateIndex] ?? "";
      const close =
        (adjustedCloseIndex === undefined
          ? null
          : parsePrice(columns[adjustedCloseIndex] ?? "")) ??
        (closeIndex === undefined ? null : parsePrice(columns[closeIndex] ?? "")) ??
        (priceIndex === undefined ? null : parsePrice(columns[priceIndex] ?? "")) ??
        (lastIndex === undefined ? null : parsePrice(columns[lastIndex] ?? ""));

      if (!isValidDate(date) || close === null) {
        return null;
      }

      const parsedDate = new Date(date);
      const normalizedDate = parsedDate.toISOString().slice(0, 10);

      return { date: normalizedDate, close };
    })
    .filter((row) => row !== null)
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

async function importFile(fileName) {
  const dataKey = path.basename(fileName, ".csv");
  const inputPath = path.join(inputDir, fileName);
  const outputPath = path.join(outputDir, `${dataKey}.csv`);
  const rawCsv = await readFile(inputPath, "utf8");
  const dailyRows = parseDailyRows(rawCsv);
  const monthlyRows = toMonthlyCloses(dailyRows);

  console.log(`[file] imported file path: ${path.relative(rootDir, inputPath)}`);
  console.log(`[file] output file path: ${path.relative(rootDir, outputPath)}`);
  console.log(`[file] valid daily rows read: ${dailyRows.length}`);
  console.log(`[file] monthly rows prepared: ${monthlyRows.length}`);

  if (monthlyRows.length === 0) {
    console.warn(
      `[warn] ${dataKey}: no valid rows found. Existing output was not overwritten.`
    );
    return false;
  }

  const output = [
    "date,close",
    ...monthlyRows.map((row) => `${row.date},${formatClose(row.close)}`),
  ].join("\n");

  await writeFile(outputPath, `${output}\n`, "utf8");
  console.log(
    `[ok] ${dataKey}: saved ${monthlyRows.length} monthly rows to ${path.relative(
      rootDir,
      outputPath
    )}`
  );

  return true;
}

async function main() {
  await mkdir(inputDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });

  const files = (await readdir(inputDir))
    .filter((file) => file.toLowerCase().endsWith(".csv"))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    console.warn(
      `[warn] No raw CSV files found in ${path.relative(rootDir, inputDir)}.`
    );
    return;
  }

  let importedCount = 0;

  for (const file of files) {
    try {
      const imported = await importFile(file);

      if (imported) {
        importedCount += 1;
      }
    } catch (error) {
      console.error(
        `[fail] ${file}: ${error instanceof Error ? error.message : String(error)}`
      );
      console.error("[fail] Existing output was not overwritten.");
    }
  }

  console.log(
    `Market data import complete: ${importedCount}/${files.length} files imported.`
  );
}

main();
