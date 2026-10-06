import { NextResponse } from "next/server";

/**
 * RSVP → Google Sheets.
 * The browser posts here; this route validates the reply and forwards it to a
 * Google Apps Script web app (LORENA_RSVP_WEBHOOK) that appends a row to the
 * sheet. Going through the server avoids CORS and keeps the script URL and
 * shared secret (LORENA_RSVP_SECRET) out of the page. Setup: docs/lorena/README.md
 */
export const runtime = "nodejs";

const text = (v: unknown, max: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("invalid", 400);
  }

  // honeypot: real guests never see this field — bots fill it. Pretend success.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const nome = text(body.nome, 120);
  const vem = body.vem === "sim" || body.vem === "nao" ? body.vem : "";
  const pessoas = vem === "sim" ? Math.min(6, Math.max(1, Number.parseInt(String(body.pessoas), 10) || 1)) : 0;
  const obs = String(body.obs ?? "").trim().slice(0, 1000);
  if (!nome || !vem) return fail("missing-fields", 400);

  const webhook = process.env.LORENA_RSVP_WEBHOOK;
  if (!webhook) return fail("not-configured", 503);

  try {
    // Apps Script answers with a 302 to googleusercontent.com; fetch follows it.
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: process.env.LORENA_RSVP_SECRET ?? "", nome, vem, pessoas, obs }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !data?.ok) return fail("upstream", 502);
  } catch {
    return fail("upstream", 502);
  }

  return NextResponse.json({ ok: true });
}
