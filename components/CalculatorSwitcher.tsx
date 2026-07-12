"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";

type ActiveCalculator = "dca" | "compound";

type CalculatorSwitcherProps = {
  activeCalculator: ActiveCalculator;
  onCalculatorChange: (calculator: ActiveCalculator) => void;
};

type SwitcherCopy = {
  label: string;
  dca: string;
  compound: string;
};

const switcherCopy: Record<string, SwitcherCopy> = {
  en: { label: "Calculator mode", dca: "DCA Backtest", compound: "Compound Interest" },
  "zh-CN": { label: "计算器模式", dca: "定投回测", compound: "复利计算" },
  "zh-TW": { label: "計算器模式", dca: "定期定額回測", compound: "複利計算" },
  ms: { label: "Mod kalkulator", dca: "Backtest DCA", compound: "Faedah Kompaun" },
  id: { label: "Mode kalkulator", dca: "Backtest DCA", compound: "Bunga Majemuk" },
};

export const CALCULATOR_TAB_IDS: Record<ActiveCalculator, string> = {
  dca: "calculator-tab-dca",
  compound: "calculator-tab-compound",
};

const TAB_ORDER: ActiveCalculator[] = ["dca", "compound"];

export default function CalculatorSwitcher({
  activeCalculator,
  onCalculatorChange,
}: CalculatorSwitcherProps) {
  const locale = useLocale();
  const copy = switcherCopy[locale] ?? switcherCopy.en;
  const tabRefs = useRef<Partial<Record<ActiveCalculator, HTMLButtonElement | null>>>({});

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    current: ActiveCalculator
  ) => {
    const currentIndex = TAB_ORDER.indexOf(current);
    let next: ActiveCalculator | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = TAB_ORDER[(currentIndex + 1) % TAB_ORDER.length];
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = TAB_ORDER[(currentIndex - 1 + TAB_ORDER.length) % TAB_ORDER.length];
    } else if (event.key === "Home") {
      next = TAB_ORDER[0];
    } else if (event.key === "End") {
      next = TAB_ORDER[TAB_ORDER.length - 1];
    }

    if (next) {
      event.preventDefault();
      onCalculatorChange(next);
      tabRefs.current[next]?.focus();
    }
  };

  const tabClassName = (calculator: ActiveCalculator, activeClasses: string) =>
    `min-w-0 flex-1 whitespace-normal break-words rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:flex-none ${
      activeCalculator === calculator
        ? activeClasses
        : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
    }`;

  return (
    <div
      role="tablist"
      aria-label={copy.label}
      aria-orientation="horizontal"
      className="mb-3 flex w-full max-w-full flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 sm:mb-4 sm:w-auto sm:flex-nowrap"
    >
      <button
        type="button"
        role="tab"
        id={CALCULATOR_TAB_IDS.dca}
        aria-selected={activeCalculator === "dca"}
        aria-controls="calculator"
        tabIndex={activeCalculator === "dca" ? 0 : -1}
        ref={(el) => {
          tabRefs.current.dca = el;
        }}
        data-testid="dca-open-button"
        onClick={() => onCalculatorChange("dca")}
        onKeyDown={(event) => handleKeyDown(event, "dca")}
        className={tabClassName("dca", "bg-cyan-400 text-slate-950")}
      >
        {copy.dca}
      </button>
      <button
        type="button"
        role="tab"
        id={CALCULATOR_TAB_IDS.compound}
        aria-selected={activeCalculator === "compound"}
        aria-controls="calculator"
        tabIndex={activeCalculator === "compound" ? 0 : -1}
        ref={(el) => {
          tabRefs.current.compound = el;
        }}
        data-testid="compound-open-button"
        onClick={() => onCalculatorChange("compound")}
        onKeyDown={(event) => handleKeyDown(event, "compound")}
        className={tabClassName("compound", "bg-emerald-400 text-slate-950")}
      >
        {copy.compound}
      </button>
    </div>
  );
}
