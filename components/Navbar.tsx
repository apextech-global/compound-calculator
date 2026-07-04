"use client";

import { useLocale, useTranslations } from "next-intl";
import { currencyCodes, type CurrencyCode } from "@/lib/currencies";
import { publicLocaleCodes } from "@/lib/locales";

type NavbarProps = {
  selectedCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
};

export default function Navbar({
  selectedCurrency,
  onCurrencyChange,
}: NavbarProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="w-fit max-w-full text-left text-xl font-bold tracking-tight text-white">
          {t("common.brand")}
        </div>

        <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-start">
          <label className="sr-only" htmlFor="language-switcher">
            {t("common.language")}
          </label>
          <select
            id="language-switcher"
            value={locale}
            onChange={(event) => {
              window.location.assign(`/${event.target.value}`);
            }}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 sm:w-auto"
          >
            {publicLocaleCodes.map((language) => (
              <option key={language} value={language}>
                {t(`languages.${language}`)}
              </option>
            ))}
          </select>

          <div className="w-full min-w-0 sm:max-w-xs">
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
