import { C } from "@/lib/lorena/tokens";
import { petal, ribbonTail, smoothClosed, wobbleCircle, type Pt } from "@/lib/lorena/draw";
import { Art, Riso, Ink } from "./primitives";

type P = { className?: string };
type RibbonColor = "ink" | "blush" | "sun";
const ribbonFill = (c: RibbonColor) => (c === "ink" ? C.ink : c === "blush" ? C.blush : C.sun);

/** A bow — loops, knot, flowing notched tails. */
export function BowShape({
  x,
  y,
  s = 1,
  color = "ink",
  seed = 400,
  tails = true,
}: {
  x: number;
  y: number;
  s?: number;
  color?: RibbonColor;
  seed?: number;
  tails?: boolean;
}) {
  const fill = ribbonFill(color);
  const L: Pt[] = [[x - 3 * s, y + 3 * s], [x - 18 * s, y + 20 * s], [x - 24 * s, y + 44 * s], [x - 40 * s, y + 62 * s], [x - 44 * s, y + 86 * s]];
  const R: Pt[] = [[x + 3 * s, y + 3 * s], [x + 22 * s, y + 18 * s], [x + 36 * s, y + 42 * s], [x + 34 * s, y + 66 * s], [x + 50 * s, y + 84 * s]];
  return (
    <g className="lw-ribbon" style={{ transformOrigin: `${x}px ${y}px` }}>
      {tails && <Riso d={ribbonTail(L, 12 * s, seed)} fill={fill} sw={1.4} off={[1.2, 1]} />}
      {tails && <Riso d={ribbonTail(R, 12 * s, seed + 1)} fill={fill} sw={1.4} off={[1.2, 1]} />}
      <Riso d={petal({ cx: x, cy: y, angle: 196, inner: 2, len: 36 * s, width: 15 * s, seed: seed + 2, belly: 0.72, base: 0.5 })} fill={fill} sw={1.5} />
      <Riso d={petal({ cx: x, cy: y, angle: -16, inner: 2, len: 38 * s, width: 15 * s, seed: seed + 3, belly: 0.72, base: 0.5 })} fill={fill} sw={1.5} />
      <Ink d={`M${x - 8 * s} ${y - 2 * s}q${-10 * s} ${-2 * s} ${-18 * s} ${-6 * s}M${x + 8 * s} ${y - 3 * s}q${10 * s} ${-3 * s} ${18 * s} ${-8 * s}`} sw={1} color={color === "ink" ? C.ivory : C.ink} opacity={0.6} />
      <Riso d={wobbleCircle(x, y, 7 * s, seed + 4, 0.08)} fill={fill} sw={1.5} />
    </g>
  );
}

/** Vintage pacifier tied with a ribbon — classic front view. */
export function Pacifier({ className, ribbon = "ink" }: P & { ribbon?: RibbonColor }) {
  const shield = smoothClosed([
    [34, 134], [46, 108], [76, 104], [100, 118], [124, 104], [154, 108], [166, 134],
    [158, 162], [128, 174], [100, 162], [72, 174], [42, 162],
  ]);
  return (
    <Art viewBox="0 0 200 190" className={className}>
      <Ink d="M100 92V124" sw={9} />
      <path d={wobbleCircle(100, 58, 35, 413, 0.03)} stroke={C.ink} strokeWidth={7} />
      <Ink d="M78 40Q88 28 102 27" sw={1.5} color={C.ivory} opacity={0.85} />
      <Riso d={shield} fill={C.blush} sw={2} off={[2, 1.6]} />
      <Ink d="M52 150Q60 160 74 162M148 150Q140 160 126 162" sw={1.1} opacity={0.5} />
      <Riso d={wobbleCircle(63, 135, 10, 411, 0.08, 8, 6.5)} fill={C.ivory} sw={1.5} off={[0.8, 0.6]} />
      <Riso d={wobbleCircle(137, 135, 10, 412, 0.08, 8, 6.5)} fill={C.ivory} sw={1.5} off={[0.8, 0.6]} />
      <Riso d={wobbleCircle(100, 138, 17, 414, 0.05)} fill={C.ink} sw={1.6} />
      <circle cx={94} cy={132} r={3.6} fill={C.ivory} opacity={0.8} />
      <g transform="rotate(-38 70 30)">
        <BowShape x={70} y={30} color={ribbon} seed={415} s={0.62} />
      </g>
    </Art>
  );
}

/** Vintage rattle — the subtle baby object. */
export function Rattle({ className }: P) {
  return (
    <Art viewBox="0 0 170 290" className={className}>
      <path d={wobbleCircle(85, 252, 24, 420, 0.04)} stroke={C.ink} strokeWidth={5} />
      <Riso d="M76 120L77 224Q85 232 93 224L94 120Z" fill={C.ivory} sw={1.8} />
      <Ink d="M80 140V214" sw={1.2} color={C.blush} />
      <Riso d={wobbleCircle(85, 74, 50, 421, 0.03, 12)} fill={C.sun} sw={2} off={[2, 1.6]} />
      <Ink d="M38 64Q85 88 132 64" sw={1.4} opacity={0.6} />
      <Ink d="M36 86Q85 110 134 86" sw={1.4} opacity={0.6} />
      {[50, 66, 85, 104, 120].map((x, i) => (
        <circle key={x} cx={x} cy={76 + (i === 2 ? 10 : i % 2 ? 7 : 2)} r={2.6} fill={C.ink} />
      ))}
      <Ink d="M60 40Q72 30 88 30" sw={1.6} color={C.ivory} opacity={0.9} />
      <BowShape x={85} y={124} s={0.62} color="blush" seed={422} />
    </Art>
  );
}

/** A tiny bow on its own. */
export function TinyBow({ className, color = "blush" }: P & { color?: RibbonColor }) {
  return (
    <Art viewBox="0 0 110 110" className={className}>
      <BowShape x={55} y={24} s={0.9} color={color} seed={430} />
    </Art>
  );
}
