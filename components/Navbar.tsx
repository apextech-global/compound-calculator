"use client";

import { useLocale, useTranslations } from "next-intl";
import { currencyCodes, type CurrencyCode } from "@/lib/currencies";
import { languageCodes } from "@/lib/locales";

type NavbarProps = {
  activeCalculator: "dca" | "compound";
  selectedCurrency: CurrencyCode;
  onCalculatorChange: (calculator: "dca" | "compound") => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
};

export default function Navbar({
  activeCalculator,
  selectedCurrency,
  onCalculatorChange,
  onCurrencyChange,
}: NavbarProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <button
          type="button"
          onClick={() => onCalculatorChange("dca")}
          className="w-fit text-left text-xl font-bold tracking-tight text-white"
        >
          {t("common.brand")}
        </button>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-1 text-sm font-medium sm:flex">
            <button
              type="button"
              onClick={() => onCalculatorChange("dca")}
              className={`rounded-xl px-4 py-2 transition ${
                activeCalculator === "dca"
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t("nav.dcaBacktest")}
            </button>
            <button
              type="button"
              onClick={() => onCalculatorChange("compound")}
              className={`rounded-xl px-4 py-2 transition ${
                activeCalculator === "compound"
                  ? "bg-emerald-400 text-slate-950"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t("nav.compoundCalculator")}
            </button>
          </div>

          <label className="sr-only" htmlFor="language-switcher">
            {t("common.language")}
          </label>
          <select
            id="language-switcher"
            value={locale}
            onChange={(event) => {
              window.location.assign(`/${event.target.value}`);
            }}
            className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
          >
            {languageCodes.map((language) => (
              <option key={language} value={language}>
                {t(`languages.${language}`)}
              </option>
            ))}
          </select>

          <div className="max-w-xs">
            <label className="sr-only" htmlFor="currency-switcher">
              {t("common.currency")}
            </label>
            <select
              id="currency-switcher"
              value={selectedCurrency}
              onChange={(event) =>
                onCurrencyChange(event.target.value as CurrencyCode)
              }
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
            >
              {currencyCodes.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              {t("common.currencyNote")}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
