import { createClient } from "redis";

/**
 * Shared counter store for the gift list — any Redis the Vercel project has.
 *  1. Upstash REST (KV_REST_API_URL / KV_REST_API_TOKEN, or UPSTASH_REDIS_REST_*)
 *  2. plain Redis connection string (REDIS_URL / KV_URL) — what some Vercel
 *     Marketplace databases provide instead of REST
 *
 * One Redis hash: field = item id, value = units marked as bought.
 */
const KEY = "lorena:presentes:v1";

function restCreds() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}
const redisUrl = () => process.env.REDIS_URL || process.env.KV_URL || "";

export const giftStoreConfigured = () => restCreds() !== null || redisUrl() !== "";

/* ---------- REST (Upstash) ---------- */

async function rest<T>(args: (string | number)[]): Promise<T> {
  const c = restCreds();
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

/* ---------- TCP (REDIS_URL) — one connection reused across requests ---------- */

type Tcp = ReturnType<typeof createClient>;
let tcp: Promise<Tcp> | null = null;

function tcpClient(): Promise<Tcp> {
  if (!tcp) {
    const client = createClient({ url: redisUrl(), socket: { connectTimeout: 8000 } });
    client.on("error", () => {
      tcp = null; // reconnect on the next request
    });
    tcp = client.connect().then(() => client);
    tcp.catch(() => {
      tcp = null;
    });
  }
  return tcp;
}

/* ---------- API ---------- */

/** Everything marked so far: { itemId: units }. */
export async function readClaims(): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  if (restCreds()) {
    const flat = (await rest<string[]>(["HGETALL", KEY])) ?? [];
    for (let i = 0; i < flat.length; i += 2) out[flat[i]] = Number(flat[i + 1]) || 0;
  } else {
    const all = await (await tcpClient()).hGetAll(KEY);
    for (const [k, v] of Object.entries(all)) out[k] = Number(v) || 0;
  }
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
  const [value, applied] = restCreds()
    ? await rest<[number, number]>(["EVAL", CLAIM, 1, KEY, id, delta, max])
    : ((await (await tcpClient()).eval(CLAIM, { keys: [KEY], arguments: [id, String(delta), String(max)] })) as [number, number]);
  return { value: Number(value), applied: Number(applied) === 1 };
}
