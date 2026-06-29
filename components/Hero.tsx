"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();

  return (
    <div className="mb-6 max-w-4xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        {t("hero.eyebrow")}
      </p>
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
        {t("hero.title")}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
        {t("hero.description")}
      </p>
    </div>
  );
}
