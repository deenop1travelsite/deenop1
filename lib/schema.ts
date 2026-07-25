/**
 * Structured data volgens Schema.org.
 * Zoekmachines gebruiken dit om de reizen, contactgegevens en veelgestelde
 * vragen beter te begrijpen en rijker weer te geven in de zoekresultaten.
 */
import { site } from "@/lib/site";
import { logo } from "@/lib/logo";
import type { Reis, Vraag } from "@/lib/types";

const organisatieId = `${site.url}/#organisatie`;

/** Het reisbureau zelf: naam, contact, adres en openingstijden. */
export function organisatieSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": organisatieId,
    name: site.naam,
    description: site.beschrijving,
    url: site.url,
    logo: `${site.url}${logo.src}`,
    image: `${site.url}/opengraph-image.png`,
    telephone: site.contact.telefoon,
    email: site.contact.email,
    priceRange: "€€",
    areaServed: { "@type": "Country", name: "Nederland" },
    knowsLanguage: ["nl-NL", "ar"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.adres.straat,
      postalCode: site.contact.adres.postcode,
      addressLocality: site.contact.adres.plaats,
      addressCountry: "NL",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "15:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "klantenservice",
      telephone: site.contact.telefoon,
      email: site.contact.email,
      availableLanguage: ["Dutch", "Arabic"],
    },
  };
}

/** De website, met de mogelijkheid tot zoeken binnen het aanbod. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.naam,
    inLanguage: "nl-NL",
    publisher: { "@id": organisatieId },
  };
}

/** Kruimelpad, zodat Google de plaats van een pagina in de site begrijpt. */
export function kruimelSchema(kruimels: { naam: string; pad: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: kruimels.map((kruimel, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: kruimel.naam,
      item: `${site.url}${kruimel.pad}`,
    })),
  };
}

/**
 * Een Umrah-reis als reisproduct met prijsindicatie.
 * De prijs is een vanafprijs; de aanbieding vermeldt daarom een laagste prijs.
 */
export function reisSchema(reis: Reis) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${site.url}/umrah-reizen/${reis.slug}#reis`,
    name: reis.naam,
    description: reis.samenvatting,
    url: `${site.url}/umrah-reizen/${reis.slug}`,
    touristType: reis.geschiktVoor,
    provider: { "@id": organisatieId },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: 2,
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@type": "City", name: "Mekka" } },
        { "@type": "ListItem", position: 2, item: { "@type": "City", name: "Medina" } },
      ],
    },
    subjectOf: {
      "@type": "Trip",
      departureTime: reis.vertrekdatum,
      arrivalTime: reis.terugreisdatum,
    },
    offers: {
      "@type": "Offer",
      price: reis.prijsVanaf,
      priceCurrency: "EUR",
      availability:
        reis.beschikbarePlaatsen > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: `${site.url}/aanvragen?reis=${reis.id}`,
      validFrom: new Date().toISOString().slice(0, 10),
      priceValidUntil: reis.vertrekdatum,
      // Er kan via de website niet worden afgerekend: dit is een aanvraag.
      availableAtOrFrom: { "@id": organisatieId },
    },
  };
}

/** Veelgestelde vragen. */
export function faqSchema(vragen: Vraag[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: vragen.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: { "@type": "Answer", text: item.antwoord },
    })),
  };
}
