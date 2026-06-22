# La Maison du Parfum

La Maison du Parfum est une application e-commerce développée avec Next.js, dédiée à la vente de parfums haut de gamme.  
Le projet met l'accent sur une expérience utilisateur immersive et une identité visuelle inspirée des maisons de luxe.

---

## Aperçu

Le site se compose de deux parties principales :
- Une boutique en ligne permettant de découvrir et acheter des parfums
- Un dashboard administrateur pour gérer les produits et les commandes

---

## Fonctionnalités

### Boutique
- Catalogue de parfums
- Page détail produit
- Ajout au panier
- Gestion du panier
- Expérience utilisateur fluide et immersive

### Dashboard (admin)
- Vue d'ensemble (statistiques, commandes récentes, revenus)
- Gestion des produits (CRUD)
- Suivi des commandes

---

## Direction artistique

L'identité visuelle repose sur une esthétique luxe et éditoriale.

### Palette
- Bordeaux profond
- Noir intense
- Ivoire texturé
- Rose poudré
- Doré chaud (`#D4AF37`)

### Design
- Typographie serif élégante
- Espaces aérés
- Lignes dorées décoratives
- Animations subtiles
- Composition inspirée des magazines de luxe

---

## Stack technique

| Catégorie | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript |
| Styles | Tailwind CSS |
| Composants UI | shadcn/ui |
| ORM | Prisma |
| Base de données | PostgreSQL |
| Authentification | NextAuth v5 (Auth.js) |
| Validation | Zod + React Hook Form |
| Paiement | Stripe + PayPal |
| Emails | Resend |
| Upload | Uploadthing |
| Data fetching | TanStack Query |
| Graphiques | Recharts |
| Animations | Framer Motion |

---

## Dépendances & Librairies

### Core
```bash
next, react, react-dom, typescript
```

### UI & Styles
```bash
tailwindcss, shadcn/ui, lucide-react
framer-motion
class-variance-authority, clsx, tailwind-merge
```

### Base de données & Auth
```bash
prisma, @prisma/client
next-auth@beta, @auth/prisma-adapter
bcryptjs
```

### Validation & Formulaires
```bash
zod
react-hook-form, @hookform/resolvers
```

### Paiement
```bash
stripe, @stripe/stripe-js
@paypal/react-paypal-js
```

### Data fetching
```bash
@tanstack/react-query
```

### Graphiques & Dashboard
```bash
recharts
```

### Upload & Emails
```bash
uploadthing, @uploadthing/react
resend
```

### Utilitaires
```bash
sharp
date-fns
@t3-oss/env-nextjs
```

---

## Structure du projet

la-maison-du-parfum/

│

├── public/

│   ├── images/

│   │   ├── products/

│   │   ├── hero/

│   │   └── brand/

│   ├── icons/

│   └── favicon.ico

│

├── prisma/

│   └── schema.prisma

│

├── src/

│   ├── app/

│   │   ├── page.tsx

│   │   ├── layout.tsx

│   │   ├── loading.tsx

│   │   ├── not-found.tsx

│   │   ├── globals.css

│   │   ├── shop/

│   │   │   └── page.tsx

│   │   ├── product/

│   │   │   └── [id]/

│   │   │       └── page.tsx

│   │   ├── cart/

│   │   │   └── page.tsx

│   │   ├── dashboard/

│   │   │   ├── page.tsx

│   │   │   ├── products/

│   │   │   │   └── page.tsx

│   │   │   └── orders/

│   │   │       └── page.tsx

│   │   └── api/

│   │       ├── products/

│   │       ├── orders/

│   │       └── auth/

│   │

│   ├── components/

│   │   ├── shop/

│   │   ├── dashboard/

│   │   ├── shared/

│   │   └── ui/

│   │

│   ├── hooks/

│   │   ├── use-mobile.ts

│   │   └── use-cart.ts

│   │

│   ├── lib/

│   │   ├── auth.ts

│   │   ├── prisma.ts

│   │   ├── query-client.ts

│   │   ├── utils.ts

│   │   └── constants.ts

│   │

│   ├── services/

│   │   ├── product.service.ts

│   │   ├── order.service.ts

│   │   └── cart.service.ts

│   │

│   ├── schemas/

│   │   ├── product.schema.ts

│   │   ├── order.schema.ts

│   │   └── user.schema.ts

│   │

│   ├── types/

│   │   ├── product.ts

│   │   ├── order.ts

│   │   └── cart.ts

│   │

│   └── styles/

│       └── animations.css

│

├── middleware.ts

├── .env.local

├── next.config.ts

├── tsconfig.json

├── package.json

├── README.md

└── LICENSE



---

## Installation

```bash
# Cloner le repo
git clone https://github.com/ton-user/la-maison-du-parfum.git

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Générer le client Prisma
npx prisma generate

# Lancer les migrations
npx prisma migrate dev

# Lancer le serveur de développement
npm run dev
```