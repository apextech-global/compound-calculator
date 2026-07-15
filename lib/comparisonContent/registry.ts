import type { Locale } from "@/i18n/routing";
import type { ComparisonKind } from "./models";

export type ComparisonConfigDescriptor = {
  slug: string;
  comparisonKind: ComparisonKind;
  supportedLocales: readonly Locale[];
  relatedLinks: readonly string[];
  calculatorAvailability: "available" | "unavailable";
  pageType: "Article" | "WebPage" | "WebApplication";
};

const publicLocales = ["en", "zh-CN", "zh-TW", "ms", "id"] as const;

export const comparisonConfigRegistry: readonly ComparisonConfigDescriptor[] = [
  { slug: "voo-vs-cspx", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-dca-calculator", "cspx-dca-calculator", "cspx-vs-voo-malaysia", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "voo-vs-qqq", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-dca-calculator", "qqq-dca-calculator", "voo-vs-qqq-dca", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "dca-vs-lump-sum", comparisonKind: "strategy", supportedLocales: publicLocales, relatedLinks: ["dca-vs-lump-sum-guide", "dca-calculator", "compound-interest-calculator", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "cspx-vs-vwra", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["vwra-dca-calculator", "cspx-dca-calculator", "voo-vs-cspx", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "iwda-vs-vwra", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["iwda-dca-calculator", "vwra-dca-calculator", "voo-vs-qqq", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "etf-comparison-calculator", comparisonKind: "calculator", supportedLocales: publicLocales, relatedLinks: ["voo-vs-cspx", "voo-vs-qqq", "dca-calculator", "dca-vs-lump-sum"], calculatorAvailability: "available", pageType: "WebApplication" },
  { slug: "voo-vs-spy", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-vs-ivv", "voo-vs-qqq", "spy-dca-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "voo-vs-ivv", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-vs-spy", "voo-vs-cspx", "ivv-dca-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "vti-vs-schb", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-vs-spy", "vti-dca-calculator", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "schd-vs-vig", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["schd-dca-calculator", "vig-dca-calculator", "vti-vs-schb"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "qqq-vs-qqqm", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-vs-qqq", "qqq-dca-calculator", "qqqm-dca-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "cspx-vs-vuaa", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["cspx-vs-spyl", "voo-vs-cspx", "cspx-dca-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "cspx-vs-spyl", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["cspx-vs-vuaa", "voo-vs-cspx", "cspx-dca-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "vwra-vs-isac", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["cspx-vs-vwra", "iwda-vs-vwra", "vwra-dca-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "iwda-vs-swda", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["iwda-vs-vwra", "vwra-vs-isac", "iwda-dca-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "schd-vs-dgro", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["schd-vs-vig", "schd-vs-vym", "schd-dca-calculator", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "schd-vs-vym", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["schd-vs-vig", "schd-vs-dgro", "schd-dca-calculator", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "voo-vs-vti", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-vs-spy", "vti-vs-itot", "vt-vs-vti", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "vti-vs-itot", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-vs-vti", "vti-vs-schb", "vt-vs-vti", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "cspx-vs-voo", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-vs-cspx", "cspx-vs-ivv", "vuaa-vs-cspx", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "cspx-vs-ivv", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["cspx-vs-voo", "voo-vs-ivv", "spyl-vs-cspx", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "swda-vs-vwra", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["swda-vs-iwda", "iwda-vs-vwra", "vt-vs-vwra", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "swda-vs-iwda", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["iwda-vs-swda", "swda-vs-vwra", "iwda-vs-vwra", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "vwra-vs-vti", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["vt-vs-vwra", "vt-vs-vti", "cspx-vs-vwra", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "vuaa-vs-cspx", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["cspx-vs-vuaa", "spyl-vs-vuaa", "cspx-vs-voo", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "spyl-vs-cspx", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["cspx-vs-spyl", "spyl-vs-vuaa", "cspx-vs-ivv", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "spyl-vs-vuaa", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["spyl-vs-cspx", "vuaa-vs-cspx", "cspx-vs-spyl", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "qqq-vs-schg", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["qqq-vs-xlk", "voo-vs-qqq", "qqq-vs-qqqm", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "qqq-vs-xlk", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["qqq-vs-schg", "voo-vs-qqq", "qqq-vs-qqqm", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "vxus-vs-ixus", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["vt-vs-vwra", "vt-vs-vti", "vwra-vs-vti", "etf-comparison-calculator"], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "vt-vs-vti", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["voo-vs-vti", "vwra-vs-vti", "vt-vs-vwra", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "vt-vs-vwra", comparisonKind: "etf", supportedLocales: publicLocales, relatedLinks: ["vwra-vs-vti", "vt-vs-vti", "vxus-vs-ixus", "etf-comparison-calculator"], calculatorAvailability: "available", pageType: "Article" },
  { slug: "ibkr-vs-moomoo-malaysia", comparisonKind: "broker", supportedLocales: ["zh-CN"], relatedLinks: [], calculatorAvailability: "unavailable", pageType: "Article" },
  { slug: "tiger-vs-moomoo-malaysia", comparisonKind: "broker", supportedLocales: ["zh-CN"], relatedLinks: [], calculatorAvailability: "unavailable", pageType: "WebPage" },
] as const;

export function getComparisonConfigDescriptor(slug: string) {
  return comparisonConfigRegistry.find((entry) => entry.slug === slug) ?? null;
}

export function auditComparisonConfigRegistry(
  expectedSlugs: readonly string[],
  validPageSlugs: readonly string[]
): string[] {
  const errors: string[] = [];
  const counts = new Map<string, number>();
  const validPages = new Set(validPageSlugs);
  for (const entry of comparisonConfigRegistry) {
    counts.set(entry.slug, (counts.get(entry.slug) ?? 0) + 1);
    if (!entry.supportedLocales.length) errors.push(`${entry.slug}: no supported locales`);
    if (entry.relatedLinks.includes(entry.slug)) errors.push(`${entry.slug}: self related link`);
    if (entry.relatedLinks.some((slug) => !validPages.has(slug))) errors.push(`${entry.slug}: broken related link`);
    if (entry.comparisonKind === "calculator" && entry.pageType !== "WebApplication") errors.push(`${entry.slug}: invalid calculator schema`);
    if (entry.comparisonKind === "broker" && entry.calculatorAvailability !== "unavailable") errors.push(`${entry.slug}: broker calculator enabled`);
    if (entry.comparisonKind !== "calculator" && entry.pageType === "WebApplication") errors.push(`${entry.slug}: invalid WebApplication schema`);
  }
  for (const [slug, count] of counts) if (count !== 1) errors.push(`${slug}: duplicate config`);
  for (const slug of expectedSlugs) if (!counts.has(slug)) errors.push(`${slug}: missing config`);
  for (const slug of counts.keys()) if (!expectedSlugs.includes(slug)) errors.push(`${slug}: unexpected config`);
  return errors;
}
