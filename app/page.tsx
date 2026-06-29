"use client";

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

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatShares(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(value);
}

function formatPercent(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value);
}

export default function Home() {
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
        year: "Start",
        balance: Number(initialAmount) || 0,
        invested: Number(initialAmount) || 0,
      },
      ...result.yearlyResults.map((item) => ({
        year: `Year ${item.year}`,
        balance: Math.round(item.balance),
        invested: Math.round(item.invested),
      })),
    ],
    [initialAmount, result.yearlyResults]
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
      <section className="relative mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.14),_transparent_28%)]" />

        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Compound Calculator
            </p>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              Grow Your Money With Compound Interest
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Model long-term portfolio growth with recurring contributions,
              compound returns, and a clear year-by-year investment projection.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6 shadow-2xl shadow-emerald-950/40">
            <p className="text-sm font-medium text-emerald-200">
              Projected portfolio value
            </p>
            <p className="mt-3 text-4xl font-bold text-emerald-300">
              {formatMoney(result.finalValue)}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              That is {growthMultiple.toFixed(1)}x your estimated invested
              capital over {Number(years) || 0} years.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                  Inputs
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Investment Details
                </h2>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                USD
              </div>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">
                  Initial Investment
                </span>
                <input
                  type="number"
                  min="0"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">
                  Monthly Contribution
                </span>
                <input
                  type="number"
                  min="0"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">
                  Annual Return Rate %
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
                  Investment Years
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
              <p className="text-sm text-slate-400">Estimated annual return</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-3xl font-bold text-cyan-300">
                  {Number(annualReturn) || 0}%
                </p>
                <p className="text-right text-sm text-slate-400">
                  Compounded monthly
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                <p className="text-sm text-slate-400">Final Value</p>
                <p className="mt-2 text-3xl font-bold text-emerald-400">
                  {formatMoney(result.finalValue)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                <p className="text-sm text-slate-400">Total Invested</p>
                <p className="mt-2 text-3xl font-bold">
                  {formatMoney(result.totalInvested)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20">
                <p className="text-sm text-slate-400">Total Profit</p>
                <p className="mt-2 text-3xl font-bold text-cyan-400">
                  {formatMoney(result.totalProfit)}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                    Projection
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Portfolio Growth Over Time
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Portfolio balance
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    Total invested
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
                      tickFormatter={formatCompactMoney}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      width={72}
                    />
                    <Tooltip
                      formatter={(value) => formatMoney(Number(value ?? 0))}
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
                      name="Portfolio balance"
                      stroke="#34d399"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: "#34d399", strokeWidth: 0 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="invested"
                      name="Total invested"
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
              <h2 className="mb-4 text-2xl font-semibold">Yearly Table</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-slate-400">
                    <tr>
                      <th className="py-3 pr-6">Year</th>
                      <th className="py-3 pr-6">Balance</th>
                      <th className="py-3 pr-6">Invested</th>
                      <th className="py-3">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyResults.map((item) => (
                      <tr key={item.year} className="border-t border-white/10">
                        <td className="py-3 pr-6 text-slate-300">
                          {item.year}
                        </td>
                        <td className="py-3 pr-6">
                          {formatMoney(item.balance)}
                        </td>
                        <td className="py-3 pr-6">
                          {formatMoney(item.invested)}
                        </td>
                        <td className="py-3 text-emerald-400">
                          {formatMoney(item.profit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-400">
          This calculator is for educational purposes only and does not provide
          financial advice.
        </p>

        <section className="mt-16 border-t border-white/10 pt-14">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Historical DCA Backtest
              </p>

              <h2 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">
                Test a Monthly Investment Against Mock Market History
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Compare how a steady monthly contribution could have performed
                across sample yearly prices for popular ETFs and stocks.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-6 shadow-2xl shadow-cyan-950/30">
              <p className="text-sm font-medium text-cyan-100">
                Backtested ending value
              </p>
              <p className="mt-3 text-4xl font-bold text-cyan-300">
                {formatMoney(backtest.finalValue)}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {formatPercent(backtest.totalReturn)}% total return using mock
                yearly prices for {backtestSymbol}.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                    Backtest Inputs
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    DCA Scenario
                  </h3>
                </div>
                <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                  Mock data
                </div>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">
                    Symbol
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
                    Monthly Investment Amount
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={backtestMonthlyAmount}
                    onChange={(e) => setBacktestMonthlyAmount(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">
                      Start Year
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
                      End Year
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
                <p className="text-sm text-slate-400">Shares accumulated</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <p className="text-3xl font-bold text-emerald-300">
                    {formatShares(backtest.totalShares)}
                  </p>
                  <p className="text-right text-sm text-slate-400">
                    Fractional shares included
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
                  <p className="text-sm text-slate-400">Total Invested</p>
                  <p className="mt-2 text-2xl font-bold">
                    {formatMoney(backtest.totalInvested)}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
                  <p className="text-sm text-slate-400">Final Value</p>
                  <p className="mt-2 text-2xl font-bold text-cyan-300">
                    {formatMoney(backtest.finalValue)}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
                  <p className="text-sm text-slate-400">Total Profit</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-400">
                    {formatMoney(backtest.totalProfit)}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
                  <p className="text-sm text-slate-400">Total Return</p>
                  <p className="mt-2 text-2xl font-bold text-cyan-400">
                    {formatPercent(backtest.totalReturn)}%
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                      Historical Projection
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      DCA Value Over Time
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      Portfolio value
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      Total invested
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
                        tickFormatter={formatCompactMoney}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        width={72}
                      />
                      <Tooltip
                        formatter={(value) => formatMoney(Number(value ?? 0))}
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
                        name="Portfolio value"
                        stroke="#22d3ee"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: "#22d3ee", strokeWidth: 0 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="invested"
                        name="Total invested"
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
                <h3 className="mb-4 text-2xl font-semibold">
                  Yearly Backtest Table
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-slate-400">
                      <tr>
                        <th className="py-3 pr-6">Year</th>
                        <th className="py-3 pr-6">Price</th>
                        <th className="py-3 pr-6">Shares Bought</th>
                        <th className="py-3 pr-6">Total Shares</th>
                        <th className="py-3">Portfolio Value</th>
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
                            {formatMoney(item.price)}
                          </td>
                          <td className="py-3 pr-6 text-cyan-300">
                            {formatShares(item.sharesBought)}
                          </td>
                          <td className="py-3 pr-6">
                            {formatShares(item.totalShares)}
                          </td>
                          <td className="py-3 text-emerald-400">
                            {formatMoney(item.portfolioValue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
