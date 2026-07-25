import Link from "next/link";
import type { ReactNode } from "react";
import type { Reis } from "@/lib/types";
import { formatDatum, formatPrijs } from "@/lib/format";
import { BedIcon, KalenderIcon, KlokIcon, PijlIcon, VliegtuigIcon } from "@/components/Icons";
import Beschikbaarheid from "@/components/Beschikbaarheid";

type Props = {
  reis: Reis;
  /** Volgorde in de lijst, voor een rustige gestaffelde opkomst. */
  positie?: number;
};

export default function ReisKaart({ reis, positie = 0 }: Props) {
  const vertraging = ["", "vertraag-1", "vertraag-2", "vertraag-3"][positie % 4];

  return (
    <article
      className={`card-interactief group relative flex h-full animate-fade-up flex-col overflow-hidden ${vertraging}`}
    >
      {/* Kop */}
      <div className="relative overflow-hidden bg-navy-900 px-6 py-7">
        <div className="pattern-arabesque absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-400/20 opacity-60 blur-2xl
                     transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-navy-300">
              Reis-ID {reis.id}
            </p>
            <h3 className="mt-2 font-serif text-titel-md !text-white">
              <Link
                href={`/umrah-reizen/${reis.slug}`}
                className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                {reis.naam}
              </Link>
            </h3>
            <p className="mt-1.5 text-sm text-navy-200">{reis.ondertitel}</p>
          </div>
          {reis.label && (
            <span className="relative z-10 shrink-0 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-semibold text-navy-950">
              {reis.label}
            </span>
          )}
        </div>
      </div>

      {/* Gegevens */}
      <div className="flex flex-1 flex-col p-6">
        <dl className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
          <Detail
            icoon={<KalenderIcon className="h-4 w-4" />}
            label="Vertrek"
            waarde={formatDatum(reis.vertrekdatum)}
          />
          <Detail
            icoon={<KalenderIcon className="h-4 w-4" />}
            label="Terugreis"
            waarde={formatDatum(reis.terugreisdatum)}
          />
          <Detail
            icoon={<KlokIcon className="h-4 w-4" />}
            label="Aantal dagen"
            waarde={`${reis.aantalDagen} dagen`}
          />
          <Detail
            icoon={<VliegtuigIcon className="h-4 w-4" />}
            label="Luchthaven"
            waarde={reis.luchthavenVertrek}
          />
          <Detail
            icoon={<BedIcon className="h-4 w-4" />}
            label="Hotel Mekka"
            waarde={reis.hotelMekka.naam}
            extra={reis.hotelMekka.afstandTotHaram}
          />
          <Detail
            icoon={<BedIcon className="h-4 w-4" />}
            label="Hotel Medina"
            waarde={reis.hotelMedina.naam}
            extra={reis.hotelMedina.afstandTotHaram}
          />
        </dl>

        <p className="mt-5 text-sm leading-relaxed text-navy-600">{reis.samenvatting}</p>

        <div className="mt-6">
          <Beschikbaarheid beschikbaar={reis.beschikbarePlaatsen} totaal={reis.totaalPlaatsen} />
        </div>

        {/* Prijs en knoppen */}
        <div className="mt-auto flex flex-col gap-4 border-t border-navy-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-navy-500">Prijs vanaf</p>
            <p className="font-serif text-2xl text-navy-900">
              {formatPrijs(reis.prijsVanaf)}
              <span className="ml-1 font-sans text-sm font-normal text-navy-500">p.p.</span>
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-2 sm:flex-row">
            <Link href={`/umrah-reizen/${reis.slug}`} className="btn-outline btn-klein">
              Reisdetails
            </Link>
            <Link href={`/aanvragen?reis=${reis.id}`} className="btn-primary btn-klein">
              Informatie aanvragen
              <PijlIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function Detail({
  icoon,
  label,
  waarde,
  extra,
}: {
  icoon: ReactNode;
  label: string;
  waarde: string;
  extra?: string;
}) {
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 shrink-0 text-gold-600" aria-hidden="true">
        {icoon}
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] uppercase tracking-wider text-navy-500">{label}</dt>
        <dd className="text-sm font-medium text-navy-800">{waarde}</dd>
        {extra && <p className="mt-0.5 text-xs text-navy-500">{extra}</p>}
      </div>
    </div>
  );
}
