import LegalShell from "@/components/LegalShell";

export const metadata = {
  title: "Terms",
  description:
    "Terms governing use of the Nordic Entrepreneur Forum Rød website and forum services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell
      section="Terms"
      marker="§T"
      meta="Effective 2026-01-01"
      title={
        <>
          The terms under which we{" "}
          <span className="text-nordic">do business.</span>
        </>
      }
    >
      <h2>Acceptance</h2>
      <p>
        By using this site or engaging the forum desk you agree to these terms.
        If you do not agree, do not use the site or submit an enquiry.
      </p>

      <h2>Forum services</h2>
      <p>
        Nordic Entrepreneur Forum Rød offers introductions, working sessions,
        branding, marketing, web, digitalization, and cybersecurity advisory
        services. Each engagement is scoped in a separate written agreement
        that prevails over these site terms.
      </p>

      <h2>Use of the site</h2>
      <ul>
        <li>You may view and share links to the site for non-commercial purposes.</li>
        <li>You may not scrape, mirror, or republish content without written permission.</li>
        <li>You may not submit false information or impersonate another party.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        All trademarks, text, code, and visual assets on this site are the
        property of Nordic Entrepreneur Forum Rød or its licensors. The forum
        mark and the Nordic red accent are protected and may not be reproduced
        without consent.
      </p>

      <h2>Confidentiality</h2>
      <p>
        We treat information you submit as confidential. On request, we will
        sign a mutual NDA before the first scoping call.
      </p>

      <h2>No warranty</h2>
      <p>
        This site is provided as is. Content is for informational purposes and
        does not constitute legal, tax, or investment advice. We make no
        representation about the accuracy or completeness of third-party
        information surfaced through the forum.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by Norwegian law, our aggregate liability for
        any claim arising from use of this site is limited to one hundred
        Norwegian kroner. This limitation does not apply to liability that
        cannot be excluded by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Norway. Disputes are subject to
        the exclusive jurisdiction of the courts of Stavanger.
      </p>
    </LegalShell>
  );
}
