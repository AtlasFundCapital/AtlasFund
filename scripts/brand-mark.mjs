// Same geometry as src/components/Logo.tsx, for scripts that cannot import TSX.
// The Atlas Fund mark, traced from the brand artwork into a 64-unit box:
// a bent beam carrying a rounded square beneath it.
export const TILE_RX = 13;
export const MARK_PATH = "M 0.23 1.75 C 0.11 2.45, 0.22 18.37, 0.34 18.49 C 0.41 18.57, 8.97 18.63, 22.7 18.65 L 44.94 18.68 44.97 40.7 L 45 62.73 54.3 62.73 C 60.31 62.73, 63.63 62.68, 63.68 62.6 C 63.82 62.37, 63.75 19.14, 63.61 17.98 C 62.69 10.59, 57.1 4.26, 49.63 2.12 C 47.04 1.38, 47.84 1.4, 23.04 1.4 L 0.29 1.4 0.23 1.75 M 18.95 25.93 C 17.46 26.47, 17.65 26.31, 10.39 33.29 C 4.86 38.6, 3.74 39.77, 3.22 40.75 C 2.13 42.81, 2.22 45.06, 3.48 46.92 C 3.74 47.3, 6.89 50.58, 10.48 54.2 C 16.87 60.64, 17.04 60.8, 18.02 61.26 C 19.32 61.88, 20.35 62.05, 21.55 61.87 C 23.42 61.58, 23.38 61.61, 30.48 54.54 C 34.02 51.01, 37.13 47.87, 37.39 47.55 C 39.11 45.4, 39.26 42.57, 37.77 40.32 C 37.34 39.66, 30.96 33.06, 26.39 28.54 C 24.06 26.24, 23.11 25.72, 21.11 25.66 C 20 25.62, 19.7 25.66, 18.95 25.93";

/** Mark on a tile: paper ground, ink mark, \`inner\` units wide (small icons want it bigger). */
export const tileSvg = (size, ground = "#ffffff", mark = "#000000", inner = 36) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">` +
  `<rect width="64" height="64" rx="${TILE_RX}" fill="${ground}"/>` +
  `<path d="${MARK_PATH}" transform="translate(${(64 - inner) / 2} ${(64 - inner) / 2}) scale(${inner / 64})" fill="${mark}" fill-rule="evenodd"/></svg>`;
