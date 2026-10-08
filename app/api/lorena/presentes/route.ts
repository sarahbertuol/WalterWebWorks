import { NextResponse } from "next/server";
import { giftMax } from "@/lib/lorena/gifts";
import { claim, giftStoreConfigured, readClaims } from "@/lib/lorena/giftStore";

/**
 * Gift list counters.
 *  GET  → { ok, claims: { itemId: units } }
 *  POST { id, delta } → mark (+) or undo (−) units of one item.
 * No sign-in by design: guests only say "I bought this".
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (error: string, status: number, extra: object = {}) => NextResponse.json({ ok: false, error, ...extra }, { status });
const noStore = { headers: { "Cache-Control": "no-store" } };

export async function GET() {
  if (!giftStoreConfigured()) return fail("not-configured", 503);
  try {
    return NextResponse.json({ ok: true, claims: await readClaims() }, noStore);
  } catch {
    return fail("upstream", 502);
  }
}

export async function POST(req: Request) {
  if (!giftStoreConfigured()) return fail("not-configured", 503);
  let body: { id?: unknown; delta?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail("invalid", 400);
  }
  const id = typeof body.id === "string" ? body.id : "";
  const max = giftMax(id);
  const delta = Number(body.delta);
  if (max === null || !Number.isInteger(delta) || delta === 0 || Math.abs(delta) > max) return fail("invalid", 400);

  try {
    const r = await claim(id, delta, max);
    // not applied = someone got there first (or nothing left to undo)
    return r.applied ? NextResponse.json({ ok: true, value: r.value }, noStore) : fail("conflict", 409, { value: r.value });
  } catch {
    return fail("upstream", 502);
  }
}
