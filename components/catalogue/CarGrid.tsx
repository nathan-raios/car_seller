import React from 'react';
import type { SerializableVehicule } from '@/lib/types';
import { CarCard } from './CarCard';
import { SkeletonCard } from '@/components/ui';

interface CarGridProps {
  cars: SerializableVehicule[];
  loading?: boolean;
  error?: string | null;
}

export const CarGrid: React.FC<CarGridProps> = ({ cars, loading, error }) => {
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold">Erreur: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          Aucun véhicule ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
