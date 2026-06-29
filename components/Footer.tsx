"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const footerLinks = [
  { href: "about", label: "about" },
  { href: "privacy", label: "privacy" },
  { href: "terms", label: "terms" },
  { href: "contact", label: "contact" },
] as const;

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-lg font-bold tracking-tight">{t("common.brand")}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            {t("footer.tagline")}
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
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
