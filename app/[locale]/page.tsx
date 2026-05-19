import About from "@/components/About";
import Audience from "@/components/Audience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Members from "@/components/Members";
import Services from "@/components/Services";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { intlLocale, routing } from "@/i18n/routing";

const SITE_URL = "https://nefrod.no";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "JsonLd" });

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Nordic Entrepreneur Forum Rød",
    alternateName: "NEFrød",
    legalName: "Nordic Entrepreneur Forum Rød",
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    taxID: "933 270 998",
    description: t("orgDescription"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sandnes",
      addressCountry: "NO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SITE_URL}/#contact`,
      areaServed: ["NO", "EU", "CN"],
      availableLanguage: ["en", "no"],
    },
    knowsAbout: [
      "International business expansion",
      "Norway to Eastern Europe trade",
      "Norway to China trade",
      "Maritime transport and logistics",
      "Oil and gas operations",
      "Carbon capture",
      "Non-destructive testing",
      "Industrial safety",
      "Digitalization",
      "Cybersecurity",
      "Branding",
      "Marketing",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Nordic Entrepreneur Forum Rød",
    description: t("websiteDescription"),
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: intlLocale[locale],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <main id="top" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Audience />
        <Services />
        <Members />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
