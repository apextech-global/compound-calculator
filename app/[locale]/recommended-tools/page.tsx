import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { isPublicLocale, publicLocaleCodes } from "@/lib/locales";
import {
  absoluteUrl,
  alternateLanguages,
  buildBreadcrumbJsonLd,
  productionBaseUrl,
  socialImageAlt,
} from "@/lib/seoMetadata";

type ToolCard = {
  name: string;
  category: "brokerage" | "transfer" | "portfolio";
};

type RecommendedToolsCopy = {
  title: string;
  eyebrow: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  disclosure: string;
  sections: {
    brokerage: string;
    transfer: string;
    portfolio: string;
    reminders: string;
  };
  verifyLabel: string;
  verifyItems: string;
  learnMore: string;
  toolDescriptions: Record<string, string>;
  portfolioBody: string;
  reminders: string[];
  linksTitle: string;
  links: {
    affiliate: string;
    disclaimer: string;
    terms: string;
    privacy: string;
    dca: string;
    comparison: string;
    malaysiaCspx: string;
    malaysiaVoo: string;
  };
};

const tools: ToolCard[] = [
  {
    name: "Interactive Brokers",
    category: "brokerage",
  },
  {
    name: "Moomoo",
    category: "brokerage",
  },
  {
    name: "Wise",
    category: "transfer",
  },
  {
    name: "Instarem",
    category: "transfer",
  },
  {
    name: "MoneyMatch",
    category: "transfer",
  },
];

const copy: Record<string, RecommendedToolsCopy> = {
  en: {
    title: "Recommended Tools",
    eyebrow: "Educational resources",
    description:
      "Learn about common tools investors may compare before investing, including brokerage platforms, currency exchange tools, and portfolio tracking tools.",
    seoTitle: "Recommended Tools | DCA Backtest",
    seoDescription:
      "Learn about brokerage platforms, money transfer tools, and portfolio tracking tools to research before investing. Educational only.",
    disclosure:
      "Some links may become affiliate or referral links in the future. We may earn a commission or referral reward at no extra cost to you. This does not affect the educational nature of our content.",
    sections: {
      brokerage: "Brokerage platforms",
      transfer: "Currency exchange / transfer tools",
      portfolio: "Portfolio tracking tools",
      reminders: "Important reminders",
    },
    verifyLabel: "What to verify",
    verifyItems:
      "fees, supported markets, currency conversion, tax treatment, availability, risks, and terms",
    learnMore: "Learn more",
    toolDescriptions: {
      "Interactive Brokers":
        "A global brokerage platform that some investors research for access to multiple markets.",
      Moomoo:
        "A brokerage platform available in selected markets that users may compare for market access and account features.",
      Wise: "A currency exchange and money transfer service that users may compare for supported currencies and transfer costs.",
      Instarem:
        "A money transfer service that users may review for exchange rates, fees, and destination availability.",
      MoneyMatch:
        "A currency exchange and transfer service that users may evaluate for supported corridors and terms.",
    },
    portfolioBody:
      "Portfolio tracking tools can help users record assumptions, review allocation, and compare results with brokerage statements. Users should still verify official account records and tax documents.",
    reminders: [
      "This page is educational only and does not recommend any broker, ETF, product, or service.",
      "Official fees, supported markets, currency conversion rates, promotions, and terms can change.",
      "Verify important information directly with the official provider before using any service.",
      "DCA Backtest does not provide financial advice, investment advice, tax advice, or legal advice.",
    ],
    linksTitle: "Related pages",
    links: {
      affiliate: "Affiliate Disclosure",
      disclaimer: "Disclaimer",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      dca: "DCA Calculator",
      comparison: "ETF Comparison Calculator",
      malaysiaCspx: "Malaysia CSPX guide",
      malaysiaVoo: "Malaysia VOO guide",
    },
  },
  "zh-CN": {
    title: "推荐工具",
    eyebrow: "教育资源",
    description:
      "了解真实投资前常见需要比较的工具，包括券商平台、货币兑换/转账工具，以及投资组合记录工具。",
    seoTitle: "推荐工具｜DCA Backtest",
    seoDescription:
      "了解投资前可研究的券商平台、换汇转账工具和投资组合记录工具。仅供教育用途。",
    disclosure:
      "部分链接未来可能会成为 affiliate / referral link。我们可能获得佣金或推荐奖励，但不会额外增加你的费用，也不会影响内容的教育性质。",
    sections: {
      brokerage: "券商平台",
      transfer: "货币兑换 / 转账工具",
      portfolio: "投资组合记录工具",
      reminders: "重要提醒",
    },
    verifyLabel: "需要核实",
    verifyItems: "费用、支持市场、货币兑换、税务处理、可用性、风险和条款",
    learnMore: "查看更多",
    toolDescriptions: {
      "Interactive Brokers":
        "一个全球券商平台，部分投资者会研究其多市场交易支持和账户功能。",
      Moomoo: "一个在部分市场提供服务的券商平台，用户可比较其市场覆盖、账户功能和费用结构。",
      Wise: "一个货币兑换和转账工具，用户可比较其支持币种、转账费用和汇率。",
      Instarem: "一个转账服务，用户可查看其汇率、费用、到账地区和使用条款。",
      MoneyMatch: "一个货币兑换和转账服务，用户可评估其支持通道、费用和服务限制。",
    },
    portfolioBody:
      "投资组合记录工具可以帮助用户记录假设、查看资产配置，并与券商账单进行比较。用户仍应以官方账户记录和税务文件为准。",
    reminders: [
      "本页面仅供教育用途，不推荐任何券商、ETF、产品或服务。",
      "官方费用、支持市场、汇率、活动和条款可能会变化。",
      "使用任何服务前，请直接在官方提供方网站核实重要信息。",
      "DCA Backtest 不提供金融建议、投资建议、税务建议或法律建议。",
    ],
    linksTitle: "相关页面",
    links: {
      affiliate: "推荐链接说明",
      disclaimer: "免责声明",
      terms: "使用条款",
      privacy: "隐私政策",
      dca: "DCA 定投计算器",
      comparison: "ETF 对比工具",
      malaysiaCspx: "马来西亚怎么买 CSPX",
      malaysiaVoo: "马来西亚怎么买 VOO",
    },
  },
  "zh-TW": {
    title: "推薦工具",
    eyebrow: "教育資源",
    description:
      "了解真實投資前常見需要比較的工具，包括券商平台、貨幣兌換/轉帳工具，以及投資組合記錄工具。",
    seoTitle: "推薦工具｜DCA Backtest",
    seoDescription:
      "了解投資前可研究的券商平台、換匯轉帳工具和投資組合記錄工具。僅供教育用途。",
    disclosure:
      "部分連結未來可能會成為 affiliate / referral link。我們可能獲得佣金或推薦獎勵，但不會額外增加你的費用，也不會影響內容的教育性質。",
    sections: {
      brokerage: "券商平台",
      transfer: "貨幣兌換 / 轉帳工具",
      portfolio: "投資組合記錄工具",
      reminders: "重要提醒",
    },
    verifyLabel: "需要核實",
    verifyItems: "費用、支援市場、貨幣兌換、稅務處理、可用性、風險和條款",
    learnMore: "查看更多",
    toolDescriptions: {
      "Interactive Brokers":
        "一個全球券商平台，部分投資者會研究其多市場交易支援和帳戶功能。",
      Moomoo: "一個在部分市場提供服務的券商平台，使用者可比較其市場覆蓋、帳戶功能和費用結構。",
      Wise: "一個貨幣兌換和轉帳工具，使用者可比較其支援幣種、轉帳費用和匯率。",
      Instarem: "一個轉帳服務，使用者可查看其匯率、費用、到帳地區和使用條款。",
      MoneyMatch: "一個貨幣兌換和轉帳服務，使用者可評估其支援通道、費用和服務限制。",
    },
    portfolioBody:
      "投資組合記錄工具可以協助使用者記錄假設、查看資產配置，並與券商帳單進行比較。使用者仍應以官方帳戶記錄和稅務文件為準。",
    reminders: [
      "本頁面僅供教育用途，不推薦任何券商、ETF、產品或服務。",
      "官方費用、支援市場、匯率、活動和條款可能會變更。",
      "使用任何服務前，請直接在官方提供方網站核實重要資訊。",
      "DCA Backtest 不提供金融建議、投資建議、稅務建議或法律建議。",
    ],
    linksTitle: "相關頁面",
    links: {
      affiliate: "推薦連結說明",
      disclaimer: "免責聲明",
      terms: "使用條款",
      privacy: "隱私權政策",
      dca: "DCA 定期定額計算機",
      comparison: "ETF 對比工具",
      malaysiaCspx: "馬來西亞 CSPX 指南",
      malaysiaVoo: "馬來西亞 VOO 指南",
    },
  },
  ms: {
    title: "Alat Disyorkan",
    eyebrow: "Sumber pendidikan",
    description:
      "Ketahui alat biasa yang mungkin dibandingkan sebelum melabur, termasuk platform broker, alat tukaran mata wang, dan alat penjejakan portfolio.",
    seoTitle: "Alat Disyorkan | DCA Backtest",
    seoDescription:
      "Ketahui platform broker, alat pemindahan wang, dan alat penjejakan portfolio untuk dikaji sebelum melabur. Untuk pendidikan sahaja.",
    disclosure:
      "Sesetengah pautan mungkin menjadi pautan affiliate atau rujukan pada masa depan. Kami mungkin menerima komisen atau ganjaran rujukan tanpa kos tambahan kepada anda. Ini tidak mengubah sifat pendidikan kandungan kami.",
    sections: {
      brokerage: "Platform broker",
      transfer: "Alat tukaran mata wang / pemindahan",
      portfolio: "Alat penjejakan portfolio",
      reminders: "Peringatan penting",
    },
    verifyLabel: "Perkara untuk disahkan",
    verifyItems:
      "yuran, pasaran disokong, tukaran mata wang, layanan cukai, ketersediaan, risiko, dan terma",
    learnMore: "Ketahui lebih lanjut",
    toolDescriptions: {
      "Interactive Brokers":
        "Platform broker global yang dikaji oleh sesetengah pelabur untuk akses kepada pelbagai pasaran.",
      Moomoo:
        "Platform broker yang tersedia di pasaran terpilih dan boleh dibandingkan dari segi akses pasaran serta ciri akaun.",
      Wise:
        "Perkhidmatan tukaran mata wang dan pemindahan wang yang boleh dibandingkan dari segi mata wang disokong dan kos pemindahan.",
      Instarem:
        "Perkhidmatan pemindahan wang yang boleh disemak dari segi kadar tukaran, yuran, dan destinasi tersedia.",
      MoneyMatch:
        "Perkhidmatan tukaran mata wang dan pemindahan yang boleh dinilai dari segi laluan disokong dan terma.",
    },
    portfolioBody:
      "Alat penjejakan portfolio boleh membantu pengguna merekod andaian, menyemak peruntukan, dan membandingkan keputusan dengan penyata broker. Rekod akaun rasmi dan dokumen cukai tetap perlu disahkan.",
    reminders: [
      "Halaman ini untuk pendidikan sahaja dan tidak mengesyorkan mana-mana broker, ETF, produk, atau perkhidmatan.",
      "Yuran rasmi, pasaran disokong, kadar tukaran mata wang, promosi, dan terma boleh berubah.",
      "Sahkan maklumat penting secara terus di laman rasmi penyedia sebelum menggunakan sebarang perkhidmatan.",
      "DCA Backtest tidak menyediakan nasihat kewangan, pelaburan, cukai, atau undang-undang.",
    ],
    linksTitle: "Halaman berkaitan",
    links: {
      affiliate: "Pendedahan Affiliate",
      disclaimer: "Penafian",
      terms: "Terma Penggunaan",
      privacy: "Dasar Privasi",
      dca: "Kalkulator DCA",
      comparison: "Kalkulator Perbandingan ETF",
      malaysiaCspx: "Panduan CSPX Malaysia",
      malaysiaVoo: "Panduan VOO Malaysia",
    },
  },
  id: {
    title: "Alat Rekomendasi",
    eyebrow: "Sumber edukasi",
    description:
      "Pelajari alat umum yang mungkin dibandingkan sebelum berinvestasi, termasuk platform broker, alat penukaran mata uang, dan alat pelacak portofolio.",
    seoTitle: "Alat Rekomendasi | DCA Backtest",
    seoDescription:
      "Pelajari platform broker, alat transfer uang, dan alat pelacak portofolio untuk diteliti sebelum berinvestasi. Hanya untuk edukasi.",
    disclosure:
      "Beberapa tautan dapat menjadi tautan afiliasi atau referral di masa depan. Kami dapat memperoleh komisi atau hadiah referral tanpa biaya tambahan bagi Anda. Hal ini tidak memengaruhi sifat edukatif konten kami.",
    sections: {
      brokerage: "Platform broker",
      transfer: "Alat penukaran mata uang / transfer",
      portfolio: "Alat pelacak portofolio",
      reminders: "Pengingat penting",
    },
    verifyLabel: "Yang perlu diverifikasi",
    verifyItems:
      "biaya, pasar yang didukung, konversi mata uang, perlakuan pajak, ketersediaan, risiko, dan ketentuan",
    learnMore: "Pelajari lebih lanjut",
    toolDescriptions: {
      "Interactive Brokers":
        "Platform broker global yang sering diteliti sebagian investor untuk akses ke berbagai pasar.",
      Moomoo:
        "Platform broker yang tersedia di pasar tertentu dan dapat dibandingkan dari sisi akses pasar serta fitur akun.",
      Wise:
        "Layanan penukaran mata uang dan transfer uang yang dapat dibandingkan dari sisi mata uang yang didukung dan biaya transfer.",
      Instarem:
        "Layanan transfer uang yang dapat ditinjau dari sisi kurs, biaya, dan tujuan yang tersedia.",
      MoneyMatch:
        "Layanan penukaran mata uang dan transfer yang dapat dievaluasi berdasarkan koridor yang didukung dan ketentuan layanan.",
    },
    portfolioBody:
      "Alat pelacak portofolio dapat membantu pengguna mencatat asumsi, meninjau alokasi, dan membandingkan hasil dengan laporan broker. Pengguna tetap perlu memverifikasi catatan akun resmi dan dokumen pajak.",
    reminders: [
      "Halaman ini hanya untuk edukasi dan tidak merekomendasikan broker, ETF, produk, atau layanan tertentu.",
      "Biaya resmi, pasar yang didukung, kurs, promosi, dan ketentuan dapat berubah.",
      "Verifikasi informasi penting langsung di situs resmi penyedia sebelum menggunakan layanan apa pun.",
      "DCA Backtest tidak memberikan nasihat keuangan, investasi, pajak, atau hukum.",
    ],
    linksTitle: "Halaman terkait",
    links: {
      affiliate: "Pengungkapan Afiliasi",
      disclaimer: "Disclaimer",
      terms: "Ketentuan Penggunaan",
      privacy: "Kebijakan Privasi",
      dca: "Kalkulator DCA",
      comparison: "Kalkulator Perbandingan ETF",
      malaysiaCspx: "Panduan CSPX Malaysia",
      malaysiaVoo: "Panduan VOO Malaysia",
    },
  },
};

const fallbackCopy = copy.en;

function getCopy(locale: Locale) {
  return copy[locale] ?? fallbackCopy;
}

function getCategoryTools(category: ToolCard["category"]) {
  return tools.filter((tool) => tool.category === category);
}

export function generateStaticParams() {
  return publicLocaleCodes.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isPublicLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const page = getCopy(typedLocale);
  const canonicalPath = `/${typedLocale}/recommended-tools`;

  return {
    metadataBase: new URL(productionBaseUrl),
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: alternateLanguages("/recommended-tools"),
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: absoluteUrl(canonicalPath),
      siteName: "DCA Backtest",
      type: "article",
      locale: typedLocale,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.seoDescription,
      images: [
        {
          url: "/og-image.png",
          alt: socialImageAlt,
        },
      ],
    },
  };
}

export default async function RecommendedToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isPublicLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const page = getCopy(typedLocale);
  const internalLinks = [
    {
      href: `/${typedLocale}/affiliate-disclosure`,
      label: page.links.affiliate,
    },
    { href: `/${typedLocale}/disclaimer`, label: page.links.disclaimer },
    { href: `/${typedLocale}/terms`, label: page.links.terms },
    { href: `/${typedLocale}/privacy`, label: page.links.privacy },
    { href: `/${typedLocale}/dca-calculator`, label: page.links.dca },
    {
      href: `/${typedLocale}/etf-comparison-calculator`,
      label: page.links.comparison,
    },
    ...(typedLocale === "zh-CN"
      ? [
          {
            href: "/zh-CN/how-to-buy-cspx-from-malaysia",
            label: page.links.malaysiaCspx,
          },
          {
            href: "/zh-CN/how-to-invest-in-voo-from-malaysia",
            label: page.links.malaysiaVoo,
          },
        ]
      : []),
  ];

  const renderToolCards = (category: ToolCard["category"]) => (
    <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {getCategoryTools(category).map((tool) => (
        <article
          key={tool.name}
          className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-xl shadow-black/20"
        >
          <h3 className="break-words text-lg font-bold text-white">
            {tool.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">
            {page.toolDescriptions[tool.name]}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
            {page.verifyLabel}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {page.verifyItems}
          </p>
          <Link
            href={`/${typedLocale}/affiliate-disclosure`}
            className="mt-4 inline-flex w-full justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:border-cyan-300/60 hover:text-white sm:w-fit"
          >
            {page.learnMore}
          </Link>
        </article>
      ))}
    </div>
  );

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "DCA Backtest", url: absoluteUrl(`/${typedLocale}`) },
    { name: page.title, url: absoluteUrl(`/${typedLocale}/recommended-tools`) },
  ]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <div className="w-full max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {page.eyebrow}
          </p>
          <h1 className="min-w-0 break-words text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
            {page.description}
          </p>
        </div>

        <aside className="mt-6 w-full rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4 text-sm leading-7 text-amber-50/85 sm:mt-8 sm:rounded-3xl sm:p-5">
          {page.disclosure}
        </aside>

        <section className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/30 sm:rounded-3xl sm:p-6">
          <h2 className="text-2xl font-bold text-white">
            {page.sections.brokerage}
          </h2>
          {renderToolCards("brokerage")}
        </section>

        <section className="mt-5 w-full rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/30 sm:rounded-3xl sm:p-6">
          <h2 className="text-2xl font-bold text-white">
            {page.sections.transfer}
          </h2>
          {renderToolCards("transfer")}
        </section>

        <section className="mt-5 w-full rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/30 sm:rounded-3xl sm:p-6">
          <h2 className="text-2xl font-bold text-white">
            {page.sections.portfolio}
          </h2>
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-7 text-slate-300">
            <p>{page.portfolioBody}</p>
          </div>
        </section>

        <section
          id="important-reminders"
          className="mt-5 w-full rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06] p-4 sm:rounded-3xl sm:p-6"
        >
          <h2 className="text-2xl font-bold text-cyan-50">
            {page.sections.reminders}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-cyan-50/80">
            {page.reminders.map((item) => (
              <li key={item} className="min-w-0 break-words">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <nav
          aria-label={page.linksTitle}
          className="mt-6 flex w-full flex-wrap gap-2.5 text-sm sm:mt-8 sm:gap-3"
        >
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:border-cyan-300/50 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
