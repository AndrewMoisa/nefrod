import Link from "next/link";
import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Privacy",
  description:
    "How Nordic Entrepreneur Forum Rød collects, uses, and protects personal data shared through this site and during corridor engagements.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      section="Privacy"
      marker="§P"
      meta="Effective 2026-01-01"
      title={
        <>
          How we handle your{" "}
          <span className="text-nordic">information.</span>
        </>
      }
    >
      <h2>Who we are</h2>
      <p>
        Nordic Entrepreneur Forum Rød (org. 933 270 998) operates this site
        from Sandnes, Norway. Questions about this notice can be sent via the{" "}
        <Link href="/#contact" className="underline">
          contact form
        </Link>
        .
      </p>

      <h2>What we collect</h2>
      <p>
        When you contact the forum desk we receive the name, company, email,
        target corridor, and message you submit. We also log standard request
        metadata — timestamp, user agent, and approximate region — to operate
        the site and detect abuse.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry with a corridor assessment or introduction.</li>
        <li>To maintain a record of the engagement if you become a member of the forum.</li>
        <li>To keep the site operational and protect it from misuse.</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We do not sell personal data. We share enquiry details with a forum lead
        relevant to the corridor you indicate, and with subprocessors that
        provide hosting and email delivery on our behalf. Where a referral
        requires it, we may share your contact details with a vetted partner —
        only with your written consent.
      </p>

      <h2>Retention</h2>
      <p>
        We retain enquiry records for three years from last contact unless you
        ask us to delete them earlier. Member engagement records are retained as
        long as required by Norwegian accounting law.
      </p>

      <h2>Your rights</h2>
      <p>
        Under GDPR you may request access, correction, or deletion of your
        personal data, and you may lodge a complaint with Datatilsynet. Submit
        a request via the{" "}
        <Link href="/#contact" className="underline">
          contact form
        </Link>{" "}
        and we will respond within thirty days.
      </p>

      <h2>Cookies</h2>
      <p>
        This site does not set tracking cookies. We use only the minimum
        functional storage required to render the page.
      </p>
    </LegalShell>
  );
}
