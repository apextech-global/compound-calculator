import type { Locale } from "@/i18n/routing";
import { generateComparisonContent } from "./engine";
import type {
  ComparisonContentModel,
  ComparisonKind,
  ComparisonPageConfig,
} from "./models";

export type ComparisonSourcePage = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  ctaQuery?: string;
  calculatorStatus?: "available" | "unavailable";
  calculatorNotice?: string;
  comparedItems?: Array<{ name: string; url?: string }>;
  sections: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export type ComparisonSourceEntry = {
  slug: string;
  comparisonKind: ComparisonKind;
  page: ComparisonSourcePage;
  relatedLinks: string[];
  pageType: "Article" | "WebPage" | "WebApplication";
  calculatorAvailability: "available" | "unavailable";
  supportedLocales: readonly Locale[];
  prosConsIndexes?: { pros: number; cons: number };
};

export type ComparisonServiceContext = {
  locale: Locale;
  pageUrl: string;
  homeUrl: string;
  publisherUrl: string;
  validRelatedSlugs?: readonly string[];
};

export type GeneratedComparisonPage = ComparisonSourcePage & {
  contentEngine: ComparisonContentModel;
};

function createConfig(entry: ComparisonSourceEntry): ComparisonPageConfig | null {
  const { page } = entry;
  const actualAvailability = page.calculatorStatus ?? "available";
  if (actualAvailability !== entry.calculatorAvailability) return null;
  const pros = entry.prosConsIndexes
    ? page.sections[entry.prosConsIndexes.pros]
    : undefined;
  const cons = entry.prosConsIndexes
    ? page.sections[entry.prosConsIndexes.cons]
    : undefined;
  const summarySections = page.sections.filter((_, index) =>
    index !== entry.prosConsIndexes?.pros && index !== entry.prosConsIndexes?.cons
  );
  const common = {
    slug: entry.slug,
    supportedLocales: entry.supportedLocales,
    hero: { h1: page.h1, intro: page.intro },
    metadata: { title: page.title, description: page.description },
    summarySections,
    prosCons: {
      pros,
      cons,
      insertAt: entry.prosConsIndexes?.pros,
    },
    faqs: page.faqs,
    relatedLinks: entry.relatedLinks,
  };
  const availableCta = {
    availability: "available" as const,
    query: page.ctaQuery,
    notice: page.calculatorNotice,
  };
  const unavailableCta = page.calculatorNotice
    ? { availability: "unavailable" as const, notice: page.calculatorNotice }
    : null;

  switch (entry.comparisonKind) {
    case "etf":
      return {
        ...common,
        comparisonKind: "etf",
        calculatorCta: page.calculatorStatus === "unavailable"
          ? unavailableCta ?? availableCta
          : availableCta,
        jsonLd: { pageType: "Article", comparedItems: page.comparedItems },
      };
    case "strategy":
      return {
        ...common,
        comparisonKind: "strategy",
        calculatorCta: availableCta,
        jsonLd: { pageType: "Article", comparedItems: page.comparedItems },
      };
    case "calculator":
      return {
        ...common,
        comparisonKind: "calculator",
        calculatorCta: availableCta,
        jsonLd: { pageType: "WebApplication", comparedItems: page.comparedItems },
      };
    case "broker":
      if (!unavailableCta || (entry.pageType !== "Article" && entry.pageType !== "WebPage")) return null;
      return {
        ...common,
        comparisonKind: "broker",
        calculatorCta: unavailableCta,
        jsonLd: { pageType: entry.pageType, comparedItems: page.comparedItems },
      };
  }
}

export function generateComparisonPage(
  entry: ComparisonSourceEntry | null | undefined,
  context: ComparisonServiceContext
): GeneratedComparisonPage | null {
  if (!entry) return null;
  const config = createConfig(entry);
  if (!config) return null;
  const contentEngine = generateComparisonContent(config, context);
  if (!contentEngine) return null;
  return {
    ...entry.page,
    title: contentEngine.metadata.title,
    description: contentEngine.metadata.description,
    h1: contentEngine.hero.h1,
    intro: contentEngine.hero.intro,
    sections: contentEngine.sections,
    faqs: contentEngine.faqs,
    ctaQuery: contentEngine.calculatorCta.query,
    calculatorStatus: contentEngine.calculatorCta.availability,
    calculatorNotice: contentEngine.calculatorCta.notice,
    comparedItems: contentEngine.comparedItems,
    contentEngine,
  };
}
