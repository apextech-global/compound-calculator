import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, productionBaseUrl } from "@/lib/seoMetadata";

const locale = "zh-CN";
const pagePath = `/${locale}/learn`;

const sections = [
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
    description: "比较不同 ETF、市场敞口和投入方式，但不把结果当成投资推荐。",
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
] as const;

export function generateStaticParams() {
  return [{ locale }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;

  if (requestedLocale !== locale) {
    notFound();
  }

  const title = "ETF 定投学习中心｜DCA Backtest";
  const description =
    "学习 ETF 定投、复利、DCA 回测、VOO、CSPX、定投 vs 一次性投入，以及马来西亚投资 ETF 的基础知识。";

  return {
    metadataBase: new URL(productionBaseUrl),
    title,
    description,
    alternates: {
      canonical: absoluteUrl(pagePath),
      languages: {
        "zh-CN": absoluteUrl(pagePath),
        "x-default": absoluteUrl(pagePath),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(pagePath),
      siteName: "DCA Backtest",
      type: "article",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;

  if (requestedLocale !== locale) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <section className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <nav className="mb-6 min-w-0 break-words text-sm text-slate-400">
          <Link href="/zh-CN" className="hover:text-cyan-300">
            DCA Backtest
          </Link>
          <span className="mx-2">/</span>
          <span>学习中心</span>
        </nav>

        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            ETF DCA Learning Hub
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            ETF 定投学习中心
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            这里是 DCA Backtest 的中文 ETF 定投学习入口，帮助你系统了解
            ETF 定投、DCA 回测、复利、VOO、CSPX、ETF 对比，以及马来西亚投资
            ETF 时常见的券商、换汇、税务和风险问题。
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-5 sm:mt-10">
          {sections.map((section) => (
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
            教育用途免责声明
          </h2>
          <p className="mt-3 text-sm leading-6 text-amber-50/80">
            仅供教育用途，不构成投资建议。过去表现不代表未来表现。
            ETF、股票、汇率和税务结果都可能变化，用户应自行判断并在需要时咨询持牌专业人士。
          </p>
        </section>
      </section>
    </main>
  );
}
