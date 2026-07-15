import type { Locale } from "@/i18n/routing";

export type ComparisonKind = "etf" | "strategy" | "calculator" | "broker";
export type ContentSection = { title: string; body: string };
export type FaqItem = { question: string; answer: string };
export type ComparedItem = { name: string; url?: string };
export type AvailableCalculatorCta = {
  availability: "available";
  query?: string;
  notice?: string;
};
export type UnavailableCalculatorCta = {
  availability: "unavailable";
  query?: never;
  notice: string;
};

type BaseComparisonConfig<K extends ComparisonKind> = {
  slug: string;
  comparisonKind: K;
  supportedLocales: readonly Locale[];
  hero: { h1: string; intro: string };
  metadata: { title: string; description: string };
  summarySections: ContentSection[];
  prosCons: { pros?: ContentSection; cons?: ContentSection; insertAt?: number };
  faqs: FaqItem[];
  relatedLinks: string[];
};

export type EtfComparisonConfig = BaseComparisonConfig<"etf"> & {
  calculatorCta: AvailableCalculatorCta | UnavailableCalculatorCta;
  jsonLd: { pageType: "Article"; comparedItems?: ComparedItem[] };
};
export type StrategyComparisonConfig = BaseComparisonConfig<"strategy"> & {
  calculatorCta: AvailableCalculatorCta;
  jsonLd: { pageType: "Article"; comparedItems?: ComparedItem[] };
};
export type CalculatorComparisonConfig = BaseComparisonConfig<"calculator"> & {
  calculatorCta: AvailableCalculatorCta;
  jsonLd: { pageType: "WebApplication"; comparedItems?: ComparedItem[] };
};
export type BrokerComparisonConfig = BaseComparisonConfig<"broker"> & {
  calculatorCta: UnavailableCalculatorCta;
  jsonLd: { pageType: "Article" | "WebPage"; comparedItems?: ComparedItem[] };
};

export type ComparisonPageConfig =
  | EtfComparisonConfig
  | StrategyComparisonConfig
  | CalculatorComparisonConfig
  | BrokerComparisonConfig;

export type ComparisonGenerationContext = {
  locale: Locale;
  pageUrl: string;
  homeUrl: string;
  publisherUrl: string;
  validRelatedSlugs?: readonly string[];
};

export type GeneratedMetadata = {
  title: string;
  description: string;
  canonical: string;
};

export type ComparisonContentModel = {
  slug: string;
  comparisonKind: ComparisonKind;
  hero: ComparisonPageConfig["hero"];
  metadata: GeneratedMetadata;
  sections: ContentSection[];
  faqs: FaqItem[];
  relatedLinks: string[];
  calculatorCta: ComparisonPageConfig["calculatorCta"];
  comparedItems?: ComparedItem[];
  jsonLd: Record<string, unknown>[];
};
