import Link from "next/link";
import Logo from "@/components/Logo";
import { footerNavigatie, navigatie, site, whatsappLink } from "@/lib/site";
import { reizen } from "@/lib/data/reizen";
import {
  KlokIcon,
  LocatieIcon,
  MailIcon,
  ShieldIcon,
  TelefoonIcon,
  VinkjeIcon,
  WhatsAppIcon,
} from "@/components/Icons";

const beloften = [
  "Nederlandstalige begeleiding",
  "Hotels op loopafstand van de Haram",
  "Persoonlijk contact bij elke aanvraag",
];

export default function Footer() {
  const jaar = new Date().getFullYear();
  const telefoonSchoon = site.contact.telefoon.replace(/\s/g, "");

  return (
    <footer className="mt-sectie bg-navy-950 text-navy-200">
      {/* Beloftenbalk */}
      <div className="border-b border-white/10">
        <div className="container-page grid gap-4 py-7 sm:grid-cols-3">
          {beloften.map((belofte) => (
            <p key={belofte} className="flex items-center gap-2.5 text-sm text-navy-100">
              <VinkjeIcon className="h-4 w-4 shrink-0 text-gold-400" />
              {belofte}
            </p>
          ))}
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-5 lg:col-span-4">
          <Logo variant="opDonker" />
          <p className="max-w-sm text-sm leading-relaxed text-navy-300">{site.beschrijving}</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light btn-klein"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            WhatsApp ons
          </a>
        </div>

        <nav className="lg:col-span-2" aria-labelledby="footer-navigatie">
          <h2
            id="footer-navigatie"
            className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] !text-white"
          >
            Navigatie
          </h2>
          <ul className="space-y-2.5 text-sm">
            {navigatie.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block rounded-sm transition-colors hover:text-gold-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-3" aria-labelledby="footer-reizen">
          <h2
            id="footer-reizen"
            className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] !text-white"
          >
            Onze reizen
          </h2>
          <ul className="space-y-2.5 text-sm">
            {reizen.map((reis) => (
              <li key={reis.id}>
                <Link
                  href={`/umrah-reizen/${reis.slug}`}
                  className="inline-block rounded-sm transition-colors hover:text-gold-400"
                >
                  {reis.naam}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/reisdetails"
                className="inline-block rounded-sm transition-colors hover:text-gold-400"
              >
                Reizen vergelijken
              </Link>
            </li>
            <li>
              <Link
                href="/aanvragen"
                className="inline-block rounded-sm transition-colors hover:text-gold-400"
              >
                Informatie aanvragen
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] !text-white">
            Contact
          </h2>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <TelefoonIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${telefoonSchoon}`} className="rounded-sm hover:text-gold-400">
                {site.contact.telefoon}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a
                href={`mailto:${site.contact.email}`}
                className="rounded-sm break-all hover:text-gold-400"
              >
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <LocatieIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <address className="not-italic">
                {site.contact.adres.straat}
                <br />
                {site.contact.adres.postcode} {site.contact.adres.plaats}
              </address>
            </li>
            <li className="flex items-start gap-2.5">
              <KlokIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>
                {site.contact.openingstijden[0].dagen}
                <br />
                {site.contact.openingstijden[0].tijden}
              </span>
            </li>
          </ul>
          <p className="mt-5 text-xs text-navy-400">
            KvK {site.bedrijf.kvk} · BTW {site.bedrijf.btw}
          </p>
        </div>
      </div>

      <div className="h-px w-full rand-goud" aria-hidden="true" />

      <div className="container-page py-7">
        <p className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-relaxed text-navy-300">
          <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
          <span>
            Deze website is informatief. Via de website kan niet worden betaald en er komt geen
            definitieve boeking tot stand. Alle vermelde prijzen, data en hotels zijn voorbeelden en
            onder voorbehoud van wijziging en beschikbaarheid. Wij vragen nooit om paspoortgegevens
            of betaalgegevens via de website.
          </span>
        </p>

        <div className="mt-6 flex flex-col gap-4 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {jaar} {site.naam}. Alle rechten voorbehouden.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNavigatie.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-sm hover:text-gold-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
