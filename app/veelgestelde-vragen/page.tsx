import type { Metadata } from "next";
import { paginaMetadata } from "@/lib/metadata";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import FaqLijst from "@/components/FaqLijst";
import CtaBlok from "@/components/CtaBlok";
import JsonLd from "@/components/JsonLd";
import { veelgesteldeVragen } from "@/lib/data/inhoud";
import { faqSchema, kruimelSchema } from "@/lib/schema";

export const metadata: Metadata = paginaMetadata({
  titel: "Veelgestelde vragen",
  beschrijving:
    "Antwoorden op de meest gestelde vragen over onze Umrah-reizen, de aanvraagprocedure, de prijzen, het visum en de begeleiding.",
  pad: "/veelgestelde-vragen",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Veelgestelde vragen"
        titel="Antwoorden op uw vragen"
        intro="Hieronder vindt u de vragen die wij het meest ontvangen. Staat uw vraag er niet bij, neem dan gerust contact met ons op."
        kruimels={[{ label: "Home", href: "/" }, { label: "Veelgestelde vragen" }]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqLijst vragen={veelgesteldeVragen} eersteOpen />
        </div>
      </Section>

      <CtaBlok
        titel="Uw vraag staat er niet bij?"
        tekst="Stel uw vraag via WhatsApp of het contactformulier. Wij reageren binnen twee werkdagen, meestal sneller."
      />

      <JsonLd
        data={[
          faqSchema(veelgesteldeVragen),
          kruimelSchema([
            { naam: "Home", pad: "/" },
            { naam: "Veelgestelde vragen", pad: "/veelgestelde-vragen" },
          ]),
        ]}
      />
    </>
  );
}
