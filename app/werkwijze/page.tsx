import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import StappenLijst from "@/components/StappenLijst";
import Notitie from "@/components/Notitie";
import CtaBlok from "@/components/CtaBlok";
import { begeleidingPunten, stappen } from "@/lib/data/inhoud";
import { PijlIcon, VinkjeIcon } from "@/components/Icons";

export const metadata: Metadata = paginaMetadata({
  titel: "Werkwijze",
  beschrijving:
    "Van aanvraag tot vertrek: zo verloopt het traject bij Deen op 1 Travel. Een aanvraag via de website is vrijblijvend en nog geen definitieve boeking.",
  pad: "/werkwijze",
});

const watWijRegelen = [
  "Retourvlucht met een reguliere luchtvaartmaatschappij",
  "Aanvraag van het Umrah-visum",
  "Hotels in Mekka en Medina op korte loopafstand",
  "Alle transfers in Saoedi-Arabië",
  "Maaltijden volgens het gekozen pakket",
  "Nederlandstalige begeleiding tijdens de hele reis",
  "Begeleide Umrah en ziyarah",
  "Informatiebijeenkomst voor vertrek",
];

const watUZelfRegelt = [
  "Een geldig paspoort met voldoende geldigheidsduur",
  "Reis-, bagage- en annuleringsverzekering",
  "Vervoer naar en van de luchthaven in Nederland",
  "Ihram-kleding en persoonlijke benodigdheden",
  "Eventuele vaccinaties in overleg met uw huisarts",
  "Persoonlijke uitgaven ter plaatse",
];

export default function WerkwijzePage() {
  return (
    <>
      <PageHeader
        eyebrow="Werkwijze"
        titel="Van aanvraag tot vertrek, stap voor stap"
        intro="Wij werken met een vast en overzichtelijk traject. U weet steeds wat de volgende stap is en u zit nergens aan vast tot u zelf akkoord geeft."
        kruimels={[{ label: "Home", href: "/" }, { label: "Werkwijze" }]}
      />

      <Section eyebrow="Het traject" titel="Zes duidelijke stappen">
        <StappenLijst stappen={stappen} />
      </Section>

      <Section variant="grijs" eyebrow="Duidelijke afspraken" titel="Wat wij regelen en wat u zelf regelt">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-7">
            <h3 className="text-lg font-semibold text-navy-900">Dit regelen wij voor u</h3>
            <ul className="mt-5 space-y-3">
              {watWijRegelen.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-navy-700">
                  <VinkjeIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="text-lg font-semibold text-navy-900">Dit regelt u zelf</h3>
            <ul className="mt-5 space-y-3">
              {watUZelfRegelt.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-navy-700">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-300"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section variant="donker" eyebrow="Begeleiding" titel="Begeleiding voor, tijdens en na de reis">
        <div className="grid gap-5 sm:grid-cols-2">
          {begeleidingPunten.map((punt) => (
            <div key={punt.titel} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold !text-white">{punt.titel}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-200">{punt.beschrijving}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Belangrijk" titel="Hoe komt een boeking tot stand?">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-[15px] leading-relaxed text-navy-700">
            <p>
              Via deze website kunt u geen reis afrekenen en geen plaats definitief vastleggen. Het
              aanvraagformulier is bedoeld om ons te laten weten in welke reis u geïnteresseerd bent
              en met hoeveel personen u wilt reizen.
            </p>
            <p>
              Nadat wij uw aanvraag hebben ontvangen, nemen wij binnen twee werkdagen persoonlijk
              contact met u op. Wij bespreken uw wensen en sturen u vervolgens een voorstel met de
              kamerindeling, de definitieve prijs en de voorwaarden.
            </p>
            <p>
              Een boeking komt pas tot stand wanneer u dit voorstel schriftelijk accepteert en wij de
              boeking daarna aan u bevestigen. Daarna bespreken wij de betaling en de documenten die
              wij van u nodig hebben. Paspoortgegevens vragen wij nooit via de website op.
            </p>
            <div className="pt-2">
              <Link href="/umrah-reizen" className="btn-primary">
                Bekijk onze reizen
                <PijlIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <Notitie titel="Geen betaling via de website" variant="nadruk">
            Wij vragen nooit om betalingen via een link op de website of via WhatsApp. Betaalgegevens
            en documenten worden uitsluitend besproken nadat u een voorstel van ons heeft ontvangen
            en uw boeking is bevestigd.
          </Notitie>
        </div>
      </Section>

      <CtaBlok />
    </>
  );
}
