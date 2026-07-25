import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/Icons";

/**
 * Zwevende WhatsApp-knop, zichtbaar op alle pagina's.
 * Op mobiel alleen het icoon, op grotere schermen met tekst erbij.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stel uw vraag via WhatsApp, opent in een nieuw venster"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366]
                 px-4 py-3.5 text-sm font-semibold text-white shadow-lift outline-offset-4
                 transition-all duration-300 ease-zacht hover:-translate-y-0.5 hover:bg-[#1fbe5a]
                 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-40 blur-md transition-opacity group-hover:opacity-60" aria-hidden="true" />
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Vraag via WhatsApp</span>
    </a>
  );
}
