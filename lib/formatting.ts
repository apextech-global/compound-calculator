import { convertUsdToCurrency, type CurrencyCode } from "./currencies";

export function formatInputAmount(valueUsd: string, currency: CurrencyCode) {
  if (valueUsd === "") {
    return "";
  }

  const value = Number(valueUsd) || 0;
  const converted = convertUsdToCurrency(value, currency);

  return Number.isInteger(converted)
    ? String(converted)
    : converted.toFixed(2).replace(/\.?0+$/, "");
}

export function formatMoney(
  valueUsd: number,
  currency: CurrencyCode,
  locale: string
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(convertUsdToCurrency(valueUsd, currency));
}

export function formatCompactMoney(
  valueUsd: number,
  currency: CurrencyCode,
  locale: string
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(convertUsdToCurrency(valueUsd, currency));
}

export function formatShares(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 4,
  }).format(value);
}

export function formatPercent(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value);
}
