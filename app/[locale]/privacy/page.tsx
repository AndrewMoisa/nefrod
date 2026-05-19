import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
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
  const t = await getTranslations({ locale, namespace: "Metadata.privacy" });

  const canonical = localizedPath(locale, "/privacy");
  const languages: Record<string, string> = { "x-default": "/privacy" };
  for (const l of routing.locales) {
    languages[htmlLang[l]] = localizedPath(l, "/privacy");
  }
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical, languages },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Privacy" });
  const s = (key: string) => t(`sections.${key}.body` as never);
  const heading = (key: string) => t(`sections.${key}.heading` as never);

  const useItems = t.raw("sections.howWeUse.items") as string[];

  const contactFormLink = (chunks: React.ReactNode) => (
    <Link href="/#contact" className="underline">
      {chunks}
    </Link>
  );

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
      <h2>{heading("whoWeAre")}</h2>
      <p>{t.rich("sections.whoWeAre.body", { link: contactFormLink })}</p>

      <h2>{heading("whatWeCollect")}</h2>
      <p>{s("whatWeCollect")}</p>

      <h2>{heading("howWeUse")}</h2>
      <ul>
        {useItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>{heading("sharing")}</h2>
      <p>{s("sharing")}</p>

      <h2>{heading("retention")}</h2>
      <p>{s("retention")}</p>

      <h2>{heading("rights")}</h2>
      <p>{t.rich("sections.rights.body", { link: contactFormLink })}</p>

      <h2>{heading("cookies")}</h2>
      <p>{s("cookies")}</p>
    </LegalShell>
  );
}
