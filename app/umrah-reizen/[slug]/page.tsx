import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Notitie from "@/components/Notitie";
import Beschikbaarheid from "@/components/Beschikbaarheid";
import FaqLijst from "@/components/FaqLijst";
import AanvraagFormulier from "@/components/AanvraagFormulier";
import JsonLd from "@/components/JsonLd";
import { getReisBySlug, reizen } from "@/lib/data/reizen";
import { veelgesteldeVragen } from "@/lib/data/inhoud";
import { formatDatum, formatPrijs } from "@/lib/format";
import { kruimelSchema, reisSchema } from "@/lib/schema";
import { site, whatsappLinkVoorReis } from "@/lib/site";
import {
  GebouwIcon,
  KalenderIcon,
  KlokIcon,
  KruisIcon,
  LocatieIcon,
  PijlIcon,
  SterIcon,
  VinkjeIcon,
  VliegtuigIcon,
  WhatsAppIcon,
} from "@/components/Icons";

// In Next.js 15 zijn params en searchParams asynchroon.
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return reizen.map((reis) => ({ slug: reis.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reis = getReisBySlug(slug);
  if (!reis) return { title: "Reis niet gevonden" };

  const pad = `/umrah-reizen/${reis.slug}`;
  const titel = `${reis.naam} – reisdetails`;

  return {
    title: titel,
    description: reis.samenvatting,
    alternates: { canonical: pad },
    openGraph: {
      type: "article",
      locale: "nl_NL",
      siteName: site.naam,
      url: pad,
      title: `${titel} | ${site.naam}`,
      description: reis.samenvatting,
    },
    twitter: {
      card: "summary_large_image",
      title: `${titel} | ${site.naam}`,
      description: reis.samenvatting,
    },
  };
}

export default async function ReisDetailPage({ params }: Props) {
  const { slug } = await params;
  const reis = getReisBySlug(slug);
  if (!reis) notFound();

  const kerngegevens = [
    { icoon: <KalenderIcon />, label: "Vertrekdatum", waarde: formatDatum(reis.vertrekdatum) },
    { icoon: <KalenderIcon />, label: "Terugreisdatum", waarde: formatDatum(reis.terugreisdatum) },
    { icoon: <KlokIcon />, label: "Aantal dagen", waarde: `${reis.aantalDagen} dagen` },
    { icoon: <VliegtuigIcon />, label: "Luchthaven van vertrek", waarde: reis.luchthavenVertrek },
    { icoon: <LocatieIcon />, label: "Afstand Haram (Mekka)", waarde: reis.hotelMekka.afstandTotHaram },
    {
      icoon: <LocatieIcon />,
      label: "Afstand moskee (Medina)",
      waarde: reis.hotelMedina.afstandTotHaram,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Reis-ID ${reis.id}`}
        titel={reis.naam}
        intro={reis.samenvatting}
        kruimels={[
          { label: "Home", href: "/" },
          { label: "Umrah-reizen", href: "/umrah-reizen" },
          { label: reis.naam },
        ]}
      />

      <Section className="!pb-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Hoofdkolom */}
          <div className="space-y-12">
            <div>
              <h2 className="text-titel-md">Kerngegevens</h2>
              <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                {kerngegevens.map((item) => (
                  <div key={item.label} className="flex gap-3 rounded-2xl border border-navy-100 p-4">
                    <span className="mt-0.5 shrink-0 text-gold-600" aria-hidden="true">
                      {item.icoon}
                    </span>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-navy-500">
                        {item.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-navy-800">{item.waarde}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              {reis.geschiktVoor.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-navy-500">
                    Geschikt voor
                  </span>
                  {reis.geschiktVoor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-titel-md">Hotels</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <HotelKaart plaats="Mekka" hotel={reis.hotelMekka} />
                <HotelKaart plaats="Medina" hotel={reis.hotelMedina} />
              </div>
            </div>

            <div>
              <h2 className="text-titel-md">Inbegrepen en niet inbegrepen</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6">
                  <h3 className="text-base font-semibold text-navy-900">Inbegrepen</h3>
                  <ul className="mt-4 space-y-2.5">
                    {reis.inbegrepen.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-navy-700">
                        <VinkjeIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-navy-100 p-6">
                  <h3 className="text-base font-semibold text-navy-900">Niet inbegrepen</h3>
                  <ul className="mt-4 space-y-2.5">
                    {reis.nietInbegrepen.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-navy-600">
                        <KruisIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-titel-md">Dagprogramma</h2>
              <p className="mt-2 text-sm text-navy-600">
                Het programma is een indicatie. De begeleiding stemt de dagindeling af op de
                gebedstijden en de drukte bij de Haram.
              </p>
              <ol className="mt-6 space-y-4">
                {reis.dagprogramma.map((dag) => (
                  <li key={dag.dag} className="flex gap-4 rounded-2xl border border-navy-100 p-5">
                    <span className="shrink-0 rounded-xl bg-navy-900 px-3 py-1.5 text-xs font-semibold text-gold-300">
                      {dag.dag}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-900">{dag.titel}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                        {dag.beschrijving}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-titel-md">Begeleiding bij deze reis</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">{reis.begeleiding}</p>
            </div>
          </div>

          {/* Zijkolom */}
          <aside className="lg:sticky lg:top-[108px] lg:h-fit">
            <div className="card p-6">
              <p className="text-xs uppercase tracking-wider text-navy-500">Prijs vanaf</p>
              <p className="mt-1 font-serif text-3xl text-navy-900">
                {formatPrijs(reis.prijsVanaf)}
                <span className="ml-1.5 font-sans text-sm font-normal text-navy-500">p.p.</span>
              </p>
              <p className="mt-3 text-xs leading-relaxed text-navy-500">{reis.prijsToelichting}</p>

              <div className="mt-6 border-t border-navy-100 pt-5">
                <Beschikbaarheid
                  beschikbaar={reis.beschikbarePlaatsen}
                  totaal={reis.totaalPlaatsen}
                />
              </div>

              <a href="#aanvraagformulier" className="btn-primary mt-6 w-full">
                Informatie aanvragen
                <PijlIcon className="h-4 w-4" />
              </a>
              <a
                href={whatsappLinkVoorReis(reis.naam, reis.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-3 w-full text-xs"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                Vraag stellen via WhatsApp
              </a>

              <p className="mt-5 text-center text-xs leading-relaxed text-navy-500">
                Dit is nog geen boeking. U betaalt niets via de website; wij nemen eerst persoonlijk
                contact met u op.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="!pt-4">
        <Notitie titel="Let op: voorbeeldgegevens" variant="nadruk">
          De prijzen, data, hotels en beschikbaarheid van deze reis zijn ter illustratie. De
          definitieve gegevens ontvangt u in het persoonlijke voorstel na uw aanvraag.
        </Notitie>
      </Section>

      <Section
        id="aanvraagformulier"
        variant="grijs"
        eyebrow="Informatie aanvragen"
        titel={`Vraag informatie aan over ${reis.naam}`}
        intro="De reis is hieronder al voor u ingevuld. Vul uw gegevens in en wij nemen binnen twee werkdagen persoonlijk contact met u op."
      >
        <div className="mx-auto max-w-3xl">
          <div className="card p-6 sm:p-8">
            <AanvraagFormulier vasteReis={reis} />
          </div>
        </div>
      </Section>

      <Section eyebrow="Veelgestelde vragen" titel="Vragen over deze reis">
        <div className="mx-auto max-w-3xl">
          <FaqLijst vragen={veelgesteldeVragen.slice(0, 5)} />
        </div>
      </Section>

      <JsonLd
        data={[
          reisSchema(reis),
          kruimelSchema([
            { naam: "Home", pad: "/" },
            { naam: "Umrah-reizen", pad: "/umrah-reizen" },
            { naam: reis.naam, pad: `/umrah-reizen/${reis.slug}` },
          ]),
        ]}
      />
    </>
  );
}

function HotelKaart({
  plaats,
  hotel,
}: {
  plaats: string;
  hotel: { naam: string; sterren: number; afstandTotHaram: string; toelichting: string };
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2.5">
        <GebouwIcon className="h-5 w-5 text-gold-600" />
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">{plaats}</p>
      </div>
      <h3 className="mt-3 text-base font-semibold text-navy-900">{hotel.naam}</h3>
      <div className="mt-2 flex items-center gap-1 text-gold-500" aria-label={`${hotel.sterren} sterren`}>
        {Array.from({ length: hotel.sterren }).map((_, i) => (
          <SterIcon key={i} />
        ))}
      </div>
      <p className="mt-3 text-sm font-medium text-navy-700">{hotel.afstandTotHaram}</p>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">{hotel.toelichting}</p>
    </div>
  );
}
