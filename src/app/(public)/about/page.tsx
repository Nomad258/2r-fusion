"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Flame, Globe, Users } from "lucide-react";

const philosophy = [
  {
    icon: Flame,
    title: "Précision Culinaire",
    desc: "Chaque plat est une étude d&apos;équilibre — la technique japonaise rencontre l&apos;âme italienne, exécutée avec une attention minutieuse à la température, au timing et à la texture.",
  },
  {
    icon: Star,
    title: "Sourcing Premium",
    desc: "Du thon bleu méditerranéen au wagyu A5, des câpres siciliens à l&apos;uni de Hokkaido — nous n&apos;approvisionnons que les ingrédients qui répondent à notre standard intraitable.",
  },
  {
    icon: Heart,
    title: "Expérience Clientèle",
    desc: "L&apos;hospitalité n&apos;est pas un service, c&apos;est un art. Chaque client est reconnu, chaque préférence mémorisée, chaque moment orchestré pour laisser une impression durable.",
  },
  {
    icon: Globe,
    title: "Innovation",
    desc: "La tradition est notre fondation, non notre plafond. Nous repoussons les limites de la cuisine fusion tout en respectant l&apos;héritage de deux grandes traditions culinaires.",
  },
];

const spaces = [
  { name: "Salle Principale", capacity: "80 couverts", desc: "Vue panoramique océan, accents de pierre chaude, éclairage ambiant" },
  { name: "Terrasse sur le Toit", capacity: "40 couverts", desc: "Dîner en plein air avec vues sur le coucher de soleil méditerranéen" },
  { name: "Salons Privatisés", capacity: "8-20 couverts", desc: "Espaces intimes pour célébrations et réunions d&apos;affaires" },
  { name: "Comptoir du Chef", capacity: "8 places", desc: "Expérience omakase première loge avec le chef exécutif" },
];

const team = [
  { role: "Chef Exécutif", name: "Chef Takashi Moretti", desc: "Formé à Tokyo et Naples, 15 ans de maîtrise en fusion" },
  { role: "Chef Pâtissier", name: "Chef Amina Rossi", desc: "Desserts primés alliant wagashi et dolci italiens" },
  { role: "Chef Sommelier", name: "Youssef Marchetti", desc: "Accords savants des vignobles marocains, italiens et japonais" },
  { role: "Directeur Général", name: "Karim El-Fassi", desc: "Vétéran de l&apos;hôtellerie de luxe, ancien Four Seasons Marrakech" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-amber-700/5 rounded-full blur-3xl" />
        <div className="container-premium text-center space-y-8 relative z-10 animate-fade-in">
          <p className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">Notre Histoire</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
            L&apos;Art de la<br />
            <span className="text-amber-400">Confluence</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Où l&apos;art ancien de la cuisine japonaise rencontre l&apos;âme passionnée de la cuisine italienne — née sur les rivages dorés de Tanger.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">Le Commencement</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Une Vision Née aux Carrefours</h2>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-amber-700" />
              <p className="text-stone-300 leading-relaxed">
                2R Fusion est né d&apos;une idée simple mais audacieuse : que se passe-t-il quand deux des plus grandes traditions culinaires mondiales se rencontrent sur les rivages de la porte africaine vers l&apos;Europe ?
              </p>
              <p className="text-stone-400 leading-relaxed">
                Tanger a toujours été une ville de confluence — où les continents se rencontrent, les cultures se fusionnent, et l&apos;extraordinaire devient ordinaire. Nos fondateurs y ont vu l&apos;étape parfaite pour un restaurant qui redéfinirait la gastronomie au Maroc.
              </p>
              <p className="text-stone-400 leading-relaxed">
                Bâti comme un héritage familial, 2R Fusion porte l&apos;ambition de deux générations. La précision de l&apos;acumen commercial d&apos;un père associée à la passion d&apos;un fils pour l&apos;innovation — créant quelque chose à la fois intemporel et avant-gardiste.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900/20 border border-stone-700 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <p className="text-6xl font-heading font-bold text-amber-400/30">2R</p>
                  <p className="text-stone-500 text-sm tracking-widest uppercase">Fondé 2026</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-spacing border-b border-stone-800 bg-stone-900/50">
        <div className="container-premium space-y-12">
          <div className="text-center space-y-4">
            <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">Notre Philosophie</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Quatre Piliers d&apos;Excellence</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item) => (
              <Card key={item.title} className="bg-stone-900 border-stone-800 hover:border-amber-500/30 transition-all duration-300 p-6 group">
                <div className="space-y-4">
                  <item.icon className="h-8 w-8 text-amber-400 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-heading font-semibold text-stone-100">{item.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Space */}
      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium space-y-12">
          <div className="text-center space-y-4">
            <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">Le Lieu</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Un Chef-d&apos;œuvre en Bord de Mer</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
            <p className="text-stone-300 max-w-2xl mx-auto">
              Perché sur le littoral doré de Tanger, notre restaurant est conçu pour vous immerger dans un monde où chaque détail — de la brise océanique aux textures de pierre ambiante — élève votre expérience gastronomique.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {spaces.map((space) => (
              <Card key={space.name} className="bg-stone-900 border-stone-800 p-6 hover:border-amber-500/20 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-heading font-semibold text-amber-400">{space.name}</h3>
                    <span className="text-xs text-stone-500 bg-stone-800 px-3 py-1 rounded-full">{space.capacity}</span>
                  </div>
                  <p className="text-stone-400 text-sm">{space.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-spacing border-b border-stone-800 bg-stone-900/50">
        <div className="container-premium space-y-12">
          <div className="text-center space-y-4">
            <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">L&apos;Équipe</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Maîtres de leur Métier</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.role} className="bg-stone-900 border-stone-800 overflow-hidden group hover:border-amber-500/30 transition-all">
                <div className="aspect-[3/4] bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                  <Users className="h-16 w-16 text-stone-700 group-hover:text-amber-400/20 transition-colors" />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-xs text-amber-400 uppercase tracking-wider">{member.role}</p>
                  <h3 className="text-base font-heading font-semibold text-stone-100">{member.name}</h3>
                  <p className="text-stone-400 text-xs leading-relaxed">{member.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-premium text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Vivez la Confluence</h2>
          <p className="text-stone-300 max-w-xl mx-auto">
            Réservez votre table et découvrez une expérience gastronomique sans équivalent à Tanger.
          </p>
          <Link href="/book">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6 text-lg">
              Réservez Votre Table
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}