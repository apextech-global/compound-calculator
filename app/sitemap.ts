import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { seoPageSlugs } from "@/lib/seoLandingPages";
import { absoluteUrl, staticPageSlugs } from "@/lib/seoMetadata";

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
      seoPageSlugs.map((page) => ({
        url: absoluteUrl(`/${locale}/${page}`),
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.82,
      }))
    ),
  ];
}
