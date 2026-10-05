/**
 * Lorena — design tokens (single source of truth).
 * Colours are mirrored into CSS custom properties on the page root,
 * and used directly inside SVG illustrations (presentation attributes
 * can't read CSS vars reliably).
 */
export const palette = {
  burgundy: "#933032",
  powderBlue: "#DFE8EA",
  ivory: "#EEECE4",
  butterYellow: "#E6B665",
  dustyBlush: "#D99A91",
  warmBrown: "#76584A",
} as const;

/** Short aliases for illustration code. */
export const C = {
  ink: palette.burgundy,
  blue: palette.powderBlue,
  ivory: palette.ivory,
  sun: palette.butterYellow,
  blush: palette.dustyBlush,
  stem: palette.warmBrown,
} as const;

export const cssTokens: Record<string, string> = {
  "--burgundy": palette.burgundy,
  "--powder-blue": palette.powderBlue,
  "--ivory": palette.ivory,
  "--butter-yellow": palette.butterYellow,
  "--dusty-blush": palette.dustyBlush,
  "--warm-brown": palette.warmBrown,
};
