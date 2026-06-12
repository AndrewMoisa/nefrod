import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LegalShellProps = {
  section: string;
  marker: string;
  title: ReactNode;
  meta: string;
  children: ReactNode;
};

export default function LegalShell({
  section,
  marker,
  title,
  meta,
  children,
}: LegalShellProps) {
  return (
    <>
      <Header lightSurface />
      <main id="top" className="bg-white">
        <section className="mx-auto max-w-[1240px] px-6 pb-24 pt-[150px] md:px-10 md:pt-[200px]">
          <div className="flex items-baseline justify-between border-t border-navy pt-6">
            <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
              {marker} <span className="text-nordic">/</span> {section}
            </span>
            <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
              {meta}
            </span>
          </div>

          <h1 className="mt-16 max-w-[920px] text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.038em] md:mt-24">
            {title}
          </h1>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-8 md:col-start-3 [&_h2]:mt-12 [&_h2]:text-[1.4rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.015em] [&_h2]:text-navy [&_h2]:first:mt-0 [&_p]:mt-4 [&_p]:text-[1rem] [&_p]:leading-[1.7] [&_p]:text-slate [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-[1rem] [&_ul]:leading-[1.7] [&_ul]:text-slate">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
