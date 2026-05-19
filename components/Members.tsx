import { useTranslations } from "next-intl";
import Button from "./Button";
import Reveal from "./Reveal";

const benefitKeys = [
  "partners",
  "capital",
  "corridor",
  "visibility",
  "sessions",
  "advisory",
] as const;

export default function Members() {
  const t = useTranslations("Members");

  return (
    <section id="members" className="bg-paper py-[60px] md:py-[84px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        {/* Editorial header */}
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            {t("marker")} <span className="text-nordic">/</span> {t("section")}
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            {t("meta")}
          </span>
        </div>

        {/* Headline */}
        <Reveal
          as="h2"
          index={0}
          className="mb-12 mt-14 max-w-[920px] text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.035em] md:mb-16 md:mt-20"
        >
          {t("titleStart")}{" "}
          <span className="text-nordic">{t("titleAccent")}</span>
        </Reveal>

        {/* Benefits — 3 x 2 editorial grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 border-t border-hairline pt-10 md:grid-cols-3 md:gap-y-12 md:pt-12">
          {benefitKeys.map((key, i) => {
            const num = `0${i + 1}`;
            return (
              <Reveal as="article" key={key} index={i}>
                <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-slate">
                  {num}
                </span>
                <h3 className="mt-2.5 text-[1.15rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                  {t(`benefits.${key}.title`)}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-[1.58] text-slate">
                  {t(`benefits.${key}.body`)}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Eligibility + CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-hairline pt-8 md:mt-16 md:flex-row md:items-center md:gap-10 md:pt-10">
          <Reveal
            as="p"
            index={0}
            className="max-w-[560px] text-[0.92rem] leading-[1.55] text-slate"
          >
            {t("eligibility")}
          </Reveal>
          <Reveal as="div" index={1} className="shrink-0">
            <Button href="#contact" variant="solid" arrow="right">
              {t("cta")}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
