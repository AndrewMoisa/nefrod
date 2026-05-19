import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function About() {
  const t = useTranslations("About");
  return (
    <section id="about" className="bg-white py-[60px] md:py-[84px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        {/* hard top rule + mono meta strip */}
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            {t("marker")} <span className="text-nordic">/</span> {t("section")}
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            {t("meta")}
          </span>
        </div>

        {/* editorial split */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12 md:gap-16">
          <Reveal
            as="h2"
            index={0}
            className="md:col-span-8 text-[clamp(2.6rem,5.6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.038em]"
          >
            {t("titleStart")}{" "}
            <span className="text-nordic">{t("titleAccent")}</span>
          </Reveal>

          <Reveal as="div" index={1} className="md:col-span-4 md:pt-3">
            <p className="max-w-[360px] text-[1.02rem] leading-[1.66] text-slate">
              {t("body")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
