/**
 * Test van de formuliervalidatie, de spamcontrole en de reisgegevens.
 * Draaien met:  npm test        (Node 22 of nieuwer, geen extra pakketten nodig)
 */
import fs from "node:fs";
import {
  isGeldigEmail,
  isGeldigTelefoonnummer,
  maakReferentie,
  spamReden,
  valideerAanvraag,
  type AanvraagPayload,
} from "../lib/aanvraag.ts";
import { reizen } from "../lib/data/reizen.ts";

let mislukt = 0;

function verwacht(omschrijving: string, voorwaarde: boolean) {
  console.log(`${voorwaarde ? "OK  " : "FOUT"} ${omschrijving}`);
  if (!voorwaarde) mislukt++;
}

const geldig: AanvraagPayload = {
  type: "reis",
  reisId: reizen[0].id,
  volledigeNaam: "Adam Youssef",
  email: "adam@voorbeeld.nl",
  telefoon: "06 12 34 56 78",
  woonplaats: "Amsterdam",
  aantalVolwassenen: "2",
  aantalKinderen: "0",
  leeftijdenKinderen: "",
  kamerindeling: "Tweepersoonskamer",
  reisgezelschap: "Ik reis met mijn partner",
  contactVoorkeur: "WhatsApp",
  opmerkingen: "",
  akkoordPrivacy: true,
};

console.log("--- Validatie ---");
verwacht("volledig ingevuld formulier is geldig", Object.keys(valideerAanvraag(geldig)).length === 0);
verwacht(
  "naam zonder achternaam wordt geweigerd",
  Boolean(valideerAanvraag({ ...geldig, volledigeNaam: "Adam" }).volledigeNaam),
);
verwacht("reis is verplicht", Boolean(valideerAanvraag({ ...geldig, reisId: "" }).reisId));
verwacht("woonplaats is verplicht", Boolean(valideerAanvraag({ ...geldig, woonplaats: "" }).woonplaats));
verwacht(
  "minimaal één volwassene",
  Boolean(valideerAanvraag({ ...geldig, aantalVolwassenen: "0" }).aantalVolwassenen),
);
verwacht(
  "leeftijden verplicht wanneer er kinderen meereizen",
  Boolean(valideerAanvraag({ ...geldig, aantalKinderen: "2" }).leeftijdenKinderen),
);
verwacht(
  "aantal leeftijden moet overeenkomen met aantal kinderen",
  Boolean(
    valideerAanvraag({ ...geldig, aantalKinderen: "2", leeftijdenKinderen: "6" }).leeftijdenKinderen,
  ),
);
verwacht(
  "twee kinderen met twee leeftijden is geldig",
  Object.keys(valideerAanvraag({ ...geldig, aantalKinderen: "2", leeftijdenKinderen: "6 en 9" }))
    .length === 0,
);
verwacht(
  "kind van 19 wordt geweigerd",
  Boolean(
    valideerAanvraag({ ...geldig, aantalKinderen: "1", leeftijdenKinderen: "19" }).leeftijdenKinderen,
  ),
);
verwacht(
  "akkoord privacyverklaring is verplicht",
  Boolean(valideerAanvraag({ ...geldig, akkoordPrivacy: false }).akkoordPrivacy),
);
verwacht(
  "onbekende contactwijze wordt geweigerd",
  Boolean(valideerAanvraag({ ...geldig, contactVoorkeur: "Duif" }).contactVoorkeur),
);
verwacht(
  "contactbericht zonder tekst wordt geweigerd",
  Boolean(valideerAanvraag({ ...geldig, type: "contact", opmerkingen: "" }).opmerkingen),
);
verwacht(
  "te veel links wordt geweigerd",
  Boolean(
    valideerAanvraag({ ...geldig, opmerkingen: "http://a.nl http://b.nl http://c.nl" }).opmerkingen,
  ),
);

console.log("\n--- E-mail en telefoon ---");
verwacht("adam@voorbeeld.nl is geldig", isGeldigEmail("adam@voorbeeld.nl"));
verwacht("adam@@voorbeeld.nl is ongeldig", !isGeldigEmail("adam@@voorbeeld.nl"));
verwacht("adam@voorbeeld is ongeldig", !isGeldigEmail("adam@voorbeeld"));
verwacht("0612345678 is geldig", isGeldigTelefoonnummer("0612345678"));
verwacht("(06) 12-34-56-78 is geldig", isGeldigTelefoonnummer("(06) 12-34-56-78"));
verwacht("+31 6 12345678 is geldig", isGeldigTelefoonnummer("+31 6 12345678"));
verwacht("12 is ongeldig", !isGeldigTelefoonnummer("12"));
verwacht("letters zijn ongeldig", !isGeldigTelefoonnummer("bel mij maar"));

console.log("\n--- Spambescherming ---");
verwacht("ingevuld vangnetveld wordt geweigerd", spamReden({ ...geldig, vangnet: "x" }) !== null);
verwacht(
  "binnen 3 seconden verstuurd wordt geweigerd",
  spamReden({ ...geldig, startTijd: Date.now() - 500 }) !== null,
);
verwacht(
  "normaal ingevuld formulier wordt doorgelaten",
  spamReden({ ...geldig, startTijd: Date.now() - 9000 }) === null,
);
verwacht("referentienummer heeft juiste opbouw", /^AV-\d{8}-\d{4}$/.test(maakReferentie()));

console.log("\n--- Reisgegevens ---");
for (const reis of reizen) {
  const dagen =
    Math.round(
      (new Date(reis.terugreisdatum).getTime() - new Date(reis.vertrekdatum).getTime()) / 86400000,
    ) + 1;
  verwacht(`${reis.id}: aantal dagen klopt met de data (${dagen})`, dagen === reis.aantalDagen);
  verwacht(`${reis.id}: heeft een dagprogramma`, reis.dagprogramma.length > 0);
  verwacht(`${reis.id}: heeft inbegrepen en niet-inbegrepen diensten`,
    reis.inbegrepen.length > 0 && reis.nietInbegrepen.length > 0);
  verwacht(
    `${reis.id}: beschikbare plaatsen niet hoger dan totaal`,
    reis.beschikbarePlaatsen <= reis.totaalPlaatsen,
  );
}
verwacht("alle reis-ID's zijn uniek", new Set(reizen.map((r) => r.id)).size === reizen.length);
verwacht("alle slugs zijn uniek", new Set(reizen.map((r) => r.slug)).size === reizen.length);

/* De server accepteert alleen bekende velden. Wijkt het formulier daarvan af,
   dan zou elke inzending worden geweigerd. Daarom hier een vaste controle. */
console.log("\n--- Formuliervelden versus de lijst op de server ---");
{
  const lees = (bestand: string) =>
    fs.readFileSync(new URL(`../${bestand}`, import.meta.url), "utf8");

  const route = lees("app/api/aanvraag/route.ts");
  const blok = route.split("const toegestaneVelden = [")[1]?.split("]")[0] ?? "";
  const toegestaan = new Set([...blok.matchAll(/"([a-zA-Z]+)"/g)].map((m) => m[1]));

  for (const bestand of ["components/AanvraagFormulier.tsx", "components/ContactFormulier.tsx"]) {
    const code = lees(bestand);
    const naObject = code.split("AanvraagPayload = {")[1] ?? "";
    const einde = naObject.search(/^\s*\};/m);
    const payload = einde > 0 ? naObject.slice(0, einde) : "";
    const velden = [...payload.matchAll(/^\s+([a-zA-Z]+):/gm)].map((m) => m[1]);
    const buiten = velden.filter((veld) => !toegestaan.has(veld));
    verwacht(
      `${bestand}: alle ${velden.length} verstuurde velden staan op de serverlijst`,
      velden.length > 5 && buiten.length === 0,
    );
    if (buiten.length > 0) console.log("     niet toegestaan:", buiten.join(", "));
  }

  verwacht("de serverlijst bevat de verwachte velden", toegestaan.has("volledigeNaam") && toegestaan.has("startTijd"));
}

/* De sleutel mag nergens in de broncode staan en er mag geen NEXT_PUBLIC-variant zijn. */
console.log("\n--- Beveiliging van de API-sleutel ---");
{
  const mappen = ["app", "components", "lib"];
  const alleBestanden: string[] = [];
  const loop = (map: string) => {
    for (const item of fs.readdirSync(new URL(`../${map}`, import.meta.url), { withFileTypes: true })) {
      if (item.isDirectory()) loop(`${map}/${item.name}`);
      else if (/\.tsx?$/.test(item.name)) alleBestanden.push(`${map}/${item.name}`);
    }
  };
  mappen.forEach(loop);

  const inhoud = alleBestanden
    .map((b) => fs.readFileSync(new URL(`../${b}`, import.meta.url), "utf8"))
    .join("\n");

  verwacht("geen NEXT_PUBLIC_RESEND-variabele", !inhoud.includes("NEXT_PUBLIC_RESEND"));
  verwacht("geen sleutelwaarde in de broncode", !/re_[A-Za-z0-9]{10,}/.test(inhoud));
  verwacht(
    "de sleutel wordt alleen in de Route Handler gelezen",
    alleBestanden.filter((b) =>
      fs.readFileSync(new URL(`../${b}`, import.meta.url), "utf8").includes("process.env.RESEND_API_KEY"),
    ).join() === "app/api/aanvraag/route.ts",
  );
}

console.log("");
if (mislukt === 0) {
  console.log("✅ Alle tests geslaagd.");
} else {
  console.log(`❌ ${mislukt} test(s) mislukt.`);
  process.exitCode = 1;
}
