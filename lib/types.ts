export type Dagprogramma = {
  dag: string;
  titel: string;
  beschrijving: string;
};

export type Hotel = {
  naam: string;
  sterren: number;
  afstandTotHaram: string;
  toelichting: string;
};

export type Reis = {
  /** Unieke reis-ID, wordt ook gebruikt in de URL en in het aanvraagformulier */
  id: string;
  slug: string;
  naam: string;
  ondertitel: string;
  samenvatting: string;
  /** ISO-datum (YYYY-MM-DD) */
  vertrekdatum: string;
  /** ISO-datum (YYYY-MM-DD) */
  terugreisdatum: string;
  aantalDagen: number;
  prijsVanaf: number;
  prijsToelichting: string;
  luchthavenVertrek: string;
  hotelMekka: Hotel;
  hotelMedina: Hotel;
  begeleiding: string;
  geschiktVoor: string[];
  inbegrepen: string[];
  nietInbegrepen: string[];
  dagprogramma: Dagprogramma[];
  beschikbarePlaatsen: number;
  totaalPlaatsen: number;
  /** Optioneel label, bijv. "Populair" of "Bijna vol" */
  label?: string;
};

export type Vraag = {
  vraag: string;
  antwoord: string;
};

export type Stap = {
  nummer: string;
  titel: string;
  beschrijving: string;
};
