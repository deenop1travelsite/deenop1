import Image from "next/image";
import Link from "next/link";
import HeroAchtergrond from "@/components/HeroAchtergrond";
import HeroMobiel from "@/components/HeroMobiel";
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
import { heeftDesktopFoto, heroFoto } from "@/lib/heroFoto";

/**
 * De hero bestaat uit twee losse opbouwen:
 *
 *   - components/HeroMobiel.tsx  → tot 768 px
 *   - de sectie hieronder        → vanaf 768 px (ongewijzigd)
 *
 * Er is er altijd maar één zichtbaar, dus schermlezers en zoekmachines
 * krijgen per schermformaat één versie te zien.
 */
const fotoNaam = heroFoto.desktop;
const heeftFoto = heeftDesktopFoto;

const voordelen = [
  { icoon: VliegtuigIcon, tekst: "Vlucht inbegrepen" },
  { icoon: DocumentIcon, tekst: "Visum geregeld" },
  { icoon: BedIcon, tekst: "Hotels dichtbij de Haram" },
  { icoon: GroepIcon, tekst: "Nederlandstalige begeleiding" },
];

export default function Hero() {
  const eerste = reizen[0];

  return (
    <>
      {/* Tot 768 px: eigen mobiele opbouw */}
      <HeroMobiel />

      {/*
       * Vanaf 768 px. De foto begint boven aan het scherm, achter de header:
       * die ligt op de homepage doorzichtig over deze sectie heen.
       */}
      <section className="relative isolate hidden min-h-screen items-center overflow-hidden bg-navy-950 md:flex">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          {heeftFoto ? (
            <Image
              src={`/${fotoNaam}`}
              alt=""
              fill
              priority
              quality={90}
              sizes="(min-width: 768px) 100vw, 1px"
              className="object-cover object-center"
            />
          ) : (
            <HeroAchtergrond />
          )}

          {/* Donkere marineblauwe overlay: links duidelijk donkerder dan rechts,
              want daar staat de grote titel. */}
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,12,29,0.88)_0%,rgba(2,12,29,0.68)_42%,rgba(2,12,29,0.30)_75%,rgba(2,12,29,0.15)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,12,29,0.45)_0%,rgba(2,12,29,0.12)_45%,rgba(2,12,29,0.50)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1450px] px-8 py-24 lg:px-[70px] lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-20">
          {/* Tekstkolom */}
          <div className="max-w-2xl">
            <span className="inline-flex animate-fade-in items-center gap-2.5 rounded-full border border-gold-400/30 bg-white/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-gold-200 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
              Begeleide Umrah-reizen naar Makkah en Madinah
            </span>

            <h1 className="mt-7 animate-fade-up text-titel-hero !text-white lg:text-[clamp(3.4rem,4.5vw,5.4rem)] lg:leading-[0.98] lg:tracking-[-0.03em]">
              Uw Umrah,
              <span className="block text-gold-300">zorgeloos geregeld.</span>
              <span className="block">
                Van vertrek
                <br className="hidden lg:inline" /> tot terugkomst.
              </span>
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
                className="btn-outline-light !px-7 !py-4 text-base backdrop-blur-sm"
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

          {/* Uitgelichte reis: glazen kaart over de foto */}
          <div className="animate-scale-in vertraag-3 lg:justify-self-end">
            <div
              className="w-full rounded-[28px] border border-white/[0.18] bg-[rgba(18,29,45,0.62)] p-6
                         shadow-[0_20px_60px_rgba(0,0,0,0.30)] backdrop-blur-[16px] sm:p-8 lg:max-w-[460px]"
            >
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
    </>
  );
}
