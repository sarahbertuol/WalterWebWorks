import type { CSSProperties, ReactNode } from "react";

type Box = { top?: string; left?: string; right?: string; bottom?: string; w?: string; rot?: number };

/**
 * Places a piece of artwork on the sheet.
 *  at / mobile   absolute position + width (desktop / ≤720px)
 *  depth         parallax factor (0 = pinned to text, ±0.1 = subtle drift)
 *  reveal        entrance on scroll ("rise" | "bloom" | "drift-l" | "drift-r"),
 *                "load" for the hero's first-paint sequence, or false
 *  flip          mirror horizontally (branches entering from the other edge)
 *  hover         almost-imperceptible interaction ("turn" | "lift" | false)
 *  behind        sits under the typography layer
 */
export function Illustration({
  children,
  at,
  mobile,
  depth = 0,
  reveal = "rise",
  delay = 0,
  hover = false,
  behind = false,
  hideMobile = false,
  flip = false,
  className = "",
}: {
  children: ReactNode;
  at: Box;
  mobile?: Box;
  depth?: number;
  reveal?: "rise" | "bloom" | "drift-l" | "drift-r" | "load" | false;
  delay?: number;
  flip?: boolean;
  hover?: "turn" | "lift" | false;
  behind?: boolean;
  hideMobile?: boolean;
  className?: string;
}) {
  const v = (k: string, val: string | number | undefined) => (val === undefined ? {} : { [k]: typeof val === "number" ? `${val}deg` : val });
  const style = {
    ...v("--t", at.top),
    ...v("--l", at.left),
    ...v("--r", at.right),
    ...v("--b", at.bottom),
    ...v("--w", at.w),
    ...v("--rot", at.rot ?? 0),
    ...(mobile
      ? {
          ...v("--mt", mobile.top),
          ...v("--ml", mobile.left),
          ...v("--mr", mobile.right),
          ...v("--mb", mobile.bottom),
          ...v("--mw", mobile.w),
          ...v("--mrot", mobile.rot),
        }
      : {}),
    "--delay": `${delay}ms`,
    ...(flip ? { "--flip": -1 } : {}),
  } as CSSProperties;

  const cls = [
    "lw-illo",
    behind && "lw-illo--behind",
    hideMobile && "lw-illo--hide-m",
    mobile?.left !== undefined || mobile?.right !== undefined ? "lw-illo--mx" : "",
    mobile?.top !== undefined || mobile?.bottom !== undefined ? "lw-illo--my" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} style={style} data-speed={depth || undefined} aria-hidden="true">
      <div className="lw-illo__rot">
        <div
          className={reveal === "load" ? "lw-load" : reveal ? `lw-reveal lw-reveal--${reveal}` : undefined}
          data-reveal={reveal && reveal !== "load" ? "" : undefined}
        >
          <div className={hover ? `lw-hover lw-hover--${hover}` : undefined}>{children}</div>
        </div>
      </div>
    </div>
  );
}
