const datumFormatter = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const kortDatumFormatter = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "short",
});

const prijsFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatDatum(iso: string): string {
  return datumFormatter.format(new Date(`${iso}T12:00:00Z`));
}

export function formatKorteDatum(iso: string): string {
  return kortDatumFormatter.format(new Date(`${iso}T12:00:00Z`));
}

export function formatPeriode(vanIso: string, totIso: string): string {
  return `${formatKorteDatum(vanIso)} t/m ${formatDatum(totIso)}`;
}

export function formatPrijs(bedrag: number): string {
  return prijsFormatter.format(bedrag);
}
