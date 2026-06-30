"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import {
  getSeoLandingContent,
  seoPageSlugs,
} from "@/lib/seoLandingPages";

const footerLinks = [
  { href: "about", label: "about" },
  { href: "privacy", label: "privacy" },
  { href: "terms", label: "terms" },
  { href: "contact", label: "contact" },
] as const;

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const guides = getSeoLandingContent(locale as Locale);

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-[1fr_auto_auto] lg:px-8">
        <div>
          <p className="text-lg font-bold tracking-tight">{t("common.brand")}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            {t("footer.tagline")}
          </p>
        </div>

        <nav className="flex max-w-sm flex-wrap gap-3 text-sm font-medium text-slate-300">
          {seoPageSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/${locale}/${slug}`}
              className="transition hover:text-cyan-300"
            >
              {guides.pages[slug].h1}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-300 md:justify-end">
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
