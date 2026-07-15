import type { ComparisonPageConfig } from "../models";

export function generateRelatedLinks(config: ComparisonPageConfig) {
  return [...new Set(config.relatedLinks)].filter((slug) => slug !== config.slug);
}
