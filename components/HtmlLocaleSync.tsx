"use client";

import { useEffect } from "react";
import { getTextDirection } from "@/lib/locales";

export default function HtmlLocaleSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getTextDirection(locale);
  }, [locale]);

  return null;
}
