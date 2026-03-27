"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 border-t border-stone-800/50">
      <div className="container-premium py-16 md:py-24">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-heading font-bold text-gold-500 mb-4">
              2R FUSION
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              La gastronomie premium où la précision japonaise rencontre la chaleur italienne.
            </p>
            <p className="text-xs text-stone-500 italic">
              Créé avec amour à Tanger
            </p>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 className="text-sm font-semibold text-stone-100 mb-4 uppercase tracking-wide">
              Nous Visiter
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Plage de Tanger</p>
                  <p>Tanger, Maroc</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-stone-300 mb-2">Horaires</p>
                <p>Déjeuner : 12:00 - 15:00</p>
                <p>Dîner : 19:00 - 23:00</p>
                <p className="text-xs text-stone-500 mt-1">Fermé le lundi</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-stone-100 mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <a
                href="tel:+212"
                className="flex items-center gap-3 hover:text-gold-500 transition-colors"
              >
                <Phone size={18} className="text-gold-500 flex-shrink-0" />
                <span>+212 (0) 5 39 XX XX XX</span>
              </a>
              <a
                href="mailto:hello@2rfusion.com"
                className="flex items-center gap-3 hover:text-gold-500 transition-colors"
              >
                <Mail size={18} className="text-gold-500 flex-shrink-0" />
                <span>hello@2rfusion.com</span>
              </a>
            </div>
          </div>

          {/* Social & Links */}
          <div>
            <h4 className="text-sm font-semibold text-stone-100 mb-4 uppercase tracking-wide">
              Nous Suivre
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="p-2 bg-stone-800 hover:bg-gold-500 text-stone-400 hover:text-stone-950 rounded-lg transition-all duration-200"
                aria-label="Instagram"
              >
                <Send size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-stone-800 hover:bg-gold-500 text-stone-400 hover:text-stone-950 rounded-lg transition-all duration-200"
                aria-label="TikTok"
              >
                <Send size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-stone-800 hover:bg-gold-500 text-stone-400 hover:text-stone-950 rounded-lg transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Send size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800/50 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>&copy; {currentYear} 2R Fusion. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold-500 transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-gold-500 transition-colors">
              Conditions d&apos;Utilisation
            </Link>
            <Link href="/cookies" className="hover:text-gold-500 transition-colors">
              Politique de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}