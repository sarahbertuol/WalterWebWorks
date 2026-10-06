/**
 * The physical sheet behind the viewport:
 *  - StripeBackground: fixed powder-blue / ivory hand-ruled stripes
 *  - PaperGrain: fixed fibre texture printed over everything
 *  - FixedScallopedFrame: burgundy scalloped border, always on top
 * All three are fixed layers — only the artwork between them scrolls.
 */
export function StripeBackground() {
  return <div className="lw-stripes" aria-hidden="true" />;
}

export function PaperGrain() {
  return <div className="lw-grain" aria-hidden="true" />;
}

export function FixedScallopedFrame() {
  return (
    <div className="lw-frame" aria-hidden="true">
      <span className="lw-frame__edge lw-frame__edge--top" />
      <span className="lw-frame__edge lw-frame__edge--bottom" />
      <span className="lw-frame__edge lw-frame__edge--left" />
      <span className="lw-frame__edge lw-frame__edge--right" />
    </div>
  );
}
