'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = value / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center p-6"
    >
      <p className="text-5xl md:text-6xl font-display font-semibold text-gold mb-2">
        {count}
        {suffix}
      </p>
      <p className="text-gray-400 text-sm uppercase tracking-wider">{label}</p>
    </motion.div>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value={340} label="Véhicules en stock" />
          <StatCard value={26} label="Marques partenaires" />
          <StatCard value={98} label="Clients satisfaits" suffix="%" />
          <StatCard value={15} label="Années d'expérience" />
        </div>
      </div>
    </section>
  );
};
