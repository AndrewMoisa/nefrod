# Nordic Entrepreneur Forum Rød

The working bridge between Norwegian industry and the high-growth economies of Eastern Europe and China.

**Live site →** [nefrod.no](https://nefrod.no)

---

## Overview

Nordic Entrepreneur Forum Rød (NEFrød) is a business-networking organisation based in Sandnes, Norway (org. 933 270 998). This repository contains the source code for its public website — a single-page marketing site with legal pages and a contact form backed by [Resend](https://resend.com).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Fonts | Bricolage Grotesque · Albert Sans · JetBrains Mono (Google Fonts) |
| Email | [Resend](https://resend.com) |
| Validation | [Zod](https://zod.dev) |
| Linting | ESLint with `eslint-config-next` |

## Project Structure

```
app/
├── page.tsx              # Home — Hero, About, Audience, Services, Members, Contact
├── layout.tsx            # Root layout, metadata, fonts
├── globals.css           # Global styles & Tailwind config
├── privacy/page.tsx      # Privacy policy
├── terms/page.tsx        # Terms of service
├── not-found.tsx         # Custom 404
├── api/contact/          # POST endpoint — sends emails via Resend
├── robots.ts             # robots.txt generation
├── sitemap.ts            # sitemap.xml generation
├── icon.tsx              # Dynamic favicon
├── apple-icon.tsx        # Apple touch icon
└── opengraph-image.tsx   # Dynamic OG image

components/
├── Header.tsx            # Navigation bar (desktop + mobile)
├── Hero.tsx              # Full-screen hero with video background
├── HeroVideo.tsx         # Video player component
├── About.tsx             # About section
├── Audience.tsx          # Target audience section
├── Services.tsx          # Services / corridors section
├── Members.tsx           # Member showcase
├── Contact.tsx           # Contact section wrapper
├── ContactForm.tsx       # Contact form with validation
├── Footer.tsx            # Site footer
├── LegalShell.tsx        # Shared layout for legal pages
├── Button.tsx            # Reusable button component
├── Eyebrow.tsx           # Section eyebrow label
├── SectionHead.tsx       # Section heading component
├── Reveal.tsx            # Scroll-reveal animation wrapper
└── icons.tsx             # SVG icon components

public/
├── video.mp4             # Hero background video
├── video-original.mp4    # Original uncompressed video
└── hero-poster.svg       # Video poster / fallback
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (ships with Node)

### Installation

```bash
git clone https://github.com/AndrewMoisa/nefrod.git
cd nefrod
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | ✅ | Inbox that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | — | Sender address (defaults to `onboarding@resend.dev`) |
| `CONTACT_FROM_NAME` | — | Sender display name |
| `CONTACT_AUTOREPLY` | — | Set `true` to email visitors a confirmation |
| `CONTACT_REPLY_TO` | — | Reply-To address shown on auto-reply emails |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Security Headers

The site ships with a strict Content-Security-Policy, HSTS, and other security headers configured in `next.config.mjs`. In development mode, `unsafe-eval` and WebSocket sources are permitted for HMR.

## SEO

- Structured data (JSON-LD) for `Organization` and `WebSite` schemas
- Dynamic OpenGraph image generation
- Auto-generated `robots.txt` and `sitemap.xml`
- Canonical URLs on every page
- Semantic HTML with proper heading hierarchy

## License

Private — all rights reserved.
