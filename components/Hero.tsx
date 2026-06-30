"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();

  return (
    <div className="mb-4 max-w-4xl">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300 sm:text-sm">
        {t("hero.eyebrow")}
      </p>
      <h1 className="text-[2.15rem] font-bold leading-tight tracking-tight md:text-[3.35rem]">
        {t("hero.title")}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 md:text-[1.05rem]">
        {t("hero.description")}
      </p>
    </div>
  );
}
