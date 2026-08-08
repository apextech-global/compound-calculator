"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type MobileBackToCalculatorProps = {
  targetId: string;
};

export default function MobileBackToCalculator({
  targetId,
}: MobileBackToCalculatorProps) {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const target = document.getElementById(targetId);

      if (!target) {
        setIsVisible(false);
        return;
      }

      const targetBottom = target.offsetTop + target.offsetHeight;
      setIsVisible(window.scrollY > targetBottom - 120);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [targetId]);

  const scrollToCalculator = () => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <button
        type="button"
        onClick={scrollToCalculator}
        className="w-full rounded-2xl border border-cyan-300/30 bg-slate-950/90 px-5 py-3 text-sm font-bold text-cyan-100 shadow-2xl shadow-black/40 backdrop-blur transition hover:border-cyan-300/60 hover:bg-slate-900"
      >
        {t("mobile.backToCalculator")}
      </button>
    </div>
  );
}
