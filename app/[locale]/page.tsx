"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type YearlyResult = {
  year: number;
  balance: number;
  invested: number;
  profit: number;
};

type SymbolKey = "VOO" | "SPY" | "QQQ" | "AAPL" | "TSLA" | "NVDA";
type ActiveCalculator = "dca" | "compound";
type CurrencyCode =
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

type DcaYearlyResult = {
  year: number;
  price: number;
  sharesBought: number;
  totalShares: number;
  portfolioValue: number;
  invested: number;
};

const historicalPriceData: Record<SymbolKey, Record<number, number>> = {
  VOO: {
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
  SPY: {
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
  QQQ: {
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
  AAPL: {
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
  TSLA: {
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
  NVDA: {
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

const symbolOptions = Object.keys(historicalPriceData) as SymbolKey[];
const availableYears = Object.keys(historicalPriceData.VOO).map(Number);
const languageCodes = [
  "en",
  "zh-CN",
  "zh-TW",
  "ms",
  "id",
  "ja",
  "ko",
  "ru",
  "fr",
  "it",
  "es",
  "ar",
  "de",
  "ta",
] as const;
const currencyCodes: CurrencyCode[] = [
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

const mockExchangeRates: Record<CurrencyCode, number> = {
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

function getDefaultCurrency(locale: string): CurrencyCode {
  return defaultCurrencyByLocale[locale] ?? "USD";
}

function convertUsdToCurrency(value: number, currency: CurrencyCode) {
  return value * mockExchangeRates[currency];
}

function convertCurrencyToUsd(value: number, currency: CurrencyCode) {
  return value / mockExchangeRates[currency];
}

function formatInputAmount(valueUsd: string, currency: CurrencyCode) {
  if (valueUsd === "") {
    return "";
  }

  const value = Number(valueUsd) || 0;
  const converted = convertUsdToCurrency(value, currency);

  return Number.isInteger(converted)
    ? String(converted)
    : converted.toFixed(2).replace(/\.?0+$/, "");
}

function formatMoney(valueUsd: number, currency: CurrencyCode, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(convertUsdToCurrency(valueUsd, currency));
}

function formatCompactMoney(
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

function formatShares(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 4,
  }).format(value);
}

function formatPercent(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value);
}

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() =>
    getDefaultCurrency(locale)
  );
  const [activeCalculator, setActiveCalculator] =
    useState<ActiveCalculator>("dca");
  const [showCompoundTable, setShowCompoundTable] = useState(false);
  const [showBacktestTable, setShowBacktestTable] = useState(false);
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [years, setYears] = useState("20");
  const [backtestSymbol, setBacktestSymbol] = useState<SymbolKey>("VOO");
  const [backtestMonthlyAmount, setBacktestMonthlyAmount] = useState("500");
  const [backtestStartYear, setBacktestStartYear] = useState("2018");
  const [backtestEndYear, setBacktestEndYear] = useState("2025");

  const result = useMemo(() => {
    const initial = Number(initialAmount) || 0;
    const monthly = Number(monthlyContribution) || 0;
    const rate = (Number(annualReturn) || 0) / 100;
    const totalYears = Math.max(0, Math.floor(Number(years) || 0));
    const monthlyRate = rate / 12;

    let balance = initial;
    const yearlyResults: YearlyResult[] = [];

    for (let year = 1; year <= totalYears; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + monthly;
      }

      const invested = initial + monthly * 12 * year;

      yearlyResults.push({
        year,
        balance,
        invested,
        profit: balance - invested,
      });
    }

    const totalInvested = initial + monthly * 12 * totalYears;
    const finalValue = balance;
    const totalProfit = finalValue - totalInvested;

    return {
      finalValue,
      totalInvested,
      totalProfit,
      yearlyResults,
    };
  }, [initialAmount, monthlyContribution, annualReturn, years]);

  const chartData = useMemo(
    () => [
      {
        year: t("table.start"),
        balance: Number(initialAmount) || 0,
        invested: Number(initialAmount) || 0,
      },
      ...result.yearlyResults.map((item) => ({
        year: `${t("table.year")} ${item.year}`,
        balance: Math.round(item.balance),
        invested: Math.round(item.invested),
      })),
    ],
    [initialAmount, result.yearlyResults, t]
  );

  const growthMultiple =
    result.totalInvested > 0 ? result.finalValue / result.totalInvested : 0;

  const backtest = useMemo(() => {
    const monthlyAmount = Number(backtestMonthlyAmount) || 0;
    const rawStartYear = Number(backtestStartYear) || availableYears[0];
    const rawEndYear =
      Number(backtestEndYear) || availableYears[availableYears.length - 1];
    const startYear = Math.min(rawStartYear, rawEndYear);
    const endYear = Math.max(rawStartYear, rawEndYear);
    const priceHistory = historicalPriceData[backtestSymbol];
    const yearlyResults: DcaYearlyResult[] = [];

    let totalShares = 0;
    let totalInvested = 0;

    for (const year of availableYears) {
      if (year < startYear || year > endYear) {
        continue;
      }

      const price = priceHistory[year];
      const investedThisYear = monthlyAmount * 12;
      const sharesBought = price > 0 ? investedThisYear / price : 0;

      totalInvested += investedThisYear;
      totalShares += sharesBought;

      yearlyResults.push({
        year,
        price,
        sharesBought,
        totalShares,
        portfolioValue: totalShares * price,
        invested: totalInvested,
      });
    }

    const finalPrice = yearlyResults.at(-1)?.price ?? 0;
    const finalValue = totalShares * finalPrice;
    const totalProfit = finalValue - totalInvested;
    const totalReturn = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

    return {
      finalValue,
      totalInvested,
      totalProfit,
      totalReturn,
      totalShares,
      yearlyResults,
    };
  }, [
    backtestEndYear,
    backtestMonthlyAmount,
    backtestStartYear,
    backtestSymbol,
  ]);

  const backtestChartData = useMemo(
    () =>
      backtest.yearlyResults.map((item) => ({
        year: item.year,
        portfolioValue: Math.round(item.portfolioValue),
        invested: Math.round(item.invested),
      })),
    [backtest.yearlyResults]
  );

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <button
            type="button"
            onClick={() => setActiveCalculator("dca")}
            className="w-fit text-left text-xl font-bold tracking-tight text-white"
          >
            {t("common.brand")}
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-1 text-sm font-medium sm:flex">
              <button
                type="button"
                onClick={() => setActiveCalculator("dca")}
                className={`rounded-xl px-4 py-2 transition ${
                  activeCalculator === "dca"
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t("nav.dcaBacktest")}
              </button>
              <button
                type="button"
                onClick={() => setActiveCalculator("compound")}
                className={`rounded-xl px-4 py-2 transition ${
                  activeCalculator === "compound"
                    ? "bg-emerald-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t("nav.compoundCalculator")}
              </button>
            </div>

            <label className="sr-only" htmlFor="language-switcher">
              {t("common.language")}
            </label>
            <select
              id="language-switcher"
              value={locale}
              onChange={(event) => {
                window.location.assign(`/${event.target.value}`);
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
            >
              {languageCodes.map((language) => (
                <option key={language} value={language}>
                  {t(`languages.${language}`)}
                </option>
              ))}
            </select>

            <div className="max-w-xs">
              <label className="sr-only" htmlFor="currency-switcher">
                {t("common.currency")}
              </label>
              <select
                id="currency-switcher"
                value={selectedCurrency}
                onChange={(event) =>
                  setSelectedCurrency(event.target.value as CurrencyCode)
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              >
                {currencyCodes.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                {t("common.currencyNote")}
              </p>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.14),_transparent_28%)]" />

        <div className="mb-6 max-w-4xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            {t("hero.description")}
          </p>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveCalculator("dca")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setActiveCalculator("dca");
              }
            }}
            className={`group rounded-3xl border p-6 text-left shadow-2xl transition ${
              activeCalculator === "dca"
                ? "border-cyan-300/40 bg-cyan-400/10 shadow-cyan-950/30"
                : "border-white/10 bg-white/[0.06] shadow-black/20 hover:border-cyan-300/30"
            }`}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  {t("cards.dca.eyebrow")}
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  {t("cards.dca.title")}
                </h2>
              </div>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
                {t("common.mockHistory")}
              </span>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              {t("cards.dca.description")}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {t("metrics.symbol")}
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  {backtestSymbol}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {t("metrics.finalValue")}
                </p>
                <p className="mt-1 text-xl font-bold text-cyan-300">
                  {formatMoney(backtest.finalValue, selectedCurrency, locale)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {t("metrics.return")}
                </p>
                <p className="mt-1 text-xl font-bold text-emerald-300">
                  {formatPercent(backtest.totalReturn, locale)}%
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveCalculator("dca");
              }}
              className="mt-6 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              {t("cards.dca.cta")}
            </button>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setActiveCalculator("compound")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setActiveCalculator("compound");
              }
            }}
            className={`group rounded-3xl border p-6 text-left shadow-2xl transition ${
              activeCalculator === "compound"
                ? "border-emerald-300/40 bg-emerald-400/10 shadow-emerald-950/30"
                : "border-white/10 bg-white/[0.06] shadow-black/20 hover:border-emerald-300/30"
            }`}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                  {t("cards.compound.eyebrow")}
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  {t("cards.compound.title")}
                </h2>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
                {t("common.forwardModel")}
              </span>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              {t("cards.compound.description")}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {t("metrics.years")}
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  {Number(years) || 0}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {t("metrics.finalValue")}
                </p>
                <p className="mt-1 text-xl font-bold text-emerald-300">
                  {formatMoney(result.finalValue, selectedCurrency, locale)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {t("metrics.growth")}
                </p>
                <p className="mt-1 text-xl font-bold text-cyan-300">
                  {growthMultiple.toFixed(1)}x
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveCalculator("compound");
              }}
              className="mt-6 rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              {t("cards.compound.cta")}
            </button>
          </div>
        </div>

        <div className="mb-6 grid rounded-2xl border border-white/10 bg-white/[0.06] p-1 text-sm font-semibold sm:inline-grid sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setActiveCalculator("dca")}
            className={`rounded-xl px-5 py-3 transition ${
              activeCalculator === "dca"
                ? "bg-cyan-400 text-slate-950"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t("nav.dcaBacktest")}
          </button>
          <button
            type="button"
            onClick={() => setActiveCalculator("compound")}
            className={`rounded-xl px-5 py-3 transition ${
              activeCalculator === "compound"
                ? "bg-emerald-400 text-slate-950"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t("cards.compound.title")}
          </button>
        </div>

        {activeCalculator === "dca" ? (
          <section>
            <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  {t("dca.eyebrow")}
                </p>
                <h2 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">
                  {t("dca.title")}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  {t("dca.description")}
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-6 shadow-2xl shadow-cyan-950/30">
                <p className="text-sm font-medium text-cyan-100">
                  {t("dca.endingValue")}
                </p>
                <p className="mt-3 text-4xl font-bold text-cyan-300">
                  {formatMoney(backtest.finalValue, selectedCurrency, locale)}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {t("dca.returnSummary", {
                    returnValue: formatPercent(backtest.totalReturn, locale),
                    symbol: backtestSymbol,
                  })}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                      {t("dca.inputsEyebrow")}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      {t("dca.scenarioTitle")}
                    </h3>
                  </div>
                  <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                    {t("common.mockData")}
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">
                      {t("dca.symbol")}
                    </span>
                    <select
                      value={backtestSymbol}
                      onChange={(e) =>
                        setBacktestSymbol(e.target.value as SymbolKey)
                      }
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                    >
                      {symbolOptions.map((symbol) => (
                        <option key={symbol} value={symbol}>
                          {symbol}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">
                      {t("dca.monthlyInvestment")}
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={formatInputAmount(
                        backtestMonthlyAmount,
                        selectedCurrency
                      )}
                      onChange={(e) => {
                        const value = e.target.value;

                        setBacktestMonthlyAmount(
                          value === ""
                            ? ""
                            : String(
                                convertCurrencyToUsd(
                                  Number(value) || 0,
                                  selectedCurrency
                                )
                              )
                        );
                      }}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-slate-300">
                        {t("dca.startYear")}
                      </span>
                      <select
                        value={backtestStartYear}
                        onChange={(e) => setBacktestStartYear(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                      >
                        {availableYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm text-slate-300">
                        {t("dca.endYear")}
                      </span>
                      <select
                        value={backtestEndYear}
                        onChange={(e) => setBacktestEndYear(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                      >
                        {availableYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">
                    {t("dca.sharesAccumulated")}
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <p className="text-3xl font-bold text-emerald-300">
                      {formatShares(backtest.totalShares, locale)}
                    </p>
                    <p className="text-right text-sm text-slate-400">
                      {t("dca.fractionalShares")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
                    <p className="text-sm text-slate-400">
                      {t("metrics.totalInvested")}
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                      {formatMoney(
                        backtest.totalInvested,
                        selectedCurrency,
                        locale
                      )}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
                    <p className="text-sm text-slate-400">
                      {t("metrics.finalValueTitle")}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-cyan-300">
                      {formatMoney(
                        backtest.finalValue,
                        selectedCurrency,
                        locale
                      )}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
                    <p className="text-sm text-slate-400">
                      {t("metrics.totalProfit")}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-emerald-400">
                      {formatMoney(
                        backtest.totalProfit,
                        selectedCurrency,
                        locale
                      )}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
                    <p className="text-sm text-slate-400">
                      {t("metrics.totalReturn")}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-cyan-400">
                      {formatPercent(backtest.totalReturn, locale)}%
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30">
                  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                        {t("dca.projectionEyebrow")}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold">
                        {t("dca.chartTitle")}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                        {t("dca.portfolioValue")}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        {t("dca.totalInvested")}
                      </div>
                    </div>
                  </div>

                  <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={backtestChartData}
                        margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
                      >
                        <CartesianGrid
                          stroke="rgba(148, 163, 184, 0.16)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="year"
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
                          minTickGap={18}
                        />
                        <YAxis
                          tickFormatter={(value) =>
                            formatCompactMoney(
                              Number(value),
                              selectedCurrency,
                              locale
                            )
                          }
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          width={72}
                        />
                        <Tooltip
                          formatter={(value) =>
                            formatMoney(
                              Number(value ?? 0),
                              selectedCurrency,
                              locale
                            )
                          }
                          contentStyle={{
                            background: "#020617",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "18px",
                            boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
                            color: "#fff",
                          }}
                          labelStyle={{ color: "#cbd5e1", marginBottom: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="portfolioValue"
                          name={t("dca.portfolioValue")}
                          stroke="#22d3ee"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 6, fill: "#22d3ee", strokeWidth: 0 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="invested"
                          name={t("dca.totalInvested")}
                          stroke="#34d399"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 6, fill: "#34d399", strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                        {t("dca.annualDetail")}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold">
                        {t("dca.tableTitle")}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowBacktestTable((value) => !value)}
                      className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                    >
                      {showBacktestTable
                        ? t("common.hideYearlyTable")
                        : t("common.showYearlyTable")}
                    </button>
                  </div>

                  {showBacktestTable ? (
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="text-slate-400">
                          <tr>
                            <th className="py-3 pr-6">{t("table.year")}</th>
                            <th className="py-3 pr-6">{t("table.price")}</th>
                            <th className="py-3 pr-6">
                              {t("table.sharesBought")}
                            </th>
                            <th className="py-3 pr-6">
                              {t("table.totalShares")}
                            </th>
                            <th className="py-3">
                              {t("table.portfolioValue")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {backtest.yearlyResults.map((item) => (
                            <tr
                              key={item.year}
                              className="border-t border-white/10"
                            >
                              <td className="py-3 pr-6 text-slate-300">
                                {item.year}
                              </td>
                              <td className="py-3 pr-6">
                                {formatMoney(
                                  item.price,
                                  selectedCurrency,
                                  locale
                                )}
                              </td>
                              <td className="py-3 pr-6 text-cyan-300">
                                {formatShares(item.sharesBought, locale)}
                              </td>
                              <td className="py-3 pr-6">
                                {formatShares(item.totalShares, locale)}
                              </td>
                              <td className="py-3 text-emerald-400">
                                {formatMoney(
                                  item.portfolioValue,
                                  selectedCurrency,
                                  locale
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                  {t("compound.eyebrow")}
                </p>
                <h2 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">
                  {t("compound.title")}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  {t("compound.description")}
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6 shadow-2xl shadow-emerald-950/40">
                <p className="text-sm font-medium text-emerald-200">
                  {t("compound.projectedValue")}
                </p>
                <p className="mt-3 text-4xl font-bold text-emerald-300">
                  {formatMoney(result.finalValue, selectedCurrency, locale)}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {t("compound.growthSummary", {
                    multiple: growthMultiple.toFixed(1),
                    years: Number(years) || 0,
                  })}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                      {t("compound.inputsEyebrow")}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      {t("compound.detailsTitle")}
                    </h3>
                  </div>
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                    {selectedCurrency}
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">
                      {t("compound.initialInvestment")}
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={formatInputAmount(
                        initialAmount,
                        selectedCurrency
                      )}
                      onChange={(e) => {
                        const value = e.target.value;

                        setInitialAmount(
                          value === ""
                            ? ""
                            : String(
                                convertCurrencyToUsd(
                                  Number(value) || 0,
                                  selectedCurrency
                                )
                              )
                        );
                      }}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">
                      {t("compound.monthlyContribution")}
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={formatInputAmount(
                        monthlyContribution,
                        selectedCurrency
                      )}
                      onChange={(e) => {
                        const value = e.target.value;

                        setMonthlyContribution(
                          value === ""
                            ? ""
                            : String(
                                convertCurrencyToUsd(
                                  Number(value) || 0,
                                  selectedCurrency
                                )
                              )
                        );
                      }}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">
                      {t("compound.annualReturnRate")}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">
                      {t("compound.investmentYears")}
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                    />
                  </label>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">
                    {t("compound.estimatedAnnualReturn")}
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <p className="text-3xl font-bold text-cyan-300">
                      {Number(annualReturn) || 0}%
                    </p>
                    <p className="text-right text-sm text-slate-400">
                      {t("compound.compoundedMonthly")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                    <p className="text-sm text-slate-400">
                      {t("metrics.finalValueTitle")}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-emerald-400">
                      {formatMoney(result.finalValue, selectedCurrency, locale)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                    <p className="text-sm text-slate-400">
                      {t("metrics.totalInvested")}
                    </p>
                    <p className="mt-2 text-3xl font-bold">
                      {formatMoney(
                        result.totalInvested,
                        selectedCurrency,
                        locale
                      )}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                    <p className="text-sm text-slate-400">
                      {t("metrics.totalProfit")}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-cyan-400">
                      {formatMoney(
                        result.totalProfit,
                        selectedCurrency,
                        locale
                      )}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30">
                  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                        {t("compound.projectionEyebrow")}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold">
                        {t("compound.chartTitle")}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        {t("compound.portfolioBalance")}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                        {t("compound.totalInvested")}
                      </div>
                    </div>
                  </div>

                  <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
                      >
                        <CartesianGrid
                          stroke="rgba(148, 163, 184, 0.16)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="year"
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
                          minTickGap={22}
                        />
                        <YAxis
                          tickFormatter={(value) =>
                            formatCompactMoney(
                              Number(value),
                              selectedCurrency,
                              locale
                            )
                          }
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          width={72}
                        />
                        <Tooltip
                          formatter={(value) =>
                            formatMoney(
                              Number(value ?? 0),
                              selectedCurrency,
                              locale
                            )
                          }
                          contentStyle={{
                            background: "#020617",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "18px",
                            boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
                            color: "#fff",
                          }}
                          labelStyle={{ color: "#cbd5e1", marginBottom: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="balance"
                          name={t("compound.portfolioBalance")}
                          stroke="#34d399"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 6, fill: "#34d399", strokeWidth: 0 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="invested"
                          name={t("compound.totalInvested")}
                          stroke="#22d3ee"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 6, fill: "#22d3ee", strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                        {t("compound.annualDetail")}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold">
                        {t("compound.tableTitle")}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCompoundTable((value) => !value)}
                      className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
                    >
                      {showCompoundTable
                        ? t("common.hideYearlyTable")
                        : t("common.showYearlyTable")}
                    </button>
                  </div>

                  {showCompoundTable ? (
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="text-slate-400">
                          <tr>
                            <th className="py-3 pr-6">{t("table.year")}</th>
                            <th className="py-3 pr-6">
                              {t("table.balance")}
                            </th>
                            <th className="py-3 pr-6">
                              {t("table.invested")}
                            </th>
                            <th className="py-3">{t("table.profit")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearlyResults.map((item) => (
                            <tr
                              key={item.year}
                              className="border-t border-white/10"
                            >
                              <td className="py-3 pr-6 text-slate-300">
                                {item.year}
                              </td>
                              <td className="py-3 pr-6">
                                {formatMoney(
                                  item.balance,
                                  selectedCurrency,
                                  locale
                                )}
                              </td>
                              <td className="py-3 pr-6">
                                {formatMoney(
                                  item.invested,
                                  selectedCurrency,
                                  locale
                                )}
                              </td>
                              <td className="py-3 text-emerald-400">
                                {formatMoney(
                                  item.profit,
                                  selectedCurrency,
                                  locale
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-400">
              {t("compound.disclaimer")}
            </p>
          </section>
        )}
      </section>
    </main>
  );
}
