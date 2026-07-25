type BeschikbaarheidProps = {
  beschikbaar: number;
  totaal: number;
};

export default function Beschikbaarheid({ beschikbaar, totaal }: BeschikbaarheidProps) {
  const bezet = Math.max(totaal - beschikbaar, 0);
  const percentage = totaal > 0 ? Math.round((bezet / totaal) * 100) : 0;
  const bijnaVol = beschikbaar <= 10;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-xs">
        <span className="font-medium text-navy-700">
          {beschikbaar} van {totaal} plaatsen beschikbaar
        </span>
        <span className={bijnaVol ? "font-medium text-gold-700" : "text-navy-500"}>
          {bijnaVol ? "Bijna vol" : `${percentage}% bezet`}
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-navy-100"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage} procent van de plaatsen is bezet`}
      >
        <div
          className={`h-full rounded-full ${bijnaVol ? "bg-gold-500" : "bg-navy-600"}`}
          style={{ width: `${Math.max(percentage, 4)}%` }}
        />
      </div>
    </div>
  );
}
