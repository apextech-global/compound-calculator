"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import {
  getSeoLandingContent,
  getSeoPageSlugsForLocale,
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
  const typedLocale = locale as Locale;
  const guides = getSeoLandingContent(typedLocale);
  const guideSlugs = getSeoPageSlugsForLocale(typedLocale);
  const learningHub =
    typedLocale === "en"
      ? {
          title: "ETF DCA Learning Hub",
          description:
            "Learn ETF DCA basics, DCA backtesting, compound interest, VOO, CSPX, QQQ, and DCA vs lump sum.",
          href: "/en/learn",
          button: "Open learning hub",
        }
      : typedLocale === "zh-CN"
      ? {
          title: "ETF 定投学习中心",
          description:
            "学习 ETF 定投、复利、DCA 回测、VOO、CSPX 和定投 vs 一次性投入。",
          href: "/zh-CN/learn",
          button: "打开学习中心",
        }
      : typedLocale === "zh-TW"
        ? {
            title: "ETF 定期定額學習中心",
            description:
              "學習 ETF 定期定額、複利、DCA 回測、VOO、CSPX 和定期定額 vs 單筆投入。",
            href: "/zh-TW/learn",
            button: "打開學習中心",
          }
        : typedLocale === "ms"
          ? {
              title: "Pusat Pembelajaran ETF DCA",
              description:
                "Belajar ETF DCA, compound interest, DCA backtest, VOO, CSPX, QQQ dan DCA vs Lump Sum.",
              href: "/ms/learn",
              button: "Buka pusat pembelajaran",
            }
          : null;

  return (
    <section className="mt-10 w-full min-w-0 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
      <div className="mb-5 w-full max-w-3xl sm:mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
          {t("seoContent.eyebrow")}
        </p>
        <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {t("seoContent.title")}
        </h2>
        <p className="mt-3 break-words text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
          {t("seoContent.intro")}
        </p>
      </div>

      {learningHub ? (
        <section className="mb-5 w-full min-w-0 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 shadow-xl shadow-cyan-950/20 sm:mb-6 sm:rounded-3xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h3 className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
                {learningHub.title}
              </h3>
              <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                {learningHub.description}
              </p>
            </div>
            <Link
              href={learningHub.href}
              className="inline-flex w-full shrink-0 justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
            >
              {learningHub.button}
            </Link>
          </div>
        </section>
      ) : null}

      <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        {sectionKeys.map((section) => (
          <details
            key={section}
            className="group w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6"
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

      <div className="mt-3 w-full min-w-0 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4 sm:mt-4 sm:rounded-3xl sm:p-6">
        <h3 className="break-words text-lg font-semibold text-amber-100 sm:text-xl">
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
        {guideSlugs.map((slug) => (
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
