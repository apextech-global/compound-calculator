"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import CalculatorSwitcher from "@/components/CalculatorSwitcher";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import DcaBacktestCalculator from "@/components/DcaBacktestCalculator";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import {
  calculateCompoundInterest,
  calculateDcaBacktest,
} from "@/lib/calculations";
import { getDefaultCurrency, type CurrencyCode } from "@/lib/currencies";
import type { SymbolKey } from "@/lib/mockMarketData";

type ActiveCalculator = "dca" | "compound";

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

  const result = useMemo(
    () =>
      calculateCompoundInterest({
        initialAmount,
        monthlyContribution,
        annualReturn,
        years,
      }),
    [initialAmount, monthlyContribution, annualReturn, years]
  );

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

  const backtest = useMemo(
    () =>
      calculateDcaBacktest({
        symbol: backtestSymbol,
        monthlyAmount: backtestMonthlyAmount,
        startYear: backtestStartYear,
        endYear: backtestEndYear,
      }),
    [
      backtestEndYear,
      backtestMonthlyAmount,
      backtestStartYear,
      backtestSymbol,
    ]
  );

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
      <Navbar
        activeCalculator={activeCalculator}
        selectedCurrency={selectedCurrency}
        onCalculatorChange={setActiveCalculator}
        onCurrencyChange={setSelectedCurrency}
      />

      <section className="relative mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.14),_transparent_28%)]" />

        <Hero />

        <CalculatorSwitcher
          activeCalculator={activeCalculator}
          selectedCurrency={selectedCurrency}
          backtestSymbol={backtestSymbol}
          backtestFinalValue={backtest.finalValue}
          backtestTotalReturn={backtest.totalReturn}
          compoundYears={years}
          compoundFinalValue={result.finalValue}
          growthMultiple={growthMultiple}
          onCalculatorChange={setActiveCalculator}
        />

        {activeCalculator === "dca" ? (
          <DcaBacktestCalculator
            selectedCurrency={selectedCurrency}
            backtest={backtest}
            backtestChartData={backtestChartData}
            backtestSymbol={backtestSymbol}
            backtestMonthlyAmount={backtestMonthlyAmount}
            backtestStartYear={backtestStartYear}
            backtestEndYear={backtestEndYear}
            showBacktestTable={showBacktestTable}
            setBacktestSymbol={setBacktestSymbol}
            setBacktestMonthlyAmount={setBacktestMonthlyAmount}
            setBacktestStartYear={setBacktestStartYear}
            setBacktestEndYear={setBacktestEndYear}
            setShowBacktestTable={setShowBacktestTable}
          />
        ) : (
          <CompoundInterestCalculator
            selectedCurrency={selectedCurrency}
            result={result}
            chartData={chartData}
            growthMultiple={growthMultiple}
            initialAmount={initialAmount}
            monthlyContribution={monthlyContribution}
            annualReturn={annualReturn}
            years={years}
            showCompoundTable={showCompoundTable}
            setInitialAmount={setInitialAmount}
            setMonthlyContribution={setMonthlyContribution}
            setAnnualReturn={setAnnualReturn}
            setYears={setYears}
            setShowCompoundTable={setShowCompoundTable}
          />
        )}
      </section>
    </main>
  );
}
