import type { Locale } from "../i18n/routing";
import type { ComparisonKind } from "./comparisonContent/models";
import { getComparisonConfigDescriptor } from "./comparisonContent/registry";

export const comparisonLibrarySlugs = [
  "voo-vs-spy",
  "voo-vs-ivv",
  "vti-vs-schb",
  "schd-vs-vig",
  "qqq-vs-qqqm",
  "cspx-vs-vuaa",
  "cspx-vs-spyl",
  "vwra-vs-isac",
  "iwda-vs-swda",
  "schd-vs-dgro",
  "schd-vs-vym",
  "voo-vs-vti",
  "vti-vs-itot",
  "cspx-vs-voo",
  "cspx-vs-ivv",
  "swda-vs-vwra",
  "swda-vs-iwda",
  "vwra-vs-vti",
  "vuaa-vs-cspx",
  "spyl-vs-cspx",
  "spyl-vs-vuaa",
  "qqq-vs-schg",
  "qqq-vs-xlk",
  "vxus-vs-ixus",
  "vt-vs-vti",
  "vt-vs-vwra",
] as const;

export type ComparisonLibrarySlug = (typeof comparisonLibrarySlugs)[number];
export type ComparisonCalculatorStatus = "available" | "unavailable";

export type ComparisonLibraryPage = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  ctaQuery?: string;
  calculatorStatus?: ComparisonCalculatorStatus;
  calculatorNotice?: string;
  comparedItems?: Array<{ name: string; url?: string }>;
  sections: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export type ComparisonLibraryEntry = {
  comparisonKind: ComparisonKind;
  page: ComparisonLibraryPage;
  relatedLinks: string[];
  pageType: "Article" | "WebPage" | "WebApplication";
  calculatorAvailability: "available" | "unavailable";
  supportedLocales: readonly Locale[];
  prosConsIndexes?: { pros: number; cons: number };
};

type Asset = {
  symbol: string;
  name: string;
  index: string;
  expenseRatio: string;
  dividend: "quarterly" | "semi-annual" | "accumulating";
  holdings: string;
  history: boolean;
};

type Definition = {
  a: Asset;
  b: Asset;
  market: "US" | "UCITS";
  relationship: "same-index" | "different-index" | "same-fund";
  ctaQuery?: string;
};

const assets: Record<string, Asset> = {
  VOO: { symbol: "VOO", name: "Vanguard S&P 500 ETF", index: "S&P 500 Index", expenseRatio: "0.03%", dividend: "quarterly", holdings: "about 500", history: true },
  SPY: { symbol: "SPY", name: "State Street SPDR S&P 500 ETF Trust", index: "S&P 500 Index", expenseRatio: "0.0945%", dividend: "quarterly", holdings: "about 500", history: true },
  IVV: { symbol: "IVV", name: "iShares Core S&P 500 ETF", index: "S&P 500 Index", expenseRatio: "0.03%", dividend: "quarterly", holdings: "about 500", history: true },
  VTI: { symbol: "VTI", name: "Vanguard Total Stock Market ETF", index: "CRSP US Total Market Index", expenseRatio: "0.03%", dividend: "quarterly", holdings: "more than 3,000", history: true },
  SCHB: { symbol: "SCHB", name: "Schwab U.S. Broad Market ETF", index: "Dow Jones U.S. Broad Stock Market Index", expenseRatio: "0.03%", dividend: "quarterly", holdings: "more than 2,000", history: false },
  SCHD: { symbol: "SCHD", name: "Schwab U.S. Dividend Equity ETF", index: "Dow Jones U.S. Dividend 100 Index", expenseRatio: "0.06%", dividend: "quarterly", holdings: "about 100", history: true },
  VIG: { symbol: "VIG", name: "Vanguard Dividend Appreciation ETF", index: "S&P U.S. Dividend Growers Index", expenseRatio: "0.05%", dividend: "quarterly", holdings: "more than 300", history: true },
  DGRO: { symbol: "DGRO", name: "iShares Core Dividend Growth ETF", index: "Morningstar US Dividend Growth Index", expenseRatio: "0.08%", dividend: "quarterly", holdings: "about 400", history: false },
  VYM: { symbol: "VYM", name: "Vanguard High Dividend Yield ETF", index: "FTSE High Dividend Yield Index", expenseRatio: "0.04%", dividend: "quarterly", holdings: "more than 500", history: false },
  ITOT: { symbol: "ITOT", name: "iShares Core S&P Total U.S. Stock Market ETF", index: "S&P Total Market Index", expenseRatio: "0.03%", dividend: "quarterly", holdings: "more than 2,400", history: false },
  QQQ: { symbol: "QQQ", name: "Invesco QQQ Trust", index: "Nasdaq-100 Index", expenseRatio: "0.18%", dividend: "quarterly", holdings: "about 100", history: true },
  QQQM: { symbol: "QQQM", name: "Invesco NASDAQ 100 ETF", index: "Nasdaq-100 Index", expenseRatio: "0.15%", dividend: "quarterly", holdings: "about 100", history: true },
  SCHG: { symbol: "SCHG", name: "Schwab U.S. Large-Cap Growth ETF", index: "Dow Jones U.S. Large-Cap Growth Total Stock Market Index", expenseRatio: "0.04%", dividend: "quarterly", holdings: "about 200", history: false },
  XLK: { symbol: "XLK", name: "State Street Technology Select Sector SPDR ETF", index: "Technology Select Sector Index", expenseRatio: "0.08%", dividend: "quarterly", holdings: "about 70", history: false },
  VXUS: { symbol: "VXUS", name: "Vanguard Total International Stock ETF", index: "FTSE Global All Cap ex US Index", expenseRatio: "0.05%", dividend: "quarterly", holdings: "more than 8,000", history: true },
  IXUS: { symbol: "IXUS", name: "iShares Core MSCI Total International Stock ETF", index: "MSCI ACWI ex USA IMI Index", expenseRatio: "0.07%", dividend: "semi-annual", holdings: "more than 4,000", history: false },
  VT: { symbol: "VT", name: "Vanguard Total World Stock ETF", index: "FTSE Global All Cap Index", expenseRatio: "0.06%", dividend: "quarterly", holdings: "more than 9,000", history: true },
  CSPX: { symbol: "CSPX", name: "iShares Core S&P 500 UCITS ETF", index: "S&P 500 Index", expenseRatio: "0.07%", dividend: "accumulating", holdings: "about 500", history: true },
  VUAA: { symbol: "VUAA", name: "Vanguard S&P 500 UCITS ETF", index: "S&P 500 Index", expenseRatio: "0.07%", dividend: "accumulating", holdings: "about 500", history: false },
  SPYL: { symbol: "SPYL", name: "SPDR S&P 500 UCITS ETF", index: "S&P 500 Index", expenseRatio: "0.03%", dividend: "accumulating", holdings: "about 500", history: false },
  VWRA: { symbol: "VWRA", name: "Vanguard FTSE All-World UCITS ETF", index: "FTSE All-World Index", expenseRatio: "0.19%", dividend: "accumulating", holdings: "more than 3,000", history: true },
  ISAC: { symbol: "ISAC", name: "iShares MSCI ACWI UCITS ETF", index: "MSCI All Country World Index", expenseRatio: "0.20%", dividend: "accumulating", holdings: "more than 1,500", history: false },
  IWDA: { symbol: "IWDA", name: "iShares Core MSCI World UCITS ETF", index: "MSCI World Index", expenseRatio: "0.20%", dividend: "accumulating", holdings: "more than 1,300", history: true },
  SWDA: { symbol: "SWDA", name: "iShares Core MSCI World UCITS ETF", index: "MSCI World Index", expenseRatio: "0.20%", dividend: "accumulating", holdings: "more than 1,300", history: false },
};

const definitions: Record<ComparisonLibrarySlug, Definition> = {
  "voo-vs-spy": { a: assets.VOO, b: assets.SPY, market: "US", relationship: "same-index", ctaQuery: "?market=us&type=ETF&asset=VOO" },
  "voo-vs-ivv": { a: assets.VOO, b: assets.IVV, market: "US", relationship: "same-index", ctaQuery: "?market=us&type=ETF&asset=VOO" },
  "vti-vs-schb": { a: assets.VTI, b: assets.SCHB, market: "US", relationship: "different-index" },
  "schd-vs-vig": { a: assets.SCHD, b: assets.VIG, market: "US", relationship: "different-index", ctaQuery: "?market=us&type=ETF&asset=SCHD" },
  "qqq-vs-qqqm": { a: assets.QQQ, b: assets.QQQM, market: "US", relationship: "same-index", ctaQuery: "?market=us&type=ETF&asset=QQQ" },
  "cspx-vs-vuaa": { a: assets.CSPX, b: assets.VUAA, market: "UCITS", relationship: "same-index" },
  "cspx-vs-spyl": { a: assets.CSPX, b: assets.SPYL, market: "UCITS", relationship: "same-index" },
  "vwra-vs-isac": { a: assets.VWRA, b: assets.ISAC, market: "UCITS", relationship: "different-index" },
  "iwda-vs-swda": { a: assets.IWDA, b: assets.SWDA, market: "UCITS", relationship: "same-fund" },
  "schd-vs-dgro": { a: assets.SCHD, b: assets.DGRO, market: "US", relationship: "different-index" },
  "schd-vs-vym": { a: assets.SCHD, b: assets.VYM, market: "US", relationship: "different-index" },
  "voo-vs-vti": { a: assets.VOO, b: assets.VTI, market: "US", relationship: "different-index", ctaQuery: "?market=us&type=ETF&asset=VOO" },
  "vti-vs-itot": { a: assets.VTI, b: assets.ITOT, market: "US", relationship: "different-index" },
  "cspx-vs-voo": { a: assets.CSPX, b: assets.VOO, market: "UCITS", relationship: "same-index", ctaQuery: "?market=ireland&type=ETF&asset=CSPX.L" },
  "cspx-vs-ivv": { a: assets.CSPX, b: assets.IVV, market: "UCITS", relationship: "same-index", ctaQuery: "?market=ireland&type=ETF&asset=CSPX.L" },
  "swda-vs-vwra": { a: assets.SWDA, b: assets.VWRA, market: "UCITS", relationship: "different-index" },
  "swda-vs-iwda": { a: assets.SWDA, b: assets.IWDA, market: "UCITS", relationship: "same-fund" },
  "vwra-vs-vti": { a: assets.VWRA, b: assets.VTI, market: "UCITS", relationship: "different-index", ctaQuery: "?market=ireland&type=ETF&asset=VWRA.L" },
  "vuaa-vs-cspx": { a: assets.VUAA, b: assets.CSPX, market: "UCITS", relationship: "same-index" },
  "spyl-vs-cspx": { a: assets.SPYL, b: assets.CSPX, market: "UCITS", relationship: "same-index" },
  "spyl-vs-vuaa": { a: assets.SPYL, b: assets.VUAA, market: "UCITS", relationship: "same-index" },
  "qqq-vs-schg": { a: assets.QQQ, b: assets.SCHG, market: "US", relationship: "different-index" },
  "qqq-vs-xlk": { a: assets.QQQ, b: assets.XLK, market: "US", relationship: "different-index" },
  "vxus-vs-ixus": { a: assets.VXUS, b: assets.IXUS, market: "US", relationship: "different-index" },
  "vt-vs-vti": { a: assets.VT, b: assets.VTI, market: "US", relationship: "different-index", ctaQuery: "?market=us&type=ETF&asset=VT" },
  "vt-vs-vwra": { a: assets.VT, b: assets.VWRA, market: "UCITS", relationship: "different-index", ctaQuery: "?market=us&type=ETF&asset=VT" },
};

const copy = {
  en: { performance: "Performance summary", fees: "Fees", ratio: "Expense ratio", dividend: "Dividend", holdings: "Holdings", pros: "Pros", cons: "Cons", who: "Who is it for", faqBetter: "Which one is better?", faqBacktest: "Can I backtest this pair?", faqAdvice: "Is this a recommendation?", quarterly: "distributes dividends quarterly", semiAnnual: "distributes dividends semi-annually", accumulating: "reinvests income inside the accumulating share class", unavailable: "Historical comparison backtesting is not yet available for this pair because at least one asset does not have validated historical data in DCA Backtest. No return is simulated or estimated.", available: "Both assets have validated historical data in DCA Backtest. Use identical dates, contributions, fees and currency when comparing them.", advice: "No. This is an educational comparison, not investment advice.", costs: "Also compare brokerage commission, spread, tax and foreign-exchange costs; these vary by investor and are not included in the fund expense ratio.", performanceBody: "Past results depend on the selected period. Similar index exposure can produce close gross performance, while fees, tracking difference, trading price and dividend timing can change investor outcomes.", prosBody: "Both provide transparent index exposure. The more suitable choice depends on index coverage, fund structure, trading venue, liquidity and total investor cost.", consBody: "Both can fall in value. Index concentration, tracking difference, tax, currency, spreads and brokerage access remain relevant risks.", whoBody: "For investors comparing long-term index exposure who can assess domicile, tax, trading access and portfolio overlap before choosing.", sameFund: "IWDA and SWDA are London Stock Exchange trading tickers for the same accumulating iShares fund, not two portfolios with independent holdings or returns." },
  "zh-CN": { performance: "表现摘要", fees: "费用", ratio: "费用率", dividend: "股息", holdings: "持仓", pros: "优点", cons: "缺点", who: "适合谁", faqBetter: "哪一个更好？", faqBacktest: "可以回测这组资产吗？", faqAdvice: "这是投资推荐吗？", quarterly: "按季度派发股息", semiAnnual: "每半年派发股息", accumulating: "在累积型份额内再投资收入", unavailable: "这组资产暂时不能进行历史对比回测，因为至少一个资产尚无 DCA Backtest 已验证历史数据。页面不会模拟或估算回报。", available: "两个资产都有 DCA Backtest 已验证历史数据。比较时应使用相同日期、投入、费用和货币。", advice: "不是。本页是教育性比较，不构成投资建议。", costs: "还应比较券商佣金、买卖价差、税务和换汇成本；这些成本因投资者而异，不属于基金费用率。", performanceBody: "历史结果取决于所选期间。指数曝险相近时，扣费前表现可能接近，但费用、跟踪差异、成交价和股息时间会影响实际结果。", prosBody: "两者都提供透明的指数曝险。较合适的选择取决于指数覆盖、基金结构、交易市场、流动性和投资者总成本。", consBody: "两者都可能下跌。指数集中度、跟踪差异、税务、货币、价差和券商支持仍是重要风险。", whoBody: "适合能够在选择前评估基金注册地、税务、交易渠道和组合重叠的长期指数投资者。", sameFund: "IWDA 和 SWDA 是同一只 iShares 累积型基金在伦敦证券交易所的交易代码，并非持仓或回报独立的两只基金。" },
  "zh-TW": { performance: "績效摘要", fees: "費用", ratio: "費用率", dividend: "股息", holdings: "持倉", pros: "優點", cons: "缺點", who: "適合誰", faqBetter: "哪一個較好？", faqBacktest: "可以回測這組資產嗎？", faqAdvice: "這是投資推薦嗎？", quarterly: "按季派發股息", semiAnnual: "每半年派發股息", accumulating: "在累積型股份內再投資收入", unavailable: "這組資產目前無法進行歷史對比回測，因為至少一個資產尚無 DCA Backtest 已驗證歷史資料。頁面不會模擬或估算報酬。", available: "兩個資產都有 DCA Backtest 已驗證歷史資料。比較時應使用相同日期、投入、費用和貨幣。", advice: "不是。本頁是教育性比較，不構成投資建議。", costs: "亦應比較券商佣金、買賣價差、稅務和換匯成本；這些成本因投資者而異，不屬於基金費用率。", performanceBody: "歷史結果取決於所選期間。指數曝險相近時，扣費前績效可能接近，但費用、追蹤差異、成交價和股息時間會影響實際結果。", prosBody: "兩者都提供透明的指數曝險。較合適的選擇取決於指數覆蓋、基金結構、交易市場、流動性和投資者總成本。", consBody: "兩者都可能下跌。指數集中度、追蹤差異、稅務、貨幣、價差和券商支援仍是重要風險。", whoBody: "適合能在選擇前評估基金註冊地、稅務、交易管道和投資組合重疊的長期指數投資者。", sameFund: "IWDA 和 SWDA 是同一隻 iShares 累積型基金在倫敦證券交易所的交易代碼，並非持倉或報酬獨立的兩隻基金。" },
  ms: { performance: "Ringkasan prestasi", fees: "Fi", ratio: "Nisbah perbelanjaan", dividend: "Dividen", holdings: "Pegangan", pros: "Kelebihan", cons: "Kekurangan", who: "Untuk siapa", faqBetter: "Yang mana lebih baik?", faqBacktest: "Bolehkah pasangan ini diuji balik?", faqAdvice: "Adakah ini cadangan pelaburan?", quarterly: "mengagihkan dividen setiap suku tahun", semiAnnual: "mengagihkan dividen setiap setengah tahun", accumulating: "melabur semula pendapatan dalam kelas saham akumulasi", unavailable: "Ujian balik sejarah bagi pasangan ini belum tersedia kerana sekurang-kurangnya satu aset belum mempunyai data sejarah yang disahkan dalam DCA Backtest. Tiada pulangan disimulasi atau dianggarkan.", available: "Kedua-dua aset mempunyai data sejarah yang disahkan dalam DCA Backtest. Gunakan tarikh, sumbangan, fi dan mata wang yang sama.", advice: "Tidak. Ini perbandingan pendidikan, bukan nasihat pelaburan.", costs: "Bandingkan juga komisen broker, spread, cukai dan kos pertukaran asing; kos ini berbeza dan bukan sebahagian nisbah perbelanjaan dana.", performanceBody: "Prestasi lalu bergantung pada tempoh pilihan. Pendedahan indeks yang serupa boleh menghasilkan prestasi kasar yang hampir sama, tetapi fi, perbezaan penjejakan, harga dagangan dan masa dividen mempengaruhi hasil.", prosBody: "Kedua-duanya menawarkan pendedahan indeks yang telus. Pilihan bergantung pada liputan indeks, struktur dana, tempat dagangan, kecairan dan jumlah kos.", consBody: "Kedua-duanya boleh jatuh nilainya. Kepekatan indeks, perbezaan penjejakan, cukai, mata wang, spread dan akses broker kekal sebagai risiko.", whoBody: "Untuk pelabur indeks jangka panjang yang boleh menilai domisil, cukai, akses dagangan dan pertindihan portfolio.", sameFund: "IWDA dan SWDA ialah ticker dagangan Bursa Saham London untuk dana akumulasi iShares yang sama, bukan dua portfolio berasingan." },
  id: { performance: "Ringkasan kinerja", fees: "Biaya", ratio: "Rasio biaya", dividend: "Dividen", holdings: "Kepemilikan", pros: "Kelebihan", cons: "Kekurangan", who: "Untuk siapa", faqBetter: "Mana yang lebih baik?", faqBacktest: "Bisakah pasangan ini diuji balik?", faqAdvice: "Apakah ini rekomendasi investasi?", quarterly: "membagikan dividen setiap kuartal", semiAnnual: "membagikan dividen setiap semester", accumulating: "menginvestasikan kembali pendapatan dalam kelas saham akumulasi", unavailable: "Uji balik historis untuk pasangan ini belum tersedia karena setidaknya satu aset belum memiliki data historis tervalidasi di DCA Backtest. Tidak ada imbal hasil yang disimulasikan atau diperkirakan.", available: "Kedua aset memiliki data historis tervalidasi di DCA Backtest. Gunakan tanggal, kontribusi, biaya, dan mata uang yang sama.", advice: "Tidak. Ini perbandingan edukatif, bukan nasihat investasi.", costs: "Bandingkan juga komisi broker, spread, pajak, dan biaya valuta asing; biaya ini berbeda menurut investor dan bukan bagian dari rasio biaya dana.", performanceBody: "Kinerja masa lalu bergantung pada periode pilihan. Eksposur indeks serupa dapat menghasilkan kinerja bruto yang dekat, tetapi biaya, selisih pelacakan, harga perdagangan, dan waktu dividen memengaruhi hasil.", prosBody: "Keduanya menawarkan eksposur indeks yang transparan. Pilihan bergantung pada cakupan indeks, struktur dana, bursa, likuiditas, dan total biaya investor.", consBody: "Keduanya dapat turun nilainya. Konsentrasi indeks, selisih pelacakan, pajak, mata uang, spread, dan akses broker tetap menjadi risiko.", whoBody: "Untuk investor indeks jangka panjang yang dapat menilai domisili, pajak, akses perdagangan, dan tumpang tindih portofolio.", sameFund: "IWDA dan SWDA adalah ticker perdagangan Bursa Efek London untuk dana akumulasi iShares yang sama, bukan dua portofolio terpisah." },
  ko: {
    performance: "성과 요약",
    fees: "비용",
    ratio: "총보수율",
    dividend: "분배금",
    holdings: "보유 종목",
    pros: "장점",
    cons: "단점",
    who: "적합한 투자자",
    faqBetter: "어느 쪽이 더 적합한가요?",
    faqBacktest: "이 조합을 백테스트할 수 있나요?",
    faqAdvice: "투자 추천인가요?",
    quarterly: "분기마다 분배금을 지급합니다",
    semiAnnual: "반기마다 분배금을 지급합니다",
    accumulating: "누적형 주식 클래스 내부에서 수익을 재투자합니다",
    unavailable: "이 조합은 적어도 한 자산에 DCA Backtest에서 검증된 과거 데이터가 없어 아직 과거 비교 백테스트를 제공하지 않습니다. 수익률을 시뮬레이션하거나 추정하지 않습니다.",
    available: "두 자산 모두 DCA Backtest에서 검증된 과거 데이터가 있습니다. 비교할 때 동일한 기간, 납입액, 수수료와 통화를 사용하세요.",
    advice: "아닙니다. 교육 목적의 비교이며 투자 조언이 아닙니다.",
    costs: "증권사 수수료, 매수·매도 스프레드, 세금과 환전 비용도 비교해야 합니다. 이러한 비용은 투자자마다 다르며 펀드 총보수율에 포함되지 않습니다.",
    performanceBody: "과거 결과는 선택한 기간에 따라 달라집니다. 지수 노출이 비슷하면 비용 차감 전 성과가 유사할 수 있지만, 비용, 추적 차이, 거래 가격과 분배 시점이 실제 결과에 영향을 줄 수 있습니다.",
    prosBody: "두 상품 모두 투명한 지수 노출을 제공합니다. 더 적합한 선택은 지수 범위, 펀드 구조, 거래 시장, 유동성과 투자자의 총비용에 따라 달라집니다.",
    consBody: "두 상품 모두 가치가 하락할 수 있습니다. 지수 집중도, 추적 차이, 세금, 통화, 스프레드와 증권사 접근성은 여전히 중요한 위험입니다.",
    whoBody: "선택 전에 펀드 소재지, 세금, 거래 접근성과 포트폴리오 중복을 평가할 수 있는 장기 지수 투자자를 위한 비교입니다.",
    sameFund: "IWDA와 SWDA는 동일한 iShares 누적형 펀드가 런던증권거래소에서 사용하는 거래 티커이며, 보유 종목이나 수익률이 독립된 두 포트폴리오가 아닙니다.",
  },
} as const;

export function getComparisonLibraryEntry(locale: Locale, slug: ComparisonLibrarySlug): ComparisonLibraryEntry {
  const d = definitions[slug];
  const descriptor = getComparisonConfigDescriptor(slug);
  if (!descriptor) throw new Error(`Missing comparison descriptor: ${slug}`);
  const t = copy[locale as keyof typeof copy] ?? copy.en;
  const available = d.a.history && d.b.history;
  const relationship = d.relationship === "same-fund" ? t.sameFund : t.performanceBody;
  const dividendLabel = (asset: Asset) => asset.dividend === "quarterly"
    ? t.quarterly
    : asset.dividend === "semi-annual"
      ? t.semiAnnual
      : t.accumulating;
  const dividendA = dividendLabel(d.a);
  const dividendB = dividendLabel(d.b);
  const pair = `${d.a.symbol} vs ${d.b.symbol}`;
  const shorterHistory = locale === "zh-CN"
    ? "QQQM 的历史短于 QQQ，因此只能比较两者均有已验证数据的重叠期间。"
    : locale === "zh-TW"
      ? "QQQM 的歷史短於 QQQ，因此只能比較兩者均有已驗證資料的重疊期間。"
      : locale === "ms"
        ? "Sejarah QQQM lebih pendek daripada QQQ, jadi perbandingan hanya boleh menggunakan tempoh disahkan yang bertindih."
      : locale === "id"
          ? "Riwayat QQQM lebih pendek daripada QQQ, sehingga perbandingan hanya dapat memakai periode tervalidasi yang bertumpang tindih."
          : locale === "ko"
            ? "QQQM의 과거 데이터 기간은 QQQ보다 짧으므로 두 자산에 검증된 데이터가 겹치는 기간만 비교할 수 있습니다."
          : "QQQM has a shorter history than QQQ, so the comparison can only use their overlapping validated period.";
  const calculatorNotice = available && slug === "qqq-vs-qqqm"
    ? `${t.available} ${shorterHistory}`
    : available ? t.available : t.unavailable;
  const meta = locale === "zh-CN"
    ? { title: `${pair}｜ETF 费用、持仓与定投比较`, description: `比较 ${d.a.symbol} 与 ${d.b.symbol} 的费用率、股息、持仓、优缺点、历史数据可用性和常见问题。`, intro: `本页按基金结构、指数曝险和公布费用比较 ${d.a.name} 与 ${d.b.name}，绝不编造历史表现。` }
    : locale === "zh-TW"
      ? { title: `${pair}｜ETF 費用、持倉與定投比較`, description: `比較 ${d.a.symbol} 與 ${d.b.symbol} 的費用率、股息、持倉、優缺點、歷史資料可用性和常見問題。`, intro: `本頁按基金結構、指數曝險和公布費用比較 ${d.a.name} 與 ${d.b.name}，絕不捏造歷史績效。` }
      : locale === "ms"
        ? { title: `${pair} | Perbandingan Fi, Pegangan & DCA ETF`, description: `Bandingkan nisbah perbelanjaan, dividen, pegangan, kelebihan, kekurangan dan ketersediaan data ${d.a.symbol} dengan ${d.b.symbol}.`, intro: `${d.a.name} dan ${d.b.name} dibandingkan mengikut struktur dana, pendedahan indeks dan kos yang diterbitkan. Prestasi sejarah tidak direka.` }
        : locale === "id"
          ? { title: `${pair} | Perbandingan Biaya, Kepemilikan & DCA ETF`, description: `Bandingkan rasio biaya, dividen, kepemilikan, kelebihan, kekurangan, dan ketersediaan data ${d.a.symbol} dengan ${d.b.symbol}.`, intro: `${d.a.name} dan ${d.b.name} dibandingkan berdasarkan struktur dana, eksposur indeks, dan biaya terpublikasi. Kinerja historis tidak direkayasa.` }
          : locale === "ko"
            ? { title: `${pair} | ETF 비용, 보유 종목 및 DCA 비교`, description: `${d.a.symbol}와 ${d.b.symbol}의 총보수율, 분배금, 보유 종목, 장단점과 과거 데이터 가용성을 비교합니다.`, intro: `${d.a.name}와 ${d.b.name}를 펀드 구조, 지수 노출과 공개된 비용으로 비교합니다. 과거 성과를 임의로 만들지 않습니다.` }
          : { title: `${pair} | ETF Fees, Holdings & DCA Comparison`, description: `Compare ${d.a.symbol} and ${d.b.symbol}: expense ratios, dividends, holdings, pros, cons, historical-data availability and educational FAQs.`, intro: `${d.a.name} and ${d.b.name} are compared using fund structure, index exposure and published costs. Historical performance is never fabricated.` };

  return { comparisonKind: descriptor.comparisonKind, relatedLinks: [...descriptor.relatedLinks], pageType: descriptor.pageType, calculatorAvailability: descriptor.calculatorAvailability, supportedLocales: descriptor.supportedLocales, prosConsIndexes: { pros: 5, cons: 6 }, page: {
    title: meta.title,
    description: meta.description,
    h1: pair,
    intro: meta.intro,
    ctaQuery: available ? d.ctaQuery : undefined,
    calculatorStatus: available ? "available" : "unavailable",
    calculatorNotice,
    comparedItems: [{ name: d.a.name }, { name: d.b.name }],
    sections: [
      { title: t.performance, body: relationship },
      { title: t.fees, body: t.costs },
      { title: t.ratio, body: `${d.a.symbol}: ${d.a.expenseRatio}. ${d.b.symbol}: ${d.b.expenseRatio}.` },
      { title: t.dividend, body: `${d.a.symbol} ${dividendA}; ${d.b.symbol} ${dividendB}.` },
      { title: t.holdings, body: `${d.a.symbol}: ${d.a.index}, ${d.a.holdings} holdings. ${d.b.symbol}: ${d.b.index}, ${d.b.holdings} holdings.` },
      { title: t.pros, body: t.prosBody },
      { title: t.cons, body: t.consBody },
      { title: t.who, body: t.whoBody },
    ],
    faqs: [
      { question: `${pair}: ${t.faqBetter}`, answer: t.prosBody },
      { question: t.faqBacktest, answer: calculatorNotice },
      { question: t.faqAdvice, answer: t.advice },
    ],
  } };
}

export function getComparisonRelatedSlugs(slug: string): string[] {
  return [...(getComparisonConfigDescriptor(slug)?.relatedLinks ?? [])];
}

export function getBrokerComparisonEntry(
  slug: "ibkr-vs-moomoo-malaysia" | "tiger-vs-moomoo-malaysia"
): ComparisonLibraryEntry {
  const a = slug.startsWith("ibkr") ? "IBKR" : "Tiger Brokers";
  const b = "Moomoo";
  const pair = `${a} vs ${b}`;
  const descriptor = getComparisonConfigDescriptor(slug);
  if (!descriptor) throw new Error(`Missing comparison descriptor: ${slug}`);
  const unavailable = "券商不是可回测的市场资产，因此本页不提供历史回测，也不会模拟券商回报。页面结构保留计算器区块，未来只有在比较对象具有已验证历史市场数据时才会启用。";
  return { comparisonKind: descriptor.comparisonKind, relatedLinks: [...descriptor.relatedLinks], pageType: descriptor.pageType, calculatorAvailability: descriptor.calculatorAvailability, supportedLocales: descriptor.supportedLocales, prosConsIndexes: { pros: 5, cons: 6 }, page: {
    title: `${pair} 马来西亚 | 费用、市场与平台比较`,
    description: `中立比较 ${a} 与 ${b} 在马来西亚的费用结构、市场覆盖、换汇、平台工具、优缺点和适合用户。`,
    h1: `${pair} 马来西亚`,
    intro: `本页从马来西亚投资者角度比较 ${a} 与 ${b}。券商条款、产品权限、费用与促销会变化，下单前应查看各券商官方网站。`,
    calculatorStatus: "unavailable",
    calculatorNotice: unavailable,
    comparedItems: [{ name: a }, { name: b }],
    sections: [
      { title: "表现摘要", body: "券商本身没有可比较的投资回报。投资表现来自所买资产、交易时点、费用、税务与汇率；本页不会把平台促销或示例当作历史回报。" },
      { title: "费用", body: "比较佣金、平台费、监管费、换汇价差、入金出金、市场数据和托管相关收费。收费会按市场、产品、账户和时间变化，应以官方费率表为准。" },
      { title: "费用率", body: "费用率适用于基金，不适用于券商。券商应比较每笔交易与账户层面的实际总成本；ETF 的基金费用率则由基金发行商公布。" },
      { title: "股息", body: "股息由所持资产派发，不是券商收益。应比较股息入账、预扣税文件、货币转换和企业行动处理方式。" },
      { title: "持仓", body: "券商不是基金，没有基金持仓。应比较可交易市场与产品范围，并确认目标 ETF、交易所、订单类型和账户权限是否支持。" },
      { title: "优点", body: `${a} 与 ${b} 都可提供线上交易和研究工具；实际优势取决于目标市场、订单需求、报表、语言、换汇方式和使用习惯。` },
      { title: "缺点", body: "费用、产品权限、服务实体、促销和平台功能可能变化。任何平台也存在运营、网络、市场、汇率和投资亏损风险。" },
      { title: "适合谁", body: "适合愿意先列出目标市场、预计交易频率、换汇金额、所需报表和客服需求，再按官方资料比较总成本的马来西亚用户。" },
    ],
    faqs: [
      { question: `${pair} 哪一个更好？`, answer: "没有对所有用户都更好的答案。应按市场覆盖、总费用、换汇、平台功能、报表和个人需求判断。" },
      { question: "可以回测券商历史表现吗？", answer: unavailable },
      { question: "费用资料会变化吗？", answer: "会。费用、促销、市场权限和条款可能变化，开户、入金或下单前应查看官方资料。" },
      { question: "这是券商推荐吗？", answer: "不是。本页仅供教育用途，不构成开户、投资、税务或法律建议。" },
    ],
  } };
}
