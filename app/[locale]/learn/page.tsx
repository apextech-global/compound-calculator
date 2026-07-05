import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, productionBaseUrl } from "@/lib/seoMetadata";

type LearnLocale = "en" | "zh-CN" | "zh-TW";

type LearnLink = {
  title: string;
  description: string;
  href: string;
};

type LearnContent = {
  title: string;
  description: string;
  h1: string;
  breadcrumb: string;
  eyebrow: string;
  intro: string;
  disclaimerTitle: string;
  disclaimer: string;
  quickLinksTitle: string;
  quickLinks: Array<{ title: string; href: string }>;
  sections: Array<{
    title: string;
    description: string;
    links: LearnLink[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

const learnLocales: LearnLocale[] = ["en", "zh-CN", "zh-TW"];

const content: Record<LearnLocale, LearnContent> = {
  en: {
    title: "ETF DCA Learning Hub | DCA Backtest",
    description:
      "Learn ETF dollar-cost averaging, DCA backtests, VOO, CSPX, QQQ, DCA vs lump sum, compound interest, and ETF comparison basics.",
    h1: "ETF DCA Learning Hub",
    breadcrumb: "Learn",
    eyebrow: "ETF DCA learning center",
    intro:
      "Use this learning hub to understand ETF dollar-cost averaging, historical DCA backtesting, compound interest, VOO, CSPX, QQQ, ETF comparisons, and the limits of historical simulations. The content is educational only and does not recommend what to buy.",
    disclaimerTitle: "Educational disclaimer",
    disclaimer:
      "This content is for education only and is not financial advice, investment advice, tax advice, legal advice, or a recommendation. Past performance does not guarantee future results.",
    quickLinksTitle: "Popular tools and guides",
    quickLinks: [
      { title: "DCA Calculator", href: "/en/dca-calculator" },
      {
        title: "Compound Interest Calculator",
        href: "/en/compound-interest-calculator",
      },
      {
        title: "ETF Comparison Calculator",
        href: "/en/etf-comparison-calculator",
      },
      { title: "Supported Assets", href: "/en/supported-assets" },
      { title: "Disclaimer", href: "/en/disclaimer" },
    ],
    sections: [
      {
        title: "ETF DCA basics",
        description:
          "Start with the core ideas behind monthly investing, DCA backtests, and why historical results are not forecasts.",
        links: [
          {
            title: "DCA Calculator",
            description:
              "Estimate how fixed monthly investments would have behaved across historical market periods.",
            href: "/en/dca-calculator",
          },
          {
            title: "ETF Calculator",
            description:
              "Explore ETF monthly investing scenarios and compare supported ETF data coverage.",
            href: "/en/etf-calculator",
          },
          {
            title: "Supported Assets",
            description:
              "Check which ETFs and stocks currently have historical data and which use sample data.",
            href: "/en/supported-assets",
          },
        ],
      },
      {
        title: "VOO / CSPX / QQQ backtests",
        description:
          "Compare common ETF examples without treating any single fund as universally better.",
        links: [
          {
            title: "VOO DCA Calculator",
            description:
              "Study historical monthly investing scenarios for a U.S.-listed S&P 500 ETF.",
            href: "/en/voo-dca-calculator",
          },
          {
            title: "CSPX DCA Calculator",
            description:
              "Learn how a UCITS S&P 500 ETF can be modeled with the DCA backtest tool.",
            href: "/en/cspx-dca-calculator",
          },
          {
            title: "QQQ DCA Calculator",
            description:
              "Explore Nasdaq-100 related DCA scenarios and period-dependent results.",
            href: "/en/qqq-dca-calculator",
          },
        ],
      },
      {
        title: "DCA vs Lump Sum",
        description:
          "Understand the difference between investing gradually and investing the same total amount upfront.",
        links: [
          {
            title: "DCA vs Lump Sum",
            description:
              "Compare the same total contribution under monthly DCA and upfront lump sum assumptions.",
            href: "/en/dca-vs-lump-sum",
          },
          {
            title: "VOO vs CSPX",
            description:
              "Learn how fund domicile, listing market, currency, tax, and dividend handling can matter.",
            href: "/en/voo-vs-cspx",
          },
        ],
      },
      {
        title: "Compound interest",
        description:
          "Use compound-growth examples for long-term planning assumptions, not guaranteed returns.",
        links: [
          {
            title: "Compound Interest Calculator",
            description:
              "Model monthly contributions, assumed annual return, and investment time.",
            href: "/en/compound-interest-calculator",
          },
          {
            title: "DCA Backtest Calculator",
            description:
              "Use historical prices when you want scenario testing rather than a fixed return assumption.",
            href: "/en/dca-calculator",
          },
        ],
      },
      {
        title: "ETF comparison",
        description:
          "Compare two assets using the same amount and period while keeping risk and data limits visible.",
        links: [
          {
            title: "ETF Comparison Calculator",
            description:
              "Compare two supported assets with the same monthly contribution and time period.",
            href: "/en/etf-comparison-calculator",
          },
          {
            title: "VOO vs QQQ",
            description:
              "Compare broad S&P 500 exposure with Nasdaq-100 exposure in a historical context.",
            href: "/en/voo-vs-qqq",
          },
          {
            title: "Disclaimer",
            description:
              "Review important data, investment, tax, and legal limitations before relying on results.",
            href: "/en/disclaimer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What is ETF DCA?",
        answer:
          "ETF DCA means investing a fixed amount into an ETF on a regular schedule, such as monthly. Results still depend on price, fees, currency, taxes, and the selected period.",
      },
      {
        question: "Can a DCA backtest predict future returns?",
        answer:
          "No. A DCA backtest uses historical data to study a past scenario. Future returns can be very different.",
      },
      {
        question: "Can I compare VOO, CSPX, and QQQ?",
        answer:
          "Yes. Use the asset pages and ETF comparison calculator to study them with the same contribution assumptions.",
      },
      {
        question: "Is this investment advice?",
        answer:
          "No. DCA Backtest is an educational website and does not recommend any ETF, stock, broker, or strategy.",
      },
    ],
  },
  "zh-CN": {
    title: "ETF 定投学习中心｜DCA Backtest",
    description:
      "学习 ETF 定投、DCA 回测、VOO、CSPX、QQQ、定投 vs 一次性投入、复利计算和 ETF 对比基础知识。",
    h1: "ETF 定投学习中心",
    breadcrumb: "学习中心",
    eyebrow: "ETF DCA 学习入口",
    intro:
      "这里是 DCA Backtest 的中文 ETF 定投学习入口，帮助你系统了解 ETF 定投、DCA 回测、复利、VOO、CSPX、QQQ、ETF 对比，以及马来西亚买 ETF 时常见的券商、换汇、费用、税务和风险问题。",
    disclaimerTitle: "教育用途免责声明",
    disclaimer:
      "仅供教育用途，不构成投资建议。过去表现不代表未来表现。ETF、股票、汇率、费用和税务结果都可能变化，用户应自行判断并在需要时咨询持牌专业人士。",
    quickLinksTitle: "常用工具与重要说明",
    quickLinks: [
      { title: "DCA 定投计算器", href: "/zh-CN/dca-calculator" },
      { title: "复利计算器", href: "/zh-CN/compound-interest-calculator" },
      { title: "ETF 对比工具", href: "/zh-CN/etf-comparison-calculator" },
      { title: "支持的资产", href: "/zh-CN/supported-assets" },
      { title: "免责声明", href: "/zh-CN/disclaimer" },
    ],
    sections: [
      {
        title: "ETF 定投入门",
        description:
          "先理解 ETF 定投、DCA 回测、月度投入和历史模拟的基本概念。",
        links: [
          {
            title: "什么是 ETF 定投？",
            description:
              "了解每月固定投入 ETF 的基本思路，以及费用、时间和市场价格如何影响结果。",
            href: "/zh-CN/etf-dca-backtest-guide",
          },
          {
            title: "DCA 定投计算器",
            description:
              "用历史价格模拟每月定投，并观察总投入、最终价值和回撤。",
            href: "/zh-CN/dca-calculator",
          },
          {
            title: "支持的资产与市场数据",
            description:
              "查看哪些 ETF 和股票有历史数据，哪些目前只提供示例数据。",
            href: "/zh-CN/supported-assets",
          },
        ],
      },
      {
        title: "VOO / CSPX / QQQ 回测",
        description:
          "学习常见 ETF 的回测入口，理解不同市场、指数和基金结构的差异。",
        links: [
          {
            title: "VOO 定投计算器",
            description:
              "研究美国上市 S&P 500 ETF 的每月定投历史情景。",
            href: "/zh-CN/voo-dca-calculator",
          },
          {
            title: "CSPX 定投计算器",
            description:
              "了解 UCITS / 爱尔兰注册 / 伦敦交易所上市 ETF 的定投回测方式。",
            href: "/zh-CN/cspx-dca-calculator",
          },
          {
            title: "VOO vs QQQ DCA",
            description:
              "比较 S&P 500 广泛市场敞口和 Nasdaq-100 科技权重的历史差异。",
            href: "/zh-CN/voo-vs-qqq-dca",
          },
        ],
      },
      {
        title: "马来西亚买 ETF",
        description:
          "面向马来西亚中文用户，整理 CSPX、VOO、券商、换汇、税务和平台支持的教育指南。",
        links: [
          {
            title: "CSPX vs VOO 马来西亚",
            description:
              "理解 UCITS ETF 和美国上市 ETF 在注册地、税务、股息和券商支持上的差异。",
            href: "/zh-CN/cspx-vs-voo-malaysia",
          },
          {
            title: "马来西亚怎么买 CSPX",
            description:
              "了解 CSPX、伦敦交易所、UCITS ETF 和马来西亚用户需要核实的事项。",
            href: "/zh-CN/how-to-buy-cspx-from-malaysia",
          },
          {
            title: "马来西亚怎么买 VOO",
            description:
              "学习购买美国上市 ETF 前需要了解的股息税、汇率、费用和券商支持。",
            href: "/zh-CN/how-to-invest-in-voo-from-malaysia",
          },
        ],
      },
      {
        title: "DCA vs Lump Sum",
        description:
          "用相同总投入金额理解分批投入和期初一次性投入的历史差异。",
        links: [
          {
            title: "定投 vs 一次性投入指南",
            description:
              "学习两种投入方式的情景差异、心理风险和市场时点影响。",
            href: "/zh-CN/dca-vs-lump-sum-guide",
          },
          {
            title: "定投 vs 一次性投入",
            description:
              "查看现有比较页面，并回到计算器测试不同年份和金额。",
            href: "/zh-CN/dca-vs-lump-sum",
          },
        ],
      },
      {
        title: "复利计算",
        description:
          "理解每月投入、假设年化回报、时间和长期复利增长之间的关系。",
        links: [
          {
            title: "复利计算指南",
            description:
              "学习复利计算器适合做什么、不适合承诺什么，以及如何看待假设回报。",
            href: "/zh-CN/compound-interest-guide",
          },
          {
            title: "复利计算器",
            description:
              "用假设年化回报率估算长期复利增长，不代表固定收益。",
            href: "/zh-CN/compound-interest-calculator",
          },
        ],
      },
      {
        title: "ETF 比较",
        description:
          "用相同每月投入和时间区间比较两个资产，同时保留风险和数据限制说明。",
        links: [
          {
            title: "ETF 对比工具",
            description:
              "比较两个 ETF 或股票的最终价值、总回报、年化回报估算和最大回撤。",
            href: "/zh-CN/etf-comparison-calculator",
          },
          {
            title: "VOO vs CSPX",
            description:
              "比较美国上市 ETF 与 UCITS ETF 的市场、货币、税务和股息差异。",
            href: "/zh-CN/voo-vs-cspx",
          },
          {
            title: "推荐工具",
            description:
              "了解常见券商、换汇工具和费用注意事项，但不构成推荐。",
            href: "/zh-CN/recommended-tools",
          },
        ],
      },
      {
        title: "常见问题",
        description:
          "快速理解回测、数据来源、费用、风险和非投资建议等重要限制。",
        links: [
          {
            title: "ETF 定投回测指南",
            description:
              "系统学习如何使用历史数据、如何设置区间，以及为什么结果不代表未来。",
            href: "/zh-CN/etf-dca-backtest-guide",
          },
          {
            title: "免责声明",
            description:
              "阅读数据来源、非投资建议、税务和法律限制等重要说明。",
            href: "/zh-CN/disclaimer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "ETF 定投回测可以代表未来收益吗？",
        answer:
          "不能。回测只是用历史数据模拟过去某个情景，未来市场、费用、汇率和税务都可能不同。",
      },
      {
        question: "VOO、CSPX、QQQ 可以一起比较吗？",
        answer:
          "可以使用 ETF 对比工具或相关资产页面，用相同每月投入和时间区间进行历史情景比较。",
      },
      {
        question: "马来西亚买 ETF 要注意什么？",
        answer:
          "需要核实券商支持、交易市场、货币兑换、费用、股息处理、税务和官方条款。",
      },
      {
        question: "这些内容是不是投资建议？",
        answer:
          "不是。本网站仅供教育用途，不推荐任何 ETF、股票、券商或投资策略。",
      },
    ],
  },
  "zh-TW": {
    title: "ETF 定期定額學習中心｜DCA Backtest",
    description:
      "學習 ETF 定期定額、DCA 回測、VOO、CSPX、QQQ、定期定額 vs 單筆投入、複利計算和 ETF 比較。",
    h1: "ETF 定期定額學習中心",
    breadcrumb: "學習中心",
    eyebrow: "ETF DCA 學習入口",
    intro:
      "這裡整理 DCA Backtest 的繁體中文 ETF 學習內容，幫助你從定期定額、DCA 回測、複利、VOO、CSPX、QQQ 和 ETF 對比開始，逐步理解歷史模擬結果的用途與限制。",
    disclaimerTitle: "教育用途免責聲明",
    disclaimer:
      "僅供教育用途，不構成投資建議。過去表現不代表未來表現。ETF、股票、匯率、費用與稅務結果都可能改變，使用者應自行判斷並視需要諮詢持牌專業人士。",
    quickLinksTitle: "常用工具與重要說明",
    quickLinks: [
      { title: "DCA 定期定額計算機", href: "/zh-TW/dca-calculator" },
      { title: "複利計算機", href: "/zh-TW/compound-interest-calculator" },
      { title: "ETF 對比工具", href: "/zh-TW/etf-comparison-calculator" },
      { title: "支援的資產", href: "/zh-TW/supported-assets" },
      { title: "免責聲明", href: "/zh-TW/disclaimer" },
    ],
    sections: [
      {
        title: "ETF 定期定額入門",
        description:
          "先掌握 ETF 定期定額、DCA 回測與月度投入的基本觀念。",
        links: [
          {
            title: "什麼是 ETF 定期定額？",
            description:
              "理解每月固定投入 ETF 的概念，以及價格波動、投入時間和費用如何影響結果。",
            href: "/zh-TW/etf-dca-backtest-guide",
          },
          {
            title: "DCA 定期定額計算機",
            description:
              "用歷史價格模擬每月投入，觀察總投入、最終價值和回撤。",
            href: "/zh-TW/dca-calculator",
          },
          {
            title: "支援的資產與市場資料",
            description:
              "查看哪些 ETF 和股票有歷史資料，哪些目前只提供範例資料。",
            href: "/zh-TW/supported-assets",
          },
        ],
      },
      {
        title: "VOO / CSPX / QQQ 回測",
        description:
          "從常見 ETF 頁面進入個別資產的定期定額回測。",
        links: [
          {
            title: "VOO 定期定額計算機",
            description:
              "研究美國上市 S&P 500 ETF 在不同期間每月投入的歷史情境。",
            href: "/zh-TW/voo-dca-calculator",
          },
          {
            title: "CSPX 定期定額計算機",
            description:
              "了解 UCITS、愛爾蘭註冊和倫敦交易所上市 ETF 的回測方式與限制。",
            href: "/zh-TW/cspx-dca-calculator",
          },
          {
            title: "VOO vs QQQ DCA",
            description:
              "觀察 S&P 500 廣泛市場和 Nasdaq-100 科技權重較高的歷史差異。",
            href: "/zh-TW/voo-vs-qqq-dca",
          },
        ],
      },
      {
        title: "馬來西亞買 ETF",
        description:
          "用繁體中文理解 CSPX、VOO、券商支援、換匯、費用與稅務注意事項。",
        links: [
          {
            title: "CSPX vs VOO 馬來西亞",
            description:
              "比較 UCITS ETF 和美國上市 ETF 在市場、稅務、股息和券商支援上的差異。",
            href: "/zh-TW/cspx-vs-voo-malaysia",
          },
          {
            title: "VOO vs CSPX",
            description:
              "了解美國上市 ETF 與 UCITS ETF 的交易市場、貨幣和股息處理差異。",
            href: "/zh-TW/voo-vs-cspx",
          },
        ],
      },
      {
        title: "DCA vs Lump Sum",
        description:
          "以相同總投入金額，理解分批投入和期初一次投入的歷史差異。",
        links: [
          {
            title: "定期定額 vs 單筆投入指南",
            description:
              "學習兩種投入方式的情境差異、心理風險和市場時點影響。",
            href: "/zh-TW/dca-vs-lump-sum-guide",
          },
          {
            title: "定期定額 vs 單筆投入",
            description:
              "查看既有比較頁面，並回到計算機測試不同年份和投入金額。",
            href: "/zh-TW/dca-vs-lump-sum",
          },
        ],
      },
      {
        title: "複利計算",
        description:
          "理解每月投入、假設年化報酬、時間和長期複利成長之間的關係。",
        links: [
          {
            title: "複利計算指南",
            description:
              "學習複利計算機適合做什麼、不適合承諾什麼，以及如何看待假設報酬。",
            href: "/zh-TW/compound-interest-guide",
          },
          {
            title: "複利計算機",
            description:
              "用假設年化報酬率估算長期複利成長，不代表固定收益。",
            href: "/zh-TW/compound-interest-calculator",
          },
        ],
      },
      {
        title: "ETF 比較",
        description:
          "用相同每月投入和時間區間比較兩個資產，同時保留風險和資料限制說明。",
        links: [
          {
            title: "ETF 對比工具",
            description:
              "比較兩個 ETF 或股票的最終價值、總報酬、年化報酬估算和最大回撤。",
            href: "/zh-TW/etf-comparison-calculator",
          },
          {
            title: "VOO vs CSPX",
            description:
              "比較美國上市 ETF 與 UCITS ETF 的市場、貨幣、稅務和股息差異。",
            href: "/zh-TW/voo-vs-cspx",
          },
          {
            title: "推薦工具",
            description:
              "了解常見券商、換匯工具和費用注意事項，但不構成推薦。",
            href: "/zh-TW/recommended-tools",
          },
        ],
      },
      {
        title: "常見問題",
        description:
          "快速理解回測、資料來源、費用、風險和非投資建議等重要限制。",
        links: [
          {
            title: "ETF 定期定額回測指南",
            description:
              "系統學習如何使用歷史資料、如何設定區間，以及為什麼結果不代表未來。",
            href: "/zh-TW/etf-dca-backtest-guide",
          },
          {
            title: "免責聲明",
            description:
              "閱讀資料來源、非投資建議、稅務和法律限制等重要說明。",
            href: "/zh-TW/disclaimer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "ETF 定期定額回測可以代表未來報酬嗎？",
        answer:
          "不能。回測只是使用歷史資料模擬過去情境，未來市場、費用、匯率和稅務都可能不同。",
      },
      {
        question: "VOO、CSPX、QQQ 可以一起比較嗎？",
        answer:
          "可以使用 ETF 對比工具或相關資產頁面，用相同每月投入和時間區間進行歷史情境比較。",
      },
      {
        question: "馬來西亞買 ETF 要注意什麼？",
        answer:
          "需要核實券商支援、交易市場、貨幣兌換、費用、股息處理、稅務和官方條款。",
      },
      {
        question: "這些內容是不是投資建議？",
        answer:
          "不是。本網站僅供教育用途，不推薦任何 ETF、股票、券商或投資策略。",
      },
    ],
  },
};

function getContent(locale: string) {
  if (!learnLocales.includes(locale as LearnLocale)) {
    notFound();
  }

  return content[locale as LearnLocale];
}

function learnAlternates(path = "/learn") {
  return Object.fromEntries(
    learnLocales.map((locale) => [locale, absoluteUrl(`/${locale}${path}`)])
  );
}

export function generateStaticParams() {
  return learnLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = getContent(locale);
  const pagePath = `/${locale}/learn`;

  return {
    metadataBase: new URL(productionBaseUrl),
    title: page.title,
    description: page.description,
    alternates: {
      canonical: absoluteUrl(pagePath),
      languages: {
        ...learnAlternates(),
        "x-default": absoluteUrl("/en/learn"),
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(pagePath),
      siteName: "DCA Backtest",
      type: "article",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getContent(locale);
  const pageUrl = absoluteUrl(`/${locale}/learn`);
  const itemListLinks = [
    ...page.quickLinks.map((item) => ({
      name: item.title,
      url: absoluteUrl(item.href),
    })),
    ...page.sections.flatMap((section) =>
      section.links.slice(0, 1).map((link) => ({
        name: link.title,
        url: absoluteUrl(link.href),
      }))
    ),
  ].slice(0, 12);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.description,
    url: pageUrl,
    inLanguage: locale,
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "DCA Backtest",
      url: absoluteUrl("/"),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "DCA Backtest",
        item: absoluteUrl(`/${locale}`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: pageUrl,
      },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    itemListElement: itemListLinks.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd,
            breadcrumbJsonLd,
            itemListJsonLd,
            faqJsonLd,
          ]).replace(/</g, "\\u003c"),
        }}
      />
      <section className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <nav className="mb-6 min-w-0 break-words text-sm text-slate-400">
          <Link href={`/${locale}`} className="hover:text-cyan-300">
            DCA Backtest
          </Link>
          <span className="mx-2">/</span>
          <span>{page.breadcrumb}</span>
        </nav>

        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {page.eyebrow}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {page.intro}
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-5 sm:mt-10">
          {page.sections.map((section) => (
            <section
              key={section.title}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-xl shadow-black/20 sm:rounded-3xl sm:p-6"
            >
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {section.description}
                </p>
              </div>
              <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group min-w-0 rounded-2xl border border-cyan-300/15 bg-slate-900/80 p-4 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
                  >
                    <h3 className="break-words text-base font-semibold text-cyan-100 group-hover:text-white">
                      {link.title}
                    </h3>
                    <p className="mt-2 break-words text-sm leading-6 text-slate-400 group-hover:text-slate-200">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-6 w-full rounded-2xl border border-white/10 bg-white/[0.055] p-4 sm:mt-8 sm:rounded-3xl sm:p-6">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {locale === "en"
              ? "Common questions"
              : locale === "zh-CN"
                ? "常见问题"
                : "常見問題"}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            {page.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
              >
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4 sm:mt-8 sm:rounded-3xl sm:p-6">
          <h2 className="text-lg font-semibold text-amber-100">
            {page.disclaimerTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-amber-50/80">
            {page.disclaimer}
          </p>
        </section>

        <nav
          aria-label={page.quickLinksTitle}
          className="mt-5 flex w-full flex-wrap gap-2.5 text-sm sm:mt-6 sm:gap-3"
        >
          {page.quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:border-cyan-300/50 hover:text-white"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
