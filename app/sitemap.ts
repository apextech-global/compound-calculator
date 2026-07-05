import type { MetadataRoute } from "next";
import { publicLocaleCodes } from "@/lib/locales";
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
    ...publicLocaleCodes.map((locale) => ({
      url: absoluteUrl(`/${locale}`),
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 0.95 : 0.9,
    })),
    ...publicLocaleCodes.flatMap((locale) =>
      staticPageSlugs.map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    ),
    ...publicLocaleCodes.flatMap((locale) =>
      contentPageSlugs.map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.78,
      }))
    ),
    ...(["en", "zh-CN", "zh-TW"] as const).map((locale) => ({
      url: absoluteUrl(`/${locale}/learn`),
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.86,
    })),
    ...publicLocaleCodes.flatMap((locale) =>
      getSeoPageSlugsForLocale(locale).map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.82,
      }))
    ),
  ];
}
