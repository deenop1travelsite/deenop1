import type { ReactNode } from "react";
import { InfoIcon } from "@/components/Icons";

type NotitieProps = {
  titel?: string;
  children: ReactNode;
  variant?: "info" | "nadruk";
};

/** Melding, o.a. gebruikt om aan te geven dat een aanvraag geen boeking is. */
export default function Notitie({ titel, children, variant = "info" }: NotitieProps) {
  const stijl =
    variant === "nadruk"
      ? "border-gold-300 bg-gold-50 text-navy-800"
      : "border-navy-200 bg-navy-50 text-navy-700";

  return (
    <div className={`flex gap-3 rounded-2xl border p-5 ${stijl}`} role="note">
      <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
      <div className="text-sm leading-relaxed">
        {titel && <p className="mb-1 font-semibold text-navy-900">{titel}</p>}
        {children}
      </div>
    </div>
  );
}
