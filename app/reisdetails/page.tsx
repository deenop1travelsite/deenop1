import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Notitie from "@/components/Notitie";
import CtaBlok from "@/components/CtaBlok";
import { reizen } from "@/lib/data/reizen";
import { formatDatum, formatPrijs } from "@/lib/format";
import { PijlIcon } from "@/components/Icons";

export const metadata: Metadata = paginaMetadata({
  titel: "Reisdetails",
  beschrijving:
    "Vergelijk de reisdetails van onze Umrah-pakketten: data, duur, luchthaven, hotels, afstand tot de Haram, prijs vanaf en beschikbaarheid.",
  pad: "/reisdetails",
});

const rijen = [
  { label: "Reis-ID", waarde: (r: (typeof reizen)[number]) => r.id },
  { label: "Pakket", waarde: (r: (typeof reizen)[number]) => r.naam },
  { label: "Vertrekdatum", waarde: (r: (typeof reizen)[number]) => formatDatum(r.vertrekdatum) },
  { label: "Terugreisdatum", waarde: (r: (typeof reizen)[number]) => formatDatum(r.terugreisdatum) },
  { label: "Aantal dagen", waarde: (r: (typeof reizen)[number]) => `${r.aantalDagen} dagen` },
  { label: "Luchthaven van vertrek", waarde: (r: (typeof reizen)[number]) => r.luchthavenVertrek },
  { label: "Hotel Mekka", waarde: (r: (typeof reizen)[number]) => r.hotelMekka.naam },
  {
    label: "Afstand tot de Haram",
    waarde: (r: (typeof reizen)[number]) => r.hotelMekka.afstandTotHaram,
  },
  { label: "Hotel Medina", waarde: (r: (typeof reizen)[number]) => r.hotelMedina.naam },
  {
    label: "Afstand tot de moskee",
    waarde: (r: (typeof reizen)[number]) => r.hotelMedina.afstandTotHaram,
  },
  { label: "Prijs vanaf", waarde: (r: (typeof reizen)[number]) => `${formatPrijs(r.prijsVanaf)} p.p.` },
  {
    label: "Beschikbare plaatsen",
    waarde: (r: (typeof reizen)[number]) => `${r.beschikbarePlaatsen} van ${r.totaalPlaatsen}`,
  },
];

export default function ReisdetailsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Overzicht"
        titel="Reisdetails naast elkaar"
        intro="Vergelijk onze Umrah-pakketten in één overzicht. Klik door naar een reis voor het volledige dagprogramma en alle inbegrepen diensten."
        kruimels={[{ label: "Home", href: "/" }, { label: "Reisdetails" }]}
      />

      <Section>
        {/* Tabel voor tablet en desktop */}
        <div className="hidden overflow-hidden rounded-2xl border border-navy-100 md:block">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Vergelijking van de Umrah-pakketten</caption>
            <thead>
              <tr className="bg-navy-900 text-white">
                <th scope="col" className="w-56 px-5 py-4 font-semibold">
                  Kenmerk
                </th>
                {reizen.map((reis) => (
                  <th key={reis.id} scope="col" className="px-5 py-4 font-semibold">
                    {reis.naam}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rijen.map((rij, i) => (
                <tr key={rij.label} className={i % 2 === 1 ? "bg-navy-50/60" : "bg-white"}>
                  <th scope="row" className="px-5 py-3.5 align-top font-medium text-navy-800">
                    {rij.label}
                  </th>
                  {reizen.map((reis) => (
                    <td key={reis.id} className="px-5 py-3.5 align-top text-navy-600">
                      {rij.waarde(reis)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-white">
                <th scope="row" className="px-5 py-4 font-medium text-navy-800">
                  Meer informatie
                </th>
                {reizen.map((reis) => (
                  <td key={reis.id} className="px-5 py-4">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/umrah-reizen/${reis.slug}`}
                        className="btn-outline !px-4 !py-2 text-xs"
                      >
                        Reisdetails
                      </Link>
                      <Link
                        href={`/aanvragen?reis=${reis.id}`}
                        className="btn-primary !px-4 !py-2 text-xs"
                      >
                        Informatie aanvragen
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Kaartweergave voor mobiel */}
        <div className="space-y-6 md:hidden">
          {reizen.map((reis) => (
            <div key={reis.id} className="card overflow-hidden">
              <div className="bg-navy-900 px-5 py-4">
                <p className="text-[11px] uppercase tracking-wider text-navy-300">{reis.id}</p>
                <h2 className="mt-1 font-serif text-lg !text-white">{reis.naam}</h2>
              </div>
              <dl className="divide-y divide-navy-100">
                {rijen.slice(2).map((rij) => (
                  <div key={rij.label} className="flex justify-between gap-4 px-5 py-3">
                    <dt className="text-xs uppercase tracking-wider text-navy-500">{rij.label}</dt>
                    <dd className="text-right text-sm font-medium text-navy-800">
                      {rij.waarde(reis)}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-2 p-5">
                <Link href={`/umrah-reizen/${reis.slug}`} className="btn-outline w-full text-xs">
                  Reisdetails
                </Link>
                <Link href={`/aanvragen?reis=${reis.id}`} className="btn-primary w-full text-xs">
                  Informatie aanvragen
                  <PijlIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl">
          <Notitie titel="Voorbeeldgegevens">
            Alle gegevens in dit overzicht zijn voorbeelden. De definitieve prijs, hotels en
            vluchttijden leggen wij vast in het persoonlijke voorstel dat u na uw aanvraag ontvangt.
          </Notitie>
        </div>
      </Section>

      <CtaBlok
        titel="Weet u niet welke reis het beste past?"
        tekst="Laat ons weten met wie u reist, welke periode u schikt en wat uw budget is. Wij geven u een eerlijk advies."
      />
    </>
  );
}
