"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

type SupportedLocale = "en" | "zh-CN" | "zh-TW" | "ms" | "id" | "ko";

type NextStepCopy = {
  prefix: string;
  compareLinkText: string;
  middle: string;
  guideLinkText: string;
  suffix: string;
  guideHref: string;
};

const copyByLocale: Record<SupportedLocale, NextStepCopy> = {
  en: {
    prefix: "Next step: compare this result with another ",
    compareLinkText: "ETF",
    middle: " or read the ",
    guideLinkText: "beginner guide",
    suffix: ".",
    guideHref: "/en/learn",
  },
  "zh-CN": {
    prefix: "下一步：你可以和另一个 ",
    compareLinkText: "ETF",
    middle: " 比较，或阅读",
    guideLinkText: "入门指南",
    suffix: "。",
    guideHref: "/zh-CN/etf-dca-backtest-guide",
  },
  "zh-TW": {
    prefix: "下一步：你可以和另一個 ",
    compareLinkText: "ETF",
    middle: " 比較，或閱讀",
    guideLinkText: "入門指南",
    suffix: "。",
    guideHref: "/zh-TW/etf-dca-backtest-guide",
  },
  ms: {
    prefix: "Langkah seterusnya: bandingkan keputusan ini dengan ",
    compareLinkText: "ETF",
    middle: " lain atau baca ",
    guideLinkText: "panduan asas",
    suffix: ".",
    guideHref: "/ms/etf-dca-backtest-guide",
  },
  id: {
    prefix: "Langkah berikutnya: bandingkan hasil ini dengan ",
    compareLinkText: "ETF",
    middle: " lain atau baca ",
    guideLinkText: "panduan pemula",
    suffix: ".",
    guideHref: "/id/dca-calculator",
  },
  ko: {
    prefix: "다음 단계: 이 결과를 다른 ",
    compareLinkText: "ETF",
    middle: "와 비교하거나 ",
    guideLinkText: "DCA 계산기 가이드",
    suffix: "를 읽어보세요.",
    guideHref: "/ko/dca-calculator",
  },
};

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale in copyByLocale;
}

export default function NextStepCta() {
  const locale = useLocale();

  if (!isSupportedLocale(locale)) {
    return null;
  }

  const copy = copyByLocale[locale];
  const linkClassName =
    "font-semibold text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-cyan-200";

  return (
    <p className="mt-4 text-sm leading-6 text-slate-300">
      {copy.prefix}
      <Link href={`/${locale}/etf-comparison-calculator`} className={linkClassName}>
        {copy.compareLinkText}
      </Link>
      {copy.middle}
      <Link href={copy.guideHref} className={linkClassName}>
        {copy.guideLinkText}
      </Link>
      {copy.suffix}
    </p>
  );
}
