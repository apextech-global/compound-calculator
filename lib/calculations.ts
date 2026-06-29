import {
  getMockYearsForSymbol,
  historicalPriceData,
  type SymbolKey,
} from "./mockMarketData";
import type { MarketCsvRow } from "./marketCsv";

export type YearlyResult = {
  year: number;
  balance: number;
  invested: number;
  profit: number;
};

export type CompoundResult = {
  finalValue: number;
  totalInvested: number;
  totalProfit: number;
  yearlyResults: YearlyResult[];
};

export type DcaYearlyResult = {
  year: number;
  price: number;
  sharesBought: number;
  totalShares: number;
  portfolioValue: number;
  invested: number;
};

export type DcaBacktestResult = {
  finalValue: number;
  totalInvested: number;
  totalProfit: number;
  totalReturn: number;
  totalShares: number;
  dataSource: "csv" | "mock";
  yearlyResults: DcaYearlyResult[];
};

export function calculateCompoundInterest({
  initialAmount,
  monthlyContribution,
  annualReturn,
  years,
}: {
  initialAmount: string;
  monthlyContribution: string;
  annualReturn: string;
  years: string;
}): CompoundResult {
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
}

export function calculateDcaBacktest({
  symbol,
  monthlyAmount,
  startYear,
  endYear,
  monthlyPrices,
}: {
  symbol: SymbolKey;
  monthlyAmount: string;
  startYear: string;
  endYear: string;
  monthlyPrices?: MarketCsvRow[] | null;
}): DcaBacktestResult {
  const monthly = Number(monthlyAmount) || 0;
  const fallbackYears = getMockYearsForSymbol(symbol);
  const rawStartYear = Number(startYear) || fallbackYears[0];
  const rawEndYear = Number(endYear) || fallbackYears[fallbackYears.length - 1];
  const firstYear = Math.min(rawStartYear, rawEndYear);
  const lastYear = Math.max(rawStartYear, rawEndYear);

  if (monthlyPrices?.length) {
    return calculateDcaBacktestFromCsv({
      monthly,
      firstYear,
      lastYear,
      monthlyPrices,
    });
  }

  const priceHistory = historicalPriceData[symbol];
  const yearlyResults: DcaYearlyResult[] = [];

  let totalShares = 0;
  let totalInvested = 0;

  for (const year of fallbackYears) {
    if (year < firstYear || year > lastYear) {
      continue;
    }

    const price = priceHistory[year];
    const investedThisYear = monthly * 12;
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
    dataSource: "mock",
    yearlyResults,
  };
}

function calculateDcaBacktestFromCsv({
  monthly,
  firstYear,
  lastYear,
  monthlyPrices,
}: {
  monthly: number;
  firstYear: number;
  lastYear: number;
  monthlyPrices: MarketCsvRow[];
}): DcaBacktestResult {
  const yearlyResults: DcaYearlyResult[] = [];
  let totalShares = 0;
  let totalInvested = 0;
  let currentYear: DcaYearlyResult | null = null;

  for (const row of monthlyPrices) {
    const year = new Date(row.date).getFullYear();

    if (year < firstYear || year > lastYear || row.close <= 0) {
      continue;
    }

    if (!currentYear || currentYear.year !== year) {
      currentYear = {
        year,
        price: row.close,
        sharesBought: 0,
        totalShares,
        portfolioValue: totalShares * row.close,
        invested: totalInvested,
      };
      yearlyResults.push(currentYear);
    }

    const sharesBought = monthly / row.close;
    totalInvested += monthly;
    totalShares += sharesBought;

    currentYear.price = row.close;
    currentYear.sharesBought += sharesBought;
    currentYear.totalShares = totalShares;
    currentYear.portfolioValue = totalShares * row.close;
    currentYear.invested = totalInvested;
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
    dataSource: "csv",
    yearlyResults,
  };
}
