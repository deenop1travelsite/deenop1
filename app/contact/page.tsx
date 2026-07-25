import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Notitie from "@/components/Notitie";
import ContactFormulier from "@/components/ContactFormulier";
import { site, whatsappLink } from "@/lib/site";
import { KlokIcon, LocatieIcon, MailIcon, TelefoonIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = paginaMetadata({
  titel: "Contact",
  beschrijving:
    "Neem contact op met Deen op 1 Travel via telefoon, WhatsApp, e-mail of het contactformulier. Wij reageren binnen twee werkdagen.",
  pad: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        titel="Wij horen graag van u"
        intro="Heeft u een vraag over een reis, de begeleiding of de aanvraagprocedure? Neem gerust contact met ons op. Wij reageren binnen twee werkdagen."
        kruimels={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-navy-900">Contactgegevens</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <TelefoonIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-navy-500">Telefoon</p>
                    <a
                      href={`tel:${site.contact.telefoon.replace(/\s/g, "")}`}
                      className="font-medium text-navy-800 hover:text-navy-950"
                    >
                      {site.contact.telefoon}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-navy-500">WhatsApp</p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-navy-800 hover:text-navy-950"
                    >
                      Start een gesprek
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-navy-500">E-mail</p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-medium text-navy-800 hover:text-navy-950"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <LocatieIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-navy-500">Adres</p>
                    <p className="font-medium text-navy-800">
                      {site.contact.adres.straat}
                      <br />
                      {site.contact.adres.postcode} {site.contact.adres.plaats}
                      <br />
                      {site.contact.adres.land}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2.5">
                <KlokIcon className="h-5 w-5 text-gold-600" />
                <h2 className="text-lg font-semibold text-navy-900">Openingstijden</h2>
              </div>
              <dl className="mt-4 space-y-2.5 text-sm">
                {site.contact.openingstijden.map((rij) => (
                  <div key={rij.dagen} className="flex justify-between gap-4">
                    <dt className="text-navy-600">{rij.dagen}</dt>
                    <dd className="font-medium text-navy-800">{rij.tijden}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Notitie titel="Geen betalingen via de website">
              Wij vragen nooit om betaalgegevens of paspoortgegevens via het contactformulier of via
              WhatsApp. Ontvangt u zo'n verzoek, neem dan direct telefonisch contact met ons op.
            </Notitie>
          </div>

          <div>
            <div className="card p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-navy-900">Stuur ons een bericht</h2>
              <p className="mt-2 text-sm text-navy-600">
                Vul het formulier in en wij nemen binnen twee werkdagen contact met u op. Wilt u
                informatie over een specifieke reis? Gebruik dan het aanvraagformulier bij de reis.
              </p>
              <div className="mt-7">
                <ContactFormulier />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
