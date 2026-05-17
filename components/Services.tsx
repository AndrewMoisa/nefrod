import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

const sectors = [
  {
    title: "Shipping & logistics",
    body: "Maritime transport, port chains, freight and customs across the Nordic↔Eastern Europe↔China corridor.",
  },
  {
    title: "Energy, oil & gas",
    body: "Operations consulting and digital transformation for upstream and midstream operators.",
  },
  {
    title: "Carbon capture",
    body: "CCS project scoping, partner sourcing and service development.",
  },
  {
    title: "Industrial safety",
    body: "HSE, compliance and risk frameworks for industrial sites.",
  },
  {
    title: "NDT · inspection",
    body: "Non-destructive testing and structural integrity audits for energy and maritime assets.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-paper py-[60px] md:py-[84px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        {/* far-left editorial header — eyebrow + title only, no description */}
        <div className="mb-14 flex items-baseline justify-between border-t border-navy pt-6 md:mb-20">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            §03 <span className="text-nordic">/</span> Services
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            Capability &amp; practice
          </span>
        </div>

        <Reveal
          as="h2"
          index={0}
          className="mb-16 max-w-[820px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mb-24"
        >
          Capabilities,{" "}
          <span className="text-nordic">in-house.</span>
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

              {/* the bridge — single confident arc from Oslo corner to far east */}
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

              {/* origin — Oslo, white pinpoint */}
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
                  Networking, workshops &amp; the rooms where deals close.
                </h3>
                <p className="mt-5 max-w-[440px] text-[0.95rem] leading-[1.62] text-white/75">
                  Curated introductions, working sessions, platform promotion
                  and business consulting that turn contacts into commercial
                  outcomes — not LinkedIn followers.
                </p>
                <a
                  href="#contact"
                  className="mt-7 -mx-1 inline-flex items-center gap-2 px-1 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Scope a project
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
                Branding, marketing &amp; web.
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                Identity, communications strategy and digital presence built to
                read as credible across every market.
              </p>
              <a
                href="#contact"
                className="mt-5 -mx-1 inline-flex items-center gap-1.5 px-1 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors duration-300 ease-expo group-hover:text-navydeep"
              >
                Engage
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
                Digitalization &amp; cybersecurity.
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                Transformation, cybersecurity and digitalization for oil &amp;
                gas operations — resilient as you scale internationally.
              </p>
              <a
                href="#contact"
                className="mt-5 -mx-1 inline-flex items-center gap-1.5 px-1 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors duration-300 ease-expo group-hover:text-navydeep"
              >
                Engage
                <ArrowUpRight size={12} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* tier 2 — vertical practice */}
        <Reveal
          as="div"
          index={3}
          className="mt-16 flex items-baseline justify-between border-t border-hairline pt-10 md:mt-24 md:pt-14"
        >
          <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.18em] text-navy">
            Sectors <span className="text-nordic">/</span> where we go deep
          </span>
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slate md:inline">
            Vertical practice
          </span>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
          {sectors.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              index={4 + i}
              className="rounded-[6px] border border-hairline bg-white p-6 transition-[border-color,transform] duration-500 ease-expo hover:-translate-y-0.5 hover:border-navy/40"
            >
              <h3 className="text-[1.05rem] font-semibold leading-[1.2] tracking-[-0.015em] text-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.85rem] leading-[1.55] text-slate">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* caption ties both tiers */}
        <Reveal
          as="p"
          index={9}
          className="mt-12 max-w-[600px] text-[0.92rem] leading-[1.6] text-slate"
        >
          Horizontal capabilities and vertical practice — handled in-house,
          scoped per project.
        </Reveal>
      </div>
    </section>
  );
}
