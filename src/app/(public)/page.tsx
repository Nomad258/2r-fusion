"use client";

import Link from "next/link";
import { MapPin, Clock, Phone, ChevronRight, Star, Utensils, Wine } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="bg-stone-950 text-stone-100">
      {/* HERO SECTION - Full Viewport Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-stone-800">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-black" />

        {/* Decorative Gradient Orbs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-amber-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-amber-900/10 to-transparent rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 container-premium text-center space-y-12 animate-fade-in py-20 px-4">
          {/* Accent Line Above */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="text-sm uppercase tracking-widest text-amber-400">Tangier Beachfront</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl font-heading font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
                2R FUSION
              </span>
            </h1>

            {/* Tagline */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl font-light text-stone-200 leading-relaxed">
                Where Japanese Precision <br /> Meets Italian Warmth
              </p>
              <p className="text-lg text-amber-400/80 font-light tracking-wide">
                Two Culinary Currents, One Extraordinary Confluence
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
            <Link href="/book">
              <Button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/50">
                Reserve Your Table
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 px-8 py-6 text-lg rounded-lg transition-all duration-300">
                Explore Menu
                <Utensils className="ml-2" size={20} />
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-pulse">
            <svg className="w-6 h-6 mx-auto text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* CONCEPT SECTION - Two Column */}
      <section className="py-20 md:py-32 border-b border-stone-800 bg-gradient-to-b from-stone-950 to-stone-900">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <div className="inline-block mb-4">
                  <span className="text-sm uppercase tracking-widest text-amber-400">Our Concept</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-stone-100 leading-tight">
                  The Confluence
                </h2>
              </div>

              <p className="text-lg text-stone-300 leading-relaxed">
                At 2R Fusion, we celebrate the moment where two great culinary traditions merge. Japanese mastery of simplicity and precision converges with Italian passion for richness and warmth. Every dish is a meditation on balance—where the ancient art of omakase meets the soul of la bella cucina.
              </p>

              <p className="text-lg text-stone-400 leading-relaxed">
                Perched on Tangier&apos;s golden beachfront, our restaurant is more than a destination. It&apos;s a cultural crossroads where diners experience the world through the language of food.
              </p>

              <Link href="/menu" className="inline-flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-colors group">
                <span className="font-semibold">Discover Our Philosophy</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Column - Elegant Cards */}
            <div className="space-y-6">
              <Card className="bg-stone-900 border-stone-800 p-8 space-y-4 hover:border-amber-400/50 transition-all duration-300 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Star size={24} className="text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-semibold text-amber-400">Japanese Precision</h3>
                    <p className="text-stone-400">Omakase artistry, knife skills perfected over decades, and the pursuit of absolute clarity.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-stone-900 border-stone-800 p-8 space-y-4 hover:border-amber-400/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Wine size={24} className="text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-semibold text-amber-400">Italian Soul</h3>
                    <p className="text-stone-400">Passion, richness, and generous flavors that celebrate life, family, and tradition.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED MENU PREVIEW */}
      <section className="py-20 md:py-32 border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="container-premium space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="text-sm uppercase tracking-widest text-amber-400">Signature Creations</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-heading font-bold">Our Finest Dishes</h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto">Each creation is a testament to the marriage of two cuisines.</p>
          </div>

          {/* Dishes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Hokkaido Scallop Omakase", price: "680 MAD", desc: "Served with yuzu foam and crispy rice" },
              { name: "Miso-Glazed Branzino", price: "750 MAD", desc: "Mediterranean catch, Japanese technique" },
              { name: "Black Truffle Risotto", price: "620 MAD", desc: "Creamy perfection with shaved gold" },
              { name: "Fusion Nigiri Sampler", price: "890 MAD", desc: "Chef's selection of 8 premium pieces" },
            ].map((dish, i) => (
              <Card
                key={i}
                className="bg-stone-900 border-stone-800 hover:border-amber-400/50 transition-all duration-300 p-6 space-y-4 group animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Icon Placeholder */}
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-all flex items-center justify-center">
                  <Utensils size={28} className="text-amber-400" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-heading font-semibold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-stone-400">{dish.desc}</p>
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-stone-800">
                  <p className="text-2xl font-heading font-bold text-amber-400">{dish.price}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Menu CTA */}
          <div className="text-center pt-8">
            <Link href="/menu">
              <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10">
                View Complete Menu
                <ChevronRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PRIVATE DINING TEASER */}
      <section className="py-20 md:py-32 border-b border-stone-800 bg-gradient-to-b from-stone-950 to-stone-900">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Placeholder - Left */}
            <div className="relative h-96 md:h-full min-h-[400px] rounded-lg overflow-hidden order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 via-stone-800 to-stone-950 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wine size={120} className="text-amber-400/30" />
              </div>
            </div>

            {/* Content - Right */}
            <div className="space-y-8 order-1 md:order-2 animate-fade-in">
              <div>
                <span className="text-sm uppercase tracking-widest text-amber-400 block mb-4">Premium Experience</span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-stone-100 leading-tight">
                  Private Dining
                </h2>
              </div>

              <p className="text-lg text-stone-300 leading-relaxed">
                Host your most important moments in our exclusive private dining room, designed for intimacy and elegance. Personalized menus, attentive service, and an atmosphere of refined luxury await your celebration.
              </p>

              <ul className="space-y-3 text-stone-300">
                <li className="flex gap-3 items-start">
                  <ChevronRight size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                  <span>Accommodates 20-40 guests</span>
                </li>
                <li className="flex gap-3 items-start">
                  <ChevronRight size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                  <span>Customized multi-course experiences</span>
                </li>
                <li className="flex gap-3 items-start">
                  <ChevronRight size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                  <span>Premium wine & sake pairings</span>
                </li>
              </ul>

              <Link href="/private-dining">
                <Button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-semibold px-8 py-6 rounded-lg transition-all">
                  Inquire About Private Dining
                  <ChevronRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & HOURS SECTION */}
      <section className="py-20 md:py-32 border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Location Card */}
            <Card className="bg-stone-900 border-stone-800 p-8 space-y-6 hover:border-amber-400/50 transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-500/20 flex items-center justify-center">
                <MapPin size={28} className="text-amber-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-heading font-semibold text-amber-400">Location</h3>
                <p className="text-stone-300 leading-relaxed">
                  Beachfront, Tangier<br />
                  Morocco
                </p>
                <a href="tel:+212-XXX-XXXXX" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
                  <Phone size={16} />
                  <span className="text-sm">Contact us</span>
                </a>
              </div>
            </Card>

            {/* Hours Card */}
            <Card className="bg-stone-900 border-stone-800 p-8 space-y-6 hover:border-amber-400/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-500/20 flex items-center justify-center">
                <Clock size={28} className="text-amber-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-heading font-semibold text-amber-400">Hours</h3>
                <div className="text-stone-300 space-y-2 text-sm">
                  <p><span className="text-amber-400">Lunch:</span> 12:00 - 3:00 PM</p>
                  <p><span className="text-amber-400">Dinner:</span> 7:00 - 11:30 PM</p>
                  <p><span className="text-stone-500">Closed Mondays</span></p>
                </div>
              </div>
            </Card>

            {/* Reservation Card */}
            <Card className="bg-stone-900 border-stone-800 p-8 space-y-6 hover:border-amber-400/50 transition-all duration-300 animate-fade-in md:col-span-2 lg:col-span-1" style={{ animationDelay: "200ms" }}>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-500/20 flex items-center justify-center">
                <Star size={28} className="text-amber-400" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-semibold text-amber-400">Reservations</h3>
                <p className="text-sm text-stone-400">
                  We recommend reservations for our dining experience.
                </p>
                <Link href="/book">
                  <Button variant="outline" className="w-full border-amber-400/50 text-amber-400 hover:bg-amber-400/10">
                    Book a Table
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-stone-800">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-900/10 to-transparent rounded-full blur-3xl" />

        {/* Content */}
        <div className="container-premium relative z-10 text-center space-y-12 animate-fade-in">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-heading font-bold">
              <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
                Experience the Confluence
              </span>
            </h2>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
              Reserve your table and discover where two culinary worlds meet in perfect harmony.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-amber-500/50 transition-all">
                Reserve Now
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 px-8 py-6 text-lg">
                View Menu
              </Button>
            </Link>
          </div>

          <p className="text-sm text-stone-500 pt-8">
            Open daily 12:00 PM - 11:30 PM | Closed Mondays
          </p>
        </div>
      </section>
    </div>
  );
}
