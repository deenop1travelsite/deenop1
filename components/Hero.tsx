import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import HeroAchtergrond from "@/components/HeroAchtergrond";
import {
  BedIcon,
  DocumentIcon,
  GroepIcon,
  KalenderIcon,
  PijlIcon,
  VinkjeIcon,
  VliegtuigIcon,
} from "@/components/Icons";
import { reizen } from "@/lib/data/reizen";
import { formatDatum, formatPrijs } from "@/lib/format";

/**
 * Eigen foto gebruiken?
 * Zet een rechtenvrije foto van de Ka'aba neer als:
 *
 *     public/hero-kaaba.jpg
 *
 * De hero pakt die dan automatisch op. Staat het bestand er niet, dan wordt de
 * getekende achtergrond (components/HeroAchtergrond.tsx) getoond, zodat de
 * pagina er hoe dan ook verzorgd uitziet.
 */
const fotoNaam = "hero-kaaba.jpg";
const fotoNaamMobiel = "hero-kaaba-mobiel.png";

function bestaat(naam: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", naam));
  } catch {
    return false;
  }
}

const heeftFoto = bestaat(fotoNaam);
/** Staande foto speciaal voor telefoons; valt terug op de desktopfoto. */
const heeftMobieleFoto = bestaat(fotoNaamMobiel);

const voordelen = [
  { icoon: VliegtuigIcon, tekst: "Vlucht inbegrepen" },
  { icoon: DocumentIcon, tekst: "Visum geregeld" },
  { icoon: BedIcon, tekst: "Hotels dichtbij de Haram" },
  { icoon: GroepIcon, tekst: "Nederlandstalige begeleiding" },
];

export default function Hero() {
  const eerste = reizen[0];

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 md:min-h-[88svh]">
      {/*
       * Achtergrond. Twee losse lagen:
       *   - onder 768 px de staande telefoonfoto met een lichtere overlay;
       *   - vanaf 768 px de bestaande desktopfoto, ongewijzigd.
       * Dankzij de sizes-waarden haalt een telefoon alleen de mobiele foto op
       * en een desktop alleen de desktopfoto; de andere blijft een miniatuur.
       */}
      <div className="absolute inset-0 -z-10">
        {/* ---------- Mobiel: tot 768 px ---------- */}
        <div className="absolute inset-0 md:hidden">
          {heeftMobieleFoto || heeftFoto ? (
            <Image
              src={`/${heeftMobieleFoto ? fotoNaamMobiel : fotoNaam}`}
              alt=""
              fill
              priority
              quality={100}
              /*
               * De foto is 853 px breed en de hero is precies één schermhoogte,
               * dus vragen wij de volle schermbreedte op. Op desktop blijft er
               * een miniatuur over, zodat daar niets extra's wordt gedownload.
               */
              sizes="(max-width: 767px) 100vw, 1px"
              /* De verhouding van de foto komt overeen met een telefoonscherm:
                 minaretten bovenin, Ka'aba onderin, nauwelijks bijsnijden. */
              className="object-cover object-[center_50%]"
            />
          ) : (
            <HeroAchtergrond />
          )}

          {/* Lichtere overlay, zodat de nachtelijke sfeer en de gouden
              verlichting duidelijk doorkomen. Geen blur, geen filters. */}
          <div className="absolute inset-0 bg-navy-950/[0.45]" aria-hidden="true" />
          <div
            className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-navy-950/85 via-navy-950/45 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* ---------- Desktop: vanaf 768 px, ongewijzigd ---------- */}
        <div className="absolute inset-0 hidden md:block">
          {heeftFoto ? (
            <Image
              src={`/${fotoNaam}`}
              alt=""
              fill
              priority
              quality={80}
              sizes="(min-width: 768px) 100vw, 1px"
              className="object-cover object-[center_40%]"
            />
          ) : (
            <HeroAchtergrond />
          )}

          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-950/[0.94] via-navy-950/[0.82] to-navy-950/50"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"
            aria-hidden="true"
          />
          <div className="pattern-arabesque absolute inset-0 opacity-20" aria-hidden="true" />
        </div>
      </div>

      {/* Extra ruimte bovenaan op mobiel: daar ligt de zwevende header overheen */}
      <div className="container-page relative w-full py-20 max-md:pb-16 max-md:pt-32 sm:py-24 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Tekstkolom */}
          <div className="max-w-2xl">
            {/* Geen backdrop-blur op mobiel: daar moet de foto scherp blijven */}
            <span className="inline-flex animate-fade-in items-center gap-2.5 rounded-full border border-gold-400/30 bg-white/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-gold-200 md:backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
              Begeleide Umrah-reizen naar Makkah en Madinah
            </span>

            <h1 className="mt-7 animate-fade-up text-titel-hero !text-white">
              Uw Umrah,
              <span className="block text-gold-300">zorgeloos geregeld.</span>
              <span className="block">Van vertrek tot terugkomst.</span>
            </h1>

            <p className="mt-7 max-w-xl animate-fade-up text-base leading-[1.75] text-navy-100 vertraag-1 sm:text-lg">
              Wij verzorgen uw vlucht, hotel, visum en transfers. Met Nederlandstalige begeleiding
              staan wij stap voor stap naast u tijdens uw spirituele reis naar Makkah en Madinah.
            </p>

            <div className="mt-10 flex animate-fade-up flex-col gap-3 vertraag-2 sm:flex-row sm:gap-4">
              <Link href="/umrah-reizen" className="btn-primary group !px-7 !py-4 text-base">
                Bekijk Umrah-reizen
                <PijlIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/aanvragen"
                className="btn-outline-light !px-7 !py-4 text-base md:backdrop-blur-sm"
              >
                Vraag een offerte aan
              </Link>
            </div>

            <ul className="mt-11 grid animate-fade-up gap-x-6 gap-y-4 vertraag-3 sm:grid-cols-2">
              {voordelen.map(({ icoon: Icoon, tekst }) => (
                <li key={tekst} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-400/25 bg-gold-400/10 text-gold-300">
                    <Icoon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-sm font-medium text-navy-50">{tekst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Uitgelichte reis */}
          <div className="animate-scale-in vertraag-3 lg:justify-self-end">
            <div className="w-full rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-lift backdrop-blur-md sm:p-8 lg:max-w-md">
              <p className="eyebrow-licht flex items-center gap-2">
                <KalenderIcon className="h-4 w-4" />
                Eerstvolgende vertrek
              </p>
              <p className="mt-3 font-serif text-titel-md !text-white">{eerste.naam}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">{eerste.ondertitel}</p>

              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-6 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-300">Vertrek</dt>
                  <dd className="mt-1 font-medium text-white">{formatDatum(eerste.vertrekdatum)}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-300">Duur</dt>
                  <dd className="mt-1 font-medium text-white">{eerste.aantalDagen} dagen</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-300">Vanaf</dt>
                  <dd className="mt-1 font-medium text-gold-300">
                    {formatPrijs(eerste.prijsVanaf)} p.p.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-navy-300">Mekka</dt>
                  <dd className="mt-1 text-navy-100">{eerste.hotelMekka.afstandTotHaram}</dd>
                </div>
              </dl>

              <Link
                href={`/umrah-reizen/${eerste.slug}`}
                className="btn-outline-light group mt-7 w-full text-sm"
              >
                Bekijk de reisdetails
                <PijlIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-navy-300">
                <VinkjeIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" />
                Vrijblijvend aanvragen. U betaalt niets via de website; wij nemen persoonlijk
                contact met u op.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Zachte gouden afsluiting naar de volgende sectie */}
      <div className="rand-goud absolute inset-x-0 bottom-0 h-px" aria-hidden="true" />
    </section>
  );
}
