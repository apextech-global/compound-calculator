"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import {
  getSeoLandingContent,
  getSeoPageSlugsForLocale,
} from "@/lib/seoLandingPages";

const footerLinks = [
  { href: "supported-assets", label: "supportedAssets" },
  { href: "about", label: "about" },
  { href: "privacy", label: "privacy" },
  { href: "terms", label: "terms" },
  { href: "disclaimer", label: "disclaimer" },
  { href: "affiliate-disclosure", label: "affiliateDisclosure" },
  { href: "contact", label: "contact" },
] as const;

const feedbackText = {
  en: "Found a bug or wrong data? Send feedback",
  "zh-CN": "发现错误或数据问题？反馈给我们",
  "zh-TW": "發現錯誤或資料問題？回報給我們",
  ms: "Jumpa ralat atau data salah? Hantar maklum balas",
  id: "Menemukan bug atau data salah? Kirim masukan",
} as const;

const feedbackHref =
  "mailto:support@dcabacktest.com?subject=DCA%20Backtest%20Feedback";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const typedLocale = locale as Locale;
  const guides = getSeoLandingContent(typedLocale);
  const guideSlugs = getSeoPageSlugsForLocale(typedLocale);
  const feedbackLabel =
    feedbackText[locale as keyof typeof feedbackText] ?? feedbackText.en;

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto_auto] md:gap-8 lg:px-8">
        <div className="min-w-0">
          <p className="text-lg font-bold tracking-tight">{t("common.brand")}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            {t("footer.tagline")}
          </p>
          <a
            href={feedbackHref}
            className="mt-3 inline-flex text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
          >
            {feedbackLabel}
          </a>
        </div>

        <nav className="flex w-full min-w-0 flex-wrap gap-3 text-sm font-medium text-slate-300 md:max-w-sm">
          {typedLocale === "zh-CN" || typedLocale === "zh-TW" ? (
            <Link
              href={`/${typedLocale}/learn`}
              className="transition hover:text-cyan-300"
            >
              {t("footer.learnCenter")}
            </Link>
          ) : null}
          {guideSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/${locale}/${slug}`}
              className="transition hover:text-cyan-300"
            >
              {guides.pages[slug].h1}
            </Link>
          ))}
        </nav>

        <nav className="flex w-full min-w-0 flex-wrap gap-4 text-sm font-medium text-slate-300 md:justify-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}/${link.href}`}
              className="transition hover:text-cyan-300"
            >
              {t(`footer.${link.label}`)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
