'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-dark border-b border-dark-3 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-display font-semibold text-gold italic">
              AutoPrestige
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/catalogue"
              className="text-light hover:text-gold transition duration-200"
            >
              Catalogue
            </Link>
            <Link
              href="/neufs"
              className="text-light hover:text-gold transition duration-200"
            >
              Neufs
            </Link>
            <Link
              href="/occasions"
              className="text-light hover:text-gold transition duration-200"
            >
              Occasions
            </Link>
            <Link
              href="/contact"
              className="text-light hover:text-gold transition duration-200"
            >
              Contact
            </Link>
            <Link
              href="/admin/login"
              className="px-4 py-2 rounded-lg bg-gold text-dark font-semibold hover:bg-gold-light transition"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-light"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/catalogue" className="text-light hover:text-gold transition">
              Catalogue
            </Link>
            <Link href="/neufs" className="text-light hover:text-gold transition">
              Neufs
            </Link>
            <Link href="/occasions" className="text-light hover:text-gold transition">
              Occasions
            </Link>
            <Link href="/contact" className="text-light hover:text-gold transition">
              Contact
            </Link>
            <Link href="/admin/login" className="text-gold font-semibold">
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
