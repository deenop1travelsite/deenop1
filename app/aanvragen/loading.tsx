import { LaadMelding, SkeletPaginakop, SkeletTekst } from "@/components/Skelet";

export default function Laden() {
  return (
    <>
      <LaadMelding />
      <SkeletPaginakop />
      <section className="py-sectie">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card space-y-6 p-6 sm:p-8">
            <div className="skelet h-20 rounded-2xl" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="skelet h-3 w-32" />
                <div className="skelet h-12 rounded-xl" />
              </div>
            ))}
            <div className="skelet h-12 w-56 rounded-full" />
          </div>
          <div className="space-y-6">
            <div className="skelet h-44 rounded-2xl" />
            <div className="card space-y-4 p-6">
              <SkeletTekst regels={5} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
