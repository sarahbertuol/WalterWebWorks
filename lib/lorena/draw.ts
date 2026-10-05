/**
 * Hand-drawn geometry helpers.
 *
 * Every illustration is generated from these primitives with a seeded PRNG,
 * so each petal / leaf / ray is slightly different (handmade), yet the
 * output is deterministic — server and client render identical markup.
 */

export type Pt = [number, number];

/** mulberry32 — tiny deterministic PRNG. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random in [-1, 1] scaled by amount. */
export function jit(r: () => number, amount: number) {
  return (r() * 2 - 1) * amount;
}

const n = (v: number) => Math.round(v * 100) / 100;
const p = ([x, y]: Pt) => `${n(x)} ${n(y)}`;

const rad = (deg: number) => (deg * Math.PI) / 180;

export function rotate([x, y]: Pt, deg: number, [cx, cy]: Pt = [0, 0]): Pt {
  const a = rad(deg);
  const dx = x - cx;
  const dy = y - cy;
  return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
}

export function polar(cx: number, cy: number, r: number, deg: number): Pt {
  return [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))];
}

/** Catmull-Rom → cubic Bézier, closed loop. */
export function smoothClosed(pts: Pt[], k = 1): string {
  const L = pts.length;
  let d = `M${p(pts[0])}`;
  for (let i = 0; i < L; i++) {
    const p0 = pts[(i - 1 + L) % L];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % L];
    const p3 = pts[(i + 2) % L];
    const c1: Pt = [p1[0] + ((p2[0] - p0[0]) / 6) * k, p1[1] + ((p2[1] - p0[1]) / 6) * k];
    const c2: Pt = [p2[0] - ((p3[0] - p1[0]) / 6) * k, p2[1] - ((p3[1] - p1[1]) / 6) * k];
    d += `C${p(c1)} ${p(c2)} ${p(p2)}`;
  }
  return d + "Z";
}

/** Catmull-Rom → cubic Bézier, open stroke. */
export function smoothOpen(pts: Pt[], k = 1): string {
  let d = `M${p(pts[0])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1: Pt = [p1[0] + ((p2[0] - p0[0]) / 6) * k, p1[1] + ((p2[1] - p0[1]) / 6) * k];
    const c2: Pt = [p2[0] - ((p3[0] - p1[0]) / 6) * k, p2[1] - ((p3[1] - p1[1]) / 6) * k];
    d += `C${p(c1)} ${p(c2)} ${p(p2)}`;
  }
  return d;
}

/** A slightly lumpy circle / ellipse. */
export function wobbleCircle(
  cx: number,
  cy: number,
  r: number,
  seed = 1,
  amount = 0.05,
  count = 9,
  ry = r,
): string {
  const R = rng(seed);
  const start = R() * 360;
  const pts: Pt[] = [];
  for (let i = 0; i < count; i++) {
    const a = start + (360 / count) * i;
    const k = 1 + jit(R, amount);
    pts.push([cx + Math.cos(rad(a)) * r * k, cy + Math.sin(rad(a)) * ry * k]);
  }
  return smoothClosed(pts);
}

export type PetalTip = "round" | "point" | "notch";

export interface PetalOpts {
  cx: number;
  cy: number;
  angle: number;
  inner: number;
  len: number;
  width: number;
  tip?: PetalTip;
  /** where the widest point sits along the petal, 0..1 */
  belly?: number;
  /** narrowness of the petal base, 0..1 */
  base?: number;
  seed?: number;
  jitter?: number;
}

/**
 * One petal (or leaf, ray) pointing outward from (cx, cy) at `angle`.
 * Built in local space along +x, then rotated into place.
 */
export function petal(o: PetalOpts): string {
  const R = rng(o.seed ?? 1);
  const j = o.jitter ?? 0.1;
  const len = o.len * (1 + jit(R, j));
  const w = o.width * (1 + jit(R, j));
  const belly = (o.belly ?? 0.55) + jit(R, 0.06);
  const base = o.base ?? 0.25;
  const bend = jit(R, w * 0.35); // a little asymmetry
  const x0 = o.inner;
  const x1 = o.inner + len;
  const bx = x0 + len * belly;

  const local: string[] = [];
  const tf = (pt: Pt) => p(rotate([pt[0] + o.cx, pt[1] + o.cy], o.angle + jit(R, 3), [o.cx, o.cy]));

  const b0: Pt = [x0, -w * base * 0.4];
  const b1: Pt = [x0, w * base * 0.4];
  local.push(`M${tf(b0)}`);

  if (o.tip === "notch") {
    const tA: Pt = [x1 - len * 0.04, -w * 0.38 + bend];
    const tM: Pt = [x1 - len * 0.14, bend * 0.6];
    const tB: Pt = [x1 - len * 0.02, w * 0.36 + bend];
    local.push(`C${tf([x0 + len * 0.18, -w * 0.9])} ${tf([bx, -w * 1.08 + bend])} ${tf(tA)}`);
    local.push(`Q${tf([x1 - len * 0.04, -w * 0.05 + bend])} ${tf(tM)}`);
    local.push(`Q${tf([x1 + len * 0.02, w * 0.1 + bend])} ${tf(tB)}`);
    local.push(`C${tf([bx, w * 1.08 + bend])} ${tf([x0 + len * 0.18, w * 0.9])} ${tf(b1)}`);
  } else if (o.tip === "point") {
    const tip: Pt = [x1, bend * 0.5];
    local.push(`C${tf([x0 + len * 0.2, -w * 0.95])} ${tf([bx + len * 0.12, -w * 0.9 + bend])} ${tf(tip)}`);
    local.push(`C${tf([bx + len * 0.12, w * 0.9 + bend])} ${tf([x0 + len * 0.2, w * 0.95])} ${tf(b1)}`);
  } else {
    const tip: Pt = [x1, bend * 0.4];
    local.push(`C${tf([x0 + len * 0.15, -w * 0.9])} ${tf([x1 + len * 0.02, -w * 1.15 + bend])} ${tf(tip)}`);
    local.push(`C${tf([x1 + len * 0.02, w * 1.15 + bend])} ${tf([x0 + len * 0.15, w * 0.9])} ${tf(b1)}`);
  }
  return local.join("") + "Z";
}

/** Midrib / gouache streak for a petal or leaf. */
export function rib(
  cx: number,
  cy: number,
  angle: number,
  from: number,
  to: number,
  curve = 0,
): string {
  const a = rotate([cx + from, cy], angle, [cx, cy]);
  const m = rotate([cx + (from + to) / 2, cy + curve], angle, [cx, cy]);
  const b = rotate([cx + to, cy], angle, [cx, cy]);
  return `M${p(a)}Q${p(m)} ${p(b)}`;
}

/** Cubic Bézier point + tangent angle — used to hang leaves on stems. */
export function bez(P: [Pt, Pt, Pt, Pt], t: number): { pt: Pt; angle: number } {
  const [a, b, c, d] = P;
  const mt = 1 - t;
  const x = mt ** 3 * a[0] + 3 * mt ** 2 * t * b[0] + 3 * mt * t ** 2 * c[0] + t ** 3 * d[0];
  const y = mt ** 3 * a[1] + 3 * mt ** 2 * t * b[1] + 3 * mt * t ** 2 * c[1] + t ** 3 * d[1];
  const dx = 3 * mt ** 2 * (b[0] - a[0]) + 6 * mt * t * (c[0] - b[0]) + 3 * t ** 2 * (d[0] - c[0]);
  const dy = 3 * mt ** 2 * (b[1] - a[1]) + 6 * mt * t * (c[1] - b[1]) + 3 * t ** 2 * (d[1] - c[1]);
  return { pt: [x, y], angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

export function bezPath(P: [Pt, Pt, Pt, Pt]): string {
  return `M${p(P[0])}C${p(P[1])} ${p(P[2])} ${p(P[3])}`;
}

/** Hand-drawn five-point (or n-point) star with uneven arms. */
export function star(cx: number, cy: number, R: number, r: number, points = 5, seed = 1): string {
  const rand = rng(seed);
  const pts: Pt[] = [];
  const off = -90 + jit(rand, 8);
  for (let i = 0; i < points * 2; i++) {
    const rr = (i % 2 === 0 ? R : r) * (1 + jit(rand, 0.1));
    pts.push(polar(cx, cy, rr, off + (180 / points) * i + jit(rand, 4)));
  }
  return `M${pts.map(p).join("L")}Z`;
}

/** Four-point concave sparkle. */
export function sparkle(cx: number, cy: number, R: number, pinch = 0.14, seed = 1): string {
  const rand = rng(seed);
  const k = R * pinch;
  const a = R * (1 + jit(rand, 0.08));
  const b = R * (0.78 + jit(rand, 0.08));
  return (
    `M${p([cx, cy - a])}Q${p([cx + k, cy - k])} ${p([cx + b, cy])}` +
    `Q${p([cx + k, cy + k])} ${p([cx, cy + a])}` +
    `Q${p([cx - k, cy + k])} ${p([cx - b, cy])}` +
    `Q${p([cx - k, cy - k])} ${p([cx, cy - a])}Z`
  );
}

/** Soft hand-drawn heart, centred on (cx, cy). */
export function heart(cx: number, cy: number, s: number, seed = 1): string {
  const r = rng(seed);
  const j = () => jit(r, s * 0.04);
  return (
    `M${p([cx, cy + s * 0.42])}` +
    `C${p([cx - s * 0.18 + j(), cy + s * 0.22])} ${p([cx - s * 0.62, cy + s * 0.02 + j()])} ${p([cx - s * 0.48, cy - s * 0.26])}` +
    `C${p([cx - s * 0.36, cy - s * 0.5 + j()])} ${p([cx - s * 0.06, cy - s * 0.44])} ${p([cx + j() * 0.3, cy - s * 0.2])}` +
    `C${p([cx + s * 0.08, cy - s * 0.46 + j()])} ${p([cx + s * 0.4, cy - s * 0.48])} ${p([cx + s * 0.5, cy - s * 0.24])}` +
    `C${p([cx + s * 0.6, cy + s * 0.04])} ${p([cx + s * 0.16 + j(), cy + s * 0.24])} ${p([cx, cy + s * 0.42])}Z`
  );
}

/** Ribbon strip with a V-notched end — two offset curves joined. */
export function ribbonTail(spine: Pt[], width: number, seed = 1): string {
  const rand = rng(seed);
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < spine.length; i++) {
    const a = spine[Math.max(0, i - 1)];
    const b = spine[Math.min(spine.length - 1, i + 1)];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2;
    // ribbon twists: width breathes along the spine
    const w = (width / 2) * (0.75 + 0.35 * Math.abs(Math.sin(i * 1.3 + rand())));
    left.push([spine[i][0] + Math.cos(ang) * w, spine[i][1] + Math.sin(ang) * w]);
    right.push([spine[i][0] - Math.cos(ang) * w, spine[i][1] - Math.sin(ang) * w]);
  }
  const end = spine[spine.length - 1];
  const prev = spine[spine.length - 2];
  const back: Pt = [end[0] - (end[0] - prev[0]) * 0.35, end[1] - (end[1] - prev[1]) * 0.35];
  const l = smoothOpen(left);
  const rr = smoothOpen([...right].reverse()).replace(/^M/, "L");
  return `${l}L${p(back)}${rr}Z`;
}
