export type MarketCsvRow = {
  date: string;
  close: number;
};

function isValidDate(value: string) {
  return value.trim() !== "" && !Number.isNaN(Date.parse(value));
}

export function parseMarketCsv(csv: string): MarketCsvRow[] {
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
    return [];
  }

  return dataRows
    .map((row) => {
      const columns = row.split(",").map((item) => item.trim());
      const date = columns[dateIndex] ?? "";
      const close = Number(columns[closeIndex]);

      if (!isValidDate(date) || !Number.isFinite(close)) {
        return null;
      }

      return { date, close };
    })
    .filter((row): row is MarketCsvRow => row !== null)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

export function getMarketCsvYears(rows: MarketCsvRow[] | null | undefined) {
  if (!rows?.length) {
    return [];
  }

  return [
    ...new Set(
      rows
        .map((row) => new Date(row.date).getFullYear())
        .filter((year) => Number.isFinite(year))
    ),
  ].sort((a, b) => a - b);
}

export async function loadMarketCsv(
  dataFileSymbol: string
): Promise<MarketCsvRow[] | null> {
  try {
    const response = await fetch(`/market-data/${dataFileSymbol}.csv`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const rows = parseMarketCsv(await response.text());

    return rows.length > 0 ? rows : null;
  } catch {
    return null;
  }
}
