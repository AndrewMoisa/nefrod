import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

export default function Contact() {
  const t = useTranslations("Contact");

  const details = [
    { label: t("details.responseLabel"), value: t("details.responseValue") },
    { label: t("details.basedInLabel"), value: t("details.basedInValue") },
  ];

  return (
    <section
      id="contact"
      className="grain relative bg-navydeep py-[60px] text-white md:py-[90px]"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 px-6 md:grid-cols-[0.92fr_1.08fr] md:gap-20 md:px-10">
        {/* intro */}
        <div>
          <Reveal as="div" index={0}>
            <Eyebrow dark>{t("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal
            as="h2"
            index={1}
            className="my-6 text-[clamp(2.2rem,3.6vw,3.6rem)] font-semibold leading-[1.0] tracking-[-0.035em]"
          >
            {t("titleStart")}{" "}
            <em className="font-normal italic text-nordic">
              {t("titleAccent")}
            </em>
            {t("titleEnd")}
          </Reveal>
          <Reveal
            as="p"
            index={2}
            className="max-w-[400px] text-[1rem] leading-[1.66] text-slatefaint"
          >
            {t("body")}
          </Reveal>
          <Reveal
            as="div"
            index={3}
            className="mt-13 flex flex-col gap-[22px]"
          >
            {details.map((d) => (
              <div key={d.label} className="border-t border-navyline pt-4">
                <span className="mb-1.5 block text-[0.74rem] uppercase tracking-[0.14em] text-slate">
                  {d.label}
                </span>
                <strong className="font-display text-[1.04rem] font-medium text-white">
                  {d.value}
                </strong>
              </div>
            ))}
          </Reveal>
        </div>

        {/* form */}
        <Reveal as="div" index={2}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
