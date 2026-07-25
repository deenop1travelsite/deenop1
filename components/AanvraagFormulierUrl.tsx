"use client";

import { useSearchParams } from "next/navigation";
import AanvraagFormulier from "@/components/AanvraagFormulier";

/**
 * Wrapper voor /aanvragen: leest de reis uit de URL (?reis=DO1-UMR-2610)
 * en geeft die als voorselectie door aan het formulier.
 * Moet binnen een <Suspense> staan.
 */
export default function AanvraagFormulierUrl() {
  const searchParams = useSearchParams();
  const reisUitUrl = searchParams.get("reis") ?? undefined;

  return <AanvraagFormulier voorgeselecteerdeReisId={reisUitUrl} />;
}
