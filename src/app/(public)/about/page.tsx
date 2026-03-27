"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Flame, Globe, Users } from "lucide-react";

const philosophy = [
  {
    icon: Flame,
    title: "Culinary Precision",
    desc: "Every dish is a study in balance — Japanese technique meeting Italian soul, executed with meticulous attention to temperature, timing, and texture.",
  },
  {
    icon: Star,
    title: "Premium Sourcing",
    desc: "From Mediterranean bluefin tuna to A5 wagyu, from Sicilian capers to Hokkaido uni — we source only what meets our uncompromising standard.",
  },
  {
    icon: Heart,
    title: "Guest Experience",
    desc: "Hospitality is not a service, it is an art. Every guest is recognized, every preference remembered, every moment curated for lasting impression.",
  },
  {
    icon: Globe,
    title: "Innovation",
    desc: "Tradition is our foundation, not our ceiling. We push the boundaries of fusion cuisine while respecting the heritage of two great culinary traditions.",
  },
];

const spaces = [
  { name: "Main Dining Room", capacity: "80 covers", desc: "Panoramic ocean views, warm stone accents, ambient lighting" },
  { name: "Rooftop Terrace", capacity: "40 covers", desc: "Open-air dining with Mediterranean sunset vistas" },
  { name: "Private Dining Rooms", capacity: "8-20 covers", desc: "Intimate spaces for celebrations and business" },
  { name: "Chef&apos;s Counter", capacity: "8 seats", desc: "Front-row omakase experience with the head chef" },
];

const team = [
  { role: "Executive Chef", name: "Chef Takashi Moretti", desc: "Trained in Tokyo and Naples, 15 years of fusion mastery" },
  { role: "Pastry Chef", name: "Chef Amina Rossi", desc: "Award-winning desserts blending wagashi and Italian dolci" },
  { role: "Head Sommelier", name: "Youssef Marchetti", desc: "Curating pairings from Moroccan, Italian, and Japanese vineyards" },
  { role: "General Manager", name: "Karim El-Fassi", desc: "Luxury hospitality veteran, formerly at Four Seasons Marrakech" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-amber-700/5 rounded-full blur-3xl" />
        <div className="container-premium text-center space-y-8 relative z-10 animate-fade-in">
          <p className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">Our Story</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
            The Art of<br />
            <span className="text-amber-400">Confluence</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Where the ancient art of Japanese cuisine meets the passionate soul of Italian cooking — born on the golden shores of Tangier.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">The Beginning</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">A Vision Born at the Crossroads</h2>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-amber-700" />
              <p className="text-stone-300 leading-relaxed">
                2R Fusion was born from a simple yet audacious idea: what happens when two of the world&apos;s greatest culinary traditions meet on the shores of Africa&apos;s gateway to Europe?
              </p>
              <p className="text-stone-400 leading-relaxed">
                Tangier has always been a city of confluence — where continents meet, cultures merge, and the extraordinary becomes ordinary. Our founders saw in this spirit the perfect stage for a restaurant that would redefine dining in Morocco.
              </p>
              <p className="text-stone-400 leading-relaxed">
                Built as a family legacy, 2R Fusion carries the ambition of two generations. The precision of a father&apos;s business acumen paired with a son&apos;s passion for innovation — creating something that is both timeless and forward-looking.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-amber-900/20 border border-stone-700 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <p className="text-6xl font-heading font-bold text-amber-400/30">2R</p>
                  <p className="text-stone-500 text-sm tracking-widest uppercase">Est. 2026</p>
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
            <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">Our Philosophy</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Four Pillars of Excellence</h2>
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
            <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">The Venue</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">A Beachfront Masterpiece</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
            <p className="text-stone-300 max-w-2xl mx-auto">
              Perched on Tangier&apos;s golden coastline, our venue is designed to immerse you in a world where every detail — from the ocean breeze to the ambient stone textures — elevates your dining experience.
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
            <p className="text-amber-400 tracking-[0.2em] uppercase text-sm font-medium">The Team</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Masters of Their Craft</h2>
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
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Experience the Confluence</h2>
          <p className="text-stone-300 max-w-xl mx-auto">
            Reserve your table and discover a dining experience unlike anything Tangier has ever seen.
          </p>
          <Link href="/book">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6 text-lg">
              Reserve Your Table
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
