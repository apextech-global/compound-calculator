"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import CalculatorSwitcher from "@/components/CalculatorSwitcher";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import DcaBacktestCalculator from "@/components/DcaBacktestCalculator";
import Faq, { faqItems } from "@/components/Faq";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SeoContent from "@/components/SeoContent";
import {
  calculateCompoundInterest,
  calculateDcaBacktest,
} from "@/lib/calculations";
import {
  convertCurrencyToUsd,
  currencyCodes,
  getDefaultCurrency,
  type CurrencyCode,
} from "@/lib/currencies";
import { formatInputAmount } from "@/lib/formatting";
import {
  getMarketCsvYears,
  loadMarketCsv,
  type MarketCsvRow,
} from "@/lib/marketCsv";
import {
  assetTypeOptions,
  countryOptions,
  getAssetTypesForMarket,
  getInstrumentById,
  getInstrumentsByMarketAndType,
  instruments,
  type AssetType,
} from "@/lib/instruments";
import { getMockYearsForSymbol, type SymbolKey } from "@/lib/mockMarketData";

type ActiveCalculator = "dca" | "compound";

const marketQueryAliases: Record<string, string> = {
  us: "United States",
  unitedstates: "United States",
  united_states: "United States",
  ireland: "Ireland / UCITS ETFs",
  ucits: "Ireland / UCITS ETFs",
  irelanducits: "Ireland / UCITS ETFs",
  taiwan: "Taiwan",
  malaysia: "Malaysia",
  singapore: "Singapore",
  japan: "Japan",
  hongkong: "Hong Kong",
  hong_kong: "Hong Kong",
};

function normalizeQueryToken(value: string) {
  return value.trim().toLowerCase().replace(/[\s/-]+/g, "");
}

function getMarketQueryCode(country: string) {
  const aliases: Record<string, string> = {
    "United States": "us",
    "Ireland / UCITS ETFs": "ucits",
    Taiwan: "taiwan",
    Malaysia: "malaysia",
    Singapore: "singapore",
    Japan: "japan",
    "Hong Kong": "hongkong",
  };

  return aliases[country] ?? country;
}

function getCountryFromQuery(value: string | null) {
  if (!value) {
    return null;
  }

  const decodedValue = value.trim();
  const alias = marketQueryAliases[normalizeQueryToken(decodedValue)];

  if (alias && countryOptions.includes(alias)) {
    return alias;
  }

  return countryOptions.find(
    (country) =>
      country.toLowerCase() === decodedValue.toLowerCase() ||
      normalizeQueryToken(country) === normalizeQueryToken(decodedValue)
  );
}

function getAssetTypeFromQuery(value: string | null): AssetType | null {
  const normalizedValue = value?.toLowerCase();

  if (normalizedValue === "etf") {
    return "ETF";
  }

  if (normalizedValue === "stock") {
    return "Stock";
  }

  return null;
}

function getCurrencyFromQuery(value: string | null): CurrencyCode | null {
  const normalizedCurrency = value?.toUpperCase() as CurrencyCode | undefined;

  return normalizedCurrency && currencyCodes.includes(normalizedCurrency)
    ? normalizedCurrency
    : null;
}

function getInstrumentFromQuery(value: string | null) {
  if (!value) {
    return null;
  }

  const normalizedAsset = value.trim().toLowerCase();

  return instruments.find(
    (instrument) =>
      instrument.id.toLowerCase() === normalizedAsset ||
      instrument.symbol.toLowerCase() === normalizedAsset ||
      instrument.displaySymbol.toLowerCase() === normalizedAsset ||
      instrument.dataKey.toLowerCase() === normalizedAsset
  );
}

function getAmountFromQuery(value: string | null) {
  const amount = Number(value);

  return Number.isFinite(amount) && amount >= 0 ? String(amount) : null;
}

function trackShareEvent(
  eventName: "share_result_clicked" | "copy_result_link_clicked",
  selectedInstrument: ReturnType<typeof getInstrumentById> | undefined,
  market: string,
  assetType: AssetType
) {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (window as typeof window & {
    gtag?: (
      event: "event",
      eventName: string,
      params: Record<string, string>
    ) => void;
  }).gtag;

  gtag?.("event", eventName, {
    shared_asset_symbol: selectedInstrument?.displaySymbol ?? "",
    shared_market: market,
    shared_asset_type: assetType,
  });
}

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() =>
    getDefaultCurrency(locale)
  );
  const [activeCalculator, setActiveCalculator] =
    useState<ActiveCalculator>("dca");
  const [showCompoundTable, setShowCompoundTable] = useState(false);
  const [showBacktestTable, setShowBacktestTable] = useState(false);
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [years, setYears] = useState("20");
  const [backtestCountry, setBacktestCountry] = useState("United States");
  const [backtestAssetType, setBacktestAssetType] = useState<AssetType>("ETF");
  const [backtestSymbol, setBacktestSymbol] = useState<SymbolKey>("voo");
  const [backtestMonthlyAmount, setBacktestMonthlyAmount] = useState("500");
  const [backtestStartYear, setBacktestStartYear] = useState("2018");
  const [backtestEndYear, setBacktestEndYear] = useState("2025");
  const [marketCsvData, setMarketCsvData] = useState<{
    symbol: SymbolKey;
    rows: MarketCsvRow[] | null;
  } | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryInstrument = getInstrumentFromQuery(params.get("asset"));
    const queryCountry =
      getCountryFromQuery(params.get("market")) ?? queryInstrument?.country;
    const queryAssetType =
      getAssetTypeFromQuery(params.get("type")) ?? queryInstrument?.assetType;
    const queryCurrency = getCurrencyFromQuery(params.get("currency"));
    const effectiveQueryCurrency = queryCurrency ?? getDefaultCurrency(locale);
    const queryAmount = getAmountFromQuery(params.get("amount"));

    if (queryCurrency) {
      setSelectedCurrency(queryCurrency);
    }

    if (queryAmount !== null) {
      setBacktestMonthlyAmount(
        String(convertCurrencyToUsd(Number(queryAmount), effectiveQueryCurrency))
      );
    }

    if (params.get("start")) {
      setBacktestStartYear(params.get("start") ?? "2018");
    }

    if (params.get("end")) {
      setBacktestEndYear(params.get("end") ?? "2025");
    }

    if (!queryCountry || !countryOptions.includes(queryCountry)) {
      return;
    }

    const nextAssetTypes = getAssetTypesForMarket(queryCountry);
    const nextAssetType =
      queryAssetType && nextAssetTypes.includes(queryAssetType)
        ? queryAssetType
        : nextAssetTypes[0] ?? "ETF";
    const nextInstruments = getInstrumentsByMarketAndType(
      queryCountry,
      nextAssetType
    );
    const nextInstrument =
      queryInstrument &&
      queryInstrument.country === queryCountry &&
      queryInstrument.assetType === nextAssetType
        ? queryInstrument
        : nextInstruments[0];

    setBacktestCountry(queryCountry);
    setBacktestAssetType(nextAssetType);
    setBacktestSymbol((nextInstrument?.id ?? "voo") as SymbolKey);
    setActiveCalculator("dca");
  }, []);

  const availableAssetTypes = useMemo(
    () => getAssetTypesForMarket(backtestCountry),
    [backtestCountry]
  );

  const effectiveAssetType = availableAssetTypes.includes(backtestAssetType)
    ? backtestAssetType
    : availableAssetTypes[0] ?? backtestAssetType;

  const filteredInstruments = useMemo(
    () =>
      getInstrumentsByMarketAndType(backtestCountry, effectiveAssetType),
    [effectiveAssetType, backtestCountry]
  );

  const selectedInstrument =
    filteredInstruments.find((instrument) => instrument.id === backtestSymbol) ??
    filteredInstruments[0] ??
    getInstrumentById(backtestSymbol);

  const effectiveBacktestSymbol = selectedInstrument?.id ?? backtestSymbol;

  const handleBacktestCountryChange = (country: string) => {
    const nextAssetTypes = getAssetTypesForMarket(country);
    const nextAssetType = nextAssetTypes.includes(backtestAssetType)
      ? backtestAssetType
      : nextAssetTypes[0] ?? backtestAssetType;
    const nextInstruments = getInstrumentsByMarketAndType(
      country,
      nextAssetType
    );

    setBacktestCountry(country);
    setBacktestAssetType(nextAssetType);
    setBacktestSymbol(nextInstruments[0]?.id ?? backtestSymbol);
  };

  const handleBacktestAssetTypeChange = (assetType: AssetType) => {
    const nextInstruments = getInstrumentsByMarketAndType(
      backtestCountry,
      assetType
    );

    if (nextInstruments.length === 0) {
      return;
    }

    setBacktestAssetType(assetType);
    setBacktestSymbol(nextInstruments[0].id);
  };

  useEffect(() => {
    let isActive = true;

    if (!selectedInstrument) {
      return;
    }

    loadMarketCsv(selectedInstrument.dataKey).then((rows) => {
      if (isActive) {
        setMarketCsvData({ symbol: effectiveBacktestSymbol, rows });
      }
    });

    return () => {
      isActive = false;
    };
  }, [effectiveBacktestSymbol, selectedInstrument]);

  const activeMarketCsvRows =
    marketCsvData?.symbol === effectiveBacktestSymbol
      ? marketCsvData.rows
      : null;

  const availableBacktestYears = useMemo(() => {
    const csvYears = getMarketCsvYears(activeMarketCsvRows);

    return csvYears.length > 0
      ? csvYears
      : getMockYearsForSymbol(effectiveBacktestSymbol);
  }, [activeMarketCsvRows, effectiveBacktestSymbol]);

  const normalizedBacktestStartYear = availableBacktestYears.includes(
    Number(backtestStartYear)
  )
    ? backtestStartYear
    : String(availableBacktestYears[0]);
  const normalizedBacktestEndYear = availableBacktestYears.includes(
    Number(backtestEndYear)
  )
    ? backtestEndYear
    : String(availableBacktestYears[availableBacktestYears.length - 1]);

  const result = useMemo(
    () =>
      calculateCompoundInterest({
        initialAmount,
        monthlyContribution,
        annualReturn,
        years,
      }),
    [initialAmount, monthlyContribution, annualReturn, years]
  );

  const chartData = useMemo(
    () => [
      {
        year: t("table.start"),
        balance: Number(initialAmount) || 0,
        invested: Number(initialAmount) || 0,
      },
      ...result.yearlyResults.map((item) => ({
        year: `${t("table.year")} ${item.year}`,
        balance: Math.round(item.balance),
        invested: Math.round(item.invested),
      })),
    ],
    [initialAmount, result.yearlyResults, t]
  );

  const growthMultiple =
    result.totalInvested > 0 ? result.finalValue / result.totalInvested : 0;

  const backtest = useMemo(
    () =>
      calculateDcaBacktest({
        symbol: effectiveBacktestSymbol,
        monthlyAmount: backtestMonthlyAmount,
        startYear: normalizedBacktestStartYear,
        endYear: normalizedBacktestEndYear,
        monthlyPrices: activeMarketCsvRows,
      }),
    [
      activeMarketCsvRows,
      backtestMonthlyAmount,
      effectiveBacktestSymbol,
      normalizedBacktestEndYear,
      normalizedBacktestStartYear,
    ]
  );

  const backtestChartData = useMemo(
    () =>
      backtest.yearlyResults.map((item) => ({
        year: item.year,
        portfolioValue: Math.round(item.portfolioValue),
        invested: Math.round(item.invested),
      })),
    [backtest.yearlyResults]
  );

  useEffect(() => {
    const url = new URL(`/${locale}`, window.location.origin);

    url.searchParams.set("locale", locale);
    url.searchParams.set("market", getMarketQueryCode(backtestCountry));
    url.searchParams.set("type", effectiveAssetType);
    url.searchParams.set(
      "asset",
      selectedInstrument?.displaySymbol ?? effectiveBacktestSymbol
    );
    url.searchParams.set(
      "amount",
      formatInputAmount(backtestMonthlyAmount || "0", selectedCurrency)
    );
    url.searchParams.set("start", normalizedBacktestStartYear);
    url.searchParams.set("end", normalizedBacktestEndYear);
    url.searchParams.set("currency", selectedCurrency);

    setShareUrl(url.toString());
  }, [
    backtestCountry,
    backtestMonthlyAmount,
    effectiveAssetType,
    effectiveBacktestSymbol,
    locale,
    normalizedBacktestEndYear,
    normalizedBacktestStartYear,
    selectedCurrency,
    selectedInstrument,
  ]);

  const copyShareUrl = async () => {
    if (!shareUrl) {
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.setAttribute("readonly", "true");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopiedShareLink(true);
    trackShareEvent(
      "copy_result_link_clicked",
      selectedInstrument,
      backtestCountry,
      effectiveAssetType
    );
    window.setTimeout(() => setCopiedShareLink(false), 2200);
  };

  const handleShareResult = async () => {
    trackShareEvent(
      "share_result_clicked",
      selectedInstrument,
      backtestCountry,
      effectiveAssetType
    );

    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: t("share.title"),
          text: t("share.description"),
          url: shareUrl,
        });
        return;
      } catch {
        // Fall back to copying when native share is dismissed or unavailable.
      }
    }

    await copyShareUrl();
  };

  const structuredData = useMemo(() => {
    const pageUrl = `https://dcabacktest.com/${locale}`;
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: t(`faq.items.${item}.question`),
        acceptedAnswer: {
          "@type": "Answer",
          text: t(`faq.items.${item}.answer`),
        },
      })),
    };
    const webApplicationStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "DCA Backtest",
      url: pageUrl,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: locale,
      description: t("seo.description"),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        t("cards.dca.title"),
        t("cards.compound.title"),
        t("common.currency"),
        t("common.language"),
      ],
    };

    return JSON.stringify([
      faqStructuredData,
      webApplicationStructuredData,
    ]).replace(/</g, "\\u003c");
  }, [locale, t]);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <Navbar
        activeCalculator={activeCalculator}
        selectedCurrency={selectedCurrency}
        onCalculatorChange={setActiveCalculator}
        onCurrencyChange={setSelectedCurrency}
      />

      <section className="relative mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.14),_transparent_28%)]" />

        <Hero />

        <CalculatorSwitcher
          activeCalculator={activeCalculator}
          selectedCurrency={selectedCurrency}
          backtestSymbol={selectedInstrument?.displaySymbol ?? backtestSymbol}
          backtestFinalValue={backtest.finalValue}
          backtestTotalReturn={backtest.totalReturn}
          compoundYears={years}
          compoundFinalValue={result.finalValue}
          growthMultiple={growthMultiple}
          onCalculatorChange={setActiveCalculator}
        />

        {activeCalculator === "dca" ? (
          <DcaBacktestCalculator
            selectedCurrency={selectedCurrency}
            backtest={backtest}
            backtestChartData={backtestChartData}
            countryOptions={countryOptions}
            assetTypeOptions={assetTypeOptions}
            filteredInstruments={filteredInstruments}
            selectedInstrument={selectedInstrument}
            backtestCountry={backtestCountry}
            backtestAssetType={effectiveAssetType}
            backtestSymbol={effectiveBacktestSymbol}
            backtestMonthlyAmount={backtestMonthlyAmount}
            backtestStartYear={normalizedBacktestStartYear}
            backtestEndYear={normalizedBacktestEndYear}
            availableYears={availableBacktestYears}
            showBacktestTable={showBacktestTable}
            setBacktestCountry={handleBacktestCountryChange}
            setBacktestAssetType={handleBacktestAssetTypeChange}
            setBacktestSymbol={setBacktestSymbol}
            setBacktestMonthlyAmount={setBacktestMonthlyAmount}
            setBacktestStartYear={setBacktestStartYear}
            setBacktestEndYear={setBacktestEndYear}
            setShowBacktestTable={setShowBacktestTable}
            shareUrl={shareUrl}
            copiedShareLink={copiedShareLink}
            onShareResult={handleShareResult}
            onCopyShareLink={copyShareUrl}
          />
        ) : (
          <CompoundInterestCalculator
            selectedCurrency={selectedCurrency}
            result={result}
            chartData={chartData}
            growthMultiple={growthMultiple}
            initialAmount={initialAmount}
            monthlyContribution={monthlyContribution}
            annualReturn={annualReturn}
            years={years}
            showCompoundTable={showCompoundTable}
            setInitialAmount={setInitialAmount}
            setMonthlyContribution={setMonthlyContribution}
            setAnnualReturn={setAnnualReturn}
            setYears={setYears}
            setShowCompoundTable={setShowCompoundTable}
          />
        )}

        <SeoContent />
        <Faq />
      </section>
    </main>
  );
}
