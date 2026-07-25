import fs from "node:fs";
import path from "node:path";

/**
 * Welke hero-foto's staan er in public/?
 * De controle draait tijdens het bouwen, zodat er nooit een verwijzing naar
 * een ontbrekend bestand in de pagina belandt.
 *
 *   hero-kaaba.jpg         → desktop (vanaf 768 px)
 *   hero-kaaba-mobiel.png  → telefoons (tot 768 px)
 */
function bestaat(naam: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", naam));
  } catch {
    return false;
  }
}

export const heroFoto = {
  desktop: "hero-kaaba.jpg",
  mobiel: "hero-kaaba-mobiel.png",
} as const;

export const heeftDesktopFoto = bestaat(heroFoto.desktop);
export const heeftMobieleFoto = bestaat(heroFoto.mobiel);
