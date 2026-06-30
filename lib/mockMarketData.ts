export type SymbolKey = string;

export const historicalPriceData: Record<SymbolKey, Record<number, number>> = {
  voo: {
    2015: 188,
    2016: 205,
    2017: 245,
    2018: 230,
    2019: 296,
    2020: 343,
    2021: 437,
    2022: 352,
    2023: 436,
    2024: 538,
    2025: 560,
  },
  spy: {
    2015: 203,
    2016: 224,
    2017: 267,
    2018: 250,
    2019: 322,
    2020: 373,
    2021: 477,
    2022: 382,
    2023: 475,
    2024: 586,
    2025: 610,
  },
  qqq: {
    2015: 112,
    2016: 119,
    2017: 156,
    2018: 154,
    2019: 213,
    2020: 313,
    2021: 398,
    2022: 266,
    2023: 409,
    2024: 512,
    2025: 535,
  },
  aapl: {
    2015: 26,
    2016: 29,
    2017: 42,
    2018: 39,
    2019: 73,
    2020: 132,
    2021: 178,
    2022: 130,
    2023: 192,
    2024: 250,
    2025: 215,
  },
  tsla: {
    2015: 16,
    2016: 14,
    2017: 21,
    2018: 22,
    2019: 28,
    2020: 235,
    2021: 352,
    2022: 123,
    2023: 248,
    2024: 403,
    2025: 320,
  },
  nvda: {
    2015: 8,
    2016: 27,
    2017: 48,
    2018: 34,
    2019: 59,
    2020: 130,
    2021: 294,
    2022: 146,
    2023: 495,
    2024: 134,
    2025: 155,
  },
};

const samplePriceHistory = historicalPriceData.voo;

export function getMockYearsForSymbol(symbol: SymbolKey) {
  return Object.keys(historicalPriceData[symbol] ?? samplePriceHistory)
    .map(Number)
    .sort((a, b) => a - b);
}

export function getMockPriceHistoryForSymbol(symbol: SymbolKey) {
  return historicalPriceData[symbol] ?? samplePriceHistory;
}
