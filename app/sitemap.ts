import type { MetadataRoute } from "next";
import { publicLearnLocales, publicLocaleCodes } from "@/lib/locales";
import { getLatestMarketDataLastUpdatedDate } from "@/lib/marketDataStatus";
import { getSeoPageLastModified, getSeoPageSlugsForLocale } from "@/lib/seoLandingPages";
import { absoluteUrl, contentPageSlugs, staticPageSlugs } from "@/lib/seoMetadata";

const legalLastModifiedSlugs = ["privacy", "terms"] as const;

async function getLegalLastModified(
  locale: string,
  page: string
): Promise<Date | undefined> {
  if (!(legalLastModifiedSlugs as readonly string[]).includes(page)) {
    return undefined;
  }

  const messages = (await import(`../messages/${locale}.json`)).default;
  const lastUpdated = messages.legal?.[page]?.lastUpdated;
  const parsed = lastUpdated ? new Date(lastUpdated) : null;

  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supportedAssetsLastModified = getLatestMarketDataLastUpdatedDate();

  const staticPageEntries = await Promise.all(
    publicLocaleCodes.flatMap((locale) =>
      staticPageSlugs.map(async (page) => {
        const lastModified = await getLegalLastModified(locale, page);

        return {
          url: absoluteUrl(`/${locale}/${page}`),
          ...(lastModified ? { lastModified } : {}),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      })
    )
  );

  return [
    ...publicLocaleCodes.map((locale) => ({
      url: absoluteUrl(`/${locale}`),
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 0.95 : 0.9,
    })),
    ...staticPageEntries,
    ...publicLocaleCodes.flatMap((locale) =>
      contentPageSlugs.map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        ...(page === "supported-assets" && supportedAssetsLastModified
          ? { lastModified: new Date(supportedAssetsLastModified) }
          : {}),
        changeFrequency: "monthly" as const,
        priority: 0.78,
      }))
    ),
    ...publicLearnLocales.map((locale) => ({
      url: absoluteUrl(`/${locale}/learn`),
      changeFrequency: "monthly" as const,
      priority: 0.86,
    })),
    ...publicLocaleCodes.flatMap((locale) =>
      getSeoPageSlugsForLocale(locale).map((page) => {
        const seoLastModified = getSeoPageLastModified(page);

        return {
          url: absoluteUrl(`/${locale}/${page}`),
          ...(seoLastModified ? { lastModified: new Date(seoLastModified) } : {}),
          changeFrequency: "monthly" as const,
          priority: 0.82,
        };
      })
    ),
  ];
}
