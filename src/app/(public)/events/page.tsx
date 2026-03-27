"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, ChevronRight, Star, Music, Sparkles } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Omakase Night — Chef&apos;s Table Experience",
    date: "15 Avril 2026",
    time: "19:30",
    capacity: "8 guests",
    category: "Omakase",
    price: "2,800 MAD / personne",
    description:
      "Une soirée intime au comptoir du chef, où Chef Takashi Moretti guide chaque convive à travers 14 plats signature en direct. Accord mets-saké japonais inclus.",
    highlights: ["14 plats signature", "Accord saké premium", "Interaction directe avec le chef"],
    available: true,
    featured: true,
  },
  {
    id: 2,
    title: "Soirée Wagyu & Barolo",
    date: "22 Avril 2026",
    time: "20:00",
    capacity: "40 guests",
    category: "Wine Dinner",
    price: "1,950 MAD / personne",
    description:
      "Une soirée dédiée au wagyu A5 de Kagoshima et au grand Barolo italien. Cinq services, cinq accords, une harmonie parfaite entre deux terroirs d&apos;exception.",
    highlights: ["Wagyu A5 Kagoshima", "Barolo DOCG millésimés", "5 services exclusifs"],
    available: true,
    featured: false,
  },
  {
    id: 3,
    title: "Sunset Terrace — Soirée Privée",
    date: "1 Mai 2026",
    time: "18:00",
    capacity: "40 guests",
    category: "Terrace Event",
    price: "Sur devis",
    description:
      "Privatisation exclusive de la terrasse panoramique pour vos événements d&apos;entreprise, anniversaires ou célébrations privées. Vue sur la Méditerranée, menu personnalisé.",
    highlights: ["Vue Méditerranée exclusive", "Menu sur-mesure", "Service dédié"],
    available: true,
    featured: false,
  },
  {
    id: 4,
    title: "Cours de Sushi — Atelier Master Class",
    date: "8 Mai 2026",
    time: "15:00",
    capacity: "12 guests",
    category: "Atelier",
    price: "850 MAD / personne",
    description:
      "Sous la direction de Chef Takashi, maîtrisez les fondamentaux du sushi nigiri, maki et temaki. Techniques professionnelles, ingrédients de chef, dégustation finale.",
    highlights: ["Apprentissage technique", "Ingrédients premium", "Dégustation incluse"],
    available: true,
    featured: false,
  },
  {
    id: 5,
    title: "Soirée Jazz & Fusion Italienne",
    date: "15 Mai 2026",
    time: "20:30",
    capacity: "80 guests",
    category: "Soirée Musicale",
    price: "1,200 MAD / personne",
    description:
      "Le Quatuor Marco Ferri rencontre la cuisine de Chef Moretti. Une soirée où la musique jazz et la gastronomie fusion se répondent en parfaite harmonie.",
    highlights: ["Quartet jazz live", "Menu 6 services", "Champagne d&apos;accueil"],
    available: false,
    featured: false,
  },
  {
    id: 6,
    title: "Iftar de Prestige — Ramadan Edition",
    date: "Dates sur demande",
    time: "Au coucher du soleil",
    capacity: "120 guests",
    category: "Saisonnier",
    price: "à partir de 1,600 MAD / personne",
    description:
      "Une rupture du jeûne raffinée alliant les saveurs marocaines traditionnelles à l&apos;élégance de la fusion 2R. Privatisation complète du restaurant disponible.",
    highlights: ["Fusion maroco-japonaise", "Privatisation possible", "Menu traditionnel revisité"],
    available: true,
    featured: false,
  },
];

const categories = ["Tous", "Omakase", "Wine Dinner", "Atelier", "Soirée Musicale", "Terrace Event", "Saisonnier"];

const categoryColors: Record<string, string> = {
  Omakase: "bg-amber-900/30 text-amber-300 border-amber-500/30",
  "Wine Dinner": "bg-red-900/30 text-red-300 border-red-500/30",
  Atelier: "bg-blue-900/30 text-blue-300 border-blue-500/30",
  "Soirée Musicale": "bg-purple-900/30 text-purple-300 border-purple-500/30",
  "Terrace Event": "bg-orange-900/30 text-orange-300 border-orange-500/30",
  Saisonnier: "bg-green-900/30 text-green-300 border-green-500/30",
};

export default function EventsPage() {
  const [active, setActive] = useState("Tous");

  const filtered =
    active === "Tous" ? upcomingEvents : upcomingEvents.filter((e) => e.category === active);
  const featured = upcomingEvents.find((e) => e.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-amber-700/5 rounded-full blur-3xl" />
        <div className="container-premium text-center space-y-8 relative z-10 animate-fade-in">
          <p className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">Agenda & Événements</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
            Expériences<br />
            <span className="text-amber-400">Exclusives</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Des soirées uniques, des ateliers maîtres et des dîners privatisés — chaque événement 2R Fusion est conçu pour marquer les mémoires.
          </p>
        </div>
      </section>

      {/* Featured Event */}
      {featured && (
        <section className="section-spacing border-b border-stone-800">
          <div className="container-premium">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-5 w-5 text-amber-400" />
              <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">Événement Vedette</p>
            </div>
            <Card className="bg-gradient-to-br from-amber-900/20 via-stone-900 to-stone-950 border-amber-500/30 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image placeholder */}
                <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-amber-900/30 via-stone-800 to-stone-900 flex items-center justify-center border-r border-stone-800">
                  <div className="text-center space-y-3 p-8">
                    <Sparkles className="h-16 w-16 text-amber-400/40 mx-auto" />
                    <p className="text-stone-500 text-sm tracking-widest uppercase">2R Fusion</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                  <Badge className={`w-fit ${categoryColors[featured.category]}`}>{featured.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-stone-100"
                    dangerouslySetInnerHTML={{ __html: featured.title }}
                  />
                  <p className="text-stone-400 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: featured.description }}
                  />
                  <div className="space-y-3">
                    {featured.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-amber-400 flex-shrink-0" />
                        <span className="text-stone-300 text-sm">{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-xs text-stone-500 uppercase tracking-wider">Date</p>
                      <p className="text-stone-200 font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-amber-400" />
                        {featured.date}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-stone-500 uppercase tracking-wider">Tarif</p>
                      <p className="text-amber-400 font-medium">{featured.price}</p>
                    </div>
                  </div>
                  <Link href="/book">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full md:w-auto px-8">
                      Réserver ma place
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="section-spacing border-b border-stone-800 bg-stone-900/30">
        <div className="container-premium space-y-10">
          <div className="text-center space-y-4">
            <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">Programme</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Tous nos Événements</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                  active === cat
                    ? "bg-amber-500 text-black"
                    : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-500/50 hover:text-amber-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <Card
                key={event.id}
                className={`bg-stone-900 border-stone-800 hover:border-amber-500/30 transition-all duration-300 overflow-hidden flex flex-col ${
                  !event.available ? "opacity-60" : ""
                }`}
              >
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <Badge className={`text-xs ${categoryColors[event.category] || "bg-stone-800 text-stone-300"}`}>
                      {event.category}
                    </Badge>
                    {!event.available && (
                      <span className="text-xs text-stone-500 bg-stone-800 px-2 py-1 rounded-full">Complet</span>
                    )}
                  </div>

                  <h3
                    className="text-lg font-heading font-semibold text-stone-100 leading-snug"
                    dangerouslySetInnerHTML={{ __html: event.title }}
                  />
                  <p
                    className="text-stone-400 text-sm leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />

                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    <div className="flex items-center gap-2 text-xs text-stone-400">
                      <Calendar className="h-3 w-3 text-amber-400" />
                      <span>{event.date}</span>
                      <Clock className="h-3 w-3 text-amber-400 ml-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <Users className="h-3 w-3 text-amber-400" />
                        <span>{event.capacity}</span>
                      </div>
                      <span className="text-amber-400 text-xs font-medium">{event.price}</span>
                    </div>
                  </div>

                  {event.available ? (
                    <Link href="/book" className="block mt-auto">
                      <Button
                        size="sm"
                        className="w-full bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 transition-all duration-300"
                      >
                        Réserver
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      disabled
                      className="w-full bg-stone-800 text-stone-500 cursor-not-allowed mt-auto"
                    >
                      Complet
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Private Events */}
      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">Événements Privés</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Privatisez 2R Fusion</h2>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-amber-700" />
              <p className="text-stone-300 leading-relaxed">
                Que ce soit pour un dîner d&apos;affaires de prestige, une célébration familiale ou un événement corporate mémorable — 2R Fusion offre des formules de privatisation complètes ou partielles.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Jusqu&apos;à 150 couverts", sub: "Capacité totale" },
                  { icon: MapPin, label: "4 espaces", sub: "Salle, terrasse, salon, comptoir" },
                  { icon: Music, label: "DJ & live music", sub: "Sur demande" },
                  { icon: Star, label: "Menu sur-mesure", sub: "Par Chef Moretti" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 bg-stone-900 rounded-lg border border-stone-800">
                    <item.icon className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-stone-200 text-sm font-medium" dangerouslySetInnerHTML={{ __html: item.label }} />
                      <p className="text-stone-500 text-xs" dangerouslySetInnerHTML={{ __html: item.sub }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Card className="bg-stone-900 border-amber-500/20 p-6 space-y-4">
                <h3 className="text-lg font-heading font-semibold text-amber-400">Demande de Privatisation</h3>
                <p className="text-stone-400 text-sm">
                  Contactez notre équipe événements pour un devis personnalisé et la disponibilité de votre date.
                </p>
                <div className="space-y-3 text-sm text-stone-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-400" />
                    <span>Corniche de Tanger, Maroc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span>Réponse sous 24h</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Nous contacter
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-premium text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Ne manquez aucun événement
          </h2>
          <p className="text-stone-300 max-w-xl mx-auto">
            Rejoignez notre liste VIP pour être informé en priorité de nos soirées exclusives et événements privés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/book">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6 text-lg">
                Réserver une table
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 px-10 py-6 text-lg">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
