import type {
  ComparisonGenerationContext,
  ComparisonPageConfig,
  FaqItem,
} from "../models";
import { generateBreadcrumb } from "./breadcrumb";

function generatePageJsonLd(
  config: ComparisonPageConfig,
  context: ComparisonGenerationContext
) {
  if (config.jsonLd.pageType === "WebApplication") {
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: config.hero.h1,
      url: context.pageUrl,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: context.locale,
      description: config.metadata.description,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": config.jsonLd.pageType,
    headline: config.hero.h1,
    name: config.hero.h1,
    description: config.metadata.description,
    url: context.pageUrl,
    inLanguage: context.locale,
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "DCA Backtest",
      url: context.publisherUrl,
    },
  };
}

function generateFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function generateItemListJsonLd(config: ComparisonPageConfig) {
  if (!config.jsonLd.comparedItems?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.hero.h1,
    itemListElement: config.jsonLd.comparedItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { url: item.url } : {}),
    })),
  };
}

export function generateJsonLd(
  config: ComparisonPageConfig,
  context: ComparisonGenerationContext
): Record<string, unknown>[] {
  const items: Array<Record<string, unknown> | null> = [
    generatePageJsonLd(config, context),
    generateBreadcrumb(config, context),
    config.faqs.length ? generateFaqJsonLd(config.faqs) : null,
    generateItemListJsonLd(config),
  ];
  return items.filter((value): value is Record<string, unknown> => value !== null);
}
