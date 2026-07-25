"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import FormulierVeld from "@/components/FormulierVeld";
import {
  contactOnderwerpen,
  contactVoorkeuren,
  heeftFouten,
  valideerAanvraag,
  type AanvraagPayload,
  type Fouten,
} from "@/lib/aanvraag";
import { PijlIcon, VinkjeIcon } from "@/components/Icons";

type Status = "invullen" | "versturen" | "verstuurd" | "fout";

type FormulierState = {
  volledigeNaam: string;
  email: string;
  telefoon: string;
  woonplaats: string;
  onderwerp: string;
  contactVoorkeur: string;
  opmerkingen: string;
  akkoordPrivacy: boolean;
  vangnet: string;
};

export default function ContactFormulier() {
  const [formulier, setFormulier] = useState<FormulierState>({
    volledigeNaam: "",
    email: "",
    telefoon: "",
    woonplaats: "",
    onderwerp: contactOnderwerpen[0],
    contactVoorkeur: contactVoorkeuren[0],
    opmerkingen: "",
    akkoordPrivacy: false,
    vangnet: "",
  });
  const [fouten, setFouten] = useState<Fouten>({});
  const [status, setStatus] = useState<Status>("invullen");
  const [serverFout, setServerFout] = useState<string | null>(null);
  const [referentie, setReferentie] = useState<string | null>(null);
  const startTijd = useRef<number>(0);

  useEffect(() => {
    startTijd.current = Date.now();
  }, []);

  function update<K extends keyof FormulierState>(veld: K, waarde: FormulierState[K]) {
    setFormulier((vorig) => ({ ...vorig, [veld]: waarde }) as FormulierState);
    setFouten((vorig) => {
      const nieuw = { ...vorig };
      delete nieuw[veld as keyof Fouten];
      return nieuw;
    });
  }

  async function verstuur(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerFout(null);

    const payload: AanvraagPayload = {
      type: "contact",
      volledigeNaam: formulier.volledigeNaam,
      email: formulier.email,
      telefoon: formulier.telefoon,
      woonplaats: formulier.woonplaats,
      aantalVolwassenen: "",
      aantalKinderen: "",
      leeftijdenKinderen: "",
      kamerindeling: "",
      reisgezelschap: "",
      contactVoorkeur: formulier.contactVoorkeur,
      onderwerp: formulier.onderwerp,
      opmerkingen: formulier.opmerkingen,
      akkoordPrivacy: formulier.akkoordPrivacy,
      vangnet: formulier.vangnet,
      startTijd: startTijd.current,
    };

    const gevonden = valideerAanvraag(payload);
    if (heeftFouten(gevonden)) {
      setFouten(gevonden);
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
            "Uw bericht kon niet worden verstuurd. Probeer het later opnieuw of bel ons.",
        );
        setStatus("fout");
        return;
      }
      setReferentie(data.referentie ?? null);
      setStatus("verstuurd");
    } catch {
      setServerFout("Er is een netwerkfout opgetreden. Probeer het opnieuw.");
      setStatus("fout");
    }
  }

  if (status === "verstuurd") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-600">
          <VinkjeIcon className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-base font-semibold text-navy-900">Bericht verstuurd</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-700">
          Bedankt voor uw bericht. Wij nemen binnen twee werkdagen contact met u op via{" "}
          {formulier.contactVoorkeur.toLowerCase()}. U ontvangt een ontvangstbevestiging per e-mail.
        </p>
        {referentie && (
          <p className="mt-3 text-xs text-navy-600">
            Uw referentienummer: <span className="font-semibold">{referentie}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={verstuur} noValidate className="space-y-5">
      <FormulierVeld
        id="c-naam"
        label="Volledige naam"
        verplicht
        fout={fouten.volledigeNaam}
      >
        <input
          id="c-naam"
          type="text"
          autoComplete="name"
          maxLength={80}
          value={formulier.volledigeNaam}
          onChange={(e) => update("volledigeNaam", e.target.value)}
          aria-invalid={Boolean(fouten.volledigeNaam)}
          aria-describedby={fouten.volledigeNaam ? "c-naam-fout" : undefined}
          className="input-field"
        />
      </FormulierVeld>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormulierVeld id="c-email" label="E-mailadres" verplicht fout={fouten.email}>
          <input
            id="c-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            value={formulier.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(fouten.email)}
            aria-describedby={fouten.email ? "c-email-fout" : undefined}
            className="input-field"
          />
        </FormulierVeld>

        <FormulierVeld id="c-telefoon" label="Telefoonnummer" verplicht fout={fouten.telefoon}>
          <input
            id="c-telefoon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={25}
            value={formulier.telefoon}
            onChange={(e) => update("telefoon", e.target.value)}
            aria-invalid={Boolean(fouten.telefoon)}
            aria-describedby={fouten.telefoon ? "c-telefoon-fout" : undefined}
            className="input-field"
          />
        </FormulierVeld>

        <FormulierVeld id="c-woonplaats" label="Woonplaats" fout={fouten.woonplaats}>
          <input
            id="c-woonplaats"
            type="text"
            autoComplete="address-level2"
            maxLength={60}
            value={formulier.woonplaats}
            onChange={(e) => update("woonplaats", e.target.value)}
            className="input-field"
          />
        </FormulierVeld>

        <FormulierVeld id="c-onderwerp" label="Onderwerp">
          <select
            id="c-onderwerp"
            value={formulier.onderwerp}
            onChange={(e) => update("onderwerp", e.target.value)}
            className="input-field"
          >
            {contactOnderwerpen.map((optie) => (
              <option key={optie} value={optie}>
                {optie}
              </option>
            ))}
          </select>
        </FormulierVeld>
      </div>

      <FormulierVeld
        id="c-contactVoorkeur"
        label="Voorkeurswijze van contact"
        verplicht
        fout={fouten.contactVoorkeur}
      >
        <select
          id="c-contactVoorkeur"
          value={formulier.contactVoorkeur}
          onChange={(e) => update("contactVoorkeur", e.target.value)}
          aria-invalid={Boolean(fouten.contactVoorkeur)}
          className="input-field"
        >
          {contactVoorkeuren.map((optie) => (
            <option key={optie} value={optie}>
              {optie}
            </option>
          ))}
        </select>
      </FormulierVeld>

      <FormulierVeld id="c-bericht" label="Uw bericht" verplicht fout={fouten.opmerkingen}>
        <textarea
          id="c-bericht"
          rows={6}
          maxLength={2000}
          value={formulier.opmerkingen}
          onChange={(e) => update("opmerkingen", e.target.value)}
          aria-invalid={Boolean(fouten.opmerkingen)}
          aria-describedby={fouten.opmerkingen ? "c-bericht-fout" : undefined}
          className="input-field resize-y"
        />
      </FormulierVeld>

      {/* Onzichtbaar veld tegen spam */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="c-vangnet">Laat dit veld leeg</label>
        <input
          id="c-vangnet"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formulier.vangnet}
          onChange={(e) => update("vangnet", e.target.value)}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-navy-700">
          <input
            type="checkbox"
            checked={formulier.akkoordPrivacy}
            onChange={(e) => update("akkoordPrivacy", e.target.checked)}
            aria-invalid={Boolean(fouten.akkoordPrivacy)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy-300 text-navy-900 focus:ring-gold-400"
          />
          <span>
            Ik ga ermee akkoord dat mijn gegevens worden gebruikt om mijn vraag te beantwoorden,
            zoals beschreven in de{" "}
            <Link
              href="/privacyverklaring"
              className="font-medium underline decoration-gold-400 underline-offset-2"
            >
              privacyverklaring
            </Link>
            .
          </span>
        </label>
        {fouten.akkoordPrivacy && (
          <p role="alert" className="mt-2 text-xs font-medium text-red-600">
            {fouten.akkoordPrivacy}
          </p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-navy-500">
        Vul geen BSN, paspoortnummer, paspoortscan, medische gegevens of betaalgegevens in.
      </p>

      {serverFout && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {serverFout}
        </p>
      )}

      <button type="submit" disabled={status === "versturen"} className="btn-primary w-full sm:w-auto">
        {status === "versturen" ? "Bezig met versturen…" : "Bericht versturen"}
        {status !== "versturen" && <PijlIcon className="h-4 w-4" />}
      </button>
    </form>
  );
}
