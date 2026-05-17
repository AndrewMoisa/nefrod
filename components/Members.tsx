import Reveal from "./Reveal";

const benefits = [
  {
    num: "01",
    title: "Partners & collaborators",
    body: "Warm introductions to operators, suppliers and counterparts across the corridor.",
  },
  {
    num: "02",
    title: "Capital & funding",
    body: "Investor access, grant pipelines and joint-venture pairing.",
  },
  {
    num: "03",
    title: "Visibility",
    body: "Promotion on the Forum platform and inside member-only programming.",
  },
  {
    num: "04",
    title: "Working sessions",
    body: "Workshops, corridor briefings and deal-room introductions.",
  },
];

export default function Members() {
  return (
    <section id="members" className="bg-paper py-[60px] md:py-[84px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            §04 <span className="text-nordic">/</span> Members
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            What you get
          </span>
        </div>

        <Reveal
          as="h2"
          index={0}
          className="mb-16 mt-16 max-w-[820px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mb-20 md:mt-24"
        >
          What you get{" "}
          <span className="text-nordic">inside the Forum.</span>
        </Reveal>

        <div className="grid grid-cols-1 gap-y-10 border-t border-hairline pt-10 md:grid-cols-4 md:gap-x-10 md:gap-y-0">
          {benefits.map((b, i) => (
            <Reveal as="article" key={b.num} index={i} className="md:pr-4">
              <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.18em] text-slate">
                {b.num}
              </span>
              <h3 className="mt-3 text-[1.2rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                {b.title}
              </h3>
              <p className="mt-2 text-[0.9rem] leading-[1.62] text-slate">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
