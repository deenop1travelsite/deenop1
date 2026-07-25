// Statische controle van het project (imports, exports, routes, tailwind-kleuren)
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
// Het alias @/ verwijst naar de projectroot (zie tsconfig.json)
const src = root;
const problemen = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const mappen = ["app", "components", "lib"].map((m) => path.join(root, m));
const bestanden = mappen.flatMap((m) => walk(m)).filter((f) => /\.tsx?$/.test(f));

// --- 1. Exports per bestand inventariseren ---
const exportsPer = new Map();
for (const f of bestanden) {
  const code = fs.readFileSync(f, "utf8");
  const namen = new Set();
  for (const m of code.matchAll(
    /export\s+(?:async\s+)?(?:function|const|let|class|type|interface|enum)\s+([A-Za-z0-9_$]+)/g,
  )) {
    namen.add(m[1]);
  }
  for (const m of code.matchAll(/export\s+\{([^}]+)\}/g)) {
    m[1]
      .split(",")
      .map((s) => s.trim().split(/\s+as\s+/).pop().trim())
      .filter(Boolean)
      .forEach((n) => namen.add(n));
  }
  if (/export\s+default/.test(code)) namen.add("default");
  exportsPer.set(f, namen);
}

function resolveAlias(spec) {
  const rel = spec.replace(/^@\//, "");
  const kandidaten = [
    path.join(src, rel + ".ts"),
    path.join(src, rel + ".tsx"),
    path.join(src, rel, "index.ts"),
    path.join(src, rel, "index.tsx"),
  ];
  return kandidaten.find((k) => fs.existsSync(k));
}

// --- 2. Imports controleren ---
for (const f of bestanden) {
  const code = fs.readFileSync(f, "utf8");
  const importRe = /import\s+(type\s+)?([\s\S]*?)\s+from\s+["']([^"']+)["']/g;
  for (const m of code.matchAll(importRe)) {
    const clause = m[2];
    const spec = m[3];
    if (!spec.startsWith("@/")) continue;
    const doel = resolveAlias(spec);
    if (!doel) {
      problemen.push(`${path.relative(root, f)}: import "${spec}" bestaat niet`);
      continue;
    }
    const beschikbaar = exportsPer.get(doel);
    // default import
    const defaultMatch = clause.match(/^\s*([A-Za-z0-9_$]+)\s*(?:,|$)/);
    if (defaultMatch && !clause.trim().startsWith("{")) {
      if (!beschikbaar.has("default")) {
        problemen.push(
          `${path.relative(root, f)}: "${spec}" heeft geen default export (${defaultMatch[1]})`,
        );
      }
    }
    const named = clause.match(/\{([\s\S]*?)\}/);
    if (named) {
      named[1]
        .split(",")
        .map((s) => s.trim().replace(/^type\s+/, "").trim().split(/\s+as\s+/)[0].trim())
        .filter(Boolean)
        .forEach((naam) => {
          if (!beschikbaar.has(naam)) {
            problemen.push(`${path.relative(root, f)}: "${naam}" niet geëxporteerd door ${spec}`);
          }
        });
    }
  }
}

// --- 3. Routes controleren ---
const appDir = path.join(root, "app");
const routes = new Set(["/"]);
function collectRoutes(dir, prefix = "") {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    if (e.name === "api") continue;
    const seg = e.name.startsWith("[") ? ":param" : e.name;
    const nieuw = `${prefix}/${seg}`;
    if (fs.existsSync(path.join(dir, e.name, "page.tsx"))) routes.add(nieuw);
    collectRoutes(path.join(dir, e.name), nieuw);
  }
}
collectRoutes(appDir);

const dynamischePrefixes = [...routes]
  .filter((r) => r.includes(":param"))
  .map((r) => r.split("/:param")[0]);

for (const f of bestanden) {
  const code = fs.readFileSync(f, "utf8");
  for (const m of code.matchAll(/href=(?:"|\{")(\/[^"?#]*)/g)) {
    const pad = m[1].replace(/\/$/, "") || "/";
    if (routes.has(pad)) continue;
    if (dynamischePrefixes.some((p) => pad.startsWith(p + "/"))) continue;
    problemen.push(`${path.relative(root, f)}: link "${pad}" heeft geen pagina`);
  }
  for (const m of code.matchAll(/href=\{`(\/[^`?]*)/g)) {
    const pad = m[1].split("${")[0].replace(/\/$/, "") || "/";
    if (routes.has(pad)) continue;
    if (dynamischePrefixes.some((p) => pad === p || pad.startsWith(p + "/"))) continue;
    if ([...routes].some((r) => r.startsWith(pad))) continue;
    problemen.push(`${path.relative(root, f)}: template-link "${pad}" heeft geen pagina`);
  }
}

// --- 4. Tailwind-kleurschakeringen controleren ---
const tw = fs.readFileSync(path.join(root, "tailwind.config.ts"), "utf8");
function schakeringen(kleur) {
  const blok = tw.split(`${kleur}: {`)[1]?.split("}")[0] ?? "";
  return new Set([...blok.matchAll(/(\d+):/g)].map((m) => m[1]));
}
const navy = schakeringen("navy");
const gold = schakeringen("gold");
for (const f of bestanden) {
  const code = fs.readFileSync(f, "utf8");
  for (const m of code.matchAll(/\b(?:bg|text|border|ring|from|via|to|decoration|divide|fill|stroke|placeholder|marker|caret|accent|shadow|outline)-(navy|gold)-(\d+)/g)) {
    const set = m[1] === "navy" ? navy : gold;
    if (!set.has(m[2])) {
      problemen.push(`${path.relative(root, f)}: kleur ${m[1]}-${m[2]} bestaat niet in de config`);
    }
  }
}

// --- 5. "use client" waar hooks gebruikt worden ---
for (const f of bestanden) {
  const code = fs.readFileSync(f, "utf8");
  const gebruiktHook = /\b(useState|useEffect|useMemo|useSearchParams|usePathname|useRef)\s*\(/.test(code);
  const isClient = /^["']use client["']/m.test(code);
  if (gebruiktHook && !isClient) {
    problemen.push(`${path.relative(root, f)}: gebruikt hooks maar mist "use client"`);
  }
}

// --- 6. Balans van accolades/haken per bestand ---
for (const f of bestanden) {
  const code = fs.readFileSync(f, "utf8")
    // Blokcommentaar weghalen, maar de regelnummering behouden
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    // Regelcommentaar weghalen. Niet na ":", "\" of "/", zodat URL's en
    // reguliere expressies (zoals /https?:\/\//) intact blijven.
    .replace(/(^|[^:\\/])\/\/.*$/gm, "$1");
  let cnt = { "{": 0, "(": 0, "[": 0 };
  let inStr = null;
  let vorigeTeken = "";
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    // Geëscapete tekens overslaan, bijvoorbeeld \[ in een reguliere expressie
    if (c === "\\") {
      i++;
      continue;
    }
    if (inStr) {
      if (c === inStr) inStr = null;
      continue;
    }
    // Let op: enkele quotes worden overgeslagen omdat Nederlandse tekst
    // apostrofs bevat (zoals "programma's") in JSX-tekst.
    if (c === '"' || c === "`") {
      inStr = c;
      vorigeTeken = c;
      continue;
    }
    // Reguliere expressie in zijn geheel overslaan. Die kan aanhalingstekens en
    // losse haken bevatten, bijvoorbeeld /"/g of /[(]/ — die tellen niet mee.
    if (c === "/" && (vorigeTeken === "" || "(,=:[!&|?{};+*~^%".includes(vorigeTeken))) {
      let j = i + 1;
      let inKlasse = false;
      let gesloten = false;
      while (j < code.length) {
        const t = code[j];
        if (t === "\\") { j += 2; continue; }
        if (t === "\n") break; // geen reguliere expressie, toch een deling
        if (t === "[") inKlasse = true;
        else if (t === "]") inKlasse = false;
        else if (t === "/" && !inKlasse) { gesloten = true; break; }
        j++;
      }
      if (gesloten) {
        i = j;
        vorigeTeken = "/";
        continue;
      }
    }
    if (c === "{") cnt["{"]++;
    if (c === "}") cnt["{"]--;
    if (c === "(") cnt["("]++;
    if (c === ")") cnt["("]--;
    if (c === "[") cnt["["]++;
    if (c === "]") cnt["["]--;
    if (c.trim() !== "") vorigeTeken = c;
  }
  for (const [k, v] of Object.entries(cnt)) {
    if (v !== 0) problemen.push(`${path.relative(root, f)}: onbalans "${k}" (${v})`);
  }
}

// --- 7. SEO: elke pagina heeft metadata ---
const paginaBestanden = bestanden.filter((f) => /\/app\/.*page\.tsx$/.test(f));
for (const f of paginaBestanden) {
  const code = fs.readFileSync(f, "utf8");
  const rel = path.relative(root, f);
  const heeftMetadata =
    /export const metadata/.test(code) || /export (async )?function generateMetadata/.test(code);
  // De homepage erft de metadata uit app/layout.tsx
  if (!heeftMetadata && rel !== "app/page.tsx") {
    problemen.push(`${rel}: geen metadata (titel en omschrijving) gedefinieerd`);
  }
}

// --- 8. Toegankelijkheid: afbeeldingen hebben alt-tekst ---
for (const f of bestanden) {
  const code = fs.readFileSync(f, "utf8");
  const rel = path.relative(root, f);
  for (const m of code.matchAll(/<(Image|img)\b[\s\S]{0,400}?\/>/g)) {
    if (!/\balt=/.test(m[0])) {
      problemen.push(`${rel}: een <${m[1]}> mist een alt-tekst`);
    }
  }
  // Knoppen zonder tekst hebben een aria-label nodig
  for (const m of code.matchAll(/<button\b[^>]*>/g)) {
    const heeftLabel = /aria-label=/.test(m[0]);
    const isIcoonKnop = /className="[^"]*h-11 w-11/.test(m[0]);
    if (isIcoonKnop && !heeftLabel) {
      problemen.push(`${rel}: een icoonknop mist aria-label`);
    }
  }
}

// --- 9. Animaties: klassen bestaan in de tailwind-config ---
const animaties = new Set([...tw.matchAll(/^\s{8}"?([a-z-]+)"?:\s*"/gm)].map((m) => m[1]));
for (const f of bestanden) {
  const code = fs.readFileSync(f, "utf8");
  for (const m of code.matchAll(/\banimate-([a-z-]+)/g)) {
    if (!tw.includes(`"${m[1]}"`) && !tw.includes(`${m[1]}:`) && !animaties.has(m[1])) {
      problemen.push(`${path.relative(root, f)}: animatie "${m[1]}" bestaat niet in de config`);
    }
  }
}

console.log("Bestanden gecontroleerd:", bestanden.length);
console.log("Pagina's met metadata:", paginaBestanden.length);
console.log("Routes gevonden:", [...routes].sort().join(", "));
console.log("");
if (problemen.length === 0) {
  console.log("✅ Geen problemen gevonden.");
} else {
  console.log(`❌ ${problemen.length} probleem/problemen:`);
  problemen.forEach((p) => console.log(" -", p));
}
