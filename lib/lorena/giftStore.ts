/**
 * Shared counter store for the gift list — Upstash Redis over its REST API
 * (no SDK). Works with the env names Vercel's Upstash integration injects
 * (KV_REST_API_URL / KV_REST_API_TOKEN) or Upstash's own.
 *
 * One Redis hash: field = item id, value = units marked as bought.
 */
const KEY = "lorena:presentes:v1";

function creds() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

export const giftStoreConfigured = () => creds() !== null;

async function command<T>(args: (string | number)[]): Promise<T> {
  const c = creds();
  if (!c) throw new Error("not-configured");
  const res = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args.map(String)),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  const data = (await res.json().catch(() => ({}))) as { result?: T; error?: string };
  if (!res.ok || data.error) throw new Error(data.error || `upstash ${res.status}`);
  return data.result as T;
}

/** Everything marked so far: { itemId: units }. */
export async function readClaims(): Promise<Record<string, number>> {
  const flat = (await command<string[]>(["HGETALL", KEY])) ?? [];
  const out: Record<string, number> = {};
  for (let i = 0; i < flat.length; i += 2) out[flat[i]] = Number(flat[i + 1]) || 0;
  return out;
}

/**
 * Atomically add `delta` (may be negative = undo) to an item, refusing any
 * change that would go below 0 or above `max`. Two guests tapping the same
 * item at the same moment can't both win.
 */
const CLAIM = `
local cur = tonumber(redis.call('HGET', KEYS[1], ARGV[1]) or '0')
local nxt = cur + tonumber(ARGV[2])
if nxt < 0 or nxt > tonumber(ARGV[3]) then return {cur, 0} end
redis.call('HSET', KEYS[1], ARGV[1], nxt)
return {nxt, 1}`;

export async function claim(id: string, delta: number, max: number): Promise<{ value: number; applied: boolean }> {
  const [value, applied] = await command<[number, number]>(["EVAL", CLAIM, 1, KEY, id, delta, max]);
  return { value: Number(value), applied: Number(applied) === 1 };
}
