/**
 * Validatie van aanvragen en contactberichten.
 * Wordt zowel in de browser als op de server gebruikt, zodat de regels
 * op één plek staan en de server nooit op de browser vertrouwt.
 *
 * Let op: er worden bewust GEEN paspoortgegevens, BSN, paspoortscans,
 * medische gegevens of betaalgegevens gevraagd of verwerkt.
 */

export type AanvraagType = "reis" | "contact";

export type AanvraagPayload = {
  type: AanvraagType;

  /** Gekozen reis (alleen bij type "reis") */
  reisId?: string;

  volledigeNaam: string;
  email: string;
  telefoon: string;
  woonplaats: string;

  aantalVolwassenen: string;
  aantalKinderen: string;
  /** Bijvoorbeeld "4, 7 en 11" — alleen nodig wanneer er kinderen meereizen */
  leeftijdenKinderen: string;

  kamerindeling: string;
  reisgezelschap: string;
  contactVoorkeur: string;

  /** Alleen bij type "contact" */
  onderwerp?: string;
  opmerkingen: string;

  akkoordPrivacy: boolean;

  /** Spambescherming: moet leeg blijven (onzichtbaar veld) */
  vangnet?: string;
  /** Spambescherming: tijdstip waarop het formulier is geopend */
  startTijd?: number;
};

export const kamerindelingen = [
  "Nog niet bekend",
  "Eenpersoonskamer (met toeslag)",
  "Tweepersoonskamer",
  "Driepersoonskamer",
  "Vierpersoonskamer",
  "Familiekamer",
] as const;

export const reisgezelschappen = [
  "Ik reis alleen",
  "Ik reis met mijn partner",
  "Ik reis met mijn gezin",
  "Ik reis met familie of vrienden",
] as const;

export const contactVoorkeuren = ["Telefoon", "WhatsApp", "E-mail"] as const;

export const contactOnderwerpen = [
  "Algemene vraag",
  "Vraag over een reis",
  "Vraag over de begeleiding",
  "Groepsreis of eigen groep",
  "Anders",
] as const;

export type Fouten = Partial<Record<keyof AanvraagPayload, string>>;

/** Velden die wij nooit willen ontvangen. Wordt server-side afgedwongen. */
export const verbodenVeldwoorden = [
  "paspoort",
  "bsn",
  "sofinummer",
  "iban",
  "rekeningnummer",
  "creditcard",
  "kaartnummer",
  "cvc",
  "medisch",
  "scan",
];

const emailPatroon = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

/** Minimale tijd (ms) tussen openen en versturen; sneller is vrijwel altijd een bot. */
export const minimaleInvultijdMs = 3000;

function alleenCijfers(waarde: string): string {
  return waarde.replace(/[^0-9]/g, "");
}

export function isGeldigEmail(waarde: string): boolean {
  const schoon = waarde.trim();
  if (schoon.length < 6 || schoon.length > 254) return false;
  if (schoon.includes("..")) return false;
  return emailPatroon.test(schoon);
}

export function isGeldigTelefoonnummer(waarde: string): boolean {
  const schoon = waarde.trim();
  // Toegestaan: cijfers, spaties, streepjes, punten, haakjes en één + aan het begin
  if (!/^\+?[0-9\s().-]+$/.test(schoon)) return false;
  const cijfers = alleenCijfers(schoon);
  if (schoon.startsWith("+")) return cijfers.length >= 9 && cijfers.length <= 15;
  // Nederlandse nummers zonder landcode beginnen met 0 en hebben 10 cijfers
  if (cijfers.startsWith("0")) return cijfers.length >= 9 && cijfers.length <= 11;
  return cijfers.length >= 9 && cijfers.length <= 15;
}

/** Haalt de leeftijden uit een vrij ingevuld veld, bijv. "4, 7 en 11". */
export function leesLeeftijden(waarde: string): number[] {
  return waarde
    .split(/[,;/&]| en | plus |\s+/i)
    .map((deel) => deel.replace(/[^0-9]/g, ""))
    .filter((deel) => deel !== "")
    .map(Number);
}

function telUrls(tekst: string): number {
  return (tekst.match(/https?:\/\/|www\.|\[url/gi) ?? []).length;
}

export function valideerAanvraag(data: Partial<AanvraagPayload>): Fouten {
  const fouten: Fouten = {};
  const isReis = data.type === "reis";

  // Gekozen reis
  if (isReis && !data.reisId) {
    fouten.reisId = "Kies de reis waarover u informatie wilt ontvangen.";
  }

  // Volledige naam: minimaal twee woorden
  const naam = (data.volledigeNaam ?? "").trim();
  if (naam.length < 3) {
    fouten.volledigeNaam = "Vul uw volledige naam in.";
  } else if (!/\s/.test(naam)) {
    fouten.volledigeNaam = "Vul zowel uw voornaam als uw achternaam in.";
  } else if (naam.length > 80) {
    fouten.volledigeNaam = "Uw naam mag maximaal 80 tekens bevatten.";
  }

  // E-mail
  if (!data.email || data.email.trim() === "") {
    fouten.email = "Vul uw e-mailadres in.";
  } else if (!isGeldigEmail(data.email)) {
    fouten.email = "Dit e-mailadres lijkt niet te kloppen. Voorbeeld: naam@voorbeeld.nl";
  }

  // Telefoon
  if (!data.telefoon || data.telefoon.trim() === "") {
    fouten.telefoon = "Vul uw telefoonnummer in.";
  } else if (!isGeldigTelefoonnummer(data.telefoon)) {
    fouten.telefoon =
      "Dit telefoonnummer lijkt niet te kloppen. Voorbeeld: 06 12 34 56 78 of +31 6 12 34 56 78";
  }

  // Woonplaats
  const woonplaats = (data.woonplaats ?? "").trim();
  if (isReis) {
    if (woonplaats.length < 2) {
      fouten.woonplaats = "Vul uw woonplaats in.";
    } else if (woonplaats.length > 60) {
      fouten.woonplaats = "Uw woonplaats mag maximaal 60 tekens bevatten.";
    }
  }

  if (isReis) {
    // Aantal volwassenen
    const volwassenen = Number(data.aantalVolwassenen);
    if (!data.aantalVolwassenen || Number.isNaN(volwassenen)) {
      fouten.aantalVolwassenen = "Vul het aantal volwassenen in.";
    } else if (!Number.isInteger(volwassenen) || volwassenen < 1) {
      fouten.aantalVolwassenen = "Er reist minimaal één volwassene mee.";
    } else if (volwassenen > 30) {
      fouten.aantalVolwassenen =
        "Voor groepen groter dan 30 personen nemen wij liever direct telefonisch contact op.";
    }

    // Aantal kinderen
    const kinderen = Number(data.aantalKinderen ?? "0");
    if (data.aantalKinderen === undefined || data.aantalKinderen === "") {
      fouten.aantalKinderen = "Vul het aantal kinderen in, of vul 0 in.";
    } else if (Number.isNaN(kinderen) || !Number.isInteger(kinderen) || kinderen < 0) {
      fouten.aantalKinderen = "Vul een geheel getal in, bijvoorbeeld 0, 1 of 2.";
    } else if (kinderen > 20) {
      fouten.aantalKinderen = "Neem bij meer dan 20 kinderen telefonisch contact met ons op.";
    }

    // Leeftijden van kinderen
    const leeftijdenTekst = (data.leeftijdenKinderen ?? "").trim();
    if (!Number.isNaN(kinderen) && kinderen > 0) {
      const leeftijden = leesLeeftijden(leeftijdenTekst);
      if (leeftijdenTekst === "") {
        fouten.leeftijdenKinderen =
          "Vul de leeftijden van de kinderen in, bijvoorbeeld: 4, 7 en 11.";
      } else if (leeftijden.length !== kinderen) {
        fouten.leeftijdenKinderen = `U gaf ${kinderen} ${
          kinderen === 1 ? "kind" : "kinderen"
        } op, maar wij lezen ${leeftijden.length} ${
          leeftijden.length === 1 ? "leeftijd" : "leeftijden"
        }. Vul de leeftijden in, gescheiden door een komma.`;
      } else if (leeftijden.some((leeftijd) => leeftijd > 17)) {
        fouten.leeftijdenKinderen =
          "Reizigers van 18 jaar en ouder rekenen wij als volwassene. Pas de aantallen aan.";
      }
    }

    // Kamerindeling en gezelschap
    if (!data.kamerindeling) {
      fouten.kamerindeling = "Kies uw gewenste kamerindeling.";
    }
    if (!data.reisgezelschap) {
      fouten.reisgezelschap = "Geef aan of u alleen reist of met gezelschap.";
    }
  }

  // Voorkeurswijze van contact
  if (!data.contactVoorkeur) {
    fouten.contactVoorkeur = "Geef aan hoe wij u het liefst benaderen.";
  } else if (!contactVoorkeuren.includes(data.contactVoorkeur as (typeof contactVoorkeuren)[number])) {
    fouten.contactVoorkeur = "Kies telefoon, WhatsApp of e-mail.";
  }

  // Opmerkingen / bericht
  const opmerkingen = (data.opmerkingen ?? "").trim();
  if (!isReis && opmerkingen.length < 10) {
    fouten.opmerkingen = "Vul uw bericht in (minimaal 10 tekens).";
  } else if (opmerkingen.length > 2000) {
    fouten.opmerkingen = "Uw tekst mag maximaal 2000 tekens bevatten.";
  } else if (telUrls(opmerkingen) > 2) {
    fouten.opmerkingen = "Uw tekst bevat te veel links. Laat de links weg en probeer het opnieuw.";
  }

  // Akkoord privacyverklaring
  if (!data.akkoordPrivacy) {
    fouten.akkoordPrivacy = "U dient akkoord te gaan met de privacyverklaring.";
  }

  return fouten;
}

export function heeftFouten(fouten: Fouten): boolean {
  return Object.keys(fouten).length > 0;
}

/**
 * Spamcontrole die alleen op de server plaatsvindt.
 * Geeft een reden terug wanneer de inzending geweigerd wordt.
 */
export function spamReden(data: Partial<AanvraagPayload>): string | null {
  if (data.vangnet && data.vangnet.trim() !== "") {
    return "vangnetveld ingevuld";
  }
  if (typeof data.startTijd === "number" && data.startTijd > 0) {
    const verstreken = Date.now() - data.startTijd;
    if (verstreken < minimaleInvultijdMs) return "formulier te snel verstuurd";
    // Ouder dan 24 uur: vermoedelijk een hergebruikt verzoek
    if (verstreken > 24 * 60 * 60 * 1000) return "formulier te oud";
  }
  const naam = (data.volledigeNaam ?? "").trim();
  if (/https?:\/\//i.test(naam)) return "link in naamveld";
  return null;
}

/** Referentienummer voor de klant en voor onze administratie. */
export function maakReferentie(datum = new Date()): string {
  const jaar = datum.getFullYear();
  const maand = String(datum.getMonth() + 1).padStart(2, "0");
  const dag = String(datum.getDate()).padStart(2, "0");
  const willekeurig = Math.floor(1000 + Math.random() * 9000);
  return `AV-${jaar}${maand}${dag}-${willekeurig}`;
}
