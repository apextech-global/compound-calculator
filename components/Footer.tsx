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
  { href: "contact", label: "contact" },
] as const;

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const typedLocale = locale as Locale;
  const guides = getSeoLandingContent(typedLocale);
  const guideSlugs = getSeoPageSlugsForLocale(typedLocale);

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto_auto] md:gap-8 lg:px-8">
        <div className="min-w-0">
          <p className="text-lg font-bold tracking-tight">{t("common.brand")}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            {t("footer.tagline")}
          </p>
        </div>

        <nav className="flex w-full min-w-0 flex-wrap gap-3 text-sm font-medium text-slate-300 md:max-w-sm">
          {typedLocale === "zh-CN" ? (
            <Link
              href="/zh-CN/learn"
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
