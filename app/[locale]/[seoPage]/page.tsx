import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  getSeoLandingContent,
  getSeoLandingPage,
  getSeoPageAlternates,
  isSeoPageSlug,
  seoPageSlugs,
  type SeoPageSlug,
} from "@/lib/seoLandingPages";

const baseUrl = "https://dcabacktest.com";
const legalLinks = ["about", "privacy", "terms", "contact"] as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    seoPageSlugs.map((seoPage) => ({ locale, seoPage }))
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
    !isSeoPageSlug(seoPage)
  ) {
    notFound();
  }

  const page = getSeoLandingPage(locale as Locale, seoPage);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${locale}/${seoPage}`,
      languages: {
        ...getSeoPageAlternates(seoPage),
        "x-default": `/en/${seoPage}`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${baseUrl}/${locale}/${seoPage}`,
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
    !isSeoPageSlug(seoPage)
  ) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const typedPage = seoPage as SeoPageSlug;
  const messages = (await import(`../../../messages/${typedLocale}.json`))
    .default;
  const content = getSeoLandingContent(typedLocale);
  const page = content.pages[typedPage];
  const pageUrl = `${baseUrl}/${typedLocale}/${typedPage}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "DCA Backtest",
        item: `${baseUrl}/${typedLocale}`,
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
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, faqJsonLd]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <section className="relative mx-auto max-w-5xl px-6 py-12 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <nav className="mb-8 text-sm text-slate-400">
          <Link href={`/${typedLocale}`} className="hover:text-cyan-300">
            DCA Backtest
          </Link>
          <span className="mx-2">/</span>
          <span>{content.pageLabel}</span>
        </nav>

        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {content.eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            {page.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20"
            >
              <h2 className="text-xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-6 shadow-2xl shadow-cyan-950/20">
          <h2 className="text-2xl font-bold">{content.ctaLabel}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            {content.ctaText}
          </p>
          <Link
            href={`/${typedLocale}`}
            className="mt-5 inline-flex rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            {content.ctaLabel}
          </Link>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold tracking-tight">
            {messages.faq.title}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {page.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-6"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-300/[0.07] p-6">
          <h2 className="text-xl font-semibold text-amber-100">
            {content.disclaimerTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-amber-50/80">
            {content.disclaimer}
          </p>
        </section>

        <nav
          aria-label={content.internalLinksLabel}
          className="mt-8 flex flex-wrap gap-3 text-sm"
        >
          {legalLinks.map((link) => (
            <Link
              key={link}
              href={`/${typedLocale}/${link}`}
              className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              {messages.footer[link]}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
