"use client";

import Link from "next/link";
import { trackGaEvent } from "@/lib/analytics";

type RecommendedToolsCtaProps = {
  locale: string;
  sourcePage: string;
};

export default function RecommendedToolsCta({
  locale,
  sourcePage,
}: RecommendedToolsCtaProps) {
  return (
    <section className="mt-5 w-full min-w-0 rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.07] p-4 shadow-2xl shadow-emerald-950/20 sm:mt-6 sm:rounded-3xl sm:p-6">
      <h2 className="break-words text-xl font-bold text-emerald-50 sm:text-2xl">
        准备开始真实投资？先了解常见券商、换汇工具和费用注意事项。
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/80">
        部分链接未来可能是 affiliate / referral link。我们可能获得佣金或推荐奖励，但不会额外增加你的费用。
      </p>
      <Link
        href="/zh-CN/recommended-tools"
        onClick={() =>
          trackGaEvent("recommended_tools_cta_clicked", {
            locale,
            source_page: sourcePage,
            cta_location: "malaysia_guide",
          })
        }
        className="mt-5 inline-flex w-full justify-center rounded-2xl bg-emerald-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-emerald-200 sm:w-auto"
      >
        查看推荐工具
      </Link>
    </section>
  );
}
