import { type NextRequest, NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";
import { z } from "zod";
import { intlLocale, routing, type Locale } from "@/i18n/routing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const FROM_NAME =
  process.env.CONTACT_FROM_NAME ?? "Nordic Entrepreneur Forum Rød";
const AUTOREPLY = process.env.CONTACT_AUTOREPLY === "true";
// Public reply address shown to visitors on the autoreply Reply-To header.
// If unset, no Reply-To is added (replies fall back to the From address).
const REPLY_TO = process.env.CONTACT_REPLY_TO;
const FROM = `${FROM_NAME} <${FROM_EMAIL}>`;

// Lazy-initialised so module load doesn't throw during build collection when
// RESEND_API_KEY is unset (e.g., local builds without .env.local).
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

// Allowed browser origins for /api/contact POSTs. Same-origin browser requests
// always include the Origin header; rejecting unknown origins blocks trivial
// off-site abuse (curl, cross-site form posts, etc).
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    if (process.env.NODE_ENV !== "production") {
      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return true;
      }
    }
    return url.hostname === "nefrod.no" || url.hostname === "www.nefrod.no";
  } catch {
    return false;
  }
}

// Strip CR/LF from any value that lands in an email header. Resend's JSON API
// already neutralizes this, but defense-in-depth costs us nothing.
function singleLine(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}

const submissionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(160),
  market: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(4000),
  locale: z.enum(routing.locales).optional().default(routing.defaultLocale),
  // honeypot — bots fill every field; if non-empty we'll silently 200 below.
  website: z.string().max(200).optional().default(""),
});

// In-process rate limit — per-IP, 5 submissions per 60s window.
// Resets on serverless cold start; swap with Upstash Redis for stronger guarantees.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const HITS_SWEEP_THRESHOLD = 1000;
type Hit = { count: number; resetAt: number };
const hits = new Map<string, Hit>();

function rateLimit(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  if (hits.size > HITS_SWEEP_THRESHOLD) {
    for (const [key, hit] of hits) {
      if (hit.resetAt < now) hits.delete(key);
    }
  }
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }
  if (entry.count >= RATE_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, retryAfter: 0 };
}

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Best-effort locale hint before we've parsed the body — falls back to default.
// Used for the early validation error responses where we don't have the body yet.
function localeFromRequest(req: NextRequest): Locale {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && (routing.locales as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      const seg = url.pathname.split("/")[1];
      if (seg && (routing.locales as readonly string[]).includes(seg)) {
        return seg as Locale;
      }
    } catch {
      // ignore
    }
  }
  return routing.defaultLocale;
}

async function errorBody(locale: Locale, key: string) {
  const t = await getTranslations({ locale, namespace: "ContactEmail.errors" });
  return { error: t(key as never) };
}

// Brand tokens shared across both email templates. Keep inline-styled emails
// in sync without copy-pasting the same hex values into a dozen places.
const EMAIL_SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const EMAIL_MONO =
  "'SF Mono','JetBrains Mono',ui-monospace,Consolas,Menlo,monospace";
const ACCENT = "#ba0c2f";
const INK = "#0b1722";
const MUTED = "#5d6773";
const FAINT = "#8b97a4";

export async function POST(req: NextRequest) {
  const earlyLocale = localeFromRequest(req);

  if (!isAllowedOrigin(req.headers.get("origin"))) {
    return NextResponse.json(await errorBody(earlyLocale, "forbidden"), {
      status: 403,
    });
  }

  if (!process.env.RESEND_API_KEY || !TO_EMAIL) {
    console.error("[contact] missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json(
      await errorBody(earlyLocale, "notConfigured"),
      { status: 500 },
    );
  }

  const ip = getIp(req);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      await errorBody(earlyLocale, "rateLimited"),
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(await errorBody(earlyLocale, "invalidJson"), {
      status: 400,
    });
  }

  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    const tErr = await getTranslations({
      locale: earlyLocale,
      namespace: "ContactEmail.errors",
    });
    return NextResponse.json(
      {
        error: tErr("validation"),
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot tripped — pretend success but don't send anything
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { name, company, email, market, message, locale } = parsed.data;

  // Translations scoped to the form submitter's locale.
  const tAuto = await getTranslations({
    locale,
    namespace: "ContactEmail.autoreply",
  });
  const tSubj = await getTranslations({
    locale,
    namespace: "ContactEmail",
  });
  const tErr = await getTranslations({
    locale,
    namespace: "ContactEmail.errors",
  });

  // Internal notification stays in English regardless of submitter locale —
  // the desk team works in mixed languages and a stable subject is easier to triage.
  const subject = singleLine(
    `New corridor enquiry — ${company} → ${market}`,
  );
  const submittedAt = new Date().toISOString();

  const text = [
    `Name:    ${name}`,
    `Company: ${company}`,
    `Email:   ${email}`,
    `Market:  ${market}`,
    "",
    "Message:",
    message,
    "",
    `— sent ${submittedAt} from ip ${ip}`,
  ].join("\n");

  const html = `
<div style="font-family:${EMAIL_SANS};max-width:600px;color:${INK};">
  <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};">
    New corridor enquiry · ${escapeHtml(market)}
  </p>
  <h2 style="margin:0 0 24px;font-size:22px;font-weight:600;letter-spacing:-0.01em;">
    ${escapeHtml(name)} — ${escapeHtml(company)}
  </h2>
  <table style="border-collapse:collapse;width:100%;margin-bottom:24px;font-size:14px;">
    <tr><td style="padding:6px 0;color:${MUTED};width:90px;">Name</td><td>${escapeHtml(name)}</td></tr>
    <tr><td style="padding:6px 0;color:${MUTED};">Company</td><td>${escapeHtml(company)}</td></tr>
    <tr><td style="padding:6px 0;color:${MUTED};">Email</td><td><a href="mailto:${escapeHtml(email)}" style="color:${ACCENT};text-decoration:none;">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding:6px 0;color:${MUTED};">Market</td><td>${escapeHtml(market)}</td></tr>
    <tr><td style="padding:6px 0;color:${MUTED};">Locale</td><td>${escapeHtml(locale)}</td></tr>
  </table>
  <div style="border-left:3px solid ${ACCENT};padding:4px 0 4px 16px;white-space:pre-wrap;font-size:14px;line-height:1.55;">${escapeHtml(message)}</div>
  <p style="margin-top:32px;padding-top:16px;border-top:1px solid #e3e6ea;font-size:11px;color:${FAINT};letter-spacing:0.06em;">
    Sent ${escapeHtml(submittedAt)} · IP ${escapeHtml(ip)}
  </p>
</div>`.trim();

  // Dispatch the notification immediately so the network round-trip overlaps
  // with autoreply HTML construction below.
  const notificationTask = getResend().emails.send({
    from: FROM,
    to: [TO_EMAIL],
    replyTo: email,
    subject,
    text,
    html,
  });

  // Optional autoreply — only when CONTACT_AUTOREPLY=true and
  // CONTACT_FROM_EMAIL is on a domain verified in Resend.
  let autoreplyTask: typeof notificationTask | null = null;
  if (AUTOREPLY) {
    const submittedAtPretty = new Intl.DateTimeFormat(intlLocale[locale], {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    }).format(new Date(submittedAt));

    const autoreplyHtml = `<!DOCTYPE html>
<html lang="${locale === "no" ? "nb" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(tAuto("previewTitle"))}</title>
</head>
<body style="margin:0;padding:0;background:#f4f3ef;-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f3ef;padding:40px 12px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e6e5df;">

      <tr><td style="padding:44px 44px 0;">
        <div style="font-family:${EMAIL_SANS};font-size:13px;font-weight:800;letter-spacing:-0.045em;line-height:1;color:${INK};">NEF</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;border-collapse:collapse;"><tr><td width="38" height="3" style="width:38px;height:3px;background:${ACCENT};font-size:0;line-height:0;">&nbsp;</td></tr></table>
      </td></tr>

      <tr><td style="padding:38px 44px 0;font-family:${EMAIL_MONO};font-size:10.5px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;">
        <span style="color:${INK};">§C</span><span style="color:${ACCENT};"> &middot; </span><span style="color:${MUTED};">${escapeHtml(tAuto("kicker"))}</span>
      </td></tr>

      <tr><td style="padding:14px 44px 0;">
        <h1 style="margin:0;font-family:${EMAIL_SANS};font-size:30px;font-weight:600;letter-spacing:-0.028em;line-height:1.06;color:${INK};">
          ${escapeHtml(tAuto("headingLine1"))}<br>
          <em style="font-weight:400;font-style:italic;color:${ACCENT};">${escapeHtml(tAuto("headingLine2"))}</em>
        </h1>
      </td></tr>

      <tr><td style="padding:22px 44px 0;">
        <p style="margin:0;font-family:${EMAIL_SANS};font-size:15px;line-height:1.65;color:#3a4350;">
          ${tAuto("greeting", {
            name: `<strong style="font-weight:600;color:${INK};">${escapeHtml(name)}</strong>`,
          })}
        </p>
      </td></tr>

      <tr><td style="padding:34px 44px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td width="38" height="2" style="width:38px;height:2px;background:${ACCENT};font-size:0;line-height:0;">&nbsp;</td></tr></table>
      </td></tr>

      <tr><td style="padding:22px 44px 0;">
        <div style="font-family:${EMAIL_MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:${FAINT};margin:0 0 14px;">${escapeHtml(tAuto("summaryLabel"))}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:9px 0;border-top:1px solid #ededea;font-family:${EMAIL_MONO};font-size:10.5px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};width:108px;vertical-align:top;">${escapeHtml(tAuto("labels.company"))}</td>
            <td style="padding:9px 0;border-top:1px solid #ededea;font-family:${EMAIL_SANS};font-size:14px;color:${INK};vertical-align:top;">${escapeHtml(company)}</td>
          </tr>
          <tr>
            <td style="padding:9px 0;border-top:1px solid #ededea;font-family:${EMAIL_MONO};font-size:10.5px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};vertical-align:top;">${escapeHtml(tAuto("labels.corridor"))}</td>
            <td style="padding:9px 0;border-top:1px solid #ededea;font-family:${EMAIL_SANS};font-size:14px;color:${INK};vertical-align:top;">${escapeHtml(market)}</td>
          </tr>
          <tr>
            <td style="padding:9px 0;border-top:1px solid #ededea;border-bottom:1px solid #ededea;font-family:${EMAIL_MONO};font-size:10.5px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};vertical-align:top;">${escapeHtml(tAuto("labels.submitted"))}</td>
            <td style="padding:9px 0;border-top:1px solid #ededea;border-bottom:1px solid #ededea;font-family:${EMAIL_MONO};font-size:12px;color:#3a4350;vertical-align:top;">${escapeHtml(submittedAtPretty)}</td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="padding:30px 44px 0;">
        <p style="margin:0;font-family:${EMAIL_SANS};font-size:13.5px;line-height:1.6;color:${MUTED};font-style:italic;">
          ${escapeHtml(tAuto("unmonitored"))}
        </p>
      </td></tr>

      <tr><td style="padding:40px 44px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e6e5df;border-collapse:collapse;">
          <tr><td style="padding-top:20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:${EMAIL_SANS};font-size:12px;font-weight:700;letter-spacing:-0.025em;color:${INK};">NEFrød</td>
                <td align="right" style="font-family:${EMAIL_MONO};font-size:10px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:${FAINT};">nefrod.no</td>
              </tr>
            </table>
            <div style="margin-top:6px;font-family:${EMAIL_MONO};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${FAINT};">
              ${escapeHtml(tAuto("footerLocation"))}
            </div>
          </td></tr>
        </table>
      </td></tr>

    </table>

    <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
      <tr><td style="padding:18px 44px 0;text-align:center;font-family:${EMAIL_MONO};font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;color:${FAINT};">
        ${escapeHtml(tAuto("footerNote"))}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`.trim();

    const autoreplyText = [
      tAuto("textHeader"),
      "—",
      "",
      tAuto("textKicker"),
      "",
      tAuto("textHeadline"),
      "",
      tAuto("textGreeting", { name }),
      tAuto("textGreetingLine2"),
      "",
      tAuto("textSummaryLabel"),
      "————————",
      tAuto("textCompany", { company }),
      tAuto("textCorridor", { market }),
      tAuto("textSubmitted", { date: submittedAtPretty }),
      "",
      tAuto("textUnmonitored1"),
      tAuto("textUnmonitored2"),
      "",
      "—",
      tAuto("textBrand"),
      tAuto("textLocation"),
    ].join("\n");

    autoreplyTask = getResend().emails.send({
      from: FROM,
      to: [email],
      // Use the public reply address — never leak the private TO_EMAIL to visitors.
      ...(REPLY_TO ? { replyTo: REPLY_TO } : {}),
      subject: tSubj("autoreply.subject"),
      text: autoreplyText,
      html: autoreplyHtml,
    });
  }

  const [notifyResult, autoreplyResult] = await Promise.allSettled([
    notificationTask,
    autoreplyTask ?? Promise.resolve(null),
  ]);

  if (notifyResult.status === "rejected") {
    console.error("[contact] resend exception", notifyResult.reason);
    return NextResponse.json(
      { error: tErr("unreachable") },
      { status: 502 },
    );
  }
  if (notifyResult.value.error) {
    console.error("[contact] resend send error", notifyResult.value.error);
    return NextResponse.json(
      { error: tErr("sendFailed") },
      { status: 502 },
    );
  }

  // Autoreply failures are non-fatal — log and continue.
  if (autoreplyTask) {
    if (autoreplyResult.status === "rejected") {
      console.warn("[contact] autoreply failed", autoreplyResult.reason);
    } else if (autoreplyResult.value?.error) {
      console.warn(
        "[contact] autoreply send error",
        autoreplyResult.value.error,
      );
    }
  }

  return NextResponse.json({ ok: true });
}
