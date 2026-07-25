import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import AanvraagFormulierUrl from "@/components/AanvraagFormulierUrl";
import { stappen } from "@/lib/data/inhoud";
import { site, whatsappLink } from "@/lib/site";
import { InfoIcon, MailIcon, TelefoonIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = paginaMetadata({
  titel: "Informatie aanvragen",
  beschrijving:
    "Vraag vrijblijvend informatie aan over een Umrah-reis van Deen op 1 Travel. Een aanvraag is nog geen definitieve boeking en u betaalt niets via de website.",
  pad: "/aanvragen",
  indexeren: false,
});

export default function AanvragenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vrijblijvend"
        titel="Informatie aanvragen"
        intro="Vul uw gegevens in en wij nemen binnen twee werkdagen persoonlijk contact met u op. Dit is nog geen boeking: u betaalt niets en uw plaats is nog niet vastgelegd."
        kruimels={[
          { label: "Home", href: "/" },
          { label: "Umrah-reizen", href: "/umrah-reizen" },
          { label: "Informatie aanvragen" },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card p-6 sm:p-8">
            <Suspense
              fallback={
                <p className="py-10 text-center text-sm text-navy-500">Formulier wordt geladen…</p>
              }
            >
              <AanvraagFormulierUrl />
            </Suspense>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-[108px] lg:h-fit">
            <div className="rounded-2xl border border-gold-300 bg-gold-50 p-6">
              <div className="flex items-center gap-2.5">
                <InfoIcon className="h-5 w-5 text-gold-700" />
                <h2 className="text-base font-semibold text-navy-900">
                  Nog geen definitieve boeking
                </h2>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-navy-700">
                <li>U betaalt niets via deze website.</li>
                <li>Uw plaats wordt nog niet vastgelegd.</li>
                <li>Wij vragen geen paspoortgegevens.</li>
                <li>U zit nergens aan vast tot u zelf akkoord geeft.</li>
              </ul>
            </div>

            <div className="card p-6">
              <h2 className="text-base font-semibold text-navy-900">Wat gebeurt er hierna?</h2>
              <ol className="mt-4 space-y-4">
                {stappen.slice(2, 6).map((stap) => (
                  <li key={stap.nummer} className="flex gap-3">
                    <span className="font-serif text-sm text-gold-600" aria-hidden="true">
                      {stap.nummer}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-navy-800">{stap.titel}</p>
                      <p className="mt-1 text-xs leading-relaxed text-navy-600">
                        {stap.beschrijving}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-navy-900 p-6">
              <h2 className="text-base font-semibold !text-white">Liever direct contact?</h2>
              <ul className="mt-4 space-y-3 text-sm text-navy-200">
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
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light mt-5 w-full text-xs"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                Stel uw vraag via WhatsApp
              </a>
            </div>

            <p className="text-xs leading-relaxed text-navy-500">
              Door dit formulier te versturen gaat u akkoord met onze{" "}
              <Link href="/privacyverklaring" className="underline decoration-gold-400">
                privacyverklaring
              </Link>{" "}
              en neemt u kennis van onze{" "}
              <Link href="/algemene-voorwaarden" className="underline decoration-gold-400">
                algemene voorwaarden
              </Link>
              .
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
