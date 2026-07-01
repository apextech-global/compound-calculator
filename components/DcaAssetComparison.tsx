"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trackGaEvent } from "@/lib/analytics";
import { calculateDcaBacktest } from "@/lib/calculations";
import {
  convertCurrencyToUsd,
  currencyCodes,
  type CurrencyCode,
} from "@/lib/currencies";
import {
  formatCompactMoney,
  formatInputAmount,
  formatMoney,
  formatPercent,
} from "@/lib/formatting";
import {
  getMarketCsvYears,
  loadMarketCsv,
  type MarketCsvRow,
} from "@/lib/marketCsv";
import { hasImportedMarketData } from "@/lib/marketDataAvailability";
import { instruments } from "@/lib/instruments";
import { getMockYearsForSymbol, type SymbolKey } from "@/lib/mockMarketData";

type DcaAssetComparisonProps = {
  selectedCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
};

type LoadedMarketData = {
  symbol: SymbolKey;
  rows: MarketCsvRow[] | null;
};

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "true");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function getInstrument(id: string) {
  return instruments.find((instrument) => instrument.id === id) ?? instruments[0];
}

function getYearsForAsset(symbol: SymbolKey, rows: MarketCsvRow[] | null) {
  const csvYears = getMarketCsvYears(rows);

  return csvYears.length > 0 ? csvYears : getMockYearsForSymbol(symbol);
}

function getCommonYears(firstYears: number[], secondYears: number[]) {
  const secondYearSet = new Set(secondYears);
  const commonYears = firstYears.filter((year) => secondYearSet.has(year));

  return commonYears.length > 0 ? commonYears : firstYears;
}

export default function DcaAssetComparison({
  selectedCurrency,
  onCurrencyChange,
}: DcaAssetComparisonProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [assetAId, setAssetAId] = useState<SymbolKey>("voo");
  const [assetBId, setAssetBId] = useState<SymbolKey>("qqq");
  const [monthlyAmount, setMonthlyAmount] = useState("500");
  const [startYear, setStartYear] = useState("2018");
  const [endYear, setEndYear] = useState("2025");
  const [assetAData, setAssetAData] = useState<LoadedMarketData | null>(null);
  const [assetBData, setAssetBData] = useState<LoadedMarketData | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const hasTrackedInitialCalculation = useRef(false);

  const assetA = getInstrument(assetAId);
  const assetB = getInstrument(assetBId);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryAssetA = params.get("assetA");
    const queryAssetB = params.get("assetB");
    const queryAmount = Number(params.get("compareAmount"));
    const queryStartYear = params.get("compareStart");
    const queryEndYear = params.get("compareEnd");

    const nextAssetA = instruments.find(
      (instrument) =>
        instrument.id.toLowerCase() === queryAssetA?.toLowerCase() ||
        instrument.displaySymbol.toLowerCase() === queryAssetA?.toLowerCase()
    );
    const nextAssetB = instruments.find(
      (instrument) =>
        instrument.id.toLowerCase() === queryAssetB?.toLowerCase() ||
        instrument.displaySymbol.toLowerCase() === queryAssetB?.toLowerCase()
    );

    if (nextAssetA) {
      setAssetAId(nextAssetA.id);
    }

    if (nextAssetB) {
      setAssetBId(nextAssetB.id);
    }

    if (Number.isFinite(queryAmount) && queryAmount >= 0) {
      setMonthlyAmount(
        String(convertCurrencyToUsd(queryAmount, selectedCurrency))
      );
    }

    if (queryStartYear) {
      setStartYear(queryStartYear);
    }

    if (queryEndYear) {
      setEndYear(queryEndYear);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    let isActive = true;

    loadMarketCsv(assetA.dataKey).then((rows) => {
      if (isActive) {
        setAssetAData({ symbol: assetA.id, rows });
      }
    });

    return () => {
      isActive = false;
    };
  }, [assetA.dataKey, assetA.id]);

  useEffect(() => {
    let isActive = true;

    loadMarketCsv(assetB.dataKey).then((rows) => {
      if (isActive) {
        setAssetBData({ symbol: assetB.id, rows });
      }
    });

    return () => {
      isActive = false;
    };
  }, [assetB.dataKey, assetB.id]);

  const activeAssetARows =
    assetAData?.symbol === assetA.id ? assetAData.rows : null;
  const activeAssetBRows =
    assetBData?.symbol === assetB.id ? assetBData.rows : null;
  const assetAYears = getYearsForAsset(assetA.id, activeAssetARows);
  const assetBYears = getYearsForAsset(assetB.id, activeAssetBRows);
  const availableYears = getCommonYears(assetAYears, assetBYears);
  const normalizedStartYear = availableYears.includes(Number(startYear))
    ? startYear
    : String(availableYears[0]);
  const normalizedEndYear = availableYears.includes(Number(endYear))
    ? endYear
    : String(availableYears[availableYears.length - 1]);

  const resultA = useMemo(
    () =>
      calculateDcaBacktest({
        symbol: assetA.id,
        monthlyAmount,
        startYear: normalizedStartYear,
        endYear: normalizedEndYear,
        monthlyPrices: activeAssetARows,
      }),
    [
      activeAssetARows,
      assetA.id,
      monthlyAmount,
      normalizedEndYear,
      normalizedStartYear,
    ]
  );
  const resultB = useMemo(
    () =>
      calculateDcaBacktest({
        symbol: assetB.id,
        monthlyAmount,
        startYear: normalizedStartYear,
        endYear: normalizedEndYear,
        monthlyPrices: activeAssetBRows,
      }),
    [
      activeAssetBRows,
      assetB.id,
      monthlyAmount,
      normalizedEndYear,
      normalizedStartYear,
    ]
  );
  const assetADataSource =
    resultA.dataSource === "csv" || hasImportedMarketData(assetA.dataKey)
      ? "csv"
      : "mock";
  const assetBDataSource =
    resultB.dataSource === "csv" || hasImportedMarketData(assetB.dataKey)
      ? "csv"
      : "mock";
  const finalValueDifference = resultA.finalValue - resultB.finalValue;
  const betterPerformer =
    finalValueDifference === 0
      ? t("comparison.tie")
      : finalValueDifference > 0
        ? assetA.displaySymbol
        : assetB.displaySymbol;
  const chartData = useMemo(() => {
    const years = [
      ...new Set([
        ...resultA.yearlyResults.map((item) => item.year),
        ...resultB.yearlyResults.map((item) => item.year),
      ]),
    ].sort((firstYear, secondYear) => firstYear - secondYear);

    return years.map((year) => ({
      year,
      assetA: Math.round(
        resultA.yearlyResults.find((item) => item.year === year)
          ?.portfolioValue ?? 0
      ),
      assetB: Math.round(
        resultB.yearlyResults.find((item) => item.year === year)
          ?.portfolioValue ?? 0
      ),
    }));
  }, [resultA.yearlyResults, resultB.yearlyResults]);
  const comparisonUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const url = new URL(`/${locale}`, window.location.origin);
    url.searchParams.set("compare", "assets");
    url.searchParams.set("assetA", assetA.displaySymbol);
    url.searchParams.set("assetB", assetB.displaySymbol);
    url.searchParams.set(
      "compareAmount",
      formatInputAmount(monthlyAmount || "0", selectedCurrency)
    );
    url.searchParams.set("compareStart", normalizedStartYear);
    url.searchParams.set("compareEnd", normalizedEndYear);
    url.searchParams.set("currency", selectedCurrency);

    return url.toString();
  }, [
    assetA.displaySymbol,
    assetB.displaySymbol,
    locale,
    monthlyAmount,
    normalizedEndYear,
    normalizedStartYear,
    selectedCurrency,
  ]);
  const eventParams = {
    asset_a_symbol: assetA.displaySymbol,
    asset_b_symbol: assetB.displaySymbol,
    monthly_amount: Number(monthlyAmount) || 0,
    start_year: normalizedStartYear,
    end_year: normalizedEndYear,
    currency: selectedCurrency,
    locale,
    asset_a_data_source: assetADataSource,
    asset_b_data_source: assetBDataSource,
  };

  useEffect(() => {
    if (!hasTrackedInitialCalculation.current) {
      hasTrackedInitialCalculation.current = true;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      trackGaEvent("comparison_calculation_updated", eventParams);
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [
    assetADataSource,
    assetBDataSource,
    assetA.displaySymbol,
    assetB.displaySymbol,
    locale,
    monthlyAmount,
    normalizedEndYear,
    normalizedStartYear,
    selectedCurrency,
  ]);

  const handleAssetAChange = (value: SymbolKey) => {
    setAssetAId(value);
  };

  const handleAssetBChange = (value: SymbolKey) => {
    setAssetBId(value);
  };

  const copyComparisonLink = async () => {
    if (!comparisonUrl) {
      return;
    }

    await copyTextToClipboard(comparisonUrl);
    setCopiedLink(true);
    trackGaEvent("comparison_link_copied", eventParams);
    window.setTimeout(() => setCopiedLink(false), 2200);
  };

  const copyComparisonCaption = async () => {
    const caption = [
      t("comparison.captionHeadline", {
        assetA: assetA.displaySymbol,
        assetB: assetB.displaySymbol,
        startYear: normalizedStartYear,
        endYear: normalizedEndYear,
      }),
      "",
      `${t("comparison.monthlyAmount")}: ${formatMoney(
        Number(monthlyAmount) || 0,
        selectedCurrency,
        locale
      )}`,
      `${assetA.displaySymbol} ${t("comparison.finalValue")}: ${formatMoney(
        resultA.finalValue,
        selectedCurrency,
        locale
      )}`,
      `${assetB.displaySymbol} ${t("comparison.finalValue")}: ${formatMoney(
        resultB.finalValue,
        selectedCurrency,
        locale
      )}`,
      `${t("comparison.difference")}: ${formatMoney(
        Math.abs(finalValueDifference),
        selectedCurrency,
        locale
      )}`,
      `${t("comparison.betterPerformer")}: ${betterPerformer}`,
      "",
      t("caption.disclaimer"),
      "https://dcabacktest.com",
    ].join("\n");

    await copyTextToClipboard(caption);
    setCopiedCaption(true);
    trackGaEvent("comparison_caption_copied", eventParams);
    window.setTimeout(() => setCopiedCaption(false), 2200);
  };

  return (
    <section className="mt-8 w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/25 sm:mt-10 sm:rounded-3xl sm:p-6">
      <div className="mb-5 w-full max-w-3xl">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:mb-2 sm:text-sm">
          {t("comparison.eyebrow")}
        </p>
        <h2 className="break-words text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
          {t("comparison.title")}
        </h2>
        <p className="mt-2 break-words text-sm leading-6 text-slate-300">
          {t("comparison.description")}
        </p>
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-5">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                {t("comparison.assetA")}
              </span>
              <select
                value={assetAId}
                onChange={(event) =>
                  handleAssetAChange(event.target.value as SymbolKey)
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              >
                {instruments.map((instrument) => (
                  <option key={instrument.id} value={instrument.id}>
                    {instrument.displaySymbol} - {instrument.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                {t("comparison.assetB")}
              </span>
              <select
                value={assetBId}
                onChange={(event) =>
                  handleAssetBChange(event.target.value as SymbolKey)
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              >
                {instruments.map((instrument) => (
                  <option key={instrument.id} value={instrument.id}>
                    {instrument.displaySymbol} - {instrument.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                {t("comparison.monthlyAmount")}
              </span>
              <input
                type="number"
                min="0"
                value={formatInputAmount(monthlyAmount, selectedCurrency)}
                onChange={(event) => {
                  const value = event.target.value;

                  setMonthlyAmount(
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
                  {t("comparison.startYear")}
                </span>
                <select
                  value={normalizedStartYear}
                  onChange={(event) => setStartYear(event.target.value)}
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
                  {t("comparison.endYear")}
                </span>
                <select
                  value={normalizedEndYear}
                  onChange={(event) => setEndYear(event.target.value)}
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

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                {t("common.currency")}
              </span>
              <select
                value={selectedCurrency}
                onChange={(event) =>
                  onCurrencyChange(event.target.value as CurrencyCode)
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              >
                {currencyCodes.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <DataSourceBadge source={assetADataSource} symbol={assetA.displaySymbol} />
              <DataSourceBadge source={assetBDataSource} symbol={assetB.displaySymbol} />
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <ComparisonCard
              label={`${assetA.displaySymbol} ${t("comparison.finalValue")}`}
              value={formatMoney(resultA.finalValue, selectedCurrency, locale)}
              valueClassName="text-cyan-300"
            />
            <ComparisonCard
              label={`${assetB.displaySymbol} ${t("comparison.finalValue")}`}
              value={formatMoney(resultB.finalValue, selectedCurrency, locale)}
              valueClassName="text-emerald-300"
            />
            <ComparisonCard
              label={`${assetA.displaySymbol} ${t("comparison.totalProfit")}`}
              value={formatMoney(resultA.totalProfit, selectedCurrency, locale)}
            />
            <ComparisonCard
              label={`${assetB.displaySymbol} ${t("comparison.totalProfit")}`}
              value={formatMoney(resultB.totalProfit, selectedCurrency, locale)}
            />
            <ComparisonCard
              label={`${assetA.displaySymbol} ${t("comparison.totalReturn")}`}
              value={`${formatPercent(resultA.totalReturn, locale)}%`}
              valueClassName="text-cyan-300"
            />
            <ComparisonCard
              label={`${assetB.displaySymbol} ${t("comparison.totalReturn")}`}
              value={`${formatPercent(resultB.totalReturn, locale)}%`}
              valueClassName="text-emerald-300"
            />
            <ComparisonCard
              label={t("comparison.difference")}
              value={formatMoney(
                Math.abs(finalValueDifference),
                selectedCurrency,
                locale
              )}
              valueClassName={
                finalValueDifference >= 0 ? "text-cyan-300" : "text-emerald-300"
              }
            />
            <ComparisonCard
              label={t("comparison.betterPerformer")}
              value={betterPerformer}
              valueClassName="text-white"
            />
          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:text-sm">
                  {t("comparison.chartEyebrow")}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold sm:text-2xl">
                  {t("comparison.chartTitle")}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  {assetA.displaySymbol}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  {assetB.displaySymbol}
                </div>
              </div>
            </div>

            <div className="h-[240px] w-full min-w-0 sm:h-[300px] lg:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 8, right: 10, bottom: 0, left: 0 }}
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
                    width={62}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatMoney(Number(value ?? 0), selectedCurrency, locale),
                      name === "assetA"
                        ? assetA.displaySymbol
                        : assetB.displaySymbol,
                    ]}
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
                    dataKey="assetA"
                    name={assetA.displaySymbol}
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: "#22d3ee", strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="assetB"
                    name={assetB.displaySymbol}
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: "#34d399", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
            <p className="text-sm leading-6 text-slate-300">
              {t("comparison.explanation")}
            </p>
            {(assetADataSource === "mock" || assetBDataSource === "mock") && (
              <p className="mt-2 text-sm leading-6 text-amber-100">
                {t("comparison.sampleWarning")}
              </p>
            )}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={copyComparisonLink}
                className="w-full rounded-2xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
              >
                {t("comparison.copyLink")}
              </button>
              <button
                type="button"
                onClick={copyComparisonCaption}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-200 sm:w-auto"
              >
                {t("comparison.copyCaption")}
              </button>
            </div>
            {copiedLink ? (
              <p className="mt-3 text-sm font-semibold text-emerald-300">
                {t("comparison.linkCopied")}
              </p>
            ) : null}
            {copiedCaption ? (
              <p className="mt-3 text-sm font-semibold text-emerald-300">
                {t("comparison.captionCopied")}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );

  function DataSourceBadge({
    source,
    symbol,
  }: {
    source: "csv" | "mock";
    symbol: string;
  }) {
    return (
      <div
        className={`rounded-2xl border px-3 py-2 text-sm ${
          source === "csv"
            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
            : "border-amber-300/30 bg-amber-300/10 text-amber-100"
        }`}
      >
        <p className="font-semibold">{symbol}</p>
        <p className="mt-0.5 text-xs leading-4">
          {source === "csv"
            ? t("comparison.historicalData")
            : t("comparison.sampleData")}
        </p>
      </div>
    );
  }
}

function ComparisonCard({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20">
      <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
        {label}
      </p>
      <p
        className={`mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.35rem,2.5vw,1.7rem)] font-bold leading-tight [overflow-wrap:anywhere] ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}
