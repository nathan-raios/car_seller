'use client';

import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { FilterState, Carburant } from '@/lib/types';
import { Button } from '@/components/ui';

const CARBURANTS: Carburant[] = ['Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL'];

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  marques: string[];
  resultCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  marques,
  resultCount,
}) => {
  const handleTypeChange = (type: FilterState['type']) => {
    onFilterChange({ ...filters, type });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange({ ...filters, search });
  };

  const handleMarqueChange = (marque: string) => {
    onFilterChange({ ...filters, marque });
  };

  const handleCarburantChange = (carburant: string) => {
    onFilterChange({ ...filters, carburant });
  };

  const handlePrixChange = (minMax: 'min' | 'max', value: number) => {
    if (minMax === 'min') {
      onFilterChange({ ...filters, prixMin: value });
    } else {
      onFilterChange({ ...filters, prixMax: value });
    }
  };

  const handleSortChange = (sort: FilterState['sort']) => {
    onFilterChange({ ...filters, sort });
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      type: 'all',
      marque: '',
      carburant: '',
      prixMin: 0,
      prixMax: 1000000,
      sort: '',
    });
  };

  return (
    <div className="bg-dark-3 rounded-xl p-6 mb-8">
      {/* Onglets Type */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'neuf', 'occasion'].map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type as FilterState['type'])}
            className={`px-4 py-2 rounded-lg transition font-semibold ${
              filters.type === type
                ? 'bg-gold text-dark'
                : 'bg-dark-4 text-light hover:bg-dark-3'
            }`}
          >
            {type === 'all' ? 'Tous' : type === 'neuf' ? 'Neufs' : 'Occasions'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Marque ou modèle..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-4 text-light rounded-lg border border-dark-2 focus:border-gold outline-none transition"
          />
        </div>

        {/* Marque */}
        <select
          value={filters.marque}
          onChange={(e) => handleMarqueChange(e.target.value)}
          className="px-4 py-2 bg-dark-4 text-light rounded-lg border border-dark-2 focus:border-gold outline-none transition"
        >
          <option value="">Toutes les marques</option>
          {marques.map((marque) => (
            <option key={marque} value={marque}>
              {marque}
            </option>
          ))}
        </select>

        {/* Carburant */}
        <select
          value={filters.carburant}
          onChange={(e) => handleCarburantChange(e.target.value)}
          className="px-4 py-2 bg-dark-4 text-light rounded-lg border border-dark-2 focus:border-gold outline-none transition"
        >
          <option value="">Tous les carburants</option>
          {CARBURANTS.map((carburant) => (
            <option key={carburant} value={carburant}>
              {carburant}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => handleSortChange(e.target.value as FilterState['sort'])}
          className="px-4 py-2 bg-dark-4 text-light rounded-lg border border-dark-2 focus:border-gold outline-none transition"
        >
          <option value="">Trier par...</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="year-desc">Année récente</option>
        </select>
      </div>

      {/* Prix Range - Simpler version */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Prix minimum</label>
          <div className="flex">
            <input
              type="number"
              placeholder="0"
              value={filters.prixMin}
              onChange={(e) => handlePrixChange('min', parseInt(e.target.value) || 0)}
              className="flex-1 px-4 py-2 bg-dark-4 text-light rounded-l-lg border border-dark-2 focus:border-gold outline-none transition"
            />
            <span className="px-3 py-2 bg-dark-4 border border-l-0 border-dark-2 text-gray-400">€</span>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">Prix maximum</label>
          <div className="flex">
            <input
              type="number"
              placeholder="1000000"
              value={filters.prixMax}
              onChange={(e) => handlePrixChange('max', parseInt(e.target.value) || 1000000)}
              className="flex-1 px-4 py-2 bg-dark-4 text-light rounded-l-lg border border-dark-2 focus:border-gold outline-none transition"
            />
            <span className="px-3 py-2 bg-dark-4 border border-l-0 border-dark-2 text-gray-400">€</span>
          </div>
        </div>
      </div>

      {/* Reset Button & Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-gold">{resultCount}</span> résultat(s) trouvé(s)
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Réinitialiser
        </Button>
      </div>
    </div>
  );
};
