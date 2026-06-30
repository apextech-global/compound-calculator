const importedMarketDataKeys = new Set(["aapl", "nvda", "qqq", "spy", "tsla", "voo"]);

export function hasImportedMarketData(dataKey: string | undefined) {
  return dataKey ? importedMarketDataKeys.has(dataKey) : false;
}
