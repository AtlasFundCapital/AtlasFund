/** Brand mark: an "A" whose crossbar runs to the tile edges. Same geometry as scripts/brand-mark.mjs. */
export const A_PATH = "M32 10 L53 54 H43.5 L32 29.5 L20.5 54 H11 Z";
export const BAR_PATH = "M7 38 H57 V43 H7 Z";

export function Mark({ className = "", ink = "currentColor", paper = "#eeedec" }: { className?: string; ink?: string; paper?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="13" fill={ink} />
      <path d={A_PATH} fill={paper} />
      <path d={BAR_PATH} fill={paper} />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ink ${className}`}>
      <Mark className="size-8" />
      <span className="font-display text-[19px] font-medium tracking-[-0.06em]">Atlas Fund</span>
    </span>
  );
}
