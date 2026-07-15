const importedMarketDataKeys = new Set([
  "0050-tw",
  "1155-kl",
  "2800-hk",
  "aapl",
  "acwi",
  "bnd",
  "cspx-l",
  "es3-si",
  "ivv",
  "iwda-l",
  "nvda",
  "qqq",
  "qqqm",
  "schd",
  "spy",
  "tsla",
  "vig",
  "voo",
  "vt",
  "vti",
  "vwra-l",
  "vxus",
]);

export function hasImportedMarketData(dataKey: string | undefined) {
  return dataKey ? importedMarketDataKeys.has(dataKey) : false;
}
