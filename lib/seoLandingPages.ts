import type { Locale } from "@/i18n/routing";
import { publicLocaleCodes } from "@/lib/locales";
import { absoluteUrl, xDefaultUrl } from "@/lib/seoMetadata";

const baseSeoPageSlugs = [
  "compound-interest-calculator",
  "dca-calculator",
  "etf-calculator",
  "voo-dca-calculator",
  "cspx-dca-calculator",
] as const;

const comparisonSeoPageSlugs = [
  "voo-vs-cspx",
  "voo-vs-qqq",
  "dca-vs-lump-sum",
  "cspx-vs-vwra",
  "iwda-vs-vwra",
  "etf-comparison-calculator",
] as const;

const assetSeoPageSlugs = [
  "qqq-dca-calculator",
  "vwra-dca-calculator",
  "iwda-dca-calculator",
  "0050-dca-calculator",
  "1155-dca-calculator",
  "es3-dca-calculator",
  "2800-dca-calculator",
] as const;

const malaysiaGuideSeoPageSlugs = [
  "how-to-buy-cspx-from-malaysia",
  "how-to-invest-in-voo-from-malaysia",
  "best-etf-broker-malaysia",
  "ibkr-vs-moomoo-malaysia",
] as const;

const chineseLearningSeoPageSlugs = [
  "cspx-vs-voo-malaysia",
  "voo-vs-qqq-dca",
  "etf-dca-backtest-guide",
  "dca-vs-lump-sum-guide",
  "compound-interest-guide",
] as const;

const japaneseLearningSeoPageSlugs = ["sp500-dca-simulation"] as const;

export const seoPageSlugs = [
  ...baseSeoPageSlugs,
  ...comparisonSeoPageSlugs,
  ...assetSeoPageSlugs,
  ...malaysiaGuideSeoPageSlugs,
  ...chineseLearningSeoPageSlugs,
  ...japaneseLearningSeoPageSlugs,
] as const;

export type SeoPageSlug = (typeof seoPageSlugs)[number];
type BaseSeoPageSlug = (typeof baseSeoPageSlugs)[number];
type ComparisonSeoPageSlug = (typeof comparisonSeoPageSlugs)[number];
type AssetSeoPageSlug = (typeof assetSeoPageSlugs)[number];
type MalaysiaGuideSeoPageSlug = (typeof malaysiaGuideSeoPageSlugs)[number];
type ChineseLearningSeoPageSlug = (typeof chineseLearningSeoPageSlugs)[number];
type JapaneseLearningSeoPageSlug = (typeof japaneseLearningSeoPageSlugs)[number];

type SeoPageContent = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  ctaQuery?: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

type LocaleSeoContent = {
  pageLabel: string;
  eyebrow: string;
  ctaLabel: string;
  ctaText: string;
  internalLinksLabel: string;
  disclaimerTitle: string;
  disclaimer: string;
  pages: Partial<Record<SeoPageSlug, SeoPageContent>>;
};

const enPages: Record<BaseSeoPageSlug, SeoPageContent> = {
  "compound-interest-calculator": {
    title:
      "Compound Interest Calculator | Monthly Investment Growth Calculator",
    description:
      "Use this compound interest calculator to estimate long-term investment growth from monthly contributions, annual returns, and compounding over time.",
    h1: "Compound Interest Calculator",
    intro:
      "Estimate how monthly contributions, annual return assumptions, and time can work together in a long-term investment growth calculator.",
    sections: [
      {
        title: "What is compound interest?",
        body: "Compound interest means earning returns on both your original capital and previous gains. Over long periods, this reinvested growth can become a major driver of portfolio value.",
      },
      {
        title: "How compound growth works",
        body: "The calculator projects growth from starting capital, recurring contributions, annual return assumptions, and monthly compounding. It is a model, not a prediction.",
      },
      {
        title: "Monthly investing and compounding",
        body: "A monthly compound calculator can show how regular contributions may build over time when combined with assumed investment returns.",
      },
      {
        title: "Compound interest example",
        body: "For example, an investor can compare different monthly contribution amounts and time horizons to understand how invested capital and growth may diverge.",
      },
    ],
    faqs: [
      {
        question: "Is this a compound interest calculator for investments?",
        answer:
          "Yes. It is designed for educational investment growth scenarios using recurring contributions and assumed annual returns.",
      },
      {
        question: "Does compounding guarantee future returns?",
        answer:
          "No. Market returns vary, and past or assumed performance does not guarantee future results.",
      },
      {
        question: "Can I change the display currency?",
        answer:
          "Yes. The site supports multiple display currencies while keeping calculations internally based in USD.",
      },
    ],
  },
  "dca-calculator": {
    title: "DCA Calculator | Dollar Cost Averaging Backtest Tool",
    description:
      "Use this DCA calculator and DCA backtest calculator to study monthly investing, ETF DCA scenarios, fees, data limits, and long-term outcomes.",
    h1: "DCA Calculator and Dollar Cost Averaging Backtest Tool",
    intro:
      "Use this DCA calculator to study how a fixed monthly investment may have behaved over time. It combines a dollar cost averaging calculator, ETF DCA calculator, monthly investment calculator, and historical DCA backtest calculator in one educational workflow.",
    sections: [
      {
        title: "What this DCA calculator does",
        body: "The calculator models a recurring monthly investment into a selected ETF or stock. You choose the asset, monthly amount, start year, end year, and display currency. The tool estimates total cash invested, shares accumulated, final value, total profit, total return, annualized return estimate, max drawdown, and other risk metrics where available. It is designed for learning how contribution timing, market prices, and long holding periods interact, not for predicting future returns.",
      },
      {
        title: "Who this monthly investment calculator is useful for",
        body: "A DCA backtest is useful for people comparing recurring investment habits, ETF monthly investing plans, or long-term contribution schedules. It can help users ask practical questions such as: what if I invested a fixed amount into VOO, QQQ, CSPX, VWRA, IWDA, 0050.TW, ES3.SI, or another supported asset over a selected period? It is also useful for comparing the difference between invested capital and market growth, especially when results are shown alongside a chart and yearly table.",
      },
      {
        title: "Example DCA backtest use case",
        body: "A user might test investing $500 per month into an S&P 500 ETF from 2018 to 2025. The DCA calculator applies the monthly contribution to available monthly prices, estimates how many shares would have been purchased, and then values the accumulated shares at the final price in the selected period. This kind of example can make the trade-off between regular contributions, market volatility, and ending value easier to understand.",
      },
      {
        title: "How the backtest works",
        body: "When historical data exists, the calculator uses monthly close prices generated from imported historical daily adjusted close data. Each month, the selected contribution is converted into estimated shares at the selected purchase price method. If advanced fee settings are enabled, fixed and percentage fees reduce the amount used to buy shares. The final value is calculated from accumulated shares and the final monthly price. If historical CSV data is unavailable for an asset, the page clearly labels sample data so it is not confused with real historical performance.",
      },
      {
        title: "Data source, fees, currency, dividends, and taxes",
        body: "Historical market prices may come from third-party sources such as Yahoo Finance and may be delayed, adjusted, incomplete, or different from exchange, broker, or fund-provider records. Display currency conversion is for presentation and uses sample exchange rates in the app. Real brokerage returns can differ because of commissions, spreads, tax treatment, dividend withholding, dividend reinvestment timing, exchange rates, tracking difference, execution price, and platform availability.",
      },
      {
        title: "Risk and educational disclaimer",
        body: "A DCA calculator can make historical scenarios easier to explore, but it cannot tell you what to buy, sell, or hold. Past performance does not guarantee future results. This page is educational only, not financial advice, not tax advice, not legal advice, and not an investment recommendation. Users are responsible for their own decisions and should verify important data with official sources or a licensed adviser.",
      },
    ],
    faqs: [
      {
        question: "What does this DCA calculator estimate?",
        answer:
          "It estimates total invested, shares accumulated, final value, total profit, total return, annualized return estimate, drawdown, and optional fee-adjusted results for a recurring monthly investment scenario.",
      },
      {
        question: "Can I use it as an ETF DCA calculator?",
        answer:
          "Yes. The supported asset list includes ETFs such as VOO, SPY, QQQ, CSPX, VWRA, IWDA, 0050.TW, ES3.SI, and 2800.HK, plus selected stocks where available.",
      },
      {
        question: "Does the backtest include dividends and taxes?",
        answer:
          "Not completely. Historical adjusted prices may reflect some corporate actions, but real investor returns can differ because of dividend timing, withholding tax, local taxes, fees, spreads, and currency conversion.",
      },
      {
        question: "Is dollar cost averaging always better than lump sum investing?",
        answer:
          "No. DCA and lump sum investing can produce different results depending on the selected start date, end date, market trend, volatility, fees, and investor behavior.",
      },
      {
        question: "Is this DCA backtest calculator financial advice?",
        answer:
          "No. It is for education and scenario analysis only. It does not recommend any asset or strategy.",
      },
    ],
  },
  "etf-calculator": {
    title: "ETF Investment Calculator | Monthly ETF Return Calculator",
    description:
      "Estimate monthly ETF investing results, compare supported ETF assets, and understand long-term ETF growth with this educational calculator.",
    h1: "ETF Investment Calculator",
    intro:
      "Use this ETF monthly investing guide to understand how recurring ETF purchases can be modeled with a DCA calculator and historical backtest data.",
    sections: [
      {
        title: "What is an ETF investment calculator?",
        body: "An ETF investment calculator estimates how recurring ETF purchases may grow over time based on contributions, market prices, and display currency settings.",
      },
      {
        title: "Why investors use ETFs for monthly investing",
        body: "ETFs can provide diversified exposure in a single tradable fund, which makes them common choices for monthly investing and DCA strategies.",
      },
      {
        title: "ETF DCA examples",
        body: "The calculator can model supported ETF examples such as VOO, SPY, QQQ, CSPX, VWRA, IWDA, and selected regional ETFs when data is available.",
      },
      {
        title: "Supported ETF markets",
        body: "Supported markets include the United States, Ireland UCITS listings, Taiwan, Singapore, Japan, and Hong Kong, with sample data fallback when historical files are not imported.",
      },
    ],
    faqs: [
      {
        question: "Can I use this as an ETF return calculator?",
        answer:
          "Yes. It can estimate educational ETF investing outcomes from recurring contributions and supported market data.",
      },
      {
        question: "Does the ETF calculator include all fees and taxes?",
        answer:
          "No. Real results can differ because of fees, taxes, execution prices, spreads, dividends, and currency conversion.",
      },
      {
        question: "Which ETF examples are supported?",
        answer:
          "The instrument selector includes examples such as VOO, SPY, QQQ, CSPX, VWRA, IWDA, 0050.TW, ES3.SI, and 2800.HK.",
      },
    ],
  },
  "voo-dca-calculator": {
    title: "VOO DCA Calculator | S&P 500 ETF Backtest Tool",
    description:
      "Backtest monthly investing in VOO using historical data where available and estimate long-term S&P 500 ETF investment growth.",
    h1: "VOO DCA Calculator",
    intro:
      "Explore monthly investing in VOO, a U.S.-listed S&P 500 ETF, with a DCA backtest calculator built for long-term educational planning.",
    sections: [
      {
        title: "What is VOO?",
        body: "VOO is Vanguard's U.S.-listed ETF designed to track the S&P 500 Index, which represents large-cap U.S. companies.",
      },
      {
        title: "How VOO DCA investing works",
        body: "A VOO DCA calculator applies a recurring monthly investment to VOO prices over time and estimates shares accumulated and ending value.",
      },
      {
        title: "VOO backtest example",
        body: "You can choose a monthly amount and backtest period to compare total invested with estimated portfolio value using historical data where available.",
      },
      {
        title: "Monthly VOO investing considerations",
        body: "Real VOO returns can differ because of fees, taxes, dividend treatment, exchange rates, execution prices, and brokerage rules.",
      },
    ],
    faqs: [
      {
        question: "Can I backtest monthly investing in VOO?",
        answer:
          "Yes. Select United States, ETF, and VOO in the main DCA Backtest calculator.",
      },
      {
        question: "Is VOO the same as the S&P 500?",
        answer:
          "VOO is an ETF designed to track the S&P 500 Index, but ETF returns can differ slightly from the index because of fund expenses and tracking differences.",
      },
      {
        question: "Is this VOO calculator financial advice?",
        answer:
          "No. It is for education only and does not provide personalized financial advice.",
      },
    ],
  },
  "cspx-dca-calculator": {
    title: "CSPX DCA Calculator | UCITS S&P 500 ETF Backtest Tool",
    description:
      "Estimate monthly investing results for CSPX, an Ireland-domiciled UCITS S&P 500 ETF, using historical data where available or sample data when not imported.",
    h1: "CSPX DCA Calculator",
    intro:
      "Use this CSPX DCA calculator guide to understand monthly investing in an Ireland-domiciled UCITS S&P 500 ETF.",
    sections: [
      {
        title: "What is CSPX?",
        body: "CSPX is an Ireland-domiciled UCITS ETF designed to track the S&P 500. It is commonly considered by non-U.S. investors who prefer UCITS ETF structures.",
      },
      {
        title: "Why some investors choose UCITS ETFs",
        body: "UCITS ETFs can be relevant for investors outside the United States because of fund domicile, regulation, tax considerations, and brokerage availability.",
      },
      {
        title: "CSPX DCA example",
        body: "A CSPX DCA calculator estimates how recurring monthly purchases may have grown over time using historical data where available.",
      },
      {
        title: "Historical data availability note",
        body: "If CSPX historical CSV data has not been imported yet, the calculator clearly marks sample data rather than presenting it as real historical performance.",
      },
    ],
    faqs: [
      {
        question: "Can I backtest CSPX monthly investing?",
        answer:
          "Yes. Select Ireland / UCITS ETFs, ETF, and CSPX.L in the main DCA Backtest calculator.",
      },
      {
        question: "Is CSPX an Ireland-domiciled ETF?",
        answer:
          "Yes. CSPX is an Ireland-domiciled UCITS ETF that tracks the S&P 500.",
      },
      {
        question: "Why might CSPX show sample data?",
        answer:
          "If historical CSV data has not been imported for CSPX, the calculator falls back to sample data and labels it clearly.",
      },
    ],
  },
};

const zhCnPages = translatePages({
  "compound-interest-calculator": [
    "复利计算器 | 每月投入投资回报计算器",
    "使用复利计算器估算每月投入、年化回报假设和投资时间对长期资产增长的影响。仅供教育用途，不承诺固定收益。",
    "复利计算器与长期投资回报计算器",
    "复利计算器适合用来理解每月投入、年化回报假设和时间之间的关系。它可以帮助你模拟长期投资规划，但不能预测或保证未来收益。",
    ["什么是复利？", "复利是指本金产生收益后，收益继续参与后续增长。长期投资中，时间越长，投入本金、再投资收益和假设回报之间的差距越明显。复利并不代表固定收益，市场投资的实际结果会波动，也可能亏损。"],
    ["复利计算器可以怎样使用", "你可以输入初始金额、每月投入、投资年限和假设年化回报，观察组合价值如何变化。它适合用于比较不同储蓄率、投资年限和回报假设，而不是用于判断某个资产未来一定会达到某个收益。"],
    ["每月投入、年化回报和时间的关系", "每月投入决定现金流，年化回报假设决定模型增长速度，时间决定复利效应能持续多久。小幅调整投入金额或投资年限，可能对长期结果产生较大影响。这个过程适合做长期规划和情景分析。"],
    ["费用、通胀和税务限制", "复利模型通常无法完整反映真实世界的券商费用、税务、汇率、通胀、基金费用、股息处理和买卖价差。实际投资回报可能与计算结果不同，尤其是跨币种投资和长期持有场景。"],
    ["风险与免责声明", "本复利计算器仅供教育用途，不构成投资建议、税务建议或法律建议。假设回报不等于未来收益，过去表现不代表未来表现。用户应自行判断，并在需要时咨询持牌财务顾问。"],
  ],
  "dca-calculator": [
    "定投计算器 | DCA 定投计算器与 ETF 回测工具",
    "使用定投计算器回测每月定投 ETF、股票、VOO、CSPX、QQQ 的历史表现，查看总投入、最终价值、回报和风险指标。",
    "定投计算器与 ETF 定投回测工具",
    "这个 DCA 定投计算器可以帮助你用历史价格模拟每月定投 ETF 或股票的表现。它适合研究定期投入、市场波动和长期持有之间的关系，但结果只是历史模拟，不代表未来收益。",
    ["什么是定投？", "定投是按照固定周期投入固定金额，例如每月买入同一只 ETF 或股票。价格较低时，同样金额可以买到更多份额；价格较高时买到较少份额。定投的重点不是预测最低点，而是用纪律化投入降低择时压力。"],
    ["定投计算器可以怎样使用", "你可以选择市场、资产、每月投入金额、开始年份、结束年份和显示货币。计算器会估算总投入、累计份额、最终价值、总利润、总回报、年化回报估算和最大回撤。它既可以作为 ETF 定投计算器，也可以作为每月投资回报计算器。"],
    ["如何回测每月定投 ETF 的历史表现", "如果所选资产已有历史 CSV 数据，系统会使用由历史每日调整收盘价生成的月度价格进行回测。每个月的投入金额会按月度价格换算成份额，最后用期末价格估算组合价值。没有历史数据的资产会明确显示示例数据，不会伪装成真实历史表现。"],
    ["示例使用场景", "例如，你可以测试从 2018 年到 2025 年每月定投 VOO、CSPX 或 QQQ 的结果，比较总投入和最终价值。也可以调整开始年份，观察不同市场阶段对结果的影响。这样的回测能帮助你理解历史路径，但不能说明未来一定会重复。"],
    ["数据、费用、汇率和税务限制", "历史价格可能来自 Yahoo Finance，并可能延迟、经过调整、不完整，或与官方 NAV、交易所和券商数据不同。实际收益还会受到手续费、买卖价差、汇率、股息再投资、预扣税、本地税务和成交价格影响。"],
    ["风险与免责声明", "本定投计算器仅供教育用途，不构成投资建议、买卖建议或收益承诺。过去表现不代表未来表现，回测结果不保证未来收益。用户应自行判断，必要时咨询持牌财务顾问。"],
  ],
  "etf-calculator": [
    "ETF 定投计算器 | ETF 回测工具与投资回报计算器",
    "使用 ETF 定投计算器回测美股 ETF、UCITS ETF 和亚洲市场 ETF 的每月投入表现，了解历史回报、回撤和数据限制。",
    "ETF 定投计算器与 ETF 回测工具",
    "ETF 定投计算器适合用来研究每月买入 ETF 的历史表现。你可以用它查看 VOO、SPY、QQQ、CSPX、VWRA、IWDA、0050.TW、ES3.SI、2800.HK 等资产在不同区间的模拟结果。",
    ["什么是 ETF 投资计算器？", "ETF 投资计算器会把固定每月投入应用到所选 ETF 的历史价格上，估算累计份额、最终价值和回报。它关注的是情景分析，而不是预测未来价格。"],
    ["适合哪些用户使用", "如果你想研究美股 ETF 定投、UCITS ETF 定投、台湾或新加坡 ETF 的长期表现，这个页面可以作为入门工具。它也适合用来比较不同投入金额、不同开始年份和不同市场阶段下的结果差异。"],
    ["ETF 定投回测怎样运行", "当历史数据可用时，系统会使用月度价格进行回测。每月投入会根据当月价格买入估算份额，最终组合价值由累计份额和期末价格决定。若缺少历史数据，页面会清楚标记示例数据。"],
    ["费用、股息、汇率和税务", "ETF 的真实回报可能受到基金费率、跟踪误差、股息处理、预扣税、券商费用、买卖价差、汇率转换和成交价格影响。跨市场 ETF 的差异尤其需要谨慎理解。"],
    ["风险与免责声明", "ETF 回测工具只能展示历史情景，不代表未来表现。任何 ETF 都可能下跌，本页面仅供教育用途，不构成投资建议。"],
  ],
  "voo-dca-calculator": [
    "VOO 定投计算器 | 美股 ETF 定投回测工具",
    "使用 VOO 定投计算器回测每月买入美国上市 S&P 500 ETF 的历史表现，查看投入、最终价值、回报和风险限制。",
    "VOO 定投计算器",
    "VOO 定投计算器用于研究每月定投美国上市 S&P 500 ETF 的历史结果。它可以帮助你理解美股 ETF 定投在不同年份开始时可能呈现的差异。",
    ["什么是 VOO？", "VOO 是 Vanguard 发行、在美国上市的 ETF，目标是跟踪 S&P 500 指数。S&P 500 覆盖美国大型上市公司，因此 VOO 常被用于研究美国大盘股长期表现。"],
    ["VOO 定投计算器可以做什么", "你可以设置每月投入金额、开始年份、结束年份和显示货币，查看总投入、最终价值、总利润、总回报、年化回报估算和最大回撤。它适合做教育性的 VOO 定投回测，而不是预测未来收益。"],
    ["VOO 回测示例", "例如，你可以比较 2015 年开始定投 VOO 和 2020 年开始定投 VOO 的结果。不同开始时间可能经历完全不同的市场环境，因此最终价值和回撤也可能明显不同。"],
    ["数据来源与限制", "VOO 历史价格可能来自 Yahoo Finance，并被转换成月度价格用于回测。真实券商结果可能因为股息再投资、税务、费用、买卖价差、成交价格和汇率而不同。"],
    ["风险与免责声明", "VOO 虽然跟踪广泛市场指数，但仍然会波动和下跌。本页面仅供教育用途，不构成投资建议，也不保证未来收益。"],
  ],
  "cspx-dca-calculator": [
    "CSPX 定投计算器 | UCITS ETF 回测工具",
    "使用 CSPX 定投计算器研究每月买入爱尔兰注册、伦敦交易所上市 UCITS S&P 500 ETF 的历史表现和风险限制。",
    "CSPX 定投计算器",
    "CSPX 定投计算器适合想了解 UCITS ETF、爱尔兰注册基金和 S&P 500 敞口的用户。它帮助你用相同每月投入假设，观察 CSPX 在历史区间中的模拟表现。",
    ["什么是 CSPX？", "CSPX 通常指 iShares Core S&P 500 UCITS ETF 的相关份额类别，是爱尔兰注册、在伦敦交易所等市场交易的 UCITS ETF，目标是提供 S&P 500 敞口。"],
    ["CSPX 和美股 ETF 的差异", "对美国以外投资者来说，UCITS 结构、基金注册地、交易市场、股息累积方式、券商支持、税务处理和货币结算都可能影响实际体验。CSPX 不一定适合所有人，也不能简单说一定优于美国上市 ETF。"],
    ["CSPX 定投回测怎样使用", "你可以选择 CSPX、每月投入金额、开始年份和结束年份，查看历史模拟下的最终价值和回撤。如果历史数据尚未完整导入，页面会显示示例数据提示。"],
    ["费用、税务和数据限制", "CSPX 的真实回报可能受到基金费率、买卖价差、汇率、税务、股息累积处理、成交价格和平台支持影响。Yahoo Finance 数据也可能与官方 NAV 或券商记录存在差异。"],
    ["风险与免责声明", "本 CSPX 定投计算器仅供教育用途，不构成投资建议。过去表现不代表未来表现，用户应自行核实数据并理解本地税务和平台规则。"],
  ],
}, "zh-CN");

const zhTwPages = translatePages({
  "compound-interest-calculator": [
    "複利計算機 | 每月投入投資報酬計算機",
    "使用複利計算機估算每月投入、年化報酬假設與投資時間對長期資產成長的影響。僅供教育用途，不承諾固定收益。",
    "複利計算機與長期投資報酬計算機",
    "複利計算機適合用來理解每月投入、年化報酬與時間之間的關係。它可以協助做長期投資規劃與情境分析，但不能預測或保證未來報酬。",
    ["什麼是複利？", "複利是指本金產生報酬後，報酬繼續參與後續成長。長期投資中，時間越長，投入本金、再投入報酬與假設報酬率之間的差距越明顯。不過，複利不代表固定收益，市場投資仍可能波動或虧損。"],
    ["複利計算機可以怎樣使用", "你可以輸入初始金額、每月投入、投資年限與假設年化報酬，觀察投資組合價值如何變化。它適合比較不同儲蓄率、投資年期與報酬假設，而不是用來判斷某項資產未來一定會達到特定收益。"],
    ["每月投入、年化報酬與時間的關係", "每月投入決定現金流，年化報酬假設影響模型成長速度，時間則決定複利效果能持續多久。小幅調整投入金額或投資年限，可能對長期結果造成明顯差異。"],
    ["費用、通膨與稅務限制", "複利模型通常無法完整反映真實世界的券商手續費、稅務、匯率、通膨、基金費用、股息處理與買賣價差。實際投資報酬可能與計算結果不同，跨幣別與長期持有情境尤其需要留意。"],
    ["風險與免責聲明", "本複利計算機僅供教育用途，不構成投資建議、稅務建議或法律建議。假設報酬不等於未來收益，過去表現不代表未來表現。使用者應自行判斷，必要時諮詢持牌財務顧問。"],
  ],
  "dca-calculator": [
    "定期定額計算機 | DCA 定期定額與 ETF 回測工具",
    "使用定期定額計算機回測每月投入 ETF、股票、VOO、CSPX、QQQ 的歷史表現，查看總投入、最終價值、報酬與風險指標。",
    "定期定額計算機與 ETF 回測工具",
    "這個 DCA 定期定額計算機可以用歷史價格模擬每月投入 ETF 或股票的表現。它適合研究固定投入、市場波動與長期持有之間的關係，但結果只是歷史模擬，不代表未來報酬。",
    ["什麼是定期定額？", "定期定額是按照固定週期投入固定金額，例如每月買入同一檔 ETF 或股票。價格較低時，同樣金額可買到較多單位；價格較高時買到較少單位。重點不是猜最低點，而是用紀律化投入降低一次性擇時壓力。"],
    ["定期定額計算機可以怎樣使用", "你可以選擇市場、資產、每月投入金額、開始年份、結束年份與顯示貨幣。計算機會估算總投入、累積單位、最終價值、總利潤、總報酬、年化報酬估算與最大回撤。它既可作為 ETF 定期定額計算機，也可作為每月投資報酬計算機。"],
    ["如何回測每月投入 ETF 的歷史表現", "如果所選資產已有歷史 CSV 資料，系統會使用由歷史每日調整收盤價生成的月度價格進行回測。每個月的投入金額會按月度價格換算成估算單位，最後用期末價格估算投資組合價值。沒有歷史資料的資產會明確顯示範例資料，不會偽裝成真實歷史表現。"],
    ["示例使用情境", "例如，你可以測試從 2018 年到 2025 年每月投入 VOO、CSPX 或 QQQ 的結果，比較總投入與最終價值。也可以調整開始年份，觀察不同市場階段對結果的影響。這類回測能協助理解歷史路徑，但不能說明未來一定會重複。"],
    ["資料、手續費、匯率與稅務限制", "歷史價格可能來自 Yahoo Finance，並可能延遲、經過調整、不完整，或與官方 NAV、交易所和券商資料不同。實際報酬還會受到手續費、買賣價差、匯率、股息再投入、預扣稅、本地稅務和成交價格影響。"],
    ["風險與免責聲明", "本定期定額計算機僅供教育用途，不構成投資建議、買賣建議或收益承諾。過去表現不代表未來表現，回測結果不保證未來收益。使用者應自行判斷，必要時諮詢持牌財務顧問。"],
  ],
  "etf-calculator": [
    "ETF 定期定額計算機 | ETF 回測工具與投資報酬計算機",
    "使用 ETF 定期定額計算機回測美股 ETF、UCITS ETF 和亞洲市場 ETF 的每月投入表現，了解歷史報酬、回撤與資料限制。",
    "ETF 定期定額計算機與 ETF 回測工具",
    "ETF 定期定額計算機適合用來研究每月買入 ETF 的歷史表現。你可以用它查看 VOO、SPY、QQQ、CSPX、VWRA、IWDA、0050.TW、ES3.SI、2800.HK 等資產在不同區間的模擬結果。",
    ["什麼是 ETF 投資計算機？", "ETF 投資計算機會把固定每月投入套用到所選 ETF 的歷史價格上，估算累積單位、最終價值與報酬。它關注的是情境分析，而不是預測未來價格。"],
    ["適合哪些使用者", "如果你想研究美股 ETF 定期定額、UCITS ETF 定期定額、台灣或香港常見 ETF 的長期表現，這個頁面可以作為入門工具。它也適合比較不同投入金額、不同開始年份與不同市場階段下的結果差異。"],
    ["ETF 定期定額回測怎樣運作", "當歷史資料可用時，系統會使用月度價格進行回測。每月投入會依照當月價格買入估算單位，最終投資組合價值由累積單位與期末價格決定。若缺少歷史資料，頁面會清楚標記範例資料。"],
    ["費用、股息、匯率與稅務", "ETF 的真實報酬可能受到基金費率、追蹤誤差、股息處理、預扣稅、券商手續費、買賣價差、匯率轉換與成交價格影響。跨市場 ETF 的差異尤其需要謹慎理解。"],
    ["風險與免責聲明", "ETF 回測工具只能展示歷史情境，不代表未來表現。任何 ETF 都可能下跌，本頁面僅供教育用途，不構成投資建議。"],
  ],
  "voo-dca-calculator": [
    "VOO 定期定額計算機 | 美股 ETF 回測工具",
    "使用 VOO 定期定額計算機回測每月買入美國上市 S&P 500 ETF 的歷史表現，查看投入、最終價值、報酬與風險限制。",
    "VOO 定期定額計算機",
    "VOO 定期定額計算機用於研究每月投入美國上市 S&P 500 ETF 的歷史結果。它可以幫助你理解美股 ETF 定期定額在不同年份開始時可能呈現的差異。",
    ["什麼是 VOO？", "VOO 是 Vanguard 發行、在美國上市的 ETF，目標是追蹤 S&P 500 指數。S&P 500 涵蓋美國大型上市公司，因此 VOO 常被用來研究美國大型股市場的長期表現。"],
    ["VOO 定期定額計算機可以做什麼", "你可以設定每月投入金額、開始年份、結束年份與顯示貨幣，查看總投入、最終價值、總利潤、總報酬、年化報酬估算與最大回撤。它適合做教育性的 VOO 定期定額回測，而不是預測未來收益。"],
    ["VOO 回測示例", "例如，你可以比較 2015 年開始定期定額 VOO 與 2020 年開始定期定額 VOO 的結果。不同開始時間可能經歷完全不同的市場環境，因此最終價值與回撤也可能明顯不同。"],
    ["資料來源與限制", "VOO 歷史價格可能來自 Yahoo Finance，並被轉換成月度價格用於回測。真實券商結果可能因為股息再投入、稅務、費用、買賣價差、成交價格和匯率而不同。"],
    ["風險與免責聲明", "VOO 雖然追蹤廣泛市場指數，但仍然會波動和下跌。本頁面僅供教育用途，不構成投資建議，也不保證未來收益。"],
  ],
  "cspx-dca-calculator": [
    "CSPX 定期定額計算機 | UCITS ETF 回測工具",
    "使用 CSPX 定期定額計算機研究每月買入愛爾蘭註冊、倫敦交易所上市 UCITS S&P 500 ETF 的歷史表現和風險限制。",
    "CSPX 定期定額計算機",
    "CSPX 定期定額計算機適合想了解 UCITS ETF、愛爾蘭註冊基金和 S&P 500 曝險的使用者。它協助你用相同每月投入假設，觀察 CSPX 在歷史區間中的模擬表現。",
    ["什麼是 CSPX？", "CSPX 通常指 iShares Core S&P 500 UCITS ETF 的相關份額類別，是愛爾蘭註冊、在倫敦交易所等市場交易的 UCITS ETF，目標是提供 S&P 500 曝險。"],
    ["CSPX 和美股 ETF 的差別", "對美國以外投資者來說，UCITS 結構、基金註冊地、交易市場、股息累積方式、券商支援、稅務處理和貨幣結算都可能影響實際體驗。CSPX 不一定適合所有人，也不能簡單說一定優於美國上市 ETF。"],
    ["CSPX 定期定額回測怎樣使用", "你可以選擇 CSPX、每月投入金額、開始年份和結束年份，查看歷史模擬下的最終價值和回撤。如果歷史資料尚未完整匯入，頁面會顯示範例資料提示。"],
    ["費用、稅務和資料限制", "CSPX 的真實報酬可能受到基金費率、買賣價差、匯率、稅務、股息累積處理、成交價格和平台支援影響。Yahoo Finance 資料也可能與官方 NAV 或券商紀錄存在差異。"],
    ["風險與免責聲明", "本 CSPX 定期定額計算機僅供教育用途，不構成投資建議。過去表現不代表未來表現，使用者應自行核實資料並理解本地稅務和平台規則。"],
  ],
}, "zh-TW");

const msPages = translatePages({
  "compound-interest-calculator": ["Kalkulator Faedah Kompaun | Kalkulator Pertumbuhan Pelaburan Bulanan", "Anggarkan pertumbuhan pelaburan jangka panjang daripada sumbangan bulanan, pulangan tahunan dan faedah kompaun.", "Kalkulator Faedah Kompaun", "Terokai bagaimana sumbangan bulanan dan pulangan tahunan boleh mempengaruhi pertumbuhan pelaburan jangka panjang.", ["Apakah faedah kompaun?", "Faedah kompaun ialah pertumbuhan atas modal asal dan keuntungan terdahulu."], ["Cara pertumbuhan kompaun berfungsi", "Model ini menggunakan modal permulaan, sumbangan bulanan, andaian pulangan tahunan dan kompaun bulanan."], ["Pelaburan bulanan dan kompaun", "Sumbangan kecil yang dibuat secara berkala boleh memberi kesan besar dalam tempoh panjang."], ["Contoh faedah kompaun", "Bandingkan jumlah bulanan dan tempoh berbeza untuk melihat anggaran nilai akhir."]],
  "dca-calculator": ["Kalkulator DCA | Kalkulator Dollar Cost Averaging", "Anggarkan bagaimana pelaburan bulanan boleh berkembang menggunakan sumbangan berkala dan data pasaran.", "Kalkulator DCA", "Gunakan kalkulator pelaburan bulanan untuk memahami strategi dollar-cost averaging.", ["Apakah dollar-cost averaging?", "Dollar-cost averaging bermaksud melabur jumlah tetap mengikut jadual berkala."], ["Cara DCA berfungsi", "Apabila harga rendah, jumlah yang sama membeli lebih banyak unit; apabila harga tinggi, ia membeli lebih sedikit unit."], ["DCA berbanding pelaburan sekali gus", "DCA membahagikan pembelian mengikut masa, manakala pelaburan sekali gus melaburkan modal pada satu masa."], ["Contoh pelaburan bulanan", "Pilih jumlah bulanan, tahun mula dan tahun akhir untuk menganggarkan nilai akhir."]],
  "etf-calculator": ["Kalkulator Pelaburan ETF | Kalkulator Pulangan ETF Bulanan", "Anggarkan hasil pelaburan ETF bulanan dan fahami pertumbuhan ETF jangka panjang.", "Kalkulator Pelaburan ETF", "Ketahui bagaimana pembelian ETF berkala boleh dimodelkan dengan kalkulator DCA.", ["Apakah kalkulator pelaburan ETF?", "Kalkulator ini menganggarkan pertumbuhan pembelian ETF berkala berdasarkan sumbangan dan harga pasaran."], ["Mengapa ETF digunakan untuk pelaburan bulanan", "ETF boleh memberikan pendedahan yang pelbagai melalui satu dana dagangan."], ["Contoh DCA ETF", "Contoh termasuk VOO, SPY, QQQ, CSPX dan ETF lain apabila data tersedia."], ["Pasaran ETF yang disokong", "Pasaran yang disokong termasuk Amerika Syarikat, Ireland UCITS, Taiwan, Singapura, Jepun dan Hong Kong."]],
  "voo-dca-calculator": ["Kalkulator DCA VOO | Alat Ujian Balik ETF S&P 500", "Uji balik pelaburan bulanan dalam VOO dan anggarkan pertumbuhan ETF S&P 500 jangka panjang.", "Kalkulator DCA VOO", "Terokai pelaburan bulanan dalam VOO menggunakan kalkulator ujian balik DCA.", ["Apakah VOO?", "VOO ialah ETF Vanguard yang disenaraikan di Amerika Syarikat dan menjejaki indeks S&P 500."], ["Cara DCA VOO berfungsi", "Kalkulator menggunakan pelaburan bulanan pada harga VOO untuk menganggarkan unit terkumpul dan nilai akhir."], ["Contoh ujian balik VOO", "Pilih jumlah bulanan dan tempoh untuk membandingkan jumlah dilaburkan dengan nilai portfolio."], ["Pertimbangan pelaburan VOO", "Pulangan sebenar boleh berbeza kerana yuran, cukai, dividen, kadar tukaran dan harga pelaksanaan."]],
  "cspx-dca-calculator": ["Kalkulator DCA CSPX | Alat Ujian Balik ETF UCITS S&P 500", "Anggarkan pelaburan bulanan untuk CSPX, ETF UCITS S&P 500 berdomisil Ireland.", "Kalkulator DCA CSPX", "Ketahui bagaimana pelaburan bulanan dalam CSPX boleh dimodelkan.", ["Apakah CSPX?", "CSPX ialah ETF UCITS berdomisil Ireland yang menjejaki S&P 500."], ["Mengapa memilih ETF UCITS", "ETF UCITS boleh relevan untuk pelabur luar Amerika Syarikat kerana struktur dan ketersediaan broker."], ["Contoh DCA CSPX", "Kalkulator menganggarkan bagaimana pembelian bulanan CSPX mungkin berkembang apabila data tersedia."], ["Nota ketersediaan data", "Jika data sejarah CSPX belum diimport, kalkulator akan menandakan data sampel dengan jelas."]],
}, "ms");

const idPages = translatePages({
  "compound-interest-calculator": ["Kalkulator Bunga Majemuk | Kalkulator Pertumbuhan Investasi Bulanan", "Perkirakan pertumbuhan investasi jangka panjang dari kontribusi bulanan, return tahunan, dan bunga majemuk.", "Kalkulator Bunga Majemuk", "Jelajahi bagaimana kontribusi bulanan dan asumsi return tahunan dapat memengaruhi pertumbuhan investasi jangka panjang.", ["Apa itu bunga majemuk?", "Bunga majemuk adalah pertumbuhan dari modal awal dan keuntungan sebelumnya."], ["Cara kerja pertumbuhan majemuk", "Model ini menggunakan modal awal, kontribusi bulanan, asumsi return tahunan, dan penggabungan bulanan."], ["Investasi bulanan dan bunga majemuk", "Kontribusi kecil yang dilakukan rutin dapat berdampak besar dalam jangka panjang."], ["Contoh bunga majemuk", "Bandingkan jumlah bulanan dan periode berbeda untuk melihat estimasi nilai akhir."]],
  "dca-calculator": ["Kalkulator DCA | Kalkulator Dollar Cost Averaging", "Perkirakan bagaimana investasi bulanan dapat tumbuh menggunakan kontribusi berkala dan data pasar.", "Kalkulator DCA", "Gunakan kalkulator investasi bulanan untuk memahami strategi dollar-cost averaging.", ["Apa itu dollar-cost averaging?", "Dollar-cost averaging berarti berinvestasi dengan jumlah tetap secara berkala."], ["Cara kerja DCA", "Saat harga lebih rendah, jumlah yang sama membeli lebih banyak unit; saat harga lebih tinggi, unit yang dibeli lebih sedikit."], ["DCA dibandingkan investasi sekaligus", "DCA membagi pembelian dari waktu ke waktu, sementara investasi sekaligus menempatkan modal dalam satu waktu."], ["Contoh investasi bulanan", "Pilih jumlah bulanan, tahun mulai, dan tahun akhir untuk memperkirakan nilai akhir."]],
  "etf-calculator": ["Kalkulator Investasi ETF | Kalkulator Return ETF Bulanan", "Perkirakan hasil investasi ETF bulanan dan pahami pertumbuhan ETF jangka panjang.", "Kalkulator Investasi ETF", "Pelajari bagaimana pembelian ETF berkala dapat dimodelkan dengan kalkulator DCA.", ["Apa itu kalkulator investasi ETF?", "Kalkulator ini memperkirakan pertumbuhan pembelian ETF berkala berdasarkan kontribusi dan harga pasar."], ["Mengapa ETF digunakan untuk investasi bulanan", "ETF dapat memberikan eksposur terdiversifikasi melalui satu dana yang diperdagangkan."], ["Contoh DCA ETF", "Contoh termasuk VOO, SPY, QQQ, CSPX, dan ETF lain jika data tersedia."], ["Pasar ETF yang didukung", "Pasar yang didukung termasuk Amerika Serikat, Ireland UCITS, Taiwan, Singapura, Jepang, dan Hong Kong."]],
  "voo-dca-calculator": ["Kalkulator DCA VOO | Alat Backtest ETF S&P 500", "Backtest investasi bulanan di VOO dan perkirakan pertumbuhan ETF S&P 500 jangka panjang.", "Kalkulator DCA VOO", "Jelajahi investasi bulanan di VOO menggunakan kalkulator backtest DCA.", ["Apa itu VOO?", "VOO adalah ETF Vanguard yang terdaftar di Amerika Serikat dan melacak indeks S&P 500."], ["Cara kerja DCA VOO", "Kalkulator menerapkan investasi bulanan pada harga VOO untuk memperkirakan unit terkumpul dan nilai akhir."], ["Contoh backtest VOO", "Pilih jumlah bulanan dan periode untuk membandingkan total investasi dengan nilai portofolio."], ["Pertimbangan investasi VOO", "Return nyata dapat berbeda karena biaya, pajak, dividen, kurs, dan harga eksekusi."]],
  "cspx-dca-calculator": ["Kalkulator DCA CSPX | Alat Backtest ETF UCITS S&P 500", "Perkirakan investasi bulanan untuk CSPX, ETF UCITS S&P 500 berdomisili Irlandia.", "Kalkulator DCA CSPX", "Pelajari bagaimana investasi bulanan di CSPX dapat dimodelkan.", ["Apa itu CSPX?", "CSPX adalah ETF UCITS berdomisili Irlandia yang melacak S&P 500."], ["Mengapa memilih ETF UCITS", "ETF UCITS dapat relevan bagi investor di luar Amerika Serikat karena struktur dan ketersediaan broker."], ["Contoh DCA CSPX", "Kalkulator memperkirakan bagaimana pembelian bulanan CSPX mungkin tumbuh jika data tersedia."], ["Catatan ketersediaan data", "Jika data historis CSPX belum diimpor, kalkulator akan menandai data sampel dengan jelas."]],
}, "id");

function translatePages(
  source: Record<BaseSeoPageSlug, [string, string, string, string, ...Array<[string, string]>]>,
  locale: Locale
) {
  return Object.fromEntries(
    Object.entries(source).map(([slug, [title, description, h1, intro, ...sections]]) => [
      slug,
      buildPage(title, description, h1, intro, sections, locale),
    ])
  ) as Record<BaseSeoPageSlug, SeoPageContent>;
}

function basePageFaq(locale: Locale) {
  const labels: Partial<
    Record<Locale, { adviceQuestion: string; adviceAnswer: string; calculatorQuestion: string; calculatorAnswer: string }>
  > = {
    "zh-CN": {
      adviceQuestion: "这个页面提供投资建议吗？",
      adviceAnswer: "不提供。本页面和计算器仅供教育用途，不构成金融建议，也不是投资推荐。",
      calculatorQuestion: "可以回到主计算器使用吗？",
      calculatorAnswer: "可以。请使用页面中的按钮返回主定投回测计算器。",
    },
    "zh-TW": {
      adviceQuestion: "這個頁面提供投資建議嗎？",
      adviceAnswer: "不提供。本頁面和計算器僅供教育用途，不構成金融建議，也不是投資推薦。",
      calculatorQuestion: "可以回到主計算器使用嗎？",
      calculatorAnswer: "可以。請使用頁面中的按鈕返回主 DCA Backtest 計算器。",
    },
    ms: {
      adviceQuestion: "Adakah halaman ini memberi nasihat pelaburan?",
      adviceAnswer: "Tidak. Halaman dan kalkulator ini hanya untuk pendidikan, bukan nasihat kewangan atau cadangan pelaburan.",
      calculatorQuestion: "Bolehkah saya kembali ke kalkulator utama?",
      calculatorAnswer: "Ya. Gunakan butang pada halaman untuk kembali ke kalkulator utama DCA Backtest.",
    },
    id: {
      adviceQuestion: "Apakah halaman ini memberi nasihat investasi?",
      adviceAnswer: "Tidak. Halaman dan kalkulator ini hanya untuk edukasi, bukan nasihat keuangan atau rekomendasi investasi.",
      calculatorQuestion: "Bisakah saya kembali ke kalkulator utama?",
      calculatorAnswer: "Ya. Gunakan tombol di halaman untuk kembali ke kalkulator utama DCA Backtest.",
    },
  };

  return labels[locale] ?? labels["zh-CN"]!;
}

function buildPage(
  title: string,
  description: string,
  h1: string,
  intro: string,
  sections: Array<[string, string]>,
  locale: Locale
): SeoPageContent {
  const faq = basePageFaq(locale);

  return {
    title,
    description,
    h1,
    intro,
    sections: sections.map(([sectionTitle, body]) => ({ title: sectionTitle, body })),
    faqs: [
      {
        question: sections[0]?.[0] ?? title,
        answer: sections[0]?.[1] ?? description,
      },
      {
        question: faq.adviceQuestion,
        answer: faq.adviceAnswer,
      },
      {
        question: faq.calculatorQuestion,
        answer: faq.calculatorAnswer,
      },
    ],
  };
}

const genericLocaleLabels: Record<string, Omit<LocaleSeoContent, "pages">> = {
  en: {
    pageLabel: "Guide",
    eyebrow: "Calculator Guide",
    ctaLabel: "Open the main calculator",
    ctaText:
      "Use the interactive DCA Backtest and Compound Interest Calculator to model your own monthly investment scenario.",
    internalLinksLabel: "Useful site links",
    disclaimerTitle: "Educational disclaimer",
    disclaimer:
      "This page is for educational purposes only and is not financial advice. Past performance does not guarantee future results.",
  },
  "zh-CN": {
    pageLabel: "指南",
    eyebrow: "计算器指南",
    ctaLabel: "打开主计算器",
    ctaText: "使用互动定投回测工具和复利计算器，模拟你自己的每月投资情景。",
    internalLinksLabel: "相关站内链接",
    disclaimerTitle: "教育用途免责声明",
    disclaimer: "本页面仅供教育用途，不构成金融建议。过往表现不保证未来结果。",
  },
  "zh-TW": {
    pageLabel: "指南",
    eyebrow: "計算器指南",
    ctaLabel: "開啟主計算器",
    ctaText: "使用互動 DCA Backtest 與複利計算器，模擬你自己的每月投資情境。",
    internalLinksLabel: "相關站內連結",
    disclaimerTitle: "教育用途免責聲明",
    disclaimer: "本頁面僅供教育用途，不構成金融建議。過往表現不保證未來結果。",
  },
};

const localizedPages: Partial<Record<Locale, Record<BaseSeoPageSlug, SeoPageContent>>> = {
  en: enPages,
  "zh-CN": zhCnPages,
  "zh-TW": zhTwPages,
  ms: msPages,
  id: idPages,
};

const localeLabels: Partial<Record<Locale, Omit<LocaleSeoContent, "pages">>> = {
  en: genericLocaleLabels.en,
  "zh-CN": genericLocaleLabels["zh-CN"],
  "zh-TW": genericLocaleLabels["zh-TW"],
  ms: {
    pageLabel: "Panduan",
    eyebrow: "Panduan Kalkulator",
    ctaLabel: "Buka kalkulator utama",
    ctaText:
      "Gunakan DCA Backtest dan kalkulator faedah kompaun interaktif untuk memodelkan senario pelaburan bulanan anda.",
    internalLinksLabel: "Pautan laman",
    disclaimerTitle: "Penafian pendidikan",
    disclaimer:
      "Halaman ini untuk tujuan pendidikan sahaja dan bukan nasihat kewangan. Prestasi lalu tidak menjamin hasil masa depan.",
  },
  id: {
    pageLabel: "Panduan",
    eyebrow: "Panduan Kalkulator",
    ctaLabel: "Buka kalkulator utama",
    ctaText:
      "Gunakan DCA Backtest dan kalkulator bunga majemuk interaktif untuk memodelkan skenario investasi bulanan Anda.",
    internalLinksLabel: "Tautan situs",
    disclaimerTitle: "Penafian edukasi",
    disclaimer:
      "Halaman ini hanya untuk tujuan edukasi dan bukan nasihat keuangan. Kinerja masa lalu tidak menjamin hasil masa depan.",
  },
  ja: labels("ガイド", "計算機ガイド", "メイン計算機を開く", "このページは教育目的のみであり、金融助言ではありません。過去の実績は将来の結果を保証しません。"),
  ko: labels("가이드", "계산기 가이드", "메인 계산기 열기", "이 페이지는 교육 목적이며 금융 조언이 아닙니다. 과거 성과는 미래 결과를 보장하지 않습니다."),
  ru: labels("Руководство", "Руководство по калькулятору", "Открыть основной калькулятор", "Эта страница предназначена только для образовательных целей и не является финансовой рекомендацией. Прошлая доходность не гарантирует будущих результатов."),
  fr: labels("Guide", "Guide du calculateur", "Ouvrir le calculateur principal", "Cette page est fournie à des fins éducatives uniquement et ne constitue pas un conseil financier. Les performances passées ne garantissent pas les résultats futurs."),
  it: labels("Guida", "Guida al calcolatore", "Apri il calcolatore principale", "Questa pagina è solo a scopo educativo e non costituisce consulenza finanziaria. Le performance passate non garantiscono risultati futuri."),
  es: labels("Guía", "Guía de la calculadora", "Abrir la calculadora principal", "Esta página es solo para fines educativos y no es asesoramiento financiero. El rendimiento pasado no garantiza resultados futuros."),
  ar: labels("دليل", "دليل الحاسبة", "افتح الحاسبة الرئيسية", "هذه الصفحة لأغراض تعليمية فقط وليست نصيحة مالية. الأداء السابق لا يضمن النتائج المستقبلية."),
  de: labels("Leitfaden", "Rechner-Leitfaden", "Hauptrechner öffnen", "Diese Seite dient nur Bildungszwecken und ist keine Finanzberatung. Vergangene Wertentwicklung garantiert keine zukünftigen Ergebnisse."),
  ta: labels("வழிகாட்டி", "கணிப்பான் வழிகாட்டி", "முக்கிய கணிப்பானைத் திற", "இந்த பக்கம் கல்வி நோக்கத்திற்காக மட்டுமே; இது நிதி ஆலோசனை அல்ல. கடந்த செயல்திறன் எதிர்கால முடிவுகளை உறுதி செய்யாது."),
};

function labels(
  pageLabel: string,
  eyebrow: string,
  ctaLabel: string,
  disclaimer: string
): Omit<LocaleSeoContent, "pages"> {
  return {
    pageLabel,
    eyebrow,
    ctaLabel,
    ctaText: ctaLabel,
    internalLinksLabel: pageLabel,
    disclaimerTitle: pageLabel,
    disclaimer,
  };
}

const simpleLocaleText: Partial<Record<Locale, {
  compound: string;
  dca: string;
  etf: string;
  voo: string;
  cspx: string;
  titleSuffix: string;
  estimate: string;
  learn: string;
  sectionOne: string;
  sectionTwo: string;
  sectionThree: string;
  sectionFour: string;
  faqOne: string;
  faqTwo: string;
  answerOne: string;
  answerTwo: string;
}>> = {
  ja: { compound: "複利計算機", dca: "DCA計算機", etf: "ETF投資計算機", voo: "VOO DCA計算機", cspx: "CSPX DCA計算機", titleSuffix: "投資ガイド", estimate: "毎月投資と長期成長を教育目的で見積もります。", learn: "このページでは、毎月投資、DCA、ETF、複利成長をわかりやすく説明します。", sectionOne: "基本の考え方", sectionTwo: "毎月投資での使い方", sectionThree: "長期成長の見方", sectionFour: "注意点", faqOne: "このページは無料ですか？", faqTwo: "これは投資助言ですか？", answerOne: "はい。教育目的で無料で閲覧できます。", answerTwo: "いいえ。これは金融助言ではありません。" },
  ko: { compound: "복리 계산기", dca: "DCA 계산기", etf: "ETF 투자 계산기", voo: "VOO DCA 계산기", cspx: "CSPX DCA 계산기", titleSuffix: "투자 가이드", estimate: "월별 투자와 장기 성장을 교육 목적으로 추정합니다.", learn: "이 페이지는 월별 투자, DCA, ETF, 복리 성장을 쉽게 설명합니다.", sectionOne: "기본 개념", sectionTwo: "월별 투자에서의 사용", sectionThree: "장기 성장 이해", sectionFour: "주의 사항", faqOne: "이 페이지는 무료인가요?", faqTwo: "투자 조언인가요?", answerOne: "예. 교육 목적으로 무료로 볼 수 있습니다.", answerTwo: "아닙니다. 금융 조언이 아닙니다." },
  ru: { compound: "Калькулятор сложного процента", dca: "DCA-калькулятор", etf: "ETF-калькулятор", voo: "VOO DCA-калькулятор", cspx: "CSPX DCA-калькулятор", titleSuffix: "инвестиционное руководство", estimate: "Оценивайте ежемесячные инвестиции и долгосрочный рост в образовательных целях.", learn: "Эта страница объясняет ежемесячные инвестиции, DCA, ETF и сложный рост простым языком.", sectionOne: "Основная идея", sectionTwo: "Как использовать для ежемесячных инвестиций", sectionThree: "Как понимать долгосрочный рост", sectionFour: "Важные ограничения", faqOne: "Эта страница бесплатная?", faqTwo: "Это инвестиционная рекомендация?", answerOne: "Да. Страница доступна бесплатно в образовательных целях.", answerTwo: "Нет. Это не финансовая рекомендация." },
  fr: { compound: "Calculateur d’intérêts composés", dca: "Calculateur DCA", etf: "Calculateur d’investissement ETF", voo: "Calculateur DCA VOO", cspx: "Calculateur DCA CSPX", titleSuffix: "guide d’investissement", estimate: "Estimez les investissements mensuels et la croissance long terme à des fins éducatives.", learn: "Cette page explique simplement l’investissement mensuel, le DCA, les ETF et la croissance composée.", sectionOne: "Idée principale", sectionTwo: "Utilisation pour investir chaque mois", sectionThree: "Comprendre la croissance long terme", sectionFour: "Limites importantes", faqOne: "Cette page est-elle gratuite ?", faqTwo: "Est-ce un conseil en investissement ?", answerOne: "Oui. Elle est gratuite à des fins éducatives.", answerTwo: "Non. Ce n’est pas un conseil financier." },
  it: { compound: "Calcolatore interesse composto", dca: "Calcolatore DCA", etf: "Calcolatore investimento ETF", voo: "Calcolatore DCA VOO", cspx: "Calcolatore DCA CSPX", titleSuffix: "guida agli investimenti", estimate: "Stima investimenti mensili e crescita di lungo periodo a scopo educativo.", learn: "Questa pagina spiega in modo semplice investimento mensile, DCA, ETF e crescita composta.", sectionOne: "Idea principale", sectionTwo: "Uso per investire ogni mese", sectionThree: "Capire la crescita di lungo periodo", sectionFour: "Limiti importanti", faqOne: "Questa pagina è gratuita?", faqTwo: "È consulenza finanziaria?", answerOne: "Sì. È gratuita a scopo educativo.", answerTwo: "No. Non è consulenza finanziaria." },
  es: { compound: "Calculadora de interés compuesto", dca: "Calculadora DCA", etf: "Calculadora de inversión ETF", voo: "Calculadora DCA VOO", cspx: "Calculadora DCA CSPX", titleSuffix: "guía de inversión", estimate: "Estima inversiones mensuales y crecimiento a largo plazo con fines educativos.", learn: "Esta página explica de forma sencilla la inversión mensual, DCA, ETF y crecimiento compuesto.", sectionOne: "Idea principal", sectionTwo: "Uso para invertir cada mes", sectionThree: "Entender el crecimiento a largo plazo", sectionFour: "Límites importantes", faqOne: "¿Esta página es gratuita?", faqTwo: "¿Es asesoramiento de inversión?", answerOne: "Sí. Es gratuita con fines educativos.", answerTwo: "No. No es asesoramiento financiero." },
  ar: { compound: "حاسبة الفائدة المركبة", dca: "حاسبة DCA", etf: "حاسبة استثمار ETF", voo: "حاسبة DCA لـ VOO", cspx: "حاسبة DCA لـ CSPX", titleSuffix: "دليل استثماري", estimate: "قدّر الاستثمار الشهري والنمو طويل الأجل لأغراض تعليمية.", learn: "تشرح هذه الصفحة الاستثمار الشهري وDCA وصناديق ETF والنمو المركب بطريقة واضحة.", sectionOne: "الفكرة الأساسية", sectionTwo: "الاستخدام للاستثمار الشهري", sectionThree: "فهم النمو طويل الأجل", sectionFour: "قيود مهمة", faqOne: "هل هذه الصفحة مجانية؟", faqTwo: "هل هي نصيحة استثمارية؟", answerOne: "نعم. الصفحة مجانية للأغراض التعليمية.", answerTwo: "لا. هذه ليست نصيحة مالية." },
  de: { compound: "Zinseszinsrechner", dca: "DCA-Rechner", etf: "ETF-Investment-Rechner", voo: "VOO-DCA-Rechner", cspx: "CSPX-DCA-Rechner", titleSuffix: "Investment-Leitfaden", estimate: "Schätzen Sie monatliche Investitionen und langfristiges Wachstum zu Bildungszwecken.", learn: "Diese Seite erklärt monatliches Investieren, DCA, ETFs und Zinseszinseffekt einfach und klar.", sectionOne: "Grundidee", sectionTwo: "Nutzung für monatliches Investieren", sectionThree: "Langfristiges Wachstum verstehen", sectionFour: "Wichtige Grenzen", faqOne: "Ist diese Seite kostenlos?", faqTwo: "Ist das Anlageberatung?", answerOne: "Ja. Sie ist zu Bildungszwecken kostenlos nutzbar.", answerTwo: "Nein. Es ist keine Finanzberatung." },
  ta: { compound: "கூட்டு வட்டி கணிப்பான்", dca: "DCA கணிப்பான்", etf: "ETF முதலீட்டு கணிப்பான்", voo: "VOO DCA கணிப்பான்", cspx: "CSPX DCA கணிப்பான்", titleSuffix: "முதலீட்டு வழிகாட்டி", estimate: "கல்வி நோக்கத்திற்காக மாதாந்திர முதலீடு மற்றும் நீண்டகால வளர்ச்சியை மதிப்பிடுங்கள்.", learn: "இந்த பக்கம் மாதாந்திர முதலீடு, DCA, ETF மற்றும் கூட்டு வளர்ச்சியை எளிதாக விளக்குகிறது.", sectionOne: "அடிப்படை கருத்து", sectionTwo: "மாதாந்திர முதலீட்டில் பயன்பாடு", sectionThree: "நீண்டகால வளர்ச்சியைப் புரிதல்", sectionFour: "முக்கிய வரம்புகள்", faqOne: "இந்த பக்கம் இலவசமா?", faqTwo: "இது முதலீட்டு ஆலோசனையா?", answerOne: "ஆம். கல்வி நோக்கத்திற்காக இலவசமாகப் பார்க்கலாம்.", answerTwo: "இல்லை. இது நிதி ஆலோசனை அல்ல." },
};

const comparisonDefinitions: Record<
  ComparisonSeoPageSlug,
  { assetA: string; assetB: string; theme: "comparison" | "calculator" }
> = {
  "voo-vs-cspx": { assetA: "VOO", assetB: "CSPX", theme: "comparison" },
  "voo-vs-qqq": { assetA: "VOO", assetB: "QQQ", theme: "comparison" },
  "dca-vs-lump-sum": { assetA: "DCA", assetB: "Lump Sum", theme: "comparison" },
  "cspx-vs-vwra": { assetA: "CSPX", assetB: "VWRA", theme: "comparison" },
  "iwda-vs-vwra": { assetA: "IWDA", assetB: "VWRA", theme: "comparison" },
  "etf-comparison-calculator": {
    assetA: "ETF",
    assetB: "ETF",
    theme: "calculator",
  },
};

type ComparisonLocaleText = {
  title: (assetA: string, assetB: string) => string;
  calculatorTitle: string;
  description: (assetA: string, assetB: string) => string;
  calculatorDescription: string;
  h1: (assetA: string, assetB: string) => string;
  calculatorH1: string;
  intro: (assetA: string, assetB: string) => string;
  calculatorIntro: string;
  keyTitle: string;
  keyBody: (assetA: string, assetB: string) => string;
  calculatorKeyBody: string;
  dcaTitle: string;
  dcaBody: (assetA: string, assetB: string) => string;
  calculatorDcaBody: string;
  riskTitle: string;
  riskBody: string;
  dataTitle: string;
  dataBody: string;
  faqBetter: (assetA: string, assetB: string) => string;
  faqBetterAnswer: (assetA: string, assetB: string) => string;
  faqDca: string;
  faqDcaAnswer: string;
  faqAdvice: string;
  faqAdviceAnswer: string;
};

const comparisonText: Partial<Record<Locale, ComparisonLocaleText>> = {
  en: {
    title: (a, b) => `${a} vs ${b} | ETF DCA Comparison Calculator`,
    calculatorTitle: "ETF Comparison Calculator | Compare ETF DCA Backtests",
    description: (a, b) =>
      `Compare ${a} and ${b} for educational ETF DCA backtesting. Learn key differences and test monthly investing scenarios.`,
    calculatorDescription:
      "Compare ETF DCA backtests using the same monthly investment amount, time period, and display currency.",
    h1: (a, b) => `${a} vs ${b}`,
    calculatorH1: "ETF Comparison Calculator",
    intro: (a, b) =>
      `Use this educational guide to compare ${a} and ${b} before testing both assets with the DCA comparison calculator.`,
    calculatorIntro:
      "Compare two ETFs or assets with the same monthly investment amount and time period using the DCA Backtest comparison tool.",
    keyTitle: "Key differences",
    keyBody: (a, b) =>
      `${a} and ${b} may differ by index exposure, fund domicile, currency, fees, dividend treatment, trading venue, and tax considerations. Neither fund is always better; the right comparison depends on the investor and assumptions.`,
    calculatorKeyBody:
      "An ETF comparison calculator helps compare assets side by side, but it should be used as an educational tool rather than a recommendation engine.",
    dcaTitle: "How to compare DCA backtests",
    dcaBody: (a, b) =>
      `Use the same monthly amount, start year, end year, and display currency for ${a} and ${b}. This keeps the comparison focused on asset performance instead of different contribution assumptions.`,
    calculatorDcaBody:
      "Select two assets, enter a monthly amount, choose a start and end year, and review final value, profit, return, difference, and the higher historical final value for that period.",
    riskTitle: "Risk and result limitations",
    riskBody:
      "Results can change with time period, fund fees, taxes, exchange rates, dividends, spreads, execution prices, tracking error, data availability, and market performance. This content is educational only and not financial advice.",
    dataTitle: "Historical data and sample data",
    dataBody:
      "When historical CSV data is available, the calculator uses monthly prices generated from historical daily adjusted close data. When unavailable, it clearly labels sample data.",
    faqBetter: (a, b) => `Is ${a} better than ${b}?`,
    faqBetterAnswer: (a, b) =>
      `Not always. ${a} and ${b} can perform differently depending on the period, fees, taxes, currency, dividends, and market conditions.`,
    faqDca: "Can I backtest both assets with the same monthly amount?",
    faqDcaAnswer:
      "Yes. The comparison tool uses the same monthly investment amount and time period for both selected assets.",
    faqAdvice: "Is this page investment advice?",
    faqAdviceAnswer:
      "No. This page and calculator are for educational purposes only and are not financial advice.",
  },
  "zh-CN": {
    title: (a, b) => `${a} vs ${b} | ETF定投对比计算器`,
    calculatorTitle: "ETF对比计算器 | 对比ETF定投回测",
    description: (a, b) => `对比 ${a} 和 ${b} 的 ETF 定投回测，了解关键差异并测试每月定投情景。`,
    calculatorDescription: "使用相同每月投入金额、投资期间和显示货币，对比 ETF 定投回测结果。",
    h1: (a, b) => `${a} vs ${b}`,
    calculatorH1: "ETF对比计算器",
    intro: (a, b) => `在使用 DCA 对比工具前，先了解 ${a} 和 ${b} 的教育性对比重点。`,
    calculatorIntro: "用 DCA 定投对比工具，在相同每月投入和相同期间下比较两个 ETF 或资产。",
    keyTitle: "关键差异",
    keyBody: (a, b) => `${a} 和 ${b} 可能在指数敞口、基金注册地、货币、费用、分红处理、交易市场和税务因素上不同。没有一个基金永远更好，结果取决于投资者和假设。`,
    calculatorKeyBody: "ETF 对比计算器可以并排比较资产，但它是教育工具，不是投资推荐系统。",
    dcaTitle: "如何对比定投回测",
    dcaBody: (a, b) => `对 ${a} 和 ${b} 使用相同每月金额、开始年份、结束年份和显示货币，这样对比更集中在资产表现而不是投入假设。`,
    calculatorDcaBody: "选择两个资产，输入每月金额和起止年份，查看最终价值、利润、回报、差额以及该期间历史最终价值较高的资产。",
    riskTitle: "风险与结果限制",
    riskBody: "结果会受到时间区间、基金费用、税务、汇率、分红、价差、成交价、跟踪误差、数据可用性和市场表现影响。本内容仅供教育用途，不构成金融建议。",
    dataTitle: "历史数据与示例数据",
    dataBody: "有历史 CSV 数据时，计算器使用由历史每日调整收盘价生成的月度价格。没有数据时，会明确标记示例数据。",
    faqBetter: (a, b) => `${a} 一定比 ${b} 更好吗？`,
    faqBetterAnswer: (a, b) => `不一定。${a} 和 ${b} 的表现会因期间、费用、税务、货币、分红和市场环境而不同。`,
    faqDca: "可以用相同每月金额回测两个资产吗？",
    faqDcaAnswer: "可以。对比工具会对两个资产使用相同每月投入金额和相同投资期间。",
    faqAdvice: "这个页面是投资建议吗？",
    faqAdviceAnswer: "不是。本页面和计算器仅供教育用途，不构成金融建议。",
  },
  "zh-TW": {
    title: (a, b) => `${a} vs ${b} | ETF定投對比計算器`,
    calculatorTitle: "ETF對比計算器 | 對比ETF定投回測",
    description: (a, b) => `對比 ${a} 和 ${b} 的 ETF 定投回測，了解關鍵差異並測試每月定投情境。`,
    calculatorDescription: "使用相同每月投入金額、投資期間和顯示貨幣，對比 ETF 定投回測結果。",
    h1: (a, b) => `${a} vs ${b}`,
    calculatorH1: "ETF對比計算器",
    intro: (a, b) => `在使用 DCA 對比工具前，先了解 ${a} 和 ${b} 的教育性對比重點。`,
    calculatorIntro: "用 DCA Backtest 對比工具，在相同每月投入和相同期間下比較兩個 ETF 或資產。",
    keyTitle: "關鍵差異",
    keyBody: (a, b) => `${a} 和 ${b} 可能在指數曝險、基金註冊地、貨幣、費用、配息處理、交易市場和稅務因素上不同。沒有一個基金永遠更好，結果取決於投資者和假設。`,
    calculatorKeyBody: "ETF 對比計算器可以並排比較資產，但它是教育工具，不是投資推薦系統。",
    dcaTitle: "如何對比定投回測",
    dcaBody: (a, b) => `對 ${a} 和 ${b} 使用相同每月金額、開始年份、結束年份和顯示貨幣，讓對比更集中在資產表現而不是投入假設。`,
    calculatorDcaBody: "選擇兩個資產，輸入每月金額和起止年份，查看最終價值、利潤、回報、差額以及該期間歷史最終價值較高的資產。",
    riskTitle: "風險與結果限制",
    riskBody: "結果會受到時間區間、基金費用、稅務、匯率、配息、價差、成交價、追蹤誤差、資料可用性和市場表現影響。本內容僅供教育用途，不構成金融建議。",
    dataTitle: "歷史資料與範例資料",
    dataBody: "有歷史 CSV 資料時，計算器使用由歷史每日調整收盤價生成的月度價格。沒有資料時，會明確標記範例資料。",
    faqBetter: (a, b) => `${a} 一定比 ${b} 更好嗎？`,
    faqBetterAnswer: (a, b) => `不一定。${a} 和 ${b} 的表現會因期間、費用、稅務、貨幣、配息和市場環境而不同。`,
    faqDca: "可以用相同每月金額回測兩個資產嗎？",
    faqDcaAnswer: "可以。對比工具會對兩個資產使用相同每月投入金額和相同投資期間。",
    faqAdvice: "這個頁面是投資建議嗎？",
    faqAdviceAnswer: "不是。本頁面和計算器僅供教育用途，不構成金融建議。",
  },
};

type ComparisonPhrasePack = {
  description: (assetA: string, assetB: string, label: string) => string;
  calculatorDescription: (title: string) => string;
  intro: (compareWord: string, assetA: string, assetB: string) => string;
  calculatorIntro: (title: string) => string;
  keyBody: (assetA: string, assetB: string) => string;
  calculatorKeyBody: string;
  dcaTitle: string;
  dcaBody: (assetA: string, assetB: string) => string;
  calculatorDcaBody: string;
  riskTitle: string;
  riskBody: (disclaimer: string) => string;
  dataTitle: string;
  dataBody: string;
  faqBetterAnswer: (assetA: string, assetB: string) => string;
  faqDca: string;
  faqDcaAnswer: string;
  faqAdvice: string;
};

const comparisonPhrases: Record<Locale, ComparisonPhrasePack> = {
  en: {
    description: (a, b, label) => `${a} and ${b}: ${label} for educational DCA backtesting.`,
    calculatorDescription: (title) => `${title}: compare assets with the same monthly amount and time period.`,
    intro: (word, a, b) => `${word} ${a} and ${b} with an educational DCA backtest guide.`,
    calculatorIntro: (title) => `${title} for comparing two ETFs or assets with matching DCA assumptions.`,
    keyBody: (a, b) => `${a} and ${b} can differ by index exposure, domicile, currency, fees, dividends, taxes, and trading venue. No ETF is always better.`,
    calculatorKeyBody: "The calculator compares two assets side by side for education and does not make recommendations.",
    dcaTitle: "DCA backtest",
    dcaBody: (a, b) => `Use the same monthly amount and time period for ${a} and ${b} to make the comparison clearer.`,
    calculatorDcaBody: "Choose two assets, monthly amount, start year, end year, and currency to compare DCA results.",
    riskTitle: "Risk and disclaimer",
    riskBody: (disclaimer) => `${disclaimer} Results depend on time period, fees, taxes, currency, dividends, data availability, and market performance.`,
    dataTitle: "Data source",
    dataBody: "Historical data is used where available. If unavailable, the calculator clearly shows sample data.",
    faqBetterAnswer: (a, b) => `${a} and ${b} can perform differently depending on the selected period and assumptions.`,
    faqDca: "Can I compare with DCA?",
    faqDcaAnswer: "Yes. Use the same monthly amount and time period for both assets.",
    faqAdvice: "Is this advice?",
  },
  "zh-CN": {
    description: (a, b, label) => `${a} 和 ${b} 的${label}，用于教育性 DCA 回测。`,
    calculatorDescription: (title) => `${title}：使用相同每月投入金额和投资期间对比资产。`,
    intro: (_word, a, b) => `对比 ${a} 和 ${b}，并了解如何用 DCA 回测工具测试相同投入假设。`,
    calculatorIntro: (title) => `${title}，用于在相同 DCA 假设下对比两个 ETF 或资产。`,
    keyBody: (a, b) => `${a} 和 ${b} 可能在指数敞口、注册地、货币、费用、分红、税务和交易市场方面不同。没有一个 ETF 永远更好。`,
    calculatorKeyBody: "此工具用于教育性地并排比较两个资产，不提供投资推荐。",
    dcaTitle: "DCA 回测",
    dcaBody: (a, b) => `对 ${a} 和 ${b} 使用相同每月金额和相同期间，可以让对比更清晰。`,
    calculatorDcaBody: "选择两个资产、每月金额、开始年份、结束年份和货币，即可对比 DCA 结果。",
    riskTitle: "风险与免责声明",
    riskBody: (d) => `${d} 结果取决于时间区间、费用、税务、货币、分红、数据可用性和市场表现。`,
    dataTitle: "数据来源",
    dataBody: "有历史数据时会使用历史数据；没有数据时，计算器会明确显示示例数据。",
    faqBetterAnswer: (a, b) => `${a} 和 ${b} 的表现会因所选期间和假设而不同。`,
    faqDca: "可以用 DCA 对比吗？",
    faqDcaAnswer: "可以。请对两个资产使用相同每月金额和相同期间。",
    faqAdvice: "这是投资建议吗？",
  },
  "zh-TW": {
    description: (a, b, label) => `${a} 和 ${b} 的${label}，用於教育性 DCA 回測。`,
    calculatorDescription: (title) => `${title}：使用相同每月投入金額和投資期間對比資產。`,
    intro: (_word, a, b) => `對比 ${a} 和 ${b}，並了解如何用 DCA 回測工具測試相同投入假設。`,
    calculatorIntro: (title) => `${title}，用於在相同 DCA 假設下對比兩個 ETF 或資產。`,
    keyBody: (a, b) => `${a} 和 ${b} 可能在指數曝險、註冊地、貨幣、費用、配息、稅務和交易市場方面不同。沒有一個 ETF 永遠更好。`,
    calculatorKeyBody: "此工具用於教育性地並排比較兩個資產，不提供投資推薦。",
    dcaTitle: "DCA 回測",
    dcaBody: (a, b) => `對 ${a} 和 ${b} 使用相同每月金額和相同期間，可以讓對比更清晰。`,
    calculatorDcaBody: "選擇兩個資產、每月金額、開始年份、結束年份和貨幣，即可對比 DCA 結果。",
    riskTitle: "風險與免責聲明",
    riskBody: (d) => `${d} 結果取決於時間區間、費用、稅務、貨幣、配息、資料可用性和市場表現。`,
    dataTitle: "資料來源",
    dataBody: "有歷史資料時會使用歷史資料；沒有資料時，計算器會明確顯示範例資料。",
    faqBetterAnswer: (a, b) => `${a} 和 ${b} 的表現會因所選期間和假設而不同。`,
    faqDca: "可以用 DCA 對比嗎？",
    faqDcaAnswer: "可以。請對兩個資產使用相同每月金額和相同期間。",
    faqAdvice: "這是投資建議嗎？",
  },
  ms: {
    description: (a, b, label) => `${label} ${a} dan ${b} untuk ujian balik DCA pendidikan.`,
    calculatorDescription: (title) => `${title}: bandingkan aset dengan jumlah bulanan dan tempoh masa yang sama.`,
    intro: (word, a, b) => `${word} ${a} dan ${b} dengan panduan ujian balik DCA pendidikan.`,
    calculatorIntro: (title) => `${title} untuk membandingkan dua ETF atau aset dengan andaian DCA yang sama.`,
    keyBody: (a, b) => `${a} dan ${b} boleh berbeza dari segi pendedahan indeks, domisil, mata wang, yuran, dividen, cukai dan tempat dagangan. Tiada ETF yang sentiasa lebih baik.`,
    calculatorKeyBody: "Kalkulator ini membandingkan dua aset secara sebelah menyebelah untuk pendidikan dan tidak memberi cadangan.",
    dcaTitle: "Ujian balik DCA",
    dcaBody: (a, b) => `Gunakan jumlah bulanan dan tempoh masa yang sama untuk ${a} dan ${b} supaya perbandingan lebih jelas.`,
    calculatorDcaBody: "Pilih dua aset, jumlah bulanan, tahun mula, tahun akhir dan mata wang untuk membandingkan keputusan DCA.",
    riskTitle: "Risiko dan penafian",
    riskBody: (d) => `${d} Keputusan bergantung pada tempoh masa, yuran, cukai, mata wang, dividen, ketersediaan data dan prestasi pasaran.`,
    dataTitle: "Sumber data",
    dataBody: "Data sejarah digunakan apabila tersedia. Jika tidak tersedia, kalkulator memaparkan data sampel dengan jelas.",
    faqBetterAnswer: (a, b) => `${a} dan ${b} boleh menunjukkan prestasi berbeza bergantung pada tempoh dan andaian yang dipilih.`,
    faqDca: "Bolehkah saya bandingkan dengan DCA?",
    faqDcaAnswer: "Ya. Gunakan jumlah bulanan dan tempoh masa yang sama untuk kedua-dua aset.",
    faqAdvice: "Adakah ini nasihat?",
  },
  id: {
    description: (a, b, label) => `${label} ${a} dan ${b} untuk backtest DCA edukatif.`,
    calculatorDescription: (title) => `${title}: bandingkan aset dengan jumlah bulanan dan periode yang sama.`,
    intro: (word, a, b) => `${word} ${a} dan ${b} dengan panduan backtest DCA edukatif.`,
    calculatorIntro: (title) => `${title} untuk membandingkan dua ETF atau aset dengan asumsi DCA yang sama.`,
    keyBody: (a, b) => `${a} dan ${b} dapat berbeda dari sisi eksposur indeks, domisili, mata uang, biaya, dividen, pajak, dan tempat perdagangan. Tidak ada ETF yang selalu lebih baik.`,
    calculatorKeyBody: "Kalkulator ini membandingkan dua aset berdampingan untuk edukasi dan tidak memberi rekomendasi.",
    dcaTitle: "Backtest DCA",
    dcaBody: (a, b) => `Gunakan jumlah bulanan dan periode yang sama untuk ${a} dan ${b} agar perbandingan lebih jelas.`,
    calculatorDcaBody: "Pilih dua aset, jumlah bulanan, tahun mulai, tahun akhir, dan mata uang untuk membandingkan hasil DCA.",
    riskTitle: "Risiko dan penafian",
    riskBody: (d) => `${d} Hasil bergantung pada periode, biaya, pajak, mata uang, dividen, ketersediaan data, dan kinerja pasar.`,
    dataTitle: "Sumber data",
    dataBody: "Data historis digunakan jika tersedia. Jika tidak tersedia, kalkulator menampilkan data sampel dengan jelas.",
    faqBetterAnswer: (a, b) => `${a} dan ${b} dapat berkinerja berbeda tergantung periode dan asumsi yang dipilih.`,
    faqDca: "Bisakah saya membandingkan dengan DCA?",
    faqDcaAnswer: "Ya. Gunakan jumlah bulanan dan periode yang sama untuk kedua aset.",
    faqAdvice: "Apakah ini nasihat?",
  },
  ja: phrasePack("教育用DCAバックテスト", "同じ毎月投資額と期間で資産を比較します。", "比較", "DCAバックテスト", "リスクと免責事項", "データソース", "これは助言ですか？"),
  ko: phrasePack("교육용 DCA 백테스트", "같은 월 투자금과 기간으로 자산을 비교합니다.", "비교", "DCA 백테스트", "위험 및 고지", "데이터 출처", "조언인가요?"),
  ru: phrasePack("образовательного DCA-бэктеста", "Сравнивайте активы с одинаковой ежемесячной суммой и периодом.", "Сравнение", "DCA-бэктест", "Риски и отказ от ответственности", "Источник данных", "Это рекомендация?"),
  fr: phrasePack("backtest DCA éducatif", "Comparez les actifs avec le même montant mensuel et la même période.", "Comparer", "Backtest DCA", "Risques et avertissement", "Source des données", "Est-ce un conseil ?"),
  it: phrasePack("backtest DCA educativo", "Confronta asset con lo stesso importo mensile e lo stesso periodo.", "Confronto", "Backtest DCA", "Rischi e avvertenza", "Fonte dati", "È consulenza?"),
  es: phrasePack("backtest DCA educativo", "Compara activos con el mismo importe mensual y el mismo periodo.", "Comparar", "Backtest DCA", "Riesgos y aviso", "Fuente de datos", "¿Es asesoramiento?"),
  ar: phrasePack("اختبار DCA تعليمي", "قارن الأصول بالمبلغ الشهري نفسه والفترة نفسها.", "مقارنة", "اختبار DCA", "المخاطر وإخلاء المسؤولية", "مصدر البيانات", "هل هذه نصيحة؟"),
  de: phrasePack("pädagogischen DCA-Backtest", "Vergleichen Sie Assets mit demselben Monatsbetrag und Zeitraum.", "Vergleich", "DCA-Backtest", "Risiken und Hinweis", "Datenquelle", "Ist das Beratung?"),
  ta: phrasePack("கல்வி DCA பின்சோதனை", "அதே மாதாந்திர தொகை மற்றும் காலத்துடன் சொத்துகளை ஒப்பிடுங்கள்.", "ஒப்பீடு", "DCA பின்சோதனை", "அபாயம் மற்றும் மறுப்பு", "தரவு மூலம்", "இது ஆலோசனையா?"),
};

function getComparisonPhrases(locale: Locale): ComparisonPhrasePack {
  return comparisonPhrases[locale] ?? comparisonPhrases.en;
}

const localizedComparisonText: Record<Locale, ComparisonLocaleText> = {
  en: comparisonText.en!,
  "zh-CN": comparisonText["zh-CN"]!,
  "zh-TW": comparisonText["zh-TW"]!,
  ms: comparisonLocale("Bandingkan", "Kalkulator Perbandingan ETF", "Perbandingan ETF", "Halaman ini untuk pendidikan sahaja dan bukan nasihat kewangan.", "ms"),
  id: comparisonLocale("Bandingkan", "Kalkulator Perbandingan ETF", "Perbandingan ETF", "Halaman ini hanya untuk edukasi dan bukan nasihat keuangan.", "id"),
  ja: comparisonLocale("比較", "ETF比較計算機", "ETF比較", "このページは教育目的のみであり、金融助言ではありません。", "ja"),
  ko: comparisonLocale("비교", "ETF 비교 계산기", "ETF 비교", "이 페이지는 교육 목적이며 금융 조언이 아닙니다.", "ko"),
  ru: comparisonLocale("Сравнение", "ETF-калькулятор сравнения", "Сравнение ETF", "Эта страница предназначена только для образовательных целей и не является финансовой рекомендацией.", "ru"),
  fr: comparisonLocale("Comparer", "Calculateur de comparaison ETF", "Comparaison ETF", "Cette page est fournie à des fins éducatives uniquement et ne constitue pas un conseil financier.", "fr"),
  it: comparisonLocale("Confronto", "Calcolatore confronto ETF", "Confronto ETF", "Questa pagina è solo a scopo educativo e non costituisce consulenza finanziaria.", "it"),
  es: comparisonLocale("Comparar", "Calculadora de comparación ETF", "Comparación ETF", "Esta página es solo educativa y no es asesoramiento financiero.", "es"),
  ar: comparisonLocale("مقارنة", "حاسبة مقارنة ETF", "مقارنة ETF", "هذه الصفحة تعليمية فقط وليست نصيحة مالية.", "ar"),
  de: comparisonLocale("Vergleich", "ETF-Vergleichsrechner", "ETF-Vergleich", "Diese Seite dient nur Bildungszwecken und ist keine Finanzberatung.", "de"),
  ta: comparisonLocale("ஒப்பீடு", "ETF ஒப்பீட்டு கணிப்பான்", "ETF ஒப்பீடு", "இந்த பக்கம் கல்வி நோக்கத்திற்காக மட்டுமே; இது நிதி ஆலோசனை அல்ல.", "ta"),
};

function phrasePack(
  educationalBacktest: string,
  calculatorDescription: string,
  compareWord: string,
  dcaTitle: string,
  riskTitle: string,
  dataTitle: string,
  faqAdvice: string
): ComparisonPhrasePack {
  return {
    description: (a, b, label) => `${a} vs ${b}: ${label} ${educationalBacktest}.`,
    calculatorDescription: (title) => `${title}: ${calculatorDescription}`,
    intro: (_word, a, b) => `${compareWord} ${a} vs ${b}. ${calculatorDescription}`,
    calculatorIntro: (title) => `${title}. ${calculatorDescription}`,
    keyBody: (a, b) => `${a} vs ${b}: ${calculatorDescription}`,
    calculatorKeyBody: calculatorDescription,
    dcaTitle,
    dcaBody: (a, b) => `${a} vs ${b}: ${calculatorDescription}`,
    calculatorDcaBody: calculatorDescription,
    riskTitle,
    riskBody: (disclaimer) => disclaimer,
    dataTitle,
    dataBody: calculatorDescription,
    faqBetterAnswer: (a, b) => `${a} vs ${b}: ${calculatorDescription}`,
    faqDca: dcaTitle,
    faqDcaAnswer: calculatorDescription,
    faqAdvice,
  };
}

function comparisonLocale(
  compareWord: string,
  calculatorTitle: string,
  comparisonLabel: string,
  disclaimer: string,
  locale: Locale
): ComparisonLocaleText {
  const phrases = getComparisonPhrases(locale);

  return {
    title: (assetA, assetB) => `${assetA} vs ${assetB} | ${comparisonLabel}`,
    calculatorTitle,
    description: (assetA, assetB) =>
      phrases.description(assetA, assetB, comparisonLabel),
    calculatorDescription: phrases.calculatorDescription(calculatorTitle),
    h1: (assetA, assetB) => `${assetA} vs ${assetB}`,
    calculatorH1: calculatorTitle,
    intro: (assetA, assetB) =>
      phrases.intro(compareWord, assetA, assetB),
    calculatorIntro: phrases.calculatorIntro(calculatorTitle),
    keyTitle: comparisonLabel,
    keyBody: (assetA, assetB) =>
      phrases.keyBody(assetA, assetB),
    calculatorKeyBody: phrases.calculatorKeyBody,
    dcaTitle: phrases.dcaTitle,
    dcaBody: (assetA, assetB) =>
      phrases.dcaBody(assetA, assetB),
    calculatorDcaBody: phrases.calculatorDcaBody,
    riskTitle: phrases.riskTitle,
    riskBody: phrases.riskBody(disclaimer),
    dataTitle: phrases.dataTitle,
    dataBody: phrases.dataBody,
    faqBetter: (assetA, assetB) => `${assetA} vs ${assetB}?`,
    faqBetterAnswer: (assetA, assetB) =>
      phrases.faqBetterAnswer(assetA, assetB),
    faqDca: phrases.faqDca,
    faqDcaAnswer: phrases.faqDcaAnswer,
    faqAdvice: phrases.faqAdvice,
    faqAdviceAnswer: disclaimer,
  };
}

function getEnglishComparisonPage(slug: ComparisonSeoPageSlug): SeoPageContent {
  const pages: Record<ComparisonSeoPageSlug, SeoPageContent> = {
    "voo-vs-cspx": {
      title: "VOO vs CSPX | S&P 500 ETF DCA Comparison Guide",
      description:
        "Compare VOO and CSPX for educational S&P 500 ETF DCA backtesting, including listing market, domicile, currency, dividends, taxes, fees, and data limits.",
      h1: "VOO vs CSPX",
      intro:
        "VOO and CSPX are both commonly used for S&P 500 exposure, but they are not identical in structure. VOO is U.S.-listed, while CSPX is an Ireland-domiciled UCITS ETF listed on the London Stock Exchange. This page explains the practical differences and how to compare them with a DCA backtest.",
      sections: [
        {
          title: "What VOO and CSPX are",
          body: "VOO is the Vanguard S&P 500 ETF listed in the United States. It is designed to track the S&P 500 Index, which represents large U.S. companies across major sectors. CSPX is an iShares Core S&P 500 UCITS ETF share class that is Ireland-domiciled and commonly traded on the London Stock Exchange. Both seek broad U.S. large-cap exposure, but the fund domicile, exchange listing, tax treatment, dividend policy, trading currency, and broker availability may differ for each investor.",
        },
        {
          title: "Who may find this comparison useful",
          body: "A VOO vs CSPX comparison can be useful for investors who want S&P 500 exposure but have access to different markets or account types. U.S.-based investors may naturally see VOO on U.S. platforms. Non-U.S. investors may compare UCITS ETFs such as CSPX because of local platform availability, Ireland fund domicile, accumulating share classes, withholding-tax considerations, estate-tax concerns, or settlement currency. None of those factors makes either ETF universally better; they simply change the questions a user should study.",
        },
        {
          title: "Example use case",
          body: "A user might compare investing $500 per month into VOO versus CSPX from 2018 to 2025. The comparison tool applies the same monthly amount and same date range to both assets, then shows final value, total return, profit, annualized return estimate, drawdown, and final-value difference. This helps separate asset and data behavior from contribution assumptions. The result is still only one historical window, not a rule for the future.",
        },
        {
          title: "How the DCA backtest works",
          body: "Where historical CSV data is available, the calculator uses monthly prices generated from historical daily adjusted close data. A monthly contribution is converted into estimated shares for each month, and the accumulated shares are valued at the final monthly price. If data is unavailable for one asset, the tool clearly labels sample data. Because VOO and CSPX can trade in different markets and currencies, users should pay attention to display currency, source data, and whether the data reflects the exact share class they intend to study.",
        },
        {
          title: "Currency, tax, dividend, and platform limitations",
          body: "VOO and CSPX may differ in trading currency, dividend treatment, fund expenses, spreads, withholding tax, estate tax exposure, local tax reporting, broker access, and exchange hours. CSPX is often discussed as an accumulating UCITS ETF, while VOO is a U.S.-listed ETF that generally distributes dividends. Actual outcomes can vary by country, broker, account type, dividend reinvestment assumptions, currency conversion cost, and execution price. The calculator cannot model every local tax rule or platform constraint.",
        },
        {
          title: "Risk and disclaimer",
          body: "This comparison is educational only and is not financial advice, tax advice, legal advice, or an investment recommendation. Neither VOO nor CSPX is always better for every investor. Past performance does not guarantee future results, and historical prices may be delayed, adjusted, incomplete, or different from official fund NAV or broker records.",
        },
      ],
      faqs: [
        {
          question: "Do VOO and CSPX both target S&P 500 exposure?",
          answer:
            "Yes, both are designed around S&P 500 exposure, but the fund structure, domicile, exchange listing, dividend treatment, and investor tax experience can differ.",
        },
        {
          question: "Why might non-U.S. investors compare CSPX with VOO?",
          answer:
            "Some compare them because UCITS structure, Ireland domicile, broker access, withholding tax, estate tax exposure, accumulating dividends, and settlement currency may affect real-world outcomes.",
        },
        {
          question: "Can the VOO vs CSPX backtest show which ETF is always better?",
          answer:
            "No. It can show historical results for the chosen assumptions and period, but it cannot prove that one ETF is always better.",
        },
        {
          question: "Does this comparison include every tax and dividend detail?",
          answer:
            "No. Real results can differ because of dividend timing, withholding tax, local taxes, fees, spreads, execution price, and currency conversion.",
        },
      ],
    },
    "voo-vs-qqq": {
      title: "VOO vs QQQ | S&P 500 vs Nasdaq 100 DCA Comparison",
      description:
        "Compare VOO and QQQ for educational DCA backtesting, including S&P 500 vs Nasdaq-100 exposure, sector concentration, volatility, fees, dividends, and risk.",
      h1: "VOO vs QQQ",
      intro:
        "VOO and QQQ are both popular U.S.-listed ETFs, but they are built around different indexes. VOO tracks broad S&P 500 exposure, while QQQ tracks the Nasdaq-100 and can be more concentrated in technology and growth-oriented companies.",
      sections: [
        {
          title: "What VOO and QQQ are",
          body: "VOO is a Vanguard ETF designed to track the S&P 500 Index, which includes large U.S. companies across multiple sectors. QQQ is the Invesco QQQ Trust, which tracks the Nasdaq-100 Index. The Nasdaq-100 excludes financial companies and often has heavier exposure to technology, communication services, and large growth companies. Because the underlying indexes are different, a VOO vs QQQ backtest is not just comparing two tickers; it is comparing two styles of U.S. equity exposure.",
        },
        {
          title: "Who this comparison is useful for",
          body: "This comparison is useful for users who want to understand how broad-market exposure and Nasdaq-100 exposure behaved under the same DCA assumptions. It can also help users study concentration risk, drawdowns, valuation cycles, and the effect of different sector weights. The page does not recommend VOO or QQQ; it gives context for using the calculator responsibly.",
        },
        {
          title: "Example use case",
          body: "A user might test investing $1,000 per month from 2015 to 2025 into VOO and QQQ. The comparison keeps the monthly amount and time period the same, then shows how the two historical paths differed. In some periods, growth-heavy exposure may look stronger; in others, concentration and drawdowns can matter more. Changing the start or end date can materially change the outcome.",
        },
        {
          title: "How the backtest works",
          body: "The DCA backtest converts each monthly contribution into estimated shares using monthly prices generated from historical daily adjusted close data where available. It then calculates final value, total invested, profit, total return, annualized return estimate, and max drawdown. A comparison chart shows how both portfolios changed over time. If data is unavailable, the tool labels sample data rather than presenting it as real historical performance.",
        },
        {
          title: "Fees, dividends, taxes, and currency limitations",
          body: "VOO and QQQ can have different expense ratios, dividend yields, holdings, index rules, spreads, and tax characteristics. Real investor returns may also differ because of dividend reinvestment timing, brokerage fees, withholding tax, local tax rules, execution price, and currency conversion. The calculator is useful for comparing historical price-based scenarios, but it cannot capture every account-level detail.",
        },
        {
          title: "Risk and disclaimer",
          body: "VOO and QQQ can perform very differently because market leadership changes over time. A strong historical period for Nasdaq-100 exposure does not guarantee future results. This page is educational only, not financial advice, and not a recommendation to buy, sell, or hold either ETF.",
        },
      ],
      faqs: [
        {
          question: "Is QQQ more concentrated than VOO?",
          answer:
            "Generally yes. QQQ tracks the Nasdaq 100 and often has heavier technology exposure, while VOO tracks the broader S&P 500.",
        },
        {
          question: "Why can VOO and QQQ perform very differently?",
          answer:
            "Yes. Sector weights, valuation cycles, volatility, and index rules can create large differences across selected periods.",
        },
        {
          question: "Does a higher historical final value mean an ETF is better?",
          answer:
            "No. A higher final value in one period is historical information only. Future performance, risk, fees, taxes, and personal circumstances can differ.",
        },
        {
          question: "Should I choose VOO or QQQ based only on a backtest?",
          answer:
            "No. A backtest is educational. Diversification, fees, taxes, risk tolerance, and investment goals also matter.",
        },
      ],
    },
    "dca-vs-lump-sum": {
      title: "DCA vs Lump Sum | Monthly Investing vs Upfront Investment",
      description:
        "Compare dollar-cost averaging and lump sum investing using the same total contribution assumption, with educational notes on timing, emotion, fees, and risk.",
      h1: "DCA vs Lump Sum",
      intro:
        "DCA and lump sum investing answer different timing questions. DCA invests gradually over time, while lump sum invests the full contribution upfront. This page explains how to compare both approaches with the same total contribution assumption.",
      sections: [
        {
          title: "What DCA and lump sum mean",
          body: "Dollar-cost averaging invests a fixed amount on a regular schedule, such as monthly. Lump sum investing places the full available amount into the market at the beginning of the period. In the calculator, the comparison uses the same total contribution amount: if DCA invests $1,000 per month for 96 months, the lump sum scenario invests $96,000 upfront at the first available price.",
        },
        {
          title: "Who this comparison is useful for",
          body: "A DCA vs lump sum comparison is useful for users studying market timing, contribution behavior, emotional risk, and opportunity cost. Some people prefer DCA because it spreads entry points and may feel easier during volatile markets. Others study lump sum investing because markets have historically risen over many long periods, so earlier exposure can matter. The calculator helps compare scenarios without claiming one method is always superior.",
        },
        {
          title: "Example use case",
          body: "Imagine comparing $500 per month from 2018 to 2025 with investing the same total amount at the start of 2018. The DCA scenario buys gradually at different prices. The lump sum scenario buys once and then remains fully invested. If the market rises strongly soon after the start date, lump sum may show a higher historical final value. If the market falls early, DCA may benefit from buying more shares at lower prices. The answer depends heavily on start date, end date, volatility, and fees.",
        },
        {
          title: "How the backtest works",
          body: "The DCA scenario uses the existing monthly investment logic. Each month, the contribution is reduced by any selected fixed or percentage fee, then converted into estimated shares. The lump sum scenario invests the same total contribution upfront, with fees applied once. Both portfolios are valued across the same historical price series so users can compare final value, profit, annualized return estimate, CAGR for lump sum where applicable, max drawdown, and the difference in final value.",
        },
        {
          title: "Fees, currency, dividends, and taxes",
          body: "Fees can affect DCA and lump sum differently because DCA may pay transaction costs monthly, while lump sum may pay a fee once. Currency conversion, dividend reinvestment, withholding taxes, local taxes, spreads, execution price, and broker rules can all change real-world results. Display currency is for presentation and does not replace actual exchange-rate or tax calculations.",
        },
        {
          title: "Risk and disclaimer",
          body: "This comparison is educational only and does not recommend DCA or lump sum investing. Historical results depend on the selected period and cannot predict future returns. Past performance does not guarantee future results. Users should verify important assumptions and consult a licensed adviser for personal financial, tax, or legal advice.",
        },
      ],
      faqs: [
        {
          question: "Does the DCA vs lump sum comparison use the same total contribution?",
          answer:
            "Yes. The lump sum scenario invests the same total amount that the DCA scenario contributes over the full selected period.",
        },
        {
          question: "Why can lump sum investing look better in some periods?",
          answer:
            "If prices rise early and continue rising, investing upfront can benefit from more time in the market. This is historical, not guaranteed.",
        },
        {
          question: "Why might DCA look better in other periods?",
          answer:
            "If prices fall after the start date, DCA may buy more shares at lower prices and reduce the impact of a poor initial entry point.",
        },
        {
          question: "Is DCA vs lump sum a recommendation?",
          answer:
            "No. It is a scenario comparison for education only and is not financial advice or an investment recommendation.",
        },
      ],
    },
    "cspx-vs-vwra": {
      title: "CSPX vs VWRA | UCITS ETF DCA Comparison",
      description:
        "Compare CSPX and VWRA for educational UCITS ETF DCA backtesting, including S&P 500 exposure, global diversification, domicile, dividends, and risk.",
      h1: "CSPX vs VWRA",
      intro:
        "CSPX and VWRA are both Ireland-domiciled UCITS ETFs, but CSPX focuses on the S&P 500 while VWRA targets global all-world equity exposure.",
      sections: [
        {
          title: "What CSPX and VWRA are",
          body: "CSPX is an accumulating UCITS ETF focused on S&P 500 exposure. VWRA is an accumulating UCITS ETF designed to track a global all-world index across developed and emerging markets.",
        },
        {
          title: "Key differences",
          body: "CSPX is concentrated in large U.S. companies. VWRA is globally diversified. Country weights, currency exposure, sector mix, fees, spreads, and index methodology can differ.",
        },
        {
          title: "DCA backtest explanation",
          body: "A DCA comparison can show whether U.S.-only exposure or global diversification performed better in a selected period. It does not prove which ETF is better for every investor.",
        },
        {
          title: "Risk and limitations",
          body: "Results can change with U.S. market cycles, global market returns, currency movements, fees, taxes, dividends, tracking difference, and data availability.",
        },
      ],
      faqs: [
        {
          question: "Is CSPX more U.S.-focused than VWRA?",
          answer:
            "Yes. CSPX targets S&P 500 exposure, while VWRA includes a broader global equity universe.",
        },
        {
          question: "Does VWRA provide more diversification?",
          answer:
            "VWRA is generally more globally diversified, but diversification does not guarantee higher returns or prevent losses.",
        },
        {
          question: "Are CSPX and VWRA accumulating UCITS ETFs?",
          answer:
            "Commonly referenced CSPX and VWRA share classes are accumulating UCITS ETFs, but investors should verify the exact ticker, exchange, and share class.",
        },
      ],
    },
    "iwda-vs-vwra": {
      title: "IWDA vs VWRA | Developed World vs All-World ETF Comparison",
      description:
        "Compare IWDA and VWRA for educational DCA backtesting, including developed markets, emerging markets, UCITS structure, fees, and risk.",
      h1: "IWDA vs VWRA",
      intro:
        "IWDA and VWRA are popular UCITS ETFs for global investing, but IWDA focuses on developed markets while VWRA includes developed and emerging markets.",
      sections: [
        {
          title: "What IWDA and VWRA are",
          body: "IWDA is an accumulating UCITS ETF focused on developed market equities. VWRA is an accumulating UCITS ETF that includes developed and emerging market exposure through an all-world index.",
        },
        {
          title: "Key differences",
          body: "IWDA excludes emerging markets, while VWRA includes them. This affects country weights, currency exposure, sector mix, volatility, and long-term return drivers.",
        },
        {
          title: "DCA backtest explanation",
          body: "Using the same monthly amount and period shows how developed-market-only exposure compared with all-world exposure for that historical window.",
        },
        {
          title: "Risk and limitations",
          body: "Emerging and developed markets rotate through different cycles. Real results can differ because of taxes, dividend handling, currency conversion, fees, spreads, and execution prices.",
        },
      ],
      faqs: [
        {
          question: "Does IWDA include emerging markets?",
          answer:
            "IWDA generally focuses on developed markets and does not provide the same emerging market exposure that VWRA includes.",
        },
        {
          question: "Why compare IWDA and VWRA?",
          answer:
            "The comparison helps study developed-market-only exposure versus broader all-world exposure using the same monthly DCA assumptions.",
        },
        {
          question: "Can the higher historical final value change by time period?",
          answer:
            "Yes. Developed and emerging markets can lead or lag in different cycles, so start and end years matter.",
        },
      ],
    },
    "etf-comparison-calculator": {
      title: "ETF Comparison Calculator | Compare ETF DCA Backtests",
      description:
        "Use the ETF comparison calculator to compare two ETF or stock DCA backtests with the same monthly amount, time period, display currency, and data-source warnings.",
      h1: "ETF Comparison Calculator",
      intro:
        "The ETF comparison calculator helps compare two assets using the same monthly investment amount and the same time period. It is built for educational DCA backtesting, not recommendations.",
      sections: [
        {
          title: "What the calculator compares",
          body: "The tool compares Asset A and Asset B using matching assumptions: monthly investment amount, start year, end year, and display currency. It reports final value, total profit, total return, annualized return estimate, max drawdown, and the difference in final value. Using identical assumptions matters because it keeps the comparison focused on the assets and historical price paths rather than different contribution schedules.",
        },
        {
          title: "Who it is useful for",
          body: "The comparison page is useful for users studying ETF DCA scenarios such as VOO vs CSPX, VOO vs QQQ, CSPX vs VWRA, IWDA vs VWRA, or other supported assets. It can also help users compare a broad index ETF with a more concentrated ETF, a U.S.-listed ETF with a UCITS ETF, or two regional market instruments. The goal is to understand historical behavior, risk, and assumptions, not to identify a guaranteed winner.",
        },
        {
          title: "Example comparison workflow",
          body: "A user might choose VOO as Asset A and QQQ as Asset B, set $500 per month, and compare 2018 through 2025. Another user might compare VOO with CSPX to study U.S.-listed versus UCITS S&P 500 exposure. The output shows both portfolios on one chart, making it easier to see how final value and drawdowns changed over time. Share and caption tools can help preserve the settings, while the disclaimer reminds users that the result is educational.",
        },
        {
          title: "How the comparison backtest works",
          body: "When historical data is available, the calculator uses monthly prices generated from historical daily adjusted close data. Each monthly contribution buys estimated shares for each asset. The two portfolios are then valued through the same selected time period. If one asset lacks imported historical data, the tool displays a sample-data warning and keeps the comparison transparent. The result should not be treated as real historical performance when sample data is involved.",
        },
        {
          title: "Data source, fees, currency, dividends, and taxes",
          body: "Historical data may come from Yahoo Finance historical prices and may be delayed, adjusted, incomplete, or different from official fund NAV, exchange, or broker data. Display currency conversion is for presentation. Real returns can differ because of broker fees, spreads, taxes, dividend treatment, withholding tax, exchange rates, execution prices, tracking error, and fund expense ratios. These differences can be especially important when comparing assets listed in different countries or currencies.",
        },
        {
          title: "How to use the result responsibly",
          body: "Use the ETF comparison calculator to ask better questions: Did one asset have deeper drawdowns? Did a concentrated index create larger swings? Did a UCITS listing behave differently from a U.S.-listed ETF in the available data? The result is a historical scenario, not a forecast. Past performance does not guarantee future results, and this page is not financial advice or an investment recommendation.",
        },
      ],
      faqs: [
        {
          question: "Can I compare two ETFs with the same monthly investment amount?",
          answer:
            "Yes. The comparison section uses the same monthly amount and time period for both selected assets.",
        },
        {
          question: "What metrics does the ETF comparison calculator show?",
          answer:
            "It can show final value, total profit, total return, annualized return estimate, max drawdown, final-value difference, and data-source labels.",
        },
        {
          question: "What if one ETF has no imported historical data?",
          answer:
            "The calculator falls back to sample data and displays a sample data warning so the result is not presented as real historical performance.",
        },
        {
          question: "Can I compare ETFs listed in different countries?",
          answer:
            "Yes, if the assets exist in the supported instrument list. However, cross-market comparisons can be affected by currency, tax, dividend, exchange, and data-source differences.",
        },
        {
          question: "Does the comparison include all real-world costs?",
          answer:
            "No. Real brokerage results can differ because of fees, taxes, spreads, dividends, exchange rates, execution prices, and data differences.",
        },
      ],
    },
  };

  return pages[slug];
}

function getZhCnComparisonOverride(
  slug: ComparisonSeoPageSlug
): SeoPageContent | undefined {
  const pages: Partial<Record<ComparisonSeoPageSlug, SeoPageContent>> = {
    "voo-vs-cspx": {
      title: "VOO vs CSPX | S&P 500 ETF 定投对比与回测",
      description:
        "比较 VOO 和 CSPX 的区别，包括美国上市 ETF、UCITS、爱尔兰注册、伦敦交易所、股息、税务、货币、费用和定投回测限制。",
      h1: "VOO vs CSPX：S&P 500 ETF 定投对比",
      intro:
        "VOO 和 CSPX 都常被用来获得 S&P 500 敞口，但它们并不是完全相同的产品。VOO 是美国上市 ETF，CSPX 是爱尔兰注册的 UCITS ETF，并在伦敦交易所等市场交易。这个页面帮助你理解 VOO 和 CSPX 区别，并用相同定投假设做教育性回测。",
      sections: [
        {
          title: "VOO 和 CSPX 分别是什么",
          body: "VOO 是 Vanguard 发行、在美国上市的 S&P 500 ETF。CSPX 通常指 iShares Core S&P 500 UCITS ETF 的相关份额类别，是爱尔兰注册、在伦敦交易所等市场交易的 UCITS ETF。两者都追踪美国大型股市场，但基金注册地、上市地点、股息处理、税务、交易货币和券商支持可能不同。",
        },
        {
          title: "VOO 和 CSPX 区别在哪里",
          body: "VOO 通常适合能够直接交易美国 ETF 的用户研究；CSPX 常被美国以外投资者关注，因为 UCITS 结构、爱尔兰注册地、股息累积份额类别、预扣税、遗产税风险、券商可用性和交易货币都可能影响真实体验。不同国家投资者面对的税务和平台规则不同，不能简单说哪个一定比较好。",
        },
        {
          title: "示例使用场景",
          body: "例如，你可以用相同每月投入金额比较 2018 年到 2025 年的 VOO 和 CSPX 定投结果。工具会显示最终价值、总回报、年化回报估算、最大回撤和最终价值差异。这个结果只代表所选历史期间，并不说明未来一定会重复。",
        },
        {
          title: "回测怎样运行",
          body: "如果历史数据可用，系统会使用由历史每日调整收盘价生成的月度价格。每个月的投入会换算成估算份额，最终用期末价格计算组合价值。如果某个资产缺少历史数据，页面会清楚标记示例数据，不会把示例数据当作真实市场表现。",
        },
        {
          title: "股息、税务、货币和费用限制",
          body: "VOO 与 CSPX 的真实结果可能受到股息分配或累积、预扣税、本地税务、基金费用、买卖价差、汇率、成交价格、券商支持和交易时间影响。Yahoo Finance 数据也可能与官方 NAV、交易所或券商数据不同。",
        },
        {
          title: "风险与免责声明",
          body: "本页面仅供教育用途，不构成投资建议、税务建议或法律建议。VOO 和 CSPX 都可能下跌，过去表现不代表未来表现。用户应自行判断，并在需要时咨询持牌财务顾问。",
        },
      ],
      faqs: [
        {
          question: "VOO 和 CSPX 有什么不同？",
          answer:
            "VOO 是美国上市 ETF，CSPX 是爱尔兰注册 UCITS ETF，常在伦敦交易所交易。两者在基金结构、交易市场、股息处理、税务、券商支持和货币方面可能不同。",
        },
        {
          question: "VOO vs CSPX 回测能说明哪个一定更好吗？",
          answer:
            "不能。回测只能展示所选历史区间和假设下的结果，不能证明哪个 ETF 未来一定更好。",
        },
        {
          question: "CSPX 的 Yahoo Finance 数据和官方 NAV 会不会不同？",
          answer:
            "可能会。第三方历史价格可能延迟、经过调整、不完整，或与官方 NAV、交易所和券商数据存在差异。",
        },
        {
          question: "比较 VOO 和 CSPX 时要注意哪些成本？",
          answer:
            "需要注意基金费用、买卖价差、券商佣金、汇率转换、股息处理、预扣税和本地税务等因素。",
        },
      ],
    },
    "voo-vs-qqq": {
      title: "VOO vs QQQ | S&P 500 与 Nasdaq-100 ETF 定投对比",
      description:
        "比较 VOO 和 QQQ 的历史定投表现，了解 S&P 500 广泛市场与 Nasdaq-100 科技成长权重、回撤、费用和风险差异。",
      h1: "VOO vs QQQ：美股 ETF 定投对比",
      intro:
        "VOO 和 QQQ 都是热门美股 ETF，但底层指数不同。VOO 偏向 S&P 500 广泛市场，QQQ 偏向 Nasdaq-100，科技和成长股权重通常更高。因此 VOO vs QQQ 的回测本质上是在比较两种不同的美国股票敞口。",
      sections: [
        {
          title: "VOO 和 QQQ 分别是什么",
          body: "VOO 跟踪 S&P 500，覆盖美国大型公司并分布在多个行业。QQQ 跟踪 Nasdaq-100，通常科技、通信服务和大型成长公司占比较高。由于指数规则和行业权重不同，不同年份的表现可能差很多。",
        },
        {
          title: "适合用来研究什么问题",
          body: "这个页面适合研究广泛市场 ETF 和较集中成长型 ETF 在相同定投假设下的差异。用户可以观察最终价值、总回报、年化回报估算和最大回撤，理解集中度、估值周期和市场风格切换对结果的影响。",
        },
        {
          title: "示例使用场景",
          body: "你可以测试从 2015 年到 2025 年每月定投 VOO 和 QQQ 的结果。某些阶段 QQQ 可能因为科技股强势而表现突出，另一些阶段则可能出现更大波动和回撤。调整开始年份或结束年份，结论可能明显变化。",
        },
        {
          title: "回测怎样运行",
          body: "系统使用可用历史月度价格，把相同每月投入金额分别应用到 VOO 和 QQQ。每个月买入估算份额，最后计算最终价值、利润、总回报和回撤。如果数据缺失，页面会显示示例数据提醒。",
        },
        {
          title: "费用、股息、税务和汇率限制",
          body: "VOO 和 QQQ 的基金费率、股息率、成分股、行业集中度和交易价差都可能不同。真实结果还会受到股息再投资、税务、券商费用、成交价格和汇率转换影响。",
        },
        {
          title: "风险与免责声明",
          body: "VOO 和 QQQ 都可能下跌。QQQ 的历史强势不代表未来仍会领先，VOO 的分散程度也不代表没有风险。本页面不构成投资建议，不推荐买入、卖出或持有任何 ETF。",
        },
      ],
      faqs: [
        {
          question: "VOO 和 QQQ 最大区别是什么？",
          answer:
            "VOO 跟踪 S&P 500，行业分布较广；QQQ 跟踪 Nasdaq-100，通常科技和成长股权重更高，因此波动和表现可能不同。",
        },
        {
          question: "VOO vs QQQ 回测结果会不会因年份不同而变化？",
          answer:
            "会。不同开始年份和结束年份可能经历不同市场周期，最终价值、回撤和总回报都可能明显不同。",
        },
        {
          question: "QQQ 历史表现较好是否代表未来更好？",
          answer:
            "不代表。过去表现不代表未来表现，市场风格、估值、利率和行业周期都可能变化。",
        },
        {
          question: "回测有没有包含所有税费？",
          answer:
            "没有。真实结果可能受到税务、股息、券商费用、汇率、价差和成交价格影响。",
        },
      ],
    },
    "dca-vs-lump-sum": {
      title: "定投 vs 一次性投入 | 历史回测与投资方式对比",
      description:
        "比较定投和一次性投入在相同总投入金额下的历史模拟结果，了解市场时机、心理压力、费用、回撤和风险限制。",
      h1: "定投 vs 一次性投入",
      intro:
        "定投是分批投入，一次性投入是在投资期开始时一次投入全部金额。这个页面用相同总投入金额比较两种方式，帮助你理解市场时机、心理压力和历史路径对结果的影响。",
      sections: [
        {
          title: "定投和一次性投入分别是什么",
          body: "定投会把资金分成多个时间点逐步投入，例如每月投入固定金额。一次性投入则是在开始时把同样总金额一次投入市场。两者的主要差异是入场时间：定投分散买入价格，一次性投入更早获得完整市场敞口。",
        },
        {
          title: "为什么要用相同总投入金额比较",
          body: "为了让比较更公平，页面会把定投期间的总投入金额作为一次性投入金额。例如每月投入 1,000，持续 96 个月，总投入为 96,000；一次性投入场景会在开始时投入 96,000。这样可以把重点放在投入时机和价格路径上。",
        },
        {
          title: "示例使用场景",
          body: "如果市场在开始后持续上涨，一次性投入可能因为更早参与市场而显示较高历史最终价值。如果市场在开始后先下跌，定投可能因为后续以较低价格买入更多份额而表现不同。结果高度依赖开始年份、结束年份和期间波动。",
        },
        {
          title: "心理压力和市场时机风险",
          body: "一次性投入可能面临刚投入就下跌的心理压力；定投则可能降低一次性择时压力，但也可能在上涨市场中错过更早投入的机会。两种方式都不是永远更好，适合用历史回测理解差异，而不是寻找确定答案。",
        },
        {
          title: "费用、数据和税务限制",
          body: "如果设置手续费，定投可能每月产生费用，而一次性投入通常只计算一次费用。真实结果还会受到税务、股息、汇率、买卖价差、成交价格和数据差异影响。",
        },
        {
          title: "风险与免责声明",
          body: "本页面仅供教育用途，不构成投资建议。过去表现不代表未来表现，历史回测不能保证未来收益。用户应自行判断，必要时咨询持牌财务顾问。",
        },
      ],
      faqs: [
        {
          question: "定投和一次性投入哪个历史表现更好？",
          answer:
            "没有固定答案。结果取决于开始时间、结束时间、市场走势、波动、费用和所选资产。",
        },
        {
          question: "这个比较是否使用相同总投入金额？",
          answer:
            "是。一次性投入使用与定投期间累计投入相同的总金额，方便比较投入时机差异。",
        },
        {
          question: "定投是否一定能降低亏损？",
          answer:
            "不能。定投可以分散买入价格，但资产仍可能下跌，最终结果也可能亏损。",
        },
        {
          question: "定投 vs 一次性投入结果代表未来吗？",
          answer:
            "不代表。结果只是历史模拟，不保证未来收益，也不是投资建议。",
        },
      ],
    },
    "etf-comparison-calculator": {
      title: "ETF 对比计算器 | ETF 定投回测与资产比较工具",
      description:
        "使用 ETF 对比计算器，用相同每月投入金额和时间比较两个资产，查看最终价值、总回报、年化回报估算、最大回撤和数据限制。",
      h1: "ETF 对比计算器",
      intro:
        "ETF 对比计算器可以用相同每月投入金额和相同时间区间比较两个 ETF 或股票。它适合用来研究 VOO vs CSPX、VOO vs QQQ、CSPX vs VWRA 等历史定投场景。",
      sections: [
        {
          title: "这个对比工具可以做什么",
          body: "你可以选择资产 A、资产 B、每月投入金额、开始年份、结束年份和显示货币。工具会显示两个资产的最终价值、总利润、总回报、年化回报估算、最大回撤和最终价值差异。",
        },
        {
          title: "适合哪些比较",
          body: "它适合比较美股 ETF 定投、UCITS ETF、区域市场 ETF 或部分股票。例如 VOO vs CSPX 可以研究美国上市 ETF 和 UCITS ETF 差异；VOO vs QQQ 可以研究广泛市场和 Nasdaq-100 集中度差异。",
        },
        {
          title: "示例使用场景",
          body: "用户可以设置每月投入 500，从 2018 年到 2025 年比较两个资产。图表会展示两个组合的历史路径，结果卡片会显示哪个资产在该期间有较高历史最终价值。这个结果不是推荐，只是历史情景。",
        },
        {
          title: "数据来源和回测方式",
          body: "有历史数据时，系统使用由历史每日调整收盘价生成的月度价格。若某个资产缺少数据，会显示示例数据提示。用户应区分真实历史数据和示例数据，不要把示例结果当成实际市场表现。",
        },
        {
          title: "费用、汇率、股息和税务限制",
          body: "不同 ETF 的基金费率、交易市场、股息处理、货币、税务和券商支持可能不同。真实结果还会受到手续费、价差、汇率、成交价格、预扣税和本地税务影响。",
        },
        {
          title: "如何负责任使用回测结果",
          body: "ETF 回测工具适合帮助提出问题，例如哪个资产回撤更大、哪个期间波动更明显、不同指数敞口差异在哪里。它不适合用来预测未来或直接做买卖决定。本页面仅供教育用途，不构成投资建议。",
        },
      ],
      faqs: [
        {
          question: "ETF 对比计算器可以比较哪些指标？",
          answer:
            "可以比较最终价值、总利润、总回报、年化回报估算、最大回撤、最终价值差异和数据来源状态。",
        },
        {
          question: "可以用相同每月金额比较两个 ETF 吗？",
          answer:
            "可以。工具会对两个资产使用相同每月投入金额和相同投资期间，让比较更清晰。",
        },
        {
          question: "如果一个资产只有示例数据怎么办？",
          answer:
            "页面会清楚显示示例数据提示，提醒用户该结果不是真实历史表现。",
        },
        {
          question: "ETF 对比结果可以作为投资建议吗？",
          answer:
            "不可以。结果仅供教育用途，不构成投资建议，也不保证未来收益。",
        },
      ],
    },
  };

  return pages[slug];
}

function getZhTwComparisonOverride(
  slug: ComparisonSeoPageSlug
): SeoPageContent | undefined {
  const pages: Partial<Record<ComparisonSeoPageSlug, SeoPageContent>> = {
    "voo-vs-cspx": {
      title: "VOO vs CSPX | S&P 500 ETF 定期定額對比與回測",
      description:
        "比較 VOO 和 CSPX 的差別，包括美國上市 ETF、UCITS、愛爾蘭註冊、倫敦交易所、股息、稅務、貨幣、費用和定期定額回測限制。",
      h1: "VOO vs CSPX：S&P 500 ETF 定期定額對比",
      intro:
        "VOO 和 CSPX 都常被用來取得 S&P 500 曝險，但它們並不是完全相同的產品。VOO 是美國上市 ETF，CSPX 是愛爾蘭註冊的 UCITS ETF，並在倫敦交易所等市場交易。這個頁面協助你理解 VOO 和 CSPX 差別，並用相同定期定額假設做教育性回測。",
      sections: [
        {
          title: "VOO 和 CSPX 分別是什麼",
          body: "VOO 是 Vanguard 發行、在美國上市的 S&P 500 ETF。CSPX 通常指 iShares Core S&P 500 UCITS ETF 的相關份額類別，是愛爾蘭註冊、在倫敦交易所等市場交易的 UCITS ETF。兩者都追蹤美國大型股市場，但基金註冊地、上市地點、股息處理、稅務、交易貨幣和券商支援可能不同。",
        },
        {
          title: "VOO 和 CSPX 差別在哪裡",
          body: "VOO 通常適合能直接交易美國 ETF 的使用者研究；CSPX 常被美國以外投資者關注，因為 UCITS 結構、愛爾蘭註冊地、累積型份額、預扣稅、遺產稅風險、券商可用性和交易貨幣都可能影響真實體驗。不同地區投資者面對的稅務和平台規則不同，不能簡單說哪一個一定比較好。",
        },
        {
          title: "示例使用情境",
          body: "例如，你可以用相同每月投入金額比較 2018 年到 2025 年的 VOO 和 CSPX 定期定額結果。工具會顯示最終價值、總報酬、年化報酬估算、最大回撤和最終價值差異。這個結果只代表所選歷史期間，並不表示未來一定會重複。",
        },
        {
          title: "回測怎樣運作",
          body: "如果歷史資料可用，系統會使用由歷史每日調整收盤價生成的月度價格。每個月的投入會換算成估算單位，最終用期末價格計算投資組合價值。如果某個資產缺少歷史資料，頁面會清楚標記範例資料，不會把範例資料當作真實市場表現。",
        },
        {
          title: "股息、稅務、貨幣和費用限制",
          body: "VOO 與 CSPX 的真實結果可能受到股息分配或累積、預扣稅、本地稅務、基金費用、買賣價差、匯率、成交價格、券商支援和交易時間影響。Yahoo Finance 資料也可能與官方 NAV、交易所或券商資料不同。",
        },
        {
          title: "風險與免責聲明",
          body: "本頁面僅供教育用途，不構成投資建議、稅務建議或法律建議。VOO 和 CSPX 都可能下跌，過去表現不代表未來表現。使用者應自行判斷，必要時諮詢持牌財務顧問。",
        },
      ],
      faqs: [
        {
          question: "VOO 和 CSPX 有什麼差別？",
          answer:
            "VOO 是美國上市 ETF，CSPX 是愛爾蘭註冊 UCITS ETF，常在倫敦交易所交易。兩者在基金結構、交易市場、股息處理、稅務、券商支援和貨幣方面可能不同。",
        },
        {
          question: "VOO vs CSPX 回測能說明哪個一定更好嗎？",
          answer:
            "不能。回測只能展示所選歷史區間和假設下的結果，不能證明哪個 ETF 未來一定更好。",
        },
        {
          question: "CSPX 的 Yahoo Finance 資料和官方 NAV 會不會不同？",
          answer:
            "可能會。第三方歷史價格可能延遲、經過調整、不完整，或與官方 NAV、交易所和券商資料存在差異。",
        },
        {
          question: "比較 VOO 和 CSPX 時要注意哪些成本？",
          answer:
            "需要注意基金費用、買賣價差、券商手續費、匯率轉換、股息處理、預扣稅和本地稅務等因素。",
        },
      ],
    },
    "voo-vs-qqq": {
      title: "VOO vs QQQ | S&P 500 與 Nasdaq-100 ETF 定期定額對比",
      description:
        "比較 VOO 和 QQQ 的歷史定期定額表現，了解 S&P 500 廣泛市場與 Nasdaq-100 科技成長權重、回撤、費用和風險差異。",
      h1: "VOO vs QQQ：美股 ETF 定期定額對比",
      intro:
        "VOO 和 QQQ 都是熱門美股 ETF，但底層指數不同。VOO 偏向 S&P 500 廣泛市場，QQQ 偏向 Nasdaq-100，科技和大型成長股權重通常更高。因此 VOO vs QQQ 的回測，本質上是在比較兩種不同的美國股票曝險。",
      sections: [
        {
          title: "VOO 和 QQQ 分別是什麼",
          body: "VOO 追蹤 S&P 500，涵蓋美國大型公司並分布在多個產業。QQQ 追蹤 Nasdaq-100，通常科技、通訊服務和大型成長公司占比較高。由於指數規則和產業權重不同，不同年份的表現可能差很多。",
        },
        {
          title: "適合用來研究什麼問題",
          body: "這個頁面適合研究廣泛市場 ETF 和較集中成長型 ETF 在相同定期定額假設下的差異。使用者可以觀察最終價值、總報酬、年化報酬估算和最大回撤，理解集中度、估值循環和市場風格切換對結果的影響。",
        },
        {
          title: "示例使用情境",
          body: "你可以測試從 2015 年到 2025 年每月投入 VOO 和 QQQ 的結果。某些階段 QQQ 可能因科技股強勢而表現突出，另一些階段則可能出現更大波動和回撤。調整開始年份或結束年份，結論可能明顯變化。",
        },
        {
          title: "回測怎樣運作",
          body: "系統使用可用歷史月度價格，把相同每月投入金額分別套用到 VOO 和 QQQ。每個月買入估算單位，最後計算最終價值、利潤、總報酬和回撤。如果資料缺失，頁面會顯示範例資料提醒。",
        },
        {
          title: "費用、股息、稅務和匯率限制",
          body: "VOO 和 QQQ 的基金費率、股息率、成分股、產業集中度和交易價差都可能不同。真實結果還會受到股息再投入、稅務、券商手續費、成交價格和匯率轉換影響。",
        },
        {
          title: "風險與免責聲明",
          body: "VOO 和 QQQ 都可能下跌。QQQ 的歷史強勢不代表未來仍會領先，VOO 的分散程度也不代表沒有風險。本頁面不構成投資建議，不推薦買入、賣出或持有任何 ETF。",
        },
      ],
      faqs: [
        {
          question: "VOO 和 QQQ 最大差別是什麼？",
          answer:
            "VOO 追蹤 S&P 500，產業分布較廣；QQQ 追蹤 Nasdaq-100，通常科技和成長股權重更高，因此波動和表現可能不同。",
        },
        {
          question: "VOO vs QQQ 回測結果會不會因年份不同而變化？",
          answer:
            "會。不同開始年份和結束年份可能經歷不同市場循環，最終價值、回撤和總報酬都可能明顯不同。",
        },
        {
          question: "QQQ 歷史表現較好是否代表未來更好？",
          answer:
            "不代表。過去表現不代表未來表現，市場風格、估值、利率和產業循環都可能變化。",
        },
        {
          question: "回測有沒有包含所有稅費？",
          answer:
            "沒有。真實結果可能受到稅務、股息、券商費用、匯率、價差和成交價格影響。",
        },
      ],
    },
    "dca-vs-lump-sum": {
      title: "定期定額 vs 單筆投入 | 歷史回測與投資方式對比",
      description:
        "比較定期定額和單筆投入在相同總投入金額下的歷史模擬結果，了解市場時機、心理壓力、費用、回撤和風險限制。",
      h1: "定期定額 vs 單筆投入",
      intro:
        "定期定額是分批投入，單筆投入是在投資期開始時一次投入全部金額。這個頁面用相同總投入金額比較兩種方式，協助理解市場時機、心理壓力和歷史路徑對結果的影響。",
      sections: [
        {
          title: "定期定額和單筆投入分別是什麼",
          body: "定期定額會把資金分成多個時間點逐步投入，例如每月投入固定金額。單筆投入則是在開始時把同樣總金額一次投入市場。兩者主要差異是入場時間：定期定額分散買入價格，單筆投入更早取得完整市場曝險。",
        },
        {
          title: "為什麼要用相同總投入金額比較",
          body: "為了讓比較更公平，頁面會把定期定額期間的總投入金額作為單筆投入金額。例如每月投入 1,000，持續 96 個月，總投入為 96,000；單筆投入情境會在開始時投入 96,000。這樣可以把重點放在投入時機和價格路徑上。",
        },
        {
          title: "示例使用情境",
          body: "如果市場在開始後持續上漲，單筆投入可能因為更早參與市場而顯示較高歷史最終價值。如果市場在開始後先下跌，定期定額可能因為後續以較低價格買入更多單位而表現不同。結果高度依賴開始年份、結束年份和期間波動。",
        },
        {
          title: "心理壓力和市場時機風險",
          body: "單筆投入可能面臨剛投入就下跌的心理壓力；定期定額則可能降低一次性擇時壓力，但也可能在上漲市場中錯過更早投入的機會。兩種方式都不是永遠更好，適合用歷史回測理解差異，而不是尋找確定答案。",
        },
        {
          title: "費用、資料和稅務限制",
          body: "如果設定手續費，定期定額可能每月產生費用，而單筆投入通常只計算一次費用。真實結果還會受到稅務、股息、匯率、買賣價差、成交價格和資料差異影響。",
        },
        {
          title: "風險與免責聲明",
          body: "本頁面僅供教育用途，不構成投資建議。過去表現不代表未來表現，歷史回測不能保證未來收益。使用者應自行判斷，必要時諮詢持牌財務顧問。",
        },
      ],
      faqs: [
        {
          question: "定期定額和單筆投入哪個歷史表現更好？",
          answer:
            "沒有固定答案。結果取決於開始時間、結束時間、市場走勢、波動、費用和所選資產。",
        },
        {
          question: "這個比較是否使用相同總投入金額？",
          answer:
            "是。單筆投入使用與定期定額期間累計投入相同的總金額，方便比較投入時機差異。",
        },
        {
          question: "定期定額是否一定能降低虧損？",
          answer:
            "不能。定期定額可以分散買入價格，但資產仍可能下跌，最終結果也可能虧損。",
        },
        {
          question: "定期定額 vs 單筆投入結果代表未來嗎？",
          answer:
            "不代表。結果只是歷史模擬，不保證未來收益，也不是投資建議。",
        },
      ],
    },
    "etf-comparison-calculator": {
      title: "ETF 對比計算機 | ETF 定期定額回測與資產比較工具",
      description:
        "使用 ETF 對比計算機，用相同每月投入金額和時間比較兩個資產，查看最終價值、總報酬、年化報酬估算、最大回撤和資料限制。",
      h1: "ETF 對比計算機",
      intro:
        "ETF 對比計算機可以用相同每月投入金額和相同時間區間比較兩個 ETF 或股票。它適合用來研究 VOO vs CSPX、VOO vs QQQ、CSPX vs VWRA 等歷史定期定額情境。",
      sections: [
        {
          title: "這個對比工具可以做什麼",
          body: "你可以選擇資產 A、資產 B、每月投入金額、開始年份、結束年份和顯示貨幣。工具會顯示兩個資產的最終價值、總利潤、總報酬、年化報酬估算、最大回撤和最終價值差異。",
        },
        {
          title: "適合哪些比較",
          body: "它適合比較美股 ETF 定期定額、UCITS ETF、區域市場 ETF 或部分股票。例如 VOO vs CSPX 可以研究美國上市 ETF 和 UCITS ETF 差異；VOO vs QQQ 可以研究廣泛市場和 Nasdaq-100 集中度差異。",
        },
        {
          title: "示例使用情境",
          body: "使用者可以設定每月投入 500，從 2018 年到 2025 年比較兩個資產。圖表會展示兩個投資組合的歷史路徑，結果卡片會顯示哪個資產在該期間有較高歷史最終價值。這個結果不是推薦，只是歷史情境。",
        },
        {
          title: "資料來源和回測方式",
          body: "有歷史資料時，系統使用由歷史每日調整收盤價生成的月度價格。若某個資產缺少資料，會顯示範例資料提示。使用者應區分真實歷史資料和範例資料，不要把範例結果當成實際市場表現。",
        },
        {
          title: "費用、匯率、股息和稅務限制",
          body: "不同 ETF 的基金費率、交易市場、股息處理、貨幣、稅務和券商支援可能不同。真實結果還會受到手續費、價差、匯率、成交價格、預扣稅和本地稅務影響。",
        },
        {
          title: "如何負責任地使用回測結果",
          body: "ETF 回測工具適合協助提出問題，例如哪個資產回撤更大、哪個期間波動更明顯、不同指數曝險差異在哪裡。它不適合用來預測未來或直接做買賣決定。本頁面僅供教育用途，不構成投資建議。",
        },
      ],
      faqs: [
        {
          question: "ETF 對比計算機可以比較哪些指標？",
          answer:
            "可以比較最終價值、總利潤、總報酬、年化報酬估算、最大回撤、最終價值差異和資料來源狀態。",
        },
        {
          question: "可以用相同每月金額比較兩個 ETF 嗎？",
          answer:
            "可以。工具會對兩個資產使用相同每月投入金額和相同投資期間，讓比較更清楚。",
        },
        {
          question: "如果一個資產只有範例資料怎麼辦？",
          answer:
            "頁面會清楚顯示範例資料提示，提醒使用者該結果不是真實歷史表現。",
        },
        {
          question: "ETF 對比結果可以作為投資建議嗎？",
          answer:
            "不可以。結果僅供教育用途，不構成投資建議，也不保證未來收益。",
        },
      ],
    },
  };

  return pages[slug];
}

function buildComparisonPages(locale: Locale): Record<ComparisonSeoPageSlug, SeoPageContent> {
  if (locale === "en") {
    return Object.fromEntries(
      comparisonSeoPageSlugs.map((slug) => [slug, getEnglishComparisonPage(slug)])
    ) as Record<ComparisonSeoPageSlug, SeoPageContent>;
  }

  const text = localizedComparisonText[locale] ?? localizedComparisonText.en;

  return Object.fromEntries(
    comparisonSeoPageSlugs.map((slug) => {
      const zhCnOverride =
        locale === "zh-CN" ? getZhCnComparisonOverride(slug) : undefined;
      const zhTwOverride =
        locale === "zh-TW" ? getZhTwComparisonOverride(slug) : undefined;

      if (zhCnOverride) {
        return [slug, zhCnOverride];
      }

      if (zhTwOverride) {
        return [slug, zhTwOverride];
      }

      const definition = comparisonDefinitions[slug];
      const isCalculator = definition.theme === "calculator";
      const { assetA, assetB } = definition;
      const pageLabel = isCalculator ? text.calculatorH1 : `${assetA} vs ${assetB}`;
      const faqs = isCalculator
        ? [
            { question: `${pageLabel}: ${text.faqDca}`, answer: text.faqDcaAnswer },
            {
              question: text.faqBetter("VOO", "CSPX"),
              answer: text.faqBetterAnswer("VOO", "CSPX"),
            },
            { question: `${pageLabel}: ${text.faqAdvice}`, answer: text.faqAdviceAnswer },
          ]
        : [
            {
              question: text.faqBetter(assetA, assetB),
              answer: text.faqBetterAnswer(assetA, assetB),
            },
            { question: `${pageLabel}: ${text.faqDca}`, answer: text.faqDcaAnswer },
            { question: `${pageLabel}: ${text.faqAdvice}`, answer: text.faqAdviceAnswer },
          ];

      return [
        slug,
        {
          title: isCalculator
            ? text.calculatorTitle
            : text.title(assetA, assetB),
          description: isCalculator
            ? text.calculatorDescription
            : text.description(assetA, assetB),
          h1: isCalculator ? text.calculatorH1 : text.h1(assetA, assetB),
          intro: isCalculator
            ? text.calculatorIntro
            : text.intro(assetA, assetB),
          sections: [
            {
              title: text.keyTitle,
              body: isCalculator
                ? text.calculatorKeyBody
                : text.keyBody(assetA, assetB),
            },
            {
              title: text.dcaTitle,
              body: isCalculator
                ? text.calculatorDcaBody
                : text.dcaBody(assetA, assetB),
            },
            { title: text.dataTitle, body: text.dataBody },
            { title: text.riskTitle, body: text.riskBody },
          ],
          faqs,
        },
      ];
    })
  ) as Record<ComparisonSeoPageSlug, SeoPageContent>;
}

type AssetDefinition = {
  symbol: string;
  name: string;
  market: string;
  currency: string;
  assetKind: string;
  assetType: "ETF" | "Stock";
  countryQuery: string;
};

const assetDefinitions: Record<AssetSeoPageSlug, AssetDefinition> = {
  "qqq-dca-calculator": {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    market: "United States / Nasdaq",
    currency: "USD",
    assetKind: "Nasdaq 100 ETF",
    assetType: "ETF",
    countryQuery: "us",
  },
  "vwra-dca-calculator": {
    symbol: "VWRA.L",
    name: "Vanguard FTSE All-World UCITS ETF",
    market: "Ireland UCITS / London Stock Exchange",
    currency: "USD",
    assetKind: "global all-world UCITS ETF",
    assetType: "ETF",
    countryQuery: "ucits",
  },
  "iwda-dca-calculator": {
    symbol: "IWDA.L",
    name: "iShares Core MSCI World UCITS ETF",
    market: "Ireland UCITS / London Stock Exchange",
    currency: "USD",
    assetKind: "developed markets UCITS ETF",
    assetType: "ETF",
    countryQuery: "ucits",
  },
  "0050-dca-calculator": {
    symbol: "0050.TW",
    name: "Yuanta Taiwan Top 50 ETF",
    market: "Taiwan / TWSE",
    currency: "TWD",
    assetKind: "Taiwan large-cap ETF",
    assetType: "ETF",
    countryQuery: "taiwan",
  },
  "1155-dca-calculator": {
    symbol: "1155.KL",
    name: "Maybank",
    market: "Malaysia / Bursa Malaysia",
    currency: "MYR",
    assetKind: "Malaysian bank stock",
    assetType: "Stock",
    countryQuery: "malaysia",
  },
  "es3-dca-calculator": {
    symbol: "ES3.SI",
    name: "SPDR Straits Times Index ETF",
    market: "Singapore / SGX",
    currency: "SGD",
    assetKind: "Singapore STI ETF",
    assetType: "ETF",
    countryQuery: "singapore",
  },
  "2800-dca-calculator": {
    symbol: "2800.HK",
    name: "Tracker Fund of Hong Kong",
    market: "Hong Kong / HKEX",
    currency: "HKD",
    assetKind: "Hong Kong equity ETF",
    assetType: "ETF",
    countryQuery: "hongkong",
  },
};

type AssetLocaleText = {
  title: (asset: AssetDefinition) => string;
  description: (asset: AssetDefinition) => string;
  h1: (asset: AssetDefinition) => string;
  intro: (asset: AssetDefinition) => string;
  whatTitle: (asset: AssetDefinition) => string;
  whatBody: (asset: AssetDefinition) => string;
  dcaTitle: (asset: AssetDefinition) => string;
  dcaBody: (asset: AssetDefinition) => string;
  dataTitle: string;
  dataBody: string;
  riskTitle: string;
  riskBody: string;
  faqOne: (asset: AssetDefinition) => string;
  faqOneAnswer: (asset: AssetDefinition) => string;
  faqTwo: (asset: AssetDefinition) => string;
  faqTwoAnswer: (asset: AssetDefinition) => string;
  faqThree: string;
  faqThreeAnswer: string;
};

function assetText(
  titleWord: string,
  backtestWord: string,
  monthlyInvesting: string,
  dataBody: string,
  riskBody: string,
  locale: Locale
): AssetLocaleText {
  const isZhCn = locale === "zh-CN";
  const isZhTw = locale === "zh-TW";
  const isMs = locale === "ms";
  const isId = locale === "id";
  const isJa = locale === "ja";
  const isKo = locale === "ko";
  const isAr = locale === "ar";
  const isEs = locale === "es";
  const isFr = locale === "fr";
  const isDe = locale === "de";
  const isIt = locale === "it";
  const isRu = locale === "ru";
  const isTa = locale === "ta";

  return {
    title: (asset) => localizedAssetTitle(locale, asset, titleWord),
    description: (asset) => localizedAssetDescription(locale, asset),
    h1: (asset) =>
      isZhCn
        ? `${asset.symbol} DCA定投计算器`
        : isZhTw
          ? `${asset.symbol} DCA定投計算器`
          : isMs
            ? `${asset.symbol} Kalkulator DCA`
            : isId
              ? `${asset.symbol} Kalkulator DCA`
              : isJa
                ? `${asset.symbol} DCA計算機`
                : isKo
                  ? `${asset.symbol} DCA 계산기`
                  : isAr
                    ? `حاسبة DCA لـ ${asset.symbol}`
                    : isEs
                      ? `Calculadora DCA de ${asset.symbol}`
                      : isFr
                        ? `Calculateur DCA ${asset.symbol}`
                        : isDe
                          ? `${asset.symbol} DCA-Rechner`
                          : isIt
                            ? `Calcolatore DCA ${asset.symbol}`
                            : isRu
                              ? `DCA-калькулятор ${asset.symbol}`
                              : isTa
                                ? `${asset.symbol} DCA கணிப்பான்`
                                : `${asset.symbol} DCA Calculator`,
    intro: (asset) =>
      isZhCn
        ? `这个页面用于了解如何用 DCA 回测工具分析 ${asset.symbol}（${asset.name}）的每月投资情景。`
        : isZhTw
          ? `這個頁面用於了解如何用 DCA 回測工具分析 ${asset.symbol}（${asset.name}）的每月投資情境。`
          : isMs
            ? `Halaman ini menerangkan cara menggunakan ujian balik DCA untuk mengkaji pelaburan bulanan dalam ${asset.symbol} (${asset.name}).`
            : isId
              ? `Halaman ini menjelaskan cara memakai backtest DCA untuk mempelajari investasi bulanan di ${asset.symbol} (${asset.name}).`
              : isJa
                ? `このページでは、${asset.symbol}（${asset.name}）への毎月投資をDCAバックテストで学ぶ方法を説明します。`
                : isKo
                  ? `이 페이지는 ${asset.symbol}(${asset.name}) 월별 투자를 DCA 백테스트로 살펴보는 방법을 설명합니다.`
                  : isAr
                    ? `تشرح هذه الصفحة كيفية دراسة الاستثمار الشهري في ${asset.symbol} (${asset.name}) باستخدام اختبار DCA التاريخي.`
                    : isEs
                      ? `Esta página explica cómo estudiar inversiones mensuales en ${asset.symbol} (${asset.name}) con un backtest DCA.`
                      : isFr
                        ? `Cette page explique comment étudier l’investissement mensuel dans ${asset.symbol} (${asset.name}) avec un backtest DCA.`
                        : isDe
                          ? `Diese Seite erklärt, wie monatliche Investments in ${asset.symbol} (${asset.name}) mit einem DCA-Backtest analysiert werden können.`
                          : isIt
                            ? `Questa pagina spiega come studiare investimenti mensili in ${asset.symbol} (${asset.name}) con un backtest DCA.`
                            : isRu
                              ? `Эта страница объясняет, как изучать ежемесячные инвестиции в ${asset.symbol} (${asset.name}) с помощью DCA-бэктеста.`
                              : isTa
                                ? `இந்த பக்கம் ${asset.symbol} (${asset.name}) மாதாந்திர முதலீட்டை DCA பின்சோதனையால் ஆய்வு செய்வதை விளக்குகிறது.`
                                : `Use this page to understand ${monthlyInvesting} in ${asset.symbol} (${asset.name}) with a DCA backtest calculator.`,
    whatTitle: (asset) => localizedWhatTitle(locale, asset),
    whatBody: (asset) =>
      `${asset.symbol} (${asset.name}) - ${asset.assetKind}. ${asset.market}. ${asset.currency}.`,
    dcaTitle: (asset) =>
      isZhCn
        ? `${asset.symbol} 定投回测如何运作`
        : isZhTw
          ? `${asset.symbol} 定投回測如何運作`
          : `${asset.symbol} ${backtestWord}`,
    dcaBody: (asset) => localizedAssetDcaBody(locale, asset),
    dataTitle: isZhCn ? "数据来源说明" : isZhTw ? "資料來源說明" : dataTitleByLocale(locale),
    dataBody,
    riskTitle: isZhCn ? "风险与限制" : isZhTw ? "風險與限制" : riskTitleByLocale(locale),
    riskBody,
    faqOne: (asset) => localizedAssetFaqOne(locale, asset),
    faqOneAnswer: (asset) => localizedAssetFaqOneAnswer(locale, asset),
    faqTwo: (asset) => localizedAssetFaqTwo(locale, asset),
    faqTwoAnswer: () => dataBody,
    faqThree:
      isZhCn ? "这是投资建议吗？" : isZhTw ? "這是投資建議嗎？" : adviceQuestionByLocale(locale),
    faqThreeAnswer: riskBody,
  };
}

function localizedAssetTitle(locale: Locale, asset: AssetDefinition, titleWord: string) {
  const labels: Partial<Record<Locale, string>> = {
    "zh-CN": `${asset.symbol} DCA定投计算器 | ${asset.name} 回测工具`,
    "zh-TW": `${asset.symbol} DCA定投計算器 | ${asset.name} 回測工具`,
    ms: `${asset.symbol} Kalkulator DCA | ${asset.name} ${titleWord}`,
    id: `${asset.symbol} Kalkulator DCA | ${asset.name} ${titleWord}`,
    ja: `${asset.symbol} DCA計算機 | ${asset.name}`,
    ko: `${asset.symbol} DCA 계산기 | ${asset.name}`,
    ru: `DCA-калькулятор ${asset.symbol} | ${asset.name}`,
    fr: `Calculateur DCA ${asset.symbol} | ${asset.name}`,
    it: `Calcolatore DCA ${asset.symbol} | ${asset.name}`,
    es: `Calculadora DCA de ${asset.symbol} | ${asset.name}`,
    ar: `حاسبة DCA لـ ${asset.symbol} | ${asset.name}`,
    de: `${asset.symbol} DCA-Rechner | ${asset.name}`,
    ta: `${asset.symbol} DCA கணிப்பான் | ${asset.name}`,
  };

  return labels[locale] ?? `${asset.symbol} DCA Calculator | ${asset.name} ${titleWord}`;
}

function localizedAssetDescription(locale: Locale, asset: AssetDefinition) {
  const labels: Partial<Record<Locale, string>> = {
    "zh-CN": `使用 ${asset.symbol} 定投计算器回测每月投资 ${asset.name}。了解数据来源、风险限制和教育性结果。`,
    "zh-TW": `使用 ${asset.symbol} 定投計算器回測每月投資 ${asset.name}。了解資料來源、風險限制和教育性結果。`,
    ms: `Kalkulator DCA ${asset.symbol} untuk ujian balik pelaburan bulanan ${asset.name}, dengan nota sumber data dan risiko.`,
    id: `Kalkulator DCA ${asset.symbol} untuk backtest investasi bulanan ${asset.name}, dengan catatan sumber data dan risiko.`,
    ja: `${asset.name}の毎月投資を学ぶための${asset.symbol} DCA計算機。データソースとリスクの注意点を含みます。`,
    ko: `${asset.name} 월별 투자를 학습하기 위한 ${asset.symbol} DCA 계산기입니다. 데이터 출처와 위험 한계를 안내합니다.`,
    ru: `DCA-калькулятор ${asset.symbol} для образовательного бэктеста ежемесячных инвестиций в ${asset.name} с пояснениями по данным и рискам.`,
    fr: `Calculateur DCA ${asset.symbol} pour étudier l’investissement mensuel dans ${asset.name}, avec notes sur les données et les risques.`,
    it: `Calcolatore DCA ${asset.symbol} per studiare investimenti mensili in ${asset.name}, con note su dati e rischi.`,
    es: `Calculadora DCA de ${asset.symbol} para estudiar inversiones mensuales en ${asset.name}, con notas de datos y riesgos.`,
    ar: `حاسبة DCA لـ ${asset.symbol} لدراسة الاستثمار الشهري في ${asset.name} مع ملاحظات عن مصدر البيانات والمخاطر.`,
    de: `${asset.symbol} DCA-Rechner für monatliche Investments in ${asset.name}, mit Datenhinweisen und Risikogrenzen.`,
    ta: `${asset.name} மாதாந்திர முதலீட்டை ஆய்வு செய்யும் ${asset.symbol} DCA கணிப்பான், தரவு மூலம் மற்றும் அபாய குறிப்புகளுடன்.`,
  };

  return labels[locale] ?? `${asset.symbol} DCA calculator for educational monthly investing backtests in ${asset.name}, with data source notes, risk limits, and no financial advice.`;
}

function localizedWhatTitle(locale: Locale, asset: AssetDefinition) {
  const labels: Partial<Record<Locale, string>> = {
    "zh-CN": `${asset.symbol} 是什么？`,
    "zh-TW": `${asset.symbol} 是什麼？`,
    ms: `Apakah ${asset.symbol}?`,
    id: `Apa itu ${asset.symbol}?`,
    ja: `${asset.symbol}とは？`,
    ko: `${asset.symbol}란?`,
    ru: `Что такое ${asset.symbol}?`,
    fr: `Qu’est-ce que ${asset.symbol} ?`,
    it: `Che cos’è ${asset.symbol}?`,
    es: `¿Qué es ${asset.symbol}?`,
    ar: `ما هو ${asset.symbol}؟`,
    de: `Was ist ${asset.symbol}?`,
    ta: `${asset.symbol} என்றால் என்ன?`,
  };

  return labels[locale] ?? `What is ${asset.symbol}?`;
}

function localizedAssetDcaBody(locale: Locale, asset: AssetDefinition) {
  const labels: Partial<Record<Locale, string>> = {
    "zh-CN": `选择 ${asset.symbol}、每月投入金额、开始年份和结束年份后，计算器会估算总投入、份额、最终价值、利润和回报。`,
    "zh-TW": `選擇 ${asset.symbol}、每月投入金額、開始年份和結束年份後，計算器會估算總投入、份額、最終價值、利潤和報酬。`,
    ms: `Tetapkan ${asset.symbol}, jumlah bulanan, tahun mula dan tahun akhir untuk menganggarkan jumlah dilaburkan, unit terkumpul, nilai akhir, keuntungan dan pulangan.`,
    id: `Atur ${asset.symbol}, jumlah bulanan, tahun mulai, dan tahun akhir untuk memperkirakan total investasi, unit terkumpul, nilai akhir, laba, dan return.`,
    ja: `${asset.symbol}、毎月金額、開始年、終了年を設定して、総投資額、累積口数、最終価値、利益、リターンを推定します。`,
    ko: `${asset.symbol}, 월 투자금, 시작 연도, 종료 연도를 설정해 총 투자액, 누적 수량, 최종 가치, 이익, 수익률을 추정합니다.`,
    ru: `Укажите ${asset.symbol}, ежемесячную сумму, начальный и конечный год, чтобы оценить взносы, накопленные доли, итоговую стоимость, прибыль и доходность.`,
    fr: `Définissez ${asset.symbol}, le montant mensuel, l’année de début et l’année de fin pour estimer capital investi, parts accumulées, valeur finale, gain et rendement.`,
    it: `Imposta ${asset.symbol}, importo mensile, anno iniziale e finale per stimare capitale investito, quote accumulate, valore finale, profitto e rendimento.`,
    es: `Configura ${asset.symbol}, importe mensual, año inicial y final para estimar inversión total, participaciones acumuladas, valor final, ganancia y retorno.`,
    ar: `حدد ${asset.symbol} والمبلغ الشهري وسنة البداية والنهاية لتقدير إجمالي الاستثمار والوحدات المتراكمة والقيمة النهائية والربح والعائد.`,
    de: `Legen Sie ${asset.symbol}, Monatsbetrag, Startjahr und Endjahr fest, um Einzahlungen, Anteile, Endwert, Gewinn und Rendite zu schätzen.`,
    ta: `${asset.symbol}, மாதாந்திர தொகை, தொடக்க ஆண்டு மற்றும் முடிவு ஆண்டை அமைத்து மொத்த முதலீடு, சேர்க்கப்பட்ட பங்குகள், இறுதி மதிப்பு, லாபம் மற்றும் வருமானத்தை மதிப்பிடலாம்.`,
  };

  return labels[locale] ?? `Select ${asset.symbol}, a monthly amount, start year, and end year to estimate total invested, accumulated shares, final value, profit, and return.`;
}

function localizedAssetFaqOne(locale: Locale, asset: AssetDefinition) {
  const labels: Partial<Record<Locale, string>> = {
    "zh-CN": `可以回测 ${asset.symbol} 每月定投吗？`,
    "zh-TW": `可以回測 ${asset.symbol} 每月定投嗎？`,
    ms: `Bolehkah saya menguji balik pelaburan bulanan ${asset.symbol}?`,
    id: `Bisakah saya melakukan backtest investasi bulanan ${asset.symbol}?`,
    ja: `${asset.symbol}の毎月投資をバックテストできますか？`,
    ko: `${asset.symbol} 월별 투자를 백테스트할 수 있나요?`,
    ru: `Можно ли проверить ежемесячные инвестиции в ${asset.symbol}?`,
    fr: `Puis-je tester l’investissement mensuel dans ${asset.symbol} ?`,
    it: `Posso testare investimenti mensili in ${asset.symbol}?`,
    es: `¿Puedo probar inversiones mensuales en ${asset.symbol}?`,
    ar: `هل يمكن اختبار الاستثمار الشهري في ${asset.symbol}؟`,
    de: `Kann ich monatliche Investments in ${asset.symbol} testen?`,
    ta: `${asset.symbol} மாதாந்திர முதலீட்டை பின்சோதிக்க முடியுமா?`,
  };

  return labels[locale] ?? `Can I backtest monthly investing in ${asset.symbol}?`;
}

function localizedAssetFaqOneAnswer(locale: Locale, asset: AssetDefinition) {
  const labels: Partial<Record<Locale, string>> = {
    "zh-CN": `可以。打开主 DCA 计算器并选择 ${asset.symbol}，即可设置每月金额和时间区间。`,
    "zh-TW": `可以。開啟主 DCA 計算器並選擇 ${asset.symbol}，即可設定每月金額和時間區間。`,
    ms: `Ya. Buka kalkulator DCA utama dengan ${asset.symbol} dipilih, kemudian tetapkan jumlah bulanan dan tempoh.`,
    id: `Ya. Buka kalkulator DCA utama dengan ${asset.symbol} dipilih, lalu atur jumlah bulanan dan periode.`,
    ja: `はい。メインのDCA計算機で${asset.symbol}を選び、毎月金額と期間を設定します。`,
    ko: `예. 기본 DCA 계산기에서 ${asset.symbol}을 선택한 뒤 월 투자금과 기간을 설정합니다.`,
    ru: `Да. Откройте основной DCA-калькулятор с выбранным ${asset.symbol}, затем задайте ежемесячную сумму и период.`,
    fr: `Oui. Ouvrez le calculateur DCA principal avec ${asset.symbol} sélectionné, puis définissez le montant mensuel et la période.`,
    it: `Sì. Apri il calcolatore DCA principale con ${asset.symbol} selezionato, poi imposta importo mensile e periodo.`,
    es: `Sí. Abre la calculadora DCA principal con ${asset.symbol} seleccionado y define importe mensual y periodo.`,
    ar: `نعم. افتح حاسبة DCA الرئيسية مع اختيار ${asset.symbol} ثم حدد المبلغ الشهري والفترة.`,
    de: `Ja. Öffnen Sie den Haupt-DCA-Rechner mit ${asset.symbol} und legen Sie Monatsbetrag und Zeitraum fest.`,
    ta: `ஆம். ${asset.symbol} தேர்ந்தெடுக்கப்பட்ட முக்கிய DCA கணிப்பானைத் திறந்து, மாதாந்திர தொகை மற்றும் காலத்தை அமைக்கவும்.`,
  };

  return labels[locale] ?? `Yes. Open the main DCA calculator with ${asset.symbol} selected, then set the monthly amount and time period.`;
}

function localizedAssetFaqTwo(locale: Locale, asset: AssetDefinition) {
  const labels: Partial<Record<Locale, string>> = {
    "zh-CN": `${asset.symbol} 回测使用真实历史数据吗？`,
    "zh-TW": `${asset.symbol} 回測使用真實歷史資料嗎？`,
    ms: `Adakah ujian balik ${asset.symbol} menggunakan data sejarah sebenar?`,
    id: `Apakah backtest ${asset.symbol} memakai data historis nyata?`,
    ja: `${asset.symbol}のバックテストは実際の過去データを使いますか？`,
    ko: `${asset.symbol} 백테스트는 실제 과거 데이터를 사용하나요?`,
    ru: `Использует ли бэктест ${asset.symbol} реальные исторические данные?`,
    fr: `Le backtest ${asset.symbol} utilise-t-il des données historiques réelles ?`,
    it: `Il backtest ${asset.symbol} usa dati storici reali?`,
    es: `¿El backtest de ${asset.symbol} usa datos históricos reales?`,
    ar: `هل يستخدم اختبار ${asset.symbol} بيانات تاريخية حقيقية؟`,
    de: `Verwendet der ${asset.symbol}-Backtest echte historische Daten?`,
    ta: `${asset.symbol} பின்சோதனை உண்மையான வரலாற்று தரவை பயன்படுத்துகிறதா?`,
  };

  return labels[locale] ?? `Does the ${asset.symbol} backtest use real historical data?`;
}

function dataTitleByLocale(locale: Locale) {
  const labels: Partial<Record<Locale, string>> = {
    ms: "Sumber data",
    id: "Sumber data",
    ja: "データソース",
    ko: "데이터 출처",
    ru: "Источник данных",
    fr: "Source des données",
    it: "Fonte dati",
    es: "Fuente de datos",
    ar: "مصدر البيانات",
    de: "Datenquelle",
    ta: "தரவு மூலம்",
  };
  return labels[locale] ?? "Data source explanation";
}

function riskTitleByLocale(locale: Locale) {
  const labels: Partial<Record<Locale, string>> = {
    ms: "Risiko dan batasan",
    id: "Risiko dan batasan",
    ja: "リスクと制限",
    ko: "위험 및 한계",
    ru: "Риски и ограничения",
    fr: "Risques et limites",
    it: "Rischi e limiti",
    es: "Riesgos y limitaciones",
    ar: "المخاطر والقيود",
    de: "Risiken und Grenzen",
    ta: "அபாயங்கள் மற்றும் வரம்புகள்",
  };
  return labels[locale] ?? "Risk and limitations";
}

function adviceQuestionByLocale(locale: Locale) {
  const labels: Partial<Record<Locale, string>> = {
    ms: "Adakah ini nasihat pelaburan?",
    id: "Apakah ini nasihat investasi?",
    ja: "これは投資助言ですか？",
    ko: "투자 조언인가요?",
    ru: "Это инвестиционная рекомендация?",
    fr: "Est-ce un conseil en investissement ?",
    it: "È consulenza finanziaria?",
    es: "¿Es asesoramiento de inversión?",
    ar: "هل هذه نصيحة استثمارية؟",
    de: "Ist das Anlageberatung?",
    ta: "இது முதலீட்டு ஆலோசனையா?",
  };
  return labels[locale] ?? "Is this investment advice?";
}

const assetLocaleText: Record<Locale, AssetLocaleText> = {
  en: assetText(
    "Backtest Tool",
    "DCA backtest",
    "monthly investing",
    "Historical data may come from Yahoo Finance historical prices and is converted into monthly closing prices where available. If imported data is unavailable, the calculator clearly labels sample data.",
    "This page is educational only and is not financial advice. Past performance does not guarantee future results. Real returns may differ because of fees, taxes, dividends, exchange rates, spreads, execution prices, and official data differences.",
    "en"
  ),
  "zh-CN": assetText("回测工具", "定投回测", "每月投资", "历史数据可能来自 Yahoo Finance 历史价格，并在可用时转换为月度收盘价。若未导入数据，计算器会明确标记示例数据。", "本页面仅供教育用途，不构成金融建议。过往表现不保证未来结果。真实回报可能因费用、税务、分红、汇率、价差、成交价和官方数据差异而不同。", "zh-CN"),
  "zh-TW": assetText("回測工具", "定投回測", "每月投資", "歷史資料可能來自 Yahoo Finance 歷史價格，並在可用時轉換為月度收盤價。若未匯入資料，計算器會明確標記範例資料。", "本頁面僅供教育用途，不構成金融建議。過往表現不保證未來結果。真實報酬可能因費用、稅務、配息、匯率、價差、成交價和官方資料差異而不同。", "zh-TW"),
  ms: assetText("Alat Ujian Balik", "ujian balik DCA", "pelaburan bulanan", "Data sejarah mungkin datang daripada harga sejarah Yahoo Finance dan ditukar kepada harga penutup bulanan apabila tersedia. Jika data belum diimport, kalkulator menandakan data sampel dengan jelas.", "Halaman ini untuk pendidikan sahaja dan bukan nasihat kewangan. Prestasi lalu tidak menjamin hasil masa depan. Pulangan sebenar boleh berbeza kerana yuran, cukai, dividen, kadar tukaran, spread, harga pelaksanaan dan perbezaan data rasmi.", "ms"),
  id: assetText("Alat Backtest", "backtest DCA", "investasi bulanan", "Data historis dapat berasal dari harga historis Yahoo Finance dan dikonversi menjadi harga penutupan bulanan jika tersedia. Jika data belum diimpor, kalkulator menandai data sampel dengan jelas.", "Halaman ini hanya untuk edukasi dan bukan nasihat keuangan. Kinerja masa lalu tidak menjamin hasil masa depan. Return nyata dapat berbeda karena biaya, pajak, dividen, kurs, spread, harga eksekusi, dan perbedaan data resmi.", "id"),
  ja: assetText("バックテストツール", "DCAバックテスト", "毎月投資", "過去データはYahoo Financeの過去価格から取得され、利用可能な場合は月次終値に変換されます。未インポートの場合、計算機はサンプルデータを明確に表示します。", "このページは教育目的のみであり、金融助言ではありません。過去の実績は将来の結果を保証しません。実際のリターンは手数料、税金、配当、為替、スプレッド、約定価格、公式データとの差異で変わる可能性があります。", "ja"),
  ko: assetText("백테스트 도구", "DCA 백테스트", "월별 투자", "과거 데이터는 Yahoo Finance 과거 가격에서 올 수 있으며 가능한 경우 월별 종가로 변환됩니다. 가져온 데이터가 없으면 계산기는 샘플 데이터를 명확히 표시합니다.", "이 페이지는 교육 목적이며 금융 조언이 아닙니다. 과거 성과는 미래 결과를 보장하지 않습니다. 실제 수익은 수수료, 세금, 배당, 환율, 스프레드, 체결가, 공식 데이터 차이로 달라질 수 있습니다.", "ko"),
  ru: assetText("инструмент бэктеста", "DCA-бэктест", "ежемесячные инвестиции", "Исторические данные могут поступать из цен Yahoo Finance и при наличии преобразуются в месячные цены закрытия. Если данные не импортированы, калькулятор ясно показывает выборочные данные.", "Эта страница предназначена только для образования и не является финансовой рекомендацией. Прошлая доходность не гарантирует будущих результатов. Реальная доходность может отличаться из-за комиссий, налогов, дивидендов, валютных курсов, спредов, цены исполнения и различий с официальными данными.", "ru"),
  fr: assetText("outil de backtest", "backtest DCA", "investissement mensuel", "Les données historiques peuvent provenir des prix Yahoo Finance et sont converties en cours de clôture mensuels lorsque disponibles. Si les données ne sont pas importées, le calculateur indique clairement les données d’exemple.", "Cette page est uniquement éducative et ne constitue pas un conseil financier. Les performances passées ne garantissent pas les résultats futurs. Les rendements réels peuvent varier avec frais, taxes, dividendes, change, spreads, prix d’exécution et différences avec les données officielles.", "fr"),
  it: assetText("strumento di backtest", "backtest DCA", "investimento mensile", "I dati storici possono provenire dai prezzi storici Yahoo Finance e sono convertiti in prezzi di chiusura mensili quando disponibili. Se i dati non sono importati, il calcolatore indica chiaramente i dati campione.", "Questa pagina è solo educativa e non costituisce consulenza finanziaria. Le performance passate non garantiscono risultati futuri. I rendimenti reali possono variare per commissioni, tasse, dividendi, cambi, spread, prezzi di esecuzione e differenze dai dati ufficiali.", "it"),
  es: assetText("herramienta de backtest", "backtest DCA", "inversión mensual", "Los datos históricos pueden venir de precios históricos de Yahoo Finance y se convierten en precios de cierre mensuales cuando están disponibles. Si los datos no se han importado, la calculadora marca claramente datos de muestra.", "Esta página es solo educativa y no es asesoramiento financiero. El rendimiento pasado no garantiza resultados futuros. Los retornos reales pueden variar por comisiones, impuestos, dividendos, divisas, spreads, precio de ejecución y diferencias con datos oficiales.", "es"),
  ar: assetText("أداة اختبار تاريخي", "اختبار DCA التاريخي", "الاستثمار الشهري", "قد تأتي البيانات التاريخية من أسعار Yahoo Finance التاريخية وتحوّل إلى أسعار إغلاق شهرية عند توفرها. إذا لم تكن البيانات مستوردة، تعرض الحاسبة بيانات عينة بوضوح.", "هذه الصفحة تعليمية فقط وليست نصيحة مالية. الأداء السابق لا يضمن النتائج المستقبلية. قد تختلف العوائد الفعلية بسبب الرسوم والضرائب والتوزيعات وأسعار الصرف والفروقات وسعر التنفيذ واختلاف البيانات الرسمية.", "ar"),
  de: assetText("Backtest-Tool", "DCA-Backtest", "monatliches Investieren", "Historische Daten können aus Yahoo Finance Kursen stammen und werden bei Verfügbarkeit in monatliche Schlusskurse umgewandelt. Wenn keine Daten importiert sind, kennzeichnet der Rechner Beispieldaten klar.", "Diese Seite dient nur Bildungszwecken und ist keine Finanzberatung. Vergangene Wertentwicklung garantiert keine zukünftigen Ergebnisse. Reale Renditen können wegen Gebühren, Steuern, Dividenden, Wechselkursen, Spreads, Ausführungspreisen und offiziellen Datenabweichungen abweichen.", "de"),
  ta: assetText("பின்சோதனை கருவி", "DCA பின்சோதனை", "மாதாந்திர முதலீடு", "வரலாற்று தரவு Yahoo Finance வரலாற்று விலைகளிலிருந்து வரலாம்; கிடைக்கும் போது மாதாந்திர மூடல் விலைகளாக மாற்றப்படும். தரவு இறக்குமதி செய்யப்படவில்லை என்றால், கணிப்பான் மாதிரி தரவை தெளிவாகக் காட்டும்.", "இந்த பக்கம் கல்விக்காக மட்டுமே; இது நிதி ஆலோசனை அல்ல. கடந்த செயல்திறன் எதிர்கால முடிவுகளை உறுதி செய்யாது. கட்டணங்கள், வரிகள், டிவிடெண்ட்கள், நாணய மாற்று, spreads, செயலாக்க விலை மற்றும் அதிகாரப்பூர்வ தரவு வேறுபாடுகள் காரணமாக உண்மையான வருமானம் மாறலாம்.", "ta"),
};

function getZhCnAssetOverride(slug: AssetSeoPageSlug): SeoPageContent | undefined {
  if (slug !== "qqq-dca-calculator") {
    return undefined;
  }

  return {
    title: "QQQ 定投计算器 | Nasdaq-100 ETF 回测工具",
    description:
      "使用 QQQ 定投计算器回测每月买入 Nasdaq-100 ETF 的历史表现，了解科技股权重、最终价值、总回报、最大回撤和风险限制。",
    h1: "QQQ 定投计算器",
    intro:
      "QQQ 定投计算器适合用来研究每月买入 Invesco QQQ Trust 的历史表现。QQQ 跟踪 Nasdaq-100，通常科技和大型成长公司权重较高，因此回报和回撤可能与更广泛的 S&P 500 ETF 明显不同。",
    ctaQuery: "?market=us&type=ETF&asset=QQQ",
    sections: [
      {
        title: "QQQ 是什么？",
        body: "QQQ 是 Invesco QQQ Trust，跟踪 Nasdaq-100 指数。Nasdaq-100 包含在 Nasdaq 上市的非金融大型公司，科技、通信服务和成长型公司占比通常较高，因此 QQQ 常被用来研究美国成长股和科技股敞口。",
      },
      {
        title: "QQQ 定投计算器可以做什么",
        body: "你可以设置每月投入金额、开始年份、结束年份和显示货币，查看总投入、最终价值、总利润、总回报、年化回报估算和最大回撤。它可以帮助你理解 QQQ 在不同市场阶段的历史定投路径。",
      },
      {
        title: "示例使用场景",
        body: "例如，你可以比较从 2015 年、2018 年或 2020 年开始每月定投 QQQ 的结果。不同起点可能经历不同的科技股周期、估值变化和市场回撤，因此最终结果可能差异很大。",
      },
      {
        title: "回测怎样运行",
        body: "当历史数据可用时，系统会使用由历史每日调整收盘价生成的月度价格。每月投入会按当月价格换算为估算份额，最终用期末价格计算组合价值。若数据缺失，页面会显示示例数据提示。",
      },
      {
        title: "费用、股息、汇率和税务限制",
        body: "真实 QQQ 投资结果可能受到基金费用、股息处理、税务、券商佣金、买卖价差、汇率转换和成交价格影响。Yahoo Finance 数据也可能与官方基金数据、交易所数据或券商记录不同。",
      },
      {
        title: "风险与免责声明",
        body: "QQQ 的行业集中度可能带来更大波动。过去表现不代表未来表现，本页面仅供教育用途，不构成投资建议，也不保证未来收益。",
      },
    ],
    faqs: [
      {
        question: "QQQ 定投计算器可以代表未来收益吗？",
        answer:
          "不能。它只能展示所选历史区间的模拟结果，未来市场表现可能完全不同。",
      },
      {
        question: "QQQ 和 VOO 的定投结果为什么可能差很多？",
        answer:
          "QQQ 跟踪 Nasdaq-100，科技和成长股权重通常较高；VOO 跟踪 S&P 500，行业分布更广。指数差异会影响回报和回撤。",
      },
      {
        question: "QQQ 回测有没有包含手续费和汇率？",
        answer:
          "基础历史结果主要基于价格数据。高级设置可以模拟部分费用，但真实税务、汇率、股息和成交价格仍可能不同。",
      },
      {
        question: "QQQ 定投结果是否构成投资建议？",
        answer:
          "不构成。本页面仅供教育用途，不推荐买入、卖出或持有任何资产。",
      },
    ],
  };
}

function getZhTwAssetOverride(slug: AssetSeoPageSlug): SeoPageContent | undefined {
  if (slug !== "qqq-dca-calculator") {
    return undefined;
  }

  return {
    title: "QQQ 定期定額計算機 | Nasdaq-100 ETF 回測工具",
    description:
      "使用 QQQ 定期定額計算機回測每月買入 Nasdaq-100 ETF 的歷史表現，了解科技股權重、最終價值、總報酬、最大回撤和風險限制。",
    h1: "QQQ 定期定額計算機",
    intro:
      "QQQ 定期定額計算機適合用來研究每月買入 Invesco QQQ Trust 的歷史表現。QQQ 追蹤 Nasdaq-100，通常科技和大型成長公司權重較高，因此報酬和回撤可能與更廣泛的 S&P 500 ETF 明顯不同。",
    ctaQuery: "?market=us&type=ETF&asset=QQQ",
    sections: [
      {
        title: "QQQ 是什麼？",
        body: "QQQ 是 Invesco QQQ Trust，追蹤 Nasdaq-100 指數。Nasdaq-100 包含在 Nasdaq 上市的非金融大型公司，科技、通訊服務和成長型公司占比通常較高，因此 QQQ 常被用來研究美國成長股和科技股曝險。",
      },
      {
        title: "QQQ 定期定額計算機可以做什麼",
        body: "你可以設定每月投入金額、開始年份、結束年份和顯示貨幣，查看總投入、最終價值、總利潤、總報酬、年化報酬估算和最大回撤。它可以協助理解 QQQ 在不同市場階段的歷史定期定額路徑。",
      },
      {
        title: "示例使用情境",
        body: "例如，你可以比較從 2015 年、2018 年或 2020 年開始每月投入 QQQ 的結果。不同起點可能經歷不同的科技股循環、估值變化和市場回撤，因此最終結果可能差異很大。",
      },
      {
        title: "回測怎樣運作",
        body: "當歷史資料可用時，系統會使用由歷史每日調整收盤價生成的月度價格。每月投入會按當月價格換算為估算單位，最終用期末價格計算投資組合價值。若資料缺失，頁面會顯示範例資料提示。",
      },
      {
        title: "費用、股息、匯率和稅務限制",
        body: "真實 QQQ 投資結果可能受到基金費用、股息處理、稅務、券商手續費、買賣價差、匯率轉換和成交價格影響。Yahoo Finance 資料也可能與官方基金資料、交易所資料或券商紀錄不同。",
      },
      {
        title: "風險與免責聲明",
        body: "QQQ 的產業集中度可能帶來更大波動。過去表現不代表未來表現，本頁面僅供教育用途，不構成投資建議，也不保證未來收益。",
      },
    ],
    faqs: [
      {
        question: "QQQ 定期定額計算機可以代表未來報酬嗎？",
        answer:
          "不能。它只能展示所選歷史區間的模擬結果，未來市場表現可能完全不同。",
      },
      {
        question: "QQQ 和 VOO 的定期定額結果為什麼可能差很多？",
        answer:
          "QQQ 追蹤 Nasdaq-100，科技和成長股權重通常較高；VOO 追蹤 S&P 500，產業分布更廣。指數差異會影響報酬和回撤。",
      },
      {
        question: "QQQ 回測有沒有包含手續費和匯率？",
        answer:
          "基礎歷史結果主要基於價格資料。進階設定可以模擬部分費用，但真實稅務、匯率、股息和成交價格仍可能不同。",
      },
      {
        question: "QQQ 定期定額結果是否構成投資建議？",
        answer:
          "不構成。本頁面僅供教育用途，不推薦買入、賣出或持有任何資產。",
      },
    ],
  };
}

function buildAssetPages(locale: Locale): Record<AssetSeoPageSlug, SeoPageContent> {
  const text = assetLocaleText[locale];

  return Object.fromEntries(
    assetSeoPageSlugs.map((slug) => {
      const zhCnOverride =
        locale === "zh-CN" ? getZhCnAssetOverride(slug) : undefined;
      const zhTwOverride =
        locale === "zh-TW" ? getZhTwAssetOverride(slug) : undefined;

      if (zhCnOverride) {
        return [slug, zhCnOverride];
      }

      if (zhTwOverride) {
        return [slug, zhTwOverride];
      }

      const asset = assetDefinitions[slug];

      return [
        slug,
        {
          title: text.title(asset),
          description: text.description(asset),
          h1: text.h1(asset),
          intro: text.intro(asset),
          ctaQuery: `?market=${asset.countryQuery}&type=${asset.assetType}&asset=${encodeURIComponent(asset.symbol)}`,
          sections: [
            { title: text.whatTitle(asset), body: text.whatBody(asset) },
            { title: text.dcaTitle(asset), body: text.dcaBody(asset) },
            { title: text.dataTitle, body: text.dataBody },
            { title: text.riskTitle, body: text.riskBody },
          ],
          faqs: [
            { question: text.faqOne(asset), answer: text.faqOneAnswer(asset) },
            { question: text.faqTwo(asset), answer: text.faqTwoAnswer(asset) },
            { question: `${asset.symbol}: ${text.faqThree}`, answer: text.faqThreeAnswer },
          ],
        },
      ];
    })
  ) as Record<AssetSeoPageSlug, SeoPageContent>;
}

function getZhCnMalaysiaGuidePage(slug: MalaysiaGuideSeoPageSlug): SeoPageContent {
  const pages: Record<MalaysiaGuideSeoPageSlug, SeoPageContent> = {
    "how-to-buy-cspx-from-malaysia": {
      title: "马来西亚怎么买 CSPX | CSPX 定投与 UCITS ETF 教育指南",
      description:
        "面向马来西亚中文用户的 CSPX 教育指南：了解 UCITS ETF、爱尔兰注册、伦敦交易所、券商支持、费用、汇率、税务和 CSPX 定投回测。",
      h1: "马来西亚怎么买 CSPX",
      intro:
        "很多马来西亚投资者会研究 CSPX，因为它是爱尔兰注册、在伦敦交易所等市场上市的 UCITS ETF，常被非美国投资者用于取得 S&P 500 敞口。本页面用中文整理购买前需要了解的步骤、成本、风险和回测方式，仅供教育用途。",
      ctaQuery: "?market=ucits&type=ETF&asset=CSPX.L",
      sections: [
        {
          title: "CSPX 是什么",
          body: "CSPX 通常指 iShares Core S&P 500 UCITS ETF 的相关份额类别，目标是追踪 S&P 500。它属于 UCITS ETF，基金注册地通常为爱尔兰，并在伦敦交易所等市场交易。马来西亚投资者关注 CSPX，常见原因包括 UCITS 结构、爱尔兰注册地、可能的股息累积份额类别，以及与美国上市 ETF 不同的税务和平台可用性。",
        },
        {
          title: "马来西亚购买 CSPX 的一般步骤",
          body: "第一步，确认自己想买的是哪个交易所和哪个代码，例如 CSPX.L 或券商平台显示的具体份额类别。第二步，检查券商是否支持伦敦交易所和相关 UCITS ETF。第三步，了解入金方式、MYR 到 USD 或其他交易货币的换汇流程。第四步，查看交易佣金、平台费、托管费、点差和最低交易金额。第五步，买入前再次核对代码、货币、交易所、订单类型和风险。",
        },
        {
          title: "用 CSPX 定投计算器做情景分析",
          body: "在真正投资前，可以先用 CSPX 定投计算器测试每月投入的历史模拟结果。你可以设置每月投入金额、开始年份、结束年份和显示货币，观察总投入、最终价值、总回报、年化回报估算和最大回撤。回测结果只是历史模拟，不代表未来表现。",
        },
        {
          title: "费用、汇率、税务和股息限制",
          body: "马来西亚用户需要自行检查券商支持、交易佣金、换汇价差、平台费、税务规则、预扣税、股息处理和成交价格。CSPX 的数据可能来自 Yahoo Finance，并可能与官方 NAV、交易所或券商记录不同。不同券商对伦敦交易所、碎股、订单类型和交易货币的支持也可能不同。",
        },
        {
          title: "真实投资前可以先检查哪些工具",
          body: "在行动前，用户可以分别比较券商平台、换汇或转账工具、费用表、入金路径和报表功能。重点不是找一个永远最好的平台，而是确认该平台是否支持你要买的市场、交易货币、订单类型、税务文件和风险承受范围。平台可用性、费用和条款可能变化，应以官方资料为准。",
        },
        {
          title: "Affiliate / referral disclosure",
          body: "部分链接未来可能是 affiliate / referral link。我们可能获得佣金，但这不会影响内容的教育性质。任何券商、ETF 或工具都不应被视为适合所有人的推荐。",
        },
        {
          title: "风险与免责声明",
          body: "本页面仅供教育用途，不构成投资建议、税务建议或法律建议。CSPX 和任何 ETF 都可能下跌，过去表现不代表未来表现，也不保证未来收益。马来西亚投资者应自行判断，并在需要时咨询持牌财务顾问或税务专业人士。",
        },
      ],
      faqs: [
        {
          question: "马来西亚可以买 CSPX 吗？",
          answer:
            "一般需要使用支持伦敦交易所和 UCITS ETF 的券商，并确认具体代码、交易货币、费用、换汇、税务和风险。不同券商支持情况可能改变，应以官方资料为准。",
        },
        {
          question: "马来西亚可以买 VOO 吗？",
          answer:
            "很多券商可能提供美股 ETF 交易权限，但支持情况、费用、股息税和账户条件会变化。用户应在官方券商平台确认 VOO 是否可交易。",
        },
        {
          question: "CSPX 和 VOO 哪个适合马来西亚投资者？",
          answer:
            "没有固定答案。CSPX 和 VOO 在注册地、交易所、货币、股息处理、税务和券商支持方面可能不同，用户应按自身情况比较。",
        },
        {
          question: "买海外 ETF 要注意哪些费用？",
          answer:
            "常见费用包括交易佣金、平台费、托管费、换汇价差、买卖价差、入金或出金费用，以及可能的税务成本。",
        },
        {
          question: "券商费用和汇率会影响定投结果吗？",
          answer:
            "会。长期定投中，换汇成本、固定手续费、百分比费用、买卖价差和成交价格都可能影响真实结果。",
        },
        {
          question: "这些内容是不是投资建议？",
          answer:
            "不是。本页面仅供教育用途，不构成投资建议、券商推荐、税务建议或法律建议。",
        },
      ],
    },
    "how-to-invest-in-voo-from-malaysia": {
      title: "马来西亚怎么买 VOO | 美股 ETF 定投教育指南",
      description:
        "了解马来西亚投资 VOO 和美股 ETF 前需要考虑的券商支持、股息税、遗产税风险、汇率、费用、VOO 定投和回测限制。",
      h1: "马来西亚怎么买 VOO",
      intro:
        "VOO 是美国上市的 Vanguard S&P 500 ETF，常被用来研究美国大型股市场敞口。马来西亚投资者在购买 VOO 前，需要了解美股 ETF、券商支持、股息预扣税、美国遗产税风险、汇率风险和交易成本。",
      ctaQuery: "?market=us&type=ETF&asset=VOO",
      sections: [
        {
          title: "VOO 是什么",
          body: "VOO 是美国上市 ETF，目标是追踪 S&P 500 指数。它与 CSPX 都可以用于研究 S&P 500 敞口，但基金注册地、交易市场、股息处理、税务和平台支持可能不同。不能简单说 VOO 一定比 CSPX 好，或 CSPX 一定比 VOO 好。",
        },
        {
          title: "马来西亚投资 VOO 的一般步骤",
          body: "第一步，选择支持美股 ETF 的券商，并确认账户是否可以交易 VOO。第二步，了解从 MYR 入金到 USD 交易的换汇流程和成本。第三步，检查交易佣金、平台费、股息税处理、碎股支持和订单类型。第四步，在下单前确认代码、交易所、交易货币和风险。",
        },
        {
          title: "用 VOO 定投计算器做历史模拟",
          body: "你可以使用 VOO 定投计算器，测试从不同年份开始每月投入 VOO 的历史表现。计算器会估算总投入、最终价值、总利润、总回报、年化回报估算和最大回撤。它适合做教育性情景分析，不是未来收益预测。",
        },
        {
          title: "股息税、遗产税、汇率和费用",
          body: "马来西亚用户研究美国上市 ETF 时，通常需要了解美国股息预扣税、潜在遗产税风险、券商费用、换汇成本、买卖价差、成交价格和本地税务申报要求。相关规则可能变化，应以官方券商、税务和监管资料为准。",
        },
        {
          title: "真实投资前可以先检查哪些工具",
          body: "研究 VOO 前，用户可以先比较券商是否支持美股 ETF、MYR 到 USD 的换汇路径、转账成本、报表下载、股息税文件和账户安全设置。工具选择不应只看广告或促销，也不应假设某个平台永远最低成本。请以官方费用表、条款和风险说明为准。",
        },
        {
          title: "Affiliate / referral disclosure",
          body: "部分链接未来可能是 affiliate / referral link。我们可能获得佣金，但这不会影响内容的教育性质。券商或 ETF 的选择应由用户自行判断。",
        },
        {
          title: "风险与免责声明",
          body: "本页面仅供教育用途，不构成投资建议、税务建议或法律建议。VOO 可能下跌，汇率也可能波动。过去表现不代表未来表现，用户应自行判断或咨询持牌财务顾问。",
        },
      ],
      faqs: [
        {
          question: "马来西亚用户可以买 CSPX 来比较 VOO 吗？",
          answer:
            "可以研究支持伦敦交易所或 UCITS ETF 的券商，但实际可交易性、代码、货币和费用应以券商官方资料为准。",
        },
        {
          question: "马来西亚怎么买 VOO？",
          answer:
            "通常需要使用支持美股 ETF 的券商，完成开户、入金、换汇，并确认 VOO 的交易权限、费用和订单细节。",
        },
        {
          question: "VOO 和 CSPX 哪个更适合马来西亚投资者研究？",
          answer:
            "没有一定答案。两者在基金注册地、交易市场、税务、股息处理、券商支持和费用方面可能不同，需要按个人情况比较。",
        },
        {
          question: "买 VOO 这类海外 ETF 要注意哪些费用？",
          answer:
            "常见费用包括交易佣金、平台费、换汇价差、买卖价差、入金出金费用，以及与股息或税务处理相关的成本。",
        },
        {
          question: "VOO 定投时券商费用和汇率会影响结果吗？",
          answer:
            "会。定投金额、手续费、百分比费用、汇率、点差和成交价格都会影响真实投资结果，回测只能作为教育模拟。",
        },
        {
          question: "这篇 VOO 指南是不是投资建议？",
          answer:
            "不是。本页面仅供教育用途，不构成投资建议、券商推荐、税务建议或法律建议。",
        },
      ],
    },
    "best-etf-broker-malaysia": {
      title: "马来西亚 ETF 券商怎么选 | 买美股 ETF 与 UCITS ETF 教育指南",
      description:
        "马来西亚 ETF 券商选择指南：了解美股 ETF、CSPX、VOO、VWRA、IWDA、费用、换汇、市场支持、税务和平台限制。",
      h1: "马来西亚 ETF 券商怎么选",
      intro:
        "选择 ETF 券商时，马来西亚中文用户通常会比较是否支持美股 ETF、UCITS ETF、伦敦交易所、换汇、费用、入金方式、平台稳定性和税务资料。本页面提供中立的教育性检查清单，不推荐任何券商一定最好。",
      sections: [
        {
          title: "先确认你想买什么 ETF",
          body: "如果你想买 VOO 或 QQQ，需要确认券商是否支持美股 ETF。如果你想买 CSPX、VWRA 或 IWDA，需要确认是否支持伦敦交易所或相关 UCITS ETF。不同券商支持的市场、代码显示、交易货币和订单类型可能不同。",
        },
        {
          title: "比较 ETF 券商时可以看哪些项目",
          body: "常见比较项目包括开户门槛、入金方式、MYR 换汇成本、交易佣金、平台费、托管费、碎股支持、市场覆盖、报表下载、客服语言、移动 App 易用性和安全设置。不要只看单一费用，因为总成本可能来自多个环节。",
        },
        {
          title: "费用和优惠可能变化",
          body: "券商费用、市场支持、促销活动、入金渠道和汇率点差都可能随时间改变。本页面不列出需要频繁维护的精确促销或费用排名。用户应在开户或交易前查看券商官方网站和最新费用表。",
        },
        {
          title: "如何配合 ETF 定投计算器使用",
          body: "在选择券商前，你可以先用 DCA 定投计算器或 ETF 对比计算器测试资产本身的历史模拟结果，例如 VOO 定投、CSPX 定投或 VOO vs CSPX。然后再把券商费用、换汇和税务因素纳入自己的判断。",
        },
        {
          title: "真实投资前可以先检查哪些工具",
          body: "用户可以分别了解券商平台、换汇或转账工具、投资组合记录工具和官方费用表。券商选择、换汇渠道和交易市场支持都可能影响体验，但这些工具本身不代表投资收益，也不保证更低成本。请在官方页面核实可用性、费用、风险和条款。",
        },
        {
          title: "Affiliate / referral disclosure",
          body: "部分链接未来可能是 affiliate / referral link。我们可能获得佣金，但这不会影响内容的教育性质。任何券商介绍都不应被理解为保证适合所有人。",
        },
        {
          title: "风险与免责声明",
          body: "本页面仅供教育用途，不构成投资建议、券商推荐、税务建议或法律建议。券商服务、费用和监管状态可能变化，用户应自行核实官方资料，并自行承担投资和平台选择责任。",
        },
      ],
      faqs: [
        {
          question: "马来西亚 ETF 券商需要支持 CSPX 吗？",
          answer:
            "可以研究支持伦敦交易所或 UCITS ETF 的券商，但实际支持、费用和交易权限应以官方资料为准。",
        },
        {
          question: "马来西亚 ETF 券商需要支持 VOO 吗？",
          answer:
            "可能可以通过支持美股 ETF 的券商交易，但用户应确认账户权限、交易费用、换汇成本和税务资料。",
        },
        {
          question: "选择券商时如何比较 CSPX 和 VOO 的需求？",
          answer:
            "没有统一答案。两者在基金注册地、税务、股息处理、交易市场、货币和券商支持方面可能不同。",
        },
        {
          question: "通过券商买海外 ETF 要注意哪些费用？",
          answer:
            "可以关注交易佣金、平台费、换汇价差、买卖价差、入金出金费用、托管费和税务相关成本。",
        },
        {
          question: "券商费用和汇率会怎样影响定投结果？",
          answer:
            "会。长期定投中，费用和汇率差异会累积影响净投入、买入份额和最终结果。",
        },
        {
          question: "这篇券商指南是不是投资建议？",
          answer:
            "不是。本页面仅供教育用途，不构成投资建议、券商推荐、税务建议或法律建议。",
        },
      ],
    },
    "ibkr-vs-moomoo-malaysia": {
      title: "IBKR vs Moomoo 马来西亚 | ETF 券商中立比较指南",
      description:
        "IBKR vs Moomoo 马来西亚中文比较：了解美股 ETF、UCITS ETF、费用、换汇、市场支持、平台体验、税务资料和风险限制。",
      h1: "IBKR vs Moomoo 马来西亚",
      intro:
        "IBKR 和 Moomoo 都是马来西亚投资者常拿来比较的券商选择。两者可能在市场覆盖、费用结构、换汇、平台体验、ETF 支持和报表工具方面不同。本页面保持中立，不说哪一个永远更好。",
      sections: [
        {
          title: "比较前先明确投资需求",
          body: "如果你的重点是买美股 ETF，例如 VOO 或 QQQ，需要确认美股市场支持、交易费用、股息税资料和换汇成本。如果你的重点是买 UCITS ETF，例如 CSPX、VWRA 或 IWDA，需要确认伦敦交易所或相关市场支持。不同需求可能对应不同平台优势。",
        },
        {
          title: "IBKR 和 Moomoo 可以比较哪些方面",
          body: "常见比较维度包括可交易市场、ETF 覆盖、佣金结构、换汇方式、入金出金、平台语言、移动体验、研究工具、报表、税务文件、安全设置和客服。某个平台对某类用户方便，不代表对所有人都最好。",
        },
        {
          title: "不要依赖过期费用或促销信息",
          body: "券商费用、汇率点差、促销、市场支持和产品权限都可能变化。本页面不会列出需要频繁维护的精确费用排名。用户应在开户、入金或下单前查看 IBKR、Moomoo 或相关券商官方网站的最新资料。",
        },
        {
          title: "如何用回测工具辅助判断资产而不是券商",
          body: "券商比较解决的是交易渠道问题，ETF 定投回测解决的是资产历史情景问题。你可以先用 VOO 定投计算器、CSPX 定投计算器或 ETF 对比计算器理解资产差异，再单独比较券商费用、换汇和平台体验。",
        },
        {
          title: "真实投资前可以先检查哪些工具",
          body: "比较 IBKR、Moomoo 或其他平台时，可以同时记录换汇工具、入金路径、交易市场、费用表、报表功能和税务文件可用性。平台条款、市场支持和促销活动可能变化，用户应以官方信息为准，并避免只根据单一广告或奖励做决定。",
        },
        {
          title: "Affiliate / referral disclosure",
          body: "部分链接未来可能是 affiliate / referral link。我们可能获得佣金，但这不会影响内容的教育性质。任何券商比较都不构成开户建议或投资建议。",
        },
        {
          title: "风险与免责声明",
          body: "本页面仅供教育用途，不构成投资建议、券商推荐、税务建议或法律建议。券商服务可能变化，投资产品可能亏损，汇率也可能波动。用户应自行判断并核实官方资料。",
        },
      ],
      faqs: [
        {
          question: "IBKR 或 Moomoo 可以让马来西亚用户买 CSPX 吗？",
          answer:
            "可以研究支持伦敦交易所或 UCITS ETF 的券商，但不同平台对 CSPX 或相关代码的支持可能不同，应以官方资料为准。",
        },
        {
          question: "IBKR 或 Moomoo 可以让马来西亚用户买 VOO 吗？",
          answer:
            "很多用户会通过支持美股 ETF 的券商研究 VOO，但交易权限、费用、股息税和账户条件需要自行核实。",
        },
        {
          question: "比较 IBKR 和 Moomoo 时如何看 CSPX 和 VOO？",
          answer:
            "没有固定答案。CSPX 和 VOO 涉及不同注册地、交易所、税务、股息处理、货币和券商支持。",
        },
        {
          question: "用券商买海外 ETF 要注意哪些费用？",
          answer:
            "需要关注交易佣金、平台费、换汇价差、买卖价差、入金出金费用、托管费和可能的税务成本。",
        },
        {
          question: "IBKR vs Moomoo 比较中汇率和费用重要吗？",
          answer:
            "会。费用、汇率和成交价格会影响每月净投入、可买份额和长期结果，尤其在定投时间较长时更明显。",
        },
        {
          question: "这篇 IBKR vs Moomoo 比较是不是投资建议？",
          answer:
            "不是。本页面仅供教育用途，不构成券商推荐、开户建议或投资建议。",
        },
      ],
    },
  };

  return pages[slug];
}

function getGenericMalaysiaGuidePage(slug: MalaysiaGuideSeoPageSlug): SeoPageContent {
  const titleMap: Record<MalaysiaGuideSeoPageSlug, string> = {
    "how-to-buy-cspx-from-malaysia": "How to Buy CSPX from Malaysia",
    "how-to-invest-in-voo-from-malaysia": "How to Invest in VOO from Malaysia",
    "best-etf-broker-malaysia": "Malaysia ETF Broker Guide",
    "ibkr-vs-moomoo-malaysia": "IBKR vs Moomoo Malaysia",
  };
  const h1 = titleMap[slug];

  return {
    title: `${h1} | Educational ETF Guide`,
    description:
      "Educational guide for Malaysia-based investors researching ETFs, brokers, currency conversion, taxes, data limitations, and DCA backtesting.",
    h1,
    intro:
      "This educational guide explains ETF access, broker considerations, fees, currency conversion, taxes, and historical backtesting for Malaysia-based investors.",
    sections: [
      {
        title: "Educational overview",
        body: "The page helps users think through ETF access, market availability, broker support, cost structure, and the difference between historical scenarios and future outcomes.",
      },
      {
        title: "Important considerations",
        body: "Users should verify broker availability, fees, currency conversion, tax treatment, dividend handling, execution price, data source quality, and local rules on official websites before acting.",
      },
      {
        title: "Affiliate disclosure",
        body: "Some links may become affiliate or referral links in the future. We may receive compensation, but the content remains educational.",
      },
      {
        title: "Risk and disclaimer",
        body: "This page is for educational purposes only and is not financial advice, broker recommendation, tax advice, or legal advice. Past performance does not guarantee future results.",
      },
    ],
    faqs: [
      {
        question: "Is this investment advice?",
        answer:
          "No. It is educational content only and does not recommend any ETF, broker, or strategy.",
      },
      {
        question: "Can fees and availability change?",
        answer:
          "Yes. Broker fees, market access, promotions, and product availability can change, so users should verify official sources.",
      },
    ],
  };
}

function buildMalaysiaGuidePages(
  locale: Locale
): Record<MalaysiaGuideSeoPageSlug, SeoPageContent> {
  return Object.fromEntries(
    malaysiaGuideSeoPageSlugs.map((slug) => [
      slug,
      locale === "zh-CN"
        ? getZhCnMalaysiaGuidePage(slug)
        : getGenericMalaysiaGuidePage(slug),
    ])
  ) as Record<MalaysiaGuideSeoPageSlug, SeoPageContent>;
}

const zhCnLearningPages: Record<ChineseLearningSeoPageSlug, SeoPageContent> = {
  "cspx-vs-voo-malaysia": {
    title: "CSPX vs VOO 马来西亚 | ETF 定投与回测教育指南",
    description:
      "面向马来西亚中文用户，比较 CSPX 与 VOO 在基金注册地、交易市场、股息税、费用、货币和定投回测上的差异。",
    h1: "CSPX vs VOO：马来西亚投资者教育指南",
    intro:
      "CSPX 和 VOO 都常被用于研究 S&P 500 敞口，但它们不是完全相同的产品。本页帮助马来西亚中文用户理解 UCITS ETF、美国上市 ETF、费用、汇率、股息、税务和回测限制，不判断哪个一定更好。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "第一步：先理解两个 ETF 的结构",
        body: "VOO 是美国上市 ETF，CSPX 通常指爱尔兰注册、在伦敦交易所等市场上市的 UCITS ETF。两者都可用于研究 S&P 500 敞口，但注册地、交易市场、交易货币、股息处理和税务路径可能不同。",
      },
      {
        title: "第二步：比较马来西亚用户会遇到的实际问题",
        body: "购买前应核实券商是否支持相关市场、是否能交易 CSPX.L 或 VOO、入金和换汇路径、交易佣金、平台费、买卖价差、订单类型、报表和税务文件。平台可用性可能变化，应以官方资料为准。",
      },
      {
        title: "第三步：用回测工具做相同假设比较",
        body: "你可以使用 /zh-CN/etf-comparison-calculator 或 /zh-CN/voo-vs-cspx，用相同每月投入金额、开始年份和结束年份比较历史结果。回测只能说明过去某个区间的表现，不代表未来。",
      },
      {
        title: "示例用法",
        body: "例如，你可以测试 2018 到 2025 年每月投入 1000 美元到 VOO 与 CSPX 的历史模拟结果，再阅读 /zh-CN/disclaimer 和 /zh-CN/supported-assets，确认数据来源、样本数据和费用限制。",
      },
      {
        title: "需要特别注意什么",
        body: "真实投资结果可能受到交易费用、换汇点差、股息处理、预扣税、遗产税风险、平台可用性、成交价格和追踪误差影响。马来西亚用户也应确认券商是否支持相关市场和官方条款。",
      },
      {
        title: "相关工具和下一步",
        body: "可以继续阅读 /zh-CN/learn、/zh-CN/voo-vs-cspx、/zh-CN/voo-dca-calculator、/zh-CN/cspx-dca-calculator、/zh-CN/etf-comparison-calculator 和 /zh-CN/recommended-tools。所有内容仅供教育用途。",
      },
    ],
    faqs: [
      {
        question: "马来西亚投资者一定要选 CSPX 或 VOO 其中一个吗？",
        answer:
          "不是。本页只解释差异，不推荐任何 ETF。选择取决于个人情况、券商支持、费用、税务和风险承受能力。",
      },
      {
        question: "CSPX 和 VOO 的回测结果为什么可能不同？",
        answer:
          "价格数据、基金结构、股息处理、货币、费用和交易市场都可能让结果不同。",
      },
      {
        question: "马来西亚用户要注意哪些费用？",
        answer:
          "常见项目包括交易佣金、平台费、换汇价差、买卖价差、入金出金费用、托管费和税务相关成本。",
      },
      {
        question: "这篇 CSPX vs VOO 马来西亚指南是不是投资建议？",
        answer:
          "不是。本页仅供教育用途，不构成投资建议、税务建议、法律建议或买卖建议。",
      },
    ],
  },
  "voo-vs-qqq-dca": {
    title: "VOO vs QQQ DCA 回测 | ETF 定投比较指南",
    description:
      "学习如何用 DCA 回测比较 VOO 与 QQQ，理解 S&P 500 与 Nasdaq-100 敞口、行业集中度、回撤和历史区间差异。",
    h1: "VOO vs QQQ DCA 回测指南",
    intro:
      "VOO 和 QQQ 都是常见美国 ETF，但市场敞口不同。VOO 偏向 S&P 500 广泛市场，QQQ 偏向 Nasdaq-100 和科技成长权重。本页说明如何用相同投入条件做历史 DCA 比较。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "第一步：理解资产差异",
        body: "VOO 通常代表美国大型股广泛市场敞口，QQQ 更集中于 Nasdaq-100 成分股，科技和成长股权重可能更高。不同年份的历史表现和回撤可能差很多。",
      },
      {
        title: "第二步：设置相同回测条件",
        body: "使用 /zh-CN/etf-comparison-calculator 时，应尽量让每月投入金额、开始年份、结束年份和显示货币一致，这样比较才更聚焦于资产价格路径，而不是输入假设差异。",
      },
      {
        title: "第三步：观察回报和风险指标",
        body: "除了最终价值，也要看总投入、总利润、年化回报估算、最大回撤和图表路径。较高历史最终价值不代表未来一定较好。",
      },
      {
        title: "示例用法",
        body: "可以测试 2018 到 2025 年每月投入 500 或 1000 美元，比较 VOO 和 QQQ 的历史 DCA 结果，再打开 /zh-CN/voo-dca-calculator 与 /zh-CN/qqq-dca-calculator 查看单一资产页面。",
      },
      {
        title: "需要特别注意什么",
        body: "VOO 和 QQQ 的行业集中度、估值敏感度、回撤路径和上涨周期可能不同。历史较高最终价值并不代表未来会继续领先，也不代表适合所有投资者。",
      },
      {
        title: "相关工具和下一步",
        body: "可以继续使用 /zh-CN/etf-comparison-calculator、/zh-CN/voo-vs-qqq、/zh-CN/voo-dca-calculator、/zh-CN/qqq-dca-calculator、/zh-CN/dca-vs-lump-sum 和 /zh-CN/disclaimer。",
      },
    ],
    faqs: [
      {
        question: "VOO vs QQQ 哪个历史定投结果更好？",
        answer:
          "这取决于开始时间、结束时间和市场周期。不能用一个历史区间判断未来。",
      },
      {
        question: "QQQ 风险一定比 VOO 高吗？",
        answer:
          "QQQ 通常行业集中度更高，但风险需要结合估值、市场周期、持有期和个人承受能力理解。",
      },
      {
        question: "DCA 回测包含所有费用吗？",
        answer:
          "计算器可模拟部分费用设置，但真实结果还可能受税务、汇率、买卖价差、股息和成交价格影响。",
      },
      {
        question: "这是 ETF 推荐吗？",
        answer:
          "不是。本页仅用于教育比较，不推荐购买 VOO、QQQ 或任何 ETF。",
      },
    ],
  },
  "etf-dca-backtest-guide": {
    title: "ETF 定投回测指南 | 如何使用 DCA Backtest",
    description:
      "学习 ETF 定投回测如何工作，如何设置每月投入、开始年份、结束年份、费用和资产，并理解历史数据限制。",
    h1: "ETF 定投回测指南",
    intro:
      "ETF 定投回测可以帮助你用历史价格模拟每月投入的结果。本页说明如何逐步使用 DCA Backtest、如何看结果，以及为什么回测不能代表未来收益。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "第一步：选择资产和市场",
        body: "先选择市场、资产类型和具体资产，例如 VOO、CSPX、QQQ、VWRA 或 IWDA。你也可以查看 /zh-CN/supported-assets 了解哪些资产有历史数据。",
      },
      {
        title: "第二步：设置投入金额和年份",
        body: "输入每月投入金额，选择开始年份和结束年份。年份范围会受到可用历史数据影响。如果某个资产没有历史数据，页面会标示示例数据。",
      },
      {
        title: "第三步：理解结果指标",
        body: "常见结果包括总投入、最终价值、总利润、总回报、年化回报估算和最大回撤。年化回报估算不是个人真实收益率，也不等于未来预期。",
      },
      {
        title: "示例用法",
        body: "例如，你可以在 /zh-CN/dca-calculator 测试 VOO 每月 1000 美元从 2018 到 2025 年的历史模拟，再调整年份观察结果变化。",
      },
      {
        title: "需要特别注意什么",
        body: "回测不是预测。真实结果可能因费用、税务、汇率、股息再投资、买卖价差、成交时间和数据来源不同而变化。若页面显示示例数据，不应把结果当作真实市场表现。",
      },
      {
        title: "相关工具和下一步",
        body: "可以从 /zh-CN/learn 进入学习中心，也可以查看 /zh-CN/supported-assets、/zh-CN/voo-dca-calculator、/zh-CN/cspx-dca-calculator、/zh-CN/qqq-dca-calculator 和 /zh-CN/etf-comparison-calculator。",
      },
    ],
    faqs: [
      {
        question: "ETF 定投回测准确吗？",
        answer:
          "它是基于可用历史价格和输入假设的模拟，不能完全反映真实券商成交、税费、汇率和个人现金流。",
      },
      {
        question: "为什么有些资产显示示例数据？",
        answer:
          "因为该资产的历史 CSV 数据尚未导入。示例数据只用于演示，不是真实市场表现。",
      },
      {
        question: "回测应该看哪个指标？",
        answer:
          "不要只看最终价值，也要看投入金额、回撤、时间区间、数据来源和费用假设。",
      },
      {
        question: "这是投资建议吗？",
        answer:
          "不是。回测结果只用于学习历史情景，不构成投资建议。",
      },
    ],
  },
  "dca-vs-lump-sum-guide": {
    title: "定投 vs 一次性投入指南 | DCA 与 Lump Sum 比较",
    description:
      "学习定投和一次性投入的差异，如何用相同总投入金额比较历史结果，以及市场时点、心理压力和风险限制。",
    h1: "定投 vs 一次性投入指南",
    intro:
      "定投是分批投入，一次性投入是在期初投入全部金额。两种方式的历史结果取决于市场路径、开始时间和结束时间。本页帮助你理解比较方式，而不是推荐哪种一定更好。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "第一步：理解投入节奏",
        body: "定投会把资金分散到多个买入时间点；一次性投入则更早获得市场敞口。上涨市场中一次性投入可能更有利，但下跌或震荡市场中定投可能降低一次买在高点的压力。",
      },
      {
        title: "第二步：使用相同总投入金额",
        body: "比较时应让总投入一致。例如每月 1000 美元投入 96 个月，总投入为 96000 美元；一次性投入情景则在期初投入同样总额。",
      },
      {
        title: "第三步：观察风险和心理因素",
        body: "除了最终价值，也要考虑最大回撤、市场时点、现金流现实、心理压力和风险承受能力。历史较高最终价值不等于未来一定较好。",
      },
      {
        title: "示例用法",
        body: "可以打开 /zh-CN/dca-vs-lump-sum 或 /zh-CN/dca-calculator，选择 VOO、CSPX 或 QQQ，测试不同年份的历史差异。",
      },
      {
        title: "需要特别注意什么",
        body: "一次性投入更依赖期初价格，定投更依赖持续现金流和纪律。比较时要留意最大回撤、资金使用时间、心理压力、手续费差异和税务影响。",
      },
      {
        title: "相关工具和下一步",
        body: "可以继续阅读 /zh-CN/dca-vs-lump-sum、/zh-CN/etf-dca-backtest-guide、/zh-CN/dca-calculator、/zh-CN/compound-interest-calculator 和 /zh-CN/disclaimer。",
      },
    ],
    faqs: [
      {
        question: "定投和一次性投入哪个更好？",
        answer:
          "没有固定答案。结果取决于时间区间、市场路径、风险承受能力和个人现金流。",
      },
      {
        question: "比较时为什么要用相同总投入？",
        answer:
          "这样可以避免一个情景投入更多资金导致结果不可比。",
      },
      {
        question: "一次性投入风险更高吗？",
        answer:
          "它更集中暴露于期初价格，因此短期波动和心理压力可能更明显。",
      },
      {
        question: "这是不是投资建议？",
        answer:
          "不是。本页只解释比较方法和历史模拟限制。",
      },
    ],
  },
  "compound-interest-guide": {
    title: "复利计算指南 | 每月投入与长期增长教育说明",
    description:
      "学习复利计算如何使用每月投入、年化回报假设和时间估算长期增长，并理解费用、税务和未来不确定性。",
    h1: "复利计算指南",
    intro:
      "复利计算器适合用来理解时间、每月投入和假设年化回报之间的关系。它不是收益承诺，也不能替代真实市场回测或个人财务规划。",
    ctaQuery: "",
    sections: [
      {
        title: "第一步：理解复利的核心",
        body: "复利指收益继续产生收益。在长期情景中，投入金额、投资时间和假设回报率都会影响最终估算值。",
      },
      {
        title: "第二步：谨慎设置年化回报假设",
        body: "年化回报只是输入假设，不是保证。真实市场每年表现可能大幅波动，费用、税务和汇率也会影响结果。",
      },
      {
        title: "第三步：区分复利预测和历史回测",
        body: "复利计算器使用固定假设回报；DCA 回测使用历史价格路径。两者适合回答不同问题，可以一起用于教育分析。",
      },
      {
        title: "示例用法",
        body: "例如，你可以在 /zh-CN/compound-interest-calculator 输入每月 500 美元、20 年和假设 8% 年化回报，再到 /zh-CN/dca-calculator 比较历史价格情景。",
      },
      {
        title: "需要特别注意什么",
        body: "复利计算通常使用平滑的假设年化回报，但真实市场不会每年稳定增长。费用、税务、通胀、汇率和现金流中断都会影响长期结果。",
      },
      {
        title: "相关工具和下一步",
        body: "可以继续阅读 /zh-CN/compound-interest-calculator、/zh-CN/dca-calculator、/zh-CN/etf-dca-backtest-guide、/zh-CN/dca-vs-lump-sum-guide 和 /zh-CN/learn。",
      },
    ],
    faqs: [
      {
        question: "复利计算器能保证收益吗？",
        answer:
          "不能。它只根据输入假设计算数学结果，不代表任何资产未来会按该回报率增长。",
      },
      {
        question: "每月投入会怎样影响复利结果？",
        answer:
          "每月投入越多、时间越长，在相同假设回报下最终估算值通常越高，但真实市场不保证固定回报。",
      },
      {
        question: "复利计算和 DCA 回测有什么不同？",
        answer:
          "复利计算使用固定回报假设；DCA 回测使用历史价格数据模拟每月买入。",
      },
      {
        question: "这是财务建议吗？",
        answer:
          "不是。本页仅供教育用途，不构成财务、投资、税务或法律建议。",
      },
    ],
  },
};

const zhTwLearningPages: Record<ChineseLearningSeoPageSlug, SeoPageContent> = {
  "cspx-vs-voo-malaysia": {
    title: "CSPX vs VOO 馬來西亞 | ETF 定期定額教育指南",
    description:
      "面向繁體中文使用者，比較 CSPX 與 VOO 在基金註冊地、交易市場、股息稅、費用、貨幣和定期定額回測上的差異。",
    h1: "CSPX vs VOO：馬來西亞投資者教育指南",
    intro:
      "CSPX 和 VOO 都常被用來研究 S&P 500 敞口，但基金結構、交易市場、貨幣、稅務和股息處理可能不同。本頁僅供教育用途，不判斷哪一個一定更好。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "第一步：理解兩個 ETF 的結構",
        body: "VOO 是美國上市 ETF，CSPX 通常指愛爾蘭註冊、在倫敦交易所等市場上市的 UCITS ETF。兩者都可用於研究 S&P 500 敞口，但註冊地、交易市場、交易貨幣和股息處理可能不同。",
      },
      {
        title: "第二步：比較實際操作因素",
        body: "使用者應核實券商是否支援相關市場、交易代號、入金與換匯方式、交易佣金、平台費、買賣價差、報表和稅務文件。平台可用性可能改變，應以官方資訊為準。",
      },
      {
        title: "第三步：用相同假設做回測",
        body: "可以使用 /zh-TW/etf-comparison-calculator 或 /zh-TW/voo-vs-cspx，用相同每月投入金額、開始年份和結束年份比較歷史結果。",
      },
      {
        title: "示例用法",
        body: "例如測試 2018 到 2025 年每月投入 1000 美元到 VOO 與 CSPX 的歷史情境，並閱讀 /zh-TW/disclaimer 了解限制。",
      },
      {
        title: "需要特別注意什麼",
        body: "真實投資結果可能受到交易費用、換匯點差、股息處理、預扣稅、遺產稅風險、平台可用性、成交價格和追蹤誤差影響。使用者應以券商和基金官方資訊為準。",
      },
      {
        title: "相關工具和下一步",
        body: "可以繼續閱讀 /zh-TW/learn、/zh-TW/voo-vs-cspx、/zh-TW/voo-dca-calculator、/zh-TW/cspx-dca-calculator、/zh-TW/etf-comparison-calculator 和 /zh-TW/recommended-tools。所有內容僅供教育用途。",
      },
    ],
    faqs: [
      {
        question: "CSPX 和 VOO 哪個一定更好？",
        answer:
          "沒有一定答案。兩者差異需要依照個人情況、券商支援、費用、稅務和風險承受能力判斷。",
      },
      {
        question: "回測結果可以代表未來嗎？",
        answer:
          "不能。回測只是歷史情境分析，未來市場和匯率都可能不同。",
      },
      {
        question: "需要注意哪些費用？",
        answer:
          "常見項目包括交易佣金、平台費、換匯價差、買賣價差、入金出金費用和稅務成本。",
      },
      {
        question: "這篇複利計算指南是投資建議嗎？",
        answer:
          "不是。本頁僅供教育用途，不構成投資、稅務或法律建議。",
      },
    ],
  },
  "voo-vs-qqq-dca": {
    title: "VOO vs QQQ DCA 回測 | ETF 定期定額比較指南",
    description:
      "學習如何用 DCA 回測比較 VOO 與 QQQ，理解 S&P 500 與 Nasdaq-100 敞口、集中度、回撤和歷史期間差異。",
    h1: "VOO vs QQQ DCA 回測指南",
    intro:
      "VOO 偏向 S&P 500 廣泛市場，QQQ 偏向 Nasdaq-100 和科技成長權重。本頁說明如何用相同投入條件做歷史 DCA 比較。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "第一步：理解資產差異",
        body: "VOO 通常代表美國大型股廣泛市場敞口，QQQ 更集中於 Nasdaq-100 成分股。不同年份的歷史表現和回撤可能差很多。",
      },
      {
        title: "第二步：設定相同回測條件",
        body: "使用 /zh-TW/etf-comparison-calculator 時，應讓每月投入金額、開始年份、結束年份和顯示貨幣一致。",
      },
      {
        title: "第三步：觀察報酬與風險",
        body: "除了最終價值，也要看總投入、總利潤、年化報酬估算、最大回撤和圖表路徑。",
      },
      {
        title: "示例用法",
        body: "可以測試 2018 到 2025 年每月投入 500 或 1000 美元，比較 VOO 和 QQQ 的歷史 DCA 結果。",
      },
      {
        title: "需要特別注意什麼",
        body: "VOO 和 QQQ 的產業集中度、估值敏感度、回撤路徑和上漲週期可能不同。歷史較高最終價值不代表未來會繼續領先，也不代表適合所有人。",
      },
      {
        title: "相關工具和下一步",
        body: "可以繼續使用 /zh-TW/etf-comparison-calculator、/zh-TW/voo-vs-qqq、/zh-TW/voo-dca-calculator、/zh-TW/qqq-dca-calculator、/zh-TW/dca-vs-lump-sum 和 /zh-TW/disclaimer。",
      },
    ],
    faqs: [
      {
        question: "VOO vs QQQ 哪個歷史定期定額結果更好？",
        answer:
          "取決於開始時間、結束時間和市場週期，不能用單一歷史區間判斷未來。",
      },
      {
        question: "QQQ 風險一定比 VOO 高嗎？",
        answer:
          "QQQ 通常集中度較高，但風險需要結合估值、週期、持有期和個人承受能力理解。",
      },
      {
        question: "回測包含所有費用嗎？",
        answer:
          "未必。真實結果還可能受稅務、匯率、買賣價差、股息和成交價格影響。",
      },
      {
        question: "這是 ETF 推薦嗎？",
        answer:
          "不是。本頁僅用於教育比較，不推薦購買任何 ETF。",
      },
    ],
  },
  "etf-dca-backtest-guide": {
    title: "ETF 定期定額回測指南 | 如何使用 DCA Backtest",
    description:
      "學習 ETF 定期定額回測如何運作，如何設定每月投入、開始年份、結束年份、費用和資產，並理解歷史資料限制。",
    h1: "ETF 定期定額回測指南",
    intro:
      "ETF 定期定額回測可以幫助你用歷史價格模擬每月投入的結果。本頁說明如何逐步使用 DCA Backtest，以及為什麼回測不能代表未來報酬。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "第一步：選擇資產和市場",
        body: "先選擇市場、資產類型和具體資產，例如 VOO、CSPX、QQQ、VWRA 或 IWDA。也可以查看 /zh-TW/supported-assets 了解資料覆蓋。",
      },
      {
        title: "第二步：設定投入金額和年份",
        body: "輸入每月投入金額，選擇開始年份和結束年份。年份範圍會受到可用歷史資料影響。",
      },
      {
        title: "第三步：理解結果指標",
        body: "常見結果包括總投入、最終價值、總利潤、總報酬、年化報酬估算和最大回撤。",
      },
      {
        title: "示例用法",
        body: "可以在 /zh-TW/dca-calculator 測試 VOO 每月 1000 美元從 2018 到 2025 年的歷史情境。",
      },
      {
        title: "需要特別注意什麼",
        body: "回測不是預測。真實結果可能因費用、稅務、匯率、股息再投入、買賣價差、成交時間和資料來源不同而變化。若頁面顯示範例資料，不應把結果當作真實市場表現。",
      },
      {
        title: "相關工具和下一步",
        body: "可以從 /zh-TW/learn 進入學習中心，也可以查看 /zh-TW/supported-assets、/zh-TW/voo-dca-calculator、/zh-TW/cspx-dca-calculator、/zh-TW/qqq-dca-calculator 和 /zh-TW/etf-comparison-calculator。",
      },
    ],
    faqs: [
      {
        question: "ETF 定期定額回測準確嗎？",
        answer:
          "它是基於可用歷史價格和輸入假設的模擬，不能完全反映真實券商成交、稅費和匯率。",
      },
      {
        question: "為什麼有些資產顯示範例資料？",
        answer:
          "因為該資產的歷史資料尚未匯入。範例資料只用於展示，不是真實市場表現。",
      },
      {
        question: "回測應該看哪個指標？",
        answer:
          "不要只看最終價值，也要看投入金額、回撤、期間、資料來源和費用假設。",
      },
      {
        question: "這是投資建議嗎？",
        answer:
          "不是。回測結果只用於學習歷史情境。",
      },
    ],
  },
  "dca-vs-lump-sum-guide": {
    title: "定期定額 vs 單筆投入指南 | DCA 與 Lump Sum 比較",
    description:
      "學習定期定額和單筆投入的差異，如何用相同總投入金額比較歷史結果，以及市場時點和心理風險。",
    h1: "定期定額 vs 單筆投入指南",
    intro:
      "定期定額是分批投入，單筆投入是在期初投入全部金額。兩種方式的歷史結果取決於市場路徑、開始時間和結束時間。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "第一步：理解投入節奏",
        body: "定期定額把資金分散到多個買入時間點；單筆投入則更早取得市場敞口。",
      },
      {
        title: "第二步：使用相同總投入金額",
        body: "比較時應讓總投入一致，避免一個情境投入更多資金導致結果不可比。",
      },
      {
        title: "第三步：觀察風險和心理因素",
        body: "除了最終價值，也要考慮最大回撤、市場時點、現金流現實和心理壓力。",
      },
      {
        title: "示例用法",
        body: "可以打開 /zh-TW/dca-vs-lump-sum 或 /zh-TW/dca-calculator，測試不同年份的歷史差異。",
      },
      {
        title: "需要特別注意什麼",
        body: "單筆投入更依賴期初價格，定期定額更依賴持續現金流和紀律。比較時要留意最大回撤、資金使用時間、心理壓力、手續費差異和稅務影響。",
      },
      {
        title: "相關工具和下一步",
        body: "可以繼續閱讀 /zh-TW/dca-vs-lump-sum、/zh-TW/etf-dca-backtest-guide、/zh-TW/dca-calculator、/zh-TW/compound-interest-calculator 和 /zh-TW/disclaimer。",
      },
    ],
    faqs: [
      {
        question: "定期定額和單筆投入哪個更好？",
        answer:
          "沒有固定答案。結果取決於期間、市場路徑、風險承受能力和個人現金流。",
      },
      {
        question: "為什麼要用相同總投入？",
        answer:
          "這樣比較才聚焦於投入方式，而不是投入金額不同。",
      },
      {
        question: "單筆投入風險更高嗎？",
        answer:
          "它更集中暴露於期初價格，短期波動和心理壓力可能更明顯。",
      },
      {
        question: "這是不是投資建議？",
        answer:
          "不是。本頁只解釋比較方法和歷史模擬限制。",
      },
    ],
  },
  "compound-interest-guide": {
    title: "複利計算指南 | 每月投入與長期成長教育說明",
    description:
      "學習複利計算如何使用每月投入、年化報酬假設和時間估算長期成長，並理解費用、稅務和未來不確定性。",
    h1: "複利計算指南",
    intro:
      "複利計算機適合用來理解時間、每月投入和假設年化報酬之間的關係。它不是收益承諾，也不能替代真實市場回測。",
    ctaQuery: "",
    sections: [
      {
        title: "第一步：理解複利的核心",
        body: "複利指收益繼續產生收益。在長期情境中，投入金額、投資時間和假設報酬率都會影響估算值。",
      },
      {
        title: "第二步：謹慎設定年化報酬假設",
        body: "年化報酬只是輸入假設，不是保證。真實市場每年表現可能大幅波動。",
      },
      {
        title: "第三步：區分複利預測和歷史回測",
        body: "複利計算器使用固定假設報酬；DCA 回測使用歷史價格路徑。",
      },
      {
        title: "示例用法",
        body: "可以在 /zh-TW/compound-interest-calculator 輸入每月 500 美元、20 年和假設 8% 年化報酬，再到 /zh-TW/dca-calculator 比較歷史情境。",
      },
      {
        title: "需要特別注意什麼",
        body: "複利計算通常使用平滑的假設年化報酬，但真實市場不會每年穩定成長。費用、稅務、通膨、匯率和現金流中斷都會影響長期結果。",
      },
      {
        title: "相關工具和下一步",
        body: "可以繼續閱讀 /zh-TW/compound-interest-calculator、/zh-TW/dca-calculator、/zh-TW/etf-dca-backtest-guide、/zh-TW/dca-vs-lump-sum-guide 和 /zh-TW/learn。",
      },
    ],
    faqs: [
      {
        question: "複利計算器能保證收益嗎？",
        answer:
          "不能。它只根據輸入假設計算數學結果，不代表任何資產未來會按該回報率成長。",
      },
      {
        question: "每月投入會怎樣影響結果？",
        answer:
          "在相同假設下，每月投入越多、時間越長，估算值通常越高，但真實市場不保證固定回報。",
      },
      {
        question: "複利計算和 DCA 回測有什麼不同？",
        answer:
          "複利計算使用固定回報假設；DCA 回測使用歷史價格資料模擬每月買入。",
      },
      {
        question: "這是財務建議嗎？",
        answer:
          "不是。本頁僅供教育用途，不構成財務、投資、稅務或法律建議。",
      },
    ],
  },
};

const msLearningPages: Record<ChineseLearningSeoPageSlug, SeoPageContent> = {
  "cspx-vs-voo-malaysia": {
    title: "CSPX vs VOO untuk Pelabur Malaysia | Panduan ETF DCA",
    description:
      "Fahami perbezaan CSPX dan VOO untuk pelabur Malaysia, termasuk UCITS ETF, ETF AS, USD, dividen, cukai, yuran, broker dan DCA backtest.",
    h1: "CSPX vs VOO untuk Pelabur Malaysia",
    intro:
      "CSPX dan VOO sama-sama sering digunakan untuk mengkaji pendedahan S&P 500, tetapi kedua-duanya tidak sama. Panduan ini membantu pengguna Malaysia memahami struktur UCITS, ETF tersenarai di Amerika Syarikat, mata wang, dividen, cukai, yuran dan batasan backtest tanpa membuat cadangan pelaburan.",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "Langkah 1: Fahami struktur CSPX dan VOO",
        body: "VOO ialah ETF yang disenaraikan di Amerika Syarikat. CSPX biasanya merujuk kepada iShares Core S&P 500 UCITS ETF yang berdomisil Ireland dan didagangkan di London Stock Exchange atau pasaran berkaitan. Kedua-duanya boleh memberi pendedahan kepada S&P 500, tetapi domisil, pasaran dagangan, mata wang, dividen dan cukai boleh berbeza.",
      },
      {
        title: "Langkah 2: Semak perkara praktikal untuk pengguna Malaysia",
        body: "Sebelum membuat keputusan sendiri, pengguna perlu menyemak sama ada broker menyokong VOO atau CSPX.L, cara deposit dan tukaran mata wang, yuran transaksi, spread, yuran platform, penyata cukai, rawatan dividen dan peraturan rasmi. Ketersediaan platform boleh berubah.",
      },
      {
        title: "Langkah 3: Bandingkan dengan andaian yang sama",
        body: "Gunakan /ms/etf-comparison-calculator atau /ms/voo-vs-cspx dengan jumlah bulanan, tahun mula dan tahun akhir yang sama. Ini membantu perbandingan lebih jelas, tetapi keputusan sejarah tidak menjamin hasil masa depan.",
      },
      {
        title: "Contoh mudah",
        body: "Sebagai contoh, anda boleh menguji RM atau USD bersamaan $1,000 sebulan dari 2018 hingga 2025 untuk VOO dan CSPX, kemudian lihat nilai akhir, jumlah pulangan dan drawdown. Baca juga /ms/supported-assets dan /ms/disclaimer untuk memahami status data.",
      },
      {
        title: "Perkara yang perlu diberi perhatian",
        body: "Hasil sebenar boleh dipengaruhi oleh yuran broker, spread tukaran mata wang, pendedahan USD, cukai pegangan, rawatan dividen, harga pelaksanaan, tracking error dan data rasmi dana. Tiada ETF yang sentiasa lebih baik untuk semua orang.",
      },
      {
        title: "Pautan berkaitan",
        body: "Teruskan dengan /ms/learn, /ms/voo-dca-calculator, /ms/cspx-dca-calculator, /ms/etf-comparison-calculator, /ms/recommended-tools dan /ms/disclaimer. Semua kandungan adalah pendidikan sahaja.",
      },
    ],
    faqs: [
      {
        question: "Adakah CSPX semestinya lebih sesuai daripada VOO untuk pelabur Malaysia?",
        answer:
          "Tidak semestinya. Perbandingan bergantung pada broker, yuran, cukai, mata wang, dividen dan keadaan peribadi. Halaman ini tidak membuat cadangan.",
      },
      {
        question: "Mengapa keputusan backtest CSPX dan VOO boleh berbeza?",
        answer:
          "Data harga, mata wang, struktur dana, dividen, yuran dan pasaran dagangan boleh menyebabkan keputusan berbeza.",
      },
      {
        question: "Apa kos yang perlu disemak oleh pengguna Malaysia?",
        answer:
          "Semak yuran transaksi, yuran platform, spread tukaran mata wang, spread beli jual, kos deposit atau pengeluaran dan kos berkaitan cukai.",
      },
      {
        question: "Adakah ini nasihat pelaburan?",
        answer:
          "Tidak. Ini hanya panduan pendidikan dan bukan nasihat kewangan, cukai, undang-undang atau cadangan beli jual.",
      },
    ],
  },
  "voo-vs-qqq-dca": {
    title: "VOO vs QQQ DCA Backtest | Panduan Perbandingan ETF",
    description:
      "Bandingkan VOO dan QQQ melalui DCA backtest, fahami S&P 500, Nasdaq-100, tumpuan sektor, drawdown, yuran dan batasan keputusan sejarah.",
    h1: "VOO vs QQQ DCA Backtest",
    intro:
      "VOO dan QQQ ialah ETF popular, tetapi pendedahan pasaran mereka berbeza. VOO biasanya mewakili S&P 500 yang lebih luas, manakala QQQ lebih tertumpu kepada Nasdaq-100 dan sektor teknologi. Panduan ini menerangkan cara membandingkan kedua-duanya dengan andaian DCA yang sama.",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "Langkah 1: Fahami perbezaan pendedahan",
        body: "VOO memberi pendedahan kepada syarikat besar AS dalam S&P 500. QQQ pula lebih tertumpu kepada Nasdaq-100, dengan tumpuan teknologi dan saham pertumbuhan yang biasanya lebih tinggi. Tempoh sejarah berbeza boleh menghasilkan keputusan yang sangat berbeza.",
      },
      {
        title: "Langkah 2: Gunakan input yang sama",
        body: "Dalam /ms/etf-comparison-calculator, gunakan jumlah bulanan, tahun mula, tahun akhir dan mata wang paparan yang sama. Ini menjadikan perbandingan lebih tertumpu kepada laluan harga aset, bukan perbezaan input.",
      },
      {
        title: "Langkah 3: Lihat pulangan dan risiko",
        body: "Jangan hanya melihat nilai akhir. Perhatikan jumlah dilaburkan, keuntungan, anggaran pulangan tahunan, maksimum drawdown dan bentuk carta. Nilai akhir sejarah yang lebih tinggi bukan jaminan masa depan.",
      },
      {
        title: "Contoh mudah",
        body: "Anda boleh menguji $500 atau $1,000 sebulan dari 2018 hingga 2025, kemudian buka /ms/voo-dca-calculator dan /ms/qqq-dca-calculator untuk melihat halaman aset secara berasingan.",
      },
      {
        title: "Perkara yang perlu diberi perhatian",
        body: "QQQ boleh mempunyai tumpuan sektor yang lebih tinggi, manakala VOO lebih luas tetapi masih boleh turun. Yuran, cukai, dividen, USD, spread dan tempoh pilihan boleh mengubah hasil sebenar.",
      },
      {
        title: "Pautan berkaitan",
        body: "Baca juga /ms/voo-vs-qqq, /ms/dca-vs-lump-sum, /ms/etf-dca-backtest-guide, /ms/supported-assets dan /ms/disclaimer.",
      },
    ],
    faqs: [
      {
        question: "VOO atau QQQ lebih baik berdasarkan sejarah?",
        answer:
          "Ia bergantung pada tempoh mula dan akhir. Satu tempoh sejarah tidak boleh digunakan untuk meramal masa depan.",
      },
      {
        question: "Adakah QQQ lebih berisiko daripada VOO?",
        answer:
          "QQQ biasanya lebih tertumpu kepada sektor tertentu, tetapi risiko sebenar perlu dinilai bersama tempoh, penilaian pasaran dan toleransi risiko.",
      },
      {
        question: "Adakah backtest memasukkan semua yuran?",
        answer:
          "Tidak semestinya. Kalkulator boleh memodelkan sebahagian yuran, tetapi hasil sebenar juga dipengaruhi cukai, dividen, spread, tukaran mata wang dan harga pelaksanaan.",
      },
      {
        question: "Adakah halaman ini mencadangkan VOO atau QQQ?",
        answer:
          "Tidak. Halaman ini hanya untuk pendidikan dan tidak mencadangkan membeli mana-mana ETF.",
      },
    ],
  },
  "etf-dca-backtest-guide": {
    title: "Panduan ETF DCA Backtest | Cara Membaca Keputusan Sejarah",
    description:
      "Belajar cara menggunakan ETF DCA backtest, menetapkan jumlah bulanan, tahun mula, tahun akhir, yuran, aset dan memahami batasan data sejarah.",
    h1: "Panduan ETF DCA Backtest",
    intro:
      "ETF DCA backtest membantu anda mensimulasikan pelaburan bulanan menggunakan harga sejarah. Panduan ini menerangkan cara menggunakan DCA Backtest, cara membaca keputusan dan mengapa hasil sejarah bukan ramalan masa depan.",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "Langkah 1: Pilih pasaran dan aset",
        body: "Pilih negara atau pasaran, jenis aset dan instrumen seperti VOO, CSPX, QQQ, VWRA atau IWDA. Semak /ms/supported-assets untuk melihat aset yang mempunyai data sejarah dan aset yang masih menggunakan data sampel.",
      },
      {
        title: "Langkah 2: Tetapkan jumlah bulanan dan tempoh",
        body: "Masukkan jumlah pelaburan bulanan, tahun mula dan tahun akhir. Julat tahun bergantung pada data yang tersedia. Jika data sejarah belum ada, kalkulator akan menandakan data sampel.",
      },
      {
        title: "Langkah 3: Baca metrik utama",
        body: "Lihat jumlah dilaburkan, nilai akhir, keuntungan, jumlah pulangan, anggaran pulangan tahunan dan maksimum drawdown. Metrik ini membantu memahami senario, bukan menjamin hasil masa depan.",
      },
      {
        title: "Contoh mudah",
        body: "Cuba /ms/dca-calculator dengan VOO, $1,000 sebulan, 2018 hingga 2025. Kemudian ubah tahun mula untuk melihat bagaimana tempoh pasaran mengubah keputusan.",
      },
      {
        title: "Perkara yang perlu diberi perhatian",
        body: "Backtest tidak menggantikan rekod broker sebenar. Yuran, cukai, dividen, kadar tukaran, spread, harga pelaksanaan dan data rasmi boleh menyebabkan hasil sebenar berbeza.",
      },
      {
        title: "Pautan berkaitan",
        body: "Teruskan ke /ms/learn, /ms/voo-dca-calculator, /ms/cspx-dca-calculator, /ms/qqq-dca-calculator, /ms/etf-comparison-calculator dan /ms/disclaimer.",
      },
    ],
    faqs: [
      {
        question: "Adakah ETF DCA backtest tepat?",
        answer:
          "Ia ialah simulasi berdasarkan data dan andaian yang tersedia. Ia tidak semestinya sama dengan transaksi broker sebenar.",
      },
      {
        question: "Mengapa sesetengah aset menggunakan data sampel?",
        answer:
          "Data sejarah untuk aset tersebut belum diimport. Data sampel hanya untuk demonstrasi dan bukan prestasi pasaran sebenar.",
      },
      {
        question: "Metrik mana yang patut dilihat?",
        answer:
          "Lihat nilai akhir bersama jumlah dilaburkan, drawdown, tempoh, sumber data dan andaian yuran.",
      },
      {
        question: "Adakah panduan ETF DCA ini nasihat kewangan?",
        answer:
          "Tidak. Backtest hanya untuk pembelajaran dan bukan nasihat kewangan atau cadangan pelaburan.",
      },
    ],
  },
  "dca-vs-lump-sum-guide": {
    title: "DCA vs Lump Sum | Mana Satu Lebih Baik Berdasarkan Sejarah?",
    description:
      "Fahami perbezaan DCA dan lump sum, cara membandingkan jumlah sumbangan yang sama, risiko masa pasaran, drawdown dan tekanan emosi.",
    h1: "DCA vs Lump Sum: Panduan Perbandingan Sejarah",
    intro:
      "DCA melabur secara berperingkat, manakala lump sum melaburkan jumlah penuh pada permulaan tempoh. Panduan ini menerangkan cara membandingkan kedua-duanya secara pendidikan menggunakan jumlah sumbangan yang sama.",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "Langkah 1: Fahami rentak pelaburan",
        body: "DCA membahagikan pembelian mengikut bulan. Lump sum memberi pendedahan pasaran lebih awal. Dalam pasaran yang menaik, lump sum boleh kelihatan lebih baik, tetapi dalam pasaran jatuh atau tidak menentu, DCA boleh mengurangkan tekanan membeli pada satu titik harga.",
      },
      {
        title: "Langkah 2: Gunakan jumlah sumbangan yang sama",
        body: "Jika DCA melabur $1,000 sebulan selama 96 bulan, jumlah sumbangan ialah $96,000. Perbandingan lump sum harus menggunakan jumlah yang sama pada harga pertama yang tersedia.",
      },
      {
        title: "Langkah 3: Nilai risiko dan psikologi",
        body: "Lihat nilai akhir, keuntungan, drawdown, masa pasaran, realiti aliran tunai dan tekanan emosi. Hasil sejarah yang lebih tinggi tidak bermakna pilihan itu sesuai untuk semua orang.",
      },
      {
        title: "Contoh mudah",
        body: "Buka /ms/dca-vs-lump-sum atau /ms/dca-calculator, pilih VOO, CSPX atau QQQ, kemudian uji tempoh sejarah berbeza.",
      },
      {
        title: "Perkara yang perlu diberi perhatian",
        body: "Yuran DCA boleh berlaku setiap bulan, manakala yuran lump sum mungkin sekali sahaja. Cukai, dividen, mata wang dan harga pelaksanaan juga boleh mengubah hasil sebenar.",
      },
      {
        title: "Pautan berkaitan",
        body: "Baca /ms/etf-dca-backtest-guide, /ms/compound-interest-guide, /ms/etf-comparison-calculator, /ms/supported-assets dan /ms/disclaimer.",
      },
    ],
    faqs: [
      {
        question: "DCA atau lump sum mana lebih baik?",
        answer:
          "Tiada jawapan tetap. Ia bergantung pada tempoh, laluan pasaran, toleransi risiko dan aliran tunai pengguna.",
      },
      {
        question: "Mengapa jumlah sumbangan perlu sama?",
        answer:
          "Supaya perbandingan fokus kepada kaedah pelaburan, bukan jumlah modal yang berbeza.",
      },
      {
        question: "Adakah lump sum lebih berisiko?",
        answer:
          "Ia lebih bergantung pada harga permulaan, jadi turun naik awal dan tekanan emosi boleh menjadi lebih jelas.",
      },
      {
        question: "Adakah ini cadangan strategi?",
        answer:
          "Tidak. Halaman ini hanya menerangkan kaedah perbandingan dan batasan simulasi sejarah.",
      },
    ],
  },
  "compound-interest-guide": {
    title: "Panduan Compound Interest | Bagaimana Pelaburan Bulanan Boleh Berkembang",
    description:
      "Belajar cara compound interest menggunakan jumlah bulanan, andaian pulangan tahunan dan masa untuk menganggarkan pertumbuhan jangka panjang.",
    h1: "Panduan Compound Interest",
    intro:
      "Kalkulator compound interest sesuai untuk memahami hubungan antara masa, pelaburan bulanan dan andaian pulangan tahunan. Ia bukan janji pulangan dan tidak menggantikan ujian balik sejarah atau perancangan kewangan peribadi.",
    ctaQuery: "",
    sections: [
      {
        title: "Langkah 1: Fahami idea kompaun",
        body: "Compound interest bermaksud pulangan terdahulu juga boleh menghasilkan pulangan berikutnya. Dalam tempoh panjang, jumlah bulanan, tempoh dan andaian pulangan boleh memberi kesan besar kepada anggaran akhir.",
      },
      {
        title: "Langkah 2: Tetapkan andaian dengan berhati-hati",
        body: "Pulangan tahunan hanyalah input model. Pasaran sebenar tidak bergerak secara stabil setiap tahun, dan keputusan sebenar boleh dipengaruhi yuran, cukai, inflasi dan kadar tukaran.",
      },
      {
        title: "Langkah 3: Bezakan unjuran dan backtest",
        body: "Kalkulator compound interest menggunakan pulangan tetap andaian. DCA backtest pula menggunakan laluan harga sejarah. Kedua-duanya menjawab soalan yang berbeza.",
      },
      {
        title: "Contoh mudah",
        body: "Dalam /ms/compound-interest-calculator, cuba $500 sebulan selama 20 tahun dengan andaian 8% setahun. Kemudian bandingkan dengan /ms/dca-calculator untuk melihat senario harga sejarah.",
      },
      {
        title: "Perkara yang perlu diberi perhatian",
        body: "Hasil model kompaun boleh nampak licin, tetapi realiti pelaburan boleh turun naik. Yuran, cukai, dividen, mata wang dan gangguan aliran tunai boleh mengubah hasil sebenar.",
      },
      {
        title: "Pautan berkaitan",
        body: "Teruskan ke /ms/compound-interest-calculator, /ms/dca-calculator, /ms/etf-dca-backtest-guide, /ms/dca-vs-lump-sum-guide dan /ms/learn.",
      },
    ],
    faqs: [
      {
        question: "Bolehkah compound interest menjamin pulangan?",
        answer:
          "Tidak. Ia hanya mengira hasil matematik berdasarkan andaian input.",
      },
      {
        question: "Bagaimana pelaburan bulanan mempengaruhi hasil?",
        answer:
          "Dengan andaian yang sama, jumlah bulanan lebih tinggi dan tempoh lebih panjang biasanya meningkatkan anggaran, tetapi pasaran sebenar tidak menjamin pulangan tetap.",
      },
      {
        question: "Apa beza compound interest dan DCA backtest?",
        answer:
          "Compound interest menggunakan pulangan tetap andaian; DCA backtest menggunakan data harga sejarah untuk mensimulasikan pembelian bulanan.",
      },
      {
        question: "Adakah panduan compound interest ini nasihat kewangan?",
        answer:
          "Tidak. Halaman ini hanya untuk pendidikan dan bukan nasihat kewangan, pelaburan, cukai atau undang-undang.",
      },
    ],
  },
};

const jaSharedLearningPages: Partial<
  Record<ChineseLearningSeoPageSlug, SeoPageContent>
> = {
  "etf-dca-backtest-guide": {
    title: "ETF積立投資バックテストの見方 | DCA Backtest",
    description:
      "ETF積立投資バックテストの使い方、毎月投資額、開始年、終了年、手数料、過去データ、サンプルデータの見方を日本語で解説します。",
    h1: "ETF積立投資バックテストの見方",
    intro:
      "ETF積立投資バックテストは、過去データを使って毎月一定額を投資した場合のシナリオを学ぶためのツールです。このページでは、入力項目、結果指標、データの限界をシンプルに説明します。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "ステップ1：対象ETFと期間を選ぶ",
        body: "まず市場、資産タイプ、ETFを選びます。VOO、QQQなどの資産を選び、毎月の投資額、開始年、終了年を設定します。対応状況は /ja/supported-assets で確認できます。",
      },
      {
        title: "ステップ2：結果指標を読む",
        body: "総投資額、最終価値、利益、総リターン、年率リターン推定、最大ドローダウンを確認します。最終価値だけでなく、途中の下落幅や投資期間も見ることが大切です。",
      },
      {
        title: "ステップ3：データの種類を確認する",
        body: "過去データがある場合は月次価格を使います。データが未インポートの場合はサンプルデータとして表示されます。サンプルデータは実際の市場成績ではありません。",
      },
      {
        title: "簡単な例",
        body: "/ja/dca-calculator でVOOを選び、毎月1,000ドル、2018年から2025年までを設定すると、過去データに基づく積立シナリオを確認できます。",
      },
      {
        title: "注意点",
        body: "実際の投資結果は、手数料、税金、為替レート、配当、スプレッド、約定価格、データ差で変わる可能性があります。過去の実績は将来の結果を保証しません。",
      },
      {
        title: "関連リンク",
        body: "次に /ja/learn、/ja/voo-dca-calculator、/ja/qqq-dca-calculator、/ja/etf-comparison-calculator、/ja/disclaimer を確認すると理解が深まります。",
      },
    ],
    faqs: [
      {
        question: "ETF積立投資バックテストは正確ですか？",
        answer:
          "利用可能な過去価格と入力条件に基づくシミュレーションです。実際の証券口座の結果とは異なる場合があります。",
      },
      {
        question: "サンプルデータとは何ですか？",
        answer:
          "過去データが未インポートの資産で使うデモ用データです。実際の市場成績として扱わないでください。",
      },
      {
        question: "どの指標を見るべきですか？",
        answer:
          "最終価値だけでなく、総投資額、最大ドローダウン、データソース、手数料前提も確認してください。",
      },
      {
        question: "これは投資助言ですか？",
        answer:
          "いいえ。教育目的の説明であり、ETFや投資方法を推奨するものではありません。",
      },
    ],
  },
  "voo-vs-qqq-dca": {
    title: "VOO vs QQQ 積立投資バックテスト | ETF比較ガイド",
    description:
      "VOOとQQQを同じ毎月投資額・同じ期間で比較し、S&P 500、Nasdaq-100、セクター集中度、ドローダウンの違いを学びます。",
    h1: "VOO vs QQQ 積立投資バックテスト",
    intro:
      "VOOはS&P 500への広い米国大型株エクスポージャー、QQQはNasdaq-100へのより成長株寄りのエクスポージャーとして使われることがあります。このページでは、同じ積立条件で比較する見方を説明します。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "ステップ1：指数の違いを理解する",
        body: "VOOはS&P 500、QQQはNasdaq-100に連動するETFとして知られています。QQQはテクノロジー比率が高くなりやすく、期間によってリターンや下落幅が大きく変わることがあります。",
      },
      {
        title: "ステップ2：同じ条件で比較する",
        body: "/ja/etf-comparison-calculator で毎月投資額、開始年、終了年、表示通貨をそろえると、入力条件ではなく資産価格の違いに注目できます。",
      },
      {
        title: "ステップ3：リターンとリスクを見る",
        body: "最終価値、総利益、年率リターン推定、最大ドローダウン、チャートの形を確認します。過去に高かった結果が将来も続くとは限りません。",
      },
      {
        title: "簡単な例",
        body: "2018年から2025年まで毎月500ドルまたは1,000ドルを投資した場合を比較し、/ja/voo-dca-calculator と /ja/qqq-dca-calculator で個別ページも確認できます。",
      },
      {
        title: "注意点",
        body: "VOOとQQQはどちらも下落する可能性があります。手数料、税金、為替、配当、約定価格、投資期間によって実際の結果は変わります。",
      },
      {
        title: "関連リンク",
        body: "関連ページとして /ja/voo-vs-qqq、/ja/dca-vs-lump-sum、/ja/etf-dca-backtest-guide、/ja/disclaimer も確認できます。",
      },
    ],
    faqs: [
      {
        question: "VOOとQQQはどちらが良いですか？",
        answer:
          "一概には言えません。目的、期間、リスク許容度、税金、手数料によって見方が変わります。このページは推奨ではありません。",
      },
      {
        question: "QQQはVOOよりリスクが高いですか？",
        answer:
          "QQQはセクター集中度が高くなりやすいですが、リスクは期間や市場環境によって変わります。",
      },
      {
        question: "バックテスト結果は将来も再現されますか？",
        answer:
          "いいえ。過去データは学習用であり、将来のリターンを保証しません。",
      },
      {
        question: "手数料や為替は含まれますか？",
        answer:
          "一部の手数料設定は使えますが、実際の税金、為替、配当、約定価格を完全には反映できません。",
      },
    ],
  },
  "dca-vs-lump-sum-guide": {
    title: "積立投資 vs 一括投資 | 過去データで比較する方法",
    description:
      "積立投資と一括投資を同じ総投資額で比較する方法、タイミングリスク、心理面、最大ドローダウン、過去データの限界を解説します。",
    h1: "積立投資 vs 一括投資：過去データで比較する方法",
    intro:
      "積立投資は資金を時間に分けて投資し、一括投資は最初にまとめて投資します。このページでは、同じ総投資額で比較する方法と、過去データを見るときの注意点を説明します。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "ステップ1：投資タイミングの違いを理解する",
        body: "積立投資は買付時点を分散します。一括投資は早く市場に参加します。上昇相場では一括投資が有利に見えることもありますが、下落相場では心理的な負担が大きくなることがあります。",
      },
      {
        title: "ステップ2：同じ総投資額で比較する",
        body: "毎月1,000ドルを96か月投資するなら、総投資額は96,000ドルです。一括投資の比較では、同じ96,000ドルを最初の価格で投資したものとして扱います。",
      },
      {
        title: "ステップ3：最終価値だけで判断しない",
        body: "最大ドローダウン、途中の含み損、投資期間、手数料、心理的な続けやすさも確認してください。",
      },
      {
        title: "簡単な例",
        body: "/ja/dca-vs-lump-sum または /ja/dca-calculator でVOOやQQQを選び、期間を変えて結果の違いを確認できます。",
      },
      {
        title: "注意点",
        body: "積立投資の手数料は毎月発生し、一括投資では一度だけ発生する場合があります。税金、配当、為替、約定価格も実際の結果に影響します。",
      },
      {
        title: "関連リンク",
        body: "/ja/etf-dca-backtest-guide、/ja/compound-interest-guide、/ja/etf-comparison-calculator、/ja/disclaimer もあわせて確認できます。",
      },
    ],
    faqs: [
      {
        question: "積立投資と一括投資はどちらが良いですか？",
        answer:
          "固定の答えはありません。相場環境、投資期間、手元資金、リスク許容度によって変わります。",
      },
      {
        question: "なぜ同じ総投資額で比べるのですか？",
        answer:
          "投資額の差ではなく、投資タイミングの違いを比較しやすくするためです。",
      },
      {
        question: "一括投資はリスクが高いですか？",
        answer:
          "最初の価格に大きく依存するため、短期的な下落や心理的負担が大きくなることがあります。",
      },
      {
        question: "これは投資戦略の推奨ですか？",
        answer:
          "いいえ。比較方法を説明する教育コンテンツであり、投資戦略の推奨ではありません。",
      },
    ],
  },
  "compound-interest-guide": {
    title: "複利計算ガイド | 毎月積立で資産はどう増える？",
    description:
      "複利計算の基本、毎月積立、想定年率リターン、投資期間、バックテストとの違い、手数料や税金の注意点を解説します。",
    h1: "複利計算ガイド：毎月積立で資産はどう増える？",
    intro:
      "複利計算は、毎月積立、投資期間、想定年率リターンが長期の資産成長にどう影響するかを学ぶためのモデルです。固定リターンを約束するものではありません。",
    ctaQuery: "",
    sections: [
      {
        title: "ステップ1：複利の基本を理解する",
        body: "複利とは、元本だけでなく過去の利益も次の成長に参加する考え方です。時間が長いほど、投資額と想定リターンの影響が大きくなります。",
      },
      {
        title: "ステップ2：想定リターンを慎重に置く",
        body: "年率リターンは入力上の仮定です。実際の市場は毎年一定ではなく、大きく上がる年も下がる年もあります。",
      },
      {
        title: "ステップ3：バックテストと使い分ける",
        body: "複利計算は一定の想定リターンを使います。DCAバックテストは過去価格の道筋を使います。どちらも学習用ですが、答える問いが違います。",
      },
      {
        title: "簡単な例",
        body: "/ja/compound-interest-calculator で毎月500ドル、20年、想定年率8%を入力し、その後 /ja/dca-calculator で過去データのシナリオと比べられます。",
      },
      {
        title: "注意点",
        body: "実際の結果は手数料、税金、インフレ、為替、配当、途中の入出金によって変わります。計算結果は将来の保証ではありません。",
      },
      {
        title: "関連リンク",
        body: "/ja/compound-interest-calculator、/ja/dca-calculator、/ja/etf-dca-backtest-guide、/ja/dca-vs-lump-sum-guide、/ja/learn も参考になります。",
      },
    ],
    faqs: [
      {
        question: "複利計算は将来の資産額を保証しますか？",
        answer:
          "いいえ。入力した仮定に基づく数学的な推定であり、将来の市場リターンを保証しません。",
      },
      {
        question: "毎月積立は複利にどう影響しますか？",
        answer:
          "同じ仮定なら、毎月積立額が大きく期間が長いほど推定値は大きくなりやすいですが、実際の市場は一定ではありません。",
      },
      {
        question: "複利計算とDCAバックテストの違いは何ですか？",
        answer:
          "複利計算は一定のリターン仮定を使い、DCAバックテストは過去価格を使って毎月購入をシミュレーションします。",
      },
      {
        question: "これは金融助言ですか？",
        answer:
          "いいえ。教育目的のみであり、金融助言、投資助言、税務助言、法的助言ではありません。",
      },
    ],
  },
};

const jaLearningPages: Record<JapaneseLearningSeoPageSlug, SeoPageContent> = {
  "sp500-dca-simulation": {
    title: "S&P500積立シミュレーション | 過去データで確認する方法",
    description:
      "S&P500への積立投資を過去データで確認する方法、VOOを使ったDCAバックテスト、手数料、為替、税金、データ差の注意点を解説します。",
    h1: "S&P500積立シミュレーション",
    intro:
      "S&P500積立シミュレーションは、米国大型株市場に毎月投資した場合の過去シナリオを学ぶための方法です。このページでは、VOOなどのS&P 500 ETFを使って、過去データの見方と注意点を説明します。",
    ctaQuery: "?market=us&type=ETF&asset=VOO",
    sections: [
      {
        title: "ステップ1：S&P500の対象を決める",
        body: "S&P500そのものを直接買うのではなく、通常はS&P 500に連動するETFを使ってシミュレーションします。DCA BacktestではVOOなどの対応ETFを選んで確認できます。",
      },
      {
        title: "ステップ2：毎月投資額と期間を設定する",
        body: "毎月の投資額、開始年、終了年を設定します。期間を変えると、強気相場、弱気相場、急落局面を含むかどうかで結果が変わります。",
      },
      {
        title: "ステップ3：結果を総合的に見る",
        body: "最終価値だけでなく、総投資額、利益、年率リターン推定、最大ドローダウン、チャートの途中経過を確認します。",
      },
      {
        title: "簡単な例",
        body: "/ja/voo-dca-calculator でVOOを選び、毎月1,000ドル、2018年から2025年までを設定すると、S&P500に近い積立シナリオを確認できます。",
      },
      {
        title: "注意点",
        body: "実際の投資結果は、ETFの経費率、配当、税金、為替、証券会社の手数料、スプレッド、約定価格、公式データとの差によって変わります。",
      },
      {
        title: "関連リンク",
        body: "/ja/dca-calculator、/ja/voo-dca-calculator、/ja/etf-dca-backtest-guide、/ja/compound-interest-guide、/ja/disclaimer を確認できます。",
      },
    ],
    faqs: [
      {
        question: "S&P500積立シミュレーションは将来を予測しますか？",
        answer:
          "いいえ。過去データを使った教育用シミュレーションであり、将来のリターンを保証しません。",
      },
      {
        question: "VOOでS&P500積立を確認できますか？",
        answer:
          "VOOはS&P 500に連動するETFとして使われるため、対応データがある場合は参考シナリオとして確認できます。",
      },
      {
        question: "円建ての実際の結果とは違いますか？",
        answer:
          "はい。為替、税金、手数料、配当、約定価格によって、実際の円建て結果は変わります。",
      },
      {
        question: "これは投資推奨ですか？",
        answer:
          "いいえ。S&P500やVOOへの投資を推奨するものではなく、教育目的の説明です。",
      },
    ],
  },
};

function buildChineseLearningPages(
  locale: Locale
): Partial<Record<ChineseLearningSeoPageSlug, SeoPageContent>> {
  if (locale === "zh-CN") {
    return zhCnLearningPages;
  }

  if (locale === "zh-TW") {
    return zhTwLearningPages;
  }

  if (locale === "ms") {
    return msLearningPages;
  }

  if (locale === "ja") {
    return jaSharedLearningPages;
  }

  return {};
}

function buildJapaneseLearningPages(
  locale: Locale
): Partial<Record<JapaneseLearningSeoPageSlug, SeoPageContent>> {
  if (locale === "ja") {
    return jaLearningPages;
  }

  return {};
}

function adaptEnglishPages(locale: Locale): Record<BaseSeoPageSlug, SeoPageContent> {
  const text = simpleLocaleText[locale];

  if (!text) {
    return enPages;
  }

  const names: Record<BaseSeoPageSlug, string> = {
    "compound-interest-calculator": text.compound,
    "dca-calculator": text.dca,
    "etf-calculator": text.etf,
    "voo-dca-calculator": text.voo,
    "cspx-dca-calculator": text.cspx,
  };

  return Object.fromEntries(
    baseSeoPageSlugs.map((slug) => [
      slug,
      {
        title: `${names[slug]} | ${text.titleSuffix}`,
        description: `${names[slug]}: ${text.estimate}`,
        h1: names[slug],
        intro: `${text.learn} ${text.estimate}`,
        sections: [
          { title: text.sectionOne, body: `${names[slug]} ${text.learn}` },
          { title: text.sectionTwo, body: text.estimate },
          { title: text.sectionThree, body: `${names[slug]}: ${text.estimate}` },
          { title: text.sectionFour, body: localeLabels[locale]?.disclaimer ?? genericLocaleLabels.en.disclaimer },
        ],
        faqs: [
          { question: text.faqOne, answer: text.answerOne },
          { question: text.faqTwo, answer: text.answerTwo },
          { question: names[slug], answer: text.estimate },
        ],
      },
    ])
  ) as Record<BaseSeoPageSlug, SeoPageContent>;
}

export function getSeoLandingContent(locale: Locale): LocaleSeoContent {
  return {
    ...(localeLabels[locale] ?? genericLocaleLabels.en),
    pages: {
      ...adaptEnglishPages(locale),
      ...(localizedPages[locale] ?? {}),
      ...buildComparisonPages(locale),
      ...buildAssetPages(locale),
      ...buildMalaysiaGuidePages(locale),
      ...buildChineseLearningPages(locale),
      ...buildJapaneseLearningPages(locale),
    },
  };
}

export function getSeoLandingPage(locale: Locale, slug: SeoPageSlug) {
  const page = getSeoLandingContent(locale).pages[slug];

  if (!page) {
    throw new Error(`Missing SEO page content for ${locale}/${slug}`);
  }

  return page;
}

export function isSeoPageSlug(value: string): value is SeoPageSlug {
  return seoPageSlugs.includes(value as SeoPageSlug);
}

function isMalaysiaGuideSeoPageSlug(
  value: string
): value is MalaysiaGuideSeoPageSlug {
  return malaysiaGuideSeoPageSlugs.includes(
    value as MalaysiaGuideSeoPageSlug
  );
}

function isChineseLearningSeoPageSlug(
  value: string
): value is ChineseLearningSeoPageSlug {
  return chineseLearningSeoPageSlugs.includes(
    value as ChineseLearningSeoPageSlug
  );
}

function isJapaneseLearningSeoPageSlug(
  value: string
): value is JapaneseLearningSeoPageSlug {
  return japaneseLearningSeoPageSlugs.includes(
    value as JapaneseLearningSeoPageSlug
  );
}

function isSharedLearningSeoPageSlug(value: string) {
  return (
    isChineseLearningSeoPageSlug(value) &&
    value !== "cspx-vs-voo-malaysia"
  );
}

export function getSeoPageSlugsForLocale(locale: Locale): SeoPageSlug[] {
  if (locale === "zh-CN") {
    return seoPageSlugs.filter((slug) => !isJapaneseLearningSeoPageSlug(slug));
  }

  if (locale === "zh-TW" || locale === "ms") {
    return seoPageSlugs.filter((slug) =>
      !isMalaysiaGuideSeoPageSlug(slug) && !isJapaneseLearningSeoPageSlug(slug)
    );
  }

  if (locale === "ja") {
    return seoPageSlugs.filter((slug) =>
      !isMalaysiaGuideSeoPageSlug(slug) &&
      (slug !== "cspx-vs-voo-malaysia")
    );
  }

  return seoPageSlugs.filter(
    (slug) =>
      !isMalaysiaGuideSeoPageSlug(slug) &&
      !isChineseLearningSeoPageSlug(slug) &&
      !isJapaneseLearningSeoPageSlug(slug)
  );
}

export function isSeoPageSlugForLocale(
  locale: Locale,
  value: string
): value is SeoPageSlug {
  return (
    isSeoPageSlug(value) &&
    getSeoPageSlugsForLocale(locale).includes(value)
  );
}

export function getSeoPageAlternates(slug: SeoPageSlug) {
  const locales = isMalaysiaGuideSeoPageSlug(slug)
    ? ["zh-CN"]
    : slug === "cspx-vs-voo-malaysia"
      ? ["zh-CN", "zh-TW", "ms"]
      : isSharedLearningSeoPageSlug(slug)
        ? ["zh-CN", "zh-TW", "ms", "ja"]
        : isJapaneseLearningSeoPageSlug(slug)
          ? ["ja"]
          : publicLocaleCodes;

  return Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(`/${locale}/${slug}`)])
  );
}

export function getSeoPageXDefault(slug: SeoPageSlug) {
  if (isJapaneseLearningSeoPageSlug(slug)) {
    return absoluteUrl(`/ja/${slug}`);
  }

  return isMalaysiaGuideSeoPageSlug(slug) || isChineseLearningSeoPageSlug(slug)
    ? absoluteUrl(`/zh-CN/${slug}`)
    : xDefaultUrl;
}
