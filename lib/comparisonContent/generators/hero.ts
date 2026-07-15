import type { ComparisonPageConfig } from "../models";

export function generateHero(config: ComparisonPageConfig) {
  return { ...config.hero };
}
