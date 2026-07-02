import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const rootDir = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const require = createRequire(import.meta.url);
const moduleCache = new Map();

function loadTsModule(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);

  if (moduleCache.has(absolutePath)) {
    return moduleCache.get(absolutePath).exports;
  }

  const source = fs.readFileSync(absolutePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const module = { exports: {} };
  moduleCache.set(absolutePath, module);

  const localRequire = (specifier) => {
    if (specifier === "./mockMarketData") {
      return loadTsModule("lib/mockMarketData.ts");
    }

    if (specifier === "./marketCsv") {
      return {};
    }

    return require(specifier);
  };

  const script = new vm.Script(
    `(function (exports, require, module) { ${output}\n})`,
    { filename: absolutePath }
  );
  script.runInThisContext()(module.exports, localRequire, module);

  return module.exports;
}

const { calculateDcaBacktest } = loadTsModule("lib/calculations.ts");

const monthlyPrices = [
  { date: "2020-01-31", close: 100 },
  { date: "2020-02-29", close: 80 },
  { date: "2020-03-31", close: 120 },
  { date: "2020-04-30", close: 60 },
];

function closeTo(actual, expected, message) {
  assert.ok(
    Math.abs(actual - expected) < 0.000001,
    `${message}: expected ${expected}, received ${actual}`
  );
}

test("DCA algorithm accounts for invested months, fees, shares, value, profit, return, and drawdown", () => {
  const result = calculateDcaBacktest({
    symbol: "voo",
    monthlyAmount: "1000",
    startYear: "2020",
    endYear: "2020",
    monthlyPrices,
    fixedFee: "1",
    percentageFee: "0.1",
  });
  const netMonthlyAmount = 1000 - 1 - 1000 * 0.001;
  const expectedShares =
    netMonthlyAmount / 100 +
    netMonthlyAmount / 80 +
    netMonthlyAmount / 120 +
    netMonthlyAmount / 60;
  const expectedFinalValue = expectedShares * 60;
  const expectedProfit = expectedFinalValue - 4000;
  const expectedReturn = (expectedProfit / 4000) * 100;

  assert.equal(result.totalMonthsInvested, 4);
  closeTo(result.totalInvested, 4000, "total invested");
  closeTo(result.totalFeesPaid, 8, "total fees paid");
  closeTo(result.netAmountInvested, netMonthlyAmount * 4, "net invested");
  closeTo(result.totalShares, expectedShares, "shares accumulated");
  closeTo(result.finalValue, expectedFinalValue, "final value");
  closeTo(result.totalProfit, expectedProfit, "total profit");
  closeTo(result.totalReturn, expectedReturn, "total return");
  closeTo(result.averagePurchasePrice, result.netAmountInvested / result.totalShares, "average purchase price");
  assert.ok(result.maxDrawdown > 0, "max drawdown should use portfolio peak-to-trough values");
});

test("DCA fees are applied monthly and never make net investment negative", () => {
  const result = calculateDcaBacktest({
    symbol: "voo",
    monthlyAmount: "10",
    startYear: "2020",
    endYear: "2020",
    monthlyPrices,
    fixedFee: "25",
    percentageFee: "0",
  });

  closeTo(result.totalInvested, 40, "cash invested");
  closeTo(result.totalFeesPaid, 40, "fees capped at monthly amount");
  closeTo(result.netAmountInvested, 0, "net amount cannot be negative");
  closeTo(result.totalShares, 0, "no shares bought when fees consume monthly amount");
  closeTo(result.finalValue, 0, "final value");
});

test("Lump sum reference math invests the same total contribution upfront with one fee", () => {
  const totalContribution = 1000 * monthlyPrices.length;
  const lumpSumFee = 1 + totalContribution * 0.001;
  const netLumpSum = totalContribution - lumpSumFee;
  const lumpSumShares = netLumpSum / monthlyPrices[0].close;
  const finalValue = lumpSumShares * monthlyPrices.at(-1).close;
  const profit = finalValue - totalContribution;
  const totalReturn = (profit / totalContribution) * 100;

  closeTo(totalContribution, 4000, "same total DCA contribution");
  closeTo(lumpSumFee, 5, "lump sum fee applies once");
  closeTo(lumpSumShares, 39.95, "lump sum shares");
  closeTo(finalValue, 2397, "lump sum final value");
  closeTo(totalReturn, (profit / totalContribution) * 100, "lump sum return");
});

test("Asset comparison uses the same monthly amount and period for both assets", () => {
  const resultA = calculateDcaBacktest({
    symbol: "voo",
    monthlyAmount: "500",
    startYear: "2020",
    endYear: "2020",
    monthlyPrices,
  });
  const resultB = calculateDcaBacktest({
    symbol: "qqq",
    monthlyAmount: "500",
    startYear: "2020",
    endYear: "2020",
    monthlyPrices: monthlyPrices.map((row) => ({
      ...row,
      close: row.close * 2,
    })),
  });

  closeTo(resultA.totalInvested, resultB.totalInvested, "same cash invested");
  assert.equal(resultA.totalMonthsInvested, resultB.totalMonthsInvested);
});
