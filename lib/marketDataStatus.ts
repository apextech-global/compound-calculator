import marketDataStatusJson from "@/data/market-data-status.json";

export type MarketDataStatus = {
  symbol: string;
  name: string;
  source: string;
  lastSuccessfulFetchAt: string | null;
  rowsSaved: number;
  status: "success" | "failed" | "skipped";
  lastError?: string;
};

const marketDataStatus = marketDataStatusJson as Record<
  string,
  MarketDataStatus
>;

export function getMarketDataStatus(dataKey: string | undefined) {
  return dataKey ? marketDataStatus[dataKey] : undefined;
}

export function getMarketDataLastUpdatedDate(dataKey: string | undefined) {
  const lastSuccessfulFetchAt = getMarketDataStatus(dataKey)?.lastSuccessfulFetchAt;

  if (!lastSuccessfulFetchAt) {
    return null;
  }

  const date = new Date(lastSuccessfulFetchAt);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

/**
 * Genuine "last modified" date for the Supported Assets page: the most
 * recent successful fetch across every tracked instrument. Used by the
 * sitemap instead of a build-time date, since this reflects an actual
 * content change (a row's data updating) rather than when the app was
 * last deployed.
 */
export function getLatestMarketDataLastUpdatedDate() {
  const timestamps = Object.values(marketDataStatus)
    .map((status) => status.lastSuccessfulFetchAt)
    .filter((value): value is string => Boolean(value))
    .map((value) => new Date(value).getTime())
    .filter((time) => !Number.isNaN(time));

  if (timestamps.length === 0) {
    return null;
  }

  return new Date(Math.max(...timestamps)).toISOString().slice(0, 10);
}

export function isMarketDataUpdateOld(
  dataKey: string | undefined,
  maxAgeDays = 14
) {
  const lastSuccessfulFetchAt = getMarketDataStatus(dataKey)?.lastSuccessfulFetchAt;

  if (!lastSuccessfulFetchAt) {
    return false;
  }

  const updatedAt = new Date(lastSuccessfulFetchAt).getTime();

  if (Number.isNaN(updatedAt)) {
    return false;
  }

  const ageMs = Date.now() - updatedAt;
  return ageMs > maxAgeDays * 24 * 60 * 60 * 1000;
}
