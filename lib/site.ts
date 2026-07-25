/**
 * Centrale configuratie van de website.
 *
 * >>> PAS HIER JE EIGEN GEGEVENS AAN. <<<
 * Alle placeholders staan aangegeven met "TODO".
 * Verder in de code hoef je niets te wijzigen.
 */

export const site = {
  naam: "Deen op 1 Travel",
  slogan: "Begeleide Umrah-reizen naar Mekka en Medina",
  beschrijving:
    "Deen op 1 Travel organiseert begeleide Umrah-reizen naar Mekka en Medina met persoonlijke begeleiding, zorgvuldig gekozen hotels en duidelijke informatie vooraf.",
  url: "https://www.deenop1travel.nl", // TODO: definitieve domeinnaam

  contact: {
    email: "info@deenop1travel.nl", // TODO
    telefoon: "+31 6 24 30 05 73",
    // Internationaal formaat zonder +, spaties of streepjes, bijvoorbeeld 31612345678.
    // Dit ene nummer wordt gebruikt door alle WhatsApp-knoppen op de website.
    whatsappNummer: "31624300573",
    whatsappBericht:
      "As-salaamoe alaikoem, ik heb een vraag over een Umrah-reis van Deen op 1 Travel.",
    openingstijden: [
      { dagen: "Maandag t/m vrijdag", tijden: "09:00 – 18:00" },
      { dagen: "Zaterdag", tijden: "10:00 – 15:00" },
      { dagen: "Zondag", tijden: "Gesloten" },
    ],
    adres: {
      straat: "Voorbeeldstraat 1", // TODO
      postcode: "1000 AA", // TODO
      plaats: "Amsterdam", // TODO
      land: "Nederland",
    },
  },

  bedrijf: {
    kvk: "00000000", // TODO
    btw: "NL000000000B00", // TODO
    // TODO: vul in zodra van toepassing (bijv. SGR / Calamiteitenfonds / IATA)
    aansluitingen: "Nog niet van toepassing",
  },

  // Wordt gebruikt in de privacyverklaring en algemene voorwaarden
  juridisch: {
    laatstBijgewerkt: "juli 2026",
    bewaartermijnAanvragenMaanden: 12,
  },
} as const;

/**
 * Bouwt een officiële WhatsApp-link (wa.me) met een vooraf ingevuld bericht.
 * Alle WhatsApp-knoppen op de website gebruiken deze functie, zodat er maar
 * één nummer bestaat: site.contact.whatsappNummer.
 */
export function maakWhatsappLink(bericht: string = site.contact.whatsappBericht): string {
  const nummer = site.contact.whatsappNummer.replace(/[^0-9]/g, "");
  return `https://wa.me/${nummer}?text=${encodeURIComponent(bericht)}`;
}

/** Standaardlink: header, mobiel menu, zwevende knop, footer en contactpagina. */
export const whatsappLink = maakWhatsappLink();

/** Link met de reisnaam en het reis-ID al in het bericht, voor de reisdetailpagina. */
export function whatsappLinkVoorReis(reisNaam: string, reisId: string): string {
  return maakWhatsappLink(
    `As-salaamoe alaikoem, ik heb een vraag over de reis "${reisNaam}" (${reisId}) van ${site.naam}.`,
  );
}

export const navigatie = [
  { label: "Home", href: "/" },
  { label: "Umrah-reizen", href: "/umrah-reizen" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavigatie = [
  { label: "Privacyverklaring", href: "/privacyverklaring" },
  { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
] as const;
