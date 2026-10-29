import { NextResponse } from "next/server";
import { editions, isEditionSlug } from "@/lib/lorena/editions";
import { giftStoreConfigured, rsvpAdd, rsvpAll, type RsvpEntry } from "@/lib/lorena/giftStore";
import { adminKeyOk, rsvpCsv } from "@/lib/lorena/rsvpAdmin";

/**
 * RSVP.
 * POST (guest): validates the reply and saves it in the project's Redis
 * (same database as the gift list). If LORENA_RSVP_WEBHOOK is set, it is also
 * appended to the Google Sheet (Apps Script, shared secret LORENA_RSVP_SECRET).
 * GET ?chave=<LORENA_ADMIN_KEY>: every reply as a CSV file (opens in Sheets/Excel).
 * Setup: docs/lorena/README.md
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  if (!nome || !vem || !isEditionSlug(body.cidade)) return fail("missing-fields", 400);
  const cidade = editions[body.cidade].city;

  const webhook = process.env.LORENA_RSVP_WEBHOOK;
  if (!giftStoreConfigured() && !webhook) return fail("not-configured", 503);

  const entry: RsvpEntry = { em: new Date().toISOString(), cidade, nome, vem, pessoas, obs };
  let saved = false;

  if (giftStoreConfigured()) {
    try {
      await rsvpAdd(entry);
      saved = true;
    } catch {
      /* fall through to the sheet */
    }
  }

  if (webhook) {
    try {
      // Apps Script answers with a 302 to googleusercontent.com; fetch follows it.
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: process.env.LORENA_RSVP_SECRET ?? "", cidade, nome, vem, pessoas, obs }),
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (res.ok && data?.ok) saved = true;
    } catch {
      /* the database copy (if any) still counts */
    }
  }

  return saved ? NextResponse.json({ ok: true }) : fail("upstream", 502);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (!adminKeyOk(url.searchParams.get("chave"))) return fail("forbidden", 403);
  const csv = rsvpCsv(await rsvpAll());
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="confirmacoes-lorena.csv"',
      "Cache-Control": "no-store",
    },
  });
}
