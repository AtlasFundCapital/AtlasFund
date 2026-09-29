// Same geometry as src/components/Logo.tsx, for scripts that cannot import TSX.
// A 64-unit tile: an "A" whose crossbar runs out to the tile edges, a horizon
// line held up by the letter.
export const TILE_RX = 13;
export const A_PATH = "M32 10 L53 54 H43.5 L32 29.5 L20.5 54 H11 Z";
export const BAR_PATH = "M7 38 H57 V43 H7 Z";

/** Mark on a tile: ink ground, paper letter. */
export const tileSvg = (size, ink = "#1f1f1f", paper = "#eeedec") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">` +
  `<rect width="64" height="64" rx="${TILE_RX}" fill="${ink}"/>` +
  `<path d="${A_PATH}" fill="${paper}"/><path d="${BAR_PATH}" fill="${paper}"/></svg>`;
