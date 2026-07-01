import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://dcabacktest.com";

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function extractStringArray(source, name) {
  const match = source.match(
    new RegExp(`(?:const|export const)\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s+as const`)
  );

  if (!match) {
    throw new Error(`Could not find ${name}`);
  }

  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function extractRoutingLocales(source) {
  const match = source.match(/locales:\s*\[([\s\S]*?)\]\s*,/);

  if (!match) {
    throw new Error("Could not find routing locales");
  }

  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function unique(values) {
  return [...new Set(values)];
}

const routingSource = read("i18n/routing.ts");
const seoSource = read("lib/seoLandingPages.ts");
const metadataSource = read("lib/seoMetadata.ts");
const localeLayoutSource = read("app/[locale]/layout.tsx");
const rootLayoutSource = read("app/layout.tsx");
const seoPageSource = read("app/[locale]/[seoPage]/page.tsx");

const locales = extractRoutingLocales(routingSource);
const staticPages = extractStringArray(metadataSource, "staticPageSlugs");
const seoPages = unique([
  ...extractStringArray(seoSource, "baseSeoPageSlugs"),
  ...extractStringArray(seoSource, "comparisonSeoPageSlugs"),
  ...extractStringArray(seoSource, "assetSeoPageSlugs"),
]);

const routePaths = [
  "/",
  ...locales.map((locale) => `/${locale}`),
  ...locales.flatMap((locale) =>
    staticPages.map((page) => `/${locale}/${page}`)
  ),
  ...locales.flatMap((locale) => seoPages.map((page) => `/${locale}/${page}`)),
];
const sitemapUrls = routePaths.map((routePath) => `${baseUrl}${routePath}`);
const duplicateUrls = sitemapUrls.filter(
  (url, index) => sitemapUrls.indexOf(url) !== index
);
const brokenSitemapUrls = sitemapUrls.filter((url) => {
  const routePath = url.replace(baseUrl, "");
  return !routePaths.includes(routePath);
});
const invalidSitemapUrls = sitemapUrls.filter(
  (url) => url.includes("?") || url.includes("/api/")
);

const alternateGroups = ["", ...staticPages, ...seoPages];
const missingAlternateGroups = alternateGroups.filter((page) =>
  locales.some((locale) => {
    const routePath = page ? `/${locale}/${page}` : `/${locale}`;
    return !routePaths.includes(routePath);
  })
);

const staticPageFiles = staticPages.map((page) => `app/[locale]/${page}/page.tsx`);
const staticMetadataMissing = staticPageFiles.filter(
  (file) => !read(file).includes("createStaticPageMetadata")
);

const failures = [
  duplicateUrls.length ? `Duplicate sitemap URLs: ${duplicateUrls.join(", ")}` : "",
  brokenSitemapUrls.length
    ? `Sitemap URLs without matching routes: ${brokenSitemapUrls.join(", ")}`
    : "",
  invalidSitemapUrls.length
    ? `Invalid sitemap URLs: ${invalidSitemapUrls.join(", ")}`
    : "",
  missingAlternateGroups.length
    ? `Missing localized alternate route groups: ${missingAlternateGroups.join(", ")}`
    : "",
  !localeLayoutSource.includes("alternateLanguages()")
    ? "Locale homepage metadata is not using alternateLanguages()."
    : "",
  !localeLayoutSource.includes("absoluteUrl(`/${locale}`)")
    ? "Locale homepage metadata is not using absolute self-canonical URLs."
    : "",
  !seoPageSource.includes("getSeoPageAlternates(seoPage)")
    ? "SEO landing pages are not using getSeoPageAlternates()."
    : "",
  !seoPageSource.includes('"x-default": xDefaultUrl')
    ? "SEO landing pages are not using the shared x-default URL."
    : "",
  !rootLayoutSource.includes("lang={locale}")
    ? "Root html lang is not wired to the resolved locale."
    : "",
  !localeLayoutSource.includes("HtmlLocaleSync")
    ? "Locale layout is not syncing html lang/dir on the client."
    : "",
  staticMetadataMissing.length
    ? `Static pages missing metadata: ${staticMetadataMissing.join(", ")}`
    : "",
].filter(Boolean);

if (failures.length) {
  console.error("SEO check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEO check passed.");
console.log(`Locales: ${locales.length}`);
console.log(`Static pages per locale: ${staticPages.length}`);
console.log(`SEO pages per locale: ${seoPages.length}`);
console.log(`Sitemap URLs checked: ${sitemapUrls.length}`);
console.log(`Alternate groups checked: ${alternateGroups.length}`);
