import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

type SectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  dark?: boolean;
};

export default function SectionHead({
  eyebrow,
  title,
  description,
  dark = false,
}: SectionHeadProps) {
  return (
    <div className="mb-[50px] flex flex-col items-start justify-between gap-[18px] md:mb-[72px] md:flex-row md:items-end md:gap-10">
      <div>
        <Reveal as="div" index={0}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal
          as="h2"
          index={1}
          className="mt-5 max-w-[620px] text-[clamp(2.1rem,3.4vw,3.2rem)] font-semibold"
        >
          {title}
        </Reveal>
      </div>
      <Reveal
        as="p"
        index={2}
        className={`max-w-[320px] text-[0.96rem] leading-[1.62] ${
          dark ? "text-slatefaint" : "text-slate"
        }`}
      >
        {description}
      </Reveal>
    </div>
  );
}
