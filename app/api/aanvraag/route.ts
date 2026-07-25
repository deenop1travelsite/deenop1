import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  heeftFouten,
  maakReferentie,
  spamReden,
  valideerAanvraag,
  verbodenVeldwoorden,
  type AanvraagPayload,
} from "@/lib/aanvraag";
import { getReisById } from "@/lib/data/reizen";
import { formatDatum, formatPrijs } from "@/lib/format";
import { site } from "@/lib/site";

/**
 * Verwerkt aanvragen en contactberichten en verstuurt via Resend twee e-mails:
 *   1. de volledige aanvraag naar CONTACT_EMAIL (het zakelijke adres);
 *   2. een automatische ontvangstbevestiging naar de klant.
 *
 * Beveiliging en privacy:
 * - Deze code draait uitsluitend op de server. RESEND_API_KEY komt nooit in de
 *   browser terecht en er bestaat geen NEXT_PUBLIC-variant van deze sleutel.
 * - Er staat geen sleutel in de broncode; alle waarden komen uit .env.local.
 * - Alleen de velden die daadwerkelijk in de formulieren staan worden geaccepteerd.
 * - Er wordt geen betaling verwerkt en er wordt geen BSN, paspoortnummer,
 *   paspoortscan, medisch gegeven of betaalgegeven gevraagd of geaccepteerd.
 * - Er is geen database. In de console komen nooit sleutels of persoonsgegevens.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/* 1. Toegestane velden                                                */
/* ------------------------------------------------------------------ */

/** Precies de velden die de formulieren versturen. Al het andere wordt geweigerd. */
const toegestaneVelden = [
  "type",
  "reisId",
  "volledigeNaam",
  "email",
  "telefoon",
  "woonplaats",
  "aantalVolwassenen",
  "aantalKinderen",
  "leeftijdenKinderen",
  "kamerindeling",
  "reisgezelschap",
  "contactVoorkeur",
  "onderwerp",
  "opmerkingen",
  "akkoordPrivacy",
  "vangnet",
  "startTijd",
] as const;

const maximaleLengtes: Record<string, number> = {
  reisId: 40,
  volledigeNaam: 80,
  email: 254,
  telefoon: 25,
  woonplaats: 60,
  aantalVolwassenen: 3,
  aantalKinderen: 3,
  leeftijdenKinderen: 60,
  kamerindeling: 60,
  reisgezelschap: 60,
  contactVoorkeur: 20,
  onderwerp: 60,
  opmerkingen: 2000,
  vangnet: 100,
};

type Opgeschoond = { ok: true; payload: AanvraagPayload } | { ok: false; melding: string };

/**
 * Haalt uitsluitend de bekende velden uit het verzoek, maakt de tekst schoon en
 * weigert onbekende of gevoelige velden.
 */
function schoonOp(ruwe: unknown): Opgeschoond {
  if (typeof ruwe !== "object" || ruwe === null || Array.isArray(ruwe)) {
    return { ok: false, melding: "Wij konden uw aanvraag niet lezen. Probeer het opnieuw." };
  }

  const binnen = ruwe as Record<string, unknown>;
  const sleutels = Object.keys(binnen);

  // Gevoelige velden accepteren wij nooit.
  if (
    sleutels.some((sleutel) =>
      verbodenVeldwoorden.some((verboden) => sleutel.toLowerCase().includes(verboden)),
    )
  ) {
    return {
      ok: false,
      melding:
        "Uw aanvraag bevat gegevens die wij niet via de website verwerken, zoals paspoort-, medische of betaalgegevens. Laat deze weg en probeer het opnieuw.",
    };
  }

  // Onbekende velden weigeren.
  const onbekend = sleutels.filter(
    (sleutel) => !(toegestaneVelden as readonly string[]).includes(sleutel),
  );
  if (onbekend.length > 0) {
    return {
      ok: false,
      melding:
        "Uw aanvraag bevat velden die wij niet verwachten. Vernieuw de pagina en probeer het opnieuw.",
    };
  }

  const type: AanvraagPayload["type"] = binnen.type === "contact" ? "contact" : "reis";

  const tekst = (naam: string): string => {
    const waarde = binnen[naam];
    if (typeof waarde !== "string") return "";
    const max = maximaleLengtes[naam] ?? 200;
    // Regeleindes behouden in het vrije tekstveld, elders weghalen.
    const schoon = naam === "opmerkingen" ? waarde : waarde.replace(/[\r\n\t]/g, " ");
    return schoon.trim().slice(0, max);
  };

  const payload: AanvraagPayload = {
    type,
    reisId: tekst("reisId") || undefined,
    volledigeNaam: tekst("volledigeNaam"),
    email: tekst("email").toLowerCase(),
    telefoon: tekst("telefoon"),
    woonplaats: tekst("woonplaats"),
    aantalVolwassenen: tekst("aantalVolwassenen"),
    aantalKinderen: tekst("aantalKinderen"),
    leeftijdenKinderen: tekst("leeftijdenKinderen"),
    kamerindeling: tekst("kamerindeling"),
    reisgezelschap: tekst("reisgezelschap"),
    contactVoorkeur: tekst("contactVoorkeur"),
    onderwerp: tekst("onderwerp") || undefined,
    opmerkingen: tekst("opmerkingen"),
    akkoordPrivacy: binnen.akkoordPrivacy === true,
    vangnet: tekst("vangnet"),
    startTijd: typeof binnen.startTijd === "number" ? binnen.startTijd : undefined,
  };

  return { ok: true, payload };
}

/* ------------------------------------------------------------------ */
/* 2. Spambeveiliging en rate limiting                                 */
/* ------------------------------------------------------------------ */

const limietVenster = 10 * 60 * 1000; // 10 minuten
const limietAantal = 5;
const geschiedenis = new Map<string, number[]>();

/** Eenvoudige rate limiting per IP-adres. Geldt per serverinstantie. */
function magVerzenden(ip: string): boolean {
  const nu = Date.now();
  const eerdere = (geschiedenis.get(ip) ?? []).filter((t) => nu - t < limietVenster);
  if (eerdere.length >= limietAantal) {
    geschiedenis.set(ip, eerdere);
    return false;
  }
  eerdere.push(nu);
  geschiedenis.set(ip, eerdere);
  if (geschiedenis.size > 5000) geschiedenis.clear();
  return true;
}

/* ------------------------------------------------------------------ */
/* 3. E-mailteksten                                                    */
/* ------------------------------------------------------------------ */

const vrijblijvend =
  "Let op: dit is een vrijblijvende aanvraag en GEEN definitieve boeking. " +
  "De plaats is nog niet vastgelegd en er is niets betaald.";

function regelsNaarKantoor(data: AanvraagPayload, referentie: string): string[] {
  const reis = data.reisId ? getReisById(data.reisId) : undefined;
  const lijst: (string | null)[] = [
    data.type === "reis"
      ? "NIEUWE VRIJBLIJVENDE AANVRAAG — GEEN DEFINITIEVE BOEKING"
      : "NIEUW CONTACTBERICHT",
    `Referentie: ${referentie}`,
    "",
    "GEKOZEN REIS",
    reis ? `Pakket: ${reis.naam}` : "Geen specifieke reis gekozen",
    reis ? `Reis-ID: ${reis.id}` : null,
    reis ? `Vertrek: ${formatDatum(reis.vertrekdatum)}` : null,
    reis ? `Terugreis: ${formatDatum(reis.terugreisdatum)}` : null,
    reis ? `Duur: ${reis.aantalDagen} dagen` : null,
    reis ? `Prijs vanaf: ${formatPrijs(reis.prijsVanaf)} p.p.` : null,
    reis ? `Beschikbare plaatsen bij aanvraag: ${reis.beschikbarePlaatsen}` : null,
    data.onderwerp ? `Onderwerp: ${data.onderwerp}` : null,
    "",
    "AANVRAGER",
    `Volledige naam: ${data.volledigeNaam}`,
    `E-mailadres: ${data.email}`,
    `Telefoonnummer: ${data.telefoon}`,
    data.woonplaats ? `Woonplaats: ${data.woonplaats}` : null,
    `Voorkeurswijze van contact: ${data.contactVoorkeur}`,
  ];

  if (data.type === "reis") {
    lijst.push(
      "",
      "REISGEZELSCHAP",
      `Aantal volwassenen: ${data.aantalVolwassenen}`,
      `Aantal kinderen: ${data.aantalKinderen}`,
      data.leeftijdenKinderen ? `Leeftijden kinderen: ${data.leeftijdenKinderen}` : null,
      `Reist: ${data.reisgezelschap}`,
      `Gewenste kamerindeling: ${data.kamerindeling}`,
    );
  }

  lijst.push(
    "",
    "OPMERKINGEN OF VRAGEN",
    data.opmerkingen || "(geen)",
    "",
    "OVERIG",
    `Akkoord privacyverklaring: ${data.akkoordPrivacy ? "ja" : "nee"}`,
    `Ontvangen: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}`,
    "",
    vrijblijvend,
    "Actie: neem binnen twee werkdagen persoonlijk contact op en stuur daarna een voorstel.",
  );

  return lijst.filter((regel): regel is string => regel !== null);
}

function regelsNaarKlant(data: AanvraagPayload, referentie: string): string[] {
  const reis = data.reisId ? getReisById(data.reisId) : undefined;
  const voornaam = data.volledigeNaam.split(/\s+/)[0];

  const lijst: (string | null)[] = [
    `As-salaamoe alaikoem ${voornaam},`,
    "",
    "Bedankt voor uw aanvraag bij Deen op 1 Travel. Wij hebben deze in goede orde ontvangen.",
    "",
    `Uw referentienummer: ${referentie}`,
    "",
    "BELANGRIJK",
    "Uw aanvraag is vrijblijvend en is nog GEEN definitieve boeking.",
    "Uw plaats is nog niet vastgelegd en er is niets betaald.",
    "Wij nemen binnen twee werkdagen persoonlijk contact met u op om de beschikbaarheid,",
    "uw wensen en de vervolgstappen te bespreken.",
    "",
  ];

  if (reis) {
    lijst.push(
      "UW GEKOZEN REIS",
      `${reis.naam} (${reis.id})`,
      `Vertrek: ${formatDatum(reis.vertrekdatum)}`,
      `Terugreis: ${formatDatum(reis.terugreisdatum)}`,
      `Duur: ${reis.aantalDagen} dagen`,
      `Prijs vanaf: ${formatPrijs(reis.prijsVanaf)} per persoon`,
      "",
    );
  }

  lijst.push(
    "UW GEGEVENS",
    `Naam: ${data.volledigeNaam}`,
    `E-mailadres: ${data.email}`,
    `Telefoonnummer: ${data.telefoon}`,
    data.woonplaats ? `Woonplaats: ${data.woonplaats}` : null,
    `Voorkeur voor contact: ${data.contactVoorkeur}`,
  );

  if (data.type === "reis") {
    lijst.push(
      `Aantal volwassenen: ${data.aantalVolwassenen}`,
      `Aantal kinderen: ${data.aantalKinderen}`,
      data.leeftijdenKinderen ? `Leeftijden kinderen: ${data.leeftijdenKinderen}` : null,
      `Reisgezelschap: ${data.reisgezelschap}`,
      `Gewenste kamerindeling: ${data.kamerindeling}`,
    );
  }

  if (data.opmerkingen) {
    lijst.push("", "UW OPMERKINGEN", data.opmerkingen);
  }

  lijst.push(
    "",
    "Kloppen deze gegevens niet? Stuur dan een reactie op deze e-mail.",
    "",
    "Wij vragen u nooit per e-mail of via WhatsApp om betaalgegevens, paspoortgegevens",
    "of een kopie van uw identiteitsbewijs.",
    "",
    "Met vriendelijke groet,",
    site.naam,
    `${site.contact.telefoon} · ${site.contact.email}`,
    site.url,
  );

  return lijst.filter((regel): regel is string => regel !== null);
}

/** Zet tekst veilig om naar HTML. */
function veilig(tekst: string): string {
  return tekst
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlMail(titel: string, tekstregels: string[], referentie: string): string {
  const inhoud = tekstregels
    .map((regel) => {
      if (regel.trim() === "") return '<div style="height:10px"></div>';
      if (/^[A-Z0-9 —-]{4,}$/.test(regel)) {
        return `<p style="margin:18px 0 6px;font:600 12px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.08em;color:#a97724">${veilig(regel)}</p>`;
      }
      return `<p style="margin:0 0 4px;font:400 14px/1.6 Helvetica,Arial,sans-serif;color:#16244a">${veilig(regel)}</p>`;
    })
    .join("");

  return `<!doctype html>
<html lang="nl"><body style="margin:0;background:#f2f5fa;padding:24px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
    <tr><td style="background:#0e1a38;padding:24px 28px">
      <p style="margin:0;font:600 18px/1.3 Georgia,serif;color:#ffffff">${veilig(site.naam)}</p>
      <p style="margin:6px 0 0;font:400 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.16em;color:#94aad1">UMRAH · MEKKA · MEDINA</p>
    </td></tr>
    <tr><td style="padding:28px">
      <p style="margin:0 0 14px;font:600 18px/1.3 Georgia,serif;color:#0e1a38">${veilig(titel)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;background:#faf0d7;border:1px solid #e9c477;border-radius:10px">
        <tr><td style="padding:12px 14px;font:600 13px/1.6 Helvetica,Arial,sans-serif;color:#16244a">${veilig(vrijblijvend)}</td></tr>
      </table>
      ${inhoud}
      <p style="margin:22px 0 0;font:400 12px/1.5 Helvetica,Arial,sans-serif;color:#5f7db4">Referentie ${veilig(referentie)}</p>
    </td></tr>
    <tr><td style="background:#f2f5fa;padding:16px 28px;font:400 12px/1.6 Helvetica,Arial,sans-serif;color:#3d5c96">
      ${veilig(site.contact.telefoon)} · ${veilig(site.contact.email)}<br>
      Wij vragen nooit per e-mail om betaalgegevens of paspoortgegevens.
    </td></tr>
  </table>
</body></html>`;
}

/* ------------------------------------------------------------------ */
/* 4. Versturen via Resend                                             */
/* ------------------------------------------------------------------ */

type MailOpdracht = {
  aan: string;
  onderwerp: string;
  regels: string[];
  titel: string;
  antwoordAan: string;
  referentie: string;
};

/**
 * De sleutel wordt pas hier gelezen en de Resend-client wordt pas hier gemaakt.
 * Zo kan een ontbrekende sleutel de build niet laten mislukken en staat de
 * sleutel nergens op moduleniveau.
 */
function maakClient(): Resend | null {
  const sleutel = process.env.RESEND_API_KEY;
  if (!sleutel) return null;
  return new Resend(sleutel);
}

/** Verstuurt één e-mail. Geeft alleen terug of het gelukt is, zonder details te loggen. */
async function verstuurMail(
  client: Resend,
  afzender: string,
  opdracht: MailOpdracht,
): Promise<{ gelukt: boolean; oorzaak?: string }> {
  try {
    const { error } = await client.emails.send({
      from: afzender,
      to: [opdracht.aan],
      replyTo: opdracht.antwoordAan,
      subject: opdracht.onderwerp,
      text: opdracht.regels.join("\n"),
      html: htmlMail(opdracht.titel, opdracht.regels, opdracht.referentie),
    });
    if (error) return { gelukt: false, oorzaak: error.name ?? "onbekend" };
    return { gelukt: true };
  } catch (fout: unknown) {
    // Alleen het type fout loggen, nooit de inhoud van het verzoek of de sleutel.
    return { gelukt: false, oorzaak: fout instanceof Error ? fout.name : "onbekend" };
  }
}

/* ------------------------------------------------------------------ */
/* 5. Route                                                            */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "onbekend";

  // Rate limiting
  if (!magVerzenden(ip)) {
    return NextResponse.json(
      {
        melding:
          "U heeft kort achter elkaar meerdere aanvragen verstuurd. Wacht enkele minuten of neem telefonisch contact met ons op.",
      },
      { status: 429 },
    );
  }

  // Inhoud lezen
  let ruwe: unknown;
  try {
    ruwe = await request.json();
  } catch {
    return NextResponse.json(
      { melding: "Wij konden uw aanvraag niet lezen. Vernieuw de pagina en probeer het opnieuw." },
      { status: 400 },
    );
  }

  // Alleen bekende velden toelaten
  const opgeschoond = schoonOp(ruwe);
  if (!opgeschoond.ok) {
    return NextResponse.json({ melding: opgeschoond.melding }, { status: 400 });
  }
  const payload = opgeschoond.payload;

  // Spamcontrole: onzichtbaar veld en invultijd
  const reden = spamReden(payload);
  if (reden) {
    // Alleen de reden loggen, nooit de ingevulde gegevens.
    console.warn(`[aanvraag] geweigerd als spam: ${reden}`);
    return NextResponse.json(
      {
        melding:
          "Uw aanvraag kon niet worden verwerkt. Neem telefonisch of via WhatsApp contact met ons op.",
      },
      { status: 400 },
    );
  }

  // Volledige validatie op de server: de browser wordt nooit vertrouwd.
  const fouten = valideerAanvraag(payload);
  if (heeftFouten(fouten)) {
    return NextResponse.json(
      { fouten, melding: "Controleer de gemarkeerde velden en probeer het opnieuw." },
      { status: 422 },
    );
  }

  const referentie = maakReferentie();
  const reis = payload.reisId ? getReisById(payload.reisId) : undefined;

  // Testmodus: de hele stroom doorlopen zonder te mailen.
  if (process.env.MAIL_TESTMODUS === "true") {
    console.info(
      `[aanvraag] testmodus, geen e-mail verstuurd. referentie=${referentie} type=${payload.type} reis=${payload.reisId ?? "-"}`,
    );
    return NextResponse.json({ ok: true, referentie, bevestigingVerstuurd: false });
  }

  const zakelijkAdres = process.env.CONTACT_EMAIL;
  const afzender = process.env.FROM_EMAIL;
  const client = maakClient();

  if (!client || !zakelijkAdres || !afzender) {
    // Nooit de waarden loggen, alleen welke instelling ontbreekt.
    const ontbreekt = [
      !client ? "RESEND_API_KEY" : null,
      !zakelijkAdres ? "CONTACT_EMAIL" : null,
      !afzender ? "FROM_EMAIL" : null,
    ].filter(Boolean);
    console.error(
      `[aanvraag] e-mail niet verstuurd, ontbrekende instellingen in .env.local: ${ontbreekt.join(", ")}`,
    );
    return NextResponse.json(
      {
        melding:
          "Door een technische storing kan uw aanvraag nu niet worden verstuurd. Neem telefonisch of via WhatsApp contact met ons op, dan helpen wij u direct.",
      },
      { status: 503 },
    );
  }

  // 1. Volledige aanvraag naar het zakelijke adres
  const naarKantoor = await verstuurMail(client, afzender, {
    aan: zakelijkAdres,
    onderwerp:
      payload.type === "reis"
        ? `Aanvraag ${referentie} · ${reis?.naam ?? "reis"}${payload.reisId ? ` (${payload.reisId})` : ""}`
        : `Contactbericht ${referentie}`,
    titel: payload.type === "reis" ? "Nieuwe vrijblijvende aanvraag" : "Nieuw contactbericht",
    regels: regelsNaarKantoor(payload, referentie),
    antwoordAan: payload.email,
    referentie,
  });

  if (!naarKantoor.gelukt) {
    console.error(
      `[aanvraag] verzenden naar zakelijk adres mislukt. referentie=${referentie} oorzaak=${naarKantoor.oorzaak}`,
    );
    return NextResponse.json(
      {
        melding:
          "Uw aanvraag kon niet worden verstuurd. Probeer het over enkele minuten opnieuw of neem telefonisch contact met ons op.",
      },
      { status: 502 },
    );
  }

  // 2. Automatische ontvangstbevestiging naar de klant.
  //    Mislukt deze, dan is de aanvraag bij ons wél binnen: geen foutmelding voor de klant.
  const naarKlant = await verstuurMail(client, afzender, {
    aan: payload.email,
    onderwerp: `Ontvangstbevestiging ${referentie} – vrijblijvende aanvraag bij ${site.naam}`,
    titel: "Wij hebben uw aanvraag ontvangen",
    regels: regelsNaarKlant(payload, referentie),
    antwoordAan: zakelijkAdres,
    referentie,
  });

  if (!naarKlant.gelukt) {
    console.error(
      `[aanvraag] ontvangstbevestiging aan de klant mislukt. referentie=${referentie} oorzaak=${naarKlant.oorzaak}`,
    );
  }

  return NextResponse.json({
    ok: true,
    referentie,
    bevestigingVerstuurd: naarKlant.gelukt,
    melding:
      "Uw vrijblijvende aanvraag is ontvangen. Dit is nog geen definitieve boeking; wij nemen persoonlijk contact met u op.",
  });
}
