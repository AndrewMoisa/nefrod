"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Members", href: "/#members" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll + inert siblings while menu is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // mark page content as inert so focus & screen readers can't enter it
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    return () => {
      document.body.style.overflow = prevOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  // close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // dark text on white surface (when scrolled, OR menu is open)
  const useDark = scrolled || open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div
          className={`border-b transition-[background-color,border-color] duration-500 ease-expo ${
            useDark
              ? "border-hairline bg-white/95 backdrop-blur-[12px]"
              : "border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-[58px] max-w-[1320px] items-center justify-between px-5 md:h-[64px] md:px-10">
            {/* left — wordmark: NEF with red imprint rule */}
            <Link
              href="/#top"
              onClick={() => setOpen(false)}
              className="group relative z-[110] inline-flex flex-col items-stretch leading-none"
              aria-label="NEFrød — Nordic Entrepreneur Forum Rød, home"
            >
              <span
                className={`font-display text-[1.5rem] font-bold leading-none tracking-[-0.045em] transition-colors duration-300 ease-expo ${
                  useDark ? "text-navy" : "text-white"
                }`}
              >
                NEF
              </span>
              <span
                aria-hidden="true"
                className="mt-[5px] block h-[2.5px] w-full origin-left bg-nordic transition-transform duration-[450ms] ease-expo group-hover:scale-x-110"
              />
            </Link>

            {/* center — desktop nav */}
            <nav className="hidden items-center gap-[38px] md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ease-expo after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-nordic after:transition-transform after:duration-300 after:ease-expo hover:after:origin-left hover:after:scale-x-100 ${
                    useDark
                      ? "text-slate hover:text-navy"
                      : "text-white hover:text-white/70"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* right — CTA + hamburger */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <Button
                  href="/#contact"
                  size="sm"
                  variant={useDark ? "solid" : "glass"}
                >
                  Start a conversation
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="relative z-[110] -mr-1 flex h-11 w-11 items-center justify-center md:hidden"
              >
                <span className="relative block h-[14px] w-[24px]">
                  <span
                    className={`absolute left-0 top-0 h-[1.5px] w-full origin-center transition-all duration-[400ms] ease-expo ${
                      useDark ? "bg-navy" : "bg-white"
                    } ${open ? "translate-y-[6px] rotate-45" : ""}`}
                  />
                  <span
                    className={`absolute left-0 top-[6px] h-[1.5px] w-full transition-opacity duration-200 ease-expo ${
                      useDark ? "bg-navy" : "bg-white"
                    } ${open ? "opacity-0" : "opacity-100"}`}
                  />
                  <span
                    className={`absolute left-0 top-[12px] h-[1.5px] w-full origin-center transition-all duration-[400ms] ease-expo ${
                      useDark ? "bg-navy" : "bg-white"
                    } ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[90] md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* sliding panel — slides down from top */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`absolute inset-0 bg-white transition-transform duration-[700ms] ease-expo ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* faint cartographic backdrop for atmosphere */}
          <svg
            viewBox="0 0 400 800"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
          >
            {[120, 240, 360, 480, 600, 720].map((y) => (
              <line
                key={`mh-${y}`}
                x1="0"
                y1={y}
                x2="400"
                y2={y}
                stroke="#dcdfdb"
                strokeWidth="1"
              />
            ))}
            {[80, 200, 320].map((x) => (
              <line
                key={`mv-${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="800"
                stroke="#dcdfdb"
                strokeWidth="1"
              />
            ))}
          </svg>

          <div className="relative flex h-full flex-col px-5 pb-10 pt-[78px]">
            <span
              style={{ transitionDelay: open ? "220ms" : "0ms" }}
              className={`mb-10 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate transition-[opacity,transform] duration-700 ease-expo ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <span className="text-nordic">§</span>&nbsp;Menu
            </span>

            <nav className="flex flex-col">
              {navItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    transitionDelay: open ? `${280 + i * 80}ms` : "0ms",
                  }}
                  className={`group flex items-baseline gap-4 border-b border-hairline py-5 transition-[opacity,transform] duration-700 ease-expo ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className="w-7 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate">
                    0{i + 1}
                  </span>
                  <span className="flex-1 font-display text-[2.6rem] font-semibold leading-[1] tracking-[-0.035em] text-navy transition-colors duration-300 ease-expo group-hover:text-nordic">
                    {item.label}
                  </span>
                  <span className="text-nordic transition-transform duration-300 ease-expo group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </nav>

            {/* bottom block */}
            <div
              style={{ transitionDelay: open ? "560ms" : "0ms" }}
              className={`mt-auto pt-10 transition-[opacity,transform] duration-700 ease-expo ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Button href="/#contact" variant="solid">
                Start a conversation
              </Button>
              <div className="mt-9 grid grid-cols-2 gap-6 font-mono text-[0.68rem] uppercase tracking-[0.2em]">
                <div>
                  <div className="mb-1.5 text-slate">Visit</div>
                  <div className="text-navy">Sandnes, Norway</div>
                </div>
                <div>
                  <div className="mb-1.5 text-slate">Reply</div>
                  <div className="text-navy">Within 2 business days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
