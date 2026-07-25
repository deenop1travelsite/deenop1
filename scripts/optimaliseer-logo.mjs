/**
 * Logo klaarmaken voor de website, zonder extra pakketten.
 *
 * Wat dit script doet:
 *  1. de transparante rand rondom het logo weghalen (bijsnijden op de zichtbare inhoud);
 *  2. het logo verkleinen naar een webvriendelijk formaat;
 *  3. de originele beeldverhouding exact behouden (gelijke factor voor breedte en hoogte);
 *  4. de exacte afmetingen wegschrijven naar lib/logo.ts, zodat next/image die kan gebruiken.
 *
 * Gebruik:  node scripts/optimaliseer-logo.mjs <bronbestand.png>
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
const bron = process.argv[2];
const doelBestand = path.join(root, "public", "deen-op-1-travel-logo.png");
const doelTypes = path.join(root, "lib", "logo.ts");
const maxZijde = 900; // ruim genoeg voor weergave tot ~300 px op een retina-scherm

if (!bron || !fs.existsSync(bron)) {
  console.error("Geef een bestaand PNG-bestand mee, bijvoorbeeld:");
  console.error("  node scripts/optimaliseer-logo.mjs ~/Desktop/logo.png");
  process.exit(1);
}

/* ---------- PNG lezen ---------- */

function leesChunks(buffer) {
  if (buffer.readUInt32BE(0) !== 0x89504e47) throw new Error("Dit is geen PNG-bestand.");
  const chunks = [];
  let i = 8;
  while (i < buffer.length) {
    const lengte = buffer.readUInt32BE(i);
    const type = buffer.toString("ascii", i + 4, i + 8);
    chunks.push({ type, data: buffer.subarray(i + 8, i + 8 + lengte) });
    i += 12 + lengte;
  }
  return chunks;
}

const bestand = fs.readFileSync(bron);
const chunks = leesChunks(bestand);
const ihdr = chunks.find((c) => c.type === "IHDR").data;
const breedte = ihdr.readUInt32BE(0);
const hoogte = ihdr.readUInt32BE(4);
const bitdiepte = ihdr[8];
const kleurtype = ihdr[9];
const interlace = ihdr[12];

if (bitdiepte !== 8 || kleurtype !== 6 || interlace !== 0) {
  console.error(
    `Dit script verwacht een niet-interlaced PNG van 8 bit met transparantie (RGBA). ` +
      `Gevonden: bitdiepte ${bitdiepte}, kleurtype ${kleurtype}, interlace ${interlace}.`,
  );
  process.exit(1);
}

const idat = zlib.inflateSync(
  Buffer.concat(chunks.filter((c) => c.type === "IDAT").map((c) => c.data)),
);

/* ---------- Filters ongedaan maken ---------- */

const bpp = 4;
const pixels = Buffer.alloc(breedte * hoogte * bpp);
let bron_i = 0;
for (let y = 0; y < hoogte; y++) {
  const filter = idat[bron_i++];
  const regel = pixels.subarray(y * breedte * bpp, (y + 1) * breedte * bpp);
  const vorige = y > 0 ? pixels.subarray((y - 1) * breedte * bpp, y * breedte * bpp) : null;
  for (let x = 0; x < breedte * bpp; x++) {
    const ruw = idat[bron_i++];
    const a = x >= bpp ? regel[x - bpp] : 0;
    const b = vorige ? vorige[x] : 0;
    const c = vorige && x >= bpp ? vorige[x - bpp] : 0;
    let waarde;
    switch (filter) {
      case 0: waarde = ruw; break;
      case 1: waarde = ruw + a; break;
      case 2: waarde = ruw + b; break;
      case 3: waarde = ruw + ((a + b) >> 1); break;
      case 4: {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        waarde = ruw + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
        break;
      }
      default: throw new Error(`Onbekend filtertype ${filter} op regel ${y}.`);
    }
    regel[x] = waarde & 0xff;
  }
}

/* ---------- Transparante rand bepalen ---------- */

const drempel = 8; // alfawaarden hieronder gelden als leeg
let minX = breedte, minY = hoogte, maxX = -1, maxY = -1;
for (let y = 0; y < hoogte; y++) {
  for (let x = 0; x < breedte; x++) {
    if (pixels[(y * breedte + x) * bpp + 3] > drempel) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
if (maxX < 0) throw new Error("Het logo lijkt volledig transparant.");

// Kleine gelijke marge aanhouden, zodat het logo niet tegen de rand plakt
const marge = Math.round(Math.max(maxX - minX, maxY - minY) * 0.02);
minX = Math.max(0, minX - marge);
minY = Math.max(0, minY - marge);
maxX = Math.min(breedte - 1, maxX + marge);
maxY = Math.min(hoogte - 1, maxY + marge);

const knipBreedte = maxX - minX + 1;
const knipHoogte = maxY - minY + 1;

/* ---------- Verkleinen met behoud van verhouding ---------- */

/**
 * Verkleint een uitsnede naar doelBreedte × doelHoogte door het gemiddelde
 * van het bijbehorende gebied te nemen. De alfa wordt meegewogen, zodat er
 * geen lichte randjes ontstaan rond transparante delen.
 */
function verklein(uitsnede, doelBreedte, doelHoogte) {
  const { x0, y0, w, h } = uitsnede;
  const uit = Buffer.alloc(doelBreedte * doelHoogte * bpp);
  const stapX = w / doelBreedte;
  const stapY = h / doelHoogte;

  for (let y = 0; y < doelHoogte; y++) {
    const vanY = y0 + Math.floor(y * stapY);
    const totY = y0 + Math.min(h, Math.max(Math.ceil((y + 1) * stapY), Math.floor(y * stapY) + 1));
    for (let x = 0; x < doelBreedte; x++) {
      const vanX = x0 + Math.floor(x * stapX);
      const totX = x0 + Math.min(w, Math.max(Math.ceil((x + 1) * stapX), Math.floor(x * stapX) + 1));

      let r = 0, g = 0, b = 0, a = 0, aantal = 0;
      for (let yy = vanY; yy < totY; yy++) {
        for (let xx = vanX; xx < totX; xx++) {
          const i = (yy * breedte + xx) * bpp;
          const alfa = pixels[i + 3] / 255;
          r += pixels[i] * alfa;
          g += pixels[i + 1] * alfa;
          b += pixels[i + 2] * alfa;
          a += pixels[i + 3];
          aantal++;
        }
      }
      const j = (y * doelBreedte + x) * bpp;
      const gemAlfa = a / (aantal || 1);
      const deler = (gemAlfa / 255) * (aantal || 1) || 1;
      uit[j] = Math.min(255, Math.round(r / deler));
      uit[j + 1] = Math.min(255, Math.round(g / deler));
      uit[j + 2] = Math.min(255, Math.round(b / deler));
      uit[j + 3] = Math.round(gemAlfa);
    }
  }
  return uit;
}

// Eén en dezelfde schaalfactor voor breedte en hoogte: geen vervorming.
const schaal = Math.min(1, maxZijde / Math.max(knipBreedte, knipHoogte));
const nieuweBreedte = Math.max(1, Math.round(knipBreedte * schaal));
const nieuweHoogte = Math.max(1, Math.round(knipHoogte * schaal));
const uitsnede = { x0: minX, y0: minY, w: knipBreedte, h: knipHoogte };
const uit = verklein(uitsnede, nieuweBreedte, nieuweHoogte);

/* ---------- PNG wegschrijven ---------- */

const crcTabel = (() => {
  const tabel = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    tabel[n] = c;
  }
  return tabel;
})();

function crc32(buffer) {
  let c = -1;
  for (let i = 0; i < buffer.length; i++) c = crcTabel[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const lengte = Buffer.alloc(4);
  lengte.writeUInt32BE(data.length);
  const inhoud = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(inhoud));
  return Buffer.concat([lengte, inhoud, crc]);
}

function maakPng(data, w, h) {
  // Elke regel voorafgegaan door filtertype 1 (Sub): compacter dan geen filter.
  const rauw = Buffer.alloc(h * (1 + w * bpp));
  let doel_i = 0;
  for (let y = 0; y < h; y++) {
    rauw[doel_i++] = 1;
    const regelStart = y * w * bpp;
    for (let x = 0; x < w * bpp; x++) {
      const links = x >= bpp ? data[regelStart + x - bpp] : 0;
      rauw[doel_i++] = (data[regelStart + x] - links) & 0xff;
    }
  }

  const nieuwIhdr = Buffer.alloc(13);
  nieuwIhdr.writeUInt32BE(w, 0);
  nieuwIhdr.writeUInt32BE(h, 4);
  nieuwIhdr[8] = 8;
  nieuwIhdr[9] = 6;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", nieuwIhdr),
    chunk("IDAT", zlib.deflateSync(rauw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const png = maakPng(uit, nieuweBreedte, nieuweHoogte);
fs.mkdirSync(path.dirname(doelBestand), { recursive: true });
fs.writeFileSync(doelBestand, png);

/* ---------- Iconen en deelafbeelding: logo op een donkerblauw vlak ---------- */

// navy-950 uit tailwind.config.ts (#080f22)
const achtergrond = [0x08, 0x0f, 0x22];

/**
 * Zet het logo gecentreerd op een donkerblauw vlak van doelBreedte × doelHoogte.
 * De schaal is voor breedte en hoogte gelijk, dus het logo wordt niet vervormd.
 */
function opDonkerVlak(doelBreedte, doelHoogte, margeDeel) {
  const ruimteBreedte = doelBreedte * (1 - margeDeel * 2);
  const ruimteHoogte = doelHoogte * (1 - margeDeel * 2);
  const logoSchaal = Math.min(ruimteBreedte / knipBreedte, ruimteHoogte / knipHoogte);
  const logoBreedte = Math.max(1, Math.round(knipBreedte * logoSchaal));
  const logoHoogte = Math.max(1, Math.round(knipHoogte * logoSchaal));
  const klein = verklein(uitsnede, logoBreedte, logoHoogte);

  const vlak = Buffer.alloc(doelBreedte * doelHoogte * bpp);
  for (let i = 0; i < doelBreedte * doelHoogte; i++) {
    vlak[i * bpp] = achtergrond[0];
    vlak[i * bpp + 1] = achtergrond[1];
    vlak[i * bpp + 2] = achtergrond[2];
    vlak[i * bpp + 3] = 255;
  }

  const startX = Math.round((doelBreedte - logoBreedte) / 2);
  const startY = Math.round((doelHoogte - logoHoogte) / 2);
  for (let y = 0; y < logoHoogte; y++) {
    for (let x = 0; x < logoBreedte; x++) {
      const van = (y * logoBreedte + x) * bpp;
      const naar = ((startY + y) * doelBreedte + startX + x) * bpp;
      const alfa = klein[van + 3] / 255;
      for (let k = 0; k < 3; k++) {
        vlak[naar + k] = Math.round(klein[van + k] * alfa + vlak[naar + k] * (1 - alfa));
      }
    }
  }
  return vlak;
}

// Favicon (Next.js pakt app/icon.png automatisch op)
const iconZijde = 256;
fs.writeFileSync(
  path.join(root, "app", "icon.png"),
  maakPng(opDonkerVlak(iconZijde, iconZijde, 0.1), iconZijde, iconZijde),
);

// Icoon voor het beginscherm van iOS
const appleZijde = 180;
fs.writeFileSync(
  path.join(root, "app", "apple-icon.png"),
  maakPng(opDonkerVlak(appleZijde, appleZijde, 0.12), appleZijde, appleZijde),
);

// Deelafbeelding voor WhatsApp, Facebook, LinkedIn en X (Open Graph)
const ogBreedte = 1200;
const ogHoogte = 630;
fs.writeFileSync(
  path.join(root, "app", "opengraph-image.png"),
  maakPng(opDonkerVlak(ogBreedte, ogHoogte, 0.16), ogBreedte, ogHoogte),
);

fs.writeFileSync(
  doelTypes,
  `/**
 * Afmetingen van het logo in public/deen-op-1-travel-logo.png.
 * Automatisch gegenereerd door scripts/optimaliseer-logo.mjs — niet handmatig aanpassen.
 * next/image gebruikt deze waarden om de beeldverhouding exact te behouden.
 */
export const logo = {
  src: "/deen-op-1-travel-logo.png",
  breedte: ${nieuweBreedte},
  hoogte: ${nieuweHoogte},
  alt: "Deen op 1 Travel",
} as const;
`,
);

const oud = bestand.length / 1024;
const nieuw = png.length / 1024;
console.log(`Bron:        ${breedte} × ${hoogte} px, ${oud.toFixed(0)} kB`);
console.log(`Bijgesneden: ${knipBreedte} × ${knipHoogte} px (transparante rand verwijderd)`);
console.log(`Resultaat:   ${nieuweBreedte} × ${nieuweHoogte} px, ${nieuw.toFixed(0)} kB`);
console.log(`Verhouding:  ${(knipBreedte / knipHoogte).toFixed(4)} → ${(nieuweBreedte / nieuweHoogte).toFixed(4)}`);
console.log(`Favicon:     ${iconZijde} × ${iconZijde} px (app/icon.png)`);
console.log(`iOS-icoon:   ${appleZijde} × ${appleZijde} px (app/apple-icon.png)`);
console.log(`Deelplaatje: ${ogBreedte} × ${ogHoogte} px (app/opengraph-image.png)`);
console.log(`Ook bijgewerkt: lib/logo.ts`);
