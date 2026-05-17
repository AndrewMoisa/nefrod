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

const steps = [
  {
    num: "01",
    title: "Apply",
    body: "Send a brief through the Forum desk — your venture, your target corridor, what you need to unlock.",
  },
  {
    num: "02",
    title: "Review",
    body: "The Forum team reviews fit and routing. Two business days for an initial response.",
  },
  {
    num: "03",
    title: "Onboard",
    body: "Introductions go out, working session calendar opens, your platform listing goes live.",
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
          className="mb-7 mt-16 max-w-[920px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mt-24"
        >
          Membership is access to{" "}
          <span className="text-nordic">deal flow, capital and the corridor.</span>
        </Reveal>

        {/* Intro */}
        <Reveal
          as="p"
          index={1}
          className="mb-14 max-w-[560px] text-[1.02rem] leading-[1.66] text-slate md:mb-20"
        >
          One Forum membership. Six concrete things you walk in with on day one.
        </Reveal>

        {/* Benefits — 3 x 2 editorial grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 border-t border-hairline pt-12 md:grid-cols-3 md:gap-y-14 md:pt-14">
          {benefits.map((b, i) => (
            <Reveal as="article" key={b.num} index={i}>
              <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.18em] text-slate">
                {b.num}
              </span>
              <h3 className="mt-3 text-[1.25rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                {b.title}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-[1.62] text-slate">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* How to join — process */}
        <div className="mt-20 border-t border-hairline pt-12 md:mt-28 md:pt-14">
          <Reveal
            as="div"
            index={0}
            className="mb-10 flex items-baseline justify-between md:mb-14"
          >
            <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.18em] text-navy">
              How to join <span className="text-nordic">/</span> three steps
            </span>
            <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slate md:inline">
              ~ two business days to first response
            </span>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-x-10">
            {steps.map((s, i) => (
              <Reveal as="article" key={s.num} index={i}>
                <span className="font-display text-[2.8rem] font-medium leading-none tracking-[-0.02em] text-nordic">
                  {s.num}
                </span>
                <h3 className="mt-5 text-[1.2rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[320px] text-[0.92rem] leading-[1.62] text-slate">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Eligibility + CTA */}
        <div className="mt-16 flex flex-col items-start justify-between gap-7 border-t border-hairline pt-10 md:mt-24 md:flex-row md:items-center md:gap-10 md:pt-12">
          <Reveal
            as="p"
            index={0}
            className="max-w-[560px] text-[0.95rem] leading-[1.6] text-slate"
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
