"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const priorityLinks = [
  "dca-calculator",
  "compound-interest-calculator",
  "etf-comparison-calculator",
] as const;

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const calculatorLinksLabel = t("hero.calculatorLinksLabel");

  return (
    <div className="mb-2.5 w-full max-w-4xl sm:mb-3">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:mb-1.5 sm:text-sm sm:tracking-[0.28em]">
        {t("hero.eyebrow")}
      </p>
      <h1 className="min-w-0 break-words text-[1.9rem] font-bold leading-tight tracking-tight sm:text-[2.15rem] md:text-[3.35rem]">
        {t("hero.title")}
      </h1>
      <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base sm:leading-7 md:text-[1.05rem]">
        {t("hero.description")}
      </p>
      <p className="mt-1.5 max-w-3xl break-words text-xs leading-5 text-slate-500 sm:mt-2">
        {t("caption.disclaimer")}
      </p>

      <nav
        aria-label={calculatorLinksLabel}
        className="mt-2.5 flex w-full flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:mt-3 sm:text-sm"
      >
        {priorityLinks.map((link, index) => (
          <span key={link} className="flex items-center gap-x-4">
            {index > 0 ? (
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
            ) : null}
            <Link
              href={`/${locale}/${link}`}
              className="min-w-0 rounded font-medium text-slate-300 underline decoration-white/20 decoration-1 underline-offset-4 transition hover:text-cyan-200 hover:decoration-cyan-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {t(`hero.links.${link}`)}
            </Link>
          </span>
        ))}
      </nav>

    </div>
  );
}
