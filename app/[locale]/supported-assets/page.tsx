import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { isPublicLocale, publicLocaleCodes } from "@/lib/locales";
import { hasImportedMarketData } from "@/lib/marketDataAvailability";
import { getMarketDataLastUpdatedDate } from "@/lib/marketDataStatus";
import { instruments } from "@/lib/instruments";
import { getSeoLandingPage, type SeoPageSlug } from "@/lib/seoLandingPages";
import {
  absoluteUrl,
  alternateLanguages,
  productionBaseUrl,
  socialImageAlt,
} from "@/lib/seoMetadata";

type SupportedAssetMessages = {
  title: string;
  eyebrow: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  columns: {
    symbol: string;
    name: string;
    market: string;
    type: string;
    currency: string;
    source: string;
    status: string;
    lastUpdated: string;
    link: string;
  };
  source: {
    yahoo: string;
    sample: string;
  };
  status: {
    historical: string;
    sample: string;
    notAvailable: string;
    sampleOnly: string;
  };
  action: {
    assetPage: string;
    calculator: string;
  };
  explanationTitle: string;
  explanation: string;
  linksTitle: string;
};

const assetPageSlugs: Record<string, string> = {
  voo: "voo-dca-calculator",
  "cspx-l": "cspx-dca-calculator",
  qqq: "qqq-dca-calculator",
  "vwra-l": "vwra-dca-calculator",
  "iwda-l": "iwda-dca-calculator",
  "0050-tw": "0050-dca-calculator",
  "1155-kl": "1155-dca-calculator",
  "es3-si": "es3-dca-calculator",
  "2800-hk": "2800-dca-calculator",
};

const internalLinks = [
  "dca-calculator",
  "etf-calculator",
  "etf-comparison-calculator",
  "voo-dca-calculator",
  "cspx-dca-calculator",
  "qqq-dca-calculator",
  "vwra-dca-calculator",
  "iwda-dca-calculator",
  "disclaimer",
] as const satisfies ReadonlyArray<SeoPageSlug | "disclaimer">;

const marketQueryCodes: Record<string, string> = {
  "United States": "us",
  "Ireland / UCITS ETFs": "ucits",
  Taiwan: "taiwan",
  Malaysia: "malaysia",
  Singapore: "singapore",
  Japan: "japan",
  "Hong Kong": "hongkong",
};

async function getMessages(locale: Locale) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return messages;
}

function getCalculatorQuery(instrument: (typeof instruments)[number]) {
  const params = new URLSearchParams({
    market: marketQueryCodes[instrument.country] ?? instrument.country,
    type: instrument.assetType,
    asset: instrument.displaySymbol,
  });

  return `?${params.toString()}`;
}

export function generateStaticParams() {
  return publicLocaleCodes.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isPublicLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const messages = await getMessages(typedLocale);
  const pageMessages = messages.supportedAssets as SupportedAssetMessages;
  const canonicalPath = `/${typedLocale}/supported-assets`;

  return {
    metadataBase: new URL(productionBaseUrl),
    title: pageMessages.seoTitle,
    description: pageMessages.seoDescription,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: alternateLanguages("/supported-assets"),
    },
    openGraph: {
      title: pageMessages.seoTitle,
      description: pageMessages.seoDescription,
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
      title: pageMessages.seoTitle,
      description: pageMessages.seoDescription,
      images: [
        {
          url: "/og-image.png",
          alt: socialImageAlt,
        },
      ],
    },
  };
}

export default async function SupportedAssetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isPublicLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const messages = await getMessages(typedLocale);
  const pageMessages = messages.supportedAssets as SupportedAssetMessages;
  const footer = messages.footer as Record<string, string>;
  const rows = instruments.map((instrument) => {
    const hasHistoricalData = hasImportedMarketData(instrument.dataKey);
    const assetPageSlug = assetPageSlugs[instrument.id];

    return {
      instrument,
      hasHistoricalData,
      lastUpdated: hasHistoricalData
        ? getMarketDataLastUpdatedDate(instrument.dataKey)
        : null,
      href: assetPageSlug
        ? `/${typedLocale}/${assetPageSlug}`
        : `/${typedLocale}${getCalculatorQuery(instrument)}`,
      actionLabel: assetPageSlug
        ? pageMessages.action.assetPage
        : pageMessages.action.calculator,
    };
  });

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <section className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <div className="w-full max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {pageMessages.eyebrow}
          </p>
          <h1 className="min-w-0 break-words text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            {pageMessages.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
            {pageMessages.description}
          </p>
        </div>

        <section className="mt-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30 sm:mt-10 sm:rounded-3xl">
          <div className="hidden grid-cols-[1fr_1.35fr_1fr_0.7fr_0.7fr_1fr_1fr_0.8fr_0.8fr] gap-3 border-b border-white/10 bg-white/[0.06] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 xl:grid">
            <span>{pageMessages.columns.symbol}</span>
            <span>{pageMessages.columns.name}</span>
            <span>{pageMessages.columns.market}</span>
            <span>{pageMessages.columns.type}</span>
            <span>{pageMessages.columns.currency}</span>
            <span>{pageMessages.columns.source}</span>
            <span>{pageMessages.columns.status}</span>
            <span>{pageMessages.columns.lastUpdated}</span>
            <span>{pageMessages.columns.link}</span>
          </div>

          <div className="divide-y divide-white/10">
            {rows.map(({ instrument, hasHistoricalData, lastUpdated, href, actionLabel }) => (
              <article
                key={instrument.id}
                className="grid w-full grid-cols-1 gap-3 px-4 py-4 text-sm sm:px-5 xl:grid-cols-[1fr_1.35fr_1fr_0.7fr_0.7fr_1fr_1fr_0.8fr_0.8fr] xl:items-center"
              >
                <div className="min-w-0">
                  <p className="font-bold text-white">{instrument.displaySymbol}</p>
                  <p className="mt-1 text-xs text-slate-500 xl:hidden">
                    {instrument.exchange}
                  </p>
                </div>
                <p className="min-w-0 break-words text-slate-200">
                  {instrument.name}
                </p>
                <p className="min-w-0 break-words text-slate-300">
                  {instrument.country}
                </p>
                <p className="text-slate-300">{instrument.assetType}</p>
                <p className="text-slate-300">{instrument.currency}</p>
                <p className="min-w-0 break-words text-slate-300">
                  {hasHistoricalData
                    ? pageMessages.source.yahoo
                    : pageMessages.source.sample}
                </p>
                <p
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    hasHistoricalData
                      ? "bg-emerald-400/10 text-emerald-200"
                      : "bg-slate-400/10 text-slate-300"
                  }`}
                >
                  {hasHistoricalData
                    ? pageMessages.status.historical
                    : pageMessages.status.sample}
                </p>
                <p className="text-slate-400">
                  {hasHistoricalData
                    ? lastUpdated ?? pageMessages.status.notAvailable
                    : pageMessages.status.sampleOnly}
                </p>
                <Link
                  href={href}
                  className="inline-flex w-full justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-center text-xs font-bold text-cyan-100 transition hover:border-cyan-300/60 hover:text-white sm:w-fit"
                >
                  {actionLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 w-full rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4 sm:mt-8 sm:rounded-3xl sm:p-6">
          <h2 className="break-words text-xl font-bold text-amber-100 sm:text-2xl">
            {pageMessages.explanationTitle}
          </h2>
          <p className="mt-3 max-w-4xl break-words text-sm leading-7 text-amber-50/80 sm:text-base">
            {pageMessages.explanation}
          </p>
        </section>

        <nav
          aria-label={pageMessages.linksTitle}
          className="mt-6 flex w-full flex-wrap gap-2.5 text-sm sm:mt-8 sm:gap-3"
        >
          {internalLinks.map((link) => (
            <Link
              key={link}
              href={`/${typedLocale}/${link}`}
              className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:border-cyan-300/50 hover:text-white"
            >
              {link === "disclaimer"
                ? footer.disclaimer
                : getSeoLandingPage(typedLocale, link).h1}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
