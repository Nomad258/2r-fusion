"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const categories = ["All", "Interior", "Cuisine", "Atmosphere", "Events"];

const galleryItems = [
  { id: 1, title: "The Main Dining Room", category: "Interior", gradient: "from-stone-800 via-amber-900/30 to-stone-900", aspect: "aspect-[4/5]" },
  { id: 2, title: "Wagyu Tataki", category: "Cuisine", gradient: "from-amber-900/40 via-stone-800 to-stone-900", aspect: "aspect-square" },
  { id: 3, title: "Sunset Over the Terrace", category: "Atmosphere", gradient: "from-orange-900/30 via-stone-800 to-amber-900/20", aspect: "aspect-[4/5]" },
  { id: 4, title: "Private Celebration", category: "Events", gradient: "from-stone-800 via-stone-700 to-amber-900/20", aspect: "aspect-square" },
  { id: 5, title: "Truffle Risotto al Dente", category: "Cuisine", gradient: "from-amber-800/30 via-stone-900 to-stone-800", aspect: "aspect-square" },
  { id: 6, title: "Ocean View Lounge", category: "Interior", gradient: "from-stone-900 via-cyan-900/10 to-stone-800", aspect: "aspect-[4/5]" },
  { id: 7, title: "Omakase Platter", category: "Cuisine", gradient: "from-red-900/20 via-stone-900 to-amber-900/10", aspect: "aspect-[4/5]" },
  { id: 8, title: "Candlelit Evening", category: "Atmosphere", gradient: "from-amber-900/40 via-orange-900/20 to-stone-900", aspect: "aspect-square" },
  { id: 9, title: "The Zen Room", category: "Interior", gradient: "from-stone-700 via-stone-900 to-stone-800", aspect: "aspect-square" },
  { id: 10, title: "Corporate Dinner", category: "Events", gradient: "from-stone-800 via-amber-800/20 to-stone-900", aspect: "aspect-[4/5]" },
  { id: 11, title: "Miso-Glazed Branzino", category: "Cuisine", gradient: "from-stone-900 via-amber-900/20 to-stone-800", aspect: "aspect-square" },
  { id: 12, title: "Golden Hour", category: "Atmosphere", gradient: "from-yellow-900/20 via-amber-900/30 to-stone-900", aspect: "aspect-[4/5]" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? galleryItems : galleryItems.filter((item) => item.category === active);

  return (
    <>
      {/* Hero */}
      <section className="relative section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 overflow-hidden">
        <div className="absolute top-10 right-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="container-premium text-center space-y-8 relative z-10 animate-fade-in">
          <p className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">Visual Journey</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold">
            Our <span className="text-amber-400">Gallery</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          <p className="text-lg text-stone-300 max-w-2xl mx-auto">
            A glimpse into the world of 2R Fusion — where every space, every plate, and every moment is designed to inspire.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium space-y-10">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                  active === cat
                    ? "bg-amber-500 text-black"
                    : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-500/50 hover:text-amber-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((item) => (
              <Card
                key={item.id}
                className={`break-inside-avoid bg-gradient-to-br ${item.gradient} border-stone-800 hover:border-amber-500/40 transition-all duration-500 overflow-hidden group cursor-pointer`}
              >
                <div className={`${item.aspect} relative flex items-center justify-center`}>
                  <Camera className="h-12 w-12 text-stone-600 group-hover:text-amber-400/30 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">{item.category}</p>
                    <p className="text-sm font-heading font-semibold text-white">{item.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-premium text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Experience It <span className="text-amber-400">In Person</span>
          </h2>
          <p className="text-stone-300 max-w-xl mx-auto">
            Photos capture moments. A visit creates memories. Reserve your table and step into the world of 2R Fusion.
          </p>
          <Link href="/book">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6 text-lg">
              Book a Table
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
