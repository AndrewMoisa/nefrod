import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function Services() {
  const t = useTranslations("Services");
  return (
    <section id="services" className="bg-paper py-[60px] md:py-[84px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        {/* far-left editorial header — eyebrow + title only, no description */}
        <div className="mb-14 flex items-baseline justify-between border-t border-navy pt-6 md:mb-20">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            {t("marker")} <span className="text-nordic">/</span> {t("section")}
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            {t("meta")}
          </span>
        </div>

        <Reveal
          as="h2"
          index={0}
          className="mb-16 max-w-[820px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mb-24"
        >
          {t("titleStart")}{" "}
          <span className="text-nordic">{t("titleAccent")}</span>
        </Reveal>

        {/* bento grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-[minmax(280px,1fr)_minmax(280px,1fr)] md:gap-4">
          {/* feature block — 2x2 — Networking & Workshops */}
          <Reveal
            as="article"
            index={0}
            className="group relative overflow-hidden rounded-[6px] border border-navyline bg-[radial-gradient(120%_90%_at_85%_15%,#1a3656_0%,#102234_45%,#0b1722_100%)] text-white md:col-span-2 md:row-span-2"
          >
            {/* atmospheric backdrop: hairline coordinate grid + single bridge arc */}
            <svg
              viewBox="0 0 600 500"
              fill="none"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full opacity-80 transition-opacity duration-[600ms] ease-expo group-hover:opacity-100"
            >
              <defs>
                <radialGradient id="featureGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#ba0c2f" stopOpacity="0.55" />
                  <stop offset="55%" stopColor="#ba0c2f" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ba0c2f" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="featureArc" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="35%" stopColor="#ffffff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ba0c2f" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* horizontal hairlines — latitudes */}
              {[80, 160, 240, 320, 400].map((y) => (
                <line
                  key={`h-${y}`}
                  x1="0"
                  y1={y}
                  x2="600"
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}
              {/* vertical hairlines — longitudes */}
              {[100, 200, 300, 400, 500].map((x) => (
                <line
                  key={`v-${x}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="500"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* the bridge — single confident arc from Norway corner to far east */}
              <path
                d="M 60 420 Q 280 60 540 110"
                stroke="url(#featureArc)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />

              {/* far endpoint — Nordic red glow */}
              <circle cx="540" cy="110" r="80" fill="url(#featureGlow)" />
              <circle cx="540" cy="110" r="3.5" fill="#ba0c2f" />
              <circle
                cx="540"
                cy="110"
                r="10"
                className="hub-ring"
                stroke="rgba(186,12,47,0.55)"
                strokeWidth="1"
                fill="none"
              />

              {/* origin — Norway, white pinpoint */}
              <circle cx="60" cy="420" r="3" fill="#ffffff" />
              <circle
                cx="60"
                cy="420"
                r="9"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
              />

              {/* corner coordinate marks — top-left register */}
              <line x1="32" y1="44" x2="58" y2="44" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              <line x1="32" y1="44" x2="32" y2="70" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            </svg>

            {/* corner coordinate label */}
            <div className="pointer-events-none absolute right-8 top-8 z-10 hidden font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/40 md:block">
              59°55′N · 010°45′E
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
              <div>
                <h3 className="max-w-[480px] text-[clamp(1.7rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                  {t("feature.title")}
                </h3>
                <p className="mt-5 max-w-[440px] text-[0.95rem] leading-[1.62] text-white/75">
                  {t("feature.body")}
                </p>
                <a
                  href="#contact"
                  aria-label={t("feature.ctaAria")}
                  className="mt-7 -mx-1 inline-flex items-center gap-2 px-1 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white"
                >
                  {t("feature.cta")}
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* secondary — Branding */}
          <Reveal
            as="article"
            index={1}
            className="group relative flex flex-col justify-between rounded-[6px] border border-hairline bg-white p-7 transition-[border-color,box-shadow,transform] duration-500 ease-expo hover:-translate-y-1 hover:border-navy/40 hover:shadow-[0_18px_42px_-14px_rgba(16,34,52,0.18)] md:p-9"
          >
            <div>
              <h3 className="text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                {t("branding.title")}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                {t("branding.body")}
              </p>
              <a
                href="#contact"
                aria-label={t("branding.ctaAria")}
                className="mt-5 -mx-1 inline-flex items-center gap-1.5 px-1 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors duration-300 ease-expo group-hover:text-navydeep"
              >
                {t("branding.cta")}
                <ArrowUpRight size={12} />
              </a>
            </div>
          </Reveal>

          {/* secondary — Digital & Cyber */}
          <Reveal
            as="article"
            index={2}
            className="group relative flex flex-col justify-between rounded-[6px] border border-hairline bg-white p-7 transition-[border-color,box-shadow,transform] duration-500 ease-expo hover:-translate-y-1 hover:border-navy/40 hover:shadow-[0_18px_42px_-14px_rgba(16,34,52,0.18)] md:p-9"
          >
            <div>
              <h3 className="text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                {t("digital.title")}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                {t("digital.body")}
              </p>
              <a
                href="#contact"
                aria-label={t("digital.ctaAria")}
                className="mt-5 -mx-1 inline-flex items-center gap-1.5 px-1 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors duration-300 ease-expo group-hover:text-navydeep"
              >
                {t("digital.cta")}
                <ArrowUpRight size={12} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* caption */}
        <Reveal
          as="p"
          index={3}
          className="mt-10 max-w-[520px] text-[0.92rem] leading-[1.6] text-slate"
        >
          {t("caption")}
        </Reveal>
      </div>
    </section>
  );
}
