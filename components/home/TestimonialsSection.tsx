'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  title: string;
  text: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, title, text, rating }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-dark-3 p-8 rounded-xl"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={18} className="fill-gold text-gold" />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-300 mb-6 italic leading-relaxed">"{text}"</p>

      {/* Author */}
      <div>
        <p className="font-semibold text-light">{name}</p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection: React.FC = () => {
  const testimonials: TestimonialProps[] = [
    {
      name: 'Jean Dupont',
      title: 'PDG, Tech Solutions',
      text: "Un service impeccable et une sélection exceptionnelle de véhicules. Je n'aurais pas pu trouver mieux.",
      rating: 5,
    },
    {
      name: 'Marie Leclerc',
      title: 'Directrice Financière',
      text: "L'équipe AutoPrestige m'a accompagnée tout au long de mon achat. Très professionnels et attentifs.",
      rating: 5,
    },
    {
      name: 'Pierre Moreau',
      title: 'Entrepreneur',
      text: "Qualité supérieure, prix justes et une transparence remarquable. Je recommande vivement!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-2">Témoignages</p>
          <h2 className="text-4xl md:text-5xl font-display font-light text-light">
            Nos Clients Satisfaits
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
