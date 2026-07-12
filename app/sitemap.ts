import type { MetadataRoute } from "next";
import { publicLearnLocales, publicLocaleCodes } from "@/lib/locales";
import { getSeoPageLastModified, getSeoPageSlugsForLocale } from "@/lib/seoLandingPages";
import { absoluteUrl, contentPageSlugs, staticPageSlugs } from "@/lib/seoMetadata";

const legalLastModifiedSlugs = ["privacy", "terms"] as const;

async function getLegalLastModified(
  locale: string,
  page: string,
  fallback: Date
): Promise<Date> {
  if (
    !(legalLastModifiedSlugs as readonly string[]).includes(page)
  ) {
    return fallback;
  }

  const messages = (await import(`../messages/${locale}.json`)).default;
  const lastUpdated = messages.legal?.[page]?.lastUpdated;
  const parsed = lastUpdated ? new Date(lastUpdated) : null;

  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : fallback;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date();

  const staticPageEntries = await Promise.all(
    publicLocaleCodes.flatMap((locale) =>
      staticPageSlugs.map(async (page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: await getLegalLastModified(locale, page, today),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    )
  );

  return [
    {
      url: absoluteUrl("/"),
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...publicLocaleCodes.map((locale) => ({
      url: absoluteUrl(`/${locale}`),
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 0.95 : 0.9,
    })),
    ...staticPageEntries,
    ...publicLocaleCodes.flatMap((locale) =>
      contentPageSlugs.map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.78,
      }))
    ),
    ...publicLearnLocales.map((locale) => ({
      url: absoluteUrl(`/${locale}/learn`),
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.86,
    })),
    ...publicLocaleCodes.flatMap((locale) =>
      getSeoPageSlugsForLocale(locale).map((page) => {
        const seoLastModified = getSeoPageLastModified(page);

        return {
          url: absoluteUrl(`/${locale}/${page}`),
          lastModified: seoLastModified ? new Date(seoLastModified) : today,
          changeFrequency: "monthly" as const,
          priority: 0.82,
        };
      })
    ),
  ];
}
