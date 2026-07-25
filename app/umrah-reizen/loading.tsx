import { LaadMelding, SkeletKaart, SkeletPaginakop } from "@/components/Skelet";

export default function Laden() {
  return (
    <>
      <LaadMelding />
      <SkeletPaginakop />
      <section className="py-sectie">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <SkeletKaart />
          <SkeletKaart />
        </div>
      </section>
    </>
  );
}
