import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getVehiculeById } from '@/lib/firebase/firestore';
import { Button, Badge } from '@/components/ui';
import { formatPrice, formatKm } from '@/lib/utils/formatters';
import {
  Zap,
  Gauge,
  Fuel,
  Wind,
  Navigation,
  Bluetooth,
  Video,
  Sun,
  ArrowLeft,
} from 'lucide-react';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const car = await getVehiculeById(params.id);

  if (!car) {
    return {
      title: 'Véhicule non trouvé',
      description: 'Le véhicule recherché n\'existe pas.',
    };
  }

  return {
    title: `${car.marque} ${car.modele} ${car.annee} — AutoPrestige`,
    description: car.description,
    openGraph: {
      title: `${car.marque} ${car.modele} — AutoPrestige`,
      description: car.description,
      images: [car.imageprincipale],
    },
  };
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await getVehiculeById(params.id);

  if (!car) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display text-light mb-4">Véhicule non trouvé</h1>
          <Link href="/catalogue">
            <Button>Retour au catalogue</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/catalogue" className="flex items-center gap-2 text-gold hover:text-gold-light transition mb-8">
          <ArrowLeft size={20} />
          <span>Retour au catalogue</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="relative aspect-square bg-dark-3 rounded-xl overflow-hidden mb-6">
              <Image
                src={car.imageprincipale}
                alt={`${car.marque} ${car.modele}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4">
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
            </div>

            {/* Additional Images */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square bg-dark-3 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                  >
                    <Image
                      src={img}
                      alt={`${car.marque} ${car.modele} ${idx}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <p className="text-gold text-sm uppercase tracking-widest font-semibold mb-2">
                {car.marque}
              </p>
              <h1 className="text-5xl font-display font-semibold text-light mb-4">
                {car.modele}
              </h1>
              <p className="text-gray-400 leading-relaxed mb-6">{car.description}</p>
            </div>

            <div className="border-t border-dark-3 pt-8 mb-8">
              {/* Price */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Prix</p>
                <p className="text-5xl font-display font-semibold text-gold">
                  {formatPrice(car.prix)}
                </p>
                {car.prixBarré && (
                  <p className="text-gray-500 line-through text-lg">
                    {formatPrice(car.prixBarré)}
                  </p>
                )}
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-dark-3 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={18} className="text-gold" />
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Puissance</p>
                  </div>
                  <p className="text-2xl font-semibold text-light">{car.puissance} ch</p>
                </div>

                <div className="bg-dark-3 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge size={18} className="text-gold" />
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Kilométrage</p>
                  </div>
                  <p className="text-2xl font-semibold text-light">{formatKm(car.kilometrage)}</p>
                </div>

                <div className="bg-dark-3 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Fuel size={18} className="text-gold" />
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Carburant</p>
                  </div>
                  <p className="text-2xl font-semibold text-light">{car.carburant}</p>
                </div>

                <div className="bg-dark-3 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-[18px] h-[18px] text-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 3h10m0 0v2m0-2H5v2m0-2a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V3z" />
                    </svg>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      {car.transmission}
                    </p>
                  </div>
                  <p className="text-2xl font-semibold text-light">{car.transmission[0]}</p>
                </div>
              </div>

              {/* All Specs */}
              <div className="grid grid-cols-2 gap-4 py-6 border-t border-dark-3">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Année</p>
                  <p className="text-light font-semibold">{car.annee}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Couleur</p>
                  <p className="text-light font-semibold">{car.couleur}</p>
                </div>
                {car.caracteristiques.nombrePortes && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Portes</p>
                    <p className="text-light font-semibold">{car.caracteristiques.nombrePortes}</p>
                  </div>
                )}
                {car.caracteristiques.nombrePlaces && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Places</p>
                    <p className="text-light font-semibold">{car.caracteristiques.nombrePlaces}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {Object.values(car.caracteristiques).some((v) => v) && (
              <div className="mb-8">
                <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-4">
                  Équipements
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {car.caracteristiques.climatisation && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Wind size={18} className="text-gold" />
                      <span>Climatisation</span>
                    </div>
                  )}
                  {car.caracteristiques.gps && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Navigation size={18} className="text-gold" />
                      <span>GPS</span>
                    </div>
                  )}
                  {car.caracteristiques.bluetooth && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Bluetooth size={18} className="text-gold" />
                      <span>Bluetooth</span>
                    </div>
                  )}
                  {car.caracteristiques.camera && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Video size={18} className="text-gold" />
                      <span>Caméra recul</span>
                    </div>
                  )}
                  {car.caracteristiques.toit_ouvrant && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Sun size={18} className="text-gold" />
                      <span>Toit ouvrant</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <Link href={`/contact?vehiculeId=${car.id}`} className="w-full">
                <Button size="lg" variant="primary" className="w-full">
                  Contacter pour cet essai
                </Button>
              </Link>
              <Link href="/contact" className="w-full">
                <Button size="lg" variant="outline" className="w-full">
                  Demander un essai routier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
