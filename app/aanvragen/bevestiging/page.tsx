import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Notitie from "@/components/Notitie";
import { getReisById } from "@/lib/data/reizen";
import { formatDatum, formatPrijs } from "@/lib/format";
import { site, whatsappLink } from "@/lib/site";
import {
  KalenderIcon,
  MailIcon,
  PijlIcon,
  TelefoonIcon,
  VinkjeIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Aanvraag ontvangen",
  description: "Uw vrijblijvende aanvraag is ontvangen. Wij nemen binnen twee werkdagen contact op.",
  robots: { index: false, follow: false },
};

// In Next.js 15 is searchParams asynchroon.
type Props = {
  searchParams: Promise<{ ref?: string; reis?: string; via?: string }>;
};

const vervolgstappen = [
  {
    nummer: "01",
    titel: "Ontvangstbevestiging per e-mail",
    tekst:
      "U ontvangt direct een e-mail met een overzicht van uw aanvraag en uw referentienummer. Controleer ook uw map met ongewenste e-mail.",
  },
  {
    nummer: "02",
    titel: "Persoonlijk contact binnen twee werkdagen",
    tekst:
      "Een van onze medewerkers neemt contact met u op om de beschikbaarheid, uw wensen en de vervolgstappen te bespreken.",
  },
  {
    nummer: "03",
    titel: "Voorstel op maat",
    tekst:
      "U ontvangt een overzicht met de kamerindeling, de definitieve prijs en de voorwaarden, zodat u alles rustig kunt nalezen.",
  },
  {
    nummer: "04",
    titel: "Pas daarna een definitieve boeking",
    tekst:
      "Uw plaats wordt vastgelegd nadat u het voorstel schriftelijk accepteert en wij dit aan u bevestigen. Daarna bespreken wij de betaling.",
  },
];

export default async function BevestigingPage({ searchParams }: Props) {
  const parameters = await searchParams;
  const referentie = (parameters.ref ?? "").trim();
  const reis = parameters.reis ? getReisById(parameters.reis) : undefined;
  const via = (parameters.via ?? "").trim();

  return (
    <>
      <div className="relative overflow-hidden bg-navy-900">
        <div className="pattern-arabesque absolute inset-0 opacity-70" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 opacity-90"
          aria-hidden="true"
        />
        <div className="container-page relative py-16 text-center sm:py-20">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
            <VinkjeIcon className="h-8 w-8 text-gold-400" />
          </span>
          <h1 className="mt-6 text-titel-xl !text-white">
            Bedankt, uw aanvraag is ontvangen
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-200">
            Wij hebben uw vrijblijvende aanvraag in goede orde ontvangen en nemen binnen twee
            werkdagen persoonlijk contact met u op
            {via ? ` via ${via.toLowerCase()}` : ""}.
          </p>
          {referentie && (
            <p className="mt-7 inline-flex flex-col items-center rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4">
              <span className="text-xs uppercase tracking-[0.16em] text-navy-300">
                Uw referentienummer
              </span>
              <span className="mt-1 font-serif text-2xl !text-gold-300">{referentie}</span>
            </p>
          )}
        </div>
      </div>

      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <Notitie titel="Dit is nog geen definitieve boeking" variant="nadruk">
            Uw plaats is nog niet vastgelegd en er is niets betaald. Een boeking komt pas tot stand
            nadat u een voorstel van ons heeft ontvangen, dit schriftelijk accepteert en wij dit aan u
            bevestigen.
          </Notitie>

          {reis && (
            <div className="card p-6">
              <p className="eyebrow">Uw aanvraag betreft</p>
              <h2 className="mt-2 font-serif text-xl text-navy-900">{reis.naam}</h2>
              <p className="mt-1 text-sm text-navy-600">{reis.ondertitel}</p>
              <dl className="mt-5 grid gap-4 border-t border-navy-100 pt-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-400">Reis-ID</dt>
                  <dd className="mt-0.5 font-medium text-navy-800">{reis.id}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-400">Duur</dt>
                  <dd className="mt-0.5 font-medium text-navy-800">{reis.aantalDagen} dagen</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-400">Vertrek</dt>
                  <dd className="mt-0.5 font-medium text-navy-800">
                    {formatDatum(reis.vertrekdatum)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-400">Terugreis</dt>
                  <dd className="mt-0.5 font-medium text-navy-800">
                    {formatDatum(reis.terugreisdatum)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-400">Prijs vanaf</dt>
                  <dd className="mt-0.5 font-medium text-navy-800">
                    {formatPrijs(reis.prijsVanaf)} p.p.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-400">Luchthaven</dt>
                  <dd className="mt-0.5 font-medium text-navy-800">{reis.luchthavenVertrek}</dd>
                </div>
              </dl>
              <Link
                href={`/umrah-reizen/${reis.slug}`}
                className="btn-outline mt-6 text-xs"
              >
                Bekijk de reisdetails nogmaals
                <PijlIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          <div>
            <h2 className="text-titel-md">Wat gebeurt er nu?</h2>
            <ol className="mt-5 space-y-4">
              {vervolgstappen.map((stap) => (
                <li key={stap.nummer} className="flex gap-4 rounded-2xl border border-navy-100 p-5">
                  <span className="font-serif text-lg text-gold-500" aria-hidden="true">
                    {stap.nummer}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy-900">{stap.titel}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{stap.tekst}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl bg-navy-900 p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <KalenderIcon className="h-5 w-5 text-gold-400" />
              <h2 className="text-lg font-semibold !text-white">Wilt u ons eerder spreken?</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-navy-200">
              Vermeld uw referentienummer, dan kunnen wij uw aanvraag direct terugvinden.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-navy-200">
              <li className="flex items-center gap-2.5">
                <TelefoonIcon className="h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`tel:${site.contact.telefoon.replace(/\s/g, "")}`}
                  className="hover:text-gold-400"
                >
                  {site.contact.telefoon}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-gold-400" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-gold-400">
                  {site.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light text-xs"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp ons
              </a>
              <Link href="/umrah-reizen" className="btn-primary text-xs">
                Bekijk onze andere reizen
                <PijlIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-navy-500">
            Geen e-mail ontvangen? Controleer uw map met ongewenste e-mail of neem contact met ons op.
            Wij vragen u nooit per e-mail of via WhatsApp om betaalgegevens, paspoortgegevens of een
            kopie van uw identiteitsbewijs.
          </p>
        </div>
      </Section>
    </>
  );
}
