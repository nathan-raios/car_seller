'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { SerializableVehicule } from '@/lib/types';
import { CarGrid } from '@/components/catalogue/CarGrid';

interface FeaturedCarsClientProps {
  cars: SerializableVehicule[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const FeaturedCarsClient: React.FC<FeaturedCarsClientProps> = ({ cars }) => {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <motion.p variants={itemVariants} className="text-gold text-sm uppercase tracking-widest mb-2">
            Nos Sélections
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-light text-light mb-4">
            Sélection du Moment
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-gold to-transparent" />
        </motion.div>

        {/* Grid */}
        <CarGrid cars={cars} />

        {/* View All Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-6 py-3 text-gold hover:text-gold-light transition font-semibold"
          >
            Voir tous les véhicules
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
