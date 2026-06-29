export type CurrencyCode =
  | "USD"
  | "MYR"
  | "SGD"
  | "IDR"
  | "JPY"
  | "KRW"
  | "CNY"
  | "TWD"
  | "HKD"
  | "EUR"
  | "GBP"
  | "CHF"
  | "AUD"
  | "CAD"
  | "RUB"
  | "AED"
  | "SAR"
  | "INR"
  | "THB";

export const currencyCodes: CurrencyCode[] = [
  "USD",
  "MYR",
  "SGD",
  "IDR",
  "JPY",
  "KRW",
  "CNY",
  "TWD",
  "HKD",
  "EUR",
  "GBP",
  "CHF",
  "AUD",
  "CAD",
  "RUB",
  "AED",
  "SAR",
  "INR",
  "THB",
];

export const mockExchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  MYR: 4.72,
  SGD: 1.35,
  IDR: 16250,
  JPY: 157,
  KRW: 1380,
  CNY: 7.25,
  TWD: 32.4,
  HKD: 7.8,
  EUR: 0.92,
  GBP: 0.78,
  CHF: 0.9,
  AUD: 1.5,
  CAD: 1.37,
  RUB: 89,
  AED: 3.67,
  SAR: 3.75,
  INR: 83.5,
  THB: 36.7,
};

const defaultCurrencyByLocale: Record<string, CurrencyCode> = {
  en: "USD",
  "zh-CN": "CNY",
  "zh-TW": "TWD",
  ms: "MYR",
  id: "IDR",
  ja: "JPY",
  ko: "KRW",
  ru: "RUB",
  fr: "EUR",
  it: "EUR",
  es: "EUR",
  ar: "AED",
  de: "EUR",
  ta: "INR",
};

export function getDefaultCurrency(locale: string): CurrencyCode {
  return defaultCurrencyByLocale[locale] ?? "USD";
}

export function convertUsdToCurrency(value: number, currency: CurrencyCode) {
  return value * mockExchangeRates[currency];
}

export function convertCurrencyToUsd(value: number, currency: CurrencyCode) {
  return value / mockExchangeRates[currency];
}
