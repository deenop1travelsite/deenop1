import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Notitie from "@/components/Notitie";
import { site } from "@/lib/site";

export const metadata: Metadata = paginaMetadata({
  titel: "Privacyverklaring",
  beschrijving:
    "In deze privacyverklaring leest u welke persoonsgegevens Deen op 1 Travel verwerkt, met welk doel, hoe lang wij deze bewaren en welke rechten u heeft.",
  pad: "/privacyverklaring",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Juridisch"
        titel="Privacyverklaring"
        intro={`Laatst bijgewerkt: ${site.juridisch.laatstBijgewerkt}`}
        kruimels={[{ label: "Home", href: "/" }, { label: "Privacyverklaring" }]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Notitie titel="Kort samengevat" variant="nadruk">
            Wij verwerken alleen de gegevens die nodig zijn om uw aanvraag te beantwoorden. Wij
            vragen via de website geen paspoortgegevens en geen betaalgegevens, en wij verkopen uw
            gegevens niet aan derden.
          </Notitie>

          <div className="prose-legal mt-10">
            <h2>1. Wie is verantwoordelijk voor uw gegevens?</h2>
            <p>
              {site.naam}, gevestigd aan {site.contact.adres.straat},{" "}
              {site.contact.adres.postcode} {site.contact.adres.plaats}, ingeschreven bij de Kamer
              van Koophandel onder nummer {site.bedrijf.kvk}, is verwerkingsverantwoordelijke voor de
              verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. U kunt ons
              bereiken via <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> of{" "}
              {site.contact.telefoon}.
            </p>

            <h2>2. Welke gegevens verwerken wij?</h2>
            <p>
              Wanneer u een aanvraagformulier of het contactformulier invult, verwerken wij de
              volgende gegevens:
            </p>
            <ul>
              <li>voor- en achternaam;</li>
              <li>e-mailadres;</li>
              <li>telefoonnummer;</li>
              <li>de reis waarover u informatie aanvraagt en het reis-ID;</li>
              <li>het aantal personen en uw kamervoorkeur;</li>
              <li>uw voorkeur voor de manier waarop wij contact opnemen;</li>
              <li>de inhoud van uw bericht of vraag;</li>
              <li>de datum en het tijdstip van uw aanvraag.</li>
            </ul>
            <p>
              Wij vragen via de website <strong>nooit</strong> om paspoortnummers, kopieën van
              identiteitsbewijzen, burgerservicenummers, medische gegevens of betaalgegevens.
              Gegevens die nodig zijn voor een visumaanvraag worden pas opgevraagd nadat uw boeking
              definitief is en uitsluitend via een veilige, met u afgesproken weg.
            </p>

            <h2>3. Waarvoor gebruiken wij uw gegevens?</h2>
            <ul>
              <li>om uw aanvraag of vraag te beantwoorden en persoonlijk contact met u op te nemen;</li>
              <li>om u een voorstel te sturen voor de reis waarin u geïnteresseerd bent;</li>
              <li>om onze dienstverlening en informatievoorziening te verbeteren;</li>
              <li>om te voldoen aan wettelijke verplichtingen, waaronder de fiscale bewaarplicht.</li>
            </ul>

            <h2>4. Op welke grondslag verwerken wij uw gegevens?</h2>
            <p>
              Wij verwerken uw gegevens op basis van uw toestemming (het versturen van het
              formulier), op basis van de uitvoering van of de voorbereiding op een overeenkomst, en
              op basis van een wettelijke verplichting waar dat van toepassing is.
            </p>

            <h2>5. Hoe lang bewaren wij uw gegevens?</h2>
            <p>
              Aanvragen die niet tot een boeking leiden, bewaren wij maximaal{" "}
              {site.juridisch.bewaartermijnAanvragenMaanden} maanden na het laatste contact. Leidt uw
              aanvraag tot een boeking, dan bewaren wij de administratie zo lang als wettelijk
              verplicht is, in beginsel zeven jaar op grond van de fiscale bewaarplicht.
            </p>

            <h2>6. Met wie delen wij uw gegevens?</h2>
            <p>
              Wij delen uw gegevens alleen wanneer dat noodzakelijk is voor de uitvoering van de
              reis of wanneer wij daartoe wettelijk verplicht zijn. Denk aan:
            </p>
            <ul>
              <li>luchtvaartmaatschappijen en hotels, voor het maken van reserveringen;</li>
              <li>partners in Saoedi-Arabië, voor transfers, begeleiding en de visumaanvraag;</li>
              <li>onze e-mail- en hostingdienstverleners, als verwerker;</li>
              <li>onze accountant of belastingadviseur, voor de administratie.</li>
            </ul>
            <p>
              Met partijen die namens ons persoonsgegevens verwerken sluiten wij een
              verwerkersovereenkomst. Wij verkopen uw gegevens niet en gebruiken ze niet voor
              advertentiedoeleinden van derden.
            </p>

            <h2>7. Doorgifte buiten de Europese Economische Ruimte</h2>
            <p>
              Voor de uitvoering van een Umrah-reis is het noodzakelijk gegevens te delen met
              partijen in Saoedi-Arabië, buiten de Europese Economische Ruimte. Dit gebeurt alleen
              wanneer uw boeking definitief is, is beperkt tot wat strikt noodzakelijk is en gebeurt
              met passende waarborgen.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Deze website is informatief en plaatst geen tracking- of advertentiecookies. Er wordt
              geen profiel van u opgebouwd. Mocht dit in de toekomst wijzigen, dan vragen wij vooraf
              uw toestemming en passen wij deze verklaring aan.
            </p>

            <h2>9. Beveiliging</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om uw gegevens te
              beveiligen, waaronder een beveiligde verbinding (HTTPS), beperkte toegang tot
              aanvragen en het beginsel dat wij niet meer gegevens vragen dan noodzakelijk.
            </p>

            <h2>10. Uw rechten</h2>
            <p>U heeft het recht om:</p>
            <ul>
              <li>uw gegevens in te zien;</li>
              <li>uw gegevens te laten corrigeren of verwijderen;</li>
              <li>de verwerking te laten beperken of daartegen bezwaar te maken;</li>
              <li>uw gegevens te laten overdragen;</li>
              <li>een gegeven toestemming weer in te trekken.</li>
            </ul>
            <p>
              Wilt u van een van deze rechten gebruikmaken, stuur dan een e-mail naar{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Wij reageren binnen
              vier weken. Om misbruik te voorkomen kunnen wij u vragen zich te identificeren, zonder
              dat wij daarbij een kopie van uw identiteitsbewijs bewaren.
            </p>

            <h2>11. Klachten</h2>
            <p>
              Bent u niet tevreden over de manier waarop wij met uw gegevens omgaan, dan horen wij
              dat graag. U heeft daarnaast altijd het recht een klacht in te dienen bij de Autoriteit
              Persoonsgegevens.
            </p>

            <h2>12. Wijzigingen</h2>
            <p>
              Wij kunnen deze privacyverklaring aanpassen, bijvoorbeeld wanneer onze dienstverlening
              of de wetgeving wijzigt. De actuele versie vindt u altijd op deze pagina.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-navy-100 bg-navy-50 p-6 text-sm text-navy-700">
            Lees ook onze{" "}
            <Link href="/algemene-voorwaarden" className="font-medium underline decoration-gold-400">
              algemene voorwaarden
            </Link>
            .
          </div>
        </div>
      </Section>
    </>
  );
}
