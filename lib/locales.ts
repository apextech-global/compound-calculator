export const languageCodes = [
  "en",
  "zh-CN",
  "zh-TW",
  "ms",
  "id",
  "ja",
  "ko",
  "ru",
  "fr",
  "it",
  "es",
  "ar",
  "de",
  "ta",
] as const;

export type LocaleCode = (typeof languageCodes)[number];

/**
 * Locales that are actively publicized: included in the sitemap, hreflang
 * alternates, the language switcher, and footer navigation. A locale can
 * exist in `languageCodes` / `routing.locales` (routable) without being
 * here yet — that's how a locale's translations are soft-launched before
 * being exposed publicly. `ja` is intentionally excluded: it is missing
 * `legal["affiliate-disclosure"]` translations (see agent_memory/bugs.md),
 * so it stays routable but unpublicized until that content is complete.
 */
export const publicLocaleCodes = [
  "en",
  "zh-CN",
  "zh-TW",
  "ms",
  "id",
  "ko",
] as const satisfies readonly LocaleCode[];

export type PublicLocaleCode = (typeof publicLocaleCodes)[number];

/**
 * The single guard for "is this locale allowed to render a public page."
 * Every route under app/[locale] must notFound() when this is false —
 * routing.locales staying broader than this is what lets a locale's
 * translations exist and be routable without being publicly indexable.
 */
export function isPublicLocale(locale: string): locale is PublicLocaleCode {
  return (publicLocaleCodes as readonly string[]).includes(locale);
}

/**
 * Locales with authored `/learn` hub content. Kept separate from
 * `publicLocaleCodes` because content coverage and public-locale rollout
 * don't move in lockstep — e.g. `ja` has a complete learn hub but isn't a
 * public locale yet, while `id` is public but has no learn hub yet.
 */
export const learnContentLocales = [
  "en",
  "zh-CN",
  "zh-TW",
  "ms",
  "ja",
] as const satisfies readonly LocaleCode[];

export type LearnContentLocale = (typeof learnContentLocales)[number];

/**
 * The only locales the `/learn` hub should actually be linked from or
 * appear in the sitemap for: public AND has content.
 */
export const publicLearnLocales = publicLocaleCodes.filter((locale) =>
  (learnContentLocales as readonly string[]).includes(locale)
) as PublicLocaleCode[];

export function getTextDirection(locale: string) {
  return locale === "ar" ? "rtl" : "ltr";
}
