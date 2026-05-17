import Button from "./Button";
import Reveal from "./Reveal";

const benefits = [
  {
    num: "01",
    title: "Partners & collaborators",
    body: "Warm introductions to operators, suppliers and counterparts — Norway, Eastern Europe, the Balkans and China.",
  },
  {
    num: "02",
    title: "Capital & funding",
    body: "Investor pipelines, grant programmes and joint-venture pairing across the corridor.",
  },
  {
    num: "03",
    title: "Corridor access",
    body: "Direct routes into the Nordic↔Eastern Europe↔China trade lanes, with the people who actually run them.",
  },
  {
    num: "04",
    title: "Platform visibility",
    body: "Promotion on the Forum platform, in member-only briefings and inside curated programming.",
  },
  {
    num: "05",
    title: "Working sessions",
    body: "Workshops, corridor briefings and deal-room introductions — practical, not panel-discussion.",
  },
  {
    num: "06",
    title: "Advisory desk",
    body: "A direct line to specialists in shipping, energy, digital, brand and compliance.",
  },
];

export default function Members() {
  return (
    <section id="members" className="bg-paper py-[60px] md:py-[84px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        {/* Editorial header */}
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            §04 <span className="text-nordic">/</span> Members
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            Membership
          </span>
        </div>

        {/* Headline */}
        <Reveal
          as="h2"
          index={0}
          className="mb-12 mt-14 max-w-[920px] text-[clamp(2.2rem,4.2vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.035em] md:mb-16 md:mt-20"
        >
          Membership is access to{" "}
          <span className="text-nordic">deal flow, capital and the corridor.</span>
        </Reveal>

        {/* Benefits — 3 x 2 editorial grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 border-t border-hairline pt-10 md:grid-cols-3 md:gap-y-12 md:pt-12">
          {benefits.map((b, i) => (
            <Reveal as="article" key={b.num} index={i}>
              <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-slate">
                {b.num}
              </span>
              <h3 className="mt-2.5 text-[1.15rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                {b.title}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-[1.58] text-slate">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Eligibility + CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-hairline pt-8 md:mt-16 md:flex-row md:items-center md:gap-10 md:pt-10">
          <Reveal
            as="p"
            index={0}
            className="max-w-[560px] text-[0.92rem] leading-[1.55] text-slate"
          >
            Open to entrepreneurs, established companies and professionals
            working across — or planning to enter — the Nordic, Eastern
            European and Chinese markets.
          </Reveal>
          <Reveal as="div" index={1} className="shrink-0">
            <Button href="#contact" variant="solid" arrow="right">
              Apply for membership
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
