import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import HtmlLocaleSync from "@/components/HtmlLocaleSync";
import { routing, type Locale } from "@/i18n/routing";
import { getTextDirection } from "@/lib/locales";
import {
  absoluteUrl,
  alternateLanguages,
  productionBaseUrl,
  socialImageAlt,
} from "@/lib/seoMetadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const title = messages.seo.title;
  const description = messages.seo.description;
  const openGraphTitle = messages.seo.openGraphTitle;
  const openGraphDescription = messages.seo.openGraphDescription;

  return {
    metadataBase: new URL(productionBaseUrl),
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: alternateLanguages(),
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: absoluteUrl(`/${locale}`),
      siteName: "DCA Backtest",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [
        {
          url: "/og-image.png",
          alt: socialImageAlt,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <div dir={getTextDirection(locale)}>
        <HtmlLocaleSync locale={locale} />
        {children}
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
