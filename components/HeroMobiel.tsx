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
 * Hero voor telefoons, tot 768 px breed.
 *
 * Dit is een eigen opbouw, los van de desktopversie in components/Hero.tsx:
 * de foto loopt door tot achter de header, er is geen badge, en de titel,
 * de knoppen, de voordelen en de reiskaart staan onder elkaar.
 * Boven 768 px is deze sectie volledig verborgen (md:hidden).
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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy-950 md:hidden">
      {/* Achtergrond: loopt door tot helemaal bovenaan, achter logo en menu */}
      <div className="absolute inset-0 -z-10">
        {heeftMobieleFoto || heeftDesktopFoto ? (
          <Image
            src={`/${bron}`}
            alt=""
            fill
            priority
            quality={100}
            sizes="(max-width: 767px) 100vw, 1px"
            /*
             * De foto heeft vrijwel dezelfde verhouding als een telefoonscherm.
             * Met deze positie blijft de nachtelijke lucht bovenaan zichtbaar,
             * staan de minaretten achter de titel en valt de Ka'aba iets onder
             * het midden. Geen blur, geen filters.
             */
            className="object-cover object-[50%_48%]"
          />
        ) : (
          <HeroAchtergrond />
        )}

        {/* Donkerder naar links en naar boven, zodat de tekst leest terwijl
            de Ka'aba en de gouden verlichting zichtbaar blijven. */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy-950/[0.88] via-navy-950/55 to-navy-950/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-navy-950/85 via-navy-950/40 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Inhoud. De bovenmarge houdt ruimte vrij voor de zwevende header. */}
      <div className="relative px-5 pb-14 pt-32">
        <h1 className="text-[2.45rem] font-semibold leading-[1.06] tracking-[-0.025em] !text-white">
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

        <p className="mt-5 max-w-[21rem] text-base leading-[1.55] text-navy-100">
          Wij verzorgen uw vlucht, hotel, visum en transfers. Met Nederlandstalige begeleiding
          staan wij stap voor stap naast u tijdens uw spirituele reis naar Makkah en Madinah.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <Link href="/umrah-reizen" className="btn-primary w-full !py-3.5 text-base">
            Bekijk Umrah-reizen
            <PijlIcon className="h-4 w-4" />
          </Link>
          <Link href="/aanvragen" className="btn-outline-light w-full !py-3.5 text-base">
            Vraag een offerte aan
          </Link>
        </div>

        <ul className="mt-8 space-y-3">
          {voordelen.map(({ icoon: Icoon, tekst }) => (
            <li key={tekst} className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-400/45 text-gold-300">
                <Icoon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[0.9375rem] font-medium text-white">{tekst}</span>
            </li>
          ))}
        </ul>

        {/* Reiskaart */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-navy-950/60 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">
            <KalenderIcon className="h-4 w-4" />
            Eerstvolgende vertrek
          </p>
          <p className="mt-3 font-serif text-[1.4rem] font-semibold !text-white">{eerste.naam}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-200">{eerste.ondertitel}</p>

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/10 pt-5 text-sm">
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
            className="btn-outline-light mt-6 w-full text-sm"
          >
            Bekijk de reisdetails
            <PijlIcon className="h-4 w-4" />
          </Link>

          <p className="mt-4 text-xs leading-relaxed text-navy-300">
            Vrijblijvend aanvragen. U betaalt niets via de website; wij nemen persoonlijk contact
            met u op.
          </p>
        </div>
      </div>
    </section>
  );
}
