/**
 * The pieces lifted straight from the printed invitation:
 * thin gold sparkles, the pacifier tied with a burgundy ribbon,
 * the pink fan flower, the yellow flower and the swash under "DATE".
 */
import { C } from "@/lib/lorena/tokens";
import { petal, rib, ribbonTail, wobbleCircle, smoothOpen } from "@/lib/lorena/draw";
import { Art, Riso, Ink } from "./primitives";
import { Leaf, Stem } from "./heads";

type P = { className?: string };

/** Thin four-point sparkle — two tapered strokes crossing. */
export function SparkleLine({ className, color = C.sun }: P & { color?: string }) {
  return (
    <Art viewBox="0 0 30 40" className={className} texture="soft">
      <path d="M15 2Q16.4 20 15 38Q13.6 20 15 2Z" fill={color} />
      <path d="M4 20Q15 21.3 26 20Q15 18.7 4 20Z" fill={color} />
    </Art>
  );
}

/** Pacifier seen in three-quarter view, tied with a long-tailed bow. */
export function PacifierBow({ className }: P) {
  return (
    <Art viewBox="0 0 240 262" className={className}>
      {/* teat: short rounded bulb on a neck */}
      <Riso d={petal({ cx: 124, cy: 106, angle: -124, inner: 6, len: 66, width: 30, seed: 701, belly: 0.72, base: 0.5, jitter: 0.03 })} fill={C.sun} opacity={0.85} sw={1.4} />
      <Ink d="M98 58Q90 66 92 78" sw={3} color={C.ivory} opacity={0.6} />
      {/* shield: a pink disc in perspective, lighter rim, hub */}
      <g transform="rotate(-30 134 118)">
        <Riso d={wobbleCircle(134, 118, 54, 702, 0.025, 12, 27)} fill={C.blush} sw={1.6} />
        <path d={wobbleCircle(134, 118, 45, 704, 0.03, 12, 20)} stroke={C.ivory} strokeWidth={2.2} opacity={0.4} />
        <path d={wobbleCircle(136, 121, 26, 703, 0.04, 10, 11)} fill={C.ink} opacity={0.1} />
        <Riso d={wobbleCircle(132, 116, 12, 705, 0.05, 8, 8)} fill={C.blush} sw={1.4} />
        <path d={wobbleCircle(130, 114, 6, 711, 0.05, 8, 4)} fill={C.ivory} opacity={0.35} />
      </g>
      {/* ribbon: tails, loops, knot */}
      <Riso d={ribbonTail([[148, 146], [128, 166], [112, 190], [92, 208], [74, 226], [56, 250]], 13, 706)} fill={C.ink} />
      <Riso d={ribbonTail([[154, 146], [176, 166], [188, 188], [202, 204], [216, 222], [226, 246]], 13, 707)} fill={C.ink} />
      <Riso d={petal({ cx: 151, cy: 144, angle: 196, inner: 2, len: 58, width: 20, seed: 708, belly: 0.74, base: 0.45 })} fill={C.ink} />
      <Riso d={petal({ cx: 151, cy: 144, angle: -30, inner: 2, len: 56, width: 19, seed: 709, belly: 0.74, base: 0.45 })} fill={C.ink} />
      <Ink d={rib(151, 144, 196, 12, 46, 5)} sw={1.3} color={C.ivory} opacity={0.35} />
      <Ink d={rib(151, 144, -30, 12, 44, -5)} sw={1.3} color={C.ivory} opacity={0.35} />
      <Ink d="M120 170Q112 182 104 196M178 168Q186 182 190 190" sw={1.1} color={C.ivory} opacity={0.3} />
      <Riso d={wobbleCircle(151, 145, 8.5, 710, 0.08)} fill={C.ink} />
    </Art>
  );
}

/** Pink fan flower on a curved stem (left of the pacifier). */
export function FanFlower({ className }: P) {
  const bx = 74;
  const by = 86;
  const angles = [-168, -146, -124, -102, -80, -58, -36];
  return (
    <Art viewBox="0 0 170 210" className={className}>
      <Stem d={smoothOpen([[bx + 4, by + 12], [100, 130], [124, 168], [150, 204]])} sw={2.4} />
      <Leaf x={112} y={148} angle={-80} len={40} w={11} seed={721} style="brown" />
      <g transform={`rotate(-18 ${bx} ${by})`}>
        {angles.map((a, i) => (
          <Riso key={a} d={petal({ cx: bx, cy: by, angle: a, inner: 4, len: 54 - Math.abs(i - 3) * 3, width: 15, tip: "notch", seed: 722 + i, belly: 0.7, base: 0.2 })} fill={C.blush} sw={1.3} />
        ))}
        {angles.map((a) => (
          <Ink key={`r${a}`} d={rib(bx, by, a, 10, 40, 0)} sw={1} opacity={0.32} />
        ))}
        <Riso d={petal({ cx: bx, cy: by + 2, angle: 90, inner: -6, len: 22, width: 13, seed: 729, belly: 0.35, base: 0.8 })} fill={C.blush} sw={1.2} />
        <path d={petal({ cx: bx, cy: by + 2, angle: 90, inner: -6, len: 22, width: 13, seed: 729, belly: 0.35, base: 0.8 })} fill={C.ink} opacity={0.28} />
      </g>
    </Art>
  );
}

/** Butter-yellow flower with open petals (right of the pacifier). */
export function TulipFlower({ className }: P) {
  const bx = 92;
  const by = 92;
  const angles = [-158, -128, -96, -64, -32];
  return (
    <Art viewBox="0 0 170 210" className={className}>
      <Stem d={smoothOpen([[bx - 2, by + 6], [78, 132], [58, 168], [34, 204]])} sw={2.4} />
      <Leaf x={66} y={154} angle={-150} len={30} w={8} seed={741} style="brown" />
      <g transform={`rotate(12 ${bx} ${by})`}>
        {angles.map((a, i) => (
          <Riso key={a} d={petal({ cx: bx, cy: by, angle: a, inner: 2, len: 62 - Math.abs(i - 2) * 6, width: 17, tip: "point", seed: 742 + i, belly: 0.6, base: 0.25 })} fill={C.sun} sw={1.3} />
        ))}
        {angles.map((a) => (
          <Ink key={`r${a}`} d={rib(bx, by, a, 8, 40, 2)} sw={1} color={C.stem} opacity={0.35} />
        ))}
        <circle cx={bx} cy={by + 2} r={6} fill={C.stem} />
      </g>
    </Art>
  );
}

/** The swash that trails off the "E" of DATE. */
export function Flourish({ className }: P) {
  return (
    <Art viewBox="0 0 140 70" className={className} texture="soft">
      <Ink d="M4 6C24 30 54 48 92 46C118 44 134 30 124 18C116 10 100 18 106 30C110 38 122 40 132 36" sw={2.6} />
    </Art>
  );
}
