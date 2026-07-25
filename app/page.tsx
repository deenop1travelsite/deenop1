import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import VoordelenGrid from "@/components/VoordelenGrid";
import ReisKaart from "@/components/ReisKaart";
import StappenLijst from "@/components/StappenLijst";
import FaqLijst from "@/components/FaqLijst";
import CtaBlok from "@/components/CtaBlok";
import Notitie from "@/components/Notitie";
import JsonLd from "@/components/JsonLd";
import { reizen } from "@/lib/data/reizen";
import { begeleidingPunten, stappen, veelgesteldeVragen, voordelen } from "@/lib/data/inhoud";
import { faqSchema } from "@/lib/schema";
import { PijlIcon, VinkjeIcon, WhatsAppIcon } from "@/components/Icons";
import { whatsappLink } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        eyebrow="Waarom Deen op 1 Travel"
        titel="Een Umrah die goed geregeld is, van begin tot eind"
        intro="Wij nemen de organisatie van u over en zorgen voor duidelijkheid in elke stap. Dit is wat onze reizigers van ons kunnen verwachten."
      >
        <VoordelenGrid voordelen={voordelen} />
      </Section>

      <Section
        id="reizen"
        variant="grijs"
        eyebrow="Aankomende Umrah-pakketten"
        titel="Onze aankomende reizen naar Mekka en Medina"
        intro="Hieronder vindt u onze aankomende Umrah-pakketten. Alle vermelde gegevens zijn voorbeelden en onder voorbehoud van beschikbaarheid."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {reizen.map((reis, i) => (
            <ReisKaart key={reis.id} reis={reis} positie={i} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/umrah-reizen" className="btn-secondary">
            Bekijk alle reizen en details
            <PijlIcon className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Van aanvraag tot vertrek"
        titel="Zo verloopt het traject in zes stappen"
        intro="U vraagt eerst vrijblijvend informatie aan. Pas na persoonlijk contact en uw schriftelijke akkoord wordt uw plaats definitief vastgelegd."
      >
        <StappenLijst stappen={stappen} />
        <div className="mt-8 max-w-3xl">
          <Notitie titel="Een aanvraag is nog geen boeking" variant="nadruk">
            Via deze website kunt u niet betalen en kunt u nog niet definitief boeken. Uw aanvraag
            is een informatieverzoek. Wij nemen persoonlijk contact met u op en sturen daarna een
            voorstel dat u rustig kunt nalezen.
          </Notitie>
        </div>
      </Section>

      <Section
        variant="donker"
        eyebrow="Begeleiding"
        titel="U staat er tijdens de Umrah nooit alleen voor"
        intro="Onze begeleiders reizen met de groep mee en kennen de gang van zaken in Mekka en Medina. Zij leggen de rituelen in het Nederlands uit en zijn dag en nacht bereikbaar."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {begeleidingPunten.map((punt) => (
            <div key={punt.titel} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-2.5">
                <VinkjeIcon className="h-4 w-4 shrink-0 text-gold-400" />
                <h3 className="text-base font-semibold !text-white">{punt.titel}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-200">{punt.beschrijving}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/werkwijze" className="btn-primary">
            Lees onze werkwijze
            <PijlIcon className="h-4 w-4" />
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            Stel uw vraag via WhatsApp
          </a>
        </div>
      </Section>

      <Section
        variant="grijs"
        eyebrow="Veelgestelde vragen"
        titel="De vragen die wij het meest krijgen"
        intro="Staat uw vraag er niet bij? Neem gerust contact met ons op, wij helpen u graag verder."
      >
        <div className="mx-auto max-w-3xl">
          <FaqLijst vragen={veelgesteldeVragen.slice(0, 6)} eersteOpen />
          <div className="mt-8 flex justify-center">
            <Link href="/veelgestelde-vragen" className="btn-outline">
              Alle veelgestelde vragen
              <PijlIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBlok />

      <JsonLd data={faqSchema(veelgesteldeVragen.slice(0, 6))} />
    </>
  );
}
