import { C } from "@/lib/lorena/tokens";
import { bez, bezPath, smoothClosed, wobbleCircle, petal, polar, rng, jit, type Pt } from "@/lib/lorena/draw";
import { Art, Riso, Ink } from "./primitives";
import { Leaf, Stem, BlossomHead, type LeafStyle } from "./heads";

type P = { className?: string };

function leavesAlong(stem: [Pt, Pt, Pt, Pt], ts: number[], o: { len: number; w: number; spread: number; seed: number; styles: LeafStyle[]; shrink?: number }) {
  return ts.map((t, i) => {
    const { pt, angle } = bez(stem, t);
    const side = i % 2 === 0 ? -1 : 1;
    const k = 1 - (o.shrink ?? 0.35) * t;
    return (
      <Leaf
        key={t}
        x={pt[0]}
        y={pt[1]}
        angle={angle + side * o.spread}
        len={o.len * k}
        w={o.w * k}
        seed={o.seed + i}
        style={o.styles[i % o.styles.length]}
      />
    );
  });
}

/** Arching branch with alternating almond leaves. */
export function BranchLeafy({ className }: P) {
  const stem: [Pt, Pt, Pt, Pt] = [[10, 250], [120, 230], [220, 120], [390, 40]];
  const tip = bez(stem, 1);
  return (
    <Art viewBox="0 0 420 270" className={className}>
      <Stem d={bezPath(stem)} sw={2.4} />
      {leavesAlong(stem, [0.12, 0.22, 0.34, 0.44, 0.56, 0.66, 0.77, 0.86], { len: 74, w: 22, spread: 52, seed: 300, styles: ["outline", "solid", "outline", "outline", "brown", "outline"] })}
      <Leaf x={tip.pt[0]} y={tip.pt[1]} angle={tip.angle} len={40} w={13} seed={399} style="outline" />
    </Art>
  );
}

/** Olive branch — slender leaves and a few olives. Italian summer. */
export function BranchOlive({ className }: P) {
  const stem: [Pt, Pt, Pt, Pt] = [[10, 60], [140, 40], [260, 110], [400, 90]];
  const olives = [0.3, 0.58, 0.8].map((t) => bez(stem, t).pt);
  return (
    <Art viewBox="0 0 420 170" className={className}>
      <Stem d={bezPath(stem)} sw={2} />
      {leavesAlong(stem, [0.08, 0.16, 0.24, 0.34, 0.42, 0.5, 0.62, 0.7, 0.78, 0.88, 0.95], { len: 64, w: 9, spread: 38, seed: 320, styles: ["brown", "line", "solid", "brown", "line"], shrink: 0.25 })}
      {olives.map(([x, y], i) => (
        <g key={i}>
          <Ink d={`M${x} ${y}q${4} ${10} ${2} ${18}`} sw={1.2} color={C.stem} />
          <Riso d={wobbleCircle(x + 2, y + 28, 8, 330 + i, 0.06, 8, 10.5)} fill={i === 1 ? C.blush : C.ink} sw={1.2} />
        </g>
      ))}
    </Art>
  );
}

/** Eucalyptus-like sprig with paired round leaves. */
export function BranchRound({ className }: P) {
  const stem: [Pt, Pt, Pt, Pt] = [[110, 360], [100, 250], [140, 140], [120, 20]];
  const ts = [0.16, 0.32, 0.48, 0.63, 0.78, 0.9];
  return (
    <Art viewBox="0 0 240 370" className={className}>
      <Stem d={bezPath(stem)} sw={2} />
      {ts.map((t, i) => {
        const { pt, angle } = bez(stem, t);
        const k = 1 - t * 0.45;
        return [-1, 1].map((side) => (
          <g key={`${t}${side}`}>
            <Riso
              d={petal({ cx: pt[0], cy: pt[1], angle: angle + side * 70, inner: 2, len: 46 * k, width: 24 * k, seed: 340 + i * 2 + side, belly: 0.55 })}
              fill={(i + (side > 0 ? 1 : 0)) % 3 === 0 ? C.blush : C.ivory}
              sw={1.4}
            />
          </g>
        ));
      })}
    </Art>
  );
}

/* ---------------------------------------------------------- Citrus */

function lemonPath(cx: number, cy: number, rx: number, ry: number, angle: number, seed: number) {
  const r = rng(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    let x = Math.cos(a) * rx * (1 + jit(r, 0.03));
    const y = Math.sin(a) * ry * (1 + jit(r, 0.04));
    if (i === 0) x = rx * 1.22; // nipple
    if (i === 6) x = -rx * 1.14;
    pts.push([x, y]);
  }
  const rad = (angle * Math.PI) / 180;
  return smoothClosed(pts.map(([x, y]) => [cx + x * Math.cos(rad) - y * Math.sin(rad), cy + x * Math.sin(rad) + y * Math.cos(rad)] as Pt));
}

function Lemon({ cx, cy, s, angle, seed }: { cx: number; cy: number; s: number; angle: number; seed: number }) {
  const r = rng(seed);
  return (
    <g>
      <Riso d={lemonPath(cx, cy, s, s * 0.72, angle, seed)} fill={C.sun} sw={1.8} off={[2, 1.6]} />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={cx + jit(r, s * 0.6)} cy={cy + jit(r, s * 0.4)} r={0.9} fill={C.ink} opacity={0.45} />
      ))}
      <Ink d={`M${cx - s * 0.5} ${cy - s * 0.18}Q${cx - s * 0.2} ${cy - s * 0.55} ${cx + s * 0.25} ${cy - s * 0.42}`} sw={1.6} color={C.ivory} opacity={0.9} />
    </g>
  );
}

/** Lemon branch — two lemons, leaves, a blossom. */
export function LemonBranch({ className }: P) {
  const stem: [Pt, Pt, Pt, Pt] = [[20, 40], [140, 60], [230, 40], [380, 110]];
  return (
    <Art viewBox="0 0 400 300" className={className}>
      <Stem d={bezPath(stem)} sw={2.6} />
      <Stem d={`M168 50Q170 90 160 120`} sw={1.8} />
      <Stem d={`M268 64Q290 100 284 140`} sw={1.8} />
      {leavesAlong(stem, [0.1, 0.2, 0.32, 0.46, 0.6, 0.74, 0.86], { len: 82, w: 26, spread: 48, seed: 360, styles: ["outline", "solid", "outline", "outline", "solid"], shrink: 0.2 })}
      <Lemon cx={156} cy={170} s={44} angle={98} seed={371} />
      <Lemon cx={286} cy={190} s={40} angle={72} seed={372} />
      <BlossomHead cx={392} cy={112} s={26} seed={373} rot={10} />
    </Art>
  );
}

/** Lemon, half — a small citrus vignette. */
export function CitrusSlice({ className }: P) {
  return (
    <Art viewBox="0 0 140 140" className={className}>
      <Riso d={wobbleCircle(70, 70, 50, 381, 0.03, 12)} fill={C.sun} sw={2} off={[2, 1.5]} />
      <circle cx={70} cy={70} r={41} fill={C.ivory} opacity={0.65} />
      {Array.from({ length: 9 }, (_, i) => (
        <Riso key={i} d={petal({ cx: 70, cy: 70, angle: i * 40 + 6, inner: 5, len: 32, width: 10, tip: "round", seed: 382 + i, belly: 0.75, base: 0.4 })} fill={C.sun} sw={1} off={[0.6, 0.5]} />
      ))}
      <circle cx={70} cy={70} r={3} fill={C.ivory} stroke={C.ink} strokeWidth={1} />
      {[0, 120, 240].map((a) => {
        const [x, y] = polar(70, 70, 22, a + 25);
        return <ellipse key={a} cx={x} cy={y} rx={2} ry={3.6} fill={C.ivory} stroke={C.ink} strokeWidth={0.8} transform={`rotate(${a + 25} ${x} ${y})`} />;
      })}
    </Art>
  );
}
