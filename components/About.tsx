import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-white py-[60px] md:py-[84px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        {/* hard top rule + mono meta strip */}
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            §01 <span className="text-nordic">/</span> Forum
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            59.91°N · 10.74°E — Oslo
          </span>
        </div>

        {/* editorial split */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12 md:gap-16">
          <Reveal
            as="h2"
            index={0}
            className="md:col-span-8 text-[clamp(2.6rem,5.6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.038em]"
          >
            A working bridge —{" "}
            <span className="text-nordic">not a directory.</span>
          </Reveal>

          <Reveal as="div" index={1} className="md:col-span-4 md:pt-3">
            <p className="max-w-[360px] text-[1.02rem] leading-[1.66] text-slate">
              The Nordic Entrepreneur Forum is the point of dialogue between
              Norwegian enterprise and the markets it depends on — from
              Romania, Moldova and the Balkans to China. We work in both
              directions: Nordic companies reaching into Asia, and Chinese
              capital landing in Norway. We don&apos;t host conferences. We
              close deals.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
