import type { Vraag } from "@/lib/types";
import { PlusIcon } from "@/components/Icons";

type FaqLijstProps = {
  vragen: Vraag[];
  /** Laat de eerste vraag standaard geopend zien */
  eersteOpen?: boolean;
};

/**
 * Uitklapbare vragenlijst op basis van <details>, zodat de inhoud ook zonder
 * JavaScript werkt en volledig met het toetsenbord te bedienen is.
 */
export default function FaqLijst({ vragen, eersteOpen = false }: FaqLijstProps) {
  return (
    <div className="divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
      {vragen.map((item, index) => (
        <details
          key={item.vraag}
          className="group px-5 transition-colors duration-200 open:bg-navy-50/40 hover:bg-navy-50/60 sm:px-6"
          open={eersteOpen && index === 0}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-[15px] font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
            <span className="text-balance">{item.vraag}</span>
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-200
                         text-navy-600 transition-all duration-300 ease-zacht
                         group-hover:border-gold-400 group-hover:text-gold-700 group-open:rotate-45"
              aria-hidden="true"
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </span>
          </summary>
          <p className="animate-fade-in pb-5 pr-10 text-sm leading-relaxed text-navy-600">
            {item.antwoord}
          </p>
        </details>
      ))}
    </div>
  );
}
