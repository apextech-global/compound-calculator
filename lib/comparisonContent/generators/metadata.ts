import type { ComparisonGenerationContext, ComparisonPageConfig } from "../models";

export function generateMetadataContent(
  config: ComparisonPageConfig,
  context: ComparisonGenerationContext
) {
  return { ...config.metadata, canonical: context.pageUrl };
}
