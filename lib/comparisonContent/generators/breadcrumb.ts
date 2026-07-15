import type {
  ComparisonGenerationContext,
  ComparisonPageConfig,
} from "../models";

export function generateBreadcrumb(
  config: ComparisonPageConfig,
  context: ComparisonGenerationContext
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "DCA Backtest", item: context.homeUrl },
      { "@type": "ListItem", position: 2, name: config.hero.h1, item: context.pageUrl },
    ],
  };
}
