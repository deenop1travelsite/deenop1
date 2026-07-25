import { iconMap, type IconNaam } from "@/components/Icons";

type Voordeel = {
  titel: string;
  beschrijving: string;
  icoon: IconNaam;
};

export default function VoordelenGrid({ voordelen }: { voordelen: readonly Voordeel[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {voordelen.map((voordeel) => {
        const Icoon = iconMap[voordeel.icoon];
        return (
          <li key={voordeel.titel} className="card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
              <Icoon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-navy-900">{voordeel.titel}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">{voordeel.beschrijving}</p>
          </li>
        );
      })}
    </ul>
  );
}
