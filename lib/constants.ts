// Constantes de l'application

export const CARBURANTS = ['Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL'] as const;

export const TRANSMISSIONS = ['Automatique', 'Manuelle'] as const;

export const STATUTS = ['disponible', 'vendu', 'réservé'] as const;

export const TYPES = ['neuf', 'occasion'] as const;

export const SUJETS_CONTACT = ['achat', 'essai', 'financement', 'autre'] as const;

export const PRIX_RANGES = [
  { label: '< 20 000 €', min: 0, max: 20000 },
  { label: '20 000 € - 50 000 €', min: 20000, max: 50000 },
  { label: '50 000 € - 100 000 €', min: 50000, max: 100000 },
  { label: '> 100 000 €', min: 100000, max: 1000000 },
] as const;

export const PAGINATION = {
  VEHICLES_PER_PAGE: 12,
  MESSAGES_PER_PAGE: 10,
  FEATURED_VEHICLES: 6,
} as const;

export const ROUTES = {
  HOME: '/',
  CATALOGUE: '/catalogue',
  NEUFS: '/neufs',
  OCCASIONS: '/occasions',
  CONTACT: '/contact',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_VEHICLES: '/admin/vehicules',
  ADMIN_ADD_VEHICLE: '/admin/vehicules/ajouter',
  ADMIN_MESSAGES: '/admin/messages',
} as const;

export const API_ROUTES = {
  CONTACT: '/api/contact',
} as const;

export const UI = {
  COLORS: {
    GOLD: '#C9A84C',
    GOLD_LIGHT: '#E8C96A',
    DARK: '#0A0A0B',
    DARK_2: '#111114',
    DARK_3: '#1A1A1F',
    DARK_4: '#222228',
    GRAY: '#888888',
    LIGHT: '#F5F3EE',
    WHITE: '#FFFFFF',
  },
  FONTS: {
    DISPLAY: 'Cormorant Garamond',
    BODY: 'DM Sans',
  },
} as const;

export const LIMITS = {
  MAX_IMAGES: 10,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_DESCRIPTION_LENGTH: 10,
} as const;
