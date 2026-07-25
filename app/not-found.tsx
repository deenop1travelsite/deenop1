import Link from "next/link";
import { PijlIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Pagina niet gevonden</p>
      <h1 className="mt-4 text-titel-xl">Deze pagina bestaat niet</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-600">
        Mogelijk is de link verouderd of is de reis niet meer beschikbaar. Bekijk ons actuele aanbod
        of neem contact met ons op.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/umrah-reizen" className="btn-primary">
          Bekijk onze reizen
          <PijlIcon className="h-4 w-4" />
        </Link>
        <Link href="/contact" className="btn-outline">
          Neem contact op
        </Link>
      </div>
    </div>
  );
}
