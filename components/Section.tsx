import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  titel?: string;
  intro?: string;
  children: ReactNode;
  variant?: "wit" | "grijs" | "donker";
  gecentreerd?: boolean;
  className?: string;
};

const achtergrond = {
  wit: "bg-white",
  grijs: "bg-navy-50",
  donker: "bg-navy-900 text-navy-100",
} as const;

/**
 * Standaardsectie met een vast verticaal ritme (spacing-token "sectie")
 * en een kop die op elke pagina hetzelfde oogt.
 */
export default function Section({
  id,
  eyebrow,
  titel,
  intro,
  children,
  variant = "wit",
  gecentreerd = false,
  className = "",
}: SectionProps) {
  const isDonker = variant === "donker";

  return (
    <section id={id} className={`${achtergrond[variant]} py-sectie ${className}`}>
      <div className="container-page">
        {(eyebrow || titel || intro) && (
          <header
            className={`mb-10 max-w-2xl sm:mb-12 ${gecentreerd ? "mx-auto text-center" : ""}`}
          >
            {eyebrow && (
              <p className={isDonker ? "eyebrow-licht mb-3" : "eyebrow mb-3"}>{eyebrow}</p>
            )}
            {titel && <h2 className={`text-titel-lg ${isDonker ? "!text-white" : ""}`}>{titel}</h2>}
            {intro && (
              <p
                className={`mt-4 max-w-lees text-base leading-relaxed ${
                  isDonker ? "text-navy-200" : "text-navy-600"
                } ${gecentreerd ? "mx-auto" : ""}`}
              >
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
