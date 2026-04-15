'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Modal, Badge } from '@/components/ui';
import { Trash2, Eye } from 'lucide-react';
import { getVehicules, deleteVehicule, updateVehicule } from '@/lib/firebase/firestore';
import { deleteVehiculeImage } from '@/lib/firebase/storage';
import { Vehicule } from '@/lib/types';
import { formatPrice, formatKm } from '@/lib/utils/formatters';
import toast from 'react-hot-toast';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicule | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await getVehicules();
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
      toast.error('Erreur lors du chargement des véhicules');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedVehicle) return;

    setDeleteLoading(true);
    try {
      // Delete images
      for (const imageUrl of selectedVehicle.images) {
        try {
          await deleteVehiculeImage(imageUrl);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }

      // Delete vehicle
      await deleteVehicule(selectedVehicle.id);
      toast.success('Véhicule supprimé avec succès');
      setShowDeleteModal(false);
      setSelectedVehicle(null);
      await loadVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleChangeStatus = async (vehicle: Vehicule, newStatus: 'disponible' | 'vendu' | 'réservé') => {
    try {
      await updateVehicule(vehicle.id, { statut: newStatus });
      toast.success('Statut mis à jour');
      await loadVehicles();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-display font-light text-light mb-2">Inventaire</h1>
          <p className="text-gray-400">{vehicles.length} véhicule(s)</p>
        </div>
        <Link href="/admin/vehicules/ajouter">
          <Button variant="primary">+ Ajouter Véhicule</Button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-dark-2 rounded-xl border border-dark-3 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-3">
              <th className="px-6 py-4 text-left text-sm font-semibold text-light">Image</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light">Véhicule</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light">Année</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light">Prix</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light">Km</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-dark-3 hover:bg-dark-3/50 transition">
                <td className="px-6 py-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-dark-3">
                    <Image
                      src={vehicle.imageprincipale}
                      alt={`${vehicle.marque} ${vehicle.modele}`}
                      fill
                      className="object-cover"
                      sizes="50px"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-light">
                    {vehicle.marque} {vehicle.modele}
                  </p>
                </td>
                <td className="px-6 py-4 text-gray-400">{vehicle.annee}</td>
                <td className="px-6 py-4">
                  <Badge variant={vehicle.type === 'neuf' ? 'neuf' : 'occasion'}>
                    {vehicle.type}
                  </Badge>
                </td>
                <td className="px-6 py-4 font-semibold text-gold">
                  {formatPrice(vehicle.prix)}
                </td>
                <td className="px-6 py-4 text-gray-400">{formatKm(vehicle.kilometrage)}</td>
                <td className="px-6 py-4">
                  <select
                    value={vehicle.statut}
                    onChange={(e) =>
                      handleChangeStatus(
                        vehicle,
                        e.target.value as 'disponible' | 'vendu' | 'réservé'
                      )
                    }
                    className="px-3 py-1 bg-dark-3 text-light rounded border border-dark-4 focus:border-gold outline-none transition text-sm"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="réservé">Réservé</option>
                    <option value="vendu">Vendu</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/catalogue/${vehicle.id}`}>
                      <button className="p-2 bg-dark-3 hover:bg-dark-4 rounded transition">
                        <Eye size={16} className="text-gold" />
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 bg-dark-3 hover:bg-red-600/20 rounded transition"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedVehicle(null);
        }}
        title="Confirm la suppression"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Êtes-vous sûr de vouloir supprimer{' '}
            <span className="font-semibold">
              {selectedVehicle?.marque} {selectedVehicle?.modele}
            </span>
            ? Cette action est irréversible.
          </p>
          <div className="flex gap-4">
            <Button
              variant="danger"
              size="lg"
              loading={deleteLoading}
              onClick={handleDelete}
              className="flex-1"
            >
              Supprimer
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedVehicle(null);
              }}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
