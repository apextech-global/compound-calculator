"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();

  return (
    <div className="mb-3 w-full max-w-4xl sm:mb-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:mb-1.5 sm:text-sm sm:tracking-[0.28em]">
        {t("hero.eyebrow")}
      </p>
      <h1 className="min-w-0 break-words text-[1.9rem] font-bold leading-tight tracking-tight sm:text-[2.15rem] md:text-[3.35rem]">
        {t("hero.title")}
      </h1>
      <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base sm:leading-7 md:text-[1.05rem]">
        {t("hero.description")}
      </p>
    </div>
  );
}
