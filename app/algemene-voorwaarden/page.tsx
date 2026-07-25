import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Notitie from "@/components/Notitie";
import { site } from "@/lib/site";

export const metadata: Metadata = paginaMetadata({
  titel: "Algemene voorwaarden",
  beschrijving:
    "De algemene voorwaarden van Deen op 1 Travel: hoe een boeking tot stand komt, wat inbegrepen is, betaling, wijzigingen, annulering en aansprakelijkheid.",
  pad: "/algemene-voorwaarden",
});

export default function VoorwaardenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Juridisch"
        titel="Algemene voorwaarden"
        intro={`Laatst bijgewerkt: ${site.juridisch.laatstBijgewerkt}`}
        kruimels={[{ label: "Home", href: "/" }, { label: "Algemene voorwaarden" }]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Notitie titel="Laat deze voorwaarden juridisch controleren" variant="nadruk">
            Onderstaande voorwaarden zijn een zorgvuldig opgestelde basistekst voor een informatieve
            website. Laat ze vóór livegang controleren door een jurist, zodat ze aansluiten bij uw
            werkwijze en bij de wettelijke eisen voor pakketreizen.
          </Notitie>

          <div className="prose-legal mt-10">
            <h2>1. Definities</h2>
            <ul>
              <li>
                <strong>Organisator:</strong> {site.naam}, ingeschreven bij de Kamer van Koophandel
                onder nummer {site.bedrijf.kvk}.
              </li>
              <li>
                <strong>Reiziger:</strong> de persoon die een aanvraag doet of voor wie een reis wordt
                geboekt.
              </li>
              <li>
                <strong>Aanvraag:</strong> een vrijblijvend informatieverzoek via de website,
                telefoon, WhatsApp of e-mail.
              </li>
              <li>
                <strong>Voorstel:</strong> het door de organisator aan de reiziger toegezonden
                overzicht met reisgegevens, prijs en voorwaarden.
              </li>
              <li>
                <strong>Boeking:</strong> de overeenkomst die tot stand komt nadat de reiziger het
                voorstel schriftelijk accepteert en de organisator dit bevestigt.
              </li>
            </ul>

            <h2>2. Toepasselijkheid</h2>
            <p>
              Deze voorwaarden zijn van toepassing op alle aanvragen, voorstellen en boekingen bij de
              organisator. Afwijkingen gelden alleen wanneer deze schriftelijk zijn overeengekomen.
            </p>

            <h2>3. Informatieve website</h2>
            <p>
              De website van de organisator is informatief. Via de website kan niet worden betaald en
              kan geen reis definitief worden geboekt. Het invullen van een aanvraagformulier is
              vrijblijvend en verplicht de reiziger tot niets.
            </p>
            <p>
              Alle op de website vermelde prijzen, data, hotels, programma's en beschikbaarheid zijn
              indicatief en onder voorbehoud van wijziging en beschikbaarheid. Kennelijke fouten en
              vergissingen binden de organisator niet.
            </p>

            <h2>4. Totstandkoming van de boeking</h2>
            <ul>
              <li>de reiziger doet een aanvraag;</li>
              <li>de organisator neemt persoonlijk contact op, in beginsel binnen twee werkdagen;</li>
              <li>de organisator stuurt een voorstel met de definitieve gegevens en prijs;</li>
              <li>
                de reiziger accepteert het voorstel schriftelijk, waarna de organisator de boeking
                bevestigt.
              </li>
            </ul>
            <p>
              Pas na deze bevestiging is er een overeenkomst en is de plaats van de reiziger
              vastgelegd. Aanmeldingen worden behandeld op volgorde van ontvangst en zijn afhankelijk
              van beschikbaarheid.
            </p>

            <h2>5. Prijzen</h2>
            <p>
              De op de website vermelde prijs vanaf geldt per persoon en is gebaseerd op de
              voordeligste kamerindeling. Toeslagen, bijvoorbeeld voor een twee- of driepersoonskamer,
              worden in het voorstel afzonderlijk vermeld. De prijs in het voorstel is de prijs die
              geldt na acceptatie.
            </p>
            <p>
              Wijzigingen in luchthavenbelastingen, brandstofheffingen, wisselkoersen of door de
              autoriteiten opgelegde heffingen kunnen tot een prijswijziging leiden. De organisator
              informeert de reiziger hierover zo spoedig mogelijk en onderbouwd.
            </p>

            <h2>6. Betaling</h2>
            <p>
              Betaling vindt uitsluitend plaats na de bevestigde boeking, op basis van een factuur en
              via de op die factuur vermelde betaalgegevens. De organisator vraagt nooit om
              betalingen via een betaallink op de website of via WhatsApp. De betalingstermijnen en de
              hoogte van een eventuele aanbetaling worden in het voorstel vastgelegd.
            </p>

            <h2>7. Reisdocumenten en visum</h2>
            <p>
              De reiziger is zelf verantwoordelijk voor een geldig paspoort met voldoende
              geldigheidsduur. De organisator verzorgt de aanvraag van het Umrah-visum voor zover dit
              in het pakket is opgenomen. Benodigde documenten worden pas na de bevestigde boeking
              opgevraagd en uitsluitend via een veilige, met de reiziger afgesproken weg. Via de
              website worden geen paspoortgegevens opgeslagen.
            </p>

            <h2>8. Verzekeringen</h2>
            <p>
              Een reis-, bagage- en annuleringsverzekering is niet bij de reissom inbegrepen. De
              organisator adviseert de reiziger dringend zelf een passende verzekering af te sluiten.
            </p>

            <h2>9. Wijzigingen door de organisator</h2>
            <p>
              De organisator kan het programma, de hotels of de vluchttijden wijzigen wanneer
              omstandigheden daartoe dwingen, bijvoorbeeld door maatregelen van autoriteiten, drukte
              bij de Haram of wijzigingen door de luchtvaartmaatschappij. De organisator streeft
              daarbij naar een gelijkwaardig alternatief en informeert de reiziger zo snel mogelijk.
            </p>
            <p>
              Bij een te gering aantal deelnemers kan de organisator een reis annuleren. De reiziger
              wordt hierover tijdig geïnformeerd en ontvangt in dat geval de betaalde bedragen terug
              of een aanbod voor een alternatieve reis.
            </p>

            <h2>10. Wijziging en annulering door de reiziger</h2>
            <p>
              Wijzigingen en annuleringen dienen schriftelijk te worden doorgegeven. De kosten die
              hieraan verbonden zijn, worden in het voorstel vastgelegd en zijn onder meer afhankelijk
              van de voorwaarden van de luchtvaartmaatschappij en de hotels. Vóór de bevestigde
              boeking zijn er geen kosten verbonden aan het intrekken van een aanvraag.
            </p>

            <h2>11. Verplichtingen van de reiziger</h2>
            <ul>
              <li>tijdig aanwezig zijn op de afgesproken plaatsen en tijden;</li>
              <li>de aanwijzingen van de begeleiding en de plaatselijke autoriteiten opvolgen;</li>
              <li>
                juiste en volledige gegevens verstrekken, waaronder gegevens die van belang zijn voor
                de begeleiding, zoals beperkte mobiliteit;
              </li>
              <li>zich respectvol gedragen tegenover medereizigers en begeleiders.</li>
            </ul>
            <p>
              Bij ernstige overlast kan de organisator een reiziger van verdere deelname uitsluiten.
              De hieruit voortvloeiende kosten komen voor rekening van de reiziger.
            </p>

            <h2>12. Aansprakelijkheid</h2>
            <p>
              De organisator voert de overeenkomst uit met de zorgvuldigheid die van een redelijk
              handelend reisorganisator mag worden verwacht. De organisator is niet aansprakelijk
              voor schade die het gevolg is van omstandigheden buiten zijn invloed, waaronder
              vertragingen, maatregelen van autoriteiten, weersomstandigheden en handelingen van
              derden. Aansprakelijkheid voor indirecte schade is uitgesloten, tenzij sprake is van
              opzet of grove nalatigheid.
            </p>

            <h2>13. Klachten</h2>
            <p>
              Klachten tijdens de reis meldt de reiziger direct bij de begeleiding, zodat er een
              oplossing gezocht kan worden. Is de klacht niet ter plaatse opgelost, dan kan deze
              binnen een maand na terugkeer schriftelijk worden ingediend via{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. De organisator
              reageert binnen vier weken.
            </p>

            <h2>14. Persoonsgegevens</h2>
            <p>
              De organisator verwerkt persoonsgegevens zoals beschreven in de{" "}
              <Link href="/privacyverklaring">privacyverklaring</Link>.
            </p>

            <h2>15. Toepasselijk recht</h2>
            <p>
              Op deze voorwaarden en op alle overeenkomsten met de organisator is Nederlands recht van
              toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
