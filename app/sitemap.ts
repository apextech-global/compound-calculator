import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://dcabacktest.com";
const staticPages = ["about", "privacy", "terms", "contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: locale === routing.defaultLocale ? 0.95 : 0.9,
    })),
    ...routing.locales.flatMap((locale) =>
      staticPages.map((page) => ({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: today,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    ),
  ];
}
