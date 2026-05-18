import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Networking & Workshops", href: "/#services" },
      { label: "Branding, Marketing & Web", href: "/#services" },
      { label: "Digitalization & Security", href: "/#services" },
    ],
  },
  {
    title: "Forum",
    links: [
      { label: "About", href: "/#about" },
      { label: "Who we serve", href: "/#audience" },
      { label: "Services", href: "/#services" },
      { label: "Members", href: "/#members" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact desk", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="grain relative border-t border-navyline bg-navy pb-10 pt-[52px] text-slatelite">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-10 pb-12">
          <div className="max-w-[320px]">
            <Link
              href="/#top"
              aria-label="NEFrød — Nordic Entrepreneur Forum Rød, home"
              className="group mb-4 inline-flex flex-col items-stretch leading-none"
            >
              <span className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.045em] text-white">
                NEF
              </span>
              <span
                aria-hidden="true"
                className="mt-[5px] block h-[2.5px] w-full origin-left bg-nordic transition-transform duration-[450ms] ease-expo group-hover:scale-x-110"
              />
            </Link>
            <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-slate">
              Nordic Entrepreneur Forum Rød
            </div>
            <p className="text-[0.88rem] leading-[1.6]">
              A business, networking and collaboration platform bridging Nordic
              innovation with Eastern Europe, China and global markets.
            </p>
          </div>

          <div className="flex flex-wrap gap-[60px]">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-body text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-slate">
                  {col.title}
                </h3>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="-mx-1 block px-1 py-1.5 text-[0.9rem] transition-colors duration-300 ease-expo hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navyline pt-[30px] text-[0.8rem]">
          <span>
            &copy; 2026 Nordic Entrepreneur Forum Rød &middot; Org. 933 270 998
          </span>
          <span>Sandnes &middot; Bridging Nordic, Eastern Europe &amp; China</span>
        </div>
      </div>
    </footer>
  );
}
