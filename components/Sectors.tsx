import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

const sectors = [
  {
    title: "Shipping & logistics",
    body: "Maritime transport, port-to-port chains, freight and customs across the Nordic↔Eastern Europe↔China corridor.",
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

export default function Sectors() {
  return (
    <section id="sectors" className="bg-white py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            §04 <span className="text-nordic">/</span> Sectors
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            Specialized practice
          </span>
        </div>

        <Reveal
          as="h2"
          index={0}
          className="mb-16 mt-16 max-w-[920px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mb-24 md:mt-24"
        >
          Where we go deep —{" "}
          <span className="text-nordic">verticals that move the Nordic economy.</span>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {sectors.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              index={i}
              className="group relative flex flex-col justify-between rounded-[6px] border border-hairline bg-white p-7 transition-[border-color,box-shadow,transform] duration-500 ease-expo hover:-translate-y-1 hover:border-navy/40 hover:shadow-[0_18px_42px_-14px_rgba(16,34,52,0.18)] md:p-9"
            >
              <div>
                <h3 className="text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                  {s.body}
                </p>
              </div>
              <a
                href="#contact"
                className="mt-6 -mx-1 inline-flex items-center gap-1.5 px-1 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors duration-300 ease-expo group-hover:text-navydeep"
              >
                Discuss a project
                <ArrowUpRight size={12} />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          index={5}
          className="mt-10 max-w-[520px] text-[0.92rem] leading-[1.6] text-slate"
        >
          Vertical advisory routed through the same desk that handles the
          Forum&apos;s commercial introductions — no hand-offs.
        </Reveal>
      </div>
    </section>
  );
}
