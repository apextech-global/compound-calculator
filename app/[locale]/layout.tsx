import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { routing, type Locale } from "@/i18n/routing";
import { getTextDirection } from "@/lib/locales";

const baseUrl = "https://dcabacktest.com";

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
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: `${baseUrl}/${locale}`,
      siteName: "DCA Backtest",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "DCA Backtest market history preview",
        },
      ],
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: ["/og-image.png"],
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
        {children}
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
