import Link from 'next/link';
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-2 border-t border-dark-3 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-display font-semibold text-gold italic mb-4">
              AutoPrestige
            </h3>
            <p className="text-gray-400 text-sm">
              Votre partenaire de confiance pour l'acquisition de véhicules neufs et
              d'occasion de prestige.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-light mb-4">Navigation</h4>
            <div className="space-y-2 text-sm">
              <Link href="/catalogue" className="text-gray-400 hover:text-gold transition">
                Catalogue
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-gold transition block">
                Contact
              </Link>
              <Link href="/admin/login" className="text-gray-400 hover:text-gold transition block">
                Admin
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-light mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400 hover:text-gold transition">
                <Phone size={16} />
                <a href="tel:+33123456789">+33 (0)1 23 45 67 89</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-gold transition">
                <Mail size={16} />
                <a href="mailto:contact@autoprestige.fr">contact@autoprestige.fr</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-light mb-4">Horaires</h4>
            <div className="space-y-1 text-sm text-gray-400">
              <p>Lun - Ven: 9:00 - 18:00</p>
              <p>Sam: 10:00 - 17:00</p>
              <p>Dim: Fermé</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-3 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 AutoPrestige. Tous droits réservés.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-500">
              <Link href="#" className="hover:text-gold transition">
                Politique de confidentialité
              </Link>
              <Link href="#" className="hover:text-gold transition">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
