import type { ComparisonPageConfig } from "../models";

export function generateCalculatorCta(config: ComparisonPageConfig) {
  return { ...config.calculatorCta };
}
