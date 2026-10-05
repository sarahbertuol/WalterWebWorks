import { C } from "@/lib/lorena/tokens";
import { polar, wobbleCircle } from "@/lib/lorena/draw";
import { Art, Riso, Ink } from "./primitives";

type P = { className?: string };

/** The sleepy sun from the top of the invitation — flat gold, triangular rays. */
export function Sun({ className }: P) {
  return (
    <Art viewBox="0 0 220 220" className={className}>
      <g className="lw-sun-rays" style={{ transformOrigin: "110px 110px" }}>
        {Array.from({ length: 16 }, (_, i) => {
          const a = i * 22.5 - 90;
          const long = i % 2 === 0;
          const spread = long ? 10.5 : 9;
          const [x1, y1] = polar(110, 110, 46, a - spread);
          const [x2, y2] = polar(110, 110, 46, a + spread);
          const [tx, ty] = polar(110, 110, long ? 104 : 82, a + (i % 3) - 1);
          return <Riso key={i} d={`M${x1} ${y1}L${tx} ${ty}L${x2} ${y2}Z`} fill={C.sun} sw={1.2} />;
        })}
      </g>
      <Riso d={wobbleCircle(110, 110, 50, 207, 0.025, 12)} fill={C.sun} sw={1.4} />
      <path d={wobbleCircle(110, 112, 41, 208, 0.03, 10)} fill={C.ivory} opacity={0.32} />
      {/* closed, sleepy eyes · tiny smile */}
      <Ink d="M88 106Q95 113 102 106" sw={2} color={C.stem} />
      <Ink d="M118 106Q125 113 132 106" sw={2} color={C.stem} />
      <Ink d="M109 113q-2 5 1 7" sw={1.3} color={C.stem} opacity={0.7} />
      <Ink d="M102 126Q110 132 118 126" sw={1.8} color={C.stem} />
      <ellipse cx={86} cy={121} rx={7} ry={4} fill={C.blush} opacity={0.45} />
      <ellipse cx={134} cy={121} rx={7} ry={4} fill={C.blush} opacity={0.45} />
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
        return <Ink key={i} d={`M${x1} ${y1}L${x2} ${y2}`} sw={3.4} color={C.sun} />;
      })}
      <Riso d={wobbleCircle(60, 60, 26, 211, 0.05)} fill={C.sun} sw={1.8} />
      <circle cx={51} cy={57} r={2.2} fill={C.stem} />
      <circle cx={69} cy={57} r={2.2} fill={C.stem} />
      <ellipse cx={47} cy={66} rx={4.4} ry={2.8} fill={C.blush} />
      <ellipse cx={73} cy={66} rx={4.4} ry={2.8} fill={C.blush} />
      <Ink d="M54 67Q60 73 66 67" sw={1.8} color={C.stem} />
    </Art>
  );
}
