import type {
  ComparisonGenerationContext,
  ComparisonKind,
  ComparisonPageConfig,
  ContentSection,
  FaqItem,
} from "./models";

const kinds: readonly ComparisonKind[] = ["etf", "strategy", "calculator", "broker"];

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validSection(value: unknown): value is ContentSection {
  if (!value || typeof value !== "object") return false;
  const section = value as ContentSection;
  return nonEmpty(section.title) && nonEmpty(section.body);
}

function validFaq(value: unknown): value is FaqItem {
  if (!value || typeof value !== "object") return false;
  const faq = value as FaqItem;
  return nonEmpty(faq.question) && nonEmpty(faq.answer);
}

export function isValidComparisonConfig(
  value: unknown,
  context: ComparisonGenerationContext
): value is ComparisonPageConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as ComparisonPageConfig;
  if (!nonEmpty(config.slug) || !kinds.includes(config.comparisonKind)) return false;
  if (!config.supportedLocales?.includes(context.locale)) return false;
  if (!nonEmpty(config.hero?.h1) || !nonEmpty(config.hero?.intro)) return false;
  if (!nonEmpty(config.metadata?.title) || !nonEmpty(config.metadata?.description)) return false;
  if (!Array.isArray(config.summarySections) || !config.summarySections.every(validSection)) return false;
  if (!Array.isArray(config.faqs) || !config.faqs.every(validFaq)) return false;
  if (!Array.isArray(config.relatedLinks) || !config.relatedLinks.every(nonEmpty)) return false;
  if (!config.calculatorCta || !config.jsonLd) return false;

  const expectedPageType = config.comparisonKind === "calculator"
    ? "WebApplication"
    : config.comparisonKind === "broker"
      ? ["Article", "WebPage"]
      : "Article";
  if (Array.isArray(expectedPageType)
    ? !expectedPageType.includes(config.jsonLd.pageType)
    : config.jsonLd.pageType !== expectedPageType) return false;

  if (config.comparisonKind === "broker"
    && config.calculatorCta.availability !== "unavailable") return false;
  if ((config.comparisonKind === "strategy" || config.comparisonKind === "calculator")
    && config.calculatorCta.availability !== "available") return false;
  if (config.calculatorCta.availability === "unavailable"
    && !nonEmpty(config.calculatorCta.notice)) return false;

  if (context.validRelatedSlugs) {
    const valid = new Set(context.validRelatedSlugs);
    if (config.relatedLinks.some((slug) => !valid.has(slug))) return false;
  }
  return true;
}
