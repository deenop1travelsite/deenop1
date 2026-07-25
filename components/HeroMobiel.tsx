import Image from "next/image";
import Link from "next/link";
import HeroAchtergrond from "@/components/HeroAchtergrond";
import {
  BedIcon,
  DocumentIcon,
  GroepIcon,
  KalenderIcon,
  PijlIcon,
  VliegtuigIcon,
} from "@/components/Icons";
import { reizen } from "@/lib/data/reizen";
import { formatDatum, formatPrijs } from "@/lib/format";
import { heeftMobieleFoto, heeftDesktopFoto, heroFoto } from "@/lib/heroFoto";

/**
 * Hero voor telefoons, tot 768 px breed. Boven 768 px volledig verborgen.
 *
 * Opgebouwd voor een scherm van ongeveer 390 px breed:
 * - de foto loopt door tot achter de header;
 * - de maten schalen mee met clamp(), zodat 390 en 430 px allebei kloppen;
 * - alle afstanden zijn krap gehouden, zodat titel, tekst, knoppen, voordelen
 *   en de bovenrand van de reiskaart samen binnen één scherm passen;
 * - geen blur, geen filters, geen transform of zoom.
 */

const voordelen = [
  { icoon: VliegtuigIcon, tekst: "Vlucht inbegrepen" },
  { icoon: DocumentIcon, tekst: "Visum geregeld" },
  { icoon: BedIcon, tekst: "Hotels dichtbij de Haram" },
  { icoon: GroepIcon, tekst: "Nederlandstalige begeleiding" },
];

export default function HeroMobiel() {
  const eerste = reizen[0];
  const bron = heeftMobieleFoto ? heroFoto.mobiel : heroFoto.desktop;

  return (
    <section className="relative isolate w-full overflow-hidden bg-navy-950 md:hidden">
      {/* Achtergrond, doorlopend van de bovenrand van het scherm tot onder de kaart */}
      <div className="absolute inset-0 -z-10">
        {heeftMobieleFoto || heeftDesktopFoto ? (
          <Image
            src={`/${bron}`}
            alt=""
            fill
            priority
            quality={100}
            sizes="(max-width: 767px) 100vw, 1px"
            /* Nachtlucht bovenaan, gebouwen en minaretten achter de titel,
               de Ka'aba iets onder het midden. Geen extreme uitsnede. */
            className="object-cover object-[50%_50%]"
          />
        ) : (
          <HeroAchtergrond />
        )}

        {/* Overlay: donkerder naar links en naar boven, open naar rechtsonder */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy-950/[0.9] via-navy-950/60 to-navy-950/30"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/85 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-950 via-navy-950/75 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Inhoud. De bovenmarge laat ruimte voor de zwevende header (84 px). */}
      <div className="relative w-full px-5 pb-12 pt-[104px]">
        <h1 className="text-[clamp(2.5rem,10.5vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.03em] !text-white">
          Uw Umrah,
          <br />
          <span className="text-gold-300">
            zorgeloos
            <br />
            geregeld.
          </span>
          <br />
          Van vertrek tot
          <br />
          terugkomst.
        </h1>

        <p className="mt-4 max-w-[20.5rem] text-[0.9375rem] leading-[1.5] text-navy-100">
          Wij verzorgen uw vlucht, hotel, visum en transfers. Met Nederlandstalige begeleiding
          staan wij stap voor stap naast u tijdens uw spirituele reis naar Makkah en Madinah.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <Link
            href="/umrah-reizen"
            className="btn-primary w-full !py-3 text-[0.9375rem]"
          >
            Bekijk Umrah-reizen
            <PijlIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/aanvragen"
            className="btn-outline-light w-full !py-3 text-[0.9375rem]"
          >
            Vraag een offerte aan
          </Link>
        </div>

        <ul className="mt-6 space-y-2.5">
          {voordelen.map(({ icoon: Icoon, tekst }) => (
            <li key={tekst} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-400/45 text-gold-300">
                <Icoon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-white">{tekst}</span>
            </li>
          ))}
        </ul>

        {/* Reiskaart: de bovenrand valt nog binnen het eerste scherm */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-navy-950/60 p-4">
          <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
            <KalenderIcon className="h-3.5 w-3.5" />
            Eerstvolgende vertrek
          </p>
          <p className="mt-2 font-serif text-xl font-semibold !text-white">{eerste.naam}</p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-navy-200">{eerste.ondertitel}</p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-4 text-[0.8125rem]">
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-wider text-navy-300">Vertrek</dt>
              <dd className="mt-0.5 font-medium text-white">{formatDatum(eerste.vertrekdatum)}</dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-wider text-navy-300">Duur</dt>
              <dd className="mt-0.5 font-medium text-white">{eerste.aantalDagen} dagen</dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-wider text-navy-300">Vanaf</dt>
              <dd className="mt-0.5 font-medium text-gold-300">
                {formatPrijs(eerste.prijsVanaf)} p.p.
              </dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-wider text-navy-300">Mekka</dt>
              <dd className="mt-0.5 text-navy-100">{eerste.hotelMekka.afstandTotHaram}</dd>
            </div>
          </dl>

          <Link
            href={`/umrah-reizen/${eerste.slug}`}
            className="btn-outline-light mt-4 w-full !py-2.5 text-[0.8125rem]"
          >
            Bekijk de reisdetails
            <PijlIcon className="h-3.5 w-3.5" />
          </Link>

          <p className="mt-3 text-[0.6875rem] leading-relaxed text-navy-300">
            Vrijblijvend aanvragen. U betaalt niets via de website; wij nemen persoonlijk contact
            met u op.
          </p>
        </div>
      </div>
    </section>
  );
}
