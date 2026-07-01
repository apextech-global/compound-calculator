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
    <section className="mt-10 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
      <div className="mb-5 max-w-3xl sm:mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
          {t("seoContent.eyebrow")}
        </p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {t("seoContent.title")}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
          {t("seoContent.intro")}
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        {sectionKeys.map((section) => (
          <details
            key={section}
            className="group rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-white sm:text-xl [&::-webkit-details-marker]:hidden">
              {t(`seoContent.sections.${section}.title`)}
              <span className="mt-1 text-cyan-300 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {t(`seoContent.sections.${section}.body`)}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4 sm:mt-4 sm:rounded-3xl sm:p-6">
        <h3 className="text-lg font-semibold text-amber-100 sm:text-xl">
          {t("seoContent.disclaimer.title")}
        </h3>
        <p className="mt-3 text-sm leading-6 text-amber-50/80">
          {t("seoContent.disclaimer.body")}
        </p>
      </div>

      <nav
        aria-label={t("seoContent.linksLabel")}
        className="mt-5 flex flex-wrap gap-2.5 text-sm sm:mt-6 sm:gap-3"
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
