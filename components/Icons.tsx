/**
 * Iconenset van de website.
 *
 * Alle iconen staan op hetzelfde raster: viewBox 24 × 24, lijndikte 1.75,
 * ronde uiteinden en hoeken, en `currentColor`, zodat ze overal dezelfde
 * optische zwaarte hebben en de tekstkleur volgen.
 *
 * Iconen zijn decoratief: ze krijgen `aria-hidden` en `focusable="false"`,
 * zodat schermlezers ze overslaan. De betekenis staat in de tekst ernaast
 * of in een aria-label op het omliggende element.
 */

type IconProps = {
  className?: string;
};

const standaard = "h-5 w-5";

/** Gedeelde eigenschappen van de lijniconen. */
const lijn = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

/** Gedeelde eigenschappen van de gevulde iconen. */
const vlak = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: "false" as const,
};

export function KaabaIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M12 2.75 4.5 6.5v11L12 21.25l7.5-3.75v-11L12 2.75Z" />
      <path d="M4.5 6.5 12 10.25 19.5 6.5M12 10.25v11" />
      <path d="M4.5 10h15" />
    </svg>
  );
}

export function MoskeeIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M12 3.25c1.9 1.7 2.85 3.2 2.85 4.75 0 1.35-.95 2.3-2.85 2.85-1.9-.55-2.85-1.5-2.85-2.85 0-1.55.95-3.05 2.85-4.75Z" />
      <path d="M5 20.75v-6.5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6.5" />
      <path d="M3 20.75h18M10 20.75v-3.5a2 2 0 1 1 4 0v3.5" />
    </svg>
  );
}

export function GebouwIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M4.5 20.75V6.75L12 3.25l7.5 3.5v14" />
      <path d="M2.75 20.75h18.5M9 10h1.5M13.5 10H15M9 14h1.5M13.5 14H15" />
      <path d="M10 20.75v-3.25h4v3.25" />
    </svg>
  );
}

export function DocumentIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M13.75 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8.25L13.75 3Z" />
      <path d="M13.5 3.25V8.5h5.25M9 13h6M9 16.5h4" />
    </svg>
  );
}

export function TelefoonIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M4.25 5.25c0-1.1.9-2 2-2h1.4c.87 0 1.63.56 1.89 1.39l.63 2.03c.22.72-.02 1.5-.6 1.97l-.92.74a11.2 11.2 0 0 0 4.22 4.22l.74-.92c.47-.58 1.25-.82 1.97-.6l2.03.63c.83.26 1.39 1.02 1.39 1.89v1.4c0 1.1-.9 2-2 2A15.75 15.75 0 0 1 4.25 5.25Z" />
    </svg>
  );
}

export function GroepIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <circle cx="9.25" cy="8" r="3.25" />
      <path d="M3.5 19.75a5.75 5.75 0 0 1 11.5 0" />
      <path d="M16.25 5.1a3.25 3.25 0 0 1 0 5.8M17.5 19.75a7.2 7.2 0 0 0-1.4-4.25" />
    </svg>
  );
}

export function VinkjeIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} strokeWidth={2.1} className={className}>
      <path d="m4.75 12.5 4.5 4.5 10-10" />
    </svg>
  );
}

export function VinkCirkelIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="m8.5 12.25 2.5 2.5 4.5-5" strokeWidth={2} />
    </svg>
  );
}

export function KruisIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} strokeWidth={2} className={className}>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </svg>
  );
}

export function KalenderIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <rect x="3.75" y="5" width="16.5" height="15.25" rx="2.5" />
      <path d="M3.75 9.75h16.5M8.25 3.25v3.5M15.75 3.25v3.5" />
    </svg>
  );
}

export function VliegtuigIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M10.5 13.5 3 11.25l17-6.5-6 17-2.25-7.25Z" />
      <path d="m10.5 13.5 3.25-3.25" />
    </svg>
  );
}

export function KlokIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 7.25V12l3 1.75" />
    </svg>
  );
}

export function LocatieIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M12 21s6.75-5.6 6.75-10.25a6.75 6.75 0 1 0-13.5 0C5.25 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  );
}

export function MailIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="2.5" />
      <path d="m3.75 7.25 7.1 5.1a2 2 0 0 0 2.3 0l7.1-5.1" />
    </svg>
  );
}

export function WhatsAppIcon({ className = standaard }: IconProps) {
  return (
    <svg {...vlak} className={className}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.93L2 22l5.37-1.48a9.83 9.83 0 0 0 4.67 1.19h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm5.78 13.9c-.24.68-1.4 1.31-1.93 1.36-.52.05-1.01.24-3.4-.71-2.9-1.14-4.7-4.14-4.84-4.33-.14-.19-1.13-1.5-1.13-2.87 0-1.36.71-2.03.97-2.31.24-.26.53-.33.71-.33h.5c.16 0 .38-.06.58.45.21.52.72 1.79.78 1.92.06.13.1.28.01.45-.09.19-.14.3-.28.47-.14.16-.29.36-.42.48-.14.14-.29.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function ShieldIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M12 21s6.75-2.9 6.75-8.75V5.75L12 3.25 5.25 5.75v6.5C5.25 18.1 12 21 12 21Z" />
      <path d="m9.25 11.75 2 2 3.5-3.75" strokeWidth={2} />
    </svg>
  );
}

export function InfoIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 11v5.25M12 7.6v.4" />
    </svg>
  );
}

export function PijlIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} strokeWidth={2} className={className}>
      <path d="M4.75 12h14.5m-5.75-5.75L19.25 12l-5.75 5.75" />
    </svg>
  );
}

export function MenuIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} strokeWidth={1.9} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SluitIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} strokeWidth={1.9} className={className}>
      <path d="M6.25 6.25l11.5 11.5M17.75 6.25 6.25 17.75" />
    </svg>
  );
}

export function PlusIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} strokeWidth={2} className={className}>
      <path d="M12 5.25v13.5M5.25 12h13.5" />
    </svg>
  );
}

export function SterIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg {...vlak} className={className}>
      <path d="m12 3.5 2.6 5.27 5.82.85-4.21 4.1.99 5.78L12 16.77l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85L12 3.5Z" />
    </svg>
  );
}

export function BedIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <path d="M3.25 19V7.5M3.25 12.5h17.5V19M20.75 15.5H3.25" />
      <path d="M7.5 12.5v-2a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v2" />
    </svg>
  );
}

export function KompasIcon({ className = standaard }: IconProps) {
  return (
    <svg {...lijn} className={className}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="m14.75 9.25-1.5 4-4 1.5 1.5-4 4-1.5Z" />
    </svg>
  );
}

/** Iconen bij de voordelen op de homepage en de pagina Over ons. */
export const iconMap = {
  begeleiding: GroepIcon,
  hotel: GebouwIcon,
  document: DocumentIcon,
  contact: TelefoonIcon,
  groep: MoskeeIcon,
  voorbereiding: ShieldIcon,
} as const;

export type IconNaam = keyof typeof iconMap;
