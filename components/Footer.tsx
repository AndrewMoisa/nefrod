import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type FooterLink = { labelKey: string; href: string };
type FooterColumn = { titleKey: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    titleKey: "services.title",
    links: [
      { labelKey: "services.networking", href: "/#services" },
      { labelKey: "services.branding", href: "/#services" },
      { labelKey: "services.digital", href: "/#services" },
    ],
  },
  {
    titleKey: "forum.title",
    links: [
      { labelKey: "forum.about", href: "/#about" },
      { labelKey: "forum.audience", href: "/#audience" },
      { labelKey: "forum.services", href: "/#services" },
      { labelKey: "forum.members", href: "/#members" },
      { labelKey: "forum.contact", href: "/#contact" },
    ],
  },
  {
    titleKey: "legal.title",
    links: [
      { labelKey: "legal.privacy", href: "/privacy" },
      { labelKey: "legal.terms", href: "/terms" },
      { labelKey: "legal.contact", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const tCommon = useTranslations("Common");
  return (
    <footer className="grain relative border-t border-navyline bg-navy pb-10 pt-[52px] text-slatelite">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-10 pb-12">
          <div className="max-w-[320px]">
            <Link
              href="/#top"
              aria-label={t("logoAria")}
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
              {tCommon("brandFull")}
            </div>
            <p className="text-[0.88rem] leading-[1.6]">{t("blurb")}</p>
          </div>

          <div className="flex flex-wrap gap-[60px]">
            {columns.map((col) => (
              <div key={col.titleKey}>
                <h3 className="mb-4 font-body text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-slate">
                  {t(`columns.${col.titleKey}` as never)}
                </h3>
                {col.links.map((link) => (
                  <Link
                    key={link.labelKey}
                    href={link.href}
                    className="-mx-1 block px-1 py-1.5 text-[0.9rem] transition-colors duration-300 ease-expo hover:text-white"
                  >
                    {t(`columns.${link.labelKey}` as never)}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navyline pt-[30px] text-[0.8rem]">
          <span>{t("copyright")}</span>
          <span>{t("tagline")}</span>
        </div>
      </div>
    </footer>
  );
}
