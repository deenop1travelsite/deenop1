/**
 * Skeletweergaven die Next.js toont tijdens het laden van een pagina.
 * Ze houden dezelfde vorm aan als de echte inhoud, zodat de overgang rustig
 * oogt en er geen sprong ontstaat wanneer de pagina binnenkomt.
 */

export function SkeletPaginakop() {
  return (
    <div className="relative overflow-hidden bg-navy-900" aria-hidden="true">
      <div className="pattern-arabesque absolute inset-0 opacity-70" />
      <div className="container-page relative space-y-4 py-14 sm:py-16 lg:py-20">
        <div className="h-3 w-40 rounded-full bg-white/10" />
        <div className="h-9 w-3/4 max-w-2xl rounded-lg bg-white/15" />
        <div className="h-4 w-full max-w-xl rounded-full bg-white/10" />
        <div className="h-4 w-2/3 max-w-md rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export function SkeletKaart() {
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <div className="space-y-3 bg-navy-900 px-6 py-7">
        <div className="h-2.5 w-24 rounded-full bg-white/10" />
        <div className="h-5 w-48 rounded-lg bg-white/15" />
        <div className="h-3 w-56 rounded-full bg-white/10" />
      </div>
      <div className="space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="skelet h-2.5 w-20" />
              <div className="skelet h-3.5 w-32" />
            </div>
          ))}
        </div>
        <div className="skelet h-3 w-full" />
        <div className="skelet h-3 w-4/5" />
        <div className="flex items-end justify-between border-t border-navy-100 pt-5">
          <div className="space-y-2">
            <div className="skelet h-2.5 w-16" />
            <div className="skelet h-6 w-24" />
          </div>
          <div className="skelet h-9 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletTekst({ regels = 3 }: { regels?: number }) {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: regels }).map((_, i) => (
        <div key={i} className={`skelet h-3.5 ${i === regels - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

/** Melding voor schermlezers dat er geladen wordt. */
export function LaadMelding() {
  return (
    <p role="status" aria-live="polite" className="sr-only">
      De pagina wordt geladen.
    </p>
  );
}
