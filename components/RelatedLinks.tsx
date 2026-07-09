"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function RelatedLinks() {
  const t = useTranslations();
  const locale = useLocale();
  const relatedLinksLabel = t("hero.relatedLinksLabel");

  const relatedLinks = [
    { key: "learn", href: `/${locale}/learn` },
    { key: "supported-assets", href: `/${locale}/supported-assets` },
    { key: "recommended-tools", href: `/${locale}/recommended-tools` },
    { key: "voo-vs-cspx", href: `/${locale}/voo-vs-cspx` },
  ].map((link) => ({
    ...link,
    title: t(`hero.relatedLinks.${link.key}.title`),
    description: t(`hero.relatedLinks.${link.key}.description`),
  }));

  return (
    <section
      aria-label={relatedLinksLabel}
      className="mb-4 w-full rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-[0_12px_40px_rgba(2,6,23,0.2)] sm:p-4"
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/85 sm:text-xs">
        {relatedLinksLabel}
      </p>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {relatedLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <p className="text-sm font-semibold text-white">{link.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
