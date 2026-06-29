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
import SummaryCard from "./SummaryCard";

type CompoundInterestCalculatorProps = {
  selectedCurrency: CurrencyCode;
  result: CompoundResult;
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

  return (
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
            <SummaryCard
              label={t("metrics.finalValueTitle")}
              value={formatMoney(result.finalValue, selectedCurrency, locale)}
              valueClassName="text-emerald-400"
            />
            <SummaryCard
              label={t("metrics.totalInvested")}
              value={formatMoney(result.totalInvested, selectedCurrency, locale)}
            />
            <SummaryCard
              label={t("metrics.totalProfit")}
              value={formatMoney(result.totalProfit, selectedCurrency, locale)}
              valueClassName="text-cyan-400"
            />
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
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-400">
        {t("compound.disclaimer")}
      </p>
    </section>
  );
}
