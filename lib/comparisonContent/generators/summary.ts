import type { ComparisonPageConfig } from "../models";

export function generateComparisonSummary(config: ComparisonPageConfig) {
  return config.summarySections.map((section) => ({ ...section }));
}
