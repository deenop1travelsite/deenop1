import Link from "next/link";
import { InfoIcon, KalenderIcon, PijlIcon, VinkjeIcon } from "@/components/Icons";
import { reizen } from "@/lib/data/reizen";
import { formatDatum, formatPrijs } from "@/lib/format";

const kernpunten = [
  "Nederlandstalige begeleiding",
  "Hotels dicht bij de Haram",
  "Persoonlijk contact bij elke aanvraag",
];

export default function Hero() {
  const eerste = reizen[0];

  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="pattern-arabesque absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full
                   bg-gold-500/10 blur-3xl lg:block"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-medium text-gold-200">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            {reizen.length} Umrah-reizen beschikbaar
          </span>

          <h1 className="mt-6 animate-fade-up text-titel-xl !text-white">
            Beleef de Umrah met vertrouwen en goede begeleiding
          </h1>

          <p className="mt-6 max-w-lees animate-fade-up text-base leading-relaxed text-navy-200 vertraag-1 sm:text-lg">
            Deen op 1 Travel organiseert begeleide Umrah-reizen naar Mekka en Medina. Wij regelen de
            vlucht, de hotels, de transfers en het visum, en zorgen voor Nederlandstalige begeleiding
            die u stap voor stap door de rituelen leidt. Zo kunt u zich richten op wat werkelijk
            belangrijk is.
          </p>

          <ul className="mt-7 flex animate-fade-up flex-col gap-2.5 vertraag-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {kernpunten.map((punt) => (
              <li key={punt} className="flex items-center gap-2 text-sm text-navy-100">
                <VinkjeIcon className="h-4 w-4 shrink-0 text-gold-400" />
                {punt}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 vertraag-3 sm:flex-row">
            <Link href="/umrah-reizen" className="btn-primary group">
              Bekijk onze reizen
              <PijlIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link href="/werkwijze" className="btn-outline-light">
              Zo werkt het
            </Link>
          </div>

          <p className="mt-7 flex max-w-lees animate-fade-in items-start gap-2.5 text-xs leading-relaxed text-navy-300 vertraag-4">
            <InfoIcon className="mt-px h-4 w-4 shrink-0 text-gold-400" />
            Deze website is informatief. U kunt per reis een aanvraag doen; er wordt online niets
            betaald en uw plaats wordt pas vastgelegd na persoonlijk contact.
          </p>
        </div>

        {/* Uitgelichte reis */}
        <div className="relative animate-scale-in vertraag-2 lg:pl-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
            <p className="eyebrow-licht flex items-center gap-2">
              <KalenderIcon className="h-4 w-4" />
              Eerstvolgende vertrek
            </p>
            <p className="mt-3 font-serif text-titel-md !text-white">{eerste.naam}</p>
            <p className="mt-2 text-sm text-navy-200">{eerste.ondertitel}</p>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-navy-400">Vertrek</dt>
                <dd className="mt-1 font-medium text-white">{formatDatum(eerste.vertrekdatum)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-navy-400">Duur</dt>
                <dd className="mt-1 font-medium text-white">{eerste.aantalDagen} dagen</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-navy-400">Vanaf</dt>
                <dd className="mt-1 font-medium text-gold-300">
                  {formatPrijs(eerste.prijsVanaf)} p.p.
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-navy-400">Mekka</dt>
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
          </div>
        </div>
      </div>
    </section>
  );
}
