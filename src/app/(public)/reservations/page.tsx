"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Mail,
  MessageSquare,
  PartyPopper,
  Phone,
  Users,
} from "lucide-react";

type ReservationForm = {
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
  occasion: string;
  specialRequests: string;
};

const serviceMoments = [
  "Confirmation prioritaire sous 2 heures",
  "Tables signatures et salons selon disponibilité",
  "Attention spéciale pour anniversaires et occasions privées",
];

const occasionOptions = [
  "Dîner signature",
  "Anniversaire",
  "Dîner d&apos;affaires",
  "Demande en mariage",
  "Célébration privée",
];

const timeOptions = [
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
];

function getTodayDate() {
  return new Date().toISOString().split("T")[0] ?? "";
}

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ReservationForm>({
    guestName: "",
    email: "",
    phone: "",
    date: "",
    time: "20:00",
    partySize: "2",
    occasion: "Dîner signature",
    specialRequests: "",
  });

  const minDate = useMemo(() => getTodayDate(), []);

  function updateField<K extends keyof ReservationForm>(
    key: K,
    value: ReservationForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative overflow-hidden bg-stone-950 text-stone-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.10),_transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      <section className="relative border-b border-stone-900 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-14 lg:flex-row lg:items-start">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-amber-300">
              Conciergerie Réservation
            </div>
            <div className="space-y-5">
              <h1 className="font-heading text-5xl font-semibold leading-tight md:text-7xl">
                Réservez une
                <span className="block text-amber-400">table d&apos;exception</span>
              </h1>
              <p className="max-w-xl text-base leading-8 text-stone-300 md:text-lg">
                Une expérience premium à Tanger, pensée pour les dîners signatures, les rendez-vous d&apos;affaires et les grandes célébrations. Remplissez votre demande et notre équipe vous recontacte rapidement.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {serviceMoments.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-stone-800 bg-stone-900/70 p-4 text-sm leading-6 text-stone-300 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
                >
                  <div className="mb-3 h-1.5 w-10 rounded-full bg-amber-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:max-w-2xl">
            <div className="rounded-[2rem] border border-amber-400/15 bg-stone-900/90 p-6 shadow-[0_28px_110px_rgba(0,0,0,0.5)] backdrop-blur md:p-8">
              <div className="mb-8 flex items-start justify-between gap-6 border-b border-stone-800 pb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-amber-300">
                    Demande de réservation
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-stone-50">
                    Planifiez votre venue
                  </h2>
                </div>
                <div className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs text-amber-200">
                  Réponse rapide
                </div>
              </div>

              {submitted && (
                <div className="mb-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                  Merci {form.guestName || "pour votre demande"}. Nous avons bien reçu votre réservation pour le {form.date || "jour choisi"}{" "}
                  à {form.time}, pour {form.partySize} convive(s).
                </div>
              )}

              <form className="space-y-7" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Nom complet
                    </span>
                    <div className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 focus-within:border-amber-400/50">
                      <PartyPopper className="h-4 w-4 text-amber-400" />
                      <input
                        required
                        value={form.guestName}
                        onChange={(event) =>
                          updateField("guestName", event.target.value)
                        }
                        placeholder="Votre nom"
                        className="w-full bg-transparent text-sm text-stone-100 outline-none placeholder:text-stone-500"
                      />
                    </div>
                  </label>

                  <label className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Email
                    </span>
                    <div className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 focus-within:border-amber-400/50">
                      <Mail className="h-4 w-4 text-amber-400" />
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="nom@email.com"
                        className="w-full bg-transparent text-sm text-stone-100 outline-none placeholder:text-stone-500"
                      />
                    </div>
                  </label>

                  <label className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Téléphone
                    </span>
                    <div className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 focus-within:border-amber-400/50">
                      <Phone className="h-4 w-4 text-amber-400" />
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        placeholder="+212 6 00 00 00 00"
                        className="w-full bg-transparent text-sm text-stone-100 outline-none placeholder:text-stone-500"
                      />
                    </div>
                  </label>

                  <label className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Nombre de convives
                    </span>
                    <div className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 focus-within:border-amber-400/50">
                      <Users className="h-4 w-4 text-amber-400" />
                      <select
                        value={form.partySize}
                        onChange={(event) =>
                          updateField("partySize", event.target.value)
                        }
                        className="w-full bg-transparent text-sm text-stone-100 outline-none"
                      >
                        {["2", "3", "4", "5", "6", "8", "10+"].map((size) => (
                          <option
                            key={size}
                            value={size}
                            className="bg-stone-950"
                          >
                            {size} convive(s)
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>

                  <label className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Date
                    </span>
                    <div className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 focus-within:border-amber-400/50">
                      <CalendarDays className="h-4 w-4 text-amber-400" />
                      <input
                        required
                        min={minDate}
                        type="date"
                        value={form.date}
                        onChange={(event) => updateField("date", event.target.value)}
                        className="w-full bg-transparent text-sm text-stone-100 outline-none"
                      />
                    </div>
                  </label>

                  <label className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Heure
                    </span>
                    <div className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 focus-within:border-amber-400/50">
                      <Clock3 className="h-4 w-4 text-amber-400" />
                      <select
                        value={form.time}
                        onChange={(event) => updateField("time", event.target.value)}
                        className="w-full bg-transparent text-sm text-stone-100 outline-none"
                      >
                        {timeOptions.map((time) => (
                          <option
                            key={time}
                            value={time}
                            className="bg-stone-950"
                          >
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-[1.2fr,1.8fr]">
                  <label className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Occasion
                    </span>
                    <select
                      value={form.occasion}
                      onChange={(event) => updateField("occasion", event.target.value)}
                      className="w-full rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none focus:border-amber-400/50"
                    >
                      {occasionOptions.map((occasion) => (
                        <option key={occasion} value={occasion}>
                          {occasion}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                      Demandes spéciales
                    </span>
                    <div className="flex gap-3 rounded-2xl border border-stone-800 bg-stone-950 px-4 py-3 focus-within:border-amber-400/50">
                      <MessageSquare className="mt-1 h-4 w-4 text-amber-400" />
                      <textarea
                        rows={4}
                        value={form.specialRequests}
                        onChange={(event) =>
                          updateField("specialRequests", event.target.value)
                        }
                        placeholder="Allergies, préférences de table, mise en scène anniversaire, besoins professionnels..."
                        className="w-full resize-none bg-transparent text-sm text-stone-100 outline-none placeholder:text-stone-500"
                      />
                    </div>
                  </label>
                </div>

                <div className="flex flex-col gap-4 border-t border-stone-800 pt-6 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-md text-sm leading-6 text-stone-400">
                    Pour les groupes de plus de 10 personnes, notre équipe événements vous contactera pour un accompagnement dédié.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-amber-300"
                  >
                    Envoyer la demande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}