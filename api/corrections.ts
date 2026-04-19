// Vercel serverless function — POST /api/corrections
// Accepts { name?, email?, message, website? } and emails the site owner via Resend.
// Env vars required (set in Vercel dashboard):
//   RESEND_API_KEY   — Resend API token
//   RECIPIENT_EMAIL  — where submissions are delivered
//   SENDER_EMAIL     — optional; defaults to onboarding@resend.dev

export const config = { runtime: 'edge' };

const MAX_MESSAGE_LEN = 5000;
const MAX_NAME_LEN = 120;
const MAX_EMAIL_LEN = 200;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  // Honeypot — real submissions leave this empty.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME_LEN) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, MAX_EMAIL_LEN) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE_LEN) : '';

  if (!message || message.length < 4) return json({ ok: false, error: 'message_required' }, 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: 'bad_email' }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RECIPIENT_EMAIL;
  const from = process.env.SENDER_EMAIL || 'At Least Play Baseball <onboarding@resend.dev>';
  if (!apiKey || !to) {
    console.error('corrections: missing RESEND_API_KEY or RECIPIENT_EMAIL');
    return json({ ok: false, error: 'server_not_configured' }, 500);
  }

  const subject = `Correction / comment${name ? ` from ${name}` : ''}`;
  const replyTo = email || undefined;

  const plain =
    `New submission from the Gaffney Park record\n\n` +
    `Name:    ${name || '(not provided)'}\n` +
    `Email:   ${email || '(not provided)'}\n\n` +
    `Message:\n${message}\n`;

  const html =
    `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#1C1D1F;">` +
    `<p style="margin:0 0 12px;color:#55585D;">New submission from the Gaffney Park record.</p>` +
    `<table style="border-collapse:collapse;margin-bottom:16px;">` +
    `<tr><td style="padding:2px 12px 2px 0;color:#55585D;">Name</td><td>${escapeHtml(name || '(not provided)')}</td></tr>` +
    `<tr><td style="padding:2px 12px 2px 0;color:#55585D;">Email</td><td>${escapeHtml(email || '(not provided)')}</td></tr>` +
    `</table>` +
    `<div style="white-space:pre-wrap;border-left:3px solid #3E6B7A;padding:4px 0 4px 12px;">${escapeHtml(message)}</div>` +
    `</div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: plain,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('resend_failed', res.status, detail);
    return json({ ok: false, error: 'send_failed' }, 502);
  }

  return json({ ok: true });
}
