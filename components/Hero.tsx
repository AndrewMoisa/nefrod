import Button from "./Button";
import Eyebrow from "./Eyebrow";
import HeroVideo from "./HeroVideo";
import Reveal from "./Reveal";

const markets = [
  "Norway",
  "Romania",
  "Moldova",
  "Ukraine",
  "Balkans",
  "Hungary",
  "Austria",
  "Greece",
  "Turkey",
  "Russia",
  "China",
];

export default function Hero() {
  // duplicate for seamless loop
  const ticker = [...markets, ...markets];

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-navydeep pb-0 pt-[150px] md:pt-[200px]">
      <HeroVideo />

      {/* layered scrims — top fade for nav, diagonal scrim for hero text legibility */}
      <div
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navydeep/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(11,23,34,0.72)_0%,rgba(11,23,34,0.45)_35%,rgba(11,23,34,0.18)_60%,transparent_85%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navydeep/55 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] flex-1 px-6 [text-shadow:0_2px_22px_rgba(11,23,34,0.55)] md:px-10">
        <Reveal as="div" index={0}>
          <Eyebrow dark>Nordic Entrepreneur Forum</Eyebrow>
        </Reveal>
        <Reveal
          as="h1"
          index={1}
          className="mt-7 max-w-[1040px] text-[clamp(2.9rem,5.8vw,5.6rem)] font-semibold leading-[1.0] tracking-[-0.038em] text-white"
        >
          The gateway for Nordic industry into{" "}
          <span className="font-normal italic text-white/80">
            emerging markets
          </span>
          .
        </Reveal>
        <Reveal
          as="p"
          index={2}
          className="my-8 max-w-[520px] text-[1.1rem] leading-[1.6] text-white/85"
        >
          A working bridge between Norwegian enterprise and the high-growth
          markets of Eastern Europe and China — in both directions.
        </Reveal>
        <Reveal
          as="div"
          index={3}
          className="flex flex-col gap-3.5 [text-shadow:none] sm:flex-row"
        >
          <Button href="#contact" variant="white" arrow="right">
            Join the Forum
          </Button>
          <Button href="#services" variant="ghost-light" withArrow={false}>
            Explore our services
          </Button>
        </Reveal>
      </div>

      {/* market ticker — full bleed at hero floor */}
      <div
        className="relative z-10 mt-20 overflow-hidden border-t border-white/15 py-5"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max gap-[64px] whitespace-nowrap px-6 md:px-10">
          {ticker.map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="flex items-center gap-[64px] font-mono text-[0.84rem] font-medium uppercase tracking-[0.22em] text-white/50"
            >
              {m}
              <span className="inline-block h-[3px] w-[3px] rounded-full bg-white/35" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
