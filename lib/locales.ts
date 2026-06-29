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

export function getTextDirection(locale: string) {
  return locale === "ar" ? "rtl" : "ltr";
}
