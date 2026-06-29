import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
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
  ],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
