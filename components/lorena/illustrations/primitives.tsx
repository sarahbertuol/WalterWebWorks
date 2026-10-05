import type { ReactNode, SVGProps } from "react";
import { C } from "@/lib/lorena/tokens";

/**
 * Shared SVG filters — rendered once per page.
 *  lw-print   wobbly hand-drawn edges + tiny ink drop-outs (risograph feel)
 *  lw-soft    same, gentler — for small details
 *  lw-frame   organic irregularity for the scalloped frame
 *  lw-ruled   hand-ruled irregularity for the background stripes
 */
export function IllustrationDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <filter id="lw-print" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="wob" />
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="3" result="speck" />
          <feColorMatrix in="speck" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -16 0 0 0 12.2" result="mask" />
          <feComposite in="wob" in2="mask" operator="in" />
        </filter>
        <filter id="lw-soft" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="1" seed="11" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="lw-frame" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="lw-ruled" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.03" numOctaves="2" seed="9" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

type SvgProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  viewBox: string;
  children: ReactNode;
  /** Use the gentler filter (tiny details) or none at all. */
  texture?: "print" | "soft" | "none";
};

/** Base <svg> for every illustration: decorative, filtered, ink-coloured. */
export function Art({ viewBox, children, texture = "print", ...rest }: SvgProps) {
  const filter = texture === "none" ? undefined : `url(#lw-${texture})`;
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <g filter={filter}>{children}</g>
    </svg>
  );
}

/**
 * Riso — a filled shape whose colour plate sits slightly out of register
 * with its ink outline. This offset is the signature of the whole system.
 */
export function Riso({
  d,
  fill,
  ink = C.ink,
  sw = 1.8,
  off = [1.6, 1.2],
  opacity = 1,
  outline = true,
}: {
  d: string;
  fill: string;
  ink?: string;
  sw?: number;
  off?: [number, number];
  opacity?: number;
  outline?: boolean;
}) {
  return (
    <>
      <path d={d} fill={fill} opacity={opacity} transform={`translate(${off[0]} ${off[1]})`} />
      {outline && <path d={d} stroke={ink} strokeWidth={sw} />}
    </>
  );
}

/** Plain ink line. */
export function Ink({ d, sw = 1.8, color = C.ink, opacity = 1 }: { d: string; sw?: number; color?: string; opacity?: number }) {
  return <path d={d} stroke={color} strokeWidth={sw} opacity={opacity} />;
}
