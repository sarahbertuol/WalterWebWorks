import type { ReactNode, SVGProps } from "react";
import { C } from "@/lib/lorena/tokens";

/**
 * Shared SVG filters — rendered once per page.
 *  lw-print   soft hand-painted edges + gouache brush mottling
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
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="wob" />
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.055" numOctaves="3" seed="5" result="brush" />
          <feColorMatrix in="brush" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.95 0 0 0 0.48" result="brushA" />
          <feComposite in="wob" in2="brushA" operator="in" />
        </filter>
        <filter id="lw-soft" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="1" seed="11" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="lw-frame" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="3" xChannelSelector="R" yChannelSelector="G" result="wob" />
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="3" seed="12" result="brush" />
          <feColorMatrix in="brush" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.55 0 0 0 0.74" result="brushA" />
          <feComposite in="wob" in2="brushA" operator="in" />
        </filter>
        <filter id="lw-ruled" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.03" numOctaves="2" seed="9" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
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
 * Riso — a flat gouache shape, as in the printed invitation.
 * No hard ink outline: just a soft tonal edge (burgundy at low opacity
 * reads as a darker shade of the fill). Ivory shapes keep a fine line so
 * they don't disappear into the paper.
 */
export function Riso({
  d,
  fill,
  ink = C.ink,
  sw = 1.8,
  off,
  opacity = 1,
  outline,
}: {
  d: string;
  fill: string;
  ink?: string;
  sw?: number;
  off?: [number, number];
  opacity?: number;
  outline?: boolean;
}) {
  const ivory = fill === C.ivory;
  const line = outline ?? fill !== C.ink;
  const lineOpacity = ivory ? 0.75 : ink === C.ink ? 0.3 : 0.8;
  const shift = off && ivory ? off.map((v) => v * 0.5) : null;
  return (
    <>
      <path d={d} fill={fill} opacity={opacity} transform={shift ? `translate(${shift[0]} ${shift[1]})` : undefined} />
      {line && <path d={d} stroke={ink} strokeWidth={sw * (ivory ? 0.7 : 0.6)} opacity={lineOpacity * opacity} />}
    </>
  );
}

/** Plain ink line. */
export function Ink({ d, sw = 1.8, color = C.ink, opacity = 1 }: { d: string; sw?: number; color?: string; opacity?: number }) {
  return <path d={d} stroke={color} strokeWidth={sw} opacity={opacity} />;
}
