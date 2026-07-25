/**
 * Achtergrond van de hero wanneer er (nog) geen eigen foto in public/ staat.
 *
 * Dit is een zelfgetekende, rustige voorstelling van de Ka'aba binnen de Haram:
 * donkerblauwe nachthemel, gouden gloed en silhouetten van de zuilengalerij.
 * Het is één SVG van enkele kilobytes, dus de pagina blijft razendsnel en de
 * afbeelding is op elk scherm haarscherp.
 *
 * Zodra public/hero-kaaba.jpg bestaat, gebruikt de hero automatisch die foto.
 */
export default function HeroAchtergrond() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hemel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080f22" />
          <stop offset="55%" stopColor="#0e1a38" />
          <stop offset="100%" stopColor="#16244a" />
        </linearGradient>

        <radialGradient id="gloed" cx="50%" cy="62%" r="42%">
          <stop offset="0%" stopColor="#dfab4c" stopOpacity="0.42" />
          <stop offset="45%" stopColor="#c9962f" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0e1a38" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="goudband" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a97724" />
          <stop offset="35%" stopColor="#e9c477" />
          <stop offset="65%" stopColor="#dfab4c" />
          <stop offset="100%" stopColor="#a97724" />
        </linearGradient>

        <linearGradient id="vloer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f3260" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#080f22" stopOpacity="1" />
        </linearGradient>

        {/* Eén boog van de zuilengalerij, links en rechts herhaald */}
        <symbol id="boog" viewBox="0 0 100 200">
          <path
            d="M6 200V70a44 44 0 0 1 88 0v130H74V72a24 24 0 0 0-48 0v128H6Z"
            fill="#0b1330"
          />
        </symbol>
      </defs>

      {/* Hemel en gloed */}
      <rect width="1600" height="900" fill="url(#hemel)" />
      <rect width="1600" height="900" fill="url(#gloed)" />

      {/* Sterren */}
      <g fill="#f3ddab" opacity="0.5">
        {[
          [140, 90, 1.6], [320, 150, 1.1], [480, 70, 1.3], [700, 130, 1], [880, 80, 1.5],
          [1080, 150, 1.2], [1260, 95, 1.4], [1440, 160, 1], [220, 240, 1], [1360, 260, 1.2],
          [60, 180, 1.1], [1540, 210, 1.3],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>

      {/* Zuilengalerij op de achtergrond */}
      <g opacity="0.85">
        {[0, 1, 2, 3, 4].map((i) => (
          <use key={`l${i}`} href="#boog" x={-20 + i * 104} y={470} width="100" height="200" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <use key={`r${i}`} href="#boog" x={1116 + i * 104} y={470} width="100" height="200" />
        ))}
      </g>

      {/* Minaretten */}
      <g fill="#0b1330" opacity="0.9">
        <path d="M300 470h26v200h-26zM306 430h14v40h-14zM313 404l12 26h-24l12-26Z" />
        <path d="M1274 470h26v200h-26zM1280 430h14v40h-14zM1287 404l12 26h-24l12-26Z" />
      </g>

      {/* Vloer van de mataf */}
      <rect y="640" width="1600" height="260" fill="url(#vloer)" />
      <g stroke="#3d5c96" strokeOpacity="0.25" strokeWidth="1.5" fill="none">
        {[680, 720, 770, 830].map((y) => (
          <ellipse key={y} cx="800" cy={y} rx={260 + (y - 680) * 3.4} ry={(y - 640) * 0.42} />
        ))}
      </g>

      {/* Ka'aba: het kubusvormige gebouw met de gouden band */}
      <g>
        <ellipse cx="800" cy="668" rx="190" ry="26" fill="#080f22" opacity="0.65" />
        <rect x="686" y="352" width="228" height="312" rx="4" fill="#05080f" />
        <rect x="686" y="352" width="228" height="312" rx="4" fill="#0b1330" opacity="0.55" />
        {/* Gouden band (kiswah) */}
        <rect x="686" y="432" width="228" height="30" fill="url(#goudband)" opacity="0.95" />
        <rect x="686" y="470" width="228" height="4" fill="#c9962f" opacity="0.55" />
        {/* Deur */}
        <rect x="856" y="486" width="40" height="120" rx="3" fill="url(#goudband)" opacity="0.85" />
        {/* Lichtrand */}
        <rect
          x="686"
          y="352"
          width="228"
          height="312"
          rx="4"
          fill="none"
          stroke="#dfab4c"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        />
      </g>

      {/* Zachte vignettering, zodat de tekst rustig leest */}
      <rect width="1600" height="900" fill="#080f22" opacity="0.12" />
    </svg>
  );
}
