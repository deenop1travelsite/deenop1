# Deen op 1 Travel — website

Complete, lokaal draaibare website voor begeleide Umrah-reizen naar Mekka en Medina.
**Next.js 15 (App Router)**, **TypeScript** en **Tailwind CSS**.

Geen betaalfunctie, geen definitieve boeking en geen gevoelige gegevens: het formulier vraagt
nooit om BSN, paspoortnummer, paspoortscan, medische gegevens of betaalgegevens.

## Starten (drie manieren)

**1. Dubbelklikken (macOS)**
Dubbelklik `start-website.command`. Dat installeert de pakketten, start de server en opent
`http://localhost:3000` in uw browser. Werkt de dubbelklik niet, draai dan eenmalig in Terminal:

```bash
chmod +x start-website.command
```

**2. Handmatig**

```bash
npm install
npm run dev
```

Open daarna **http://localhost:3000**

**3. Productiebuild testen**

```bash
npm install
npm run build
npm run start
```

Vereist: **Node.js 18.18 of nieuwer** (`node -v` om te controleren). `package-lock.json` wordt
door `npm install` aangemaakt.

## Alle commando's

| Commando | Doel |
| --- | --- |
| `npm run dev` | Ontwikkelserver op http://localhost:3000 |
| `npm run build` | Productiebuild |
| `npm run start` | Productiebuild draaien |
| `npm run typecheck` | TypeScript controleren |
| `npm run controle` | Statische controle: imports, routes, kleuren, `"use client"` |
| `npm test` | Test van formuliervalidatie, spamcontrole en reisgegevens |
| `node scripts/optimaliseer-logo.mjs <bestand.png>` | Logo bijsnijden, verkleinen en favicon maken |

## Projectstructuur

```
app/                        pagina's (App Router)
  page.tsx                  Home
  umrah-reizen/             overzicht + [slug] reisdetailpagina per reis
  reisdetails/              alle reizen naast elkaar vergeleken
  aanvragen/                aanvraagpagina + bevestiging/
  werkwijze/  over-ons/  veelgestelde-vragen/  contact/
  privacyverklaring/  algemene-voorwaarden/
  api/aanvraag/route.ts     verwerking van het formulier
  globals.css               Tailwind + eigen componentklassen
  layout.tsx                header, footer, WhatsApp-knop
  icon.svg                  favicon
components/                 20 herbruikbare componenten
lib/
  site.ts                   contactgegevens en navigatie  ← pas dit eerst aan
  types.ts                  types
  format.ts                 datum- en prijsopmaak (nl-NL)
  aanvraag.ts               validatie, gedeeld door browser en server
  data/reizen.ts            de drie voorbeeldreizen
  data/inhoud.ts            voordelen, stappen, veelgestelde vragen
public/logo.svg             logo
scripts/                    controle- en testscript (zonder extra pakketten)
```

## Pagina's

| Pad | Pagina |
| --- | --- |
| `/` | Home met hero, voordelen, pakketten, stappen, begeleiding, FAQ |
| `/umrah-reizen` | Overzicht van de drie Umrah-reizen |
| `/umrah-reizen/[slug]` | Reisdetailpagina per reis, inclusief aanvraagformulier |
| `/reisdetails` | Alle reisdetails in één vergelijking |
| `/aanvragen` | Aanvraagpagina (vult de gekozen reis automatisch in) |
| `/aanvragen/bevestiging` | Bevestiging met referentienummer en vervolgstappen |
| `/werkwijze` | Van aanvraag tot vertrek |
| `/over-ons` | Over ons |
| `/veelgestelde-vragen` | Veelgestelde vragen |
| `/contact` | Contactgegevens en contactformulier |
| `/privacyverklaring` | Privacyverklaring |
| `/algemene-voorwaarden` | Algemene voorwaarden |

## Eerst aanpassen

1. **`lib/site.ts`** — contactgegevens, WhatsApp-nummer, adres, KvK en BTW staan hier op één plek.
   Zoek op `TODO`. Het WhatsApp-nummer in internationaal formaat zonder `+` en zonder spaties,
   bijvoorbeeld `31612345678`.
2. **`lib/data/reizen.ts`** — de drie voorbeeldreizen. Vervang deze door uw echte pakketten.
3. **`lib/data/inhoud.ts`** — voordelen, stappen, veelgestelde vragen en begeleidingsteksten.
4. **`app/algemene-voorwaarden/page.tsx`** — laat de tekst vóór livegang door een jurist nakijken.

## Het aanvraagformulier

Op elke reiskaart en reisdetailpagina staat de knop **Informatie aanvragen**. Op de detailpagina
springt die naar het formulier op dezelfde pagina, met de reis al ingevuld. Vanaf het overzicht gaat
de knop naar `/aanvragen?reis=DO1-UMR-2610`, waar de reis automatisch geselecteerd wordt.

Velden: gekozen reis, volledige naam, e-mailadres, telefoonnummer, woonplaats, aantal volwassenen,
aantal kinderen, leeftijden van de kinderen, gewenste kamerindeling, alleen of met gezelschap,
voorkeurswijze van contact, opmerkingen en akkoord met de privacyverklaring.

Boven het formulier staat: *"Dit formulier is een vrijblijvende aanvraag en geen definitieve
boeking. Na ontvangst nemen wij persoonlijk contact met u op om beschikbaarheid, wensen en
vervolgstappen te bespreken."*

**Controles:** verplichte velden, geldig e-mailadres, geldig telefoonnummer, leeftijden die
overeenkomen met het aantal kinderen, en begrijpelijke Nederlandse foutmeldingen per veld plus een
overzicht bovenaan.

**Spambescherming:** onzichtbaar vangnetveld, minimale invultijd van 3 seconden, maximaal 5
inzendingen per IP per 10 minuten, weigering van teksten met te veel links en van velden met
gevoelige namen.

### E-mail via Resend instellen

Het formulier post naar `POST /api/aanvraag`. Die Route Handler
(`app/api/aanvraag/route.ts`) draait uitsluitend op de server en verstuurt met de officiële
`resend`-package twee e-mails: de volledige aanvraag naar `CONTACT_EMAIL` en een automatische
ontvangstbevestiging naar de klant.

**Uw eigen waarden invullen — drie stappen:**

1. Maak in de projectmap een bestand `.env.local` (kopie van `.env.example`):

   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` en vul de drie regels in:

   ```
   RESEND_API_KEY=re_uw_eigen_sleutel
   CONTACT_EMAIL=info@uwdomein.nl
   FROM_EMAIL=website@uwdomein.nl
   ```

   - `RESEND_API_KEY` — maak aan op https://resend.com/api-keys (begint met `re_`).
   - `CONTACT_EMAIL` — uw zakelijke adres, hier komt de volledige aanvraag binnen.
   - `FROM_EMAIL` — de afzender. Dit moet een adres zijn op een domein dat u in Resend heeft
     geverifieerd, anders weigert Resend de e-mail. Zolang uw domein nog niet geverifieerd is,
     kunt u testen met `onboarding@resend.dev`; die afzender mag alleen naar uw eigen
     Resend-accountadres mailen.

3. Herstart de server (`Ctrl + C`, daarna `npm run dev`). Omgevingsvariabelen worden alleen bij het
   starten gelezen.

**Testen zonder e-mail te versturen:** zet in `.env.local` de regel `MAIL_TESTMODUS=true`. De hele
stroom wordt dan doorlopen, inclusief validatie en bevestigingspagina, maar er gaat geen e-mail de
deur uit. Alleen het referentienummer en het reis-ID komen in de serverconsole, nooit
persoonsgegevens.

**Beveiliging:** de sleutel staat uitsluitend in `.env.local` (in `.gitignore`), wordt alleen
server-side gelezen via `process.env.RESEND_API_KEY`, staat in geen enkel bronbestand en er bestaat
geen `NEXT_PUBLIC`-variant. De console logt nooit de sleutel of volledige persoonsgegevens: bij een
fout alleen het referentienummer en het type fout. Er is geen database, dus er worden geen
persoonsgegevens op de server bewaard.

Andere provider (SMTP, Postmark, SendGrid)? Pas alleen de functie `verstuurMail` in de Route Handler
aan.

## Het logo

| Bestand | Gebruik |
| --- | --- |
| `public/deen-op-1-travel-logo.png` | Het logo in header en footer, 900 × 793 px, 285 kB |
| `app/icon.png` | Favicon: het logo op een donkerblauw vlak, 256 × 256 px |
| `lib/logo.ts` | De exacte afmetingen, zodat `next/image` de verhouding aanhoudt |
| `components/Logo.tsx` | Plaatsing in header (`opWit`) en footer (`opDonker`) |

Het logo wordt met `next/image` geplaatst, met `width` en `height` uit `lib/logo.ts` en in CSS
alleen een hoogte plus `w-auto`. Daardoor blijft de originele beeldverhouding exact behouden en
kan er geen vervorming optreden. Formaat: 40 px hoog op mobiel, 48 px op tablet en desktop, en
56 tot 64 px in de footer.

De woordmerktekst *DEEN OP 1* in het logo is wit. Op een witte header zou die onzichtbaar zijn,
daarom staat het logo daar op een donkerblauw vlak met een dunne gouden rand. In de footer, die al
donkerblauw is, staat het logo rechtstreeks op de achtergrond.

**Logo vervangen?** Draai daarna dit script; het snijdt de transparante rand weg, verkleint het
bestand met behoud van de verhouding, maakt een nieuwe favicon en werkt `lib/logo.ts` bij:

```bash
node scripts/optimaliseer-logo.mjs ~/pad/naar/nieuw-logo.png
```

Het script verwacht een PNG met transparantie (RGBA, 8 bit) en gebruikt geen externe pakketten.

## SEO en vindbaarheid

- Per pagina een eigen titel, omschrijving en canonieke URL via `lib/metadata.ts`.
- Open Graph en Twitter-kaarten, met `app/opengraph-image.png` (1200 × 630) als deelafbeelding.
- Structured data volgens Schema.org in `lib/schema.ts`: `TravelAgency` met adres en
  openingstijden, `WebSite`, `BreadcrumbList` per pagina, `TouristTrip` met prijs en
  beschikbaarheid per reis, en `FAQPage` voor de veelgestelde vragen.
- `app/sitemap.ts` en `app/robots.ts` zijn automatisch afgeleid van de reizen. Het
  aanvraagformulier en de bevestigingspagina staan op `noindex`.
- `app/manifest.ts` levert een webmanifest met de merkkleuren en iconen.

## Snelheid en toegankelijkheid

- Lettertypen (Inter en Playfair Display) worden door Next.js zelf gehost via `next/font`:
  geen verzoek naar Google, geen tekstsprong tijdens het laden.
- Afbeeldingen gaan via `next/image` met avif en webp; het logo laadt met `priority` in de
  header en lui in de footer.
- Elke zware route heeft een `loading.tsx` met een skelet in dezelfde vorm als de inhoud, zodat
  navigatie direct reageert.
- Animaties zijn zuiver CSS (geen JavaScript) en worden uitgeschakeld bij de systeeminstelling
  "beperk beweging".
- Toegankelijkheid: skip-link, zichtbare focusrand, `aria-current` in de navigatie, foutmeldingen
  met `role="alert"` en een verwijzing vanuit het veld, kleurcontrast van kleine tekst op ten
  minste 7:1, en iconen die voor schermlezers verborgen zijn.
- Beveiligingsheaders (nosniff, referrer-policy, frame-options, permissions-policy) staan in
  `next.config.ts`.

## Vormgeving

- Donkerblauw (`navy`), wit en goud (`gold`), gedefinieerd in `tailwind.config.ts`.
- Knoppen, kaarten en formuliervelden staan als herbruikbare klassen in `app/globals.css`
  (`.btn-primary`, `.card`, `.input-field`).
- Responsief: één kolom op mobiel, twee op tablet, drie kolommen of een zijkolom op desktop.
  De vergelijkingstabel wordt op mobiel automatisch een kaartweergave.
- Toegankelijkheid: skip-link, `aria-current` in de navigatie, `aria-invalid` en foutmeldingen met
  `role="alert"`, zichtbare focusstijl.

## Fonts

`app/globals.css` verwijst naar `Inter` en `Playfair Display` via CSS-variabelen, met systeemfonts
als fallback. Wilt u ze echt laden, voeg dan `next/font` toe in `app/layout.tsx`:

```ts
import { Inter, Playfair_Display } from "next/font/google";
```
