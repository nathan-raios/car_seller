'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { ChevronDown } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark via-dark to-dark-2">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--gold) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative Line */}
      <div className="absolute top-0 right-32 w-1 h-full bg-gradient-to-b from-gold via-dark to-transparent opacity-20" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-gray-400 text-sm uppercase tracking-widest mb-4">
          Luxe & Prestige
        </motion.p>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-display italic font-light text-gold mb-6 leading-tight"
        >
          L'Art de Conduire l'Excellence
        </motion.h1>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Découvrez notre sélection exclusive de véhicules neufs et d'occasion. Chaque voiture
          raconte une histoire d'excellence et de performance.
        </motion.p>

        {/* Stats */}
        <motion.div variants={itemVariants} className="flex justify-center gap-10 md:gap-16 mb-12 text-center">
          <div>
            <p className="text-3xl font-display font-semibold text-gold">340+</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Véhicules</p>
          </div>
          <div className="w-px bg-gradient-to-b from-transparent via-gold to-transparent opacity-30" />
          <div>
            <p className="text-3xl font-display font-semibold text-gold">26</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Marques</p>
          </div>
          <div className="w-px bg-gradient-to-b from-transparent via-gold to-transparent opacity-30" />
          <div>
            <p className="text-3xl font-display font-semibold text-gold">98%</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Satisfaction</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/neufs">
            <Button size="lg" variant="primary">
              Véhicules Neufs
            </Button>
          </Link>
          <Link href="/occasions">
            <Button size="lg" variant="outline">
              Occasions Prestige
            </Button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold opacity-50"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};
