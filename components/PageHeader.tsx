import Link from "next/link";

type Kruimel = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  eyebrow?: string;
  titel: string;
  intro?: string;
  kruimels?: Kruimel[];
};

/** Donkerblauwe paginakop met kruimelpad, gebruikt op alle onderpagina's. */
export default function PageHeader({ eyebrow, titel, intro, kruimels }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-navy-900">
      <div className="pattern-arabesque absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 opacity-90"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 top-1/2 hidden h-96 w-96 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl lg:block"
        aria-hidden="true"
      />

      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        {kruimels && kruimels.length > 0 && (
          <nav aria-label="Kruimelpad" className="mb-5">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-navy-300">
              {kruimels.map((kruimel, i) => (
                <li key={kruimel.label} className="flex items-center gap-2">
                  {kruimel.href ? (
                    <Link
                      href={kruimel.href}
                      className="rounded-sm transition-colors hover:text-gold-400"
                    >
                      {kruimel.label}
                    </Link>
                  ) : (
                    <span className="text-navy-100" aria-current="page">
                      {kruimel.label}
                    </span>
                  )}
                  {i < kruimels.length - 1 && (
                    <span aria-hidden="true" className="text-navy-500">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow-licht mb-3 animate-fade-in">{eyebrow}</p>}
        <h1 className="max-w-3xl animate-fade-up text-titel-xl !text-white">{titel}</h1>
        {intro && (
          <p className="mt-5 max-w-lees animate-fade-up text-base leading-relaxed text-navy-200 vertraag-1 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
