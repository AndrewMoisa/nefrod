import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["no", "en"],
  defaultLocale: "no",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Maps next-intl locale ids to BCP 47 / OG locale tags used in HTML lang
// attributes, og:locale, hreflang, and Intl.DateTimeFormat.
export const htmlLang: Record<Locale, string> = {
  no: "nb",
  en: "en",
};

export const ogLocale: Record<Locale, string> = {
  no: "nb_NO",
  en: "en_GB",
};

export const intlLocale: Record<Locale, string> = {
  no: "nb-NO",
  en: "en-GB",
};
