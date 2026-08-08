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
import type { CompoundResult } from "@/lib/calculations";
import type { CurrencyCode } from "@/lib/currencies";
import { convertCurrencyToUsd } from "@/lib/currencies";
import {
  formatCompactMoney,
  formatInputAmount,
  formatMoney,
} from "@/lib/formatting";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import {
  getPerformanceTone,
  getPerformanceToneClassName,
} from "@/lib/performanceTone";
import NextStepCta from "./NextStepCta";
import SummaryCard from "./SummaryCard";

type CompoundInterestCalculatorProps = {
  selectedCurrency: CurrencyCode;
  result: CompoundResult;
  hasCalculated: boolean;
  onCalculate: () => void;
  chartData: Array<{
    year: string;
    balance: number;
    invested: number;
  }>;
  growthMultiple: number;
  initialAmount: string;
  monthlyContribution: string;
  annualReturn: string;
  years: string;
  showCompoundTable: boolean;
  setInitialAmount: (value: string) => void;
  setMonthlyContribution: (value: string) => void;
  setAnnualReturn: (value: string) => void;
  setYears: (value: string) => void;
  setShowCompoundTable: (updater: (value: boolean) => boolean) => void;
};

export default function CompoundInterestCalculator({
  selectedCurrency,
  result,
  hasCalculated,
  onCalculate,
  chartData,
  growthMultiple,
  initialAmount,
  monthlyContribution,
  annualReturn,
  years,
  showCompoundTable,
  setInitialAmount,
  setMonthlyContribution,
  setAnnualReturn,
  setYears,
  setShowCompoundTable,
}: CompoundInterestCalculatorProps) {
  const t = useTranslations();
  const locale = useLocale();
  const prefersReducedMotion = usePrefersReducedMotion();
  const canCalculate =
    Number(years) > 0 &&
    Number(annualReturn) >= 0 &&
    (Number(initialAmount) > 0 || Number(monthlyContribution) > 0);
  const totalProfitTone = getPerformanceTone(result.totalProfit);

  return (
    <section
      data-testid="calculator-dashboard"
      data-reduced-motion={prefersReducedMotion}
      className="calculator-dashboard w-full min-w-0"
    >
      <div className="mb-3 w-full min-w-0 sm:mb-4">
        <div className="min-w-0">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 sm:mb-2 sm:text-sm sm:tracking-[0.24em]">
            {t("compound.eyebrow")}
          </p>
          <h2 className="max-w-4xl break-words text-xl font-bold tracking-tight sm:text-2xl md:text-4xl">
            {t("compound.title")}
          </h2>
          <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base sm:leading-7">
            {t("compound.description")}
          </p>
        </div>
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-5">
        <div data-testid="calculator-input-panel" className="calculator-input-panel w-full min-w-0 rounded-2xl border p-4 sm:rounded-3xl sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.2em]">
                {t("compound.inputsEyebrow")}
              </p>
              <h3 className="mt-1.5 text-xl font-semibold sm:mt-2 sm:text-2xl">
                {t("compound.detailsTitle")}
              </h3>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
              {selectedCurrency}
            </div>
          </div>

          <div
            role="group"
            aria-labelledby="compound-investment-plan-heading"
            className="calculator-input-group space-y-4 sm:space-y-5"
          >
            <p
              id="compound-investment-plan-heading"
              className="calculator-input-group-title"
            >
              {t("calculatorDashboard.groups.investmentPlan")}
            </p>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                {t("compound.initialInvestment")}
              </span>
              <input
                type="number"
                min="0"
                value={formatInputAmount(initialAmount, selectedCurrency)}
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
                value={formatInputAmount(monthlyContribution, selectedCurrency)}
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

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:mt-6">
            <p className="text-sm text-slate-400">
              {t("compound.estimatedAnnualReturn")}
            </p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-2xl font-bold text-cyan-300 sm:text-3xl">
                {Number(annualReturn) || 0}%
              </p>
              <p className="text-right text-sm text-slate-400">
                {t("compound.compoundedMonthly")}
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="calculate-primary-button"
            onClick={onCalculate}
            disabled={!canCalculate}
            className="calculator-primary-button mt-4 w-full px-5 py-3.5 text-base font-bold sm:mt-6"
          >
            {t("calculatorDashboard.calculateProjection")}
          </button>
        </div>

        <div
          data-testid="calculator-result-panel"
          className="calculator-result-panel min-w-0 space-y-4 sm:space-y-6"
        >
          {hasCalculated && canCalculate ? (
            <>
          <div data-testid="calculator-primary-metrics" className="space-y-3 sm:space-y-4">
            <div
              data-result-reveal-step="1"
              className="calculator-result-reveal"
            >
              <SummaryCard
                label={t("metrics.finalValueTitle")}
                value={formatMoney(result.finalValue, selectedCurrency, locale)}
                valueClassName="text-emerald-400"
                primary
                testId="metric-final-value"
              />
            </div>
            <div
              data-result-reveal-step="2"
              className="calculator-result-reveal grid gap-3 sm:grid-cols-2 sm:gap-4"
            >
              <SummaryCard
                label={t("metrics.totalInvested")}
                value={formatMoney(result.totalInvested, selectedCurrency, locale)}
              />
              <SummaryCard
                label={t("metrics.totalProfit")}
                value={formatMoney(result.totalProfit, selectedCurrency, locale)}
                valueClassName={getPerformanceToneClassName(totalProfitTone)}
                performanceTone={totalProfitTone}
                testId="metric-total-profit"
              />
            </div>
          </div>

          <p
            data-result-reveal-step="3"
            className="calculator-result-reveal rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm leading-6 text-slate-300"
          >
            {t("compound.growthSummary", {
              multiple: growthMultiple.toFixed(1),
              years: Number(years) || 0,
            })}
          </p>

          <div
            data-result-reveal-step="5"
            className="calculator-result-reveal min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 sm:rounded-3xl sm:p-6"
          >
            <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-start sm:gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.2em]">
                  {t("compound.projectionEyebrow")}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold sm:mt-2 sm:text-2xl">
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

            <div className="h-[240px] w-full min-w-0 sm:h-[300px] lg:h-[320px]">
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
                    cursor={{
                      stroke: "rgba(148, 163, 184, 0.45)",
                      strokeDasharray: "4 4",
                      strokeWidth: 1,
                    }}
                    isAnimationActive={!prefersReducedMotion}
                    animationDuration={160}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    name={t("compound.portfolioBalance")}
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: "#34d399",
                      stroke: "#e2e8f0",
                      strokeWidth: 2,
                    }}
                    isAnimationActive={!prefersReducedMotion}
                    animationDuration={420}
                    animationEasing="ease-out"
                  />
                  <Line
                    type="monotone"
                    dataKey="invested"
                    name={t("compound.totalInvested")}
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: "#22d3ee",
                      stroke: "#e2e8f0",
                      strokeWidth: 2,
                    }}
                    isAnimationActive={!prefersReducedMotion}
                    animationDuration={420}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.2em]">
                  {t("compound.annualDetail")}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold sm:mt-2 sm:text-2xl">
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
              <div className="mt-6 w-full overflow-x-auto">
                <table className="min-w-max text-left text-sm">
                  <thead className="text-slate-400">
                    <tr>
                      <th className="py-3 pr-6">{t("table.year")}</th>
                      <th className="py-3 pr-6">{t("table.balance")}</th>
                      <th className="py-3 pr-6">{t("table.invested")}</th>
                      <th className="py-3">{t("table.profit")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyResults.map((item) => (
                      <tr key={item.year} className="border-t border-white/10">
                        <td className="py-3 pr-6 text-slate-300">
                          {item.year}
                        </td>
                        <td className="py-3 pr-6">
                          {formatMoney(item.balance, selectedCurrency, locale)}
                        </td>
                        <td className="py-3 pr-6">
                          {formatMoney(item.invested, selectedCurrency, locale)}
                        </td>
                        <td className="py-3 text-emerald-400">
                          {formatMoney(item.profit, selectedCurrency, locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
            </>
          ) : (
            <div
              data-testid="calculator-empty-state"
              role="status"
              aria-live="polite"
              className="calculator-empty-state"
            >
              <div
                aria-hidden="true"
                data-empty-state-item="icon"
                className="calculator-empty-state-icon calculator-empty-state-item calculator-empty-state-item--icon"
              >
                <span />
                <span />
                <span />
              </div>
              <div
                data-empty-state-item="heading"
                className="calculator-empty-state-item calculator-empty-state-item--heading"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  {t("calculatorDashboard.resultTitle")}
                </p>
                <p className="mt-3 max-w-md text-lg font-semibold leading-7 text-slate-100 sm:text-xl">
                  {t("calculatorDashboard.emptyCompound")}
                </p>
              </div>
              <p
                data-empty-state-item="supporting-text"
                className="calculator-empty-state-item calculator-empty-state-item--support mt-2 max-w-md text-sm leading-6 text-slate-400"
              >
                {t("calculatorDashboard.emptyHint")}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-400">
        {t("compound.disclaimer")}
      </p>
      {hasCalculated && canCalculate ? (
        <div className="mx-auto max-w-3xl text-center">
          <NextStepCta />
        </div>
      ) : null}
    </section>
  );
}
