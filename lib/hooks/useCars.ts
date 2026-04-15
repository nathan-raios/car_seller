'use client';

import { useState, useEffect } from 'react';
import { getVehicules } from '@/lib/firebase/firestore';
import type { Vehicule, FilterState } from '@/lib/types';

export function useCars(filters?: Partial<FilterState>) {
  const [cars, setCars] = useState<Vehicule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getVehicules(filters)
      .then(setCars)
      .catch((err) => {
        console.error('Error fetching cars:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { cars, loading, error };
}
