import Reveal from "./Reveal";

const groups = [
  {
    num: "01",
    title: "Entrepreneurs & startups",
    body: "Establishing a footprint in the Nordic market — funding, grants, joint projects.",
    tag: "Founders",
  },
  {
    num: "02",
    title: "Established enterprises",
    body: "Cross-border expansion, import / export pipelines, maritime trade routes and full digital transformation.",
    tag: "Operators",
  },
  {
    num: "03",
    title: "Investors & industrial specialists",
    body: "Vetted joint ventures and high-value projects across Energy, Maritime, Logistics and Tech.",
    tag: "Capital",
  },
];

export default function Audience() {
  return (
    <section id="audience" className="bg-white py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        {/* hard rule + meta */}
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            §02 <span className="text-nordic">/</span> Audience
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            Three rooms
          </span>
        </div>

        {/* headline only — no eyebrow, no description */}
        <Reveal
          as="h2"
          index={0}
          className="mt-16 max-w-[1000px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mt-24"
        >
          Built for everyone scaling{" "}
          <span className="text-nordic">across borders.</span>
        </Reveal>

        {/* numbered editorial list */}
        <div className="mt-20 md:mt-28">
          {groups.map((g, i) => (
            <Reveal
              as="article"
              key={g.num}
              index={i}
              className="group grid grid-cols-1 items-start gap-6 border-t border-hairline py-10 md:grid-cols-[120px_1fr_280px] md:gap-12 md:py-14"
            >
              {/* huge serial number — mono for industrial feel */}
              <div className="font-mono text-[3rem] font-medium leading-none tracking-[-0.02em] text-slate transition-colors duration-500 ease-expo group-hover:text-navy md:text-[3.6rem]">
                {g.num}
              </div>

              {/* title */}
              <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-navy">
                {g.title}
              </h3>

              {/* indented body in narrow right column */}
              <div className="md:pt-3">
                <p className="text-[0.95rem] leading-[1.66] text-slate">
                  {g.body}
                </p>
                <span className="mt-4 inline-block font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate">
                  {g.tag}
                </span>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-hairline" />
        </div>
      </div>
    </section>
  );
}
