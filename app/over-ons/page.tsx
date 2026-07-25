import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import CtaBlok from "@/components/CtaBlok";
import VoordelenGrid from "@/components/VoordelenGrid";
import { voordelen } from "@/lib/data/inhoud";
import { site } from "@/lib/site";
import { PijlIcon, VinkjeIcon } from "@/components/Icons";

export const metadata: Metadata = paginaMetadata({
  titel: "Over ons",
  beschrijving:
    "Deen op 1 Travel organiseert begeleide Umrah-reizen naar Mekka en Medina, met persoonlijke aandacht, duidelijke informatie en Nederlandstalige begeleiding.",
  pad: "/over-ons",
});

const kernwaarden = [
  {
    titel: "Betrouwbaarheid",
    tekst:
      "Wij beloven niets wat wij niet kunnen nakomen. Wat wij afspreken, leggen wij schriftelijk vast, zodat u altijd weet waar u aan toe bent.",
  },
  {
    titel: "Rust en aandacht",
    tekst:
      "Een Umrah is een bijzondere reis. Wij werken met overzichtelijke groepen, zodat er tijd en aandacht is voor iedere reiziger.",
  },
  {
    titel: "Eerlijkheid over kosten",
    tekst:
      "U ziet vooraf wat inbegrepen is en wat niet. Geen verrassingen achteraf en geen onduidelijke toeslagen.",
  },
  {
    titel: "Zorgvuldigheid",
    tekst:
      "Van de keuze van hotels tot de indeling van het dagprogramma: wij kijken steeds naar wat het verblijf rustiger en makkelijker maakt.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Over ons"
        titel="Wij begeleiden u met zorg naar Mekka en Medina"
        intro="Deen op 1 Travel is opgericht met één doel: reizigers uit Nederland een Umrah laten beleven zonder zorgen over de organisatie."
        kruimels={[{ label: "Home", href: "/" }, { label: "Over ons" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-[15px] leading-relaxed text-navy-700">
            <h2 className="text-titel-lg">Wie wij zijn</h2>
            <p>
              Deen op 1 Travel is een Nederlandse organisatie die begeleide Umrah-reizen naar Mekka
              en Medina verzorgt. Wij zijn ontstaan uit ervaringen van reizigers die tegen dezelfde
              zaken aanliepen: onduidelijke pakketten, wisselende prijzen en te weinig begeleiding
              ter plaatse. Dat wilden wij anders doen.
            </p>
            <p>
              Onze aanpak is eenvoudig. Wij stellen een beperkt aantal reizen per jaar samen, kiezen
              hotels die dicht bij de Haram en de Masjid an-Nabawi liggen en zorgen ervoor dat er
              altijd Nederlandstalige begeleiders meereizen. Zo weet u vooraf wat u kunt verwachten
              en wordt u onderweg niet aan uw lot overgelaten.
            </p>
            <p>
              Elke aanvraag wordt door een medewerker persoonlijk opgepakt. Wij bellen u, luisteren
              naar uw wensen en geven een eerlijk advies, ook wanneer dat betekent dat een reis niet
              bij u past.
            </p>

            <h2 className="mt-10 text-titel-lg">Waar wij voor staan</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {kernwaarden.map((waarde) => (
                <li key={waarde.titel} className="rounded-2xl border border-navy-100 p-5">
                  <div className="flex items-center gap-2">
                    <VinkjeIcon className="h-4 w-4 shrink-0 text-gold-500" />
                    <h3 className="text-base font-semibold text-navy-900">{waarde.titel}</h3>
                  </div>
                  <p className="mt-2 text-sm text-navy-600">{waarde.tekst}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-base font-semibold text-navy-900">Onze gegevens</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-500">Handelsnaam</dt>
                  <dd className="text-navy-800">{site.naam}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-500">Vestiging</dt>
                  <dd className="text-navy-800">
                    {site.contact.adres.straat}
                    <br />
                    {site.contact.adres.postcode} {site.contact.adres.plaats}
                    <br />
                    {site.contact.adres.land}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-500">KvK-nummer</dt>
                  <dd className="text-navy-800">{site.bedrijf.kvk}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-500">BTW-nummer</dt>
                  <dd className="text-navy-800">{site.bedrijf.btw}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-500">Aansluitingen</dt>
                  <dd className="text-navy-800">{site.bedrijf.aansluitingen}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-navy-900 p-6">
              <h2 className="text-base font-semibold !text-white">Persoonlijk contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-200">
                Wilt u eerst kennismaken voordat u een aanvraag doet? Bel of app ons gerust. Wij
                nemen graag de tijd om uw vragen te beantwoorden.
              </p>
              <Link href="/contact" className="btn-primary mt-5 w-full text-xs">
                Naar de contactpagina
                <PijlIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        variant="grijs"
        eyebrow="Onze belofte"
        titel="Waarop u bij ons kunt rekenen"
      >
        <VoordelenGrid voordelen={voordelen} />
      </Section>

      <CtaBlok
        titel="Kennismaken zonder verplichtingen"
        tekst="Wij vertellen u graag meer over onze reizen, de begeleiding en de manier waarop wij werken."
      />
    </>
  );
}
