"use client";

import { useLocale, useTranslations } from "next-intl";
import type { CurrencyCode } from "@/lib/currencies";
import { formatMoney, formatPercent } from "@/lib/formatting";

type CalculatorSwitcherProps = {
  activeCalculator: "dca" | "compound";
  selectedCurrency: CurrencyCode;
  backtestSymbol: string;
  backtestFinalValue: number;
  backtestTotalReturn: number;
  compoundYears: string;
  compoundFinalValue: number;
  growthMultiple: number;
  onCalculatorChange: (calculator: "dca" | "compound") => void;
};

export default function CalculatorSwitcher({
  activeCalculator,
  selectedCurrency,
  backtestSymbol,
  backtestFinalValue,
  backtestTotalReturn,
  compoundYears,
  compoundFinalValue,
  growthMultiple,
  onCalculatorChange,
}: CalculatorSwitcherProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onCalculatorChange("dca")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              onCalculatorChange("dca");
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
                {formatMoney(backtestFinalValue, selectedCurrency, locale)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {t("metrics.return")}
              </p>
              <p className="mt-1 text-xl font-bold text-emerald-300">
                {formatPercent(backtestTotalReturn, locale)}%
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onCalculatorChange("dca");
            }}
            className="mt-6 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            {t("cards.dca.cta")}
          </button>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => onCalculatorChange("compound")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              onCalculatorChange("compound");
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
                {Number(compoundYears) || 0}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {t("metrics.finalValue")}
              </p>
              <p className="mt-1 text-xl font-bold text-emerald-300">
                {formatMoney(compoundFinalValue, selectedCurrency, locale)}
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
              onCalculatorChange("compound");
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
          onClick={() => onCalculatorChange("dca")}
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
          onClick={() => onCalculatorChange("compound")}
          className={`rounded-xl px-5 py-3 transition ${
            activeCalculator === "compound"
              ? "bg-emerald-400 text-slate-950"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          {t("cards.compound.title")}
        </button>
      </div>
    </>
  );
}
