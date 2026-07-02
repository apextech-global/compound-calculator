import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const instrumentsPath = path.join(rootDir, "lib", "instruments.ts");
const marketDataDir = path.join(rootDir, "public", "market-data");
const reportPath = path.join(rootDir, "data", "market-data-coverage.json");

function parseArgs() {
  return {
    missingOnly: process.argv.includes("--missing-only"),
  };
}

function getStringProperty(block, propertyName) {
  const match = block.match(new RegExp(`${propertyName}:\\s*"([^"]+)"`, "m"));

  return match?.[1] ?? null;
}

async function loadInstruments() {
  const source = await readFile(instrumentsPath, "utf8");
  const objects = source.match(/\{\n[\s\S]*?\n  \}/g) ?? [];

  return objects
    .map((block) => {
      const symbol = getStringProperty(block, "symbol");
      const displaySymbol = getStringProperty(block, "displaySymbol");
      const name = getStringProperty(block, "name");
      const country = getStringProperty(block, "country");
      const assetType = getStringProperty(block, "assetType");
      const currency = getStringProperty(block, "currency");
      const dataKey = getStringProperty(block, "dataKey");

      if (
        !symbol ||
        !displaySymbol ||
        !name ||
        !country ||
        !assetType ||
        !currency ||
        !dataKey
      ) {
        return null;
      }

      return {
        symbol,
        displaySymbol,
        name,
        country,
        assetType,
        currency,
        dataKey,
        yahooSymbol: getYahooSymbol({ symbol }),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.dataKey.localeCompare(b.dataKey));
}

function getYahooSymbol(instrument) {
  return instrument.symbol?.trim() || null;
}

function countCsvRows(csv) {
  return Math.max(
    0,
    csv
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean).length - 1
  );
}

async function getCsvStatus(dataKey) {
  const csvPath = path.join(marketDataDir, `${dataKey}.csv`);

  try {
    const [fileStat, csv] = await Promise.all([
      stat(csvPath),
      readFile(csvPath, "utf8"),
    ]);
    const rows = countCsvRows(csv);

    return {
      exists: rows > 0,
      rows,
      lastModified: fileStat.mtime.toISOString(),
      csvPath,
    };
  } catch {
    return {
      exists: false,
      rows: 0,
      lastModified: null,
      csvPath,
    };
  }
}

function createSummary(items) {
  const available = items.filter((item) => item.hasHistoricalCsv);
  const missing = items.filter((item) => !item.hasHistoricalCsv);
  const missingYahooMapping = items.filter((item) => !item.hasYahooMapping);

  return {
    totalAssets: items.length,
    historicalDataAvailable: available.length,
    missingHistoricalData: missing.length,
    missingYahooMapping: missingYahooMapping.length,
    sampleDataOnlyAssets: missing.length,
  };
}

async function main() {
  const options = parseArgs();
  const instruments = await loadInstruments();
  const items = [];

  for (const instrument of instruments) {
    const csvStatus = await getCsvStatus(instrument.dataKey);
    const hasYahooMapping = Boolean(instrument.yahooSymbol);

    items.push({
      symbol: instrument.symbol,
      displaySymbol: instrument.displaySymbol,
      name: instrument.name,
      market: instrument.country,
      country: instrument.country,
      assetType: instrument.assetType,
      currency: instrument.currency,
      dataKey: instrument.dataKey,
      expectedCsvPath: path.relative(rootDir, csvStatus.csvPath),
      hasHistoricalCsv: csvStatus.exists,
      rowCount: csvStatus.rows,
      lastModified: csvStatus.lastModified,
      hasYahooMapping,
      yahooSymbol: instrument.yahooSymbol,
      status: csvStatus.exists
        ? "historical-data-available"
        : hasYahooMapping
          ? "missing-historical-data"
          : "manual-csv-required",
    });
  }

  const summary = createSummary(items);
  const visibleItems = options.missingOnly
    ? items.filter((item) => !item.hasHistoricalCsv)
    : items;
  const report = {
    generatedAt: new Date().toISOString(),
    summary,
    assets: items,
  };

  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log("Market data coverage audit");
  console.log(`Generated: ${report.generatedAt}`);
  console.log(`Report: ${path.relative(rootDir, reportPath)}`);
  console.log(`Total assets: ${summary.totalAssets}`);
  console.log(
    `Historical data available: ${summary.historicalDataAvailable}`
  );
  console.log(`Missing historical data: ${summary.missingHistoricalData}`);
  console.log(`Missing Yahoo mapping: ${summary.missingYahooMapping}`);
  console.log(`Sample-data-only assets: ${summary.sampleDataOnlyAssets}`);
  console.log("");

  for (const item of visibleItems) {
    const dataStatus = item.hasHistoricalCsv
      ? `Historical data available (${item.rowCount} rows)`
      : "Missing historical data";
    const mappingStatus = item.hasYahooMapping
      ? `Yahoo: ${item.yahooSymbol}`
      : "Missing Yahoo mapping - manual CSV required";

    console.log(
      `[${item.hasHistoricalCsv ? "ok" : "missing"}] ${
        item.displaySymbol
      } | ${item.name}`
    );
    console.log(
      `     ${item.market} | ${item.assetType} | ${item.currency} | ${item.dataKey}`
    );
    console.log(`     ${dataStatus}`);
    console.log(`     ${mappingStatus}`);
    console.log(`     CSV: ${item.expectedCsvPath}`);
    if (item.lastModified) {
      console.log(`     Last modified: ${item.lastModified}`);
    }
  }

  if (options.missingOnly && visibleItems.length === 0) {
    console.log("No missing historical CSV files found.");
  }
}

main().catch((error) => {
  console.error(
    `[fail] ${error instanceof Error ? error.message : String(error)}`
  );
  process.exitCode = 1;
});
