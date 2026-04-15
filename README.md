# AutoPrestige - Site de Vente de Voitures

Un site professionnel de vente de véhicules neufs et d'occasion, construit avec Next.js 14, Firebase, et Tailwind CSS.

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

1. **Cloner le repository**
```bash
cd CarSeller
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Firebase**

- Créer un projet sur [Firebase Console](https://console.firebase.google.com)
- Activer Firestore Database, Storage, et Authentication (Email/Password)
- Copier les credentials du projet
- Créer un fichier `.env.local` à la racine:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Activer Authentication dans Firebase**
- Aller à Authentication → Sign-in method
- Activer Email/Password
- Créer un compte admin manuellement dans Firebase Console

5. **Configurer les règles Firestore**

Aller à Firestore Database → Rules et ajouter:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /vehicules/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /messages/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

6. **Configurer les règles Storage**

Aller à Storage → Rules et ajouter:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /vehicules/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

7. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
autoprestige/
├── app/                    # Routes Next.js
│   ├── layout.tsx         # Layout global
│   ├── page.tsx           # Page d'accueil
│   ├── catalogue/         # Pages catalogue
│   ├── contact/           # Page contact
│   └── admin/             # Section administration
├── components/            # Composants réutilisables
│   ├── layout/           # Navbar, Footer, Sidebar
│   ├── home/             # Composants page accueil
│   ├── catalogue/        # Composants catalogue
│   ├── admin/            # Composants admin
│   └── ui/               # Composants UI (Button, Badge, Modal...)
├── lib/                   # Logique métier
│   ├── firebase/         # Configuration et services Firebase
│   ├── hooks/            # Hooks personnalisés
│   ├── types/            # Types TypeScript
│   └── utils/            # Fonctions utilitaires
├── styles/               # Styles globaux
└── public/               # Assets statiques
```

## 🎯 Pages Principales

### Publiques
- **/** - Accueil avec hero, sélection du moment, stats
- **/catalogue** - Catalogue complet avec filtres
- **/catalogue/[id]** - Détail d'un véhicule
- **/neufs** - Redirection vers catalogue (type=neuf)
- **/occasions** - Redirection vers catalogue (type=occasion)
- **/contact** - Formulaire de contact

### Administration (protégées par auth Firebase)
- **/admin/login** - Connexion admin
- **/admin/dashboard** - Tableau de bord
- **/admin/vehicules** - Inventaire complet
- **/admin/vehicules/ajouter** - Ajouter un véhicule
- **/admin/messages** - Messages de contact reçus

## 🎨 Design System

- **Couleurs**
  - Gold: `#C9A84C` (primaire, accents)
  - Dark: `#0A0A0B` (fond principal)
  - Light: `#F5F3EE` (texte clair)

- **Typographie**
  - Display: Cormorant Garamond (titres, logo)
  - Body: DM Sans (contenu)

- **Animations** - Framer Motion pour animations fluides

## 🔒 Authentification

L'authentification admin est gérée par Firebase Authentication. Les utilisateurs doivent avoir un compte créé dans la console Firebase.

Le hook `useAdmin()` gère la protétion des pages admin et la redirection vers le login si non authentifié.

## 📦 Build pour Production

```bash
npm run build
npm start
```

## 📝 Variables d'Environnement

Toutes les variables Firebase commencent par `NEXT_PUBLIC_` car elles sont utilisées côté client.

## 🐛 Troubleshooting

### Les véhicules ne s'affichent pas
- Vérifier que Firestore est activé
- Vérifier que les règles Firestore permettent la lecture
- Vérifier les credentials Firebase dans `.env.local`

### Impossible de s'authentifier
- Vérifier qu'un compte admin existe dans Firebase Console
- Vérifier que Authentication (Email/Password) est activé

### Images qui ne s'affichent pas
- Vérifier que Storage est configuré
- Vérifier les règles Storage
- Vérifier que les images ont bien été uploadées

## 📚 Documentation

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

## 📄 Licence

Propriétaire - AutoPrestige

## ✅ Checklist de Déploiement

- [ ] Firebase configuré et règles mises à jour
- [ ] Variables d'environnement définies
- [ ] Compte admin créé
- [ ] Photos de véhicules uploadées en test
- [ ] Formulaire de contact testé
- [ ] Admin dashboard testé
- [ ] Filtres catalogue testés
- [ ] Site responsive testé (mobile, tablette, desktop)
- [ ] SEO vérifié (Lighthouse)
- [ ] Déployer sur Vercel ou autre hosting
