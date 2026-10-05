/**
 * Flower heads, leaves & stems — the building blocks every larger
 * composition is assembled from. All drawn by the "same hand":
 * burgundy ink line, out-of-register colour plate, gouache streaks.
 */
import { C } from "@/lib/lorena/tokens";
import { petal, rib, wobbleCircle, polar, rng, jit, type Pt } from "@/lib/lorena/draw";
import { Riso, Ink } from "./primitives";

type Head = { cx: number; cy: number; s: number; seed?: number; rot?: number };

const ring = (count: number, rot: number, seed: number) =>
  Array.from({ length: count }, (_, i) => ({ a: rot + (360 / count) * i, seed: seed * 31 + i }));

/* ---------------------------------------------------------- Large heads */

export function AnemoneHead({ cx, cy, s, seed = 1, rot = 0 }: Head) {
  const back = ring(6, rot + 30, seed + 7);
  const front = ring(6, rot, seed);
  return (
    <g>
      {back.map(({ a, seed: sd }) => (
        <Riso key={`b${a}`} d={petal({ cx, cy, angle: a, inner: s * 0.05, len: s * 0.92, width: s * 0.36, seed: sd })} fill={C.blush} opacity={0.55} sw={1.3} />
      ))}
      {front.map(({ a, seed: sd }) => (
        <g key={`f${a}`}>
          <Riso d={petal({ cx, cy, angle: a, inner: s * 0.04, len: s * 0.86, width: s * 0.4, seed: sd })} fill={C.blush} />
          <Ink d={rib(cx, cy, a - 7, s * 0.26, s * 0.62, s * 0.03)} sw={1} opacity={0.45} />
          <Ink d={rib(cx, cy, a + 8, s * 0.3, s * 0.55, -s * 0.03)} sw={1} opacity={0.35} />
        </g>
      ))}
      {Array.from({ length: 18 }, (_, i) => {
        const a = rot + i * 20;
        const [x1, y1] = polar(cx, cy, s * 0.2, a);
        const [x2, y2] = polar(cx, cy, s * (0.3 + (i % 3) * 0.025), a);
        return (
          <g key={`st${i}`}>
            <Ink d={`M${x1} ${y1}L${x2} ${y2}`} sw={1} />
            <circle cx={x2} cy={y2} r={s * 0.018} fill={C.ink} />
          </g>
        );
      })}
      <Riso d={wobbleCircle(cx, cy, s * 0.17, seed + 3, 0.08)} fill={C.ink} off={[1, 1]} />
      {Array.from({ length: 7 }, (_, i) => {
        const [x, y] = polar(cx, cy, s * 0.08, i * 51 + rot);
        return <circle key={`d${i}`} cx={x} cy={y} r={s * 0.018} fill={C.sun} />;
      })}
    </g>
  );
}

export function RanunculusHead({ cx, cy, s, seed = 2, rot = 0 }: Head) {
  const r = rng(seed);
  return (
    <g>
      {ring(9, rot, seed).map(({ a, seed: sd }) => (
        <Riso key={`o${a}`} d={petal({ cx, cy, angle: a, inner: 0, len: s * 0.95, width: s * 0.36, seed: sd, belly: 0.66 })} fill={C.blush} />
      ))}
      {ring(9, rot, seed).map(({ a }) => (
        <Ink key={`ol${a}`} d={rib(cx, cy, a + jit(r, 6), s * 0.6, s * 0.82, s * 0.08)} sw={1} opacity={0.4} />
      ))}
      {ring(7, rot + 22, seed + 5).map(({ a, seed: sd }) => (
        <Riso key={`m${a}`} d={petal({ cx, cy, angle: a, inner: 0, len: s * 0.66, width: s * 0.32, seed: sd, belly: 0.7 })} fill={C.blush} sw={1.5} />
      ))}
      {ring(5, rot + 10, seed + 9).map(({ a, seed: sd }) => (
        <Riso key={`i${a}`} d={petal({ cx, cy, angle: a, inner: 0, len: s * 0.42, width: s * 0.26, seed: sd, belly: 0.7 })} fill={C.ink} sw={1.4} />
      ))}
      <Riso d={wobbleCircle(cx, cy, s * 0.14, seed + 2, 0.1)} fill={C.ink} />
      <Ink d={`M${cx - s * 0.08} ${cy + s * 0.02}q${s * 0.06} ${-s * 0.1} ${s * 0.13} ${-s * 0.02}q${-s * 0.02} ${s * 0.06} ${-s * 0.07} ${s * 0.05}`} sw={1.2} color={C.ivory} />
    </g>
  );
}

export function CosmosHead({ cx, cy, s, seed = 3, rot = 0 }: Head) {
  return (
    <g>
      {ring(8, rot, seed).map(({ a, seed: sd }) => (
        <g key={a}>
          <Riso d={petal({ cx, cy, angle: a, inner: s * 0.08, len: s * 0.88, width: s * 0.3, tip: "notch", seed: sd, belly: 0.62 })} fill={C.sun} />
          <Ink d={rib(cx, cy, a, s * 0.24, s * 0.7, s * 0.02)} sw={1} opacity={0.4} />
        </g>
      ))}
      <Riso d={wobbleCircle(cx, cy, s * 0.18, seed + 4, 0.08)} fill={C.stem} off={[1, 1]} />
      {Array.from({ length: 11 }, (_, i) => {
        const [x, y] = polar(cx, cy, s * (i % 2 ? 0.1 : 0.05), i * 33 + rot);
        return <circle key={i} cx={x} cy={y} r={s * 0.022} fill={C.sun} />;
      })}
    </g>
  );
}

/* ---------------------------------------------------------- Small heads */

export function DaisyHead({ cx, cy, s, seed = 4, rot = 0 }: Head) {
  return (
    <g>
      {ring(15, rot, seed).map(({ a, seed: sd }) => (
        <Riso key={a} d={petal({ cx, cy, angle: a, inner: s * 0.16, len: s * 0.8, width: s * 0.13, seed: sd, jitter: 0.14 })} fill={C.ivory} sw={1.3} off={[1, 0.8]} />
      ))}
      <Riso d={wobbleCircle(cx, cy, s * 0.24, seed + 1, 0.07)} fill={C.sun} sw={1.4} />
      {Array.from({ length: 8 }, (_, i) => {
        const [x, y] = polar(cx, cy, s * (i % 2 ? 0.13 : 0.07), i * 45 + rot);
        return <circle key={i} cx={x} cy={y} r={s * 0.025} fill={C.ink} opacity={0.7} />;
      })}
    </g>
  );
}

export function ForgetMeNotHead({ cx, cy, s, seed = 5, rot = 0 }: Head) {
  return (
    <g>
      {ring(5, rot, seed).map(({ a, seed: sd }) => (
        <Riso key={a} d={petal({ cx, cy, angle: a, inner: s * 0.06, len: s * 0.62, width: s * 0.5, seed: sd, belly: 0.62 })} fill={C.blush} sw={1.3} off={[1, 0.8]} />
      ))}
      <circle cx={cx} cy={cy} r={s * 0.16} fill={C.sun} stroke={C.ink} strokeWidth={1.2} />
      <circle cx={cx} cy={cy} r={s * 0.05} fill={C.ink} />
    </g>
  );
}

/** Mediterranean — orange / lemon blossom. */
export function BlossomHead({ cx, cy, s, seed = 6, rot = 0 }: Head) {
  return (
    <g>
      {ring(5, rot, seed).map(({ a, seed: sd }) => (
        <g key={a}>
          <Riso d={petal({ cx, cy, angle: a, inner: s * 0.05, len: s * 0.86, width: s * 0.3, tip: "point", seed: sd, belly: 0.5 })} fill={C.ivory} sw={1.4} off={[1, 0.8]} />
          <Ink d={rib(cx, cy, a, s * 0.2, s * 0.55)} sw={0.9} opacity={0.35} />
        </g>
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const a = rot + i * 40 + 12;
        const [x2, y2] = polar(cx, cy, s * 0.32, a);
        return (
          <g key={i}>
            <Ink d={`M${cx} ${cy}L${x2} ${y2}`} sw={0.9} />
            <circle cx={x2} cy={y2} r={s * 0.04} fill={C.sun} stroke={C.ink} strokeWidth={0.7} />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={s * 0.08} fill={C.sun} stroke={C.ink} strokeWidth={1} />
    </g>
  );
}

export function Bud({ x, y, s, angle = -90, seed = 7, fill = C.blush }: { x: number; y: number; s: number; angle?: number; seed?: number; fill?: string }) {
  return (
    <g>
      <Riso d={petal({ cx: x, cy: y, angle, inner: 0, len: s, width: s * 0.38, tip: "point", seed, belly: 0.4 })} fill={fill} sw={1.4} />
      <Ink d={rib(x, y, angle, s * 0.15, s * 0.8, s * 0.06)} sw={0.9} opacity={0.45} />
      <Riso d={petal({ cx: x, cy: y, angle: angle - 32, inner: 0, len: s * 0.42, width: s * 0.12, tip: "point", seed: seed + 1 })} fill={C.stem} sw={1.1} off={[0.6, 0.6]} />
      <Riso d={petal({ cx: x, cy: y, angle: angle + 30, inner: 0, len: s * 0.4, width: s * 0.12, tip: "point", seed: seed + 2 })} fill={C.stem} sw={1.1} off={[0.6, 0.6]} />
    </g>
  );
}

/* ---------------------------------------------------------- Leaves & stems */

export type LeafStyle = "outline" | "solid" | "brown" | "blush" | "line";

export function Leaf({
  x,
  y,
  angle,
  len,
  w,
  seed = 1,
  style = "outline",
}: {
  x: number;
  y: number;
  angle: number;
  len: number;
  w: number;
  seed?: number;
  style?: LeafStyle;
}) {
  const d = petal({ cx: x, cy: y, angle, inner: 0, len, width: w, tip: "point", seed, belly: 0.45, base: 0.1 });
  const fill = style === "solid" ? C.ink : style === "brown" ? C.stem : style === "blush" ? C.blush : C.ivory;
  const ribColor = style === "solid" || style === "brown" ? C.ivory : C.ink;
  return (
    <g>
      {style === "line" ? <Ink d={d} sw={1.3} /> : <Riso d={d} fill={fill} sw={1.4} outline={style !== "brown"} off={[1.1, 0.9]} />}
      <Ink d={rib(x, y, angle, len * 0.08, len * 0.82, jit(rng(seed), w * 0.15))} sw={0.9} color={ribColor} opacity={style === "solid" || style === "brown" ? 0.7 : 0.55} />
    </g>
  );
}

export function Stem({ d, sw = 2 }: { d: string; sw?: number }) {
  return <Ink d={d} sw={sw} color={C.stem} />;
}

/** A cluster of tiny dots — pollen, baby's breath, confetti. */
export function DotCluster({ pts, r = 2.4, fill = C.sun, ink = true }: { pts: Pt[]; r?: number; fill?: string; ink?: boolean }) {
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={fill} stroke={ink ? C.ink : "none"} strokeWidth={0.9} />
      ))}
    </g>
  );
}
