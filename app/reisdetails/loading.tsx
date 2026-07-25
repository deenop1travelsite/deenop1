import { LaadMelding, SkeletPaginakop } from "@/components/Skelet";

export default function Laden() {
  return (
    <>
      <LaadMelding />
      <SkeletPaginakop />
      <section className="py-sectie">
        <div className="container-page space-y-3">
          <div className="skelet h-12 rounded-t-2xl" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skelet h-10" />
          ))}
        </div>
      </section>
    </>
  );
}
