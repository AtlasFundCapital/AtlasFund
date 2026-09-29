// Draws every raster asset on the site: icons, social card and the dotted
// illustrations. Nothing is downloaded; each picture starts as a small shaded
// SVG scene that is sampled on a grid and redrawn as dots sized by darkness.
// Run with `npm run assets`; the output is committed.
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { A_PATH, BAR_PATH, tileSvg } from "./brand-mark.mjs";

const INK = "#1f1f1f";
const CARD = "#eeedec";
const PAPER = "#e8e7e5";

/* ---------- icons ---------- */

async function png(svg, size) {
  return sharp(Buffer.from(svg), { density: 384 }).resize(size, size).ensureAlpha().png().toBuffer();
}

/** ICO container with PNG payloads (RGBA), which every current browser reads. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

/* ---------- dotted illustrations ---------- */

const W = 1200;
const H = 675;

const shade = (id, stops, cx = "35%", cy = "30%", r = "75%") =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join("")}</radialGradient>`;

const linear = (id, a, b, x2 = "0", y2 = "1") =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

const scene = (defs, body, w = W, h = H) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs><rect width="${w}" height="${h}" fill="#fff"/>${body}</svg>`;

const ball = [
  ["0", "#d8d8d8"],
  ["0.55", "#6a6a6a"],
  ["1", "#161616"],
];

const SCENES = {
  globe: scene(
    shade("g", ball),
    `<circle cx="600" cy="338" r="250" fill="url(#g)"/>
     <g fill="none" stroke="#fff" stroke-width="10" opacity="0.9">
       <ellipse cx="600" cy="338" rx="250" ry="70"/><ellipse cx="600" cy="338" rx="120" ry="250"/>
       <line x1="350" y1="338" x2="850" y2="338"/><line x1="600" y1="88" x2="600" y2="588"/></g>`,
  ),
  cube: scene(
    "",
    `<polygon points="600,110 830,230 600,350 370,230" fill="#bdbdbd"/>
     <polygon points="370,230 600,350 600,590 370,470" fill="#5a5a5a"/>
     <polygon points="830,230 600,350 600,590 830,470" fill="#262626"/>
     <polygon points="600,190 700,242 600,294 500,242" fill="#fff" opacity="0.6"/>`,
  ),
  coin: scene(
    shade("g", ball),
    `<circle cx="600" cy="338" r="240" fill="url(#g)"/><circle cx="600" cy="338" r="170" fill="#fff" opacity="0.85"/>
     <circle cx="600" cy="338" r="130" fill="url(#g)"/><path d="${A_PATH}" transform="translate(504 242) scale(3)" fill="#fff"/><path d="${BAR_PATH}" transform="translate(504 242) scale(3)" fill="#fff"/>`,
  ),
  bars: scene(
    linear("b", "#9a9a9a", "#141414"),
    [0, 1, 2, 3, 4, 5]
      .map((i) => {
        const h = 90 + i * 70;
        return `<rect x="${250 + i * 120}" y="${560 - h}" width="84" height="${h}" rx="6" fill="url(#b)"/>`;
      })
      .join("") + `<rect x="220" y="578" width="760" height="10" fill="#222"/>`,
  ),
  stack: scene(
    shade("g", [["0", "#cfcfcf"], ["1", "#2a2a2a"]], "30%", "20%", "90%"),
    [0, 1, 2, 3]
      .map((i) => `<ellipse cx="600" cy="${470 - i * 90}" rx="260" ry="70" fill="url(#g)"/><ellipse cx="600" cy="${452 - i * 90}" rx="260" ry="70" fill="#${["444", "555", "666", "999"][i]}"/>`)
      .join(""),
  ),
  shield: scene(
    linear("s", "#bdbdbd", "#1a1a1a", "1", "1"),
    `<path d="M600 90 L820 170 V350 C820 470 720 560 600 600 C480 560 380 470 380 350 V170 Z" fill="url(#s)"/>
     <path d="M530 340 L585 395 L690 285" fill="none" stroke="#fff" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>`,
  ),
  donut: scene(
    "",
    `<circle cx="600" cy="338" r="230" fill="none" stroke="#222" stroke-width="120" stroke-dasharray="650 1445" transform="rotate(-90 600 338)"/>
     <circle cx="600" cy="338" r="230" fill="none" stroke="#777" stroke-width="120" stroke-dasharray="420 1445" stroke-dashoffset="-660" transform="rotate(-90 600 338)"/>
     <circle cx="600" cy="338" r="230" fill="none" stroke="#b5b5b5" stroke-width="120" stroke-dasharray="340 1445" stroke-dashoffset="-1090" transform="rotate(-90 600 338)"/>`,
  ),
  flow: scene(
    shade("g", ball),
    `<g stroke="#333" stroke-width="16" fill="none"><path d="M300 338 C450 338 450 180 600 180"/><path d="M300 338 C450 338 450 496 600 496"/>
     <path d="M600 180 C750 180 750 338 900 338"/><path d="M600 496 C750 496 750 338 900 338"/></g>
     <circle cx="300" cy="338" r="80" fill="url(#g)"/><circle cx="600" cy="180" r="62" fill="url(#g)"/>
     <circle cx="600" cy="496" r="62" fill="url(#g)"/><circle cx="900" cy="338" r="80" fill="url(#g)"/>`,
  ),
  vault: scene(
    shade("g", ball),
    `<rect x="340" y="90" width="520" height="500" rx="40" fill="#3a3a3a"/><rect x="370" y="120" width="460" height="440" rx="26" fill="#9a9a9a"/>
     <circle cx="600" cy="340" r="150" fill="url(#g)"/><circle cx="600" cy="340" r="54" fill="#eee"/>
     <g stroke="#eee" stroke-width="18" stroke-linecap="round"><line x1="600" y1="230" x2="600" y2="270"/><line x1="600" y1="410" x2="600" y2="450"/>
     <line x1="490" y1="340" x2="530" y2="340"/><line x1="670" y1="340" x2="710" y2="340"/></g>`,
  ),
  line: scene(
    linear("f", "#7a7a7a", "#ffffff"),
    `<path d="M160 520 L280 470 L380 490 L480 380 L580 410 L680 300 L780 330 L880 200 L1040 160 V600 H160 Z" fill="url(#f)"/>
     <path d="M160 520 L280 470 L380 490 L480 380 L580 410 L680 300 L780 330 L880 200 L1040 160" fill="none" stroke="#111" stroke-width="16" stroke-linejoin="round"/>`,
  ),
  pyramid: scene(
    "",
    `<polygon points="600,100 900,560 600,500" fill="#252525"/><polygon points="600,100 300,560 600,500" fill="#8a8a8a"/>
     <polygon points="300,560 600,500 900,560 600,610" fill="#555"/>`,
  ),
  lock: scene(
    linear("l", "#a8a8a8", "#1b1b1b", "1", "1"),
    `<path d="M480 300 V230 A120 120 0 0 1 720 230 V300" fill="none" stroke="#2a2a2a" stroke-width="54"/>
     <rect x="410" y="290" width="380" height="300" rx="36" fill="url(#l)"/><circle cx="600" cy="420" r="38" fill="#eee"/><rect x="584" y="430" width="32" height="80" rx="10" fill="#eee"/>`,
  ),
  hexes: scene(
    shade("g", [["0", "#d5d5d5"], ["1", "#262626"]], "30%", "25%", "90%"),
    [
      [600, 338],
      [600, 178],
      [600, 498],
      [462, 258],
      [738, 258],
      [462, 418],
      [738, 418],
    ]
      .map(([x, y], i) => {
        const r = 78;
        const pts = Array.from({ length: 6 }, (_, k) => {
          const a = (Math.PI / 3) * k;
          return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
        }).join(" ");
        return `<polygon points="${pts}" fill="${i === 0 ? "#1c1c1c" : "url(#g)"}"/>`;
      })
      .join(""),
  ),
  orbit: scene(
    shade("g", ball),
    `<ellipse cx="600" cy="338" rx="420" ry="120" fill="none" stroke="#333" stroke-width="14" transform="rotate(-14 600 338)"/>
     <circle cx="600" cy="338" r="170" fill="url(#g)"/><circle cx="930" cy="258" r="42" fill="#222"/><circle cx="300" cy="430" r="28" fill="#555"/>`,
  ),
  scales: scene(
    shade("g", ball),
    `<rect x="588" y="140" width="24" height="400" fill="#222"/><rect x="440" y="540" width="320" height="34" rx="10" fill="#222"/>
     <rect x="330" y="170" width="540" height="18" rx="9" fill="#333"/>
     <path d="M330 188 L260 360 H400 Z" fill="none" stroke="#444" stroke-width="8"/><path d="M870 188 L800 360 H940 Z" fill="none" stroke="#444" stroke-width="8"/>
     <ellipse cx="330" cy="365" rx="90" ry="26" fill="url(#g)"/><ellipse cx="870" cy="365" rx="90" ry="26" fill="url(#g)"/>
     <circle cx="600" cy="140" r="30" fill="url(#g)"/>`,
  ),
  people: scene(
    shade("g", ball),
    [380, 600, 820]
      .map((x, i) => `<circle cx="${x}" cy="${250 - (i === 1 ? 30 : 0)}" r="${i === 1 ? 88 : 72}" fill="url(#g)"/><path d="M${x - 140} 590 C${x - 140} 420 ${x + 140} 420 ${x + 140} 590 Z" fill="${["#666", "#2a2a2a", "#888"][i]}"/>`)
      .join(""),
  ),
  seal: scene(
    shade("g", ball),
    `<circle cx="600" cy="338" r="250" fill="#2a2a2a"/><circle cx="600" cy="338" r="210" fill="#bbb"/><circle cx="600" cy="338" r="180" fill="url(#g)"/>
     <path d="${A_PATH}" transform="translate(456 194) scale(4.5)" fill="#eee"/><path d="${BAR_PATH}" transform="translate(456 194) scale(4.5)" fill="#eee"/>`,
  ),
};

/** Samples a scene on a grid and redraws it as dots on the card colour. */
async function dither(svg, { w = W, h = H, cell = 10, bg = CARD, ink = INK, gamma = 1.1 } = {}) {
  const cols = Math.round(w / cell);
  const rows = Math.round(h / cell);
  const raw = await sharp(Buffer.from(svg)).resize(cols, rows, { fit: "fill" }).greyscale().raw().toBuffer();
  const parts = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dark = Math.pow(1 - raw[y * cols + x] / 255, gamma);
      const cx = (x + 0.5) * cell;
      const cy = (y + 0.5) * cell;
      if (dark < 0.04) {
        parts.push(`<circle cx="${cx}" cy="${cy}" r="${(cell * 0.09).toFixed(2)}" fill="${ink}" fill-opacity="0.22"/>`);
      } else {
        parts.push(`<circle cx="${cx}" cy="${cy}" r="${(cell * (0.12 + dark * 0.4)).toFixed(2)}" fill="${ink}"/>`);
      }
    }
  }
  const out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${bg}"/>${parts.join("")}</svg>`;
  return sharp(Buffer.from(out)).webp({ quality: 86 }).toBuffer();
}

const COVERS = [
  "globe", "cube", "coin", "bars", "stack", "shield", "donut", "flow", "vault", "line", "pyramid", "lock", "hexes", "orbit", "scales", "people", "seal",
];

await mkdir("public/brand", { recursive: true });
await mkdir("public/art", { recursive: true });

// Icons
await writeFile("src/app/icon.svg", tileSvg(64));
await writeFile("public/brand/atlas-mark.svg", tileSvg(64));
await writeFile("src/app/favicon.ico", ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(tileSvg(size), size) })))));
await sharp(Buffer.from(tileSvg(180)), { density: 384 }).resize(180, 180).flatten({ background: PAPER }).png().toFile("src/app/apple-icon.png");
await sharp(Buffer.from(tileSvg(512)), { density: 384 }).resize(512, 512).webp({ quality: 92 }).toFile("public/brand/atlas-icon.webp");

// Covers (16:9) and a square hero globe.
for (const name of COVERS) {
  await writeFile(`public/art/${name}.webp`, await dither(SCENES[name]));
}
const globeSquare = scene(
  shade("g", ball),
  `<circle cx="450" cy="450" r="360" fill="url(#g)"/>
   <g fill="none" stroke="#fff" stroke-width="12" opacity="0.9">
     <ellipse cx="450" cy="450" rx="360" ry="100"/><ellipse cx="450" cy="450" rx="360" ry="220"/>
     <ellipse cx="450" cy="450" rx="170" ry="360"/><ellipse cx="450" cy="450" rx="60" ry="360"/>
     <line x1="90" y1="450" x2="810" y2="450"/></g>`,
  900,
  900,
);
await writeFile("public/art/hero-globe.webp", await dither(globeSquare, { w: 900, h: 900, cell: 11, bg: PAPER }));

// Social card: dotted globe on the right, wordmark and slogan on the left.
const globeCard = await dither(globeSquare, { w: 630, h: 630, cell: 7, bg: PAPER });
const text = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <g transform="translate(80 150)">${tileSvg(96).replace("<svg", "<svg x='0' y='0'")}</g>
  <text x="80" y="330" font-family="Helvetica Neue, Arial, sans-serif" font-size="76" font-weight="600" letter-spacing="-3" fill="${INK}">Atlas Fund</text>
  <text x="80" y="390" font-family="Helvetica Neue, Arial, sans-serif" font-size="25" fill="#363636">Discipline, Automation, Transparency.</text>
  <text x="80" y="520" font-family="Menlo, monospace" font-size="22" letter-spacing="3" fill="#72706b">$ATLAS · ROBINHOOD CHAIN</text>
</svg>`;
await sharp(Buffer.from(text))
  .composite([{ input: globeCard, left: 560, top: 0 }])
  .webp({ quality: 88 })
  .toFile("public/brand/og.webp");

console.log("assets written");
