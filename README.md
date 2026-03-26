# Portfolio

Portfolio moderne et administrable construit avec Next.js, NestJS et PostgreSQL.

## Stack technique

- **Frontend:** Next.js 16 + Tailwind CSS v4 + Framer Motion
- **Backend:** NestJS 11 + TypeORM + JWT + Multer
- **Base de données:** PostgreSQL

## Structure du projet

```
Portfolio-Nourhen/
├── backend/        # API NestJS
│   ├── src/
│   │   ├── auth/           # Authentification JWT
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entities/       # Entités TypeORM
│   │   └── modules/        # Modules CRUD
│   └── uploads/            # Fichiers uploadés
├── frontend/       # Application Next.js
│   └── src/
│       ├── app/            # Pages (App Router)
│       ├── components/     # Composants réutilisables
│       └── lib/            # API client, utilitaires
└── README.md
```

## Installation locale

### Prérequis

- Node.js 20+
- PostgreSQL 14+

### 1. Base de données

```bash
createdb portfolio_nourhen
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # Modifier avec vos credentials
npm install
npm run seed           # Crée l'admin et les données par défaut
npm run start:dev      # Démarre sur http://localhost:3001
```

**Admin par défaut :** `admin@portfolio.com` / `admin123`

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev            # Démarre sur http://localhost:3000
```

## Endpoints API

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | /about | Non | Infos "À propos" |
| PUT | /about | JWT | Modifier "À propos" |
| GET | /projects | Non | Liste des projets |
| GET | /projects/:id | Non | Détail d'un projet |
| POST | /projects | JWT | Créer un projet |
| PUT | /projects/:id | JWT | Modifier un projet |
| DELETE | /projects/:id | JWT | Supprimer un projet |
| GET | /skills | Non | Liste des compétences |
| POST | /skills | JWT | Créer une compétence |
| PUT | /skills/:id | JWT | Modifier une compétence |
| DELETE | /skills/:id | JWT | Supprimer une compétence |
| GET | /videos | Non | Liste des vidéos |
| POST | /videos | JWT | Créer une vidéo |
| PUT | /videos/:id | JWT | Modifier une vidéo |
| DELETE | /videos/:id | JWT | Supprimer une vidéo |
| POST | /messages | Non | Envoyer un message |
| GET | /messages | JWT | Liste des messages |
| DELETE | /messages/:id | JWT | Supprimer un message |
| GET | /settings | Non | Paramètres du thème |
| PUT | /settings | JWT | Modifier le thème |
| POST | /auth/login | Non | Connexion admin |
| POST | /uploads | JWT | Upload de fichier |

## Déploiement

### Frontend (Vercel)

1. Connecter le repo GitHub
2. Définir `NEXT_PUBLIC_API_URL` dans les variables d'environnement
3. Déployer

### Backend (Railway)

1. Ajouter un service PostgreSQL
2. Déployer depuis GitHub avec le Dockerfile
3. Définir les variables d'environnement (voir `.env.example`)
4. Exécuter `npm run seed` pour initialiser les données
