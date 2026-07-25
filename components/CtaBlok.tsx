import Link from "next/link";
import { PijlIcon, WhatsAppIcon } from "@/components/Icons";
import { whatsappLink } from "@/lib/site";

type CtaBlokProps = {
  titel?: string;
  tekst?: string;
};

export default function CtaBlok({
  titel = "Nog vragen over een reis?",
  tekst = "Wij denken graag met u mee over de periode, de kamerindeling en de begeleiding. Een aanvraag of bericht verplicht u tot niets.",
}: CtaBlokProps) {
  return (
    <section className="bg-white pb-4">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 sm:px-10 lg:px-14">
          <div className="pattern-arabesque absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-titel-lg !text-white">{titel}</h2>
              <p className="mt-4 text-sm leading-relaxed text-navy-200 sm:text-base">{tekst}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Neem contact op
                <PijlIcon className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
