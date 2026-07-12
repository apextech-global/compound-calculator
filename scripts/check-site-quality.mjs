import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://dcabacktest.com";
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

function extractTypedArray(source, name) {
  const match = source.match(
    new RegExp(`const\\s+${name}\\s*:\\s*[A-Za-z\\[\\]]+\\s*=\\s*\\[([\\s\\S]*?)\\];`)
  );

  if (!match) {
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

const localesSource = read("lib/locales.ts");
const routingSource = read("i18n/routing.ts");
const seoSource = read("lib/seoLandingPages.ts");
const metadataSource = read("lib/seoMetadata.ts");
const sitemapSource = read("app/sitemap.ts");
const robotsSource = read("app/robots.ts");
const localeLayoutSource = read("app/[locale]/layout.tsx");
const homePageSource = read("app/[locale]/page.tsx");
const seoPageSource = read("app/[locale]/[seoPage]/page.tsx");
const supportedAssetsPageSource = read("app/[locale]/supported-assets/page.tsx");
const recommendedToolsPageSource = read("app/[locale]/recommended-tools/page.tsx");
const learnPageSource = read("app/[locale]/learn/page.tsx");
const footerSource = read("components/Footer.tsx");
const heroSource = read("components/Hero.tsx");
const relatedLinksSource = read("components/RelatedLinks.tsx");
const seoContentSource = read("components/SeoContent.tsx");
const staticContentPageSource = read("components/StaticContentPage.tsx");
const adminHealthSource = read("app/admin/health/page.tsx");

// Single source of truth for which locales are publicly marketed lives in
// lib/locales.ts (publicLocaleCodes). Deriving it here — instead of
// hardcoding a duplicate list — is what makes this script actually catch a
// regression like re-adding an incomplete locale (e.g. `ja`) to public
// surfaces.
const allLanguageCodes = extractStringArray(localesSource, "languageCodes");
const requestedLocales = extractStringArray(localesSource, "publicLocaleCodes");
const learnContentLocalesFromSource = extractStringArray(
  localesSource,
  "learnContentLocales"
);
const unsupportedLanguageCodes = allLanguageCodes.filter(
  (code) => !requestedLocales.includes(code)
);

const appLocales = extractRoutingLocales(routingSource);
const staticPages = extractStringArray(metadataSource, "staticPageSlugs");
const contentPages = extractStringArray(metadataSource, "contentPageSlugs");
const seoPages = unique([
  ...extractStringArray(seoSource, "baseSeoPageSlugs"),
  ...extractStringArray(seoSource, "comparisonSeoPageSlugs"),
  ...extractStringArray(seoSource, "assetSeoPageSlugs"),
  ...extractStringArray(seoSource, "malaysiaGuideSeoPageSlugs"),
  ...extractStringArray(seoSource, "chineseLearningSeoPageSlugs"),
  ...extractStringArray(seoSource, "japaneseLearningSeoPageSlugs"),
]);
const malaysiaGuidePages = extractStringArray(seoSource, "malaysiaGuideSeoPageSlugs");
const chineseLearningPages = extractStringArray(seoSource, "chineseLearningSeoPageSlugs");
const japaneseLearningPages = extractStringArray(seoSource, "japaneseLearningSeoPageSlugs");
const learnPages = ["learn"];
const zhCnOnlyPages = malaysiaGuidePages;
const sharedLearningPages = chineseLearningPages.filter(
  (page) => page !== "cspx-vs-voo-malaysia"
);
const zhCnZhTwMsPages = chineseLearningPages;
const jaOnlyPages = japaneseLearningPages;
const localeSpecificPages = [
  ...learnPages,
  ...zhCnOnlyPages,
  ...zhCnZhTwMsPages,
  ...jaOnlyPages,
];
const allPages = unique(["", ...staticPages, ...contentPages, ...seoPages, ...localeSpecificPages]);

function localesForPage(page) {
  if (learnPages.includes(page)) {
    return requestedLocales.filter((locale) =>
      learnContentLocalesFromSource.includes(locale)
    );
  }

  if (zhCnOnlyPages.includes(page)) {
    return requestedLocales.includes("zh-CN") ? ["zh-CN"] : [];
  }

  if (page === "cspx-vs-voo-malaysia") {
    return requestedLocales.filter((locale) =>
      ["zh-CN", "zh-TW", "ms"].includes(locale)
    );
  }

  if (sharedLearningPages.includes(page)) {
    return requestedLocales.filter((locale) =>
      ["zh-CN", "zh-TW", "ms", "ja"].includes(locale)
    );
  }

  if (jaOnlyPages.includes(page)) {
    return requestedLocales.includes("ja") ? ["ja"] : [];
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

// --- Locale/SEO routing safety net (Codex P0 regression protection) -----
// These checks exist so that re-introducing an incomplete/unsupported
// locale to a public surface (sitemap, hreflang, footer) fails CI instead
// of shipping a crash like /ja/affiliate-disclosure.

const unsupportedLocaleInSitemap = unsupportedLanguageCodes.filter((code) =>
  sitemapSource.includes(`"${code}"`)
);
if (unsupportedLocaleInSitemap.length) {
  addError(
    `app/sitemap.ts hardcodes unsupported locale(s): ${unsupportedLocaleInSitemap.join(
      ", "
    )}. Sitemap must only be driven by publicLocaleCodes/publicLearnLocales.`
  );
} else {
  addPass("Sitemap source contains no hardcoded unsupported locale codes.");
}

if (sitemapSource.toLowerCase().includes("admin")) {
  addError("app/sitemap.ts references an admin route; admin pages must never be in the sitemap.");
} else {
  addPass("Sitemap source contains no admin route references.");
}

for (const locale of requestedLocales) {
  const messages = JSON.parse(read(`messages/${locale}.json`));

  for (const page of staticPages) {
    if (!messages.legal?.[page]) {
      addError(
        `${locale} is a public locale but is missing legal.${page} content — /${locale}/${page} would crash or 404 unexpectedly.`
      );
    }
  }
}
if (!errors.some((error) => error.includes("is missing legal."))) {
  addPass(
    "All public locales have complete legal.* content for every static page (about/privacy/terms/disclaimer/affiliate-disclosure/contact)."
  );
}

if (footerSource.includes("publicLocaleCodes") && footerSource.includes("publicLearnLocales")) {
  addPass("Footer gates its dynamic locale links behind the public locale allow-list.");
} else {
  addError(
    "components/Footer.tsx no longer appears to gate locale-specific links (learn, guides, affiliate-disclosure) behind publicLocaleCodes/publicLearnLocales."
  );
}

if (
  seoPageSource.includes("publicLocaleCodes") &&
  seoPageSource.includes("publicLearnLocales")
) {
  addPass("SEO landing page gates its legal/learn links behind the public locale allow-list.");
} else {
  addError(
    "app/[locale]/[seoPage]/page.tsx no longer appears to gate legal/learn links behind publicLocaleCodes/publicLearnLocales."
  );
}

if (staticContentPageSource.includes("if (!messages.legal?.[pageKey])")) {
  addPass("StaticContentPage guards against missing legal.* content with notFound().");
} else {
  addError(
    "components/StaticContentPage.tsx no longer guards against missing legal.* content before rendering."
  );
}

if (metadataSource.includes("if (!legalPage)")) {
  addPass("lib/seoMetadata.ts staticPageMetadata guards against missing legal.* content with notFound().");
} else {
  addError(
    "lib/seoMetadata.ts staticPageMetadata no longer guards against missing legal.* content."
  );
}

if (
  adminHealthSource.includes("isHealthPageEnabled") &&
  adminHealthSource.includes("notFound()")
) {
  addPass("Admin health page is gated behind an enable flag with a notFound() fallback in production.");
} else {
  addError(
    "app/admin/health/page.tsx is not gated behind an enable flag — it would be publicly reachable in production."
  );
}

// --- Unsupported locales must not be directly routable/indexable --------
// routing.locales (i18n/routing.ts) is intentionally broader than
// publicLocaleCodes (some locales' translations are routable pre-launch).
// Every route under app/[locale] must therefore guard with isPublicLocale()
// and notFound() itself — the checks below confirm each of Codex's example
// unsupported routes (/ja, /ko, /ru/dca-calculator, /fr/recommended-tools,
// /ja/supported-assets) is actually guarded in source, not just unlinked.

if (localeLayoutSource.includes("isPublicLocale(locale)")) {
  addPass(
    "app/[locale]/layout.tsx gates every descendant route with isPublicLocale() — covers /ja, /ko, and any locale-prefixed route with no page-specific guard."
  );
} else {
  addError(
    "app/[locale]/layout.tsx no longer gates on isPublicLocale() — unsupported locales (e.g. /ja, /ko) would render real pages again."
  );
}

const unsupportedRouteExamples = [
  {
    path: "/ru/dca-calculator (and other SEO landing pages)",
    file: "app/[locale]/[seoPage]/page.tsx",
    source: seoPageSource,
  },
  {
    path: "/fr/recommended-tools",
    file: "app/[locale]/recommended-tools/page.tsx",
    source: recommendedToolsPageSource,
  },
  {
    path: "/ja/supported-assets",
    file: "app/[locale]/supported-assets/page.tsx",
    source: supportedAssetsPageSource,
  },
];

for (const example of unsupportedRouteExamples) {
  if (example.source.includes("isPublicLocale(locale)")) {
    addPass(`${example.path} is guarded by isPublicLocale() in ${example.file}.`);
  } else {
    addError(
      `${example.path} is not guarded by isPublicLocale() in ${example.file} — an unsupported locale could still render this page.`
    );
  }
}

if (learnPageSource.includes("publicLearnLocales")) {
  addPass("app/[locale]/learn/page.tsx restricts itself to publicLearnLocales (public AND has content).");
} else {
  addError(
    "app/[locale]/learn/page.tsx no longer derives its locale gate from publicLearnLocales — it may expose /ja/learn again."
  );
}

if (seoSource.includes("candidateLocales.filter(")) {
  addPass("lib/seoLandingPages.ts filters SEO page hreflang alternates down to publicLocaleCodes before returning them.");
} else {
  addError(
    "lib/seoLandingPages.ts getSeoPageAlternates no longer filters to publicLocaleCodes — it can leak an unsupported locale (e.g. ja) into hreflang."
  );
}

if (seoSource.includes('absoluteUrl(`/ja/${slug}`)')) {
  addError(
    "lib/seoLandingPages.ts getSeoPageXDefault still hardcodes an /ja/ URL as x-default — ja is unsupported and that URL 404s."
  );
} else {
  addPass("lib/seoLandingPages.ts getSeoPageXDefault does not point x-default at an unsupported locale.");
}

// --- Canonical coverage across every indexable page type ------------------

const canonicalSources = [
  ["Homepage (app/[locale]/layout.tsx)", localeLayoutSource],
  ["SEO landing pages", seoPageSource],
  ["Learn hub", learnPageSource],
  ["Supported assets", supportedAssetsPageSource],
  ["Recommended tools", recommendedToolsPageSource],
  ["Legal/static pages (lib/seoMetadata.ts staticPageMetadata)", metadataSource],
];

for (const [label, source] of canonicalSources) {
  if (source.includes("canonical:")) {
    addPass(`${label} sets a self-referencing canonical URL.`);
  } else {
    addError(`${label} is missing a canonical URL in its metadata.`);
  }
}

// --- Breadcrumb structured data on every indexable page type --------------

const breadcrumbSources = [
  ["Homepage", homePageSource],
  ["SEO landing pages", seoPageSource],
  ["Learn hub", learnPageSource],
  ["Supported assets", supportedAssetsPageSource],
  ["Recommended tools", recommendedToolsPageSource],
  ["Legal/static pages (components/StaticContentPage.tsx)", staticContentPageSource],
];

for (const [label, source] of breadcrumbSources) {
  if (source.includes("BreadcrumbList") || source.includes("buildBreadcrumbJsonLd(")) {
    addPass(`${label} emits BreadcrumbList structured data.`);
  } else {
    addError(`${label} is missing BreadcrumbList structured data.`);
  }
}

// --- Internal linking: previously-orphaned SEO pages must stay linked -----
// (regression guard for the Google Index Optimization V1 internal-link fix)

const relatedSeoLinksSlugs = extractTypedArray(seoPageSource, "relatedSeoLinks");
const chineseLearningRelatedLinksSlugs = extractTypedArray(
  seoPageSource,
  "chineseLearningRelatedLinks"
);
const previouslyOrphanedSeoSlugs = [
  "cspx-vs-vwra",
  "iwda-vs-vwra",
  "vwra-dca-calculator",
  "iwda-dca-calculator",
  "0050-dca-calculator",
  "1155-dca-calculator",
  "es3-dca-calculator",
  "2800-dca-calculator",
  "best-etf-broker-malaysia",
  "ibkr-vs-moomoo-malaysia",
];
const missingOrphanFixSlugs = previouslyOrphanedSeoSlugs.filter(
  (slug) =>
    !relatedSeoLinksSlugs.includes(slug) &&
    !chineseLearningRelatedLinksSlugs.includes(slug)
);

if (missingOrphanFixSlugs.length) {
  addError(
    `app/[locale]/[seoPage]/page.tsx no longer links to previously-orphaned page(s): ${missingOrphanFixSlugs.join(", ")}.`
  );
} else {
  addPass("app/[locale]/[seoPage]/page.tsx links to all previously-orphaned SEO pages.");
}

// --- Orphan-page detection --------------------------------------------------
// Every SEO landing page must be reachable through at least one known
// internal-linking surface. Uses the precisely-extracted relatedSeoLinks /
// chineseLearningRelatedLinks arrays (not the whole [seoPage] file) so that
// schema-only slug references (webApplicationSeoPages, articleSeoPages,
// malaysiaGuidePages — used purely to select a JSON-LD @type, never
// rendered as a link) can't hide a genuinely unlinked page.

function sourceReferencesSlug(source, slug) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Matches a bare quoted slug ("slug") or a slug embedded at the end of a
  // path literal (/slug" or /slug`), so hrefs like `/${locale}/slug` or
  // "/zh-CN/slug" both count as a real inbound reference.
  return new RegExp(`[/"\`]${escapedSlug}["\`]`).test(source);
}

const linkArraySlugs = [...relatedSeoLinksSlugs, ...chineseLearningRelatedLinksSlugs];
const fullTextLinkSources = [
  footerSource,
  heroSource,
  relatedLinksSource,
  learnPageSource,
  supportedAssetsPageSource,
  recommendedToolsPageSource,
];

// sp500-dca-simulation only exists under the `ja` locale, which is
// deliberately unpublished (isPublicLocale() gates it out of every public
// route — see lib/locales.ts) — it is never actually reachable or
// indexable in production regardless of internal linking, so it's exempt.
const orphanCheckExemptSlugs = new Set(["sp500-dca-simulation"]);

const orphanSlugs = seoPages.filter((slug) => {
  if (orphanCheckExemptSlugs.has(slug)) {
    return false;
  }

  if (linkArraySlugs.includes(slug)) {
    return false;
  }

  return !fullTextLinkSources.some((source) => sourceReferencesSlug(source, slug));
});

if (orphanSlugs.length) {
  addError(
    `SEO landing page(s) with no inbound internal link from any known linking surface: ${orphanSlugs.join(", ")}.`
  );
} else {
  addPass("Every SEO landing page has at least one inbound internal link.");
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
