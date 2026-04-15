// Données de test pour le seed de Firestore
// Utilisez ce fichier pour remplir la base de données avec des données de test

export const seedVehicles = [
  {
    marque: 'BMW',
    modele: 'Série 5',
    annee: 2024,
    prix: 62900,
    type: 'neuf' as const,
    carburant: 'Diesel' as const,
    puissance: 320,
    kilometrage: 0,
    transmission: 'Automatique' as const,
    couleur: 'Noir Métallisé',
    description:
      'Luxe et performance réunies. La Série 5 offre un confort d\'exception avec une technologie de pointe. Équipée de tous les systèmes de sécurité modernes.',
    statut: 'disponible' as const,
    enPromo: false,
    images: ['https://via.placeholder.com/800x600?text=BMW+Serie+5'],
    imageprincipale: 'https://via.placeholder.com/800x600?text=BMW+Serie+5',
    caracteristiques: {
      nombrePortes: 4,
      nombrePlaces: 5,
      climatisation: true,
      gps: true,
      bluetooth: true,
      camera: true,
      toit_ouvrant: true,
    },
  },
  {
    marque: 'Mercedes-Benz',
    modele: 'C 63 AMG',
    annee: 2022,
    prix: 45000,
    type: 'occasion' as const,
    carburant: 'Essence' as const,
    puissance: 523,
    kilometrage: 28000,
    transmission: 'Automatique' as const,
    couleur: 'Gris Titane',
    description:
      'Performance et élégance. La C 63 AMG combine puissance moteur et design sportif. Entretien suivi, très bon état général.',
    statut: 'disponible' as const,
    enPromo: true,
    prixBarré: 52000,
    images: ['https://via.placeholder.com/800x600?text=Mercedes+C63+AMG'],
    imageprincipale: 'https://via.placeholder.com/800x600?text=Mercedes+C63+AMG',
    caracteristiques: {
      nombrePortes: 4,
      nombrePlaces: 5,
      climatisation: true,
      gps: true,
      bluetooth: true,
      camera: true,
      toit_ouvrant: false,
    },
  },
  {
    marque: 'Audi',
    modele: 'A6',
    annee: 2023,
    prix: 58000,
    type: 'neuf' as const,
    carburant: 'Essence' as const,
    puissance: 340,
    kilometrage: 0,
    transmission: 'Automatique' as const,
    couleur: 'Blanc Glacier',
    description:
      'L\'Audi A6 combine technologie de pointe et confort ultime. Moteur performant, consommation optimisée, équipements premium.',
    statut: 'disponible' as const,
    enPromo: false,
    images: ['https://via.placeholder.com/800x600?text=Audi+A6'],
    imageprincipale: 'https://via.placeholder.com/800x600?text=Audi+A6',
    caracteristiques: {
      nombrePortes: 4,
      nombrePlaces: 5,
      climatisation: true,
      gps: true,
      bluetooth: true,
      camera: true,
      toit_ouvrant: true,
    },
  },
  {
    marque: 'Tesla',
    modele: 'Model S',
    annee: 2023,
    prix: 85000,
    type: 'neuf' as const,
    carburant: 'Électrique' as const,
    puissance: 450,
    kilometrage: 0,
    transmission: 'Automatique' as const,
    couleur: 'Blanc Nacré',
    description:
      'Véhicule électrique de luxe. Autonomie exceptionnelle, accélération impressionnante, technologie autopilot incluse.',
    statut: 'disponible' as const,
    enPromo: false,
    images: ['https://via.placeholder.com/800x600?text=Tesla+Model+S'],
    imageprincipale: 'https://via.placeholder.com/800x600?text=Tesla+Model+S',
    caracteristiques: {
      nombrePortes: 4,
      nombrePlaces: 5,
      climatisation: true,
      gps: true,
      bluetooth: true,
      camera: true,
      toit_ouvrant: false,
    },
  },
  {
    marque: 'Porsche',
    modele: 'Cayenne',
    annee: 2021,
    prix: 72000,
    type: 'occasion' as const,
    carburant: 'Essence' as const,
    puissance: 400,
    kilometrage: 35000,
    transmission: 'Automatique' as const,
    couleur: 'Noir Profond',
    description:
      'SUV sportif et luxueux. Porsche Cayenne offre puissance et confort. Entretien Porsche complet, garantie restante.',
    statut: 'disponible' as const,
    enPromo: false,
    images: ['https://via.placeholder.com/800x600?text=Porsche+Cayenne'],
    imageprincipale: 'https://via.placeholder.com/800x600?text=Porsche+Cayenne',
    caracteristiques: {
      nombrePortes: 4,
      nombrePlaces: 5,
      climatisation: true,
      gps: true,
      bluetooth: true,
      camera: true,
      toit_ouvrant: true,
    },
  },
  {
    marque: 'Lamborghini',
    modele: 'Huracán',
    annee: 2020,
    prix: 185000,
    type: 'occasion' as const,
    carburant: 'Essence' as const,
    puissance: 640,
    kilometrage: 8000,
    transmission: 'Automatique' as const,
    couleur: 'Rouge Fuoco',
    description:
      'Supercar emblématique. Lamborghini Huracán exceptionnel, très peu kilométré. Son et performances inégalées.',
    statut: 'réservé' as const,
    enPromo: false,
    images: ['https://via.placeholder.com/800x600?text=Lamborghini+Huracan'],
    imageprincipale: 'https://via.placeholder.com/800x600?text=Lamborghini+Huracan',
    caracteristiques: {
      nombrePortes: 2,
      nombrePlaces: 2,
      climatisation: true,
      gps: true,
      bluetooth: true,
      camera: true,
      toit_ouvrant: false,
    },
  },
];

export const seedMessages = [
  {
    nom: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    telephone: '+33612345678',
    sujet: 'achat',
    message:
      'Bonjour, je suis intéressé par le BMW Série 5. Pourriez-vous m\'envoyer plus de détails et les conditions de financement?',
    vehiculeId: 'bmw-serie-5',
    vehiculeNom: 'BMW Série 5',
    lu: false,
  },
  {
    nom: 'Marie Leclerc',
    email: 'marie.leclerc@example.com',
    telephone: '+33698765432',
    sujet: 'essai',
    message:
      'Bonjour, j\'aimerais tester le Mercedes C 63 AMG. Quels sont vos créneaux disponibles cette semaine?',
    vehiculeId: 'mercedes-c63',
    vehiculeNom: 'Mercedes-Benz C 63 AMG',
    lu: true,
  },
];

/**
 * Script pour ajouter ces données à Firestore
 * 
 * Usage:
 * 1. Importez les fonctions depuis lib/firebase/firestore
 * 2. Appelez ce script une fois au démarrage de l'app
 * 
 * import { addVehicule, addMessage } from '@/lib/firebase/firestore';
 * import { seedVehicles, seedMessages } from '@/lib/seed-data';
 * 
 * async function seedDatabase() {
 *   for (const vehicle of seedVehicles) {
 *     await addVehicule(vehicle);
 *   }
 *   for (const message of seedMessages) {
 *     await addMessage(message);
 *   }
 * }
 * 
 * // Call seedDatabase() from your admin page or CLI script
 */
