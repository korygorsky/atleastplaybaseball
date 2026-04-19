// Vercel serverless function — POST /api/corrections
// Accepts { name?, email?, message, website? } and emails the site owner via Resend.
// Rate-limited via Upstash Redis: 3 submissions per 10 min per IP + 60/hr global cap.
// Env vars required (set in Vercel dashboard):
//   RESEND_API_KEY             — Resend API token
//   RECIPIENT_EMAIL            — where submissions are delivered
//   SENDER_EMAIL               — optional; defaults to onboarding@resend.dev
//   UPSTASH_REDIS_REST_URL     — Upstash Redis REST URL
//   UPSTASH_REDIS_REST_TOKEN   — Upstash Redis REST token

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const config = { runtime: 'edge' };

const redis = Redis.fromEnv();

const perIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '10 m'),
  prefix: 'corr:ip',
  analytics: false,
});

const globalLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '1 h'),
  prefix: 'corr:global',
  analytics: false,
});

const MAX_MESSAGE_LEN = 5000;
const MAX_NAME_LEN = 120;
const MAX_EMAIL_LEN = 200;

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

function clientIp(req: Request) {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
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

  // Global cap first — cheapest guardrail.
  const gl = await globalLimiter.limit('all');
  if (!gl.success) {
    const retry = Math.max(1, Math.ceil((gl.reset - Date.now()) / 1000));
    return json({ ok: false, error: 'rate_limited_global' }, 429, { 'Retry-After': String(retry) });
  }

  const ip = clientIp(req);
  const rl = await perIpLimiter.limit(ip);
  if (!rl.success) {
    const retry = Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000));
    return json({ ok: false, error: 'rate_limited' }, 429, { 'Retry-After': String(retry) });
  }

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
