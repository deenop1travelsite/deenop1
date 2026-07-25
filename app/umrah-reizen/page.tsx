import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ReisKaart from "@/components/ReisKaart";
import Notitie from "@/components/Notitie";
import CtaBlok from "@/components/CtaBlok";
import JsonLd from "@/components/JsonLd";
import { reizen } from "@/lib/data/reizen";
import { kruimelSchema, reisSchema } from "@/lib/schema";

export const metadata: Metadata = paginaMetadata({
  titel: "Umrah-reizen",
  beschrijving:
    "Bekijk onze aankomende begeleide Umrah-reizen naar Mekka en Medina, met vertrekdata, hotels, inbegrepen diensten en prijs vanaf.",
  pad: "/umrah-reizen",
});

export default function UmrahReizenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ons aanbod"
        titel="Onze begeleide Umrah-reizen"
        intro="Elke reis is volledig verzorgd: vlucht, visum, hotels, transfers en Nederlandstalige begeleiding. Bekijk de details en vraag vrijblijvend informatie aan."
        kruimels={[{ label: "Home", href: "/" }, { label: "Umrah-reizen" }]}
      />

      <Section>
        <div className="mb-10 max-w-3xl">
          <Notitie titel="Informatie aanvragen is vrijblijvend">
            Via deze website kunt u nog niet betalen of definitief boeken. U vult per reis een
            aanvraagformulier in, waarna wij binnen twee werkdagen persoonlijk contact met u
            opnemen. Alle prijzen, data en hotels zijn voorbeelden en onder voorbehoud.
          </Notitie>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {reizen.map((reis, i) => (
            <ReisKaart key={reis.id} reis={reis} positie={i} />
          ))}
        </div>
      </Section>

      <Section
        variant="grijs"
        eyebrow="Goed om te weten"
        titel="Wat u bij elke reis van ons kunt verwachten"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              titel: "Prijs vanaf",
              tekst:
                "De prijs vanaf geldt per persoon bij de voordeligste kamerindeling. Een twee- of driepersoonskamer is mogelijk tegen een toeslag.",
            },
            {
              titel: "Kamerindeling",
              tekst:
                "Wij delen kamers altijd in overleg in en houden rekening met gezinnen en met broeders en zusters die apart verblijven.",
            },
            {
              titel: "Beschikbaarheid",
              tekst:
                "Het aantal beschikbare plaatsen wordt regelmatig bijgewerkt. Bij een volle reis plaatsen wij u op de wachtlijst.",
            },
            {
              titel: "Vluchten",
              tekst:
                "Wij vliegen met reguliere luchtvaartmaatschappijen. De exacte vluchttijden ontvangt u zodra deze definitief zijn.",
            },
            {
              titel: "Visum",
              tekst:
                "Het Umrah-visum vragen wij voor u aan. Welke gegevens daarvoor nodig zijn, laten wij tijdig en via een veilige weg weten.",
            },
            {
              titel: "Wijzigingen",
              tekst:
                "Hotels en programma kunnen door omstandigheden wijzigen. Wij informeren u hierover altijd zo snel mogelijk.",
            },
          ].map((item) => (
            <div key={item.titel} className="card p-6">
              <h3 className="text-base font-semibold text-navy-900">{item.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.tekst}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBlok
        titel="Twijfelt u tussen twee reizen?"
        tekst="Vertel ons met wie u reist en wat voor u belangrijk is. Wij adviseren u graag over de periode en het pakket dat het beste past."
      />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Umrah-reizen van Deen op 1 Travel",
            numberOfItems: reizen.length,
            itemListElement: reizen.map((reis, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: reisSchema(reis),
            })),
          },
          kruimelSchema([
            { naam: "Home", pad: "/" },
            { naam: "Umrah-reizen", pad: "/umrah-reizen" },
          ]),
        ]}
      />
    </>
  );
}
