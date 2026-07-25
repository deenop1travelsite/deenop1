"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import FormulierVeld from "@/components/FormulierVeld";
import { reizen } from "@/lib/data/reizen";
import { formatDatum, formatPrijs } from "@/lib/format";
import {
  contactVoorkeuren,
  heeftFouten,
  kamerindelingen,
  reisgezelschappen,
  valideerAanvraag,
  type AanvraagPayload,
  type Fouten,
} from "@/lib/aanvraag";
import type { Reis } from "@/lib/types";
import { InfoIcon, PijlIcon } from "@/components/Icons";

type Status = "invullen" | "versturen" | "fout";

type FormulierState = {
  reisId: string;
  volledigeNaam: string;
  email: string;
  telefoon: string;
  woonplaats: string;
  aantalVolwassenen: string;
  aantalKinderen: string;
  leeftijdenKinderen: string;
  kamerindeling: string;
  reisgezelschap: string;
  contactVoorkeur: string;
  opmerkingen: string;
  akkoordPrivacy: boolean;
  /** Onzichtbaar veld tegen spam; moet leeg blijven */
  vangnet: string;
};

const leegFormulier: FormulierState = {
  reisId: "",
  volledigeNaam: "",
  email: "",
  telefoon: "",
  woonplaats: "",
  aantalVolwassenen: "1",
  aantalKinderen: "0",
  leeftijdenKinderen: "",
  kamerindeling: kamerindelingen[0],
  reisgezelschap: reisgezelschappen[0],
  contactVoorkeur: contactVoorkeuren[0],
  opmerkingen: "",
  akkoordPrivacy: false,
  vangnet: "",
};

export const vrijblijvendeMelding =
  "Dit formulier is een vrijblijvende aanvraag en geen definitieve boeking. Na ontvangst nemen wij persoonlijk contact met u op om beschikbaarheid, wensen en vervolgstappen te bespreken.";

type Props = {
  /** Wanneer meegegeven staat de reis vast en is er geen keuzelijst. */
  vasteReis?: Reis;
  /** Voorselectie uit de URL, bijvoorbeeld ?reis=DO1-UMR-2610 */
  voorgeselecteerdeReisId?: string;
};

export default function AanvraagFormulier({ vasteReis, voorgeselecteerdeReisId }: Props) {
  const router = useRouter();

  const beginReisId =
    vasteReis?.id ??
    (reizen.some((r) => r.id === voorgeselecteerdeReisId) ? voorgeselecteerdeReisId! : "");

  const [formulier, setFormulier] = useState<FormulierState>({
    ...leegFormulier,
    reisId: beginReisId,
  });
  const [fouten, setFouten] = useState<Fouten>({});
  const [status, setStatus] = useState<Status>("invullen");
  const [serverFout, setServerFout] = useState<string | null>(null);
  const startTijd = useRef<number>(0);
  const foutOverzicht = useRef<HTMLDivElement | null>(null);

  // Tijdstip waarop het formulier is geopend; gebruikt om bots te weren.
  useEffect(() => {
    startTijd.current = Date.now();
  }, []);

  const gekozenReis = useMemo(
    () => vasteReis ?? reizen.find((r) => r.id === formulier.reisId),
    [vasteReis, formulier.reisId],
  );

  const aantalKinderen = Number(formulier.aantalKinderen || "0");
  const heeftKinderen = Number.isFinite(aantalKinderen) && aantalKinderen > 0;

  function update<K extends keyof FormulierState>(veld: K, waarde: FormulierState[K]) {
    setFormulier((vorig) => ({ ...vorig, [veld]: waarde }) as FormulierState);
    setFouten((vorig) => {
      const nieuw = { ...vorig };
      delete nieuw[veld as keyof Fouten];
      return nieuw;
    });
  }

  const foutenLijst = Object.entries(fouten).filter(([, melding]) => Boolean(melding));

  async function verstuur(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerFout(null);

    const payload: AanvraagPayload = {
      type: "reis",
      reisId: formulier.reisId,
      volledigeNaam: formulier.volledigeNaam,
      email: formulier.email,
      telefoon: formulier.telefoon,
      woonplaats: formulier.woonplaats,
      aantalVolwassenen: formulier.aantalVolwassenen,
      aantalKinderen: formulier.aantalKinderen,
      leeftijdenKinderen: heeftKinderen ? formulier.leeftijdenKinderen : "",
      kamerindeling: formulier.kamerindeling,
      reisgezelschap: formulier.reisgezelschap,
      contactVoorkeur: formulier.contactVoorkeur,
      opmerkingen: formulier.opmerkingen,
      akkoordPrivacy: formulier.akkoordPrivacy,
      vangnet: formulier.vangnet,
      startTijd: startTijd.current,
    };

    const gevonden = valideerAanvraag(payload);
    if (heeftFouten(gevonden)) {
      setFouten(gevonden);
      setStatus("invullen");
      // Zet de focus op het overzicht met foutmeldingen
      requestAnimationFrame(() => foutOverzicht.current?.focus());
      return;
    }

    setStatus("versturen");
    try {
      const response = await fetch("/api/aanvraag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; referentie?: string; fouten?: Fouten; melding?: string }
        | null;

      if (!response.ok || !data?.ok) {
        if (data?.fouten) setFouten(data.fouten);
        setServerFout(
          data?.melding ??
            "Uw aanvraag kon niet worden verstuurd. Probeer het later opnieuw of neem telefonisch contact met ons op.",
        );
        setStatus("fout");
        return;
      }

      // Doorsturen naar de bevestigingspagina
      const parameters = new URLSearchParams({ ref: data.referentie ?? "" });
      if (formulier.reisId) parameters.set("reis", formulier.reisId);
      parameters.set("via", formulier.contactVoorkeur);
      router.push(`/aanvragen/bevestiging?${parameters.toString()}`);
    } catch {
      setServerFout(
        "Er is een netwerkfout opgetreden. Controleer uw internetverbinding en probeer het opnieuw.",
      );
      setStatus("fout");
    }
  }

  return (
    <form onSubmit={verstuur} noValidate className="space-y-8">
      {/* Verplichte melding boven het formulier */}
      <div className="flex gap-3 rounded-2xl border border-gold-300 bg-gold-50 p-5">
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
        <p className="text-sm font-medium leading-relaxed text-navy-800">{vrijblijvendeMelding}</p>
      </div>

      {/* Overzicht van foutmeldingen */}
      {foutenLijst.length > 0 && (
        <div
          ref={foutOverzicht}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-sm font-semibold text-red-800">
            Controleer {foutenLijst.length === 1 ? "één veld" : `${foutenLijst.length} velden`}{" "}
            voordat u verstuurt:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
            {foutenLijst.map(([veld, melding]) => (
              <li key={veld}>{melding}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 1. Gekozen reis */}
      <fieldset className="space-y-5">
        <legend className="text-base font-semibold text-navy-900">1. Uw gekozen reis</legend>

        {vasteReis ? (
          <>
            <input type="hidden" name="reisId" value={vasteReis.id} readOnly />
            <FormulierVeld id="reisVast" label="Gekozen reis" verplicht>
              <input
                id="reisVast"
                type="text"
                value={`${vasteReis.naam} (${vasteReis.id})`}
                readOnly
                aria-readonly="true"
                className="input-field cursor-default bg-navy-50 font-medium"
              />
            </FormulierVeld>
          </>
        ) : (
          <FormulierVeld id="reisId" label="Gekozen reis" verplicht fout={fouten.reisId}>
            <select
              id="reisId"
              name="reisId"
              value={formulier.reisId}
              onChange={(e) => update("reisId", e.target.value)}
              aria-invalid={Boolean(fouten.reisId)}
              aria-describedby={fouten.reisId ? "reisId-fout" : undefined}
              className="input-field"
            >
              <option value="">— Kies een reis —</option>
              {reizen.map((reis) => (
                <option key={reis.id} value={reis.id}>
                  {reis.naam} · {formatDatum(reis.vertrekdatum)} · {reis.id}
                </option>
              ))}
            </select>
          </FormulierVeld>
        )}

        {gekozenReis && (
          <div className="rounded-2xl border border-navy-100 bg-navy-50/70 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-serif text-lg text-navy-900">{gekozenReis.naam}</p>
              <p className="text-xs uppercase tracking-wider text-navy-500">
                Reis-ID {gekozenReis.id}
              </p>
            </div>
            <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3 sm:justify-start sm:gap-2">
                <dt className="text-navy-500">Vertrek:</dt>
                <dd className="font-medium text-navy-800">
                  {formatDatum(gekozenReis.vertrekdatum)}
                </dd>
              </div>
              <div className="flex justify-between gap-3 sm:justify-start sm:gap-2">
                <dt className="text-navy-500">Terugreis:</dt>
                <dd className="font-medium text-navy-800">
                  {formatDatum(gekozenReis.terugreisdatum)}
                </dd>
              </div>
              <div className="flex justify-between gap-3 sm:justify-start sm:gap-2">
                <dt className="text-navy-500">Duur:</dt>
                <dd className="font-medium text-navy-800">{gekozenReis.aantalDagen} dagen</dd>
              </div>
              <div className="flex justify-between gap-3 sm:justify-start sm:gap-2">
                <dt className="text-navy-500">Prijs vanaf:</dt>
                <dd className="font-medium text-navy-800">
                  {formatPrijs(gekozenReis.prijsVanaf)} p.p.
                </dd>
              </div>
            </dl>
            {!vasteReis && (
              <Link
                href={`/umrah-reizen/${gekozenReis.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-navy-800 underline decoration-gold-400 underline-offset-2"
              >
                Bekijk de volledige reisdetails
                <PijlIcon className="h-3 w-3" />
              </Link>
            )}
          </div>
        )}
      </fieldset>

      {/* 2. Uw gegevens */}
      <fieldset className="space-y-5">
        <legend className="text-base font-semibold text-navy-900">2. Uw gegevens</legend>

        <FormulierVeld
          id="volledigeNaam"
          label="Volledige naam"
          verplicht
          fout={fouten.volledigeNaam}
          hint="Zoals in het dagelijks gebruik, bijvoorbeeld Ahmed el Amrani."
        >
          <input
            id="volledigeNaam"
            name="volledigeNaam"
            type="text"
            autoComplete="name"
            maxLength={80}
            value={formulier.volledigeNaam}
            onChange={(e) => update("volledigeNaam", e.target.value)}
            aria-invalid={Boolean(fouten.volledigeNaam)}
            aria-describedby={fouten.volledigeNaam ? "volledigeNaam-fout" : undefined}
            className="input-field"
          />
        </FormulierVeld>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormulierVeld id="email" label="E-mailadres" verplicht fout={fouten.email}>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              value={formulier.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(fouten.email)}
              aria-describedby={fouten.email ? "email-fout" : undefined}
              className="input-field"
            />
          </FormulierVeld>

          <FormulierVeld
            id="telefoon"
            label="Telefoonnummer"
            verplicht
            fout={fouten.telefoon}
            hint="Bijvoorbeeld 06 12 34 56 78"
          >
            <input
              id="telefoon"
              name="telefoon"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={25}
              value={formulier.telefoon}
              onChange={(e) => update("telefoon", e.target.value)}
              aria-invalid={Boolean(fouten.telefoon)}
              aria-describedby={fouten.telefoon ? "telefoon-fout" : undefined}
              className="input-field"
            />
          </FormulierVeld>
        </div>

        <FormulierVeld id="woonplaats" label="Woonplaats" verplicht fout={fouten.woonplaats}>
          <input
            id="woonplaats"
            name="woonplaats"
            type="text"
            autoComplete="address-level2"
            maxLength={60}
            value={formulier.woonplaats}
            onChange={(e) => update("woonplaats", e.target.value)}
            aria-invalid={Boolean(fouten.woonplaats)}
            aria-describedby={fouten.woonplaats ? "woonplaats-fout" : undefined}
            className="input-field"
          />
        </FormulierVeld>
      </fieldset>

      {/* 3. Reisgezelschap */}
      <fieldset className="space-y-5">
        <legend className="text-base font-semibold text-navy-900">3. Met wie reist u?</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormulierVeld
            id="aantalVolwassenen"
            label="Aantal volwassenen"
            verplicht
            fout={fouten.aantalVolwassenen}
            hint="18 jaar en ouder."
          >
            <input
              id="aantalVolwassenen"
              name="aantalVolwassenen"
              type="number"
              min={1}
              max={30}
              step={1}
              inputMode="numeric"
              value={formulier.aantalVolwassenen}
              onChange={(e) => update("aantalVolwassenen", e.target.value)}
              aria-invalid={Boolean(fouten.aantalVolwassenen)}
              aria-describedby={fouten.aantalVolwassenen ? "aantalVolwassenen-fout" : undefined}
              className="input-field"
            />
          </FormulierVeld>

          <FormulierVeld
            id="aantalKinderen"
            label="Aantal kinderen"
            verplicht
            fout={fouten.aantalKinderen}
            hint="Tot en met 17 jaar. Vul 0 in wanneer er geen kinderen meereizen."
          >
            <input
              id="aantalKinderen"
              name="aantalKinderen"
              type="number"
              min={0}
              max={20}
              step={1}
              inputMode="numeric"
              value={formulier.aantalKinderen}
              onChange={(e) => update("aantalKinderen", e.target.value)}
              aria-invalid={Boolean(fouten.aantalKinderen)}
              aria-describedby={fouten.aantalKinderen ? "aantalKinderen-fout" : undefined}
              className="input-field"
            />
          </FormulierVeld>
        </div>

        {heeftKinderen && (
          <FormulierVeld
            id="leeftijdenKinderen"
            label="Leeftijden van de kinderen"
            verplicht
            fout={fouten.leeftijdenKinderen}
            hint="Gescheiden door een komma, bijvoorbeeld: 4, 7 en 11."
          >
            <input
              id="leeftijdenKinderen"
              name="leeftijdenKinderen"
              type="text"
              inputMode="numeric"
              maxLength={60}
              value={formulier.leeftijdenKinderen}
              onChange={(e) => update("leeftijdenKinderen", e.target.value)}
              aria-invalid={Boolean(fouten.leeftijdenKinderen)}
              aria-describedby={fouten.leeftijdenKinderen ? "leeftijdenKinderen-fout" : undefined}
              className="input-field"
            />
          </FormulierVeld>
        )}

        <FormulierVeld
          id="reisgezelschap"
          label="Reist u alleen of met gezelschap?"
          verplicht
          fout={fouten.reisgezelschap}
        >
          <select
            id="reisgezelschap"
            name="reisgezelschap"
            value={formulier.reisgezelschap}
            onChange={(e) => update("reisgezelschap", e.target.value)}
            aria-invalid={Boolean(fouten.reisgezelschap)}
            aria-describedby={fouten.reisgezelschap ? "reisgezelschap-fout" : undefined}
            className="input-field"
          >
            {reisgezelschappen.map((optie) => (
              <option key={optie} value={optie}>
                {optie}
              </option>
            ))}
          </select>
        </FormulierVeld>

        <FormulierVeld
          id="kamerindeling"
          label="Gewenste kamerindeling"
          verplicht
          fout={fouten.kamerindeling}
          hint="Wij delen kamers altijd in overleg in; dit is een voorkeur."
        >
          <select
            id="kamerindeling"
            name="kamerindeling"
            value={formulier.kamerindeling}
            onChange={(e) => update("kamerindeling", e.target.value)}
            aria-invalid={Boolean(fouten.kamerindeling)}
            aria-describedby={fouten.kamerindeling ? "kamerindeling-fout" : undefined}
            className="input-field"
          >
            {kamerindelingen.map((optie) => (
              <option key={optie} value={optie}>
                {optie}
              </option>
            ))}
          </select>
        </FormulierVeld>
      </fieldset>

      {/* 4. Contact en opmerkingen */}
      <fieldset className="space-y-5">
        <legend className="text-base font-semibold text-navy-900">4. Contact en opmerkingen</legend>

        <FormulierVeld
          id="contactVoorkeur"
          label="Voorkeurswijze van contact"
          verplicht
          fout={fouten.contactVoorkeur}
        >
          <div className="flex flex-wrap gap-2.5">
            {contactVoorkeuren.map((optie) => {
              const actief = formulier.contactVoorkeur === optie;
              return (
                <label
                  key={optie}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                    actief
                      ? "border-gold-400 bg-gold-50 text-navy-900"
                      : "border-navy-200 bg-white text-navy-600 hover:border-navy-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="contactVoorkeur"
                    value={optie}
                    checked={actief}
                    onChange={() => update("contactVoorkeur", optie)}
                    className="sr-only"
                  />
                  {optie}
                </label>
              );
            })}
          </div>
        </FormulierVeld>

        <FormulierVeld
          id="opmerkingen"
          label="Opmerkingen of vragen"
          fout={fouten.opmerkingen}
          hint="Bijvoorbeeld: een voorkeur voor het hotel, beperkte mobiliteit, of een vraag over de begeleiding."
        >
          <textarea
            id="opmerkingen"
            name="opmerkingen"
            rows={5}
            maxLength={2000}
            value={formulier.opmerkingen}
            onChange={(e) => update("opmerkingen", e.target.value)}
            aria-invalid={Boolean(fouten.opmerkingen)}
            aria-describedby={fouten.opmerkingen ? "opmerkingen-fout" : undefined}
            className="input-field resize-y"
          />
        </FormulierVeld>

        {/* Onzichtbaar veld tegen spam. Bezoekers zien dit niet. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="vangnet">Laat dit veld leeg</label>
          <input
            id="vangnet"
            name="vangnet"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formulier.vangnet}
            onChange={(e) => update("vangnet", e.target.value)}
          />
        </div>
      </fieldset>

      {/* 5. Afronden */}
      <fieldset className="space-y-5">
        <legend className="text-base font-semibold text-navy-900">5. Afronden</legend>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-navy-700">
            <input
              type="checkbox"
              name="akkoordPrivacy"
              checked={formulier.akkoordPrivacy}
              onChange={(e) => update("akkoordPrivacy", e.target.checked)}
              aria-invalid={Boolean(fouten.akkoordPrivacy)}
              aria-describedby={fouten.akkoordPrivacy ? "akkoordPrivacy-fout" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy-300 text-navy-900 focus:ring-gold-400"
            />
            <span>
              Ik ga ermee akkoord dat mijn gegevens worden gebruikt om mijn aanvraag te behandelen,
              zoals beschreven in de{" "}
              <Link
                href="/privacyverklaring"
                className="font-medium underline decoration-gold-400 underline-offset-2"
              >
                privacyverklaring
              </Link>
              . <span className="text-gold-600">*</span>
            </span>
          </label>
          {fouten.akkoordPrivacy && (
            <p id="akkoordPrivacy-fout" role="alert" className="mt-2 text-xs font-medium text-red-600">
              {fouten.akkoordPrivacy}
            </p>
          )}
        </div>

        <p className="rounded-xl bg-navy-50 p-4 text-xs leading-relaxed text-navy-600">
          Vul hier geen BSN, paspoortnummer, paspoortscan, medische gegevens of betaalgegevens in.
          Deze gegevens vragen wij nooit via de website op.
        </p>

        {serverFout && (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
            {serverFout}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "versturen"}
          className="btn-primary w-full sm:w-auto"
        >
          {status === "versturen" ? "Bezig met versturen…" : "Vrijblijvende aanvraag versturen"}
          {status !== "versturen" && <PijlIcon className="h-4 w-4" />}
        </button>

        <p className="text-xs text-navy-500">
          Velden met <span className="text-gold-600">*</span> zijn verplicht. Wij reageren binnen
          twee werkdagen.
        </p>
      </fieldset>
    </form>
  );
}
