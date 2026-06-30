"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import {
  getSeoLandingContent,
  seoPageSlugs,
} from "@/lib/seoLandingPages";

const sectionKeys = [
  "dca",
  "compound",
  "dcaVsLumpSum",
  "howToUse",
  "etfExample",
  "supportedAssets",
] as const;

const legalLinks = ["about", "privacy", "terms", "contact"] as const;

export default function SeoContent() {
  const t = useTranslations();
  const locale = useLocale();
  const guides = getSeoLandingContent(locale as Locale);

  return (
    <section className="mt-14 border-t border-white/10 pt-10">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          {t("seoContent.eyebrow")}
        </p>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t("seoContent.title")}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-300">
          {t("seoContent.intro")}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {sectionKeys.map((section) => (
          <article
            key={section}
            className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/20"
          >
            <h3 className="text-xl font-semibold text-white">
              {t(`seoContent.sections.${section}.title`)}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {t(`seoContent.sections.${section}.body`)}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-3xl border border-amber-300/20 bg-amber-300/[0.07] p-6">
        <h3 className="text-xl font-semibold text-amber-100">
          {t("seoContent.disclaimer.title")}
        </h3>
        <p className="mt-3 text-sm leading-6 text-amber-50/80">
          {t("seoContent.disclaimer.body")}
        </p>
      </div>

      <nav
        aria-label={t("seoContent.linksLabel")}
        className="mt-6 flex flex-wrap gap-3 text-sm"
      >
        {seoPageSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/${locale}/${slug}`}
            className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:border-cyan-300/50 hover:text-white"
          >
            {guides.pages[slug].h1}
          </Link>
        ))}
        {legalLinks.map((link) => (
          <Link
            key={link}
            href={`/${locale}/${link}`}
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
          >
            {t(`footer.${link}`)}
          </Link>
        ))}
      </nav>
    </section>
  );
}
