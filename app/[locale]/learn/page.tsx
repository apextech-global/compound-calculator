import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, productionBaseUrl } from "@/lib/seoMetadata";

type LearnLocale = "en" | "zh-CN" | "zh-TW" | "ms" | "ja";

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

const learnLocales: LearnLocale[] = ["en", "zh-CN", "zh-TW", "ms", "ja"];

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
        title: "ETF DCA backtesting",
        description:
          "Learn how the calculator turns historical monthly prices into an educational scenario for steady contributions.",
        links: [
          {
            title: "DCA Backtest Calculator",
            description:
              "Run a historical monthly investing scenario with asset, amount, start year, and end year controls.",
            href: "/en/dca-calculator",
          },
          {
            title: "ETF Comparison Calculator",
            description:
              "Compare two assets using the same monthly contribution and time period.",
            href: "/en/etf-comparison-calculator",
          },
          {
            title: "Data and Disclaimer",
            description:
              "Understand Yahoo Finance historical prices, sample data, fees, currency, tax, and other limits.",
            href: "/en/disclaimer",
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
        title: "CSPX vs VOO",
        description:
          "Study U.S.-listed and UCITS S&P 500 ETF examples with attention to domicile, currency, dividends, tax, and platform availability.",
        links: [
          {
            title: "VOO vs CSPX",
            description:
              "Compare the educational differences between a U.S.-listed ETF and an Ireland-domiciled UCITS ETF.",
            href: "/en/voo-vs-cspx",
          },
          {
            title: "CSPX DCA Calculator",
            description:
              "Open a CSPX-focused DCA calculator page for historical scenario testing.",
            href: "/en/cspx-dca-calculator",
          },
          {
            title: "VOO DCA Calculator",
            description:
              "Open a VOO-focused DCA calculator page for the same kind of monthly investing analysis.",
            href: "/en/voo-dca-calculator",
          },
        ],
      },
      {
        title: "VOO vs QQQ",
        description:
          "Compare broad S&P 500 exposure with Nasdaq-100 exposure while remembering that historical leadership changes by period.",
        links: [
          {
            title: "VOO vs QQQ",
            description:
              "Read the comparison guide before testing different periods in the calculator.",
            href: "/en/voo-vs-qqq",
          },
          {
            title: "QQQ DCA Calculator",
            description:
              "Model a Nasdaq-100 related ETF with monthly contribution assumptions.",
            href: "/en/qqq-dca-calculator",
          },
          {
            title: "ETF Comparison Calculator",
            description:
              "Compare VOO, QQQ, CSPX, or another supported asset with the same inputs.",
            href: "/en/etf-comparison-calculator",
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
        title: "ETF DCA 回测",
        description:
          "学习如何用历史月度价格模拟每月投入，并理解数据来源、示例数据和回测限制。",
        links: [
          {
            title: "ETF 定投回测指南",
            description:
              "系统学习 ETF DCA 回测的输入、输出、数据来源和风险提示。",
            href: "/zh-CN/etf-dca-backtest-guide",
          },
          {
            title: "DCA 定投计算器",
            description:
              "用资产、金额、开始年份和结束年份快速测试历史情景。",
            href: "/zh-CN/dca-calculator",
          },
          {
            title: "ETF 对比工具",
            description:
              "用相同每月投入和期间比较两个资产的历史结果。",
            href: "/zh-CN/etf-comparison-calculator",
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
        title: "CSPX vs VOO",
        description:
          "从马来西亚和海外投资者角度理解 CSPX 与 VOO 在注册地、市场、股息、税务和券商支持上的差异。",
        links: [
          {
            title: "CSPX vs VOO 马来西亚",
            description:
              "了解 UCITS ETF 与美国上市 ETF 的常见差异，不把任何一个产品描述成必然更好。",
            href: "/zh-CN/cspx-vs-voo-malaysia",
          },
          {
            title: "VOO vs CSPX",
            description:
              "阅读更完整的 VOO 和 CSPX 教育对比页面。",
            href: "/zh-CN/voo-vs-cspx",
          },
          {
            title: "CSPX 定投计算器",
            description:
              "打开 CSPX 定投页面，用历史情景测试不同投入期间。",
            href: "/zh-CN/cspx-dca-calculator",
          },
        ],
      },
      {
        title: "VOO vs QQQ",
        description:
          "理解 S&P 500 广泛市场敞口与 Nasdaq-100 科技权重较高组合之间的历史差异。",
        links: [
          {
            title: "VOO vs QQQ DCA",
            description:
              "学习不同年份中 VOO 与 QQQ 的回测结果为什么可能差异很大。",
            href: "/zh-CN/voo-vs-qqq-dca",
          },
          {
            title: "VOO vs QQQ",
            description:
              "阅读 VOO 与 QQQ 的指数、行业权重和风险差异。",
            href: "/zh-CN/voo-vs-qqq",
          },
          {
            title: "QQQ 定投计算器",
            description:
              "用 QQQ 页面测试 Nasdaq-100 相关 ETF 的月度投入情景。",
            href: "/zh-CN/qqq-dca-calculator",
          },
        ],
      },
      {
        title: "马来西亚买 ETF 注意事项",
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
        title: "ETF DCA 回測",
        description:
          "學習如何用歷史月度價格模擬每月投入，並理解資料來源、範例資料和回測限制。",
        links: [
          {
            title: "ETF 定期定額回測指南",
            description:
              "系統學習 ETF DCA 回測的輸入、輸出、資料來源和風險提示。",
            href: "/zh-TW/etf-dca-backtest-guide",
          },
          {
            title: "DCA 定期定額計算機",
            description:
              "用資產、金額、開始年份和結束年份快速測試歷史情境。",
            href: "/zh-TW/dca-calculator",
          },
          {
            title: "ETF 對比工具",
            description:
              "用相同每月投入和期間比較兩個資產的歷史結果。",
            href: "/zh-TW/etf-comparison-calculator",
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
        title: "CSPX vs VOO",
        description:
          "從馬來西亞和海外投資者角度理解 CSPX 與 VOO 在註冊地、市場、股息、稅務和券商支援上的差異。",
        links: [
          {
            title: "CSPX vs VOO 馬來西亞",
            description:
              "了解 UCITS ETF 與美國上市 ETF 的常見差異，不把任何一個產品描述成必然更好。",
            href: "/zh-TW/cspx-vs-voo-malaysia",
          },
          {
            title: "VOO vs CSPX",
            description:
              "閱讀更完整的 VOO 和 CSPX 教育對比頁面。",
            href: "/zh-TW/voo-vs-cspx",
          },
          {
            title: "CSPX 定期定額計算機",
            description:
              "開啟 CSPX 定期定額頁面，用歷史情境測試不同投入期間。",
            href: "/zh-TW/cspx-dca-calculator",
          },
        ],
      },
      {
        title: "VOO vs QQQ",
        description:
          "理解 S&P 500 廣泛市場敞口與 Nasdaq-100 科技權重較高組合之間的歷史差異。",
        links: [
          {
            title: "VOO vs QQQ DCA",
            description:
              "學習不同年份中 VOO 與 QQQ 的回測結果為什麼可能差異很大。",
            href: "/zh-TW/voo-vs-qqq-dca",
          },
          {
            title: "VOO vs QQQ",
            description:
              "閱讀 VOO 與 QQQ 的指數、產業權重和風險差異。",
            href: "/zh-TW/voo-vs-qqq",
          },
          {
            title: "QQQ 定期定額計算機",
            description:
              "用 QQQ 頁面測試 Nasdaq-100 相關 ETF 的月度投入情境。",
            href: "/zh-TW/qqq-dca-calculator",
          },
        ],
      },
      {
        title: "馬來西亞買 ETF 注意事項",
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
  ms: {
    title: "Pusat Pembelajaran ETF DCA | DCA Backtest",
    description:
      "Belajar asas ETF DCA, DCA backtest, VOO, CSPX, QQQ, DCA vs Lump Sum, compound interest dan perkara yang pelabur Malaysia perlu semak.",
    h1: "Pusat Pembelajaran ETF DCA",
    breadcrumb: "Belajar",
    eyebrow: "Pusat pembelajaran ETF DCA",
    intro:
      "Pusat pembelajaran ini membantu pengguna Malaysia memahami ETF DCA, ujian balik sejarah, compound interest, perbandingan VOO, CSPX dan QQQ, serta had penting seperti yuran, tukaran mata wang, cukai, dividen dan ketersediaan broker.",
    disclaimerTitle: "Penafian pendidikan",
    disclaimer:
      "Kandungan ini untuk pendidikan sahaja dan bukan nasihat kewangan, nasihat pelaburan, nasihat cukai, nasihat undang-undang atau cadangan membeli mana-mana ETF. Prestasi lalu tidak menjamin hasil masa depan.",
    quickLinksTitle: "Alat dan panduan popular",
    quickLinks: [
      { title: "Kalkulator DCA", href: "/ms/dca-calculator" },
      {
        title: "Kalkulator Compound Interest",
        href: "/ms/compound-interest-calculator",
      },
      {
        title: "Kalkulator Perbandingan ETF",
        href: "/ms/etf-comparison-calculator",
      },
      { title: "Aset Disokong", href: "/ms/supported-assets" },
      { title: "Penafian", href: "/ms/disclaimer" },
    ],
    sections: [
      {
        title: "Asas ETF DCA",
        description:
          "Mulakan dengan konsep pelaburan bulanan, dollar-cost averaging dan mengapa hasil sejarah bukan ramalan masa depan.",
        links: [
          {
            title: "Kalkulator DCA",
            description:
              "Uji senario pelaburan bulanan dengan aset, jumlah, tahun mula dan tahun akhir.",
            href: "/ms/dca-calculator",
          },
          {
            title: "Panduan ETF DCA Backtest",
            description:
              "Belajar cara membaca keputusan sejarah, data sampel dan had ujian balik.",
            href: "/ms/etf-dca-backtest-guide",
          },
          {
            title: "Aset Disokong",
            description:
              "Semak ETF dan saham yang mempunyai data sejarah atau hanya data sampel.",
            href: "/ms/supported-assets",
          },
        ],
      },
      {
        title: "ETF DCA Backtest",
        description:
          "Fahami bagaimana harga bulanan sejarah digunakan untuk menganggarkan unit terkumpul, nilai akhir dan drawdown.",
        links: [
          {
            title: "Panduan ETF DCA Backtest",
            description:
              "Panduan langkah demi langkah untuk menetapkan input dan menilai hasil.",
            href: "/ms/etf-dca-backtest-guide",
          },
          {
            title: "Kalkulator Perbandingan ETF",
            description:
              "Bandingkan dua aset dengan jumlah bulanan dan tempoh masa yang sama.",
            href: "/ms/etf-comparison-calculator",
          },
          {
            title: "Penafian Data",
            description:
              "Fahami batasan Yahoo Finance, data sampel, yuran, cukai dan tukaran mata wang.",
            href: "/ms/disclaimer",
          },
        ],
      },
      {
        title: "VOO / CSPX / QQQ Backtest",
        description:
          "Terokai contoh ETF popular tanpa menganggap mana-mana ETF sentiasa lebih baik.",
        links: [
          {
            title: "Kalkulator DCA VOO",
            description:
              "Kajian senario bulanan untuk ETF S&P 500 yang disenaraikan di Amerika Syarikat.",
            href: "/ms/voo-dca-calculator",
          },
          {
            title: "Kalkulator DCA CSPX",
            description:
              "Ketahui bagaimana ETF UCITS S&P 500 boleh dimodelkan dalam DCA Backtest.",
            href: "/ms/cspx-dca-calculator",
          },
          {
            title: "Kalkulator DCA QQQ",
            description:
              "Terokai senario Nasdaq-100 dan hasil yang bergantung pada tempoh sejarah.",
            href: "/ms/qqq-dca-calculator",
          },
        ],
      },
      {
        title: "CSPX vs VOO",
        description:
          "Fahami perbezaan domisil, pasaran dagangan, mata wang, dividen, cukai dan ketersediaan broker untuk pengguna Malaysia.",
        links: [
          {
            title: "CSPX vs VOO untuk Pelabur Malaysia",
            description:
              "Panduan pendidikan untuk membandingkan UCITS ETF dan ETF tersenarai di Amerika Syarikat.",
            href: "/ms/cspx-vs-voo-malaysia",
          },
          {
            title: "VOO vs CSPX",
            description:
              "Baca perbandingan umum tentang struktur dana, mata wang dan dividen.",
            href: "/ms/voo-vs-cspx",
          },
          {
            title: "Kalkulator Perbandingan ETF",
            description:
              "Uji kedua-dua aset dengan jumlah bulanan dan tempoh yang sama.",
            href: "/ms/etf-comparison-calculator",
          },
        ],
      },
      {
        title: "VOO vs QQQ",
        description:
          "Bandingkan pendedahan pasaran luas S&P 500 dengan pendedahan Nasdaq-100 yang lebih tertumpu kepada teknologi.",
        links: [
          {
            title: "VOO vs QQQ DCA Backtest",
            description:
              "Ketahui mengapa hasil sejarah boleh berubah mengikut tahun mula dan tahun akhir.",
            href: "/ms/voo-vs-qqq-dca",
          },
          {
            title: "VOO vs QQQ",
            description:
              "Baca perbezaan indeks, tumpuan sektor dan risiko sejarah.",
            href: "/ms/voo-vs-qqq",
          },
          {
            title: "Kalkulator DCA QQQ",
            description:
              "Uji senario pelaburan bulanan untuk ETF berkaitan Nasdaq-100.",
            href: "/ms/qqq-dca-calculator",
          },
        ],
      },
      {
        title: "DCA vs Lump Sum",
        description:
          "Bandingkan pelaburan berperingkat dengan pelaburan jumlah penuh pada permulaan tempoh.",
        links: [
          {
            title: "Panduan DCA vs Lump Sum",
            description:
              "Fahami perbezaan jumlah sumbangan, masa pasaran, drawdown dan tekanan emosi.",
            href: "/ms/dca-vs-lump-sum-guide",
          },
          {
            title: "DCA vs Lump Sum",
            description:
              "Buka halaman perbandingan sedia ada untuk menguji senario sejarah.",
            href: "/ms/dca-vs-lump-sum",
          },
        ],
      },
      {
        title: "Compound Interest",
        description:
          "Gunakan model pertumbuhan kompaun untuk memahami hubungan antara jumlah bulanan, masa dan andaian pulangan.",
        links: [
          {
            title: "Panduan Compound Interest",
            description:
              "Belajar perbezaan antara anggaran pulangan tetap dan ujian balik harga sejarah.",
            href: "/ms/compound-interest-guide",
          },
          {
            title: "Kalkulator Compound Interest",
            description:
              "Modelkan sumbangan bulanan, pulangan tahunan andaian dan tempoh pelaburan.",
            href: "/ms/compound-interest-calculator",
          },
        ],
      },
      {
        title: "Perkara yang Pelabur Malaysia Perlu Semak",
        description:
          "Semak tukaran mata wang, pendedahan USD, yuran, spread, cukai, dividen dan ketersediaan platform sebelum membuat keputusan sendiri.",
        links: [
          {
            title: "Alat Disyorkan",
            description:
              "Ketahui kategori alat biasa seperti broker, pertukaran mata wang dan penjejak portfolio tanpa cadangan khusus.",
            href: "/ms/recommended-tools",
          },
          {
            title: "Aset Disokong",
            description:
              "Semak status data sejarah untuk VOO, CSPX, QQQ dan aset lain.",
            href: "/ms/supported-assets",
          },
          {
            title: "Penafian",
            description:
              "Baca had data, cukai, undang-undang dan bukan nasihat kewangan.",
            href: "/ms/disclaimer",
          },
        ],
      },
      {
        title: "Soalan Lazim",
        description:
          "Jawapan ringkas tentang data sejarah, yuran, risiko dan penggunaan keputusan secara bertanggungjawab.",
        links: [
          {
            title: "Panduan ETF DCA Backtest",
            description:
              "Mulakan di sini jika anda mahu memahami aliran kerja ujian balik.",
            href: "/ms/etf-dca-backtest-guide",
          },
          {
            title: "Pusat Pembelajaran",
            description:
              "Kembali ke halaman ini untuk meneroka topik berkaitan.",
            href: "/ms/learn",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Adakah ETF DCA backtest boleh meramal pulangan masa depan?",
        answer:
          "Tidak. Backtest menggunakan data sejarah untuk mengkaji senario lalu. Masa depan boleh sangat berbeza.",
      },
      {
        question: "Bolehkah pengguna Malaysia membandingkan VOO, CSPX dan QQQ?",
        answer:
          "Ya, gunakan halaman aset dan kalkulator perbandingan ETF dengan andaian jumlah bulanan dan tempoh yang sama.",
      },
      {
        question: "Apa yang perlu disemak sebelum melabur sebenar?",
        answer:
          "Semak ketersediaan broker, yuran, spread, tukaran mata wang, cukai, dividen, risiko USD dan maklumat rasmi penyedia.",
      },
      {
        question: "Adakah kandungan ini nasihat pelaburan?",
        answer:
          "Tidak. DCA Backtest ialah laman pendidikan dan tidak mengesyorkan ETF, saham, broker atau strategi tertentu.",
      },
    ],
  },
  ja: {
    title: "ETF積立投資学習センター | DCA Backtest",
    description:
      "ETF積立投資、ドルコスト平均法、バックテスト、VOO、QQQ、積立投資 vs 一括投資、複利計算、ETF比較を学べる日本語ガイドです。",
    h1: "ETF積立投資学習センター",
    breadcrumb: "学習センター",
    eyebrow: "ETF積立投資の学習ガイド",
    intro:
      "この学習センターでは、ETF積立投資、ドルコスト平均法、過去データを使ったバックテスト、VOOとQQQの比較、複利計算、ETF比較の考え方をシンプルに整理しています。内容は教育目的のみで、特定のETFや投資方法を推奨するものではありません。",
    disclaimerTitle: "教育目的の免責事項",
    disclaimer:
      "本サイトの内容は教育目的のみであり、金融助言、投資助言、税務助言、法的助言ではありません。過去データによる結果は将来のリターンを保証しません。",
    quickLinksTitle: "主要ツールとガイド",
    quickLinks: [
      { title: "DCA計算機", href: "/ja/dca-calculator" },
      {
        title: "複利計算機",
        href: "/ja/compound-interest-calculator",
      },
      {
        title: "ETF比較計算機",
        href: "/ja/etf-comparison-calculator",
      },
      { title: "対応資産", href: "/ja/supported-assets" },
      { title: "免責事項", href: "/ja/disclaimer" },
    ],
    sections: [
      {
        title: "ETF積立投資の基本",
        description:
          "毎月一定額を投資する考え方、ドルコスト平均法、そして過去データの見方を学びます。",
        links: [
          {
            title: "DCA計算機",
            description:
              "資産、毎月の投資額、開始年、終了年を設定して、過去の積立シナリオを確認できます。",
            href: "/ja/dca-calculator",
          },
          {
            title: "ETF積立投資バックテストの見方",
            description:
              "バックテスト結果を読むときの基本、注意点、データの限界を整理します。",
            href: "/ja/etf-dca-backtest-guide",
          },
          {
            title: "対応資産",
            description:
              "どのETFや株式に過去データがあり、どれがサンプルデータかを確認できます。",
            href: "/ja/supported-assets",
          },
        ],
      },
      {
        title: "ETFバックテスト",
        description:
          "過去の月次価格を使って、毎月投資した場合の累積口数、最終価値、ドローダウンを確認します。",
        links: [
          {
            title: "ETFバックテストガイド",
            description:
              "入力項目、結果指標、データソース、手数料や為替の注意点を説明します。",
            href: "/ja/etf-dca-backtest-guide",
          },
          {
            title: "ETF比較計算機",
            description:
              "同じ毎月投資額と同じ期間で、2つの資産を比較できます。",
            href: "/ja/etf-comparison-calculator",
          },
          {
            title: "免責事項",
            description:
              "データ、税金、手数料、投資助言ではないことに関する重要な説明です。",
            href: "/ja/disclaimer",
          },
        ],
      },
      {
        title: "VOO / QQQ バックテスト",
        description:
          "S&P 500に連動するVOOと、Nasdaq-100に連動するQQQの積立シナリオを学びます。",
        links: [
          {
            title: "VOO DCA計算機",
            description:
              "米国S&P 500 ETFの積立投資シナリオを確認できます。",
            href: "/ja/voo-dca-calculator",
          },
          {
            title: "QQQ DCA計算機",
            description:
              "Nasdaq-100関連ETFの積立投資シナリオを確認できます。",
            href: "/ja/qqq-dca-calculator",
          },
          {
            title: "S&P500積立シミュレーション",
            description:
              "S&P 500に積立投資した場合を、過去データで確認する考え方を学べます。",
            href: "/ja/sp500-dca-simulation",
          },
        ],
      },
      {
        title: "VOO vs QQQ",
        description:
          "広い米国大型株への分散と、Nasdaq-100の成長株寄りの特徴を比較します。",
        links: [
          {
            title: "VOO vs QQQ 積立投資バックテスト",
            description:
              "同じ条件でVOOとQQQを比較するときの見方を整理します。",
            href: "/ja/voo-vs-qqq-dca",
          },
          {
            title: "VOO vs QQQ",
            description:
              "指数、セクター集中度、リスク、過去期間による違いを確認します。",
            href: "/ja/voo-vs-qqq",
          },
          {
            title: "ETF比較計算機",
            description:
              "VOO、QQQ、その他の対応資産を同じ条件で比較できます。",
            href: "/ja/etf-comparison-calculator",
          },
        ],
      },
      {
        title: "積立投資 vs 一括投資",
        description:
          "同じ総投資額を、毎月分けて投資する場合と最初にまとめて投資する場合で比較します。",
        links: [
          {
            title: "積立投資 vs 一括投資ガイド",
            description:
              "過去データで比較する方法、心理面、タイミングリスクを説明します。",
            href: "/ja/dca-vs-lump-sum-guide",
          },
          {
            title: "DCA vs Lump Sum",
            description:
              "既存の比較ページで、期間や金額を変えてシナリオを確認できます。",
            href: "/ja/dca-vs-lump-sum",
          },
        ],
      },
      {
        title: "複利計算",
        description:
          "毎月積立、期間、想定年率リターンが長期の資産成長にどう影響するかを学びます。",
        links: [
          {
            title: "複利計算ガイド",
            description:
              "固定リターンのモデルと、過去価格を使うバックテストの違いを説明します。",
            href: "/ja/compound-interest-guide",
          },
          {
            title: "複利計算機",
            description:
              "毎月の拠出額、想定年率リターン、投資年数から長期シナリオを試せます。",
            href: "/ja/compound-interest-calculator",
          },
        ],
      },
      {
        title: "ETF比較",
        description:
          "2つのETFや資産を同じ毎月投資額・同じ期間で比較し、リターンとリスク指標を確認します。",
        links: [
          {
            title: "ETF比較計算機",
            description:
              "最終価値、総リターン、年率リターン推定、最大ドローダウンを比較できます。",
            href: "/ja/etf-comparison-calculator",
          },
          {
            title: "VOO vs QQQ",
            description:
              "代表的な米国ETFの比較ページです。",
            href: "/ja/voo-vs-qqq",
          },
          {
            title: "対応資産",
            description:
              "バックテストで利用できるETF、株式、データ状況を確認できます。",
            href: "/ja/supported-assets",
          },
        ],
      },
      {
        title: "よくある質問",
        description:
          "過去データ、手数料、税金、為替、サンプルデータ、投資助言ではないことを確認します。",
        links: [
          {
            title: "ETF積立投資バックテストの見方",
            description:
              "バックテストを初めて使う場合は、ここから読むと理解しやすくなります。",
            href: "/ja/etf-dca-backtest-guide",
          },
          {
            title: "免責事項",
            description:
              "利用前に、データと投資判断に関する制限を確認してください。",
            href: "/ja/disclaimer",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "ETF積立投資のバックテストで将来のリターンは分かりますか？",
        answer:
          "分かりません。バックテストは過去データを使った学習用のシミュレーションであり、将来の結果を保証しません。",
      },
      {
        question: "VOOとQQQを同じ条件で比較できますか？",
        answer:
          "はい。ETF比較計算機を使うと、同じ毎月投資額と同じ期間で比較できます。",
      },
      {
        question: "実際の投資結果と違う理由は何ですか？",
        answer:
          "手数料、税金、為替、配当、スプレッド、約定価格、データ差により、実際の結果は変わる可能性があります。",
      },
      {
        question: "このサイトは投資助言を提供しますか？",
        answer:
          "いいえ。DCA Backtestは教育目的のサイトであり、ETF、株式、証券会社、投資戦略を推奨しません。",
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
