"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import CalculatorSwitcher, {
  CALCULATOR_TAB_IDS,
} from "@/components/CalculatorSwitcher";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import DcaAssetComparison from "@/components/DcaAssetComparison";
import DcaBacktestCalculator from "@/components/DcaBacktestCalculator";
import Faq, { faqItems } from "@/components/Faq";
import Hero from "@/components/Hero";
import MobileBackToCalculator from "@/components/MobileBackToCalculator";
import Navbar from "@/components/Navbar";
import RelatedLinks from "@/components/RelatedLinks";
import SeoContent from "@/components/SeoContent";
import { trackGaEvent } from "@/lib/analytics";
import {
  calculateCompoundInterest,
  calculateDcaBacktest,
  type PurchasePriceMethod,
} from "@/lib/calculations";
import {
  convertCurrencyToUsd,
  currencyCodes,
  getDefaultCurrency,
  type CurrencyCode,
} from "@/lib/currencies";
import { formatInputAmount, formatMoney, formatPercent } from "@/lib/formatting";
import {
  getMarketCsvYears,
  loadMarketCsv,
  type MarketCsvRow,
} from "@/lib/marketCsv";
import { hasImportedMarketData } from "@/lib/marketDataAvailability";
import {
  getMarketDataLastUpdatedDate,
  isMarketDataUpdateOld,
} from "@/lib/marketDataStatus";
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
type QuickStartPresetId =
  | "voo-dca"
  | "cspx-dca"
  | "voo-cspx-comparison"
  | "voo-qqq-comparison"
  | "dca-vs-lump-sum"
  | "compound-growth";

type QuickStartPreset = {
  id: QuickStartPresetId;
  mode: "dca" | "comparison" | "dca_vs_lump_sum" | "compound";
  assetSymbol?: string;
  comparisonAssets?: string;
};

const quickStartCopy = {
  en: {
    title: "Popular examples",
    showMore: "Show more examples",
    showLess: "Show fewer examples",
    presets: {
      "voo-dca": "VOO DCA: $1,000/month, 2018-2025",
      "cspx-dca": "CSPX DCA: $1,000/month, 2018-2025",
      "voo-cspx-comparison": "VOO vs CSPX comparison",
      "voo-qqq-comparison": "VOO vs QQQ comparison",
      "dca-vs-lump-sum": "DCA vs Lump Sum example",
      "compound-growth": "Compound growth: $500/month for 20 years",
    },
  },
  "zh-CN": {
    title: "热门试算案例",
    showMore: "查看更多案例",
    showLess: "收起更多案例",
    presets: {
      "voo-dca": "VOO 定投：每月 $1,000，2018-2025",
      "cspx-dca": "CSPX 定投：每月 $1,000，2018-2025",
      "voo-cspx-comparison": "VOO vs CSPX 对比",
      "voo-qqq-comparison": "VOO vs QQQ 对比",
      "dca-vs-lump-sum": "定投 vs 一次性投入示例",
      "compound-growth": "复利增长：每月 $500，20 年",
    },
  },
  "zh-TW": {
    title: "熱門試算案例",
    showMore: "查看更多案例",
    showLess: "收起更多案例",
    presets: {
      "voo-dca": "VOO 定期定額：每月 $1,000，2018-2025",
      "cspx-dca": "CSPX 定期定額：每月 $1,000，2018-2025",
      "voo-cspx-comparison": "VOO vs CSPX 對比",
      "voo-qqq-comparison": "VOO vs QQQ 對比",
      "dca-vs-lump-sum": "定期定額 vs 單筆投入範例",
      "compound-growth": "複利成長：每月 $500，20 年",
    },
  },
  ms: {
    title: "Contoh popular",
    showMore: "Lihat lebih banyak contoh",
    showLess: "Sembunyikan contoh tambahan",
    presets: {
      "voo-dca": "VOO DCA: $1,000/bulan, 2018-2025",
      "cspx-dca": "CSPX DCA: $1,000/bulan, 2018-2025",
      "voo-cspx-comparison": "Perbandingan VOO vs CSPX",
      "voo-qqq-comparison": "Perbandingan VOO vs QQQ",
      "dca-vs-lump-sum": "Contoh DCA vs pelaburan sekaligus",
      "compound-growth": "Pertumbuhan kompaun: $500/bulan selama 20 tahun",
    },
  },
  id: {
    title: "Contoh populer",
    showMore: "Lihat lebih banyak contoh",
    showLess: "Sembunyikan contoh tambahan",
    presets: {
      "voo-dca": "VOO DCA: $1.000/bulan, 2018-2025",
      "cspx-dca": "CSPX DCA: $1.000/bulan, 2018-2025",
      "voo-cspx-comparison": "Perbandingan VOO vs CSPX",
      "voo-qqq-comparison": "Perbandingan VOO vs QQQ",
      "dca-vs-lump-sum": "Contoh DCA vs investasi sekaligus",
      "compound-growth": "Pertumbuhan majemuk: $500/bulan selama 20 tahun",
    },
  },
} as const;

const primaryQuickStartPresetIds: QuickStartPresetId[] = [
  "voo-dca",
  "cspx-dca",
  "voo-qqq-comparison",
  "compound-growth",
];

const quickStartPresets: QuickStartPreset[] = [
  { id: "voo-dca", mode: "dca", assetSymbol: "VOO" },
  { id: "cspx-dca", mode: "dca", assetSymbol: "CSPX.L" },
  {
    id: "voo-cspx-comparison",
    mode: "comparison",
    comparisonAssets: "VOO,CSPX.L",
  },
  {
    id: "voo-qqq-comparison",
    mode: "comparison",
    comparisonAssets: "VOO,QQQ",
  },
  { id: "dca-vs-lump-sum", mode: "dca_vs_lump_sum", assetSymbol: "VOO" },
  { id: "compound-growth", mode: "compound" },
];

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

function getPurchasePriceMethodFromQuery(
  value: string | null
): PurchasePriceMethod | null {
  if (value === "close" || value === "average" || value === "first") {
    return value;
  }

  return null;
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "true");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 1
) {
  const segments = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const segment of segments) {
    const nextLine = currentLine ? `${currentLine} ${segment}` : segment;

    if (ctx.measureText(nextLine).width <= maxWidth || !currentLine) {
      currentLine = nextLine;
    } else {
      lines.push(currentLine);
      currentLine = segment;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  const visibleLines = lines.slice(0, maxLines);
  const lastLineIndex = visibleLines.length - 1;

  if (lines.length > maxLines && lastLineIndex >= 0) {
    let truncated = visibleLines[lastLineIndex];

    while (
      truncated.length > 1 &&
      ctx.measureText(`${truncated}...`).width > maxWidth
    ) {
      truncated = truncated.slice(0, -1);
    }

    visibleLines[lastLineIndex] = `${truncated}...`;
  }

  visibleLines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  minSize: number,
  fontWeight = "700"
) {
  let size = startSize;

  while (size > minSize) {
    ctx.font = `${fontWeight} ${size}px Inter, Arial, sans-serif`;

    if (ctx.measureText(text).width <= maxWidth) {
      return size;
    }

    size -= 2;
  }

  return minSize;
}

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() =>
    getDefaultCurrency(locale)
  );
  const [activeCalculator, setActiveCalculator] =
    useState<ActiveCalculator>("dca");
  const [showMorePresets, setShowMorePresets] = useState(false);
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
  const [backtestFixedFee, setBacktestFixedFee] = useState("0");
  const [backtestPercentageFee, setBacktestPercentageFee] = useState("0");
  const [backtestPurchasePriceMethod, setBacktestPurchasePriceMethod] =
    useState<PurchasePriceMethod>("close");
  const [backtestStartYear, setBacktestStartYear] = useState("2018");
  const [backtestEndYear, setBacktestEndYear] = useState("2025");
  const [marketCsvData, setMarketCsvData] = useState<{
    symbol: SymbolKey;
    rows: MarketCsvRow[] | null;
  } | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [copiedSocialCaption, setCopiedSocialCaption] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const hasTrackedInitialDcaCalculation = useRef(false);
  const hasTrackedInitialCompoundCalculation = useRef(false);
  const hasUserChangedDcaCalculation = useRef(false);
  const hasUserChangedCompoundCalculation = useRef(false);
  const quickStartLabels =
    quickStartCopy[locale as keyof typeof quickStartCopy] ?? quickStartCopy.en;
  const visibleQuickStartPresets = showMorePresets
    ? quickStartPresets
    : quickStartPresets.filter((preset) =>
        primaryQuickStartPresetIds.includes(preset.id)
      );

  const scrollToCalculator = () => {
    window.requestAnimationFrame(() => {
      document
        .getElementById("calculator")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const trackQuickStartPreset = (preset: QuickStartPreset) => {
    trackGaEvent("quick_start_preset_clicked", {
      preset_id: preset.id,
      locale,
      mode: preset.mode,
      ...(preset.assetSymbol ? { asset_symbol: preset.assetSymbol } : {}),
      ...(preset.comparisonAssets
        ? { comparison_assets: preset.comparisonAssets }
        : {}),
    });
  };

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
    const queryFixedFee = getAmountFromQuery(params.get("fixedFee"));
    const queryPercentageFee = getAmountFromQuery(params.get("percentageFee"));
    const queryPurchasePriceMethod = getPurchasePriceMethodFromQuery(
      params.get("priceMethod")
    );

    if (queryCurrency) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- overrides the locale-derived default only when the URL query string (client-only) specifies a currency
      setSelectedCurrency(queryCurrency);
    }

    if (queryAmount !== null) {
      setBacktestMonthlyAmount(
        String(convertCurrencyToUsd(Number(queryAmount), effectiveQueryCurrency))
      );
    }

    if (queryFixedFee !== null) {
      setBacktestFixedFee(
        String(convertCurrencyToUsd(Number(queryFixedFee), effectiveQueryCurrency))
      );
    }

    if (queryPercentageFee !== null) {
      setBacktestPercentageFee(queryPercentageFee);
    }

    if (queryPurchasePriceMethod) {
      setBacktestPurchasePriceMethod(queryPurchasePriceMethod);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally mount-only: re-running on locale change would clobber state already restored from the URL query string
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
  const hasSelectedInstrumentImportedMarketData = hasImportedMarketData(
    selectedInstrument?.dataKey
  );

  const trackAssetSelected = (
    instrument: ReturnType<typeof getInstrumentById> | undefined,
    market: string,
    assetType: AssetType
  ) => {
    if (!instrument) {
      return;
    }

    trackGaEvent("asset_selected", {
      symbol: instrument.displaySymbol,
      asset_name: instrument.name,
      market,
      asset_type: assetType,
      currency: instrument.currency,
      locale,
    });
  };

  const handleCalculatorChange = (calculator: ActiveCalculator) => {
    if (calculator === activeCalculator) {
      return;
    }

    setActiveCalculator(calculator);
    trackGaEvent("calculator_mode_changed", {
      mode:
        calculator === "dca" ? "dca_backtest" : "compound_calculator",
      locale,
    });
  };

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
    hasUserChangedDcaCalculation.current = true;
    trackGaEvent("market_selected", {
      market: country,
      locale,
    });
    trackAssetSelected(nextInstruments[0], country, nextAssetType);
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
    hasUserChangedDcaCalculation.current = true;
    trackGaEvent("asset_type_selected", {
      asset_type: assetType,
      locale,
    });
    trackAssetSelected(nextInstruments[0], backtestCountry, assetType);
  };

  const handleBacktestSymbolChange = (symbol: SymbolKey) => {
    const nextInstrument =
      filteredInstruments.find((instrument) => instrument.id === symbol) ??
      getInstrumentById(symbol);

    setBacktestSymbol(symbol);
    hasUserChangedDcaCalculation.current = true;
    trackAssetSelected(nextInstrument, backtestCountry, effectiveAssetType);
  };

  const handleBacktestMonthlyAmountChange = (value: string) => {
    hasUserChangedDcaCalculation.current = true;
    setBacktestMonthlyAmount(value);
  };

  const handleBacktestFixedFeeChange = (value: string) => {
    hasUserChangedDcaCalculation.current = true;
    setBacktestFixedFee(value);
  };

  const handleBacktestPercentageFeeChange = (value: string) => {
    hasUserChangedDcaCalculation.current = true;
    setBacktestPercentageFee(value);
  };

  const handleBacktestPurchasePriceMethodChange = (
    value: PurchasePriceMethod
  ) => {
    hasUserChangedDcaCalculation.current = true;
    setBacktestPurchasePriceMethod(value);
  };

  const handleBacktestStartYearChange = (value: string) => {
    hasUserChangedDcaCalculation.current = true;
    setBacktestStartYear(value);
  };

  const handleBacktestEndYearChange = (value: string) => {
    hasUserChangedDcaCalculation.current = true;
    setBacktestEndYear(value);
  };

  const handleInitialAmountChange = (value: string) => {
    hasUserChangedCompoundCalculation.current = true;
    setInitialAmount(value);
  };

  const handleMonthlyContributionChange = (value: string) => {
    hasUserChangedCompoundCalculation.current = true;
    setMonthlyContribution(value);
  };

  const handleAnnualReturnChange = (value: string) => {
    hasUserChangedCompoundCalculation.current = true;
    setAnnualReturn(value);
  };

  const handleYearsChange = (value: string) => {
    hasUserChangedCompoundCalculation.current = true;
    setYears(value);
  };

  const applyDcaQuickStartPreset = (
    assetId: SymbolKey,
    preset: QuickStartPreset
  ) => {
    const instrument = getInstrumentById(assetId);

    if (!instrument) {
      return;
    }

    setSelectedCurrency("USD");
    setActiveCalculator("dca");
    setBacktestCountry(instrument.country);
    setBacktestAssetType(instrument.assetType);
    setBacktestSymbol(instrument.id);
    setBacktestMonthlyAmount("1000");
    setBacktestFixedFee("0");
    setBacktestPercentageFee("0");
    setBacktestPurchasePriceMethod("close");
    setBacktestStartYear("2018");
    setBacktestEndYear("2025");
    hasUserChangedDcaCalculation.current = true;
    trackQuickStartPreset(preset);
    scrollToCalculator();
  };

  const applyCompoundQuickStartPreset = (preset: QuickStartPreset) => {
    setSelectedCurrency("USD");
    setActiveCalculator("compound");
    setInitialAmount("0");
    setMonthlyContribution("500");
    setAnnualReturn("8");
    setYears("20");
    hasUserChangedCompoundCalculation.current = true;
    trackQuickStartPreset(preset);
    scrollToCalculator();
  };

  const navigateToComparisonQuickStartPreset = (
    assetA: string,
    assetB: string,
    preset: QuickStartPreset
  ) => {
    const url = new URL(`/${locale}`, window.location.origin);

    url.searchParams.set("compare", "assets");
    url.searchParams.set("assetA", assetA);
    url.searchParams.set("assetB", assetB);
    url.searchParams.set("compareAmount", "1000");
    url.searchParams.set("compareStart", "2018");
    url.searchParams.set("compareEnd", "2025");
    url.searchParams.set("currency", "USD");
    url.hash = "calculator";

    trackQuickStartPreset(preset);
    window.location.assign(url.toString());
  };

  const handleQuickStartPreset = (preset: QuickStartPreset) => {
    switch (preset.id) {
      case "voo-dca":
        applyDcaQuickStartPreset("voo", preset);
        break;
      case "cspx-dca":
        applyDcaQuickStartPreset("cspx-l", preset);
        break;
      case "voo-cspx-comparison":
        navigateToComparisonQuickStartPreset("VOO", "CSPX.L", preset);
        break;
      case "voo-qqq-comparison":
        navigateToComparisonQuickStartPreset("VOO", "QQQ", preset);
        break;
      case "dca-vs-lump-sum":
        applyDcaQuickStartPreset("voo", preset);
        break;
      case "compound-growth":
        applyCompoundQuickStartPreset(preset);
        break;
    }
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
        fixedFee: backtestFixedFee,
        percentageFee: backtestPercentageFee,
        purchasePriceMethod: backtestPurchasePriceMethod,
      }),
    [
      activeMarketCsvRows,
      backtestFixedFee,
      backtestMonthlyAmount,
      backtestPercentageFee,
      backtestPurchasePriceMethod,
      effectiveBacktestSymbol,
      normalizedBacktestEndYear,
      normalizedBacktestStartYear,
    ]
  );

  const displayedBacktestDataSource =
    backtest.dataSource === "csv" || hasSelectedInstrumentImportedMarketData
      ? "csv"
      : "mock";
  const selectedMarketDataLastUpdated = getMarketDataLastUpdatedDate(
    selectedInstrument?.dataKey
  );
  const selectedMarketDataMayBeStale =
    displayedBacktestDataSource === "csv" &&
    isMarketDataUpdateOld(selectedInstrument?.dataKey);
  const displayedBacktestDataSourceLabel =
    displayedBacktestDataSource === "csv"
      ? t("dca.dataSource.yahoo")
      : t("dca.dataSource.sample");

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
    if (!hasTrackedInitialDcaCalculation.current) {
      hasTrackedInitialDcaCalculation.current = true;
      return;
    }

    if (!hasUserChangedDcaCalculation.current) {
      return;
    }

    const monthlyAmount = Number(backtestMonthlyAmount);
    const fixedFee = Number(backtestFixedFee) || 0;
    const percentageFee = Number(backtestPercentageFee) || 0;

    if (!Number.isFinite(monthlyAmount) || monthlyAmount < 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      trackGaEvent("dca_calculation_updated", {
        symbol: selectedInstrument?.displaySymbol ?? effectiveBacktestSymbol,
        market: backtestCountry,
        asset_type: effectiveAssetType,
        monthly_amount: monthlyAmount,
        start_year: normalizedBacktestStartYear,
        end_year: normalizedBacktestEndYear,
        currency: selectedCurrency,
        data_source: backtest.dataSource,
        cagr: Number(backtest.annualizedReturn.toFixed(2)),
        max_drawdown: Number(backtest.maxDrawdown.toFixed(2)),
        fixed_fee: fixedFee,
        percentage_fee: percentageFee,
        purchase_price_method: backtestPurchasePriceMethod,
        total_fees_paid: Number(backtest.totalFeesPaid.toFixed(2)),
        locale,
      });
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [
    backtest.dataSource,
    backtest.totalFeesPaid,
    backtestCountry,
    backtestFixedFee,
    backtestMonthlyAmount,
    backtestPercentageFee,
    backtestPurchasePriceMethod,
    effectiveAssetType,
    effectiveBacktestSymbol,
    locale,
    normalizedBacktestEndYear,
    normalizedBacktestStartYear,
    selectedCurrency,
    selectedInstrument,
    backtest.annualizedReturn,
    backtest.maxDrawdown,
  ]);

  useEffect(() => {
    if (!hasTrackedInitialCompoundCalculation.current) {
      hasTrackedInitialCompoundCalculation.current = true;
      return;
    }

    if (!hasUserChangedCompoundCalculation.current) {
      return;
    }

    const monthlyAmount = Number(monthlyContribution);
    const investmentYears = Number(years);
    const annualReturnRate = Number(annualReturn);

    if (
      !Number.isFinite(monthlyAmount) ||
      !Number.isFinite(investmentYears) ||
      !Number.isFinite(annualReturnRate) ||
      monthlyAmount < 0 ||
      investmentYears < 0
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      trackGaEvent("compound_calculation_updated", {
        monthly_amount: monthlyAmount,
        years: investmentYears,
        annual_return: annualReturnRate,
        currency: selectedCurrency,
        locale,
      });
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [
    annualReturn,
    initialAmount,
    locale,
    monthlyContribution,
    selectedCurrency,
    years,
  ]);

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
    url.searchParams.set(
      "fixedFee",
      formatInputAmount(backtestFixedFee || "0", selectedCurrency)
    );
    url.searchParams.set("percentageFee", backtestPercentageFee || "0");
    url.searchParams.set("priceMethod", backtestPurchasePriceMethod);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- shareUrl depends on window.location.origin, unavailable during SSR; computing it during render would mismatch the server-rendered link text
    setShareUrl(url.toString());
  }, [
    backtestCountry,
    backtestFixedFee,
    backtestMonthlyAmount,
    backtestPercentageFee,
    backtestPurchasePriceMethod,
    effectiveAssetType,
    effectiveBacktestSymbol,
    locale,
    normalizedBacktestEndYear,
    normalizedBacktestStartYear,
    selectedCurrency,
    selectedInstrument,
  ]);

  const copyShareUrl = async (shouldTrackEvent = true) => {
    if (!shareUrl) {
      return;
    }

    await copyTextToClipboard(shareUrl);
    setCopiedShareLink(true);
    if (shouldTrackEvent) {
      trackGaEvent("copy_result_link_clicked", {
        symbol: selectedInstrument?.displaySymbol ?? effectiveBacktestSymbol,
        market: backtestCountry,
        asset_type: effectiveAssetType,
        currency: selectedCurrency,
        locale,
      });
    }
    window.setTimeout(() => setCopiedShareLink(false), 2200);
  };

  const handleCopySocialCaption = async () => {
    const instrumentSymbol =
      selectedInstrument?.displaySymbol ?? effectiveBacktestSymbol;
    const caption = [
      t("caption.headline", {
        symbol: instrumentSymbol,
        startYear: normalizedBacktestStartYear,
        endYear: normalizedBacktestEndYear,
      }),
      "",
      `${t("caption.monthlyAmount")}: ${formatMoney(
        Number(backtestMonthlyAmount) || 0,
        selectedCurrency,
        locale
      )}`,
      `${t("caption.totalInvested")}: ${formatMoney(
        backtest.totalInvested,
        selectedCurrency,
        locale
      )}`,
      `${t("caption.totalFeesPaid")}: ${formatMoney(
        backtest.totalFeesPaid,
        selectedCurrency,
        locale
      )}`,
      `${t("caption.netAmountInvested")}: ${formatMoney(
        backtest.netAmountInvested,
        selectedCurrency,
        locale
      )}`,
      `${t("caption.finalValue")}: ${formatMoney(
        backtest.finalValue,
        selectedCurrency,
        locale
      )}`,
      `${t("caption.totalProfit")}: ${formatMoney(
        backtest.totalProfit,
        selectedCurrency,
        locale
      )}`,
      `${t("caption.totalReturn")}: ${formatPercent(
        backtest.totalReturn,
        locale
      )}%`,
      `${t("advancedMetrics.cagr")}: ${formatPercent(
        backtest.annualizedReturn,
        locale
      )}%`,
      `${t("advancedMetrics.maxDrawdown")}: -${formatPercent(
        backtest.maxDrawdown,
        locale
      )}%`,
      `${t("advancedSettings.fixedFee")}: ${formatMoney(
        Number(backtestFixedFee) || 0,
        selectedCurrency,
        locale
      )}`,
      `${t("advancedSettings.percentageFee")}: ${
        Number(backtestPercentageFee) || 0
      }%`,
      `${t("advancedSettings.purchasePriceMethod")}: ${t(
        `advancedSettings.purchaseMethod.${backtestPurchasePriceMethod}`
      )}`,
      `${t("caption.dataSource")}: ${displayedBacktestDataSourceLabel}`,
      "",
      t("caption.disclaimer"),
      `${t("caption.cta")}: https://dcabacktest.com`,
    ].join("\n");

    await copyTextToClipboard(caption);
    setCopiedSocialCaption(true);
    trackGaEvent("copy_social_caption_clicked", {
      symbol: instrumentSymbol,
      market: backtestCountry,
      asset_type: effectiveAssetType,
      currency: selectedCurrency,
      locale,
      data_source: backtest.dataSource,
    });
    window.setTimeout(() => setCopiedSocialCaption(false), 2200);
  };

  const handleShareResult = async () => {
    trackGaEvent("share_result_clicked", {
      symbol: selectedInstrument?.displaySymbol ?? effectiveBacktestSymbol,
      market: backtestCountry,
      asset_type: effectiveAssetType,
      currency: selectedCurrency,
      locale,
    });

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

    await copyShareUrl(false);
  };

  const handleDownloadResultImage = async () => {
    const canvas = document.createElement("canvas");
    const width = 1200;
    const height = 630;
    const scale = window.devicePixelRatio || 1;
    const instrumentSymbol =
      selectedInstrument?.displaySymbol ?? effectiveBacktestSymbol;
    const instrumentName = selectedInstrument?.name ?? instrumentSymbol;
    const dataSourceLabel =
      displayedBacktestDataSource === "csv"
        ? t("dca.csvDataSource")
        : t("dca.mockDataSource");
    const metricCards = [
      {
        label: t("metrics.totalInvested"),
        value: formatMoney(backtest.totalInvested, selectedCurrency, locale),
        color: "#f8fafc",
      },
      {
        label: t("metrics.totalFeesPaid"),
        value: formatMoney(backtest.totalFeesPaid, selectedCurrency, locale),
        color: "#fde68a",
      },
      {
        label: t("metrics.finalValueTitle"),
        value: formatMoney(backtest.finalValue, selectedCurrency, locale),
        color: "#67e8f9",
      },
      {
        label: t("metrics.totalProfit"),
        value: formatMoney(backtest.totalProfit, selectedCurrency, locale),
        color: "#6ee7b7",
      },
      {
        label: t("metrics.totalReturn"),
        value: `${formatPercent(backtest.totalReturn, locale)}%`,
        color: "#22d3ee",
      },
    ];

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.scale(scale, scale);

    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, "#020617");
    background.addColorStop(0.5, "#07111f");
    background.addColorStop(1, "#031315");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    const cyanGlow = ctx.createRadialGradient(980, 70, 0, 980, 70, 380);
    cyanGlow.addColorStop(0, "rgba(34, 211, 238, 0.28)");
    cyanGlow.addColorStop(1, "rgba(34, 211, 238, 0)");
    ctx.fillStyle = cyanGlow;
    ctx.fillRect(0, 0, width, height);

    const greenGlow = ctx.createRadialGradient(220, 520, 0, 220, 520, 380);
    greenGlow.addColorStop(0, "rgba(52, 211, 153, 0.18)");
    greenGlow.addColorStop(1, "rgba(52, 211, 153, 0)");
    ctx.fillStyle = greenGlow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    roundRect(ctx, 44, 36, width - 88, height - 72, 34);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    roundRect(ctx, 44, 36, width - 88, height - 72, 34);
    ctx.fill();

    ctx.fillStyle = "#67e8f9";
    ctx.font = "700 28px Inter, Arial, sans-serif";
    ctx.fillText("DCA Backtest", 84, 92);

    ctx.fillStyle = "rgba(34, 211, 238, 0.12)";
    roundRect(ctx, 880, 62, 236, 42, 21);
    ctx.fill();
    ctx.fillStyle = "#a5f3fc";
    ctx.font = "700 18px Inter, Arial, sans-serif";
    drawText(ctx, dataSourceLabel, 902, 89, 194, 22, 1);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 15px Inter, Arial, sans-serif";
    drawText(ctx, displayedBacktestDataSourceLabel, 878, 122, 240, 20, 1);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "800 42px Inter, Arial, sans-serif";
    drawText(
      ctx,
      t("resultImage.headline", { symbol: instrumentSymbol }),
      84,
      152,
      760,
      50,
      2
    );

    ctx.fillStyle = "#67e8f9";
    ctx.font = "700 18px Inter, Arial, sans-serif";
    drawText(ctx, t("resultImage.title"), 84, 245, 700, 24, 1);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "500 22px Inter, Arial, sans-serif";
    drawText(
      ctx,
      `${instrumentSymbol} - ${instrumentName}`,
      84,
      280,
      690,
      28,
      2
    );

    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 18px Inter, Arial, sans-serif";
    drawText(
      ctx,
      `${t("dca.countryMarket")}: ${backtestCountry}   ${t(
        "common.currency"
      )}: ${selectedCurrency}`,
      84,
      336,
      700,
      24,
      1
    );
    drawText(
      ctx,
      `${t("dca.monthlyInvestment")}: ${formatMoney(
        Number(backtestMonthlyAmount) || 0,
        selectedCurrency,
        locale
      )}   ${t("dca.startYear")}: ${backtestStartYear}   ${t(
        "dca.endYear"
      )}: ${backtestEndYear}`,
      84,
      366,
      760,
      24,
      1
    );

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "700 18px Inter, Arial, sans-serif";
    drawText(
      ctx,
      `${t("advancedMetrics.cagr")}: ${formatPercent(
        backtest.annualizedReturn,
        locale
      )}%   ${t("advancedMetrics.maxDrawdown")}: -${formatPercent(
        backtest.maxDrawdown,
        locale
      )}%   ${t("metrics.totalFeesPaid")}: ${formatMoney(
        backtest.totalFeesPaid,
        selectedCurrency,
        locale
      )}`,
      84,
      396,
      760,
      24,
      1
    );

    const cardWidth = 198;
    const cardHeight = 96;
    const cardGap = 18;
    const startX = 84;
    const startY = 424;

    metricCards.forEach((metric, index) => {
      const x = startX + index * (cardWidth + cardGap);

      ctx.fillStyle = "rgba(2, 6, 23, 0.72)";
      roundRect(ctx, x, startY, cardWidth, cardHeight, 22);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.10)";
      ctx.stroke();

      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 15px Inter, Arial, sans-serif";
      drawText(ctx, metric.label, x + 20, startY + 34, cardWidth - 40, 20, 1);

      const fontSize = fitFontSize(
        ctx,
        metric.value,
        cardWidth - 40,
        28,
        18,
        "800"
      );
      ctx.font = `800 ${fontSize}px Inter, Arial, sans-serif`;
      ctx.fillStyle = metric.color;
      drawText(ctx, metric.value, x + 20, startY + 74, cardWidth - 40, 28, 1);
    });

    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 15px Inter, Arial, sans-serif";
    drawText(ctx, t("resultImage.disclaimer"), 84, 560, 760, 22, 2);

    ctx.fillStyle = "#67e8f9";
    ctx.font = "700 18px Inter, Arial, sans-serif";
    ctx.fillText("dcabacktest.com", 966, 574);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/png", 0.95);
    });

    if (!blob) {
      return;
    }

    const file = new File([blob], "dca-backtest-result.png", {
      type: "image/png",
    });
    const shareData = {
      title: t("share.title"),
      text: t("share.description"),
      files: [file],
    };
    const eventParams = {
      symbol: instrumentSymbol,
      market: backtestCountry,
      asset_type: effectiveAssetType,
      currency: selectedCurrency,
      locale,
      data_source: backtest.dataSource,
      fixed_fee: Number(backtestFixedFee) || 0,
      percentage_fee: Number(backtestPercentageFee) || 0,
      purchase_price_method: backtestPurchasePriceMethod,
      total_fees_paid: Number(backtest.totalFeesPaid.toFixed(2)),
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        trackGaEvent("result_image_share_clicked", eventParams);
        return;
      } catch {
        // Fall back to downloading if native image sharing is dismissed or fails.
      }
    }

    const imageUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "dca-backtest-result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(imageUrl);
    trackGaEvent("result_image_download_clicked", eventParams);
  };

  const structuredData = useMemo(() => {
    const pageUrl = `https://dcabacktest.com/${locale}`;
    const webSiteStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DCA Backtest",
      url: "https://dcabacktest.com/",
      inLanguage: locale,
      description: t("seo.description"),
      isAccessibleForFree: true,
      publisher: {
        "@type": "Organization",
        name: "DCA Backtest",
        url: "https://dcabacktest.com/",
      },
    };
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
    const breadcrumbStructuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "DCA Backtest",
          item: pageUrl,
        },
      ],
    };

    return JSON.stringify([
      webSiteStructuredData,
      faqStructuredData,
      webApplicationStructuredData,
      breadcrumbStructuredData,
    ]).replace(/</g, "\\u003c");
  }, [locale, t]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <Navbar
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
      />

      <section className="relative mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-7 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.14),_transparent_28%)]" />

        <Hero />

        <CalculatorSwitcher
          activeCalculator={activeCalculator}
          onCalculatorChange={handleCalculatorChange}
        />

        <section
          aria-label={quickStartLabels.title}
          className="mb-4 w-full"
        >
          <div className="flex w-full min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:gap-3">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {quickStartLabels.title}
            </p>
            <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
              {visibleQuickStartPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleQuickStartPreset(preset)}
                  className="min-w-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs font-semibold leading-snug text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/50 sm:px-4 sm:text-sm"
                >
                  {quickStartLabels.presets[preset.id]}
                </button>
              ))}
              <button
                type="button"
                data-testid="quick-start-toggle-button"
                onClick={() => setShowMorePresets((current) => !current)}
                aria-expanded={showMorePresets}
                className="inline-flex min-w-0 items-center gap-1 rounded-full border border-white/15 px-3 py-2 text-left text-xs font-semibold leading-snug text-cyan-200/85 transition hover:border-cyan-300/50 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 sm:px-4 sm:text-sm"
              >
                {showMorePresets
                  ? quickStartLabels.showLess
                  : quickStartLabels.showMore}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 8"
                  className={`h-2.5 w-2.5 shrink-0 fill-none stroke-current stroke-2 transition-transform ${
                    showMorePresets ? "rotate-180" : ""
                  }`}
                >
                  <path d="M1 1.5 6 6.5 11 1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <div
          id="calculator"
          role="tabpanel"
          aria-labelledby={CALCULATOR_TAB_IDS[activeCalculator]}
          tabIndex={0}
          className="w-full min-w-0 scroll-mt-24 focus-visible:outline-none"
        >
          {activeCalculator === "dca" ? (
            <>
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
                backtestFixedFee={backtestFixedFee}
                backtestPercentageFee={backtestPercentageFee}
                backtestPurchasePriceMethod={backtestPurchasePriceMethod}
                backtestStartYear={normalizedBacktestStartYear}
                backtestEndYear={normalizedBacktestEndYear}
                availableYears={availableBacktestYears}
                showBacktestTable={showBacktestTable}
                setBacktestCountry={handleBacktestCountryChange}
                setBacktestAssetType={handleBacktestAssetTypeChange}
                setBacktestSymbol={handleBacktestSymbolChange}
                setBacktestMonthlyAmount={handleBacktestMonthlyAmountChange}
                setBacktestFixedFee={handleBacktestFixedFeeChange}
                setBacktestPercentageFee={handleBacktestPercentageFeeChange}
                setBacktestPurchasePriceMethod={
                  handleBacktestPurchasePriceMethodChange
                }
                setBacktestStartYear={handleBacktestStartYearChange}
                setBacktestEndYear={handleBacktestEndYearChange}
                setShowBacktestTable={setShowBacktestTable}
                shareUrl={shareUrl}
                copiedShareLink={copiedShareLink}
                copiedSocialCaption={copiedSocialCaption}
                onShareResult={handleShareResult}
                onCopyShareLink={copyShareUrl}
                onCopySocialCaption={handleCopySocialCaption}
                onDownloadResultImage={handleDownloadResultImage}
                displayedDataSource={displayedBacktestDataSource}
                dataLastUpdated={selectedMarketDataLastUpdated}
                dataMayBeStale={selectedMarketDataMayBeStale}
              />
              <DcaAssetComparison
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            </>
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
              setInitialAmount={handleInitialAmountChange}
              setMonthlyContribution={handleMonthlyContributionChange}
              setAnnualReturn={handleAnnualReturnChange}
              setYears={handleYearsChange}
              setShowCompoundTable={setShowCompoundTable}
            />
          )}
        </div>

        <RelatedLinks />
        <SeoContent />
        <Faq />
      </section>
      <MobileBackToCalculator targetId="calculator" />
    </main>
  );
}
