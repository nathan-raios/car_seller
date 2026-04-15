'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { addVehicule } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';

const vehiculeSchema = z.object({
  marque: z.string().min(1, 'Marque requise'),
  modele: z.string().min(1, 'Modèle requis'),
  annee: z.number().min(1900).max(2100),
  prix: z.number().min(0),
  type: z.enum(['neuf', 'occasion']),
  carburant: z.enum(['Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL']),
  puissance: z.number().min(0),
  kilometrage: z.number().min(0),
  transmission: z.enum(['Automatique', 'Manuelle']),
  couleur: z.string().min(1),
  description: z.string().min(10),
  statut: z.enum(['disponible', 'vendu', 'réservé']),
  enPromo: z.boolean().default(false),
  prixBarré: z.number().optional(),
  nombrePortes: z.number().optional(),
  nombrePlaces: z.number().optional(),
  climatisation: z.boolean().default(false),
  gps: z.boolean().default(false),
  bluetooth: z.boolean().default(false),
  camera: z.boolean().default(false),
  toit_ouvrant: z.boolean().default(false),
});

type VehiculeFormData = z.infer<typeof vehiculeSchema>;

interface CarFormProps {
  vehiculeId?: string;
}

export const CarForm: React.FC<CarFormProps> = ({ vehiculeId = 'new' }) => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VehiculeFormData>({
    resolver: zodResolver(vehiculeSchema),
    defaultValues: {
      type: 'occasion',
      carburant: 'Essence',
      transmission: 'Manuelle',
      statut: 'disponible',
    },
  });

  const enPromo = watch('enPromo');

  const onSubmit = async (data: VehiculeFormData) => {
    if (images.length === 0) {
      toast.error('Veuillez ajouter au moins une image');
      return;
    }

    if (!mainImage) {
      toast.error('Veuillez sélectionner une image principale');
      return;
    }

    setIsSubmitting(true);

    try {
      await addVehicule({
        ...data,
        images,
        imageprincipale: mainImage,
        caracteristiques: {
          nombrePortes: data.nombrePortes,
          nombrePlaces: data.nombrePlaces,
          climatisation: data.climatisation,
          gps: data.gps,
          bluetooth: data.bluetooth,
          camera: data.camera,
          toit_ouvrant: data.toit_ouvrant,
        },
      });

      toast.success('Véhicule créé avec succès!');
      router.push('/admin/vehicules');
    } catch (error) {
      console.error('Error creating vehicle:', error);
      toast.error('Erreur lors de la création du véhicule');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Infos Générales */}
      <div className="bg-dark-2 p-6 rounded-xl border border-dark-3">
        <h2 className="text-2xl font-semibold text-light mb-6">Informations Générales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Marque */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Marque *</label>
            <input
              type="text"
              placeholder="BMW"
              {...register('marque')}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
            {errors.marque && (
              <p className="text-red-500 text-sm mt-1">{errors.marque.message}</p>
            )}
          </div>

          {/* Modèle */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Modèle *</label>
            <input
              type="text"
              placeholder="Série 5"
              {...register('modele')}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
            {errors.modele && (
              <p className="text-red-500 text-sm mt-1">{errors.modele.message}</p>
            )}
          </div>

          {/* Année */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Année *</label>
            <input
              type="number"
              placeholder="2024"
              {...register('annee', { valueAsNumber: true })}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
            {errors.annee && (
              <p className="text-red-500 text-sm mt-1">{errors.annee.message}</p>
            )}
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Prix (€) *</label>
            <input
              type="number"
              placeholder="62900"
              {...register('prix', { valueAsNumber: true })}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
            {errors.prix && (
              <p className="text-red-500 text-sm mt-1">{errors.prix.message}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Type *</label>
            <select
              {...register('type')}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            >
              <option value="occasion">Occasion</option>
              <option value="neuf">Neuf</option>
            </select>
          </div>

          {/* Statut */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Statut *</label>
            <select
              {...register('statut')}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            >
              <option value="disponible">Disponible</option>
              <option value="réservé">Réservé</option>
              <option value="vendu">Vendu</option>
            </select>
          </div>

          {/* Carburant */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">
              Carburant *
            </label>
            <select
              {...register('carburant')}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            >
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Électrique">Électrique</option>
              <option value="Hybride">Hybride</option>
              <option value="GPL">GPL</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">
              Transmission *
            </label>
            <select
              {...register('transmission')}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            >
              <option value="Manuelle">Manuelle</option>
              <option value="Automatique">Automatique</option>
            </select>
          </div>

          {/* Puissance */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">
              Puissance (ch) *
            </label>
            <input
              type="number"
              placeholder="320"
              {...register('puissance', { valueAsNumber: true })}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
          </div>

          {/* Kilométrage */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">
              Kilométrage (km) *
            </label>
            <input
              type="number"
              placeholder="45000"
              {...register('kilometrage', { valueAsNumber: true })}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
          </div>

          {/* Couleur */}
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Couleur *</label>
            <input
              type="text"
              placeholder="Noir"
              {...register('couleur')}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
          </div>
        </div>

        {/* Promotion */}
        <div className="flex items-center gap-4 p-4 bg-dark-3 rounded-lg">
          <input
            type="checkbox"
            id="enPromo"
            {...register('enPromo')}
            className="w-4 h-4 rounded cursor-pointer"
          />
          <label htmlFor="enPromo" className="text-light cursor-pointer flex-1">
            En promotion
          </label>
          {enPromo && (
            <div className="w-48">
              <input
                type="number"
                placeholder="Prix barré"
                {...register('prixBarré', { valueAsNumber: true })}
                className="w-full px-4 py-2 bg-dark-4 text-light rounded-lg border border-dark-2 focus:border-gold outline-none transition text-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-dark-2 p-6 rounded-xl border border-dark-3">
        <h2 className="text-2xl font-semibold text-light mb-6">Description</h2>
        <textarea
          placeholder="Description détaillée du véhicule..."
          rows={6}
          {...register('description')}
          className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Images */}
      <div className="bg-dark-2 p-6 rounded-xl border border-dark-3">
        <h2 className="text-2xl font-semibold text-light mb-6">Images *</h2>
        <ImageUploader
          vehiculeId={vehiculeId}
          onImagesChange={setImages}
          onMainImageChange={setMainImage}
        />
      </div>

      {/* Caractéristiques */}
      <div className="bg-dark-2 p-6 rounded-xl border border-dark-3">
        <h2 className="text-2xl font-semibold text-light mb-6">Équipements</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Nombre Portes</label>
            <input
              type="number"
              placeholder="4"
              {...register('nombrePortes', { valueAsNumber: true })}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-light mb-2">Nombre Places</label>
            <input
              type="number"
              placeholder="5"
              {...register('nombrePlaces', { valueAsNumber: true })}
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'climatisation', label: 'Climatisation' },
            { name: 'gps', label: 'GPS' },
            { name: 'bluetooth', label: 'Bluetooth' },
            { name: 'camera', label: 'Caméra recul' },
            { name: 'toit_ouvrant', label: 'Toit ouvrant' },
          ].map((item) => (
            <label key={item.name} className="flex items-center gap-3 p-3 bg-dark-3 rounded-lg cursor-pointer hover:bg-dark-4 transition">
              <input
                type="checkbox"
                {...register(item.name as any)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-light">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="flex-1"
        >
          Créer le véhicule
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          className="flex-1"
        >
          Annuler
        </Button>
      </div>
    </form>
  );
};
