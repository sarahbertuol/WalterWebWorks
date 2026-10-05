import { C } from "@/lib/lorena/tokens";
import { petal, polar, wobbleCircle } from "@/lib/lorena/draw";
import { Art, Riso, Ink } from "./primitives";

type P = { className?: string };

/** The sleepy, smiling sun from the top of the invitation. */
export function Sun({ className }: P) {
  const rays = Array.from({ length: 16 }, (_, i) => i);
  return (
    <Art viewBox="0 0 220 220" className={className}>
      <g className="lw-sun-rays" style={{ transformOrigin: "110px 110px" }}>
        {rays.map((i) => {
          const long = i % 2 === 0;
          return (
            <Riso
              key={i}
              d={petal({ cx: 110, cy: 110, angle: i * 22.5 - 90, inner: 46, len: long ? 50 : 32, width: long ? 9 : 7.5, tip: "point", seed: 200 + i, belly: 0.3, base: 0.9 })}
              fill={C.sun}
              sw={1.6}
            />
          );
        })}
      </g>
      <Riso d={wobbleCircle(110, 110, 47, 207, 0.04, 10)} fill={C.sun} sw={2} off={[2, 1.6]} />
      {/* closed, sleepy eyes with lashes */}
      <Ink d="M88 104Q96 112 104 104" sw={2} />
      <Ink d="M116 104Q124 112 132 104" sw={2} />
      <Ink d="M90 109l-2.6 3.8M96 111.4v4.4M102 109l2.4 3.8" sw={1.4} />
      <Ink d="M118 109l-2.4 3.8M124 111.4v4.4M130 109l2.6 3.8" sw={1.4} />
      <ellipse cx={84} cy={124} rx={8} ry={5} fill={C.blush} opacity={0.9} />
      <ellipse cx={136} cy={124} rx={8} ry={5} fill={C.blush} opacity={0.9} />
      <Ink d="M103 125Q110 132 117 125" sw={2} />
    </Art>
  );
}

/** Smaller, wide-awake sun variation — straight hand-ruled rays. */
export function SunSmall({ className }: P) {
  return (
    <Art viewBox="0 0 120 120" className={className}>
      {Array.from({ length: 12 }, (_, i) => {
        const a = i * 30 - 90 + (i % 2 ? 4 : -3);
        const [x1, y1] = polar(60, 60, 33, a);
        const [x2, y2] = polar(60, 60, i % 2 ? 46 : 53, a);
        return <Ink key={i} d={`M${x1} ${y1}L${x2} ${y2}`} sw={2.4} />;
      })}
      <Riso d={wobbleCircle(60, 60, 26, 211, 0.05)} fill={C.sun} sw={1.8} />
      <circle cx={51} cy={57} r={2.4} fill={C.ink} />
      <circle cx={69} cy={57} r={2.4} fill={C.ink} />
      <ellipse cx={47} cy={66} rx={4.4} ry={2.8} fill={C.blush} />
      <ellipse cx={73} cy={66} rx={4.4} ry={2.8} fill={C.blush} />
      <Ink d="M54 67Q60 73 66 67" sw={1.8} />
    </Art>
  );
}
