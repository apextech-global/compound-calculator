import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://dcabacktest.com";
const requestedLocales = [
  "en",
  "zh-CN",
  "zh-TW",
  "ms",
  "id",
];
const importantPages = [
  "",
  "dca-calculator",
  "compound-interest-calculator",
  "etf-calculator",
  "etf-comparison-calculator",
  "dca-vs-lump-sum",
  "supported-assets",
  "voo-dca-calculator",
  "cspx-dca-calculator",
  "qqq-dca-calculator",
  "vwra-dca-calculator",
  "iwda-dca-calculator",
  "0050-dca-calculator",
  "1155-dca-calculator",
  "es3-dca-calculator",
  "2800-dca-calculator",
  "voo-vs-cspx",
  "voo-vs-qqq",
  "cspx-vs-vwra",
  "iwda-vs-vwra",
  "learn",
  "how-to-buy-cspx-from-malaysia",
  "how-to-invest-in-voo-from-malaysia",
  "best-etf-broker-malaysia",
  "ibkr-vs-moomoo-malaysia",
  "about",
  "privacy",
  "terms",
  "disclaimer",
  "contact",
];
const warningEnglishPhrases = [
  "What is ",
  "How to ",
  "Privacy Policy",
  "Terms of Use",
  "Supported Assets",
  "Compound Interest Calculator",
  "DCA Calculator",
  "Historical data available",
  "Sample data only",
  "Last updated",
  "Open calculator",
  "Open asset page",
  "Educational only",
  "Not financial advice",
];
const allowedEnglishFragments = [
  "DCA",
  "ETF",
  "VOO",
  "CSPX",
  "QQQ",
  "VWRA",
  "IWDA",
  "Yahoo Finance",
  "DCA Backtest",
  "Maybank",
  "Google",
  "AdSense",
  "Analytics",
  "USD",
  "MYR",
  "SGD",
  "TWD",
  "HKD",
];
const compactTextLocales = new Set(["zh-CN", "zh-TW", "ja", "ko", "ar", "ta"]);

const passed = [];
const warnings = [];
const errors = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function extractStringArray(source, name) {
  const match = source.match(
    new RegExp(`(?:const|export const)\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s+as const`)
  );

  if (!match) {
    errors.push(`Could not find array ${name}.`);
    return [];
  }

  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function extractRoutingLocales(source) {
  const match = source.match(/locales:\s*\[([\s\S]*?)\]\s*,/);

  if (!match) {
    errors.push("Could not find routing locales.");
    return [];
  }

  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function unique(values) {
  return [...new Set(values)];
}

function flattenStrings(value, prefix = "") {
  if (typeof value === "string") {
    return [[prefix, value]];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenStrings(item, `${prefix}[${index}]`));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      flattenStrings(item, prefix ? `${prefix}.${key}` : key)
    );
  }

  return [];
}

function routeFor(locale, page) {
  return page ? `/${locale}/${page}` : `/${locale}`;
}

function addPass(message) {
  passed.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function addError(message) {
  errors.push(message);
}

const routingSource = read("i18n/routing.ts");
const seoSource = read("lib/seoLandingPages.ts");
const metadataSource = read("lib/seoMetadata.ts");
const sitemapSource = read("app/sitemap.ts");
const robotsSource = read("app/robots.ts");
const localeLayoutSource = read("app/[locale]/layout.tsx");
const seoPageSource = read("app/[locale]/[seoPage]/page.tsx");
const supportedAssetsPageSource = read("app/[locale]/supported-assets/page.tsx");
const footerSource = read("components/Footer.tsx");
const heroSource = read("components/Hero.tsx");

const appLocales = extractRoutingLocales(routingSource);
const staticPages = extractStringArray(metadataSource, "staticPageSlugs");
const contentPages = extractStringArray(metadataSource, "contentPageSlugs");
const seoPages = unique([
  ...extractStringArray(seoSource, "baseSeoPageSlugs"),
  ...extractStringArray(seoSource, "comparisonSeoPageSlugs"),
  ...extractStringArray(seoSource, "assetSeoPageSlugs"),
  ...extractStringArray(seoSource, "malaysiaGuideSeoPageSlugs"),
]);
const malaysiaGuidePages = extractStringArray(seoSource, "malaysiaGuideSeoPageSlugs");
const chineseLearnPages = ["learn"];
const zhCnOnlyPages = malaysiaGuidePages;
const localeSpecificPages = [...chineseLearnPages, ...zhCnOnlyPages];
const allPages = unique(["", ...staticPages, ...contentPages, ...seoPages, ...localeSpecificPages]);

function localesForPage(page) {
  if (chineseLearnPages.includes(page)) {
    return requestedLocales.filter((locale) => locale === "zh-CN" || locale === "zh-TW");
  }

  if (zhCnOnlyPages.includes(page)) {
    return requestedLocales.includes("zh-CN") ? ["zh-CN"] : [];
  }

  return requestedLocales;
}

const routePaths = allPages.flatMap((page) =>
  localesForPage(page).map((locale) => routeFor(locale, page))
);
const sitemapUrls = ["/", ...routePaths].map((route) => `${baseUrl}${route}`);
const duplicateSitemapUrls = sitemapUrls.filter(
  (url, index) => sitemapUrls.indexOf(url) !== index
);

if (duplicateSitemapUrls.length) {
  addError(`Duplicate sitemap URLs: ${duplicateSitemapUrls.join(", ")}`);
} else {
  addPass("No duplicate sitemap URLs in generated route list.");
}

for (const locale of requestedLocales) {
  if (!appLocales.includes(locale)) {
    addError(`Required locale missing from routing: ${locale}`);
  }
}

for (const page of importantPages) {
  const expectedLocales = localesForPage(page).filter((locale) =>
    requestedLocales.includes(locale)
  );

  for (const locale of expectedLocales) {
    const route = routeFor(locale, page);
    if (!routePaths.includes(route)) {
      addError(`Missing required page route: ${route}`);
    }
  }
}

if (!errors.some((error) => error.includes("Missing required page route"))) {
  addPass(`All required page routes exist for ${requestedLocales.length} requested locales.`);
}

if (
  (sitemapSource.includes("seoPageSlugs") ||
    sitemapSource.includes("getSeoPageSlugsForLocale")) &&
  sitemapSource.includes("staticPageSlugs") &&
  sitemapSource.includes("contentPageSlugs")
) {
  addPass("Sitemap source uses shared static, content, and SEO route registries.");
} else {
  addError("Sitemap source is not wired to all shared route registries.");
}

if (robotsSource.includes('allow: "/"') && robotsSource.includes('absoluteUrl("/sitemap.xml")')) {
  addPass("robots.txt allows crawlers and references sitemap.xml.");
} else {
  addWarning("robots.txt may not allow crawlers or may not reference sitemap.xml through shared metadata.");
}

const knownPages = new Set(allPages.filter(Boolean));
for (const page of importantPages.filter(Boolean)) {
  if (!knownPages.has(page)) {
    addError(`Important page is not in known route registries: ${page}`);
  }
}

const knownInternalLinks = new Set([
  ...knownPages,
  ...appLocales,
  ...localeSpecificPages,
  "",
]);
const linkSources = [
  ["Footer", footerSource],
  ["Hero", heroSource],
  ["SEO landing page", seoPageSource],
  ["Supported assets page", supportedAssetsPageSource],
];
for (const [label, source] of linkSources) {
  const quotedSlugs = [...source.matchAll(/"([a-z0-9-]+)"/g)]
    .map((match) => match[1])
    .filter((value) =>
      value.includes("-calculator") ||
      value.includes("-vs-") ||
      localeSpecificPages.includes(value) ||
      staticPages.includes(value) ||
      contentPages.includes(value)
    );

  for (const slug of quotedSlugs) {
    if (!knownInternalLinks.has(slug)) {
      addError(`${label} references unknown internal route slug: ${slug}`);
    }
  }
}

if (!errors.some((error) => error.includes("unknown internal route slug"))) {
  addPass("Known internal route slug references resolve to configured pages.");
}

for (const page of allPages) {
  const expectedLocales = localesForPage(page).filter((locale) =>
    requestedLocales.includes(locale)
  );
  const missingLocales = expectedLocales.filter(
    (locale) => !routePaths.includes(routeFor(locale, page))
  );

  if (missingLocales.length) {
    addError(
      `Missing locale versions for ${page || "home"}: ${missingLocales.join(", ")}`
    );
  }
}

if (!errors.some((error) => error.includes("Missing locale versions"))) {
  addPass("Required pages have expected locale versions.");
}

if (
  localeLayoutSource.includes("canonical: absoluteUrl(`/${locale}`)") &&
  seoPageSource.includes("canonical: absoluteUrl(`/${locale}/${seoPage}`)") &&
  supportedAssetsPageSource.includes("canonical: absoluteUrl(canonicalPath)")
) {
  addPass("Canonical metadata is detectable on home, SEO, and supported-assets pages.");
} else {
  addWarning("Could not detect canonical metadata on every page type.");
}

if (
  localeLayoutSource.includes("alternateLanguages()") &&
  seoPageSource.includes("getSeoPageAlternates(") &&
  supportedAssetsPageSource.includes('alternateLanguages("/supported-assets")')
) {
  addPass("hreflang alternate metadata is detectable on home, SEO, and supported-assets pages.");
} else {
  addWarning("Could not detect hreflang alternates on every page type.");
}

for (const locale of requestedLocales) {
  const file = `messages/${locale}.json`;
  if (!exists(file)) {
    addError(`Missing locale message file: ${file}`);
    continue;
  }

  const messages = JSON.parse(read(file));
  const requiredMessagePaths = [
    "seo.title",
    "hero.title",
    "footer.supportedAssets",
    "supportedAssets.title",
    "supportedAssets.seoTitle",
  ];

  for (const messagePath of requiredMessagePaths) {
    const existsAtPath = messagePath
      .split(".")
      .reduce((current, key) => current?.[key], messages);

    if (!existsAtPath) {
      addError(`${file} missing translation key: ${messagePath}`);
    }
  }
}

if (!errors.some((error) => error.includes("translation key"))) {
  addPass("Required translation keys exist in all app locale files.");
}

const faqQuestionRegex = /question:\s*"([^"]+)"/g;
const faqQuestions = [...seoSource.matchAll(faqQuestionRegex)].map((match) => match[1]);
const duplicateFaqQuestions = unique(
  faqQuestions.filter((question, index) => faqQuestions.indexOf(question) !== index)
);

if (duplicateFaqQuestions.length) {
  addWarning(
    `Possible duplicate FAQ question literals in SEO page data: ${duplicateFaqQuestions
      .slice(0, 10)
      .join("; ")}`
  );
} else {
  addPass("No duplicate FAQ question literals detected in SEO page source.");
}

for (const locale of requestedLocales.filter((locale) => locale !== "en")) {
  const messages = JSON.parse(read(`messages/${locale}.json`));
  const flattened = flattenStrings(messages);
  const possibleFallbacks = [];

  for (const [messagePath, value] of flattened) {
    const normalizedValue = value.trim();
    const allowedOnly = allowedEnglishFragments.some(
      (fragment) => normalizedValue === fragment || normalizedValue.includes(fragment)
    );
    const matchedPhrase = warningEnglishPhrases.find((phrase) =>
      normalizedValue.includes(phrase)
    );

    if (matchedPhrase && !allowedOnly) {
      possibleFallbacks.push(`${messagePath}: ${normalizedValue}`);
    }
  }

  if (possibleFallbacks.length) {
    addWarning(
      `${locale} has possible English fallback text: ${possibleFallbacks
        .slice(0, 5)
        .join(" | ")}`
    );
  }
}

if (!warnings.some((warning) => warning.includes("possible English fallback"))) {
  addPass("No obvious English fallback phrases detected in non-English locale files.");
}

for (const [locale, messages] of requestedLocales.map((locale) => [
  locale,
  JSON.parse(read(`messages/${locale}.json`)),
])) {
  const seoDescription = messages.seo?.description ?? "";
  const supportedDescription = messages.supportedAssets?.description ?? "";
  const minimumDescriptionLength = compactTextLocales.has(locale) ? 45 : 80;

  if (seoDescription.length < minimumDescriptionLength) {
    addWarning(`${locale} homepage SEO description may be thin.`);
  }

  if (supportedDescription.length < minimumDescriptionLength) {
    addWarning(`${locale} supported-assets description may be thin.`);
  }
}

if (!sitemapUrls.some((url) => url.includes("?") || url.includes("/api/"))) {
  addPass("Generated sitemap route list contains no query URLs or API URLs.");
} else {
  addError("Generated sitemap route list contains query URLs or API URLs.");
}

function printSection(icon, title, items) {
  console.log(`${icon} ${title}`);

  if (items.length === 0) {
    console.log("  None");
    return;
  }

  for (const item of items) {
    console.log(`  - ${item}`);
  }
}

printSection("✅", "Passed checks", passed);
printSection("⚠️", "Warnings", warnings);
printSection("❌", "Errors", errors);

console.log("");
console.log(`Routes checked: ${routePaths.length}`);
console.log(`Sitemap URLs checked: ${sitemapUrls.length}`);
console.log(`Public locales checked: ${requestedLocales.length}`);

if (errors.length) {
  process.exit(1);
}
