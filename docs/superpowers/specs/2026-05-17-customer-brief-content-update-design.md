# Customer brief — content update for the presentation page

**Date:** 2026-05-17
**Scope:** Comprehensive copy refresh of the presentation page (`app/page.tsx`) plus two new sections — Sectors (§04) and Membership/Benefits (§05). Driven by an expanded brief from the customer that introduces the bilateral Norway↔China angle, named partner markets (Romania, Moldova, Ukraine, Balkans, Hungary, Austria, Greece, Turkey, Russia, China), a vertical specialized-industry tier, and an explicit "what members get" requirement.

## Goals

1. Make the bilateral China angle explicit (Norwegian companies going to China **and** Chinese companies investing in Norway).
2. Surface the specialized-industry practice that the current site doesn't mention at all (shipping, oil & gas, carbon capture, NDT, industrial safety).
3. Add a clear, scannable answer to "what do members get."
4. Preserve the current editorial voice ("a working bridge — not a directory") and visual language. No restructure of Hero/About/Audience/Services ordering or styling.

## Non-goals

- No changes to navigation, branding, type/color tokens, or component library.
- No changes to Footer (just fixed) or Contact form.
- No backend or routing changes.
- No new dependencies.

## Section map

Page order after this update:

```
Hero
§01  About
§02  Audience
§03  Services
§04  Sectors           ← new
§05  Members           ← new
Contact
```

Editorial-header pattern (`§NN / Title` + right-side meta) and `Reveal` animation are reused. New sections inherit the existing spacing rhythm (`py-[70px] md:py-[100px]`) and alternate light/paper backgrounds.

## Existing sections — copy changes

All changes are inline edits to existing JSX strings. No structural changes to these components.

### `components/Hero.tsx`

- **Subhead** (line ~62): replace
  > "A working bridge between Norwegian enterprise and the high-growth economies of Eastern Europe and China."

  with
  > "A working bridge between Norwegian enterprise and the high-growth markets of Eastern Europe and China — in both directions."

- **Markets ticker** (line 11): replace `"Southeast Europe"` with `"Balkans"` to match the customer's exact wording. Order stays the same.

- **Headline**: unchanged.

### `components/About.tsx`

- **Headline**: unchanged ("A working bridge — not a directory.").
- **Right-column paragraph** (lines 29–33): rewrite to name the bilateral China angle and gesture at the corridor. Target length ~50 words.

  New copy:
  > "The Nordic Entrepreneur Forum is the point of dialogue between Norwegian enterprise and the markets it depends on — from Romania, Moldova and the Balkans to China. We work in both directions: Nordic companies reaching into Asia, and Chinese capital landing in Norway. We don't host conferences. We close deals."

### `components/Audience.tsx`

- **Headline**: unchanged ("Built for everyone scaling across borders.").
- **Row 01 body** (Entrepreneurs & startups): keep — already mentions funding/grants/joint projects.
- **Row 02 body** (Established enterprises): rewrite to
  > "Cross-border expansion, import/export pipelines, maritime trade routes and full digital transformation."
- **Row 03 body** (Investors & industrial specialists): rewrite to
  > "Vetted joint ventures and high-value projects across Energy, Maritime, Logistics and Tech."

### `components/Services.tsx`

- **Headline**: change from "Growth, brand and digital — handled in-house." to **"Capabilities, in-house."** (reframes Services as the *horizontal* capability layer to contrast with §04 Sectors as the *vertical* practice layer).
- **Right-side meta** ("Business & Digital"): change to **"Horizontal capabilities"**.
- **Block 1 (feature, Networking)** body: rewrite to
  > "Curated introductions, working sessions, platform promotion and business consulting that turn contacts into commercial outcomes — not LinkedIn followers."
- **Block 2 (Branding)** body: rewrite to
  > "Identity, communications strategy and digital presence built to read as credible across every market."
- **Block 3 (Digital & Cyber)** body: rewrite to
  > "Transformation, cybersecurity and digitalization for oil & gas operations — resilient as you scale internationally."
- **Bento layout, headings, CTAs**: unchanged.

## §04 Sectors — new section

### Component

`components/Sectors.tsx` (new). Mount in `app/page.tsx` between `<Services />` and the new `<Members />`.

### Visual treatment

Tight 5-cell grid (3+2). Cards use the same visual language as the Services *secondary* blocks: `rounded-[6px]`, `border border-hairline`, `bg-white`, hover lift `-translate-y-1 hover:border-navy/40 hover:shadow-[0_18px_42px_-14px_rgba(16,34,52,0.18)]`. Section background: `bg-white` so it doesn't clash with Services' `bg-paper`. Editorial header `§04 / Sectors` + right meta `Specialized practice`. Headline: **"Where we go deep — verticals that move the Nordic economy."**

### Content (5 cards)

| # | Title | Body |
|---|---|---|
| 1 | Shipping & logistics | Maritime transport, port-to-port chains, freight and customs across the Nordic↔Eastern Europe↔China corridor. |
| 2 | Energy, oil & gas | Operations consulting and digital transformation for upstream and midstream operators. |
| 3 | Carbon capture | CCS project scoping, partner sourcing and service development. |
| 4 | Industrial safety | HSE, compliance and risk frameworks for industrial sites. |
| 5 | NDT · inspection | Non-destructive testing and structural integrity audits for energy and maritime assets. |

Each card optionally exposes a small "Discuss a project" link to `#contact` to mirror the Services cards.

### Responsive

- Mobile: 1 column, 5 stacked cards.
- `md`: 3 columns × 2 rows. Cards 1–3 fill the first row; cards 4–5 sit in the second row left-aligned (the third cell in row 2 is empty). Use `md:grid-cols-3` with no spans — uniform card widths, second row underflows naturally.

## §05 Members — new section

### Component

`components/Members.tsx` (new). Mount in `app/page.tsx` between `<Sectors />` and `<Contact />`.

### Visual treatment

Compact section, `bg-paper` (alternates with Sectors' `bg-white`). Editorial header `§05 / Members` + right meta `What you get`. Headline: **"What you get inside the Forum."** Four numbered editorial blocks, no card chrome — just numbered rows mirroring the Audience pattern but tighter (single line of body each). Layout:

- Mobile: 4 stacked rows.
- `md`: 4 columns, each block is `01 / Title / one-line body`.

### Content (4 items)

| # | Title | Body |
|---|---|---|
| 01 | Partners & collaborators | Warm introductions to operators, suppliers and counterparts across the corridor. |
| 02 | Capital & funding | Investor access, grant pipelines and joint-venture pairing. |
| 03 | Visibility | Promotion on the Forum platform and inside member-only programming. |
| 04 | Working sessions | Workshops, corridor briefings and deal-room introductions. |

## Architecture & file inventory

```
components/
  Sectors.tsx          (new — §04)
  Members.tsx          (new — §05)
  Hero.tsx             (copy edit)
  About.tsx            (copy edit)
  Audience.tsx         (copy edit)
  Services.tsx         (copy edit)
app/
  page.tsx             (mount Sectors + Members)
```

Both new components are server components (no `"use client"`), follow the same `Reveal` + Tailwind + `font-mono`/`font-display` patterns as Audience and Services, and depend only on existing utilities (`Reveal`, `icons.tsx`, design tokens).

## Acceptance criteria

1. Every claim in the customer brief is reflected somewhere on the page.
2. The bilateral China angle is named in at least two places (Hero subhead + About paragraph).
3. All seven specialized industries from the brief are represented in §04 (merged into 5 cells exactly as: Shipping & logistics, Energy/oil & gas, Carbon capture, Industrial safety, NDT · inspection).
4. The four member-benefit categories from the brief (partners/customers/collaborators, investors/funding/grants, promotion/visibility, joint projects/workshops) each appear in §05.
5. No regressions in Footer, Header, Hero video, Contact form, or section spacing rhythm.
6. Lighthouse/visual parity with current build — same fonts, colors, animation patterns; new sections feel native to the existing system.

## Out of scope (explicit YAGNI)

- No per-sector landing pages or routes.
- No CMS extraction — copy lives in component files as it does today.
- No animated illustrations for Sectors cards (text-only, matching Services secondaries).
- No metrics, testimonials, logos, or case studies blocks.
- No internationalization layer.
