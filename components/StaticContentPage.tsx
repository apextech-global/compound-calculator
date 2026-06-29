import { getTranslations } from "next-intl/server";

type StaticPageKey = "about" | "privacy" | "terms" | "contact";

const paragraphKeys: Record<StaticPageKey, string[]> = {
  about: ["p1", "p2", "p3"],
  privacy: ["p1", "p2", "p3"],
  terms: ["p1", "p2", "p3"],
  contact: ["p1", "p2"],
};

export default async function StaticContentPage({
  pageKey,
}: {
  pageKey: StaticPageKey;
}) {
  const t = await getTranslations(`legal.${pageKey}`);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_34%),radial-gradient(circle_at_80%_10%,_rgba(34,211,238,0.12),_transparent_28%)]" />

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          {t("eyebrow")}
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 md:p-8">
          <div className="space-y-5 text-base leading-8 text-slate-300">
            {paragraphKeys[pageKey].map((key) => (
              <p key={key}>{t(`paragraphs.${key}`)}</p>
            ))}

            {pageKey === "contact" ? (
              <p>
                <span className="font-semibold text-white">
                  {t("emailLabel")}
                </span>{" "}
                <a
                  href="mailto:support@dcabacktest.com"
                  className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  support@dcabacktest.com
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
