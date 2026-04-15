# Guide de Déploiement — AutoPrestige

## Déploiement sur Vercel (Recommandé)

Vercel est l'environnement optimal pour les applications Next.js.

### Étapes:

1. **Préparer le repository**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/autoprestige.git
git push -u origin main
```

2. **Connecter à Vercel**
- Aller sur [vercel.com](https://vercel.com)
- Cliquer "Import Project"
- Sélectionner le repository GitHub
- Remplir les variables d'environnement Firebase

3. **Configurer les variables d'environnement**
Dans les paramètres du projet Vercel, ajouter:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

4. **Déployer**
- Vercel déploiera automatiquement à chaque push sur `main`

## Déploiement Auto-Hébergé

### Sur un serveur Node.js (ex: DigitalOcean, Linode)

1. **Préparer le serveur**
```bash
# SSH dans le serveur
ssh root@your_server_ip

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer Nginx (reverse proxy)
sudo apt-get install -y nginx
```

2. **Cloner et déployer le code**
```bash
cd /var/www
git clone https://github.com/your-username/autoprestige.git
cd autoprestige
npm install
```

3. **Créer le fichier `.env.local`**
```bash
nano .env.local
# Ajouter les variables Firebase
```

4. **Build de production**
```bash
npm run build
```

5. **Configurer PM2 (process manager)**
```bash
npm install -g pm2

# Démarrer l'app
pm2 start "npm start" --name autoprestige

# Sauvegarder la configuration
pm2 save

# Configurer pour démarrage au boot
pm2 startup
```

6. **Configurer Nginx**
```bash
sudo nano /etc/nginx/sites-available/default
```

Ajouter:
```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

7. **Configurer SSL (Let's Encrypt)**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

## Checklist de Production

- [ ] Vérifier que `NODE_ENV=production`
- [ ] Vérifier tous les `.env` sont présents
- [ ] Tester la build: `npm run build`
- [ ] Tester localement en prod: `npm start`
- [ ] Configurer les domaines personnalisés
- [ ] Configurer un email de contact qui fonctionne
- [ ] Sauvegarder les données Firebase régulièrement
- [ ] Configurer les alertes de monitoring
- [ ] Vérifier les règles Firestore sont sécurisées
- [ ] Configurer un CDN pour les images
- [ ] SEO: ajouter sitemap.xml et robots.txt
- [ ] Ajouter des analytics (Google Analytics, Plausible, etc.)

## Monitoring

### Logs
```bash
# Vercel: Voir les logs
vercel logs

# PM2: Voir les logs
pm2 logs autoprestige

# Tail les logs en temps réel
pm2 logs autoprestige --tail
```

### Erreurs
- Vérifier firebase.json pour les erreurs d'authentification
- Vérifier les quotas Firestore
- Monitorer les violations de règles Firestore

## Mise à Jour en Production

```bash
# Faire un commit et push
git add .
git commit -m "Update message"
git push

# Vercel déploiera automatiquement
# OU sur serveur

# SSH dans le serveur
ssh root@your_server_ip
cd /var/www/autoprestige

# Récupérer les changements
git pull

# Réinstaller les dépendances si nécessaire
npm install

# Rebuild
npm run build

# Redémarrer l'app
pm2 restart autoprestige
```

## Troubleshooting

### App démarre mais 502 errors
- Vérifier que le app écoute sur le port correct
- Vérifier la configuration Nginx
- Voir les logs PM2

### Pas d'accès à Firebase
- Vérifier que les variables d'env sont correctes
- Vérifier que les règles Firestore permettent les opérations
- Vérifier la whitelist d'IP si applicable

### Images qui ne chargent pas
- Vérifier que Storage est accessible publiquement
- Vérifier les règles Storage
- Vérifier les URLs générées sont correctes

## Backup & Disaster Recovery

1. **Sauvegarder Firestore**
```bash
# Via Firebase console → Firestore Database → Import/Export
# Ou utiliser gcloud CLI
gcloud firestore export gs://your-backup-bucket/backup-$(date +%Y%m%d)
```

2. **Sauvegarder Storage**
```bash
# Via Firebase console ou gsutil
gsutil -m cp -r gs://your-storage-bucket ./backup
```

3. **Automatiser les backups**
- Configurer Cloud Scheduler pour exécuter un backup quotidien
- Exporter vers Cloud Storage ou Drive

## Performance

- Configurer un CDN (Cloudflare, Bunny)
- Optimiser les images (Next/Image fait déjà beaucoup)
- Activer la compression gzip
- Moniteur les Core Web Vitals
- Utiliser Lighthouse pour SEO

## Sécurité

- Mettre à jour les dépendances régulièrement: `npm audit`
- Configurer HTTPS / SSL
- Ajouter les headers de sécurité
- Activer le Rate Limiting
- Utiliser les clés API restrictives pour Firebase
