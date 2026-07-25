import type { Stap } from "@/lib/types";

type StappenLijstProps = {
  stappen: Stap[];
  variant?: "licht" | "donker";
};

export default function StappenLijst({ stappen, variant = "licht" }: StappenLijstProps) {
  const isDonker = variant === "donker";

  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stappen.map((stap) => (
        <li
          key={stap.nummer}
          className={`relative rounded-2xl border p-6 ${
            isDonker
              ? "border-white/10 bg-white/[0.04]"
              : "border-navy-100 bg-white shadow-card"
          }`}
        >
          <span
            className={`font-serif text-2xl ${isDonker ? "text-gold-400" : "text-gold-500"}`}
            aria-hidden="true"
          >
            {stap.nummer}
          </span>
          <h3
            className={`mt-3 text-base font-semibold ${isDonker ? "!text-white" : "text-navy-900"}`}
          >
            {stap.titel}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              isDonker ? "text-navy-200" : "text-navy-600"
            }`}
          >
            {stap.beschrijving}
          </p>
        </li>
      ))}
    </ol>
  );
}
