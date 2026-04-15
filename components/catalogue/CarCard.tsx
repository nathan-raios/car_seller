'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui';
import type { SerializableVehicule } from '@/lib/types';
import { formatPrice, formatKm } from '@/lib/utils/formatters';

interface CarCardProps {
  car: SerializableVehicule;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link href={`/catalogue/${car.id}`}>
      <div className="bg-dark-3 rounded-xl overflow-hidden h-full hover:shadow-2xl transition-all duration-300 hover:scale-102 hover:-translate-y-1.5 cursor-pointer group">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-dark-4">
          <Image
            src={car.imageprincipale}
            alt={`${car.marque} ${car.modele}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant={
                car.statut === 'vendu'
                  ? 'vendu'
                  : car.enPromo
                    ? 'promo'
                    : car.type === 'neuf'
                      ? 'neuf'
                      : 'occasion'
              }
            >
              {car.statut === 'vendu' ? 'Vendu' : car.enPromo ? '-20%' : car.type === 'neuf' ? 'Neuf' : 'Occasion'}
            </Badge>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-dark/60 hover:bg-dark transition"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-gold text-gold' : 'text-light'}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Marque */}
          <p className="text-xs text-gold uppercase tracking-widest font-semibold mb-1">
            {car.marque}
          </p>

          {/* Modèle */}
          <h3 className="text-lg font-display font-semibold text-light mb-2 line-clamp-1">
            {car.modele}
          </h3>

          {/* Meta Info */}
          <div className="flex gap-3 text-xs text-gray-400 mb-3">
            <span>{car.annee}</span>
            <span>•</span>
            <span>{car.carburant}</span>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 pb-3 border-b border-dark-4 mb-3">
            <div>
              <p className="font-semibold text-light">{car.puissance}</p>
              <p>ch</p>
            </div>
            <div>
              <p className="font-semibold text-light">{car.transmission[0]}</p>
              <p>Boîte</p>
            </div>
            <div>
              <p className="font-semibold text-light">{formatKm(car.kilometrage)}</p>
              {car.kilometrage > 0 && <p>km</p>}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-display font-semibold text-gold">
                {formatPrice(car.prix)}
              </p>
              {car.prixBarré && (
                <p className="text-xs text-gray-500 line-through">
                  {formatPrice(car.prixBarré)}
                </p>
              )}
            </div>
            <div className="text-gold text-lg group-hover:translate-x-1 transition">→</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
