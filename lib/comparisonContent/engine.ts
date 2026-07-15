import { generateCalculatorCta } from "./generators/calculatorCta";
import { generateFaq } from "./generators/faq";
import { generateHero } from "./generators/hero";
import { generateJsonLd } from "./generators/jsonLd";
import { generateMetadataContent } from "./generators/metadata";
import { generateProsCons } from "./generators/prosCons";
import { generateRelatedLinks } from "./generators/relatedLinks";
import { generateComparisonSummary } from "./generators/summary";
import { isValidComparisonConfig } from "./validation";
import type {
  ComparisonContentModel,
  ComparisonGenerationContext,
  ComparisonPageConfig,
} from "./models";

export function generateComparisonContent(
  config: ComparisonPageConfig,
  context: ComparisonGenerationContext
): ComparisonContentModel | null {
  if (!isValidComparisonConfig(config, context)) return null;
  const summarySections = generateComparisonSummary(config);
  const prosCons = generateProsCons(config);
  const insertAt = config.prosCons.insertAt ?? summarySections.length;
  const sections = [
    ...summarySections.slice(0, insertAt),
    ...prosCons,
    ...summarySections.slice(insertAt),
  ];
  return {
    slug: config.slug,
    comparisonKind: config.comparisonKind,
    hero: generateHero(config),
    metadata: generateMetadataContent(config, context),
    sections,
    faqs: generateFaq(config),
    relatedLinks: generateRelatedLinks(config),
    calculatorCta: generateCalculatorCta(config),
    comparedItems: config.jsonLd.comparedItems?.map((item) => ({ ...item })),
    jsonLd: generateJsonLd(config, context),
  };
}
