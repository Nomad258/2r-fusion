"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChefHat,
  Flame,
  Star,
  Wine,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

const highlights = [
  {
    icon: Flame,
    title: "Cuisine Fusion",
    desc: "La precision japonaise rencontre la passion italienne, dans un cadre unique sur les rives de Tanger.",
  },
  {
    icon: Star,
    title: "Experience Premium",
    desc: "Chaque detail est pense pour offrir une experience gastronomique inoubliable.",
  },
  {
    icon: Wine,    title: "Cave & Sommellerie",
    desc: "Une selection raffinee de vins du monde entier, curee par notre sommelier expert.",
  },
  {
    icon: ChefHat,
    title: "Chef de Renom",
    desc: "Notre equipe culinaire fusionne traditions et innovation pour creer des plats signatures.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center border-b border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-amber-700/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl" />

        <div className="container-premium text-center space-y-8 relative z-10 animate-fade-in">
          <p className="text-amber-400 tracking-[0.4em] uppercase text-sm font-medium">
            Tanger, Maroc
          </p>
          <h1 className="text-6xl md:text-8xl font-heading font-bold leading-tight">
            2R
            <span className="text-amber-400"> FUSION</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Une experience culinaire d&apos;exception ou la tradition japonaise            {" "}rencontre l&apos;art culinaire italien, face a la Mediterranee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/book">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6 text-lg rounded-xl">
                Reserver une Table
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                variant="outline"
                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 px-10 py-6 text-lg rounded-xl"
              >
                Decouvrir le Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium space-y-12">
          <div className="text-center space-y-4">
            <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">
              Pourquoi 2R Fusion
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              L&apos;Excellence a Chaque Detail
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <Card
                key={item.title}
                className="bg-stone-900 border-stone-800 hover:border-amber-500/30 transition-all duration-300 p-6 group"
              >
                <div className="space-y-4">
                  <item.icon className="h-8 w-8 text-amber-400 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-heading font-semibold text-stone-100">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="section-spacing bg-stone-900/50 border-b border-stone-800">
        <div className="container-premium">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <MapPin className="h-6 w-6 text-amber-400 mx-auto" />
              <h3 className="font-heading font-semibold text-stone-100">Emplacement</h3>
              <p className="text-stone-400 text-sm">Front de Mer, Tanger, Maroc</p>
            </div>            <div className="space-y-3">
              <Clock className="h-6 w-6 text-amber-400 mx-auto" />
              <h3 className="font-heading font-semibold text-stone-100">Horaires</h3>
              <p className="text-stone-400 text-sm">
                Dejeuner: 12h - 15h | Diner: 19h - 23h
              </p>
            </div>
            <div className="space-y-3">
              <Star className="h-6 w-6 text-amber-400 mx-auto" />
              <h3 className="font-heading font-semibold text-stone-100">Capacite</h3>
              <p className="text-stone-400 text-sm">80-150 couverts | Terrasse & Salle</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-premium text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            Pret pour une Experience
            <span className="text-amber-400"> Inoubliable</span> ?
          </h2>
          <p className="text-stone-300 max-w-xl mx-auto text-lg">
            Reservez votre table et decouvrez une cuisine fusion unique a Tanger.
          </p>
          <Link href="/book">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-lg rounded-xl group">
              Reserver Maintenant
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}