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
  shareUrl: string;
  copiedShareLink: boolean;
  copiedSocialCaption: boolean;
  onShareResult: () => void;
  onCopyShareLink: () => void;
  onCopySocialCaption: () => void;
  onDownloadResultImage: () => void;
  displayedDataSource: "csv" | "mock";
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
  shareUrl,
  copiedShareLink,
  copiedSocialCaption,
  onShareResult,
  onCopyShareLink,
  onCopySocialCaption,
  onDownloadResultImage,
  displayedDataSource,
}: DcaBacktestCalculatorProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section>
      <div className="mb-3 max-w-4xl sm:mb-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:mb-2 sm:text-sm sm:tracking-[0.24em]">
          {t("dca.eyebrow")}
        </p>
        <h2 className="max-w-4xl text-xl font-bold tracking-tight sm:text-2xl md:text-4xl">
          {t("dca.title")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base sm:leading-7">
          {t("dca.description")}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[400px_1fr] lg:gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:rounded-3xl sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.2em]">
                {t("dca.inputsEyebrow")}
              </p>
              <h3 className="mt-1.5 text-xl font-semibold sm:mt-2 sm:text-2xl">
                {t("dca.scenarioTitle")}
              </h3>
            </div>
            <div className="max-w-full rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-left text-sm font-medium text-cyan-300 sm:max-w-[220px] sm:text-right">
              <p>
                {displayedDataSource === "csv"
                  ? t("dca.csvDataSource")
                  : t("dca.mockDataSource")}
              </p>
              <p className="mt-0.5 text-xs leading-4 text-cyan-100/80">
                {displayedDataSource === "csv"
                  ? t("dca.dataSource.yahoo")
                  : t("dca.dataUnavailableNote")}
              </p>
            </div>
          </div>
          <details className="mb-4 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300 sm:-mt-3 sm:mb-6">
            <summary className="cursor-pointer font-semibold text-cyan-200">
              {t("dca.dataSource.detailsTitle")}
            </summary>
            <p className="mt-2 leading-6 text-slate-400">
              {displayedDataSource === "csv"
                ? t("dca.dataSource.historicalNote")
                : t("dca.dataSource.sampleNote")}
            </p>
          </details>

          <div className="space-y-4 sm:space-y-5">
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

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:mt-6">
            <p className="text-sm text-slate-400">
              {t("dca.sharesAccumulated")}
            </p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="min-w-0 break-words text-2xl font-bold leading-tight text-emerald-300 sm:text-3xl">
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

        <div className="space-y-4 sm:space-y-6">
          <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-4">
            <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-5">
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
            <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-5">
              <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
                {t("metrics.finalValueTitle")}
              </p>
              <p className="mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-tight text-cyan-300 [overflow-wrap:anywhere]">
                {formatMoney(backtest.finalValue, selectedCurrency, locale)}
              </p>
            </div>
            <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-5">
              <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
                {t("metrics.totalProfit")}
              </p>
              <p className="mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-tight text-emerald-400 [overflow-wrap:anywhere]">
                {formatMoney(backtest.totalProfit, selectedCurrency, locale)}
              </p>
            </div>
            <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-5">
              <p className="min-w-0 truncate whitespace-nowrap text-sm text-slate-400">
                {t("metrics.totalReturn")}
              </p>
              <p className="mt-2 min-w-0 whitespace-normal break-words text-[clamp(1.5rem,2.4vw,1.875rem)] font-bold leading-tight text-cyan-400 [overflow-wrap:anywhere]">
                {formatPercent(backtest.totalReturn, locale)}%
              </p>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 shadow-xl shadow-cyan-950/20 sm:rounded-3xl">
            <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-sm leading-6 text-slate-300">
                  {t("dca.returnSummary", {
                    returnValue: formatPercent(backtest.totalReturn, locale),
                    symbol: selectedInstrument?.displaySymbol ?? backtestSymbol,
                  })}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {t("share.copyDescription")}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
                <button
                  type="button"
                  onClick={onShareResult}
                  className="w-full rounded-2xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
                  aria-label={t("share.title")}
                >
                  {t("share.shareResult")}
                </button>
                <button
                  type="button"
                  onClick={onCopyShareLink}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-200 sm:w-auto"
                  aria-label={t("share.copyDescription")}
                >
                  {t("share.copyLink")}
                </button>
                <button
                  type="button"
                  onClick={onDownloadResultImage}
                  className="w-full rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20 sm:w-auto"
                  aria-label={t("share.downloadResultImage")}
                >
                  {t("share.downloadResultImage")}
                </button>
                <button
                  type="button"
                  onClick={onCopySocialCaption}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-emerald-300/40 hover:text-emerald-200 sm:w-auto"
                  aria-label={t("caption.copyCaption")}
                >
                  {t("caption.copyCaption")}
                </button>
              </div>
            </div>
            <div className="mt-2 min-w-0">
              {copiedShareLink ? (
                <p className="text-sm font-semibold text-emerald-300">
                  {t("share.linkCopied")}
                </p>
              ) : null}
              {copiedSocialCaption ? (
                <p className="text-sm font-semibold text-emerald-300">
                  {t("caption.captionCopied")}
                </p>
              ) : null}
              {shareUrl ? (
                <p className="mt-2 truncate rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-xs text-slate-500">
                  {shareUrl}
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 sm:rounded-3xl sm:p-6">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-start sm:gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.2em]">
                  {t("dca.projectionEyebrow")}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold sm:mt-2 sm:text-2xl">
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

            <div className="h-[240px] w-full sm:h-[300px] lg:h-[320px]">
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
                    width={62}
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

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.2em]">
                  {t("dca.annualDetail")}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold sm:mt-2 sm:text-2xl">
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
