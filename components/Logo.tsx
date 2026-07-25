import Image from "next/image";
import Link from "next/link";
import { logo } from "@/lib/logo";
import { site } from "@/lib/site";

type LogoProps = {
  /**
   * "opWit"    – voor lichte achtergronden, zoals de header. Het logo staat dan op een
   *              donkerblauw vlak, omdat de woordmerktekst in het logo wit is.
   * "opDonker" – voor donkere achtergronden, zoals de footer. Het logo staat dan
   *              rechtstreeks op de achtergrond.
   */
  variant?: "opWit" | "opDonker";
  /** Aanzetten voor het logo boven de vouw (de header), zodat het direct laadt. */
  priority?: boolean;
  /**
   * Alleen voor variant "opWit": zet het donkerblauwe vlak achter het logo uit
   * op telefoons. Gebruikt op de homepage, waar de header over de donkere
   * hero-foto ligt en het logo dus rechtstreeks op de foto staat.
   */
  tegelOpMobiel?: boolean;
};

/**
 * Het logo van Deen op 1 Travel.
 * De afmetingen komen uit lib/logo.ts, zodat next/image de originele
 * beeldverhouding aanhoudt en er geen vervorming kan optreden.
 */
export default function Logo({
  variant = "opWit",
  priority = false,
  tegelOpMobiel = true,
}: LogoProps) {
  const opDonker = variant === "opDonker";
  const tegel = tegelOpMobiel
    ? "bg-navy-950 px-3 py-2 ring-1 ring-inset ring-gold-400/25"
    : "max-md:bg-transparent max-md:p-0 max-md:ring-0 md:bg-navy-950 md:px-3 md:py-2 md:ring-1 md:ring-inset md:ring-gold-400/25";

  return (
    <Link
      href="/"
      aria-label={`${site.naam} – naar de homepage`}
      className="inline-flex shrink-0 items-center rounded-xl"
    >
      {opDonker ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.breedte}
          height={logo.hoogte}
          priority={priority}
          sizes="(max-width: 640px) 64px, 80px"
          className="h-14 w-auto sm:h-16"
        />
      ) : (
        <span
          className={`flex items-center justify-center rounded-xl transition-shadow hover:shadow-card ${tegel}`}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.breedte}
            height={logo.hoogte}
            priority={priority}
            sizes="(max-width: 640px) 64px, 80px"
            /* Ongeveer 30% groter dan voorheen (was 40 en 48 px hoog) */
            className="h-[52px] w-auto sm:h-[62px]"
          />
        </span>
      )}
    </Link>
  );
}
