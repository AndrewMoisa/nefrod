import type { Metadata } from "next";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata.notFound");
  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <>
      <Header />
      <main id="top" tabIndex={-1} className="bg-white outline-none">
        <section className="mx-auto flex min-h-[100dvh] max-w-[1240px] flex-col justify-center px-6 pb-24 pt-[200px] md:px-10">
          <div className="flex items-baseline justify-between border-t border-navy pt-6">
            <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
              {t("marker")} <span className="text-nordic">/</span> {t("section")}
            </span>
            <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
              {t("meta")}
            </span>
          </div>

          <h1 className="mt-16 max-w-[920px] text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.038em] md:mt-24">
            {t("titleStart")}{" "}
            <span className="text-nordic">{t("titleAccent")}</span>
          </h1>

          <p className="mt-8 max-w-[460px] text-[1.02rem] leading-[1.66] text-slate">
            {t("body")}
          </p>

          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <Button href="/" arrow="right">
              {t("ctaHome")}
            </Button>
            <Button href="/#contact" variant="ghost">
              {t("ctaContact")}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
