import type { CSSProperties } from "react";
import { C } from "@/lib/lorena/tokens";
import { heart, polar, smoothClosed, smoothOpen, sparkle, star, rng, jit, type Pt } from "@/lib/lorena/draw";
import { Art, Riso, Ink } from "./primitives";

type P = { className?: string };

export function Star({ className, seed = 500, fill = C.sun }: P & { seed?: number; fill?: string }) {
  return (
    <Art viewBox="0 0 40 40" className={className} texture="soft">
      <Riso d={star(20, 21, 16, 7, 5, seed)} fill={fill} sw={1.4} off={[1, 0.8]} />
    </Art>
  );
}

export function Sparkle({ className, seed = 510, fill = C.sun }: P & { seed?: number; fill?: string }) {
  return (
    <Art viewBox="0 0 40 40" className={className} texture="soft">
      <Riso d={sparkle(20, 20, 17, 0.14, seed)} fill={fill} sw={1.3} off={[0.9, 0.8]} />
    </Art>
  );
}

export function Heart({ className, seed = 520, fill = C.blush }: P & { seed?: number; fill?: string }) {
  return (
    <Art viewBox="0 0 40 40" className={className} texture="soft">
      <Riso d={heart(20, 20, 30, seed)} fill={fill} sw={1.4} off={[1, 0.8]} />
    </Art>
  );
}

type Twinkle = { kind: "star" | "sparkle" | "dot" | "heart"; x: number; y: number; s: number; fill?: string; d?: number };

/** A loose constellation: stars, sparkles, dots. Each twinkles on its own clock. */
export function StarCluster({ className, items }: P & { items?: Twinkle[] }) {
  const list: Twinkle[] = items ?? [
    { kind: "sparkle", x: 40, y: 50, s: 16, d: 0 },
    { kind: "star", x: 112, y: 30, s: 11, d: 1.1 },
    { kind: "dot", x: 80, y: 86, s: 3, d: 0.6 },
    { kind: "sparkle", x: 170, y: 76, s: 10, fill: C.ink, d: 1.8 },
    { kind: "dot", x: 140, y: 112, s: 2.4, d: 2.4 },
    { kind: "star", x: 64, y: 118, s: 7, d: 1.5 },
    { kind: "dot", x: 196, y: 30, s: 2.2, d: 0.3 },
  ];
  return (
    <Art viewBox="0 0 220 140" className={className} texture="soft">
      {list.map((t, i) => {
        const st = { "--tw-d": `${t.d ?? i * 0.4}s`, transformOrigin: `${t.x}px ${t.y}px` } as CSSProperties;
        const fill = t.fill ?? C.sun;
        return (
          <g key={i} className="lw-twinkle" style={st}>
            {t.kind === "star" && <Riso d={star(t.x, t.y, t.s, t.s * 0.45, 5, 540 + i)} fill={fill} sw={1.2} off={[0.8, 0.7]} />}
            {t.kind === "sparkle" && <Riso d={sparkle(t.x, t.y, t.s, 0.14, 550 + i)} fill={fill} sw={1.2} off={[0.8, 0.7]} />}
            {t.kind === "heart" && <Riso d={heart(t.x, t.y, t.s * 2, 560 + i)} fill={t.fill ?? C.blush} sw={1.2} off={[0.8, 0.7]} />}
            {t.kind === "dot" && <circle cx={t.x} cy={t.y} r={t.s} fill={t.fill ?? C.ink} />}
          </g>
        );
      })}
    </Art>
  );
}

/** Scalloped medallion — echoes the frame. Sits behind type. */
export function Medallion({ className, fill = C.blush, opacity = 0.35 }: P & { fill?: string; opacity?: number }) {
  const n = 28;
  const R = 92;
  let d = "";
  for (let i = 0; i < n; i++) {
    const [x1, y1] = polar(100, 100, R, (360 / n) * i);
    const [x2, y2] = polar(100, 100, R, (360 / n) * (i + 1));
    d += i === 0 ? `M${x1} ${y1}` : "";
    d += `A${(R * Math.PI) / n} ${(R * Math.PI) / n} 0 0 1 ${x2} ${y2}`;
  }
  return (
    <Art viewBox="-12 -12 224 224" className={className} texture="soft">
      <path d={d + "Z"} fill={fill} opacity={opacity} />
      <circle cx={100} cy={100} r={78} stroke={C.ink} strokeWidth={1} strokeDasharray="1 6" opacity={0.6} />
    </Art>
  );
}

/** 1970s abstract blob — a soft plate of colour behind compositions. */
export function Blob({ className, fill = C.sun, opacity = 0.5, seed = 570 }: P & { fill?: string; opacity?: number; seed?: number }) {
  const r = rng(seed);
  const pts: Pt[] = Array.from({ length: 7 }, (_, i) => polar(100, 100, 80 * (1 + jit(r, 0.18)), i * (360 / 7) + jit(r, 10)));
  return (
    <Art viewBox="0 0 200 200" className={className} texture="soft">
      <path d={smoothClosed(pts)} fill={fill} opacity={opacity} />
    </Art>
  );
}

/** Hand-drawn looping line. */
export function Squiggle({ className, color = C.ink }: P & { color?: string }) {
  return (
    <Art viewBox="0 0 240 60" className={className} texture="soft">
      <Ink
        d={smoothOpen([[4, 40], [40, 22], [70, 34], [86, 50], [74, 58], [66, 40], [96, 20], [140, 30], [170, 44], [200, 26], [236, 18]])}
        sw={1.6}
        color={color}
      />
    </Art>
  );
}

/** A trail of dots along a curve. */
export function DotTrail({ className, color = C.sun }: P & { color?: string }) {
  return (
    <Art viewBox="0 0 220 80" className={className} texture="none">
      {Array.from({ length: 11 }, (_, i) => {
        const t = i / 10;
        const x = 6 + t * 208;
        const y = 50 - Math.sin(t * Math.PI) * 34;
        return <circle key={i} cx={x} cy={y} r={2 + (i % 3 === 0 ? 1.4 : 0)} fill={i % 3 === 0 ? color : C.ink} opacity={i % 3 === 0 ? 1 : 0.7} />;
      })}
    </Art>
  );
}
