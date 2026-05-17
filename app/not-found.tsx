import Button from "@/components/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="top" tabIndex={-1} className="bg-white outline-none">
        <section className="mx-auto flex min-h-[100dvh] max-w-[1240px] flex-col justify-center px-6 pb-24 pt-[200px] md:px-10">
          <div className="flex items-baseline justify-between border-t border-navy pt-6">
            <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
              §404 <span className="text-nordic">/</span> Off-corridor
            </span>
            <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
              No route found
            </span>
          </div>

          <h1 className="mt-16 max-w-[920px] text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.038em] md:mt-24">
            This page is{" "}
            <span className="text-nordic">not on the map.</span>
          </h1>

          <p className="mt-8 max-w-[460px] text-[1.02rem] leading-[1.66] text-slate">
            The link you followed does not lead anywhere we publish. Try the
            forum home, or reach the desk directly.
          </p>

          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <Button href="/" arrow="right">
              Back to the forum
            </Button>
            <Button href="/#contact" variant="ghost">
              Contact the desk
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
