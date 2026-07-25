import type { ReactNode } from "react";

type VeldProps = {
  id: string;
  label: string;
  fout?: string;
  verplicht?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Label, hulptekst en foutmelding rond één formulierveld.
 *
 * Bij een fout krijgt het invoerveld automatisch een rode rand: die klassen
 * staan op de omhullende div, zodat de formulieren zelf niets hoeven te weten
 * van foutopmaak. De foutmelding heeft een vaste id, waarnaar het invoerveld
 * met aria-describedby verwijst.
 */
export default function FormulierVeld({
  id,
  label,
  fout,
  verplicht,
  hint,
  children,
  className = "",
}: VeldProps) {
  const foutStijl = fout
    ? "[&_input]:border-red-400 [&_select]:border-red-400 [&_textarea]:border-red-400"
    : "";

  return (
    <div className={`${className} ${foutStijl}`}>
      <label htmlFor={id} className="label-field">
        {label}
        {verplicht && (
          <>
            <span aria-hidden="true" className="ml-1 text-gold-700">
              *
            </span>
            <span className="sr-only"> (verplicht)</span>
          </>
        )}
      </label>
      {children}
      {hint && !fout && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-navy-500">
          {hint}
        </p>
      )}
      {fout && (
        <p id={`${id}-fout`} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
          {fout}
        </p>
      )}
    </div>
  );
}
