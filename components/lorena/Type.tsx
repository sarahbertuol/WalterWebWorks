import type { ElementType, ReactNode } from "react";
import { C } from "@/lib/lorena/tokens";
import { heart, sparkle, smoothOpen } from "@/lib/lorena/draw";
import { Art, Riso, Ink } from "./illustrations/primitives";
import { DaisyHead, Leaf } from "./illustrations/heads";

/** Script accent — "Lorena", "da", the occasional word. Never paragraphs. */
export function ScriptWord({
  children,
  as: Tag = "span",
  size = "md",
  signature = false,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "xl";
  signature?: boolean;
  className?: string;
}) {
  return (
    <Tag className={`lw-script lw-script--${size} ${signature ? "lw-signature" : ""} ${className}`.trim()}>{children}</Tag>
  );
}

/** Small spaced caps label with a drawn rule either side. */
export function SectionTitle({ children, as: Tag = "p", className = "" }: { children: ReactNode; as?: ElementType; className?: string }) {
  return (
    <Tag className={`lw-label ${className}`.trim()}>
      <span className="lw-label__rule" aria-hidden="true" />
      <span>{children}</span>
      <span className="lw-label__rule" aria-hidden="true" />
    </Tag>
  );
}

/** Never a generic <hr> — always something drawn. */
export function DecorativeDivider({
  variant = "heart",
  reveal = true,
  className = "",
}: {
  variant?: "heart" | "flower" | "sprig" | "stars";
  reveal?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`lw-divider lw-divider--${variant} ${reveal ? "lw-reveal lw-reveal--bloom" : ""} ${className}`.trim()}
      data-reveal={reveal ? "" : undefined}
      aria-hidden="true"
    >
      {variant === "heart" && (
        <Art viewBox="0 0 240 40" texture="soft">
          <Ink d={smoothOpen([[10, 21], [60, 19], [100, 21]])} sw={1.4} color={C.sun} />
          <Ink d={smoothOpen([[140, 21], [180, 22], [230, 19]])} sw={1.4} color={C.sun} />
          <Riso d={heart(120, 21, 22, 601)} fill={C.blush} sw={1.3} off={[0.8, 0.7]} />
          <circle cx={84} cy={21} r={1.8} fill={C.ink} />
          <circle cx={156} cy={21} r={1.8} fill={C.ink} />
        </Art>
      )}
      {variant === "flower" && (
        <Art viewBox="0 0 280 50" texture="soft">
          <Ink d={smoothOpen([[30, 26], [80, 18], [140, 28], [200, 20], [250, 26]])} sw={1.3} />
          <DaisyHead cx={26} cy={26} s={18} seed={611} />
          <Riso d={sparkle(258, 25, 10, 0.14, 612)} fill={C.sun} sw={1.1} off={[0.7, 0.6]} />
          <circle cx={140} cy={28} r={2.2} fill={C.blush} stroke={C.ink} strokeWidth={0.8} />
        </Art>
      )}
      {variant === "sprig" && (
        <Art viewBox="0 0 220 50" texture="soft">
          <Ink d={smoothOpen([[20, 30], [110, 24], [200, 30]])} sw={1.6} color={C.stem} />
          {[40, 70, 100, 130, 160, 186].map((x, i) => (
            <Leaf key={x} x={x} y={i % 2 ? 26 : 27} angle={i % 2 ? -150 : -30} len={22 - Math.abs(i - 2.5) * 2} w={6} seed={620 + i} style={i % 3 === 1 ? "solid" : "outline"} />
          ))}
        </Art>
      )}
      {variant === "stars" && (
        <Art viewBox="0 0 200 40" texture="soft">
          <Riso d={sparkle(100, 20, 12, 0.14, 630)} fill={C.sun} sw={1.2} off={[0.7, 0.6]} />
          <Riso d={sparkle(66, 22, 6, 0.14, 631)} fill={C.ink} sw={1} off={[0.5, 0.5]} />
          <Riso d={sparkle(134, 18, 6, 0.14, 632)} fill={C.ink} sw={1} off={[0.5, 0.5]} />
          <Ink d="M10 21H48M152 21H190" sw={1.2} color={C.sun} />
        </Art>
      )}
    </div>
  );
}

/** A section of the sheet — no box, no card: just a composition area. */
export function InvitationSection({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} className={`lw-section ${className}`.trim()} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}

/** Stationery button — organic rectangle, never a pill. */
export function StationeryButton({
  children,
  href,
  variant = "fill",
  type = "button",
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: "fill" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = `lw-btn lw-btn--${variant}`;
  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button className={cls} type={type} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}
