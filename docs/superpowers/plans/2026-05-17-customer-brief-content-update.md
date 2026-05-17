# Customer Brief Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the customer's expanded brief to the presentation page — broaden copy across Hero/About/Audience/Services, add §04 Sectors and §05 Members sections, all without touching navigation, branding, or layout primitives.

**Architecture:** Pure content/component work in a Next.js 15 + React 19 + Tailwind 4 codebase. Two new server components (`Sectors.tsx`, `Members.tsx`) reuse the existing `Reveal` animation primitive and the editorial-header pattern (`§NN / Title` + right meta) already used by About/Audience/Services. Both are mounted in `app/page.tsx` between Services and Contact. Other changes are inline edits to JSX string literals in four existing components.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5.7, Tailwind CSS 4. No test framework — verification is `npm run lint`, `npm run build` (full type-check + compile), and visual check in `npm run dev`.

**Spec:** `docs/superpowers/specs/2026-05-17-customer-brief-content-update-design.md`

---

## Conventions used across all tasks

- Path style: forward slashes (Windows + WSL friendly).
- After every edit: `npm run lint`. After every component-creation or page-mount task: also `npm run build`.
- One commit per task with a Conventional Commits prefix (`feat:` for new sections, `chore(copy):` for copy edits).
- Edits to existing files use literal string replacement of the existing copy — never reformat or restructure surrounding JSX.

---

## Task 1: Hero copy — bilateral angle + Balkans market label

**Files:**
- Modify: `components/Hero.tsx:11` (markets array) and `components/Hero.tsx:60-64` (subhead paragraph)

- [ ] **Step 1: Update the markets ticker label**

In `components/Hero.tsx`, find the line:
```ts
  "Southeast Europe",
```
Replace with:
```ts
  "Balkans",
```

- [ ] **Step 2: Update the Hero subhead paragraph**

In `components/Hero.tsx`, find the JSX:
```tsx
        <Reveal
          as="p"
          index={2}
          className="my-8 max-w-[520px] text-[1.1rem] leading-[1.6] text-white/85"
        >
          A working bridge between Norwegian enterprise and the high-growth
          economies of Eastern Europe and China.
        </Reveal>
```
Replace the body text (only) with:
```tsx
          A working bridge between Norwegian enterprise and the high-growth
          markets of Eastern Europe and China — in both directions.
```

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors (warnings about unrelated files are fine).

- [ ] **Step 4: Visual check**

Run: `npm run dev`, open `http://localhost:3000`, verify:
- Hero subhead reads "…in both directions."
- The marquee ticker shows "Balkans" between "Ukraine" and "Hungary".
Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx
git commit -m "chore(copy): bilateral framing + Balkans label in Hero"
```

---

## Task 2: About — bilateral China + corridor naming

**Files:**
- Modify: `components/About.tsx:28-34` (right-column paragraph)

- [ ] **Step 1: Replace the right-column paragraph**

In `components/About.tsx`, find:
```tsx
          <Reveal as="div" index={1} className="md:col-span-4 md:pt-3">
            <p className="max-w-[360px] text-[1.02rem] leading-[1.66] text-slate">
              The Nordic Entrepreneur Forum is the point of dialogue between
              Norwegian enterprise and the markets it depends on. We don&apos;t
              host conferences. We close deals.
            </p>
          </Reveal>
```
Replace with:
```tsx
          <Reveal as="div" index={1} className="md:col-span-4 md:pt-3">
            <p className="max-w-[360px] text-[1.02rem] leading-[1.66] text-slate">
              The Nordic Entrepreneur Forum is the point of dialogue between
              Norwegian enterprise and the markets it depends on — from
              Romania, Moldova and the Balkans to China. We work in both
              directions: Nordic companies reaching into Asia, and Chinese
              capital landing in Norway. We don&apos;t host conferences. We
              close deals.
            </p>
          </Reveal>
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Visual check**

Run `npm run dev` if not running. Verify §01 About reads with the new paragraph and the layout (12-col grid with `md:col-span-8` headline + `md:col-span-4` body) is preserved. Stop the dev server when satisfied.

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx
git commit -m "chore(copy): name corridor + bilateral China in About"
```

---

## Task 3: Audience — sharpen rows 02 and 03

**Files:**
- Modify: `components/Audience.tsx:10-21` (groups array)

- [ ] **Step 1: Replace the group bodies for 02 and 03**

In `components/Audience.tsx`, find:
```tsx
  {
    num: "02",
    title: "Established enterprises",
    body: "Cross-border expansion, import / export pipelines, full digital transformation.",
    tag: "Operators",
  },
  {
    num: "03",
    title: "Investors & industrial specialists",
    body: "Vetted joint ventures and high-value projects across Energy, Logistics and Tech.",
    tag: "Capital",
  },
```
Replace with:
```tsx
  {
    num: "02",
    title: "Established enterprises",
    body: "Cross-border expansion, import / export pipelines, maritime trade routes and full digital transformation.",
    tag: "Operators",
  },
  {
    num: "03",
    title: "Investors & industrial specialists",
    body: "Vetted joint ventures and high-value projects across Energy, Maritime, Logistics and Tech.",
    tag: "Capital",
  },
```

Row 01 is unchanged.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Audience.tsx
git commit -m "chore(copy): add maritime to Audience rows 02 + 03"
```

---

## Task 4: Services — reframe as horizontal capabilities + body refresh

**Files:**
- Modify: `components/Services.tsx` — meta label (line ~14), headline (lines 18-25), three card bodies (lines 128-132, 154-157, 178-181)

- [ ] **Step 1: Replace the right-side meta label**

In `components/Services.tsx`, find:
```tsx
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            Business &amp; Digital
          </span>
```
Replace with:
```tsx
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            Horizontal capabilities
          </span>
```

- [ ] **Step 2: Replace the section headline**

In `components/Services.tsx`, find:
```tsx
        <Reveal
          as="h2"
          index={0}
          className="mb-16 max-w-[820px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mb-24"
        >
          Growth, brand and digital —{" "}
          <span className="text-nordic">handled in-house.</span>
        </Reveal>
```
Replace the headline content (only) with:
```tsx
          Capabilities,{" "}
          <span className="text-nordic">in-house.</span>
```

- [ ] **Step 3: Update the feature block (Networking) body**

In `components/Services.tsx`, find:
```tsx
                <p className="mt-5 max-w-[440px] text-[0.95rem] leading-[1.62] text-white/75">
                  Curated introductions, working sessions and platform exposure
                  that turn contacts into commercial outcomes — not LinkedIn
                  followers.
                </p>
```
Replace with:
```tsx
                <p className="mt-5 max-w-[440px] text-[0.95rem] leading-[1.62] text-white/75">
                  Curated introductions, working sessions, platform promotion
                  and business consulting that turn contacts into commercial
                  outcomes — not LinkedIn followers.
                </p>
```

- [ ] **Step 4: Update the Branding block body**

In `components/Services.tsx`, find:
```tsx
              <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                Identity, communications and digital presence built to read as
                credible across every market.
              </p>
```
Replace with:
```tsx
              <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                Identity, communications strategy and digital presence built to
                read as credible across every market.
              </p>
```

- [ ] **Step 5: Update the Digital & Cyber block body**

In `components/Services.tsx`, find:
```tsx
              <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                Transformation and security strategy that keep operations
                resilient as you scale internationally.
              </p>
```
Replace with:
```tsx
              <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                Transformation, cybersecurity and digitalization for oil &amp;
                gas operations — resilient as you scale internationally.
              </p>
```

- [ ] **Step 6: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 7: Visual check**

Run `npm run dev`. Verify §03 Services:
- Right-side meta reads "Horizontal capabilities"
- Headline reads "Capabilities, in-house." with "in-house." in nordic red
- Three card bodies show the refreshed copy
- Bento layout (2x2 feature + 2 secondaries) is unchanged

- [ ] **Step 8: Commit**

```bash
git add components/Services.tsx
git commit -m "chore(copy): reframe Services as horizontal capabilities"
```

---

## Task 5: Create §04 Sectors component

**Files:**
- Create: `components/Sectors.tsx`

- [ ] **Step 1: Create the component**

Create `components/Sectors.tsx` with this exact content:

```tsx
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

const sectors = [
  {
    title: "Shipping & logistics",
    body: "Maritime transport, port-to-port chains, freight and customs across the Nordic↔Eastern Europe↔China corridor.",
  },
  {
    title: "Energy, oil & gas",
    body: "Operations consulting and digital transformation for upstream and midstream operators.",
  },
  {
    title: "Carbon capture",
    body: "CCS project scoping, partner sourcing and service development.",
  },
  {
    title: "Industrial safety",
    body: "HSE, compliance and risk frameworks for industrial sites.",
  },
  {
    title: "NDT · inspection",
    body: "Non-destructive testing and structural integrity audits for energy and maritime assets.",
  },
];

export default function Sectors() {
  return (
    <section id="sectors" className="bg-white py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            §04 <span className="text-nordic">/</span> Sectors
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            Specialized practice
          </span>
        </div>

        <Reveal
          as="h2"
          index={0}
          className="mb-16 mt-16 max-w-[920px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mb-24 md:mt-24"
        >
          Where we go deep —{" "}
          <span className="text-nordic">verticals that move the Nordic economy.</span>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {sectors.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              index={i}
              className="group relative flex flex-col justify-between rounded-[6px] border border-hairline bg-white p-7 transition-[border-color,box-shadow,transform] duration-500 ease-expo hover:-translate-y-1 hover:border-navy/40 hover:shadow-[0_18px_42px_-14px_rgba(16,34,52,0.18)] md:p-9"
            >
              <div>
                <h3 className="text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-[1.62] text-slate">
                  {s.body}
                </p>
              </div>
              <a
                href="#contact"
                className="mt-6 -mx-1 inline-flex items-center gap-1.5 px-1 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors duration-300 ease-expo group-hover:text-navydeep"
              >
                Discuss a project
                <ArrowUpRight size={12} />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          index={5}
          className="mt-10 max-w-[520px] text-[0.92rem] leading-[1.6] text-slate"
        >
          Vertical advisory routed through the same desk that handles the
          Forum&apos;s commercial introductions — no hand-offs.
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify imports resolve**

Run: `npm run lint`
Expected: no errors. (If `Reveal` or `ArrowUpRight` aren't found, the import paths in the template are wrong — re-check.)

- [ ] **Step 3: Type-check + build**

Run: `npm run build`
Expected: build succeeds, no TypeScript errors. The component is not mounted yet, so it won't render — that's fine.

- [ ] **Step 4: Commit**

```bash
git add components/Sectors.tsx
git commit -m "feat: add Sectors (§04) component"
```

---

## Task 6: Create §05 Members component

**Files:**
- Create: `components/Members.tsx`

- [ ] **Step 1: Create the component**

Create `components/Members.tsx` with this exact content:

```tsx
import Reveal from "./Reveal";

const benefits = [
  {
    num: "01",
    title: "Partners & collaborators",
    body: "Warm introductions to operators, suppliers and counterparts across the corridor.",
  },
  {
    num: "02",
    title: "Capital & funding",
    body: "Investor access, grant pipelines and joint-venture pairing.",
  },
  {
    num: "03",
    title: "Visibility",
    body: "Promotion on the Forum platform and inside member-only programming.",
  },
  {
    num: "04",
    title: "Working sessions",
    body: "Workshops, corridor briefings and deal-room introductions.",
  },
];

export default function Members() {
  return (
    <section id="members" className="bg-paper py-[70px] md:py-[100px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex items-baseline justify-between border-t border-navy pt-6">
          <span className="font-mono text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy">
            §05 <span className="text-nordic">/</span> Members
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate md:inline">
            What you get
          </span>
        </div>

        <Reveal
          as="h2"
          index={0}
          className="mb-16 mt-16 max-w-[820px] text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] md:mb-20 md:mt-24"
        >
          What you get{" "}
          <span className="text-nordic">inside the Forum.</span>
        </Reveal>

        <div className="grid grid-cols-1 gap-y-10 border-t border-hairline pt-10 md:grid-cols-4 md:gap-x-10 md:gap-y-0">
          {benefits.map((b, i) => (
            <Reveal as="article" key={b.num} index={i} className="md:pr-4">
              <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.18em] text-slate">
                {b.num}
              </span>
              <h3 className="mt-3 text-[1.2rem] font-semibold leading-[1.15] tracking-[-0.015em] text-navy">
                {b.title}
              </h3>
              <p className="mt-2 text-[0.9rem] leading-[1.62] text-slate">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Type-check + build**

Run: `npm run build`
Expected: build succeeds. Component still not mounted.

- [ ] **Step 4: Commit**

```bash
git add components/Members.tsx
git commit -m "feat: add Members (§05) benefits component"
```

---

## Task 7: Mount new sections in app/page.tsx + refresh JSON-LD

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add the two imports**

In `app/page.tsx`, find:
```tsx
import About from "@/components/About";
import Audience from "@/components/Audience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
```
Replace with:
```tsx
import About from "@/components/About";
import Audience from "@/components/Audience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Members from "@/components/Members";
import Sectors from "@/components/Sectors";
import Services from "@/components/Services";
```

- [ ] **Step 2: Mount the new sections in the main element**

In `app/page.tsx`, find:
```tsx
      <main id="top" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Audience />
        <Services />
        <Contact />
      </main>
```
Replace with:
```tsx
      <main id="top" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Audience />
        <Services />
        <Sectors />
        <Members />
        <Contact />
      </main>
```

- [ ] **Step 3: Extend the JSON-LD `knowsAbout` array**

In `app/page.tsx`, find:
```tsx
  knowsAbout: [
    "International business expansion",
    "Norway to Eastern Europe trade",
    "Norway to China trade",
    "Digitalization",
    "Cybersecurity",
    "Branding",
    "Marketing",
  ],
```
Replace with:
```tsx
  knowsAbout: [
    "International business expansion",
    "Norway to Eastern Europe trade",
    "Norway to China trade",
    "Maritime transport and logistics",
    "Oil and gas operations",
    "Carbon capture",
    "Non-destructive testing",
    "Industrial safety",
    "Digitalization",
    "Cybersecurity",
    "Branding",
    "Marketing",
  ],
```

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build succeeds, no TS errors.

- [ ] **Step 6: Visual check — full page walkthrough**

Run: `npm run dev` and open `http://localhost:3000`. Scroll the page and confirm:
- Section order: Hero → §01 About → §02 Audience → §03 Services → §04 Sectors → §05 Members → Contact.
- §04 Sectors background is white; 5 cards visible, 3 on row 1 and 2 left-aligned on row 2 at `md` breakpoint; each card has the "Discuss a project" link.
- §05 Members background is paper (off-white); 4 numbered editorial blocks in a row at `md`, stacked on mobile.
- No console errors, no layout breaks on mobile (resize browser to ~375px width to spot-check).
- Hero subhead reads "…in both directions." and ticker shows "Balkans".
- Services headline reads "Capabilities, in-house." with new card bodies.
- About paragraph mentions Romania, Moldova, the Balkans, China and "in both directions".
- Audience rows 02 and 03 mention maritime.

Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "feat: mount Sectors + Members on presentation page"
```

---

## Self-review notes (already applied)

**Spec coverage check:**
- Hero subhead bilateral + Balkans → Task 1 ✓
- About bilateral China + corridor → Task 2 ✓
- Audience maritime mentions → Task 3 ✓
- Services horizontal-capabilities reframe + body refresh → Task 4 ✓
- §04 Sectors component + 5 cards + grid + headline → Task 5 ✓
- §05 Members component + 4 benefits + 4-col layout → Task 6 ✓
- Mount both, update JSON-LD → Task 7 ✓
- Footer (no changes), Contact (no changes), nav/branding (no changes) — preserved by omission

**Placeholder scan:** No TBDs, no "handle errors appropriately", no "similar to above" — every step contains the full literal copy or full component source.

**Type consistency:** Both new components use `import Reveal from "./Reveal"` and `default export`, mirroring every other component file in `components/`. Sectors additionally imports `ArrowUpRight` from `./icons`, which already exists at `components/icons.tsx:29`. JSON-LD edits preserve the existing object shape.
