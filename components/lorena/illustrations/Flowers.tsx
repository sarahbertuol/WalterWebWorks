import { C } from "@/lib/lorena/tokens";
import { bez, bezPath, petal, smoothOpen, type Pt } from "@/lib/lorena/draw";
import { Art, Riso, Ink } from "./primitives";
import { BowShape } from "./Baby";
import { AnemoneHead, RanunculusHead, CosmosHead, DaisyHead, ForgetMeNotHead, BlossomHead, Bud, Leaf, Stem, DotCluster } from "./heads";

type P = { className?: string };

/* ---------------------------------------------------------- Large flowers */

export function FlowerAnemone({ className }: P) {
  const stem: [Pt, Pt, Pt, Pt] = [[150, 170], [158, 260], [118, 330], [132, 430]];
  const l1 = bez(stem, 0.42);
  const l2 = bez(stem, 0.68);
  return (
    <Art viewBox="0 0 300 430" className={className}>
      <Stem d={bezPath(stem)} sw={2.4} />
      <Leaf x={l1.pt[0]} y={l1.pt[1]} angle={l1.angle - 120} len={92} w={26} seed={14} style="outline" />
      <Leaf x={l2.pt[0]} y={l2.pt[1]} angle={l2.angle - 50} len={78} w={22} seed={15} style="solid" />
      <g className="lw-sway-head" style={{ transformOrigin: "150px 140px" }}>
        <AnemoneHead cx={150} cy={140} s={128} seed={21} rot={-8} />
      </g>
    </Art>
  );
}

export function FlowerRanunculus({ className }: P) {
  return (
    <Art viewBox="0 0 300 300" className={className}>
      <Leaf x={150} y={160} angle={-160} len={140} w={34} seed={31} style="outline" />
      <Leaf x={150} y={160} angle={25} len={130} w={30} seed={32} style="solid" />
      <Leaf x={150} y={160} angle={110} len={110} w={26} seed={33} style="brown" />
      <RanunculusHead cx={150} cy={150} s={104} seed={34} rot={12} />
    </Art>
  );
}

export function FlowerCosmos({ className }: P) {
  const stem: Pt[] = [[130, 130], [138, 200], [120, 270], [134, 340], [126, 420]];
  return (
    <Art viewBox="0 0 260 420" className={className}>
      <Stem d={smoothOpen(stem)} sw={2.2} />
      <Stem d={smoothOpen([[124, 262], [160, 232], [192, 222]])} sw={1.8} />
      <Bud x={192} y={222} s={34} angle={-62} seed={41} fill={C.sun} />
      <Leaf x={133} y={318} angle={-150} len={70} w={14} seed={42} style="brown" />
      <Leaf x={128} y={360} angle={-30} len={62} w={13} seed={43} style="outline" />
      <CosmosHead cx={130} cy={120} s={104} seed={44} rot={4} />
    </Art>
  );
}

/* ---------------------------------------------------------- Small flowers */

export function FlowerDaisy({ className, seed = 51 }: P & { seed?: number }) {
  return (
    <Art viewBox="0 0 120 220" className={className}>
      <Stem d={smoothOpen([[60, 60], [66, 120], [54, 170], [62, 220]])} sw={1.8} />
      <Leaf x={63} y={140} angle={-30} len={44} w={10} seed={seed + 1} style="outline" />
      <DaisyHead cx={60} cy={56} s={48} seed={seed} rot={6} />
    </Art>
  );
}

export function FlowerForgetMeNot({ className }: P) {
  return (
    <Art viewBox="0 0 150 130" className={className}>
      <Leaf x={70} y={78} angle={150} len={52} w={14} seed={61} style="brown" />
      <Leaf x={80} y={74} angle={20} len={50} w={13} seed={62} style="outline" />
      <ForgetMeNotHead cx={52} cy={58} s={30} seed={63} rot={8} />
      <ForgetMeNotHead cx={96} cy={46} s={26} seed={64} rot={-20} />
      <ForgetMeNotHead cx={82} cy={90} s={22} seed={65} rot={30} />
    </Art>
  );
}

export function FlowerBlossom({ className }: P) {
  return (
    <Art viewBox="0 0 130 130" className={className}>
      <Leaf x={66} y={66} angle={140} len={58} w={18} seed={71} style="solid" />
      <Leaf x={66} y={66} angle={-20} len={52} w={16} seed={72} style="outline" />
      <BlossomHead cx={64} cy={62} s={42} seed={73} rot={-10} />
    </Art>
  );
}

/* ---------------------------------------------------------- Wildflowers */

/** Hanging bell flowers on an arching stem. */
export function WildBells({ className }: P) {
  const stem: [Pt, Pt, Pt, Pt] = [[30, 320], [40, 160], [90, 60], [150, 50]];
  const ts = [0.38, 0.52, 0.66, 0.8, 0.93];
  return (
    <Art viewBox="0 0 180 330" className={className}>
      <Stem d={bezPath(stem)} sw={2} />
      <Leaf x={34} y={250} angle={-70} len={84} w={12} seed={81} style="brown" />
      <Leaf x={36} y={230} angle={-115} len={70} w={11} seed={82} style="outline" />
      {ts.map((t, i) => {
        const { pt } = bez(stem, t);
        const end: Pt = [pt[0] + 4 + i * 1.5, pt[1] + 20 + (i % 2) * 6];
        return (
          <g key={t}>
            <Ink d={`M${pt[0]} ${pt[1]}Q${pt[0] + 8} ${pt[1] + 4} ${end[0]} ${end[1]}`} sw={1.3} color={C.stem} />
            <Riso d={petal({ cx: end[0], cy: end[1] - 2, angle: 92 - i * 4, inner: 0, len: 22 - i * 1.4, width: 11 - i * 0.6, tip: "notch", seed: 83 + i, belly: 0.75 })} fill={C.blush} sw={1.3} off={[0.9, 0.8]} />
          </g>
        );
      })}
    </Art>
  );
}

/** Yarrow / baby's breath — branching stalks with dotted umbels. */
export function WildYarrow({ className }: P) {
  const clusters: { o: Pt; pts: Pt[] }[] = [
    { o: [60, 60], pts: [[52, 56], [60, 50], [68, 56], [56, 64], [65, 64], [60, 58], [48, 63], [72, 62]] },
    { o: [118, 92], pts: [[110, 88], [118, 82], [126, 88], [114, 96], [122, 96], [118, 90]] },
    { o: [88, 40], pts: [[82, 36], [90, 32], [96, 38], [86, 44], [93, 45]] },
  ];
  return (
    <Art viewBox="0 0 170 300" className={className}>
      <Stem d={smoothOpen([[80, 300], [84, 220], [86, 160], [88, 120]])} sw={2} />
      <Stem d={smoothOpen([[88, 120], [74, 92], [60, 64]])} sw={1.5} />
      <Stem d={smoothOpen([[88, 124], [106, 104], [118, 94]])} sw={1.5} />
      <Stem d={smoothOpen([[87, 122], [88, 80], [88, 44]])} sw={1.5} />
      <Leaf x={84} y={210} angle={-140} len={62} w={9} seed={91} style="outline" />
      <Leaf x={85} y={180} angle={-40} len={56} w={8} seed={92} style="brown" />
      {clusters.map((c, i) => (
        <DotCluster key={i} pts={c.pts} r={3.2} fill={i === 1 ? C.blush : C.sun} />
      ))}
    </Art>
  );
}

/** A small meadow of mixed wildflowers — used for RSVP & dividers. */
export function WildMeadow({ className }: P) {
  return (
    <Art viewBox="0 0 380 220" className={className}>
      {/* grasses */}
      {[
        [40, 220, 30, 120, 60, 60],
        [70, 220, 90, 140, 70, 80],
        [300, 220, 290, 150, 320, 90],
        [330, 220, 350, 160, 345, 110],
        [190, 220, 200, 170, 220, 130],
      ].map(([a, b, c, d, e, f], i) => (
        <Ink key={i} d={`M${a} ${b}Q${c} ${d} ${e} ${f}`} sw={1.4} color={C.stem} opacity={0.85} />
      ))}
      <Stem d={smoothOpen([[110, 220], [112, 160], [104, 96]])} sw={1.8} />
      <Stem d={smoothOpen([[250, 220], [246, 160], [258, 110]])} sw={1.8} />
      <Stem d={smoothOpen([[175, 220], [170, 170], [160, 140]])} sw={1.6} />
      <Stem d={smoothOpen([[215, 220], [222, 180], [232, 160]])} sw={1.6} />
      <Leaf x={111} y={176} angle={-150} len={44} w={10} seed={101} style="outline" />
      <Leaf x={247} y={180} angle={-35} len={46} w={10} seed={102} style="brown" />
      <DaisyHead cx={104} cy={92} s={34} seed={103} />
      <ForgetMeNotHead cx={258} cy={106} s={22} seed={104} rot={14} />
      <Bud x={160} y={142} s={26} angle={-108} seed={105} />
      <Bud x={232} y={162} s={22} angle={-64} seed={106} fill={C.sun} />
      <DotCluster pts={[[60, 58], [66, 52], [56, 50], [318, 88], [324, 82], [314, 80], [345, 108], [338, 104]]} r={2.8} />
      <BlossomHead cx={196} cy={124} s={20} seed={107} rot={20} />
      <Ink d="M196 136Q198 170 200 220" sw={1.4} color={C.stem} />
    </Art>
  );
}

/** Loose stem of three small blossoms — used inside compositions. */
export function FlowerSprig({ className }: P) {
  return (
    <Art viewBox="0 0 200 140" className={className}>
      <Stem d={smoothOpen([[10, 120], [70, 100], [130, 70], [190, 30]])} sw={1.8} />
      <Leaf x={60} y={103} angle={-110} len={40} w={10} seed={111} style="solid" />
      <Leaf x={92} y={88} angle={60} len={38} w={10} seed={112} style="outline" />
      <Leaf x={140} y={64} angle={-120} len={34} w={9} seed={113} style="outline" />
      <ForgetMeNotHead cx={190} cy={30} s={18} seed={114} />
      <ForgetMeNotHead cx={124} cy={52} s={14} seed={115} rot={30} />
      <Riso d={petal({ cx: 70, cy: 100, angle: -70, inner: 0, len: 22, width: 8, tip: "point", seed: 116 })} fill={C.sun} sw={1.2} />
    </Art>
  );
}

export { DaisyHead, AnemoneHead, RanunculusHead, CosmosHead };

/* ---------------------------------------------------------- Compositions */

/** Hand-tied bouquet — a new floral composition for the details card. */
export function FlowerBouquet({ className }: P) {
  const knot: Pt = [160, 318];
  const heads: Pt[] = [[160, 128], [92, 170], [230, 162], [118, 92], [206, 98]];
  return (
    <Art viewBox="0 0 320 430" className={className}>
      {heads.map(([x, y], i) => (
        <Stem key={i} d={smoothOpen([[x, y], [(x + knot[0]) / 2 + (i % 2 ? 6 : -6), (y + knot[1]) / 2], knot])} sw={1.8} />
      ))}
      <Stem d={smoothOpen([knot, [150, 380], [140, 426]])} sw={2} />
      <Stem d={smoothOpen([knot, [166, 380], [172, 428]])} sw={2} />
      <Stem d={smoothOpen([knot, [176, 370], [196, 420]])} sw={1.8} />
      <Leaf x={150} y={230} angle={-150} len={96} w={24} seed={131} style="solid" />
      <Leaf x={168} y={232} angle={-28} len={92} w={22} seed={132} style="outline" />
      <Leaf x={156} y={262} angle={-118} len={70} w={18} seed={133} style="brown" />
      <Leaf x={164} y={200} angle={-70} len={60} w={16} seed={134} style="outline" />
      <Bud x={118} y={92} s={34} angle={-104} seed={135} />
      <Bud x={206} y={98} s={30} angle={-70} seed={136} fill={C.sun} />
      <DaisyHead cx={92} cy={170} s={44} seed={137} rot={8} />
      <BlossomHead cx={230} cy={162} s={40} seed={138} rot={-6} />
      <RanunculusHead cx={160} cy={128} s={70} seed={139} rot={20} />
      <DotCluster pts={[[60, 120], [66, 112], [56, 110], [262, 120], [268, 128], [258, 130]]} r={2.8} />
      <BowShape x={knot[0]} y={knot[1]} s={0.95} color="blush" seed={140} />
    </Art>
  );
}

/** Arched garland — the closing crown above the signature. */
export function Garland({ className }: P) {
  const arc: [Pt, Pt, Pt, Pt] = [[20, 250], [110, 20], [490, 20], [580, 250]];
  const ts = Array.from({ length: 22 }, (_, i) => 0.04 + i * 0.044);
  return (
    <Art viewBox="0 0 600 270" className={className}>
      <Stem d={bezPath(arc)} sw={2.2} />
      {ts.map((t, i) => {
        const { pt, angle } = bez(arc, t);
        const side = i % 2 ? 1 : -1;
        const styles = ["outline", "solid", "outline", "brown"] as const;
        return <Leaf key={t} x={pt[0]} y={pt[1]} angle={angle + side * 55} len={38} w={11} seed={150 + i} style={styles[i % 4]} />;
      })}
      {[0.16, 0.84].map((t, i) => {
        const { pt } = bez(arc, t);
        return <DaisyHead key={t} cx={pt[0]} cy={pt[1]} s={26} seed={175 + i} rot={i * 20} />;
      })}
      {[0.32, 0.68].map((t, i) => {
        const { pt } = bez(arc, t);
        return <ForgetMeNotHead key={t} cx={pt[0]} cy={pt[1]} s={18} seed={178 + i} rot={i * 30} />;
      })}
      {[0.41, 0.59].map((t, i) => {
        const { pt } = bez(arc, t);
        return <BlossomHead key={t} cx={pt[0]} cy={pt[1]} s={18} seed={181 + i} rot={i * 25} />;
      })}
      {(() => {
        const { pt } = bez(arc, 0.5);
        return <RanunculusHead cx={pt[0]} cy={pt[1] + 2} s={34} seed={184} />;
      })()}
      {[0.08, 0.24, 0.76, 0.92].map((t) => {
        const { pt } = bez(arc, t);
        return <DotCluster key={t} pts={[[pt[0] - 8, pt[1] + 10], [pt[0] - 2, pt[1] + 16], [pt[0] + 5, pt[1] + 9]]} r={2.6} fill={C.blush} />;
      })}
    </Art>
  );
}
