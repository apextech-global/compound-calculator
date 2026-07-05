import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { publicLocaleCodes } from "@/lib/locales";

export const productionBaseUrl = "https://dcabacktest.com";
export const xDefaultUrl = `${productionBaseUrl}/en`;
export const socialImageAlt =
  "DCA Backtest chart preview showing monthly investment growth over time";
export const staticPageSlugs = [
  "about",
  "privacy",
  "terms",
  "disclaimer",
  "affiliate-disclosure",
  "contact",
] as const;
export const contentPageSlugs = ["supported-assets", "recommended-tools"] as const;

export type StaticPageSlug = (typeof staticPageSlugs)[number];
export type ContentPageSlug = (typeof contentPageSlugs)[number];

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${productionBaseUrl}${normalizedPath}`;
}

export function localeAlternates(pathSuffix = "") {
  const normalizedSuffix = pathSuffix.startsWith("/")
    ? pathSuffix
    : `/${pathSuffix}`;
  const suffix = pathSuffix ? normalizedSuffix : "";

  return Object.fromEntries(
    publicLocaleCodes.map((locale) => [
      locale,
      absoluteUrl(`/${locale}${suffix}`),
    ])
  );
}

export function alternateLanguages(pathSuffix = "") {
  return {
    ...localeAlternates(pathSuffix),
    "x-default": xDefaultUrl,
  };
}

export function validateLocale(locale: string): Locale {
  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function staticPageMetadata(
  locale: string,
  page: StaticPageSlug
): Promise<Metadata> {
  const typedLocale = validateLocale(locale);
  const messages = (await import(`../messages/${typedLocale}.json`)).default;
  const legalPage = messages.legal[page];
  const title = `${legalPage.title} | DCA Backtest`;
  const description =
    legalPage.paragraphs?.p1 ??
    legalPage.sections?.[0]?.body ??
    messages.seo.description;
  const canonicalPath = `/${typedLocale}/${page}`;

  return {
    metadataBase: new URL(productionBaseUrl),
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: alternateLanguages(`/${page}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: "DCA Backtest",
      type: "article",
      locale: typedLocale,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          alt: socialImageAlt,
        },
      ],
    },
  };
}

export function createStaticPageMetadata(page: StaticPageSlug) {
  return async ({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> => {
    const { locale } = await params;
    return staticPageMetadata(locale, page);
  };
}
