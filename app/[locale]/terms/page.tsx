import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { htmlLang, routing, type Locale } from "@/i18n/routing";
import LegalShell from "@/components/LegalShell";

function localizedPath(locale: Locale, path: string): string {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata.terms" });

  const canonical = localizedPath(locale, "/terms");
  const languages: Record<string, string> = { "x-default": "/terms" };
  for (const l of routing.locales) {
    languages[htmlLang[l]] = localizedPath(l, "/terms");
  }
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical, languages },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Terms" });
  const s = (key: string) => t(`sections.${key}.body` as never);
  const heading = (key: string) => t(`sections.${key}.heading` as never);

  const useItems = t.raw("sections.useOfSite.items") as string[];

  return (
    <LegalShell
      section={t("section")}
      marker={t("marker")}
      meta={t("meta")}
      title={
        <>
          {t("titleStart")}{" "}
          <span className="text-nordic">{t("titleAccent")}</span>
        </>
      }
    >
      <h2>{heading("acceptance")}</h2>
      <p>{s("acceptance")}</p>

      <h2>{heading("forumServices")}</h2>
      <p>{s("forumServices")}</p>

      <h2>{heading("useOfSite")}</h2>
      <ul>
        {useItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{heading("ip")}</h2>
      <p>{s("ip")}</p>

      <h2>{heading("confidentiality")}</h2>
      <p>{s("confidentiality")}</p>

      <h2>{heading("noWarranty")}</h2>
      <p>{s("noWarranty")}</p>

      <h2>{heading("liability")}</h2>
      <p>{s("liability")}</p>

      <h2>{heading("governingLaw")}</h2>
      <p>{s("governingLaw")}</p>
    </LegalShell>
  );
}
