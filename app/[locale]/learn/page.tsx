import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, productionBaseUrl } from "@/lib/seoMetadata";

type LearnLocale = "zh-CN" | "zh-TW";

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
  quickLinks: Array<{
    title: string;
    href: string;
  }>;
  sections: Array<{
    title: string;
    description: string;
    links: Array<{
      title: string;
      description: string;
      href: string;
    }>;
  }>;
};

const learnLocales: LearnLocale[] = ["zh-CN", "zh-TW"];

const content: Record<LearnLocale, LearnContent> = {
  "zh-CN": {
    title: "ETF 定投学习中心｜DCA Backtest",
    description:
      "学习 ETF 定投、复利、DCA 回测、VOO、CSPX、定投 vs 一次性投入，以及马来西亚投资 ETF 的基础知识。",
    h1: "ETF 定投学习中心",
    breadcrumb: "学习中心",
    eyebrow: "ETF DCA 学习入口",
    intro:
      "这里是 DCA Backtest 的中文 ETF 定投学习入口，帮助你系统了解 ETF 定投、DCA 回测、复利、VOO、CSPX、ETF 对比，以及马来西亚投资 ETF 时常见的券商、换汇、税务和风险问题。",
    disclaimerTitle: "教育用途免责声明",
    disclaimer:
      "仅供教育用途，不构成投资建议。过去表现不代表未来表现。ETF、股票、汇率和税务结果都可能变化，用户应自行判断并在需要时咨询持牌专业人士。",
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
        title: "新手入门",
        description: "先理解 ETF 定投、DCA 回测和复利的基本概念。",
        links: [
          {
            title: "什么是 ETF 定投？",
            description:
              "了解每月固定投入 ETF 的基本思路，以及为什么定投结果仍会受到市场价格、费用和时间影响。",
            href: "/zh-CN/dca-calculator",
          },
          {
            title: "什么是 DCA 回测？",
            description:
              "学习如何用历史价格模拟每月投入，并理解回测不能代表未来收益。",
            href: "/zh-CN/dca-calculator",
          },
          {
            title: "什么是复利？",
            description:
              "用复利计算器理解每月投入、假设年化回报和投资时间之间的关系。",
            href: "/zh-CN/compound-interest-calculator",
          },
        ],
      },
      {
        title: "ETF 定投工具",
        description: "从计算器开始，比较不同资产、时间和投入金额的历史情景。",
        links: [
          {
            title: "ETF 定投计算器",
            description:
              "回测 VOO、CSPX、QQQ、VWRA、IWDA 等资产的每月定投历史表现。",
            href: "/zh-CN/etf-calculator",
          },
          {
            title: "复利计算器",
            description:
              "用假设回报率估算长期复利增长，适合做教育性的投资规划。",
            href: "/zh-CN/compound-interest-calculator",
          },
          {
            title: "ETF 对比工具",
            description:
              "用相同每月投入金额和时间区间，对比两个 ETF 或股票的历史结果。",
            href: "/zh-CN/etf-comparison-calculator",
          },
          {
            title: "支持的资产与市场数据",
            description:
              "查看当前支持的 ETF、股票、市场、货币和历史数据覆盖情况。",
            href: "/zh-CN/supported-assets",
          },
        ],
      },
      {
        title: "热门 ETF",
        description: "从常见 ETF 页面进入具体资产的定投回测。",
        links: [
          {
            title: "VOO 定投计算器",
            description:
              "研究美国上市 S&P 500 ETF 的每月定投历史情景和风险限制。",
            href: "/zh-CN/voo-dca-calculator",
          },
          {
            title: "CSPX 定投计算器",
            description:
              "了解 UCITS / 爱尔兰注册 / 伦敦交易所上市 ETF 的定投回测方式。",
            href: "/zh-CN/cspx-dca-calculator",
          },
          {
            title: "QQQ 定投计算器",
            description:
              "查看 Nasdaq-100 相关 ETF 在不同年份开始定投时的历史差异。",
            href: "/zh-CN/qqq-dca-calculator",
          },
        ],
      },
      {
        title: "热门对比",
        description:
          "比较不同 ETF、市场敞口和投入方式，但不把结果当成投资推荐。",
        links: [
          {
            title: "VOO vs CSPX",
            description:
              "比较美国上市 ETF 与 UCITS ETF 在市场、税务、股息、货币和券商支持方面的差异。",
            href: "/zh-CN/voo-vs-cspx",
          },
          {
            title: "VOO vs QQQ",
            description:
              "了解 S&P 500 广泛市场敞口和 Nasdaq-100 科技权重之间的不同。",
            href: "/zh-CN/voo-vs-qqq",
          },
          {
            title: "定投 vs 一次性投入",
            description:
              "用相同总投入金额理解分批投入和开始时一次性投入的历史差异。",
            href: "/zh-CN/dca-vs-lump-sum",
          },
        ],
      },
      {
        title: "马来西亚投资 ETF",
        description:
          "面向马来西亚中文用户，整理 CSPX、VOO、券商、换汇、税务和平台支持的教育指南。",
        links: [
          {
            title: "马来西亚怎么买 CSPX",
            description:
              "了解 CSPX、UCITS ETF、爱尔兰注册、伦敦交易所和马来西亚投资者需要注意的事项。",
            href: "/zh-CN/how-to-buy-cspx-from-malaysia",
          },
          {
            title: "马来西亚怎么买 VOO",
            description:
              "学习购买美国上市 ETF 前需要了解的美股 ETF、股息税、遗产税风险和汇率因素。",
            href: "/zh-CN/how-to-invest-in-voo-from-malaysia",
          },
          {
            title: "IBKR vs Moomoo 马来西亚",
            description:
              "中立比较券商覆盖市场、费用、换汇、平台体验和 ETF 支持，不构成开户建议。",
            href: "/zh-CN/ibkr-vs-moomoo-malaysia",
          },
          {
            title: "马来西亚 ETF 券商",
            description:
              "用检查清单比较 ETF 券商时可关注的市场支持、费用、换汇和风险。",
            href: "/zh-CN/best-etf-broker-malaysia",
          },
        ],
      },
    ],
  },
  "zh-TW": {
    title: "ETF 定期定額學習中心｜DCA Backtest",
    description:
      "學習 ETF 定期定額、複利、DCA 回測、VOO、CSPX、定期定額 vs 單筆投入，以及 ETF 投資的基礎知識。",
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
        title: "新手入門",
        description: "先掌握 ETF 定期定額、DCA 回測與複利的基本觀念。",
        links: [
          {
            title: "什麼是 ETF 定期定額？",
            description:
              "理解每月固定投入 ETF 的概念，以及價格波動、投入時間和費用如何影響結果。",
            href: "/zh-TW/dca-calculator",
          },
          {
            title: "什麼是 DCA 回測？",
            description:
              "用歷史價格模擬每月投入的情境，同時了解回測只是歷史資料分析，不代表未來報酬。",
            href: "/zh-TW/dca-calculator",
          },
          {
            title: "什麼是複利？",
            description:
              "透過複利計算機觀察每月投入、假設年化報酬與時間之間的關係。",
            href: "/zh-TW/compound-interest-calculator",
          },
        ],
      },
      {
        title: "ETF 定期定額工具",
        description:
          "用相同的輸入方式，比較不同資產、時間區間和投入金額的歷史情境。",
        links: [
          {
            title: "ETF 定期定額計算機",
            description:
              "回測 VOO、CSPX、QQQ、VWRA、IWDA 等資產的每月投入歷史結果。",
            href: "/zh-TW/etf-calculator",
          },
          {
            title: "複利計算機",
            description:
              "用假設報酬率估算長期複利成長，適合做教育性的投資規劃練習。",
            href: "/zh-TW/compound-interest-calculator",
          },
          {
            title: "ETF 對比工具",
            description:
              "用相同每月投入金額和期間，對比兩個 ETF 或股票的歷史結果。",
            href: "/zh-TW/etf-comparison-calculator",
          },
          {
            title: "支援的資產與市場資料",
            description:
              "查看目前支援的 ETF、股票、市場、貨幣，以及歷史資料覆蓋狀態。",
            href: "/zh-TW/supported-assets",
          },
        ],
      },
      {
        title: "熱門 ETF",
        description: "從常見 ETF 頁面進入個別資產的定期定額回測。",
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
            title: "QQQ 定期定額計算機",
            description:
              "觀察 Nasdaq-100 相關 ETF 在不同起始年份下的歷史差異。",
            href: "/zh-TW/qqq-dca-calculator",
          },
        ],
      },
      {
        title: "熱門對比",
        description:
          "比較 ETF、市場敞口和投入方式，但不要把歷史結果視為投資建議。",
        links: [
          {
            title: "VOO vs CSPX",
            description:
              "了解美國上市 ETF 與 UCITS ETF 在市場、股息、稅務、貨幣和券商支援上的差異。",
            href: "/zh-TW/voo-vs-cspx",
          },
          {
            title: "VOO vs QQQ",
            description:
              "比較 S&P 500 廣泛市場敞口與 Nasdaq-100 科技權重較高的差異。",
            href: "/zh-TW/voo-vs-qqq",
          },
          {
            title: "定期定額 vs 單筆投入",
            description:
              "以相同總投入金額，理解分批投入和期初一次投入的歷史差異。",
            href: "/zh-TW/dca-vs-lump-sum",
          },
        ],
      },
      {
        title: "延伸學習",
        description: "繼續查看資料來源、支援資產和風險說明。",
        links: [
          {
            title: "ETF 回測工具",
            description:
              "使用 ETF 回測工具檢視不同資產、期間和投入金額的歷史模擬。",
            href: "/zh-TW/etf-calculator",
          },
          {
            title: "支援的資產",
            description:
              "確認哪些 ETF 和股票有歷史資料，哪些目前只提供示範資料。",
            href: "/zh-TW/supported-assets",
          },
          {
            title: "免責聲明",
            description:
              "閱讀資料來源、回測限制、非投資建議和使用者責任等重要說明。",
            href: "/zh-TW/disclaimer",
          },
        ],
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
        [locale]: absoluteUrl(pagePath),
        "x-default": absoluteUrl(pagePath),
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
    {
      name: page.quickLinks[0].title,
      url: absoluteUrl(page.quickLinks[0].href),
    },
    {
      name: page.quickLinks[1].title,
      url: absoluteUrl(page.quickLinks[1].href),
    },
    {
      name: page.quickLinks[2].title,
      url: absoluteUrl(page.quickLinks[2].href),
    },
    {
      name: page.quickLinks[3].title,
      url: absoluteUrl(page.quickLinks[3].href),
    },
    {
      name: "VOO vs CSPX",
      url: absoluteUrl(`/${locale}/voo-vs-cspx`),
    },
    {
      name: locale === "zh-CN" ? "定投 vs 一次性投入" : "定期定額 vs 單筆投入",
      url: absoluteUrl(`/${locale}/dca-vs-lump-sum`),
    },
  ];
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

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd,
            breadcrumbJsonLd,
            itemListJsonLd,
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
