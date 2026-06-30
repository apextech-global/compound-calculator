"use client";

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
import type { CurrencyCode } from "@/lib/currencies";
import { convertCurrencyToUsd } from "@/lib/currencies";
import type { DcaBacktestResult } from "@/lib/calculations";
import {
  formatCompactMoney,
  formatInputAmount,
  formatMoney,
  formatPercent,
  formatShares,
} from "@/lib/formatting";
import type { AssetType, Instrument } from "@/lib/instruments";
import type { SymbolKey } from "@/lib/mockMarketData";

type DcaBacktestCalculatorProps = {
  selectedCurrency: CurrencyCode;
  backtest: DcaBacktestResult;
  backtestChartData: Array<{
    year: number;
    portfolioValue: number;
    invested: number;
  }>;
  countryOptions: string[];
  assetTypeOptions: AssetType[];
  filteredInstruments: Instrument[];
  selectedInstrument: Instrument | undefined;
  backtestCountry: string;
  backtestAssetType: AssetType;
  backtestSymbol: SymbolKey;
  backtestMonthlyAmount: string;
  backtestStartYear: string;
  backtestEndYear: string;
  availableYears: number[];
  showBacktestTable: boolean;
  setBacktestCountry: (value: string) => void;
  setBacktestAssetType: (value: AssetType) => void;
  setBacktestSymbol: (value: SymbolKey) => void;
  setBacktestMonthlyAmount: (value: string) => void;
  setBacktestStartYear: (value: string) => void;
  setBacktestEndYear: (value: string) => void;
  setShowBacktestTable: (updater: (value: boolean) => boolean) => void;
};

export default function DcaBacktestCalculator({
  selectedCurrency,
  backtest,
  backtestChartData,
  countryOptions,
  assetTypeOptions,
  filteredInstruments,
  selectedInstrument,
  backtestCountry,
  backtestAssetType,
  backtestSymbol,
  backtestMonthlyAmount,
  backtestStartYear,
  backtestEndYear,
  availableYears,
  showBacktestTable,
  setBacktestCountry,
  setBacktestAssetType,
  setBacktestSymbol,
  setBacktestMonthlyAmount,
  setBacktestStartYear,
  setBacktestEndYear,
  setShowBacktestTable,
}: DcaBacktestCalculatorProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
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

        <div className="min-w-0 overflow-hidden rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-6 shadow-2xl shadow-cyan-950/30">
          <p className="min-w-0 truncate whitespace-nowrap text-sm font-medium text-cyan-100">
            {t("dca.endingValue")}
          </p>
          <p className="mt-3 min-w-0 whitespace-normal break-words text-[clamp(2rem,4vw,2.5rem)] font-bold leading-tight text-cyan-300 [overflow-wrap:anywhere]">
            {formatMoney(backtest.finalValue, selectedCurrency, locale)}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            {t("dca.returnSummary", {
              returnValue: formatPercent(backtest.totalReturn, locale),
              symbol: selectedInstrument?.displaySymbol ?? backtestSymbol,
            })}
          </p>
          {selectedInstrument ? (
            <div className="mt-2 space-y-1 text-sm leading-6 text-slate-400">
              <p>
                {selectedInstrument.displaySymbol} - {selectedInstrument.name}
              </p>
              <p>
                {selectedInstrument.country} / {selectedInstrument.exchange} /{" "}
                {selectedInstrument.currency}
              </p>
            </div>
          ) : null}
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
              {backtest.dataSource === "csv"
                ? t("dca.csvDataSource")
                : t("dca.mockDataSource")}
            </div>
          </div>
          {backtest.dataSource === "mock" ? (
            <p className="-mt-3 mb-6 text-sm leading-6 text-amber-200/90">
              {t("dca.dataUnavailableNote")}
            </p>
          ) : null}

          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                {t("dca.countryMarket")}
              </span>
              <select
                value={backtestCountry}
                onChange={(e) => setBacktestCountry(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              >
                {countryOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">
                  {t("dca.assetType")}
                </span>
                <select
                  value={backtestAssetType}
                  onChange={(e) =>
                    setBacktestAssetType(e.target.value as AssetType)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                >
                  {assetTypeOptions.map((assetType) => (
                    <option key={assetType} value={assetType}>
                      {assetType === "ETF" ? t("dca.etf") : t("dca.stock")}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">
                  {t("dca.asset")}
                </span>
                <select
                  value={backtestSymbol}
                  onChange={(e) =>
                    setBacktestSymbol(e.target.value as SymbolKey)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                >
                  {filteredInstruments.map((instrument) => (
                    <option key={instrument.id} value={instrument.id}>
                      {instrument.displaySymbol} - {instrument.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedInstrument ? (
              <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                <p>
                  <span className="text-slate-500">{t("dca.asset")}:</span>{" "}
                  {selectedInstrument.displaySymbol} - {selectedInstrument.name}
                </p>
                <p>
                  <span className="text-slate-500">
                    {t("dca.countryMarket")}:
                  </span>{" "}
                  {selectedInstrument.country}
                </p>
                <p>
                  <span className="text-slate-500">{t("dca.exchange")}:</span>{" "}
                  {selectedInstrument.exchange}
                </p>
                <p>
                  <span className="text-slate-500">
                    {t("common.currency")}:
                  </span>{" "}
                  {selectedInstrument.currency}
                </p>
              </div>
            ) : null}

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

          <p className="mt-4 text-sm leading-6 text-slate-400">
            {t("dca.dataNote")}
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid min-w-0 gap-4 md:grid-cols-4">
            <div className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
              <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
                {t("metrics.totalInvested")}
              </p>
              <p className="mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-tight [overflow-wrap:anywhere]">
                {formatMoney(
                  backtest.totalInvested,
                  selectedCurrency,
                  locale
                )}
              </p>
            </div>
            <div className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
              <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
                {t("metrics.finalValueTitle")}
              </p>
              <p className="mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-tight text-cyan-300 [overflow-wrap:anywhere]">
                {formatMoney(backtest.finalValue, selectedCurrency, locale)}
              </p>
            </div>
            <div className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
              <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
                {t("metrics.totalProfit")}
              </p>
              <p className="mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-tight text-emerald-400 [overflow-wrap:anywhere]">
                {formatMoney(backtest.totalProfit, selectedCurrency, locale)}
              </p>
            </div>
            <div className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
              <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
                {t("metrics.totalReturn")}
              </p>
              <p className="mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-tight text-cyan-400 [overflow-wrap:anywhere]">
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
                      formatMoney(Number(value ?? 0), selectedCurrency, locale)
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
                      <th className="py-3 pr-6">{t("table.totalShares")}</th>
                      <th className="py-3">{t("table.portfolioValue")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backtest.yearlyResults.map((item) => (
                      <tr key={item.year} className="border-t border-white/10">
                        <td className="py-3 pr-6 text-slate-300">
                          {item.year}
                        </td>
                        <td className="py-3 pr-6">
                          {formatMoney(item.price, selectedCurrency, locale)}
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

      <p className="mt-6 text-sm leading-6 text-slate-400">
        {t("dca.disclaimer")}
      </p>
    </section>
  );
}
