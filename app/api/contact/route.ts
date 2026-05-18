import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

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

const resend = new Resend(process.env.RESEND_API_KEY);

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
  // honeypot — bots fill every field; if non-empty we'll silently 200 below.
  // The schema accepts any value so bot traffic isn't caught by Zod (which
  // would 400 it); the runtime check is the actual gate.
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

// Brand tokens shared across both email templates. Keep inline-styled emails
// in sync without copy-pasting the same hex values into a dozen places.
const EMAIL_SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const EMAIL_MONO =
  "'SF Mono','JetBrains Mono',ui-monospace,Consolas,Menlo,monospace";
const ACCENT = "${ACCENT}";
const INK = "${INK}";
const MUTED = "${MUTED}";
const FAINT = "${FAINT}";

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req.headers.get("origin"))) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  if (!process.env.RESEND_API_KEY || !TO_EMAIL) {
    console.error("[contact] missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  const ip = getIp(req);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot tripped — pretend success but don't send anything
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { name, company, email, market, message } = parsed.data;
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
  </table>
  <div style="border-left:3px solid ${ACCENT};padding:4px 0 4px 16px;white-space:pre-wrap;font-size:14px;line-height:1.55;">${escapeHtml(message)}</div>
  <p style="margin-top:32px;padding-top:16px;border-top:1px solid #e3e6ea;font-size:11px;color:${FAINT};letter-spacing:0.06em;">
    Sent ${escapeHtml(submittedAt)} · IP ${escapeHtml(ip)}
  </p>
</div>`.trim();

  // Dispatch the notification immediately so the network round-trip overlaps
  // with autoreply HTML construction below.
  const notificationTask = resend.emails.send({
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
    const submittedAtPretty = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    }).format(new Date(submittedAt));

    const autoreplyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Your request is in the queue</title>
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
        <span style="color:${INK};">§C</span><span style="color:${ACCENT};"> &middot; </span><span style="color:${MUTED};">Confirmation</span>
      </td></tr>

      <tr><td style="padding:14px 44px 0;">
        <h1 style="margin:0;font-family:${EMAIL_SANS};font-size:30px;font-weight:600;letter-spacing:-0.028em;line-height:1.06;color:${INK};">
          Your request is<br>
          <em style="font-weight:400;font-style:italic;color:${ACCENT};">in the queue.</em>
        </h1>
      </td></tr>

      <tr><td style="padding:22px 44px 0;">
        <p style="margin:0;font-family:${EMAIL_SANS};font-size:15px;line-height:1.65;color:#3a4350;">
          Thank you, <strong style="font-weight:600;color:${INK};">${escapeHtml(name)}</strong>. A Forum lead will reach out within <strong style="font-weight:600;color:${INK};">two business days</strong> with an initial corridor assessment.
        </p>
      </td></tr>

      <tr><td style="padding:34px 44px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td width="38" height="2" style="width:38px;height:2px;background:${ACCENT};font-size:0;line-height:0;">&nbsp;</td></tr></table>
      </td></tr>

      <tr><td style="padding:22px 44px 0;">
        <div style="font-family:${EMAIL_MONO};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:${FAINT};margin:0 0 14px;">Your enquiry</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:9px 0;border-top:1px solid #ededea;font-family:${EMAIL_MONO};font-size:10.5px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};width:108px;vertical-align:top;">Company</td>
            <td style="padding:9px 0;border-top:1px solid #ededea;font-family:${EMAIL_SANS};font-size:14px;color:${INK};vertical-align:top;">${escapeHtml(company)}</td>
          </tr>
          <tr>
            <td style="padding:9px 0;border-top:1px solid #ededea;font-family:${EMAIL_MONO};font-size:10.5px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};vertical-align:top;">Corridor</td>
            <td style="padding:9px 0;border-top:1px solid #ededea;font-family:${EMAIL_SANS};font-size:14px;color:${INK};vertical-align:top;">${escapeHtml(market)}</td>
          </tr>
          <tr>
            <td style="padding:9px 0;border-top:1px solid #ededea;border-bottom:1px solid #ededea;font-family:${EMAIL_MONO};font-size:10.5px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};vertical-align:top;">Submitted</td>
            <td style="padding:9px 0;border-top:1px solid #ededea;border-bottom:1px solid #ededea;font-family:${EMAIL_MONO};font-size:12px;color:#3a4350;vertical-align:top;">${escapeHtml(submittedAtPretty)}</td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="padding:30px 44px 0;">
        <p style="margin:0;font-family:${EMAIL_SANS};font-size:13.5px;line-height:1.6;color:${MUTED};font-style:italic;">
          This message is sent from an unmonitored address. To follow up, please return to the contact form.
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
              Nordic Entrepreneur Forum Rød &middot; Sandnes, Norway
            </div>
          </td></tr>
        </table>
      </td></tr>

    </table>

    <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
      <tr><td style="padding:18px 44px 0;text-align:center;font-family:${EMAIL_MONO};font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;color:${FAINT};">
        Automated confirmation &middot; Do not reply
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`.trim();

    const autoreplyText = [
      "NORDIC ENTREPRENEUR FORUM RØD",
      "—",
      "",
      "§C · CONFIRMATION",
      "",
      "Your request is in the queue.",
      "",
      `Thank you, ${name}. A Forum lead will reach out within two business`,
      "days with an initial corridor assessment.",
      "",
      "YOUR ENQUIRY",
      "————————",
      `Company     ${company}`,
      `Corridor    ${market}`,
      `Submitted   ${submittedAtPretty}`,
      "",
      "This message is sent from an unmonitored address.",
      "To follow up, please return to the contact form.",
      "",
      "—",
      "NEFrød · Nordic Entrepreneur Forum Rød",
      "Sandnes, Norway · nefrod.no",
    ].join("\n");

    autoreplyTask = resend.emails.send({
      from: FROM,
      to: [email],
      // Use the public reply address — never leak the private TO_EMAIL to visitors.
      ...(REPLY_TO ? { replyTo: REPLY_TO } : {}),
      subject: "Your enquiry is in the queue — Nordic Entrepreneur Forum Rød",
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
      { error: "Email service is unreachable. Please email us directly." },
      { status: 502 },
    );
  }
  if (notifyResult.value.error) {
    console.error("[contact] resend send error", notifyResult.value.error);
    return NextResponse.json(
      { error: "Email could not be sent. Please email us directly." },
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
