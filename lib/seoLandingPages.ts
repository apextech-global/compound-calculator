import { routing, type Locale } from "@/i18n/routing";

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
  "cspx-vs-vwra",
  "iwda-vs-vwra",
  "etf-comparison-calculator",
] as const;

export const seoPageSlugs = [
  ...baseSeoPageSlugs,
  ...comparisonSeoPageSlugs,
] as const;

export type SeoPageSlug = (typeof seoPageSlugs)[number];
type BaseSeoPageSlug = (typeof baseSeoPageSlugs)[number];
type ComparisonSeoPageSlug = (typeof comparisonSeoPageSlugs)[number];

type SeoPageContent = {
  title: string;
  description: string;
  h1: string;
  intro: string;
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
  pages: Record<SeoPageSlug, SeoPageContent>;
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
    title: "DCA Calculator | Dollar Cost Averaging Investment Calculator",
    description:
      "Use this DCA calculator to estimate how monthly investing may grow over time using recurring contributions and historical or sample market data.",
    h1: "DCA Calculator",
    intro:
      "Explore dollar-cost averaging with a monthly investment calculator built for recurring contributions, ETF examples, and long-term planning.",
    sections: [
      {
        title: "What is dollar-cost averaging?",
        body: "Dollar-cost averaging, or DCA, means investing a fixed amount on a regular schedule instead of trying to time a single perfect market entry.",
      },
      {
        title: "How DCA works",
        body: "When prices are lower, the same monthly amount buys more shares. When prices are higher, it buys fewer shares. Over time, the calculator estimates accumulated shares and value.",
      },
      {
        title: "DCA vs lump sum investing",
        body: "Lump sum investing commits capital at once. DCA spreads purchases across time, which some investors prefer for discipline and risk management.",
      },
      {
        title: "Monthly investment example",
        body: "You can model a fixed monthly contribution, choose a start and end year, and compare invested capital with estimated ending value.",
      },
    ],
    faqs: [
      {
        question: "What does a DCA calculator estimate?",
        answer:
          "It estimates total invested, shares accumulated, ending value, profit, and return for a recurring monthly investment scenario.",
      },
      {
        question: "Is DCA always better than lump sum investing?",
        answer:
          "No. Each approach can perform differently depending on market timing, volatility, and the investor's behavior.",
      },
      {
        question: "Can this use historical market data?",
        answer:
          "Yes. Where imported CSV data exists, the backtest uses historical monthly prices; otherwise it clearly labels sample data.",
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
    "复利计算器 | 每月投资增长计算器",
    "使用复利计算器，根据每月投入、年化回报和复利时间估算长期投资增长。",
    "复利计算器",
    "估算每月投入、年化回报假设和时间如何共同影响长期投资增长。",
    ["什么是复利？", "复利是本金和此前收益一起继续产生收益。长期来看，再投资收益可能成为投资组合增长的重要来源。"],
    ["复利增长如何运作", "计算器根据初始资金、每月投入、年化回报假设和按月复利来模拟增长。这是模型，不是预测。"],
    ["每月投资与复利", "每月复利计算器可以展示固定月供在假设投资回报下长期可能如何增长。"],
    ["复利示例", "投资者可以比较不同每月投入金额和投资年限，了解已投入资金和增长部分如何拉开差距。"],
  ],
  "dca-calculator": [
    "定投计算器 | 每月定投投资计算器",
    "使用定投计算器，根据定期投入和历史或示例市场数据，估算每月投资可能如何增长。",
    "定投计算器",
    "使用每月定投计算器探索定期定额投资、ETF 示例和长期投资规划。",
    ["什么是定期定额投资？", "定期定额投资是按固定周期投入固定金额，而不是试图一次性选择完美入场点。"],
    ["定投如何运作", "价格较低时，同样金额可以买到更多份额；价格较高时买到较少份额。计算器会估算累计份额和价值。"],
    ["定投与一次性投资", "一次性投资会立即投入资金。定投则把购买分散在时间中，一些投资者用它来保持纪律和管理风险。"],
    ["每月投资示例", "你可以设置固定每月投入、开始年份和结束年份，并比较总投入与估算期末价值。"],
  ],
  "etf-calculator": [
    "ETF投资计算器 | 每月ETF回报计算器",
    "估算每月 ETF 投资结果，比较支持的 ETF 资产，并了解长期 ETF 增长。",
    "ETF投资计算器",
    "了解如何用 DCA 计算器和历史回测数据模拟每月购买 ETF。",
    ["什么是 ETF 投资计算器？", "ETF 投资计算器根据定期投入、市场价格和显示货币设置，估算 ETF 定投可能如何增长。"],
    ["为什么投资者用 ETF 定投", "ETF 可以通过一个可交易基金提供多元化敞口，因此常用于每月投资和定投策略。"],
    ["ETF 定投示例", "有数据时，计算器可模拟 VOO、SPY、QQQ、CSPX、VWRA、IWDA 等 ETF 示例。"],
    ["支持的 ETF 市场", "支持市场包括美国、爱尔兰 UCITS、台湾、新加坡、日本和香港；没有历史文件时会使用示例数据。"],
  ],
  "voo-dca-calculator": [
    "VOO定投计算器 | 标普500 ETF回测工具",
    "使用可用历史数据回测每月投资 VOO，并估算长期标普500 ETF 投资增长。",
    "VOO定投计算器",
    "使用 DCA 回测计算器，探索每月投资美国上市标普500 ETF VOO 的长期结果。",
    ["什么是 VOO？", "VOO 是 Vanguard 发行的美国上市 ETF，旨在跟踪代表美国大型公司的标普500指数。"],
    ["VOO 定投如何运作", "VOO 定投计算器会把每月固定投资应用到 VOO 价格上，并估算累计份额和期末价值。"],
    ["VOO 回测示例", "你可以选择每月金额和回测区间，使用可用历史数据比较总投入和估算组合价值。"],
    ["每月投资 VOO 的注意事项", "真实 VOO 回报可能因费用、税务、股息处理、汇率、成交价和券商规则而不同。"],
  ],
  "cspx-dca-calculator": [
    "CSPX定投计算器 | UCITS标普500 ETF回测工具",
    "估算 CSPX 每月投资结果；CSPX 是爱尔兰注册的 UCITS 标普500 ETF，有历史数据时使用历史数据，否则使用示例数据。",
    "CSPX定投计算器",
    "了解如何用 CSPX 定投计算器分析爱尔兰注册 UCITS 标普500 ETF 的每月投资。",
    ["什么是 CSPX？", "CSPX 是爱尔兰注册的 UCITS ETF，旨在跟踪标普500，常被偏好 UCITS 结构的非美国投资者关注。"],
    ["为什么有些投资者选择 UCITS ETF", "对美国以外投资者来说，UCITS ETF 的基金注册地、监管、税务因素和券商可用性可能很重要。"],
    ["CSPX 定投示例", "CSPX 定投计算器会在有历史数据时估算每月定投可能如何随时间增长。"],
    ["历史数据可用性说明", "如果尚未导入 CSPX 历史 CSV 数据，计算器会明确标记示例数据，而不会伪装成真实历史表现。"],
  ],
});

const zhTwPages = translatePages({
  "compound-interest-calculator": ["複利計算器 | 每月投資成長計算器", "使用複利計算器，根據每月投入、年化報酬和複利時間估算長期投資成長。", "複利計算器", "估算每月投入、年化報酬假設和時間如何共同影響長期投資成長。", ["什麼是複利？", "複利是本金與先前收益一起繼續產生收益。長期來看，再投資收益可能成為投資組合成長的重要來源。"], ["複利成長如何運作", "計算器根據初始資金、每月投入、年化報酬假設與按月複利來模擬成長。這是模型，不是預測。"], ["每月投資與複利", "每月複利計算器可以展示固定月供在假設投資報酬下長期可能如何成長。"], ["複利示例", "投資者可以比較不同每月投入金額與投資年限，了解已投入資金和成長部分如何拉開差距。"]],
  "dca-calculator": ["定投計算器 | 每月定投投資計算器", "使用定投計算器，根據定期投入和歷史或示例市場資料，估算每月投資可能如何成長。", "定投計算器", "使用每月定投計算器探索定期定額投資、ETF 示例和長期投資規劃。", ["什麼是定期定額投資？", "定期定額投資是按固定週期投入固定金額，而不是試圖一次性選擇完美入場點。"], ["定投如何運作", "價格較低時，同樣金額可以買到更多份額；價格較高時買到較少份額。計算器會估算累計份額與價值。"], ["定投與一次性投資", "一次性投資會立即投入資金。定投則把購買分散在時間中，一些投資者用它來保持紀律和管理風險。"], ["每月投資示例", "你可以設定固定每月投入、開始年份和結束年份，並比較總投入與估算期末價值。"]],
  "etf-calculator": ["ETF投資計算器 | 每月ETF報酬計算器", "估算每月 ETF 投資結果，比較支援的 ETF 資產，並了解長期 ETF 成長。", "ETF投資計算器", "了解如何用 DCA 計算器和歷史回測資料模擬每月購買 ETF。", ["什麼是 ETF 投資計算器？", "ETF 投資計算器根據定期投入、市場價格和顯示貨幣設定，估算 ETF 定投可能如何成長。"], ["為什麼投資者用 ETF 定投", "ETF 可以透過一個可交易基金提供多元化曝險，因此常用於每月投資和定投策略。"], ["ETF 定投示例", "有資料時，計算器可模擬 VOO、SPY、QQQ、CSPX、VWRA、IWDA 等 ETF 示例。"], ["支援的 ETF 市場", "支援市場包括美國、愛爾蘭 UCITS、台灣、新加坡、日本和香港；沒有歷史檔案時會使用示例資料。"]],
  "voo-dca-calculator": ["VOO定投計算器 | 標普500 ETF回測工具", "使用可用歷史資料回測每月投資 VOO，並估算長期標普500 ETF 投資成長。", "VOO定投計算器", "使用 DCA 回測計算器，探索每月投資美國上市標普500 ETF VOO 的長期結果。", ["什麼是 VOO？", "VOO 是 Vanguard 發行的美國上市 ETF，旨在追蹤代表美國大型公司的標普500指數。"], ["VOO 定投如何運作", "VOO 定投計算器會把每月固定投資應用到 VOO 價格上，並估算累計份額和期末價值。"], ["VOO 回測示例", "你可以選擇每月金額與回測區間，使用可用歷史資料比較總投入和估算組合價值。"], ["每月投資 VOO 的注意事項", "真實 VOO 報酬可能因費用、稅務、股息處理、匯率、成交價和券商規則而不同。"]],
  "cspx-dca-calculator": ["CSPX定投計算器 | UCITS標普500 ETF回測工具", "估算 CSPX 每月投資結果；CSPX 是愛爾蘭註冊的 UCITS 標普500 ETF，有歷史資料時使用歷史資料，否則使用示例資料。", "CSPX定投計算器", "了解如何用 CSPX 定投計算器分析愛爾蘭註冊 UCITS 標普500 ETF 的每月投資。", ["什麼是 CSPX？", "CSPX 是愛爾蘭註冊的 UCITS ETF，旨在追蹤標普500，常被偏好 UCITS 結構的非美國投資者關注。"], ["為什麼有些投資者選擇 UCITS ETF", "對美國以外投資者來說，UCITS ETF 的基金註冊地、監管、稅務因素和券商可用性可能很重要。"], ["CSPX 定投示例", "CSPX 定投計算器會在有歷史資料時估算每月定投可能如何隨時間成長。"], ["歷史資料可用性說明", "如果尚未匯入 CSPX 歷史 CSV 資料，計算器會明確標記示例資料，而不會偽裝成真實歷史表現。"]],
});

const msPages = translatePages({
  "compound-interest-calculator": ["Kalkulator Faedah Kompaun | Kalkulator Pertumbuhan Pelaburan Bulanan", "Anggarkan pertumbuhan pelaburan jangka panjang daripada sumbangan bulanan, pulangan tahunan dan faedah kompaun.", "Kalkulator Faedah Kompaun", "Terokai bagaimana sumbangan bulanan dan pulangan tahunan boleh mempengaruhi pertumbuhan pelaburan jangka panjang.", ["Apakah faedah kompaun?", "Faedah kompaun ialah pertumbuhan atas modal asal dan keuntungan terdahulu."], ["Cara pertumbuhan kompaun berfungsi", "Model ini menggunakan modal permulaan, sumbangan bulanan, andaian pulangan tahunan dan kompaun bulanan."], ["Pelaburan bulanan dan kompaun", "Sumbangan kecil yang dibuat secara berkala boleh memberi kesan besar dalam tempoh panjang."], ["Contoh faedah kompaun", "Bandingkan jumlah bulanan dan tempoh berbeza untuk melihat anggaran nilai akhir."]],
  "dca-calculator": ["Kalkulator DCA | Kalkulator Dollar Cost Averaging", "Anggarkan bagaimana pelaburan bulanan boleh berkembang menggunakan sumbangan berkala dan data pasaran.", "Kalkulator DCA", "Gunakan kalkulator pelaburan bulanan untuk memahami strategi dollar-cost averaging.", ["Apakah dollar-cost averaging?", "Dollar-cost averaging bermaksud melabur jumlah tetap mengikut jadual berkala."], ["Cara DCA berfungsi", "Apabila harga rendah, jumlah yang sama membeli lebih banyak unit; apabila harga tinggi, ia membeli lebih sedikit unit."], ["DCA berbanding pelaburan sekali gus", "DCA membahagikan pembelian mengikut masa, manakala pelaburan sekali gus melaburkan modal pada satu masa."], ["Contoh pelaburan bulanan", "Pilih jumlah bulanan, tahun mula dan tahun akhir untuk menganggarkan nilai akhir."]],
  "etf-calculator": ["Kalkulator Pelaburan ETF | Kalkulator Pulangan ETF Bulanan", "Anggarkan hasil pelaburan ETF bulanan dan fahami pertumbuhan ETF jangka panjang.", "Kalkulator Pelaburan ETF", "Ketahui bagaimana pembelian ETF berkala boleh dimodelkan dengan kalkulator DCA.", ["Apakah kalkulator pelaburan ETF?", "Kalkulator ini menganggarkan pertumbuhan pembelian ETF berkala berdasarkan sumbangan dan harga pasaran."], ["Mengapa ETF digunakan untuk pelaburan bulanan", "ETF boleh memberikan pendedahan yang pelbagai melalui satu dana dagangan."], ["Contoh DCA ETF", "Contoh termasuk VOO, SPY, QQQ, CSPX dan ETF lain apabila data tersedia."], ["Pasaran ETF yang disokong", "Pasaran yang disokong termasuk Amerika Syarikat, Ireland UCITS, Taiwan, Singapura, Jepun dan Hong Kong."]],
  "voo-dca-calculator": ["Kalkulator DCA VOO | Alat Ujian Balik ETF S&P 500", "Uji balik pelaburan bulanan dalam VOO dan anggarkan pertumbuhan ETF S&P 500 jangka panjang.", "Kalkulator DCA VOO", "Terokai pelaburan bulanan dalam VOO menggunakan kalkulator ujian balik DCA.", ["Apakah VOO?", "VOO ialah ETF Vanguard yang disenaraikan di Amerika Syarikat dan menjejaki indeks S&P 500."], ["Cara DCA VOO berfungsi", "Kalkulator menggunakan pelaburan bulanan pada harga VOO untuk menganggarkan unit terkumpul dan nilai akhir."], ["Contoh ujian balik VOO", "Pilih jumlah bulanan dan tempoh untuk membandingkan jumlah dilaburkan dengan nilai portfolio."], ["Pertimbangan pelaburan VOO", "Pulangan sebenar boleh berbeza kerana yuran, cukai, dividen, kadar tukaran dan harga pelaksanaan."]],
  "cspx-dca-calculator": ["Kalkulator DCA CSPX | Alat Ujian Balik ETF UCITS S&P 500", "Anggarkan pelaburan bulanan untuk CSPX, ETF UCITS S&P 500 berdomisil Ireland.", "Kalkulator DCA CSPX", "Ketahui bagaimana pelaburan bulanan dalam CSPX boleh dimodelkan.", ["Apakah CSPX?", "CSPX ialah ETF UCITS berdomisil Ireland yang menjejaki S&P 500."], ["Mengapa memilih ETF UCITS", "ETF UCITS boleh relevan untuk pelabur luar Amerika Syarikat kerana struktur dan ketersediaan broker."], ["Contoh DCA CSPX", "Kalkulator menganggarkan bagaimana pembelian bulanan CSPX mungkin berkembang apabila data tersedia."], ["Nota ketersediaan data", "Jika data sejarah CSPX belum diimport, kalkulator akan menandakan data sampel dengan jelas."]],
});

const idPages = translatePages({
  "compound-interest-calculator": ["Kalkulator Bunga Majemuk | Kalkulator Pertumbuhan Investasi Bulanan", "Perkirakan pertumbuhan investasi jangka panjang dari kontribusi bulanan, return tahunan, dan bunga majemuk.", "Kalkulator Bunga Majemuk", "Jelajahi bagaimana kontribusi bulanan dan asumsi return tahunan dapat memengaruhi pertumbuhan investasi jangka panjang.", ["Apa itu bunga majemuk?", "Bunga majemuk adalah pertumbuhan dari modal awal dan keuntungan sebelumnya."], ["Cara kerja pertumbuhan majemuk", "Model ini menggunakan modal awal, kontribusi bulanan, asumsi return tahunan, dan penggabungan bulanan."], ["Investasi bulanan dan bunga majemuk", "Kontribusi kecil yang dilakukan rutin dapat berdampak besar dalam jangka panjang."], ["Contoh bunga majemuk", "Bandingkan jumlah bulanan dan periode berbeda untuk melihat estimasi nilai akhir."]],
  "dca-calculator": ["Kalkulator DCA | Kalkulator Dollar Cost Averaging", "Perkirakan bagaimana investasi bulanan dapat tumbuh menggunakan kontribusi berkala dan data pasar.", "Kalkulator DCA", "Gunakan kalkulator investasi bulanan untuk memahami strategi dollar-cost averaging.", ["Apa itu dollar-cost averaging?", "Dollar-cost averaging berarti berinvestasi dengan jumlah tetap secara berkala."], ["Cara kerja DCA", "Saat harga lebih rendah, jumlah yang sama membeli lebih banyak unit; saat harga lebih tinggi, unit yang dibeli lebih sedikit."], ["DCA dibandingkan investasi sekaligus", "DCA membagi pembelian dari waktu ke waktu, sementara investasi sekaligus menempatkan modal dalam satu waktu."], ["Contoh investasi bulanan", "Pilih jumlah bulanan, tahun mulai, dan tahun akhir untuk memperkirakan nilai akhir."]],
  "etf-calculator": ["Kalkulator Investasi ETF | Kalkulator Return ETF Bulanan", "Perkirakan hasil investasi ETF bulanan dan pahami pertumbuhan ETF jangka panjang.", "Kalkulator Investasi ETF", "Pelajari bagaimana pembelian ETF berkala dapat dimodelkan dengan kalkulator DCA.", ["Apa itu kalkulator investasi ETF?", "Kalkulator ini memperkirakan pertumbuhan pembelian ETF berkala berdasarkan kontribusi dan harga pasar."], ["Mengapa ETF digunakan untuk investasi bulanan", "ETF dapat memberikan eksposur terdiversifikasi melalui satu dana yang diperdagangkan."], ["Contoh DCA ETF", "Contoh termasuk VOO, SPY, QQQ, CSPX, dan ETF lain jika data tersedia."], ["Pasar ETF yang didukung", "Pasar yang didukung termasuk Amerika Serikat, Ireland UCITS, Taiwan, Singapura, Jepang, dan Hong Kong."]],
  "voo-dca-calculator": ["Kalkulator DCA VOO | Alat Backtest ETF S&P 500", "Backtest investasi bulanan di VOO dan perkirakan pertumbuhan ETF S&P 500 jangka panjang.", "Kalkulator DCA VOO", "Jelajahi investasi bulanan di VOO menggunakan kalkulator backtest DCA.", ["Apa itu VOO?", "VOO adalah ETF Vanguard yang terdaftar di Amerika Serikat dan melacak indeks S&P 500."], ["Cara kerja DCA VOO", "Kalkulator menerapkan investasi bulanan pada harga VOO untuk memperkirakan unit terkumpul dan nilai akhir."], ["Contoh backtest VOO", "Pilih jumlah bulanan dan periode untuk membandingkan total investasi dengan nilai portofolio."], ["Pertimbangan investasi VOO", "Return nyata dapat berbeda karena biaya, pajak, dividen, kurs, dan harga eksekusi."]],
  "cspx-dca-calculator": ["Kalkulator DCA CSPX | Alat Backtest ETF UCITS S&P 500", "Perkirakan investasi bulanan untuk CSPX, ETF UCITS S&P 500 berdomisili Irlandia.", "Kalkulator DCA CSPX", "Pelajari bagaimana investasi bulanan di CSPX dapat dimodelkan.", ["Apa itu CSPX?", "CSPX adalah ETF UCITS berdomisili Irlandia yang melacak S&P 500."], ["Mengapa memilih ETF UCITS", "ETF UCITS dapat relevan bagi investor di luar Amerika Serikat karena struktur dan ketersediaan broker."], ["Contoh DCA CSPX", "Kalkulator memperkirakan bagaimana pembelian bulanan CSPX mungkin tumbuh jika data tersedia."], ["Catatan ketersediaan data", "Jika data historis CSPX belum diimpor, kalkulator akan menandai data sampel dengan jelas."]],
});

function translatePages(
  source: Record<BaseSeoPageSlug, [string, string, string, string, ...Array<[string, string]>]>
) {
  return Object.fromEntries(
    Object.entries(source).map(([slug, [title, description, h1, intro, ...sections]]) => [
      slug,
      buildPage(title, description, h1, intro, sections),
    ])
  ) as Record<BaseSeoPageSlug, SeoPageContent>;
}

function buildPage(
  title: string,
  description: string,
  h1: string,
  intro: string,
  sections: Array<[string, string]>
): SeoPageContent {
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
        question: "这个页面提供投资建议吗？",
        answer: "不提供。本页面和计算器仅供教育用途，不构成金融建议。",
      },
      {
        question: "可以回到主计算器使用吗？",
        answer: "可以。请使用页面中的按钮返回主 DCA Backtest 计算器。",
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
    ctaText: "使用互动 DCA Backtest 和复利计算器，模拟你自己的每月投资情景。",
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
      "Select two assets, enter a monthly amount, choose a start and end year, and review final value, profit, return, difference, and the better performer for that period.",
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
    calculatorIntro: "用 DCA Backtest 对比工具，在相同每月投入和相同期间下比较两个 ETF 或资产。",
    keyTitle: "关键差异",
    keyBody: (a, b) => `${a} 和 ${b} 可能在指数敞口、基金注册地、货币、费用、分红处理、交易市场和税务因素上不同。没有一个基金永远更好，结果取决于投资者和假设。`,
    calculatorKeyBody: "ETF 对比计算器可以并排比较资产，但它是教育工具，不是投资推荐系统。",
    dcaTitle: "如何对比定投回测",
    dcaBody: (a, b) => `对 ${a} 和 ${b} 使用相同每月金额、开始年份、结束年份和显示货币，这样对比更集中在资产表现而不是投入假设。`,
    calculatorDcaBody: "选择两个资产，输入每月金额和起止年份，查看最终价值、利润、回报、差额以及该期间表现较好的资产。",
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
    calculatorDcaBody: "選擇兩個資產，輸入每月金額和起止年份，查看最終價值、利潤、回報、差額以及該期間表現較好的資產。",
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

function buildComparisonPages(locale: Locale): Record<ComparisonSeoPageSlug, SeoPageContent> {
  const text = localizedComparisonText[locale] ?? localizedComparisonText.en;

  return Object.fromEntries(
    comparisonSeoPageSlugs.map((slug) => {
      const definition = comparisonDefinitions[slug];
      const isCalculator = definition.theme === "calculator";
      const { assetA, assetB } = definition;

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
          faqs: [
            {
              question: isCalculator
                ? text.faqDca
                : text.faqBetter(assetA, assetB),
              answer: isCalculator
                ? text.faqDcaAnswer
                : text.faqBetterAnswer(assetA, assetB),
            },
            { question: text.faqDca, answer: text.faqDcaAnswer },
            { question: text.faqAdvice, answer: text.faqAdviceAnswer },
          ],
        },
      ];
    })
  ) as Record<ComparisonSeoPageSlug, SeoPageContent>;
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
    },
  };
}

export function getSeoLandingPage(locale: Locale, slug: SeoPageSlug) {
  return getSeoLandingContent(locale).pages[slug];
}

export function isSeoPageSlug(value: string): value is SeoPageSlug {
  return seoPageSlugs.includes(value as SeoPageSlug);
}

export function getSeoPageAlternates(slug: SeoPageSlug) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `/${locale}/${slug}`])
  );
}
