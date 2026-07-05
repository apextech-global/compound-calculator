import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RecommendedToolsCta from "@/components/RecommendedToolsCta";
import { routing, type Locale } from "@/i18n/routing";
import {
  getSeoLandingContent,
  getSeoLandingPage,
  getSeoPageAlternates,
  getSeoPageSlugsForLocale,
  getSeoPageXDefault,
  isSeoPageSlugForLocale,
  type SeoPageSlug,
} from "@/lib/seoLandingPages";
import { absoluteUrl, productionBaseUrl } from "@/lib/seoMetadata";

const relatedSeoLinks: SeoPageSlug[] = [
  "dca-calculator",
  "compound-interest-calculator",
  "etf-calculator",
  "etf-comparison-calculator",
  "dca-vs-lump-sum",
  "voo-dca-calculator",
  "cspx-dca-calculator",
  "qqq-dca-calculator",
  "vwra-dca-calculator",
  "iwda-dca-calculator",
  "0050-dca-calculator",
  "1155-dca-calculator",
  "es3-dca-calculator",
  "2800-dca-calculator",
  "voo-vs-cspx",
  "voo-vs-qqq",
];
const chineseLearningRelatedLinks: SeoPageSlug[] = [
  "cspx-vs-voo-malaysia",
  "voo-vs-qqq-dca",
  "etf-dca-backtest-guide",
  "dca-vs-lump-sum-guide",
  "compound-interest-guide",
  "sp500-dca-simulation",
];
const siteLinks = ["supported-assets", "recommended-tools", "learn"] as const;
const legalLinks = [
  "privacy",
  "terms",
  "disclaimer",
  "affiliate-disclosure",
] as const;
const webApplicationSeoPages: SeoPageSlug[] = [
  "dca-calculator",
  "compound-interest-calculator",
  "etf-comparison-calculator",
];
const articleSeoPages: SeoPageSlug[] = [
  "voo-vs-cspx",
  "voo-vs-qqq",
  "dca-vs-lump-sum",
  "cspx-vs-vwra",
  "iwda-vs-vwra",
  "how-to-buy-cspx-from-malaysia",
  "how-to-invest-in-voo-from-malaysia",
  "best-etf-broker-malaysia",
  "ibkr-vs-moomoo-malaysia",
  "cspx-vs-voo-malaysia",
  "voo-vs-qqq-dca",
  "etf-dca-backtest-guide",
  "dca-vs-lump-sum-guide",
  "compound-interest-guide",
  "sp500-dca-simulation",
];
const malaysiaGuidePages: SeoPageSlug[] = [
  "how-to-buy-cspx-from-malaysia",
  "how-to-invest-in-voo-from-malaysia",
  "best-etf-broker-malaysia",
  "ibkr-vs-moomoo-malaysia",
];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getSeoPageSlugsForLocale(locale).map((seoPage) => ({ locale, seoPage }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; seoPage: string }>;
}): Promise<Metadata> {
  const { locale, seoPage } = await params;

  if (
    !routing.locales.includes(locale as Locale) ||
    !isSeoPageSlugForLocale(locale as Locale, seoPage)
  ) {
    notFound();
  }

  const page = getSeoLandingPage(locale as Locale, seoPage as SeoPageSlug);

  return {
    title: page.title,
    description: page.description,
    metadataBase: new URL(productionBaseUrl),
    alternates: {
      canonical: absoluteUrl(`/${locale}/${seoPage}`),
      languages: {
        ...getSeoPageAlternates(seoPage as SeoPageSlug),
        "x-default": getSeoPageXDefault(seoPage as SeoPageSlug),
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(`/${locale}/${seoPage}`),
      siteName: "DCA Backtest",
      type: "article",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ locale: string; seoPage: string }>;
}) {
  const { locale, seoPage } = await params;

  if (
    !routing.locales.includes(locale as Locale) ||
    !isSeoPageSlugForLocale(locale as Locale, seoPage)
  ) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const typedPage = seoPage as SeoPageSlug;
  const messages = (await import(`../../../messages/${typedLocale}.json`))
    .default;
  const content = getSeoLandingContent(typedLocale);
  const page = content.pages[typedPage];
  const pageUrl = absoluteUrl(`/${typedLocale}/${typedPage}`);
  const seoLinks =
    typedLocale === "zh-CN" ||
    typedLocale === "zh-TW" ||
    typedLocale === "ms" ||
    typedLocale === "ja"
      ? [...relatedSeoLinks, ...chineseLearningRelatedLinks]
      : relatedSeoLinks;
  const visibleSiteLinks =
    typedLocale === "en" ||
    typedLocale === "zh-CN" ||
    typedLocale === "zh-TW" ||
    typedLocale === "ms" ||
    typedLocale === "ja"
      ? siteLinks
      : siteLinks.filter((link) => link !== "learn");
  const pageTypeJsonLd = webApplicationSeoPages.includes(typedPage)
    ? {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: page.h1,
        url: pageUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: typedLocale,
        description: page.description,
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": articleSeoPages.includes(typedPage) ? "Article" : "WebPage",
        headline: page.h1,
        name: page.h1,
        description: page.description,
        url: pageUrl,
        inLanguage: typedLocale,
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: "DCA Backtest",
          url: absoluteUrl("/"),
        },
      };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "DCA Backtest",
        item: absoluteUrl(`/${typedLocale}`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: pageUrl,
      },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            pageTypeJsonLd,
            breadcrumbJsonLd,
            faqJsonLd,
          ]).replace(/</g, "\\u003c"),
        }}
      />
      <section className="relative mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <nav className="mb-6 min-w-0 break-words text-sm text-slate-400 sm:mb-8">
          <Link href={`/${typedLocale}`} className="hover:text-cyan-300">
            DCA Backtest
          </Link>
          <span className="mx-2">/</span>
          <span>{content.pageLabel}</span>
        </nav>

        <div className="w-full max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {content.eyebrow}
          </p>
          <h1 className="min-w-0 break-words text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
            {page.intro}
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:gap-4 md:mt-10 md:grid-cols-2">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6"
            >
              <h2 className="break-words text-lg font-semibold text-white sm:text-xl">
                {section.title}
              </h2>
              <p className="mt-3 break-words text-sm leading-6 text-slate-300">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-5 w-full min-w-0 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 shadow-2xl shadow-cyan-950/20 sm:mt-6 sm:rounded-3xl sm:p-6">
          <h2 className="break-words text-xl font-bold sm:text-2xl">{content.ctaLabel}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            {content.ctaText}
          </p>
          <Link
            href={`/${typedLocale}${page.ctaQuery ?? ""}`}
            className="mt-5 inline-flex w-full justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
          >
            {content.ctaLabel}
          </Link>
        </section>

        {typedLocale === "zh-CN" && malaysiaGuidePages.includes(typedPage) ? (
          <RecommendedToolsCta locale={typedLocale} sourcePage={typedPage} />
        ) : null}

        <section className="mt-8 w-full sm:mt-10">
          <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
            {messages.faq.title}
          </h2>
          <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2">
            {page.faqs.map((faq) => (
              <article
                key={faq.question}
                className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-4 sm:rounded-3xl sm:p-6"
              >
                <h3 className="break-words text-base font-semibold sm:text-lg">{faq.question}</h3>
                <p className="mt-3 break-words text-sm leading-6 text-slate-300">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 w-full min-w-0 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4 sm:mt-8 sm:rounded-3xl sm:p-6">
          <h2 className="break-words text-lg font-semibold text-amber-100 sm:text-xl">
            {content.disclaimerTitle}
          </h2>
          <p className="mt-3 break-words text-sm leading-6 text-amber-50/80">
            {content.disclaimer}
          </p>
        </section>

        <nav
          aria-label={content.internalLinksLabel}
          className="mt-6 flex w-full flex-wrap gap-2.5 text-sm sm:mt-8 sm:gap-3"
        >
          {seoLinks
            .filter((link) => isSeoPageSlugForLocale(typedLocale, link))
            .map((link) => (
            <Link
              key={link}
              href={`/${typedLocale}/${link}`}
              className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:border-cyan-300/50 hover:text-white"
            >
              {content.pages[link].h1}
            </Link>
          ))}
          {visibleSiteLinks.map((link) => (
            <Link
              key={link}
              href={`/${typedLocale}/${link}`}
              className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:border-cyan-300/50 hover:text-white"
            >
              {link === "supported-assets"
                ? messages.footer.supportedAssets
                : link === "recommended-tools"
                  ? messages.footer.recommendedTools
                : typedLocale === "zh-CN"
                  ? messages.footer.learnCenter
                : typedLocale === "zh-TW"
                  ? messages.footer.learnCenter
                : typedLocale === "ms" || typedLocale === "ja"
                  ? messages.footer.learnCenter
                : "Learn"}
            </Link>
          ))}
          {legalLinks.map((link) => (
            <Link
              key={link}
              href={`/${typedLocale}/${link}`}
              className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              {link === "disclaimer"
                ? messages.footer.disclaimer
                : link === "affiliate-disclosure"
                  ? messages.footer.affiliateDisclosure
                : messages.footer[link]}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
