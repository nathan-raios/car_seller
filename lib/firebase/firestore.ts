import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { Vehicule, Message, FilterState } from '../types';

// ─── VÉHICULES ───────────────────────────────────────────

export async function getVehicules(filters?: Partial<FilterState>): Promise<Vehicule[]> {
  let q = query(collection(db, 'vehicules'), orderBy('createdAt', 'desc'));

  if (filters?.type && filters.type !== 'all') {
    q = query(q, where('type', '==', filters.type));
  }

  if (filters?.marque && filters.marque !== '') {
    q = query(q, where('marque', '==', filters.marque));
  }

  const snap = await getDocs(q);
  let vehicules = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Vehicule));

  // Client-side filtering
  if (filters?.carburant && filters.carburant !== '') {
    vehicules = vehicules.filter((v) => v.carburant === filters.carburant);
  }

  const prixMin = filters?.prixMin;
  const prixMax = filters?.prixMax;

  if (prixMin != null) {
    vehicules = vehicules.filter((v) => v.prix >= prixMin);
  }

  if (prixMax != null) {
    vehicules = vehicules.filter((v) => v.prix <= prixMax);
  }

  if (filters?.search && filters.search !== '') {
    const search = filters.search.toLowerCase();
    vehicules = vehicules.filter(
      (v) =>
        v.marque.toLowerCase().includes(search) ||
        v.modele.toLowerCase().includes(search)
    );
  }

  // Sorting
  if (filters?.sort === 'price-asc') {
    vehicules.sort((a, b) => a.prix - b.prix);
  } else if (filters?.sort === 'price-desc') {
    vehicules.sort((a, b) => b.prix - a.prix);
  } else if (filters?.sort === 'year-desc') {
    vehicules.sort((a, b) => b.annee - a.annee);
  }

  return vehicules;
}

export async function getVehiculeById(id: string): Promise<Vehicule | null> {
  const snap = await getDoc(doc(db, 'vehicules', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Vehicule;
}

export async function addVehicule(
  data: Omit<Vehicule, 'id' | 'createdAt' | 'updatedAt'>
) {
  return await addDoc(collection(db, 'vehicules'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateVehicule(id: string, data: Partial<Vehicule>) {
  return await updateDoc(doc(db, 'vehicules', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteVehicule(id: string) {
  return await deleteDoc(doc(db, 'vehicules', id));
}

export async function getFeaturedVehicules(limit_n = 6): Promise<Vehicule[]> {
  try {
    const q = query(
      collection(db, 'vehicules'),
      where('statut', '==', 'disponible'),
      orderBy('createdAt', 'desc'),
      limit(limit_n)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Vehicule));
  } catch (error) {
    console.error('Error fetching featured vehicles:', error);
    // Fallback: get all vehicles and filter client-side
    const allVehicles = await getVehicules();
    return allVehicles
      .filter(v => v.statut === 'disponible')
      .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
      .slice(0, limit_n);
  }
}

export async function getMarques(): Promise<string[]> {
  const snap = await getDocs(collection(db, 'vehicules'));
  const marques = new Set(snap.docs.map((d) => d.data().marque));
  return Array.from(marques).sort();
}

// ─── MESSAGES ────────────────────────────────────────────

export async function addMessage(
  data: Omit<Message, 'id' | 'createdAt' | 'lu'>
) {
  return await addDoc(collection(db, 'messages'), {
    ...data,
    lu: false,
    createdAt: serverTimestamp(),
  });
}

export async function getMessages(): Promise<Message[]> {
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message));
}

export async function markMessageAsRead(id: string) {
  return await updateDoc(doc(db, 'messages', id), { lu: true });
}

export async function deleteMessage(id: string) {
  return await deleteDoc(doc(db, 'messages', id));
}
