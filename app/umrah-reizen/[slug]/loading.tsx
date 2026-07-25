import { LaadMelding, SkeletPaginakop, SkeletTekst } from "@/components/Skelet";

export default function Laden() {
  return (
    <>
      <LaadMelding />
      <SkeletPaginakop />
      <section className="py-sectie">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2 rounded-2xl border border-navy-100 p-4">
                  <div className="skelet h-2.5 w-24" />
                  <div className="skelet h-4 w-36" />
                </div>
              ))}
            </div>
            <SkeletTekst regels={4} />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="skelet h-56 rounded-2xl" />
              <div className="skelet h-56 rounded-2xl" />
            </div>
          </div>
          <div className="skelet h-80 rounded-2xl" />
        </div>
      </section>
    </>
  );
}
