"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Users, Star, Phone, Mail, Check } from "lucide-react";

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const occasions = [
  "Aucune", "Anniversaire", "Anniversaire de Mariage", "Dîner d&apos;Affaires",
  "Rendez-vous Romantique", "Célébration de Mariage", "Remise de Diplôme", "Autre",
];

const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    occasion: "",
    requests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <section className="min-h-[70vh] flex items-center justify-center">
          <div className="container-premium text-center space-y-8 animate-fade-in">
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Réservation <span className="text-amber-400">Confirmée</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-xl mx-auto">
              Merci, {form.name}. Nous avons bien reçu votre demande de réservation pour {form.partySize} invité{form.partySize !== "1" ? "s" : ""} le {form.date} à {form.time}.
            </p>
            <p className="text-stone-400">
              Une confirmation sera envoyée à {form.email}. Pour des modifications, appelez-nous au +212 539 000 000.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-5"
            >
              Faire une Autre Réservation
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="container-premium text-center space-y-8 relative z-10 animate-fade-in">
          <p className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">Réservez Votre Expérience</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold">
            Réservez une <span className="text-amber-400">Table</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          <p className="text-lg text-stone-300 max-w-2xl mx-auto">
            Assurez votre place à la destination gastronomique fusion première de Tanger. Pour les groupes de plus de 10 personnes ou les événements privés, veuillez nous contacter directement.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold text-amber-400">Informations Invité</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Nom Complet *</label>
                      <Input
                        required
                        placeholder="Votre nom"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-stone-900 border-stone-700 text-stone-100 focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Email *</label>
                      <Input
                        required
                        type="email"
                        placeholder="votre@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-stone-900 border-stone-700 text-stone-100 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400">Numéro de Téléphone *</label>
                    <Input
                      required
                      type="tel"
                      placeholder="+212 6XX XXX XXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-stone-900 border-stone-700 text-stone-100 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold text-amber-400">Détails de la Réservation</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Date *</label>
                      <Input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="bg-stone-900 border-stone-700 text-stone-100 focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Heure *</label>
                      <Select onValueChange={(v) => setForm({ ...form, time: v })}>
                        <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-100">
                          <SelectValue placeholder="Sélectionnez l&apos;heure" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-800 border-stone-700">
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-stone-400">Nombre d&apos;Invités *</label>
                      <Select onValueChange={(v) => setForm({ ...form, partySize: v })}>
                        <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-100">
                          <SelectValue placeholder="Invités" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-800 border-stone-700">
                          {partySizes.map((s) => (
                            <SelectItem key={s} value={s}>{s} {s === "1" ? "Invité" : "Invités"}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400">Occasion</label>
                    <Select onValueChange={(v) => setForm({ ...form, occasion: v })}>
                      <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-100">
                        <SelectValue placeholder="Sélectionnez une occasion (facultatif)" />
                      </SelectTrigger>
                      <SelectContent className="bg-stone-800 border-stone-700">
                        {occasions.map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-stone-400">Demandes Spéciales</label>
                    <textarea
                      placeholder="Restrictions alimentaires, préférences de places, allergies, détails de célébration..."
                      value={form.requests}
                      onChange={(e) => setForm({ ...form, requests: e.target.value })}
                      rows={4}
                      className="w-full rounded-lg bg-stone-900 border border-stone-700 text-stone-100 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-semibold"
                >
                  Confirmer la Réservation
                </Button>
                <p className="text-xs text-stone-500 text-center">
                  En envoyant, vous acceptez notre politique d&apos;annulation. Annulation gratuite jusqu&apos;à 4 heures avant votre réservation.
                </p>
              </form>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="bg-stone-900 border-stone-800 p-6 space-y-6">
                <h3 className="text-lg font-heading font-semibold text-amber-400">Informations Réservation</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-200">Heures de Service</p>
                      <p className="text-xs text-stone-400">Déjeuner: 12:00 - 15:00</p>
                      <p className="text-xs text-stone-400">Dîner: 19:00 - 23:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-200">Groupe de Dîneurs</p>
                      <p className="text-xs text-stone-400">Les groupes de 10+ nécessitent une réservation directe. Contactez notre équipe événements.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-200">Dîner VIP et Privatisation</p>
                      <p className="text-xs text-stone-400">Salons exclusifs disponibles pour occasions spéciales et événements corporatifs.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-stone-900 border-stone-800 p-6 space-y-4">
                <h3 className="text-lg font-heading font-semibold text-amber-400">Nous Contacter</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-stone-300">+212 539 000 000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-stone-300">reservations@2rfusion.ma</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-amber-900/20 to-stone-900 border-amber-500/20 p-6 space-y-3">
                <h3 className="text-lg font-heading font-semibold text-amber-400">Politique d&apos;Annulation</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Annulation gratuite jusqu&apos;à 4 heures avant votre réservation. Les annulations tardives ou les absences peuvent entraîner des frais de 200 MAD par personne. Nous comprenons que les plans changent — veuillez nous le faire savoir dès que possible.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}