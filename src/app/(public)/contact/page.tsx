import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Contact - 2R FUSION",
  description: "Contactez 2R Fusion. Localisation, heures d&apos;ouverture et informations de contact.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="container-premium text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-heading font-bold">Nous Contacter</h1>
            <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto" />
          </div>
        </div>
      </section>

      <section className="section-spacing border-b border-stone-800">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-stone-900 border-stone-800 hover:border-gold-500/50 transition-all duration-300 p-6 space-y-4 animate-fade-in">
              <Phone className="text-gold-500" size={32} />
              <h3 className="text-lg font-heading font-semibold text-gold-400">Téléphone</h3>
              <a href="tel:+212123456789" className="text-gold-500 hover:text-gold-400 transition-colors">
                +212 (0) 539 XXXXXX
              </a>
            </Card>

            <Card className="bg-stone-900 border-stone-800 hover:border-gold-500/50 transition-all duration-300 p-6 space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <Mail className="text-gold-500" size={32} />
              <h3 className="text-lg font-heading font-semibold text-gold-400">Email</h3>
              <a href="mailto:reservations@2rfusion.ma" className="text-gold-500 hover:text-gold-400 transition-colors">
                reservations@2rfusion.ma
              </a>
            </Card>

            <Card className="bg-stone-900 border-stone-800 hover:border-gold-500/50 transition-all duration-300 p-6 space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Mail className="text-gold-500" size={32} />
              <h3 className="text-lg font-heading font-semibold text-gold-400">Événements</h3>
              <a href="mailto:events@2rfusion.ma" className="text-gold-500 hover:text-gold-400 transition-colors">
                events@2rfusion.ma
              </a>
            </Card>

            <Card className="bg-stone-900 border-stone-800 hover:border-gold-500/50 transition-all duration-300 p-6 space-y-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <MapPin className="text-gold-500" size={32} />
              <h3 className="text-lg font-heading font-semibold text-gold-400">Localisation</h3>
              <address className="text-gold-500 not-italic">Tanger, Maroc</address>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900/30 to-stone-950">
        <div className="container-premium max-w-2xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-heading font-bold">Heures d&apos;Ouverture</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto" />
          </div>

          <Card className="bg-stone-900 border-stone-800 p-8 space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="text-gold-500 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-gold-400 mb-4">Horaires Réguliers</h3>
                <div className="space-y-2 text-stone-300">
                  <div className="flex justify-between">
                    <span>Lundi - Dimanche</span>
                    <span className="font-medium">19h00 - 23h00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-800 pt-6">
              <p className="text-sm text-stone-400">
                Nous acceptons les clients sans réservation dans la limite des places disponibles. Les réservations sont fortement recommandées.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-spacing border-b border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900/40 to-stone-950">
        <div className="container-premium space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-heading font-bold">Nous Suivre</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto" />
          </div>

          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="https://instagram.com/2rfusion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-stone-900 border border-stone-800 hover:border-gold-500/50 transition-all duration-300"
            >
              <Send className="text-gold-500" size={20} />
              <span className="font-medium">Instagram</span>
            </a>

            <a
              href="https://facebook.com/2rfusion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-stone-900 border border-stone-800 hover:border-gold-500/50 transition-all duration-300"
            >
              <Send className="text-gold-500" size={20} />
              <span className="font-medium">Facebook</span>
            </a>

            <a
              href="https://twitter.com/2rfusion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-stone-900 border border-stone-800 hover:border-gold-500/50 transition-all duration-300"
            >
              <Send className="text-gold-500" size={20} />
              <span className="font-medium">Twitter/X</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-premium text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold">Prêt à Nous Visiter ?</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-gold inline-flex items-center justify-center gap-2">
              Faire une Réservation
            </Link>
            <a href="mailto:info@2rfusion.ma" className="btn-outline inline-flex items-center justify-center gap-2">
              Nous Envoyer un Message
            </a>
          </div>
        </div>
      </section>
    </>
  );
}