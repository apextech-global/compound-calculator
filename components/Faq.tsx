"use client";

import { useTranslations } from "next-intl";

export const faqItems = [
  "dcaBacktest",
  "compoundInterest",
  "monthlyGrowth",
  "vooCspx",
  "free",
  "financialAdvice",
  "etfs",
  "sampleData",
  "marketDataUpdates",
] as const;

export default function Faq() {
  const t = useTranslations();

  return (
    <section className="mt-10 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
      <div className="mb-5 max-w-3xl sm:mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
          {t("faq.eyebrow")}
        </p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {t("faq.title")}
        </h2>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {faqItems.map((item, index) => (
          <details
            key={item}
            className="group rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-white sm:text-lg [&::-webkit-details-marker]:hidden">
              {t(`faq.items.${item}.question`)}
              <span className="mt-1 text-cyan-300 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {t(`faq.items.${item}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
