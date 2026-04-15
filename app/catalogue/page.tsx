'use client';

import React, { useState, useEffect } from 'react';
import { useCars } from '@/lib/hooks/useCars';
import { FilterBar } from '@/components/catalogue/FilterBar';
import { CarGrid } from '@/components/catalogue/CarGrid';
import { getMarques } from '@/lib/firebase/firestore';
import type { FilterState } from '@/lib/types';

export default function CataloguePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'all',
    marque: '',
    carburant: '',
    prixMin: 0,
    prixMax: 1000000,
    sort: '',
  });

  const [marques, setMarques] = useState<string[]>([]);

  const { cars, loading, error } = useCars(filters);

  useEffect(() => {
    getMarques().then(setMarques);
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-display font-light text-light mb-2">Catalogue Complet</h1>
          <p className="text-gray-400">Explorez nos véhicules neufs et d'occasion</p>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          marques={marques}
          resultCount={cars.length}
        />

        {/* Grid */}
        <CarGrid cars={cars} loading={loading} error={error} />
      </div>
    </div>
  );
}
