import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { instruments } from "@/lib/instruments";
import { seoPageSlugs } from "@/lib/seoLandingPages";
import {
  absoluteUrl,
  contentPageSlugs,
  staticPageSlugs,
} from "@/lib/seoMetadata";
import {
  getMarketDataLastUpdatedDate,
  getMarketDataStatus,
} from "@/lib/marketDataStatus";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Internal Site Health | DCA Backtest",
  description: "Internal site health dashboard for DCA Backtest.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

const domain = "dcabacktest.com";
const publicMarketDataDir = path.join(process.cwd(), "public", "market-data");
const importantLinks = [
  { label: "Homepage", href: "/en" },
  { label: "DCA calculator", href: "/en/dca-calculator" },
  {
    label: "Compound calculator",
    href: "/en/compound-interest-calculator",
  },
  {
    label: "ETF comparison calculator",
    href: "/en/etf-comparison-calculator",
  },
  { label: "Supported assets", href: "/en/supported-assets" },
  { label: "Disclaimer", href: "/en/disclaimer" },
  { label: "Privacy", href: "/en/privacy" },
  { label: "Terms", href: "/en/terms" },
  { label: "Contact", href: "/en/contact" },
];

function getHistoricalDataKeys() {
  try {
    return new Set(
      fs
        .readdirSync(publicMarketDataDir)
        .filter((file) => file.toLowerCase().endsWith(".csv"))
        .map((file) => file.replace(/\.csv$/i, ""))
    );
  } catch {
    return new Set<string>();
  }
}

function StatusPill({
  tone,
  children,
}: {
  tone: "good" | "neutral" | "warn";
  children: React.ReactNode;
}) {
  const styles = {
    good: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
    neutral: "border-slate-300/20 bg-white/[0.06] text-slate-300",
    warn: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function HealthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/20 sm:rounded-3xl sm:p-6">
      <h2 className="break-words text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 min-w-0 space-y-3 text-sm leading-6 text-slate-300">
        {children}
      </div>
    </section>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1 border-b border-white/10 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="min-w-0 break-words font-semibold text-white sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default function HealthPage() {
  const historicalDataKeys = getHistoricalDataKeys();
  const now = new Date();
  const gaConfigured = Boolean(process.env.NEXT_PUBLIC_GA_ID);
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adsenseConfigured = Boolean(adsenseClient);
  const importantSeoPageCount =
    seoPageSlugs.length + contentPageSlugs.length + staticPageSlugs.length;
  const marketRows = instruments.map((instrument) => {
    const hasHistoricalData = historicalDataKeys.has(instrument.dataKey);
    const status = getMarketDataStatus(instrument.dataKey);

    return {
      instrument,
      hasHistoricalData,
      status,
      lastUpdated: getMarketDataLastUpdatedDate(instrument.dataKey),
    };
  });
  const sampleOnlyRows = marketRows.filter((row) => !row.hasHistoricalData);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <section className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <div className="mb-8 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Internal dashboard
          </p>
          <h1 className="break-words text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            Site Health
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Manual owner-only overview for deployment readiness, SEO coverage,
            analytics setup, AdSense setup, sitemap health, and market data
            coverage.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <HealthCard title="Website status">
            <DetailRow label="Site name" value="DCA Backtest" />
            <DetailRow label="Domain" value={domain} />
            <DetailRow
              label="Build environment"
              value={
                process.env.VERCEL_ENV ??
                process.env.NODE_ENV ??
                "Not available"
              }
            />
            <DetailRow
              label="Current date/time"
              value={now.toISOString().replace("T", " ").slice(0, 19)}
            />
          </HealthCard>

          <HealthCard title="SEO status">
            <DetailRow
              label="Sitemap URL"
              value={
                <Link className="text-cyan-200 hover:text-cyan-100" href="/sitemap.xml">
                  /sitemap.xml
                </Link>
              }
            />
            <DetailRow
              label="Robots URL"
              value={
                <Link className="text-cyan-200 hover:text-cyan-100" href="/robots.txt">
                  /robots.txt
                </Link>
              }
            />
            <DetailRow label="Supported locales" value={routing.locales.length} />
            <DetailRow
              label="Important SEO pages configured"
              value={importantSeoPageCount}
            />
            <DetailRow
              label="Canonical / hreflang checks"
              value={<StatusPill tone="good">Covered by npm run check-site</StatusPill>}
            />
          </HealthCard>

          <HealthCard title="Analytics status">
            <DetailRow
              label="Google Analytics"
              value={
                <StatusPill tone={gaConfigured ? "good" : "neutral"}>
                  {gaConfigured ? "Configured" : "Not configured"}
                </StatusPill>
              }
            />
            <p className="text-slate-400">
              Measurement ID values are intentionally not displayed on this
              internal page.
            </p>
          </HealthCard>

          <HealthCard title="AdSense status">
            <DetailRow
              label="Google AdSense"
              value={
                <StatusPill tone={adsenseConfigured ? "good" : "neutral"}>
                  {adsenseConfigured ? "Configured" : "Not configured"}
                </StatusPill>
              }
            />
            <DetailRow
              label="Publisher client"
              value={adsenseClient ? adsenseClient : "Not configured"}
            />
            <DetailRow
              label="ads.txt"
              value={
                <Link className="text-cyan-200 hover:text-cyan-100" href="/ads.txt">
                  /ads.txt
                </Link>
              }
            />
          </HealthCard>
        </div>

        <section className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/20 sm:rounded-3xl sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Market data status
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {historicalDataKeys.size} historical CSV files detected in{" "}
                <code>public/market-data</code>. {sampleOnlyRows.length} assets
                currently use sample-data fallback.
              </p>
            </div>
            <StatusPill tone={historicalDataKeys.size > 0 ? "good" : "warn"}>
              {historicalDataKeys.size > 0
                ? "Historical data detected"
                : "No historical CSV files"}
            </StatusPill>
          </div>

          <div className="mt-5 grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {marketRows.map(({ instrument, hasHistoricalData, status, lastUpdated }) => (
              <article
                key={instrument.id}
                className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words font-bold text-white">
                      {instrument.displaySymbol}
                    </p>
                    <p className="mt-1 break-words text-sm text-slate-400">
                      {instrument.name}
                    </p>
                  </div>
                  <StatusPill tone={hasHistoricalData ? "good" : "neutral"}>
                    {hasHistoricalData ? "Historical" : "Sample only"}
                  </StatusPill>
                </div>
                <dl className="mt-4 space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">dataKey</dt>
                    <dd className="break-words text-right">{instrument.dataKey}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Market</dt>
                    <dd className="break-words text-right">{instrument.country}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Currency</dt>
                    <dd>{instrument.currency}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Last updated</dt>
                    <dd>{lastUpdated ?? "Not available"}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Fetch status</dt>
                    <dd>{status?.status ?? "No status file entry"}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/20 sm:rounded-3xl sm:p-6">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Important links
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5 text-sm">
            {importantLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:border-cyan-300/50 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Production base URL: {absoluteUrl("/")}
          </p>
        </section>
      </section>
    </main>
  );
}
