import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { isPublicLocale } from "@/lib/locales";

type StaticPageKey =
  | "about"
  | "privacy"
  | "terms"
  | "contact"
  | "disclaimer"
  | "affiliate-disclosure";

const legalLinks: StaticPageKey[] = [
  "about",
  "privacy",
  "terms",
  "disclaimer",
  "affiliate-disclosure",
  "contact",
];

type LegalSection = {
  title: string;
  body: string;
};

export default async function StaticContentPage({
  pageKey,
}: {
  pageKey: StaticPageKey;
}) {
  const locale = await getLocale();

  if (!isPublicLocale(locale)) {
    notFound();
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  if (!messages.legal?.[pageKey]) {
    notFound();
  }

  const availableLegalLinks = legalLinks.filter(
    (link) => link !== "affiliate-disclosure" || Boolean(messages.legal?.[link])
  );
  const t = await getTranslations(`legal.${pageKey}`);
  const common = await getTranslations("legal.common");
  const footer = await getTranslations("footer");
  const sections = t.raw("sections") as LegalSection[];
  const showLastUpdated = pageKey === "privacy" || pageKey === "terms";

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      <section className="relative mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          {t("eyebrow")}
        </p>
        <h1 className="min-w-0 break-words text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
        {showLastUpdated ? (
          <p className="mt-4 text-sm font-medium text-slate-400">
            {common("lastUpdated")}: {t("lastUpdated")}
          </p>
        ) : null}

        <div className="mt-6 w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 sm:mt-8 sm:rounded-3xl sm:p-6 md:p-8">
          <div className="min-w-0 space-y-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            {sections.map((section) => (
              <section key={section.title} className="min-w-0">
                <h2 className="break-words text-lg font-semibold text-white sm:text-xl">
                  {section.title}
                </h2>
                <p className="mt-2 break-words">{section.body}</p>
              </section>
            ))}

            {pageKey === "contact" ? (
              <p>
                <span className="font-semibold text-white">
                  {t("emailLabel")}
                </span>{" "}
                <a
                  href="mailto:support@dcabacktest.com"
                  className="break-all font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  support@dcabacktest.com
                </a>
              </p>
            ) : null}
          </div>
        </div>

        <nav className="mt-6 flex w-full flex-wrap gap-3 text-sm font-semibold text-slate-300">
          <span className="text-slate-500">{common("linksTitle")}</span>
          {availableLegalLinks.map((link) => (
            <Link
              key={link}
              href={`/${locale}/${link}`}
              className={`transition hover:text-cyan-300 ${
                link === pageKey ? "text-cyan-300" : ""
              }`}
            >
              {link === "disclaimer"
                ? common("disclaimer")
                : link === "affiliate-disclosure"
                  ? footer("affiliateDisclosure")
                  : footer(link)}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
