const importedMarketDataKeys = new Set([
  "0050-tw",
  "1155-kl",
  "2800-hk",
  "aapl",
  "cspx-l",
  "es3-si",
  "iwda-l",
  "nvda",
  "qqq",
  "spy",
  "tsla",
  "voo",
  "vwra-l",
]);

export function hasImportedMarketData(dataKey: string | undefined) {
  return dataKey ? importedMarketDataKeys.has(dataKey) : false;
}
