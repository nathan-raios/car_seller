import { Timestamp } from 'firebase/firestore';

export type VehiculeType = 'neuf' | 'occasion';
export type Carburant = 'Essence' | 'Diesel' | 'Électrique' | 'Hybride' | 'GPL';
export type Transmission = 'Automatique' | 'Manuelle';
export type StatutVehicule = 'disponible' | 'vendu' | 'réservé';

export interface Vehicule {
  id: string;
  marque: string;
  modele: string;
  annee: number;
  prix: number;
  type: VehiculeType;
  carburant: Carburant;
  puissance: number;
  kilometrage: number;
  transmission: Transmission;
  couleur: string;
  description: string;
  statut: StatutVehicule;
  enPromo: boolean;
  prixBarré?: number;
  images: string[];
  imageprincipale: string;
  caracteristiques: {
    nombrePortes?: number;
    nombrePlaces?: number;
    climatisation?: boolean;
    gps?: boolean;
    bluetooth?: boolean;
    camera?: boolean;
    toit_ouvrant?: boolean;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type SerializableVehicule = Omit<Vehicule, 'createdAt' | 'updatedAt'>;

export interface Message {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  vehiculeId?: string;
  vehiculeNom?: string;
  lu: boolean;
  createdAt: Timestamp;
}

export interface AdminUser {
  uid: string;
  email: string;
  nom: string;
  role: 'super_admin' | 'editeur';
}

export interface FilterState {
  search: string;
  type: 'all' | 'neuf' | 'occasion';
  marque: string;
  carburant: string;
  prixMin: number;
  prixMax: number;
  sort: 'price-asc' | 'price-desc' | 'year-desc' | '';
}
