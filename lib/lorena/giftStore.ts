import { createClient } from "redis";

/**
 * Shared counter store for the gift list — any Redis the Vercel project has.
 *  1. Upstash REST (KV_REST_API_URL / KV_REST_API_TOKEN, or UPSTASH_REDIS_REST_*)
 *  2. plain Redis connection string (REDIS_URL / KV_URL) — what some Vercel
 *     Marketplace databases provide instead of REST
 * Names may carry the custom prefix Vercel offers when connecting a database
 * (e.g. convitelorena_KV_REST_API_URL) — both forms work.
 *
 * One Redis hash: field = item id, value = units marked as bought.
 */
const KEY = "lorena:presentes:v1";

/** `NAME` or `<prefix>_NAME`; returns the prefix too so URL and token come from the same database. */
function findEnv(name: string): { prefix: string; value: string } | null {
  const exact = process.env[name];
  if (exact) return { prefix: "", value: exact };
  for (const [k, v] of Object.entries(process.env)) {
    if (v && k.endsWith(`_${name}`)) return { prefix: k.slice(0, -name.length), value: v };
  }
  return null;
}

function restCreds() {
  for (const [urlName, tokenName] of [
    ["KV_REST_API_URL", "KV_REST_API_TOKEN"],
    ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
  ]) {
    const url = findEnv(urlName);
    const token = url && process.env[url.prefix + tokenName];
    if (url && token) return { url: url.value, token };
  }
  return null;
}
const redisUrl = () => findEnv("REDIS_URL")?.value || findEnv("KV_URL")?.value || "";

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

/* ---------- RSVP replies (same database, one list) ---------- */

const RSVP_KEY = "lorena:rsvp:v1";

export type RsvpEntry = { em: string; cidade: string; nome: string; vem: "sim" | "nao"; pessoas: number; obs: string };

async function command<T>(args: string[]): Promise<T> {
  if (restCreds()) return rest<T>(args);
  return (await (await tcpClient()).sendCommand(args)) as T;
}

export async function rsvpAdd(entry: RsvpEntry): Promise<void> {
  await command(["RPUSH", RSVP_KEY, JSON.stringify(entry)]);
}

/** Every reply, oldest first. */
export async function rsvpAll(): Promise<RsvpEntry[]> {
  const raw = (await command<string[]>(["LRANGE", RSVP_KEY, "0", "-1"])) ?? [];
  return raw.flatMap((r) => {
    try {
      return [JSON.parse(r) as RsvpEntry];
    } catch {
      return [];
    }
  });
}
