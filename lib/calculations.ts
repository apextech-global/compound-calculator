import {
  getMockYearsForSymbol,
  getMockPriceHistoryForSymbol,
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

export type PurchasePriceMethod = "close" | "average" | "first";

export type DcaBacktestResult = {
  finalValue: number;
  totalInvested: number;
  netAmountInvested: number;
  totalFeesPaid: number;
  totalProfit: number;
  totalReturn: number;
  totalShares: number;
  annualizedReturn: number;
  maxDrawdown: number;
  bestPortfolioValue: number;
  worstDrawdownValue: number;
  totalMonthsInvested: number;
  averagePurchasePrice: number;
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
  fixedFee = "0",
  percentageFee = "0",
  purchasePriceMethod = "close",
}: {
  symbol: SymbolKey;
  monthlyAmount: string;
  startYear: string;
  endYear: string;
  monthlyPrices?: MarketCsvRow[] | null;
  fixedFee?: string;
  percentageFee?: string;
  purchasePriceMethod?: PurchasePriceMethod;
}): DcaBacktestResult {
  const monthly = Number(monthlyAmount) || 0;
  const feeSettings = normalizeFeeSettings({
    fixedFee,
    percentageFee,
  });
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
      feeSettings,
      purchasePriceMethod,
    });
  }

  const priceHistory = getMockPriceHistoryForSymbol(symbol);
  const yearlyResults: DcaYearlyResult[] = [];

  let totalShares = 0;
  let totalInvested = 0;
  let totalFeesPaid = 0;
  let netAmountInvested = 0;

  for (const year of fallbackYears) {
    if (year < firstYear || year > lastYear) {
      continue;
    }

    const price = priceHistory[year];
    let investedThisYear = 0;
    let netInvestedThisYear = 0;
    let feesPaidThisYear = 0;

    for (let month = 1; month <= 12; month++) {
      const purchase = calculateMonthlyPurchaseAmounts(monthly, feeSettings);
      investedThisYear += purchase.grossAmount;
      netInvestedThisYear += purchase.netAmount;
      feesPaidThisYear += purchase.feePaid;
    }

    const sharesBought = price > 0 ? netInvestedThisYear / price : 0;

    totalInvested += investedThisYear;
    netAmountInvested += netInvestedThisYear;
    totalFeesPaid += feesPaidThisYear;
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
  const totalMonthsInvested = yearlyResults.length * 12;
  const advancedMetrics = calculateDcaAdvancedMetrics({
    finalValue,
    totalInvested,
    netAmountInvested,
    totalShares,
    totalMonthsInvested,
    portfolioValues: yearlyResults.map((item) => item.portfolioValue),
  });

  return {
    finalValue,
    totalInvested,
    netAmountInvested,
    totalFeesPaid,
    totalProfit,
    totalReturn,
    totalShares,
    ...advancedMetrics,
    dataSource: "mock",
    yearlyResults,
  };
}

function calculateDcaBacktestFromCsv({
  monthly,
  firstYear,
  lastYear,
  monthlyPrices,
  feeSettings,
  purchasePriceMethod,
}: {
  monthly: number;
  firstYear: number;
  lastYear: number;
  monthlyPrices: MarketCsvRow[];
  feeSettings: DcaFeeSettings;
  purchasePriceMethod: PurchasePriceMethod;
}): DcaBacktestResult {
  const yearlyResults: DcaYearlyResult[] = [];
  const portfolioValues: number[] = [];
  let totalShares = 0;
  let totalInvested = 0;
  let totalFeesPaid = 0;
  let netAmountInvested = 0;
  let currentYear: DcaYearlyResult | null = null;
  let totalMonthsInvested = 0;

  for (const row of monthlyPrices) {
    const year = new Date(row.date).getFullYear();
    const purchasePrice = getPurchasePrice(row, purchasePriceMethod);

    if (year < firstYear || year > lastYear || purchasePrice <= 0) {
      continue;
    }

    if (!currentYear || currentYear.year !== year) {
      currentYear = {
        year,
        price: purchasePrice,
        sharesBought: 0,
        totalShares,
        portfolioValue: totalShares * purchasePrice,
        invested: totalInvested,
      };
      yearlyResults.push(currentYear);
    }

    const purchase = calculateMonthlyPurchaseAmounts(monthly, feeSettings);
    const sharesBought = purchase.netAmount / purchasePrice;

    totalInvested += purchase.grossAmount;
    netAmountInvested += purchase.netAmount;
    totalFeesPaid += purchase.feePaid;
    totalShares += sharesBought;
    totalMonthsInvested += 1;

    currentYear.price = purchasePrice;
    currentYear.sharesBought += sharesBought;
    currentYear.totalShares = totalShares;
    currentYear.portfolioValue = totalShares * purchasePrice;
    currentYear.invested = totalInvested;
    portfolioValues.push(currentYear.portfolioValue);
  }

  const finalPrice = yearlyResults.at(-1)?.price ?? 0;
  const finalValue = totalShares * finalPrice;
  const totalProfit = finalValue - totalInvested;
  const totalReturn = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  const advancedMetrics = calculateDcaAdvancedMetrics({
    finalValue,
    totalInvested,
    netAmountInvested,
    totalShares,
    totalMonthsInvested,
    portfolioValues,
  });

  return {
    finalValue,
    totalInvested,
    netAmountInvested,
    totalFeesPaid,
    totalProfit,
    totalReturn,
    totalShares,
    ...advancedMetrics,
    dataSource: "csv",
    yearlyResults,
  };
}

type DcaFeeSettings = {
  fixedFee: number;
  percentageFee: number;
};

function normalizeFeeSettings({
  fixedFee,
  percentageFee,
}: {
  fixedFee: string;
  percentageFee: string;
}): DcaFeeSettings {
  return {
    fixedFee: Math.max(0, Number(fixedFee) || 0),
    percentageFee: Math.max(0, Number(percentageFee) || 0),
  };
}

function calculateMonthlyPurchaseAmounts(
  grossAmount: number,
  feeSettings: DcaFeeSettings
) {
  const safeGrossAmount = Math.max(0, grossAmount);
  const rawFee =
    feeSettings.fixedFee +
    safeGrossAmount * (feeSettings.percentageFee / 100);
  const feePaid = Math.min(safeGrossAmount, Math.max(0, rawFee));
  const netAmount = Math.max(0, safeGrossAmount - feePaid);

  return {
    grossAmount: safeGrossAmount,
    feePaid,
    netAmount,
  };
}

function getPurchasePrice(
  row: MarketCsvRow,
  purchasePriceMethod: PurchasePriceMethod
) {
  switch (purchasePriceMethod) {
    case "average":
    case "first":
    case "close":
    default:
      return row.close;
  }
}

function calculateDcaAdvancedMetrics({
  finalValue,
  totalInvested,
  netAmountInvested,
  totalShares,
  totalMonthsInvested,
  portfolioValues,
}: {
  finalValue: number;
  totalInvested: number;
  netAmountInvested: number;
  totalShares: number;
  totalMonthsInvested: number;
  portfolioValues: number[];
}) {
  const yearsInvested = totalMonthsInvested / 12;
  const annualizedReturn =
    totalInvested > 0 && finalValue > 0 && yearsInvested > 0
      ? (Math.pow(finalValue / totalInvested, 1 / yearsInvested) - 1) * 100
      : 0;
  const averagePurchasePrice =
    totalShares > 0 ? netAmountInvested / totalShares : 0;
  let bestPortfolioValue = 0;
  let peakValue = 0;
  let maxDrawdown = 0;
  let worstDrawdownValue = 0;

  for (const value of portfolioValues) {
    if (!Number.isFinite(value) || value < 0) {
      continue;
    }

    bestPortfolioValue = Math.max(bestPortfolioValue, value);

    if (value > peakValue) {
      peakValue = value;
    }

    if (peakValue <= 0) {
      continue;
    }

    const drawdown = ((peakValue - value) / peakValue) * 100;

    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
      worstDrawdownValue = value;
    }
  }

  return {
    annualizedReturn,
    maxDrawdown,
    bestPortfolioValue,
    worstDrawdownValue,
    totalMonthsInvested,
    averagePurchasePrice,
  };
}
