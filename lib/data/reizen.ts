import type { Reis } from "@/lib/types";

/**
 * TIJDELIJKE VOORBEELDREIZEN
 * Alle prijzen, data, hotels en beschikbaarheid zijn voorbeelden.
 * Vervang de inhoud van dit bestand door je werkelijke pakketten.
 */
export const reizen: Reis[] = [
  {
    id: "DO1-UMR-2610",
    slug: "umrah-najm-oktober-2026",
    naam: "Umrah Najm – Oktober",
    ondertitel: "Rustige reisperiode, ideaal voor een eerste Umrah",
    samenvatting:
      "Een compacte reis van tien dagen in een van de rustigste periodes van het jaar. Prettige temperaturen, korte wachttijden bij de Haram en veel ruimte voor persoonlijke begeleiding.",
    vertrekdatum: "2026-10-12",
    terugreisdatum: "2026-10-21",
    aantalDagen: 10,
    prijsVanaf: 1495,
    prijsToelichting:
      "Per persoon op basis van een vierpersoonskamer. Twee- en driepersoonskamers zijn tegen een toeslag mogelijk.",
    luchthavenVertrek: "Amsterdam Schiphol (AMS)",
    hotelMekka: {
      naam: "Voorbeeldhotel Ajyad Makkah",
      sterren: 4,
      afstandTotHaram: "circa 450 meter (8 minuten lopen)",
      toelichting:
        "Ruime kamers met airconditioning, dagelijks ontbijt en een pendeldienst die op piekmomenten rijdt.",
    },
    hotelMedina: {
      naam: "Voorbeeldhotel Al Madinah Gate",
      sterren: 4,
      afstandTotHaram: "circa 250 meter (4 minuten lopen)",
      toelichting:
        "Direct achter het plein van de Masjid an-Nabawi, met eigen restaurant en lift naar alle etages.",
    },
    begeleiding:
      "Twee Nederlandstalige begeleiders, waaronder een begeleider met kennis van de rituelen en de gebeden.",
    geschiktVoor: ["Eerste Umrah", "Koppels", "Alleenreizenden"],
    inbegrepen: [
      "Retourvlucht vanaf Amsterdam Schiphol, inclusief ruimbagage",
      "Umrah-visum en visumaanvraag",
      "Verblijf in Mekka (5 nachten) en Medina (4 nachten)",
      "Dagelijks ontbijt en avondmaaltijd",
      "Alle transfers in Saoedi-Arabië met eigen bus",
      "Nederlandstalige begeleiding tijdens de hele reis",
      "Begeleide Umrah en ziyarah in Mekka en Medina",
      "Informatiebijeenkomst in Nederland voor vertrek",
      "24/7 bereikbare contactpersoon tijdens de reis",
    ],
    nietInbegrepen: [
      "Reis- en bagageverzekering",
      "Annuleringsverzekering",
      "Lunches en persoonlijke consumpties",
      "Vervoer naar en van de luchthaven in Nederland",
      "Ihram-kleding en persoonlijke benodigdheden",
      "Eventuele verplichte of aanbevolen vaccinaties",
      "Extra excursies buiten het programma",
      "Persoonlijke uitgaven en giften",
    ],
    dagprogramma: [
      {
        dag: "Dag 1",
        titel: "Vertrek uit Nederland",
        beschrijving:
          "Verzamelen op Schiphol, gezamenlijke check-in en uitleg over de reis. Vlucht naar Jeddah en transfer naar Mekka.",
      },
      {
        dag: "Dag 2",
        titel: "Aankomst en eerste Umrah",
        beschrijving:
          "Rust in het hotel, daarna een begeleide Umrah met uitleg van de tawaf en sa'i, stap voor stap in het Nederlands.",
      },
      {
        dag: "Dag 3 t/m 5",
        titel: "Verblijf in Mekka",
        beschrijving:
          "Gebeden in de Masjid al-Haram, dagelijkse korte lesmomenten en een ziyarah langs onder andere Jabal an-Nur en de vlakte van Arafat.",
      },
      {
        dag: "Dag 6",
        titel: "Reis naar Medina",
        beschrijving:
          "Ontbijt, uitchecken en transfer naar Medina. Aankomst in het hotel op korte loopafstand van de Masjid an-Nabawi.",
      },
      {
        dag: "Dag 7 t/m 9",
        titel: "Verblijf in Medina",
        beschrijving:
          "Gebeden in de Masjid an-Nabawi, bezoek aan de Rawdah in overleg met de begeleiding en ziyarah langs Quba en Uhud.",
      },
      {
        dag: "Dag 10",
        titel: "Terugreis",
        beschrijving:
          "Laatste gebed, uitchecken en transfer naar de luchthaven van Medina. Vlucht terug naar Amsterdam.",
      },
    ],
    beschikbarePlaatsen: 18,
    totaalPlaatsen: 30,
    label: "Populair",
  },
  {
    id: "DO1-UMR-2612",
    slug: "umrah-sakina-winter-2026",
    naam: "Umrah Sakina – Winterperiode",
    ondertitel: "Twaalf dagen in de kerstvakantie, geschikt voor families",
    samenvatting:
      "Een familiereis in de winterperiode met extra aandacht voor gezinnen met kinderen. Ruimere kamers, een rustiger tempo en hotels op korte loopafstand van beide moskeeën.",
    vertrekdatum: "2026-12-21",
    terugreisdatum: "2027-01-01",
    aantalDagen: 12,
    prijsVanaf: 1795,
    prijsToelichting:
      "Per persoon op basis van een vierpersoonskamer. Kinderkorting is mogelijk; wij bespreken dit graag persoonlijk.",
    luchthavenVertrek: "Amsterdam Schiphol (AMS) of Düsseldorf (DUS)",
    hotelMekka: {
      naam: "Voorbeeldhotel Ibrahim Khalil Residence",
      sterren: 4,
      afstandTotHaram: "circa 300 meter (5 minuten lopen)",
      toelichting:
        "Familiekamers met koelkast, dagelijks ontbijt en avondmaaltijd in het eigen restaurant.",
    },
    hotelMedina: {
      naam: "Voorbeeldhotel Nabawi Plaza",
      sterren: 4,
      afstandTotHaram: "circa 200 meter (3 minuten lopen)",
      toelichting:
        "Rustig gelegen aan de noordzijde van het plein, met ruime kamers en een aparte gebedsruimte voor vrouwen.",
    },
    begeleiding:
      "Drie Nederlandstalige begeleiders, waarvan één vrouwelijke begeleidster speciaal voor de zusters en gezinnen.",
    geschiktVoor: ["Families met kinderen", "Koppels", "Groepen"],
    inbegrepen: [
      "Retourvlucht inclusief ruimbagage",
      "Umrah-visum en visumaanvraag",
      "Verblijf in Mekka (6 nachten) en Medina (5 nachten)",
      "Dagelijks ontbijt en avondmaaltijd",
      "Alle transfers in Saoedi-Arabië met eigen bus",
      "Nederlandstalige begeleiding, inclusief begeleidster voor de zusters",
      "Begeleide Umrah en ziyarah in Mekka en Medina",
      "Kindvriendelijk programma met aangepast tempo",
      "Informatiebijeenkomst in Nederland voor vertrek",
    ],
    nietInbegrepen: [
      "Reis- en bagageverzekering",
      "Annuleringsverzekering",
      "Lunches en persoonlijke consumpties",
      "Vervoer naar en van de luchthaven in Nederland",
      "Ihram-kleding en persoonlijke benodigdheden",
      "Eventuele verplichte of aanbevolen vaccinaties",
      "Toeslag voor een twee- of driepersoonskamer",
      "Persoonlijke uitgaven en giften",
    ],
    dagprogramma: [
      {
        dag: "Dag 1",
        titel: "Vertrek uit Nederland",
        beschrijving:
          "Gezamenlijk verzamelen op de luchthaven, uitleg over de reis en de rituelen. Vlucht naar Jeddah.",
      },
      {
        dag: "Dag 2",
        titel: "Aankomst in Mekka",
        beschrijving:
          "Transfer naar het hotel, tijd om uit te rusten en 's avonds de eerste begeleide Umrah in een rustig tempo.",
      },
      {
        dag: "Dag 3 t/m 6",
        titel: "Verblijf in Mekka",
        beschrijving:
          "Gebeden in de Masjid al-Haram, dagelijkse lesmomenten voor jong en oud en een ziyarah langs de historische plaatsen rond Mekka.",
      },
      {
        dag: "Dag 7",
        titel: "Reis naar Medina",
        beschrijving:
          "Ontbijt en transfer naar Medina, met een korte tussenstop onderweg. Aankomst en check-in in het hotel.",
      },
      {
        dag: "Dag 8 t/m 11",
        titel: "Verblijf in Medina",
        beschrijving:
          "Gebeden in de Masjid an-Nabawi, bezoek aan de Rawdah in overleg met de begeleiding, ziyarah langs Quba, Uhud en de Qiblatain-moskee.",
      },
      {
        dag: "Dag 12",
        titel: "Terugreis",
        beschrijving:
          "Laatste gebed en afscheid, transfer naar de luchthaven en vlucht terug naar Nederland.",
      },
    ],
    beschikbarePlaatsen: 8,
    totaalPlaatsen: 36,
    label: "Bijna vol",
  },
  {
    id: "DO1-UMR-2702",
    slug: "umrah-rahma-ramadan-2027",
    naam: "Umrah Rahma – Ramadan",
    ondertitel: "De laatste tien dagen van de Ramadan in Mekka en Medina",
    samenvatting:
      "Een reis van veertien dagen rond de laatste tien dagen van de Ramadan. Verblijf op korte loopafstand van de Haram, met een programma dat volledig is afgestemd op de nachtgebeden.",
    vertrekdatum: "2027-02-22",
    terugreisdatum: "2027-03-07",
    aantalDagen: 14,
    prijsVanaf: 2650,
    prijsToelichting:
      "Per persoon op basis van een vierpersoonskamer. In de Ramadan zijn hotelprijzen hoger; de definitieve prijs wordt in het persoonlijke voorstel vastgelegd.",
    luchthavenVertrek: "Amsterdam Schiphol (AMS)",
    hotelMekka: {
      naam: "Voorbeeldhotel Jabal Omar View",
      sterren: 5,
      afstandTotHaram: "circa 150 meter (2 minuten lopen)",
      toelichting:
        "Zeer korte loopafstand naar de Haram, met iftar en suhoor in het hotel en 24-uurs receptie.",
    },
    hotelMedina: {
      naam: "Voorbeeldhotel Taibah Front",
      sterren: 5,
      afstandTotHaram: "circa 120 meter (2 minuten lopen)",
      toelichting:
        "Direct tegenover een van de poorten van de Masjid an-Nabawi, met uitgebreide iftar en suhoor.",
    },
    begeleiding:
      "Vier Nederlandstalige begeleiders, met een vast aanspreekpunt voor de broeders en voor de zusters.",
    geschiktVoor: ["Ervaren reizigers", "Koppels", "Alleenreizenden"],
    inbegrepen: [
      "Retourvlucht inclusief ruimbagage",
      "Umrah-visum en visumaanvraag",
      "Verblijf in Mekka (7 nachten) en Medina (6 nachten)",
      "Dagelijkse iftar en suhoor in het hotel",
      "Alle transfers in Saoedi-Arabië met eigen bus",
      "Nederlandstalige begeleiding tijdens de hele reis",
      "Begeleide Umrah en ziyarah in Mekka en Medina",
      "Programma afgestemd op tarawih en qiyam",
      "Informatiebijeenkomst in Nederland voor vertrek",
      "24/7 bereikbare contactpersoon tijdens de reis",
    ],
    nietInbegrepen: [
      "Reis- en bagageverzekering",
      "Annuleringsverzekering",
      "Lunches en persoonlijke consumpties",
      "Vervoer naar en van de luchthaven in Nederland",
      "Ihram-kleding en persoonlijke benodigdheden",
      "Eventuele verplichte of aanbevolen vaccinaties",
      "Toeslag voor een twee- of driepersoonskamer",
      "Persoonlijke uitgaven, giften en sadaqa",
    ],
    dagprogramma: [
      {
        dag: "Dag 1",
        titel: "Vertrek uit Nederland",
        beschrijving:
          "Verzamelen op Schiphol en gezamenlijke check-in. Vlucht naar Jeddah en transfer naar Mekka.",
      },
      {
        dag: "Dag 2",
        titel: "Aankomst en eerste Umrah",
        beschrijving:
          "Check-in, rust en daarna de begeleide Umrah op een moment dat de Haram het rustigst is.",
      },
      {
        dag: "Dag 3 t/m 8",
        titel: "De laatste tien dagen in Mekka",
        beschrijving:
          "Dagindeling rond de gebeden, tarawih en qiyam. Iftar en suhoor in het hotel, met korte lesmomenten over de waarde van deze nachten.",
      },
      {
        dag: "Dag 9",
        titel: "Reis naar Medina",
        beschrijving:
          "Ontbijt na suhoor, uitchecken en transfer naar Medina. Aankomst in het hotel tegenover de moskee.",
      },
      {
        dag: "Dag 10 t/m 13",
        titel: "Verblijf in Medina",
        beschrijving:
          "Gebeden in de Masjid an-Nabawi, bezoek aan de Rawdah in overleg met de begeleiding en ziyarah langs Quba en Uhud.",
      },
      {
        dag: "Dag 14",
        titel: "Terugreis",
        beschrijving:
          "Afsluitend gebed en afscheid van de groep, transfer naar de luchthaven en vlucht terug naar Amsterdam.",
      },
    ],
    beschikbarePlaatsen: 24,
    totaalPlaatsen: 40,
    label: "Ramadan",
  },
];

export function getReisBySlug(slug: string): Reis | undefined {
  return reizen.find((reis) => reis.slug === slug);
}

export function getReisById(id: string): Reis | undefined {
  return reizen.find((reis) => reis.id === id);
}
