"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  useDark?: boolean;
};

function buildHref(locale: Locale, pathname: string): string {
  if (locale === routing.defaultLocale) {
    return pathname === "/" ? "/" : pathname;
  }
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

export default function LocaleSwitcher({ useDark = false }: Props) {
  const t = useTranslations("Common.languageSwitcher");
  const active = useLocale() as Locale;
  // next-intl strips the locale prefix from the returned pathname, so on /en
  // we get "/" and we re-add the prefix only for non-default locales below.
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`inline-flex items-center gap-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
        useDark ? "text-slate" : "text-white/80"
      }`}
    >
      {routing.locales.map((locale, i) => {
        const isActive = locale === active;
        const fullLabel = t(locale);
        const href = buildHref(locale, pathname);
        return (
          <span key={locale} className="contents">
            {i > 0 && (
              <span
                aria-hidden="true"
                className={useDark ? "text-hairline" : "text-white/30"}
              >
                /
              </span>
            )}
            <a
              href={href}
              hrefLang={locale === "no" ? "nb" : "en"}
              onClick={() => {
                // Persist the explicit choice so middleware's locale detection
                // (which also reads Accept-Language) doesn't bounce us back.
                document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
              }}
              aria-current={isActive ? "true" : undefined}
              aria-label={
                isActive
                  ? t("current", { language: fullLabel })
                  : t("switchTo", { language: fullLabel })
              }
              className={`px-1 py-0.5 transition-colors duration-300 ease-expo ${
                isActive
                  ? useDark
                    ? "text-navy"
                    : "text-white"
                  : useDark
                    ? "hover:text-navy"
                    : "hover:text-white"
              }`}
            >
              {locale.toUpperCase()}
            </a>
          </span>
        );
      })}
    </div>
  );
}
