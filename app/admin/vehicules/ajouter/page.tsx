import React from 'react';
import { CarForm } from '@/components/admin/CarForm';

export const metadata = {
  title: 'Ajouter un Véhicule — Admin',
  robots: 'noindex, nofollow',
};

export default function AdminAddCarPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-light text-light mb-2">
          Ajouter un Véhicule
        </h1>
        <p className="text-gray-400">Remplissez le formulaire pour ajouter un nouveau véhicule</p>
      </div>

      <CarForm vehiculeId="new" />
    </div>
  );
}
