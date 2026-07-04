import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSeoPageSlugsForLocale } from "@/lib/seoLandingPages";
import { absoluteUrl, contentPageSlugs, staticPageSlugs } from "@/lib/seoMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}`),
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: locale === routing.defaultLocale ? 0.95 : 0.9,
    })),
    ...routing.locales.flatMap((locale) =>
      staticPageSlugs.map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    ),
    ...routing.locales.flatMap((locale) =>
      contentPageSlugs.map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.78,
      }))
    ),
    {
      url: absoluteUrl("/zh-CN/learn"),
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.86,
    },
    ...routing.locales.flatMap((locale) =>
      getSeoPageSlugsForLocale(locale).map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.82,
      }))
    ),
  ];
}
