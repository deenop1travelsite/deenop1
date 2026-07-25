import type { Metadata } from "next";
import { site } from "@/lib/site";

type PaginaMeta = {
  titel: string;
  beschrijving: string;
  /** Pad zonder domeinnaam, bijvoorbeeld "/umrah-reizen" */
  pad: string;
  /** Zet op false voor pagina's die niet in Google horen, zoals het aanvraagformulier */
  indexeren?: boolean;
};

/**
 * Stelt de metadata van een pagina samen: titel, omschrijving, canonieke URL,
 * Open Graph (WhatsApp, Facebook, LinkedIn) en Twitter-kaart.
 * De deelafbeelding komt uit app/opengraph-image.png en wordt automatisch
 * door Next.js toegevoegd.
 */
export function paginaMetadata({
  titel,
  beschrijving,
  pad,
  indexeren = true,
}: PaginaMeta): Metadata {
  const volledigeTitel = `${titel} | ${site.naam}`;

  return {
    title: titel,
    description: beschrijving,
    alternates: { canonical: pad },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: site.naam,
      url: pad,
      title: volledigeTitel,
      description: beschrijving,
    },
    twitter: {
      card: "summary_large_image",
      title: volledigeTitel,
      description: beschrijving,
    },
    robots: indexeren
      ? { index: true, follow: true }
      : { index: false, follow: true, nocache: true },
  };
}
