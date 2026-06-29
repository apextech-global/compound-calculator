"use client";

import { useTranslations } from "next-intl";

const faqItems = [
  "dcaInvesting",
  "backtestWork",
  "dividends",
  "brokerageReturns",
  "financialAdvice",
  "supportedSymbols",
  "currency",
] as const;

export default function Faq() {
  const t = useTranslations();

  return (
    <section className="mt-14 border-t border-white/10 pt-10">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          {t("faq.eyebrow")}
        </p>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t("faq.title")}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {faqItems.map((item) => (
          <article
            key={item}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20"
          >
            <h3 className="text-lg font-semibold text-white">
              {t(`faq.items.${item}.question`)}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {t(`faq.items.${item}.answer`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
