# 📱 E-Commerce Front-End — Wayne Enterprize

> Application React e-commerce avec interface client et dashboard admin

**Stack :** React 19 + TypeScript + Tailwind CSS v4 + Vite + React Router DOM  
**Thème :** Wayne Enterprize (Vert #10b981 / Noir #0a0a0a / Blanc)  
**Build Status :** ✅ 0 erreur TypeScript  
**Date de mise à jour :** 29 Avril 2026

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble](#-vue-densemble)
2. [Structure des fichiers](#-structure-des-fichiers)
3. [Système de Design](#-système-de-design)
4. [Architecture Technique](#-architecture-technique)
5. [Composants Principaux](#-composants-principaux)
6. [Pages](#-pages)
7. [Contextes Globaux](#-contextes-globaux)
8. [API Client](#-api-client)
9. [Conventions de Code](#-conventions-de-code)
10. [Dépannage](#-dépannage)

---

## 🎯 VUE D'ENSEMBLE

### Fonctionnalités Principales

**Interface Client :**
- ✅ Page d'accueil avec hero + formations dynamiques
- ✅ Catalogue produits avec filtres + recherche en temps réel
- ✅ Panier d'achat avec gestion quantités
- ✅ Checkout avec paiement (Wave API à intégrer)
- ✅ Suivi des commandes avec tracker visuel
- ✅ Authentification (inscription, connexion, vérification email)
- ✅ Page contact avec formulaire
- ✅ Pages légales (Mentions, CGV, Confidentialité)

**Dashboard Admin :**
- ✅ Vue d'ensemble avec KPIs (revenus, commandes, clients, produits)
- ✅ Graphiques : Revenus mensuels, Ventes par catégorie, Top produits
- ✅ Gestion produits (CRUD complet)
- ✅ Gestion catégories (CRUD complet)
- ✅ Gestion commandes (changement statut, détails)
- ✅ Gestion clients (liste, détails)
- ✅ Export PDF du dashboard
- ✅ Thème sélectionnable (Vert/Bleu/Violet)

### Technologies Utilisées

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| React | 19 | Framework UI |
| TypeScript | 5 | Typage statique |
| Vite | 7 | Build tool |
| Tailwind CSS | 4.1.17 | Styling |
| React Router DOM | 7 | Routing |
| Recharts | 2.15 | Graphiques dashboard |
| Lucide React | latest | Icônes |
| jsPDF | 2.5.2 | Export PDF |

---

## 📁 STRUCTURE DES FICHIERS

```
E-COM_front-end2/
├── public/                         # Assets statiques
│   ├── formations.jpeg             # Image formations
│   ├── logo.jpeg                   # Logo Wayne Enterprize
│   ├── logo.svg
│   ├── photo-wayne.jpg
│   ├── robots.txt                  # SEO
│   └── sitemap.xml                 # SEO
│
├── src/
│   ├── api/                        # Clients API
│   │   ├── apiUsers.ts             # Client HTTP de base
│   │   ├── Auth/auth.api.ts        # Authentification
│   │   ├── Categorie/categorie.api.ts
│   │   ├── Chart/chart.api.ts      # Panier
│   │   ├── Commande/commande.api.ts
│   │   ├── Mail/mail.api.ts        # Contact
│   │   ├── Produit/produit.api.ts
│   │   └── User/user.api.ts
│   │
│   ├── components/
│   │   ├── Complements/            # Composants réutilisables
│   │   │   ├── Badge.tsx           # Badges colorés (success/warning/error)
│   │   │   ├── Button.tsx          # Boutons stylisés
│   │   │   ├── Card.tsx            # Cartes conteneurs
│   │   │   ├── ConfirmDialog.tsx   # Modales de confirmation
│   │   │   ├── CookieConsent.tsx   # Bannière cookies RGPD
│   │   │   ├── EmptyState.tsx      # État vide (pas de données)
│   │   │   ├── Footer.tsx          # Footer global
│   │   │   ├── Header.tsx          # Header avec recherche
│   │   │   ├── Loading.tsx         # Spinner de chargement
│   │   │   ├── Modal.tsx           # Modales génériques
│   │   │   ├── Sidebar.tsx         # Sidebar admin
│   │   │   └── Toast.tsx           # Notifications
│   │   │
│   │   ├── DashBoard/              # Composants admin
│   │   │   ├── CategoryChart.tsx   # Graphique ventes par catégorie
│   │   │   ├── CustomerTrends.tsx  # Tendances clients
│   │   │   ├── Notifications.tsx   # Notifications admin
│   │   │   ├── OrderStatus.tsx     # Statuts commandes
│   │   │   ├── QuickActions.tsx    # Actions rapides
│   │   │   ├── RevenueChart.tsx    # Graphique revenus
│   │   │   ├── StatCard.tsx        # Cartes KPI
│   │   │   ├── ThemeSelector.tsx   # Sélecteur de thème
│   │   │   ├── TopProducts.tsx     # Top 5 produits
│   │   │   └── utils/
│   │   │       ├── ExportPDF.ts    # Export dashboard en PDF
│   │   │       ├── ThemeProvider.tsx
│   │   │       └── useNotification.ts
│   │   │
│   │   ├── Produit/
│   │   │   ├── ProductBadges.tsx   # Badges produit (Nouveau/Promo)
│   │   │   ├── ProductCard.tsx     # Carte produit
│   │   │   └── ProductImage.tsx    # Image produit avec fallback
│   │   │
│   │   └── User/
│   │       ├── FormConnexion.tsx   # Formulaire connexion
│   │       └── FormInscription.tsx # Formulaire inscription
│   │
│   ├── context/                    # État global
│   │   ├── AuthContext.tsx         # Authentification (user, token, login, logout)
│   │   ├── CartContext.tsx         # Panier d'achat
│   │   └── ToastContext.tsx        # Notifications toast
│   │
│   ├── pages/                      # Pages principales
│   │   ├── Accueil.page.tsx        # Page d'accueil
│   │   ├── CGV.page.tsx            # Conditions générales de vente
│   │   ├── CommandeDetail.page.tsx # Détail d'une commande
│   │   ├── Commandes.page.tsx      # Liste commandes client
│   │   ├── Connexion.page.tsx      # Page connexion
│   │   ├── Contact.page.tsx        # Page contact
│   │   ├── Inscription.page.tsx    # Page inscription
│   │   ├── Legal.page.tsx          # Page légale générique
│   │   ├── MentionsLegales.page.tsx
│   │   ├── Panier.page.tsx         # Panier + Checkout
│   │   ├── PolitiqueConfidentialite.page.tsx
│   │   ├── ProduitDetail.page.tsx  # Détail produit
│   │   ├── Produits.page.tsx       # Catalogue produits
│   │   │
│   │   └── Admin/                  # Pages dashboard admin
│   │       ├── CategoriesAdmin.page.tsx
│   │       ├── ClientsAdmin.page.tsx
│   │       ├── CommandesAdmin.page.tsx
│   │       ├── CreateProduit.page.tsx
│   │       ├── Dashboard.page.tsx  # Vue d'ensemble
│   │       ├── EditProduit.page.tsx
│   │       └── ProduitsAdmin.page.tsx
│   │
│   ├── utils/
│   │   └── PrivateRoute.tsx        # Protection routes admin
│   │
│   ├── App.tsx                     # Composant racine + routing
│   ├── main.tsx                    # Point d'entrée
│   └── input.css                   # Styles globaux + Tailwind
│
├── .env                            # Variables d'environnement
├── .env.production                 # Variables production
├── eslint.config.js                # Configuration ESLint
├── index.html                      # HTML de base
├── package.json                    # Dépendances
├── postcss.config.js               # Configuration PostCSS
├── tailwind.config.cjs             # Configuration Tailwind
├── tsconfig.json                   # Configuration TypeScript
└── vite.config.ts                  # Configuration Vite
```

---

## 🎨 Système de Design - COULEURS & ANIMATIONS

### ⚠️ CRITIQUE: Les couleurs sont CENTRALISÉES dans `tailwind.config.cjs`

**NE PAS** modifier les couleurs dans les fichiers `.tsx` avec du CSS inline!

### Palette de couleurs définie:

| Couleur | Code | Utilisation |
|---------|------|-------------|
| **Noir** | `#0a0a0a` | Fonds, éléments sombres |
| **Slate-900** | `#0f172a` | Cartes, conteneurs |
| **Slate-500** | `#64748b` | Texte secondaire |
| **Amber-500** | `#f2b90d` | Accents, boutons primaires ✨ |
| **Emerald-500** | `#10b981` | Badges success |
| **Red-500** | `#ef4444` | Badges danger |
| **Blue-500** | `#3b82f6` | Badges info |
| **Purple-500** | `#a855f7` | Badges secondaires |

### Exemple d'utilisation Tailwind:

```tsx
// ✅ CORRECT: Utiliser les classes Tailwind
<div className="bg-slate-900/40 border border-amber-500/20 rounded-sm">
  <p className="text-amber-500 font-bold uppercase tracking-widest">Titre</p>
  <span className="text-slate-400">Texte secondaire</span>
</div>

// ❌ INCORRECT: Inline CSS
<div style={{ backgroundColor: '#0f172a' }}> {/* NE PAS FAIRE! */}
```

### Classes Tailwind clés:

```css
/* Backgrounds */
bg-black              /* #0a0a0a */
bg-slate-900/40       /* 40% opacity */
bg-gradient-to-br from-slate-900/40 to-slate-900/20

/* Text */
text-white
text-slate-400        /* Gris clair */
text-amber-500        /* Accent primaire */

/* Borders */
border-amber-500/10   /* 10% opacity */
border-amber-500/20

/* Animations */
hover:bg-amber-500/5  /* Survol léger */
hover:text-amber-500
transition-colors
backdrop-blur-md

/* Spacing */
px-6 py-4             /* Padding */
gap-6                 /* Espacement */

/* Typography */
font-bold uppercase tracking-widest  /* Style premium */
text-xs text-sm text-base
```

---

## 🛠️ Pipeline CSS - COMMENT ÇA MARCHE

```
input.css (source)
    ↓ [@tailwind directives]
vite.config.ts (bundler)
    ↓ [Orchestre le build]
postcss.config.js (processeur CSS)
    ↓ [@tailwindcss/postcss plugin]
tailwind.config.cjs (configuration design)
    ↓ [Génère les classes CSS]
CSS final compilé dans le navigateur
```

### Fichiers de configuration immuables:

- ❌ `tailwind.config.cjs` (sauf pour ajouter les **couleurs**)
- ❌ `postcss.config.js` (PostCSS v4)
- ⚠️ `input.css` (sauf pour ajouter des animations globales)

---

## 🎯 COMMENT MODIFIER LES COULEURS CORRECTEMENT

### Scénario 1: Changer la couleur ambre (accent principal)

**Fichier:** `tailwind.config.cjs` ligne ~32

```javascript
amber: {
  400: '#fbbf24',
  500: '#f2b90d',  // ← MODIFIER CETTE VALEUR
  600: '#d97706',
},
```

### Scénario 2: Ajouter une nouvelle couleur personnalisée

**Fichier:** `tailwind.config.cjs`

```javascript
theme: {
  colors: {
    // ... couleurs existantes ...
    teal: {
      50: '#f0fdfa',
      500: '#14b8a6',
      900: '#134e4a',
    }
  }
}
```

Puis l'utiliser: `<div className="text-teal-500">`

### Scénario 3: Modifier l'opacité

**NE PAS TOUCHER.** Utiliser les classes Tailwind:

```tsx
bg-amber-500/10   /* 10% opacity */
bg-amber-500/40   /* 40% opacity */
bg-amber-500      /* 100% opacity */
```

---

## 🔧 COMMENT MODIFIER LA FORME/LAYOUT SANS CASSER LE SYSTÈME

### ✅ CE QU'ON PEUT MODIFIER:

1. **Spacing:** `px-4 py-2` → `px-6 py-3`
2. **Border Radius:** `rounded-sm` → `rounded-md`
3. **Shadows:** Ajouter/retirer `shadow-lg`
4. **Animations:** Changer `transition-colors` en `transition-all`
5. **Layouts:** Modifier `flex gap-4 grid grid-cols-3`

### ❌ CE QU'ON NE DOIT PAS TOUCHER:

1. **Palette de couleurs globales** - Utiliser uniquement `tailwind.config.cjs`
2. **Les fichiers de config:** vite, postcss, tsconfig
3. **Les contextes globaux:** AuthContext, CartContext
4. **Les composants réutilisables** - Créer des sous-composants à la place

### Exemple: Modifier une page sans casser le style

**Avant:**
```tsx
<div className="grid grid-cols-4 gap-6 mb-8">
  <StatCard />
</div>
```

**Après (OK):**
```tsx
<div className="grid grid-cols-3 gap-8 mb-12">
  <StatCard />
</div>
```

**Incorrect (❌):**
```tsx
<div style={{ backgroundColor: '#ffffff' }}>
  <StatCard />
</div>
```

---

## 📦 Dépendances clés (ne pas supprimer)

```json
{
  "dependencies": {
    "react": "^18",
    "react-router-dom": "^6",        
    "lucide-react": "^latest"         
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",    
    "tailwindcss": "^4.1.17",        
    "postcss": "^8",                 
    "typescript": "^5",
    "vite": "^7"                     
  }
}
```

---

## 🚀 Démarrage du projet

```bash
npm install          # Installer les dépendances
npm run dev          # Lancer le serveur (http://localhost:5173)
npm run build        # Build production
```

---

## 🎨 Conventions de code

### Noms de fichiers:
- Pages: `NomPage.page.tsx`
- Composants: `NomComposant.tsx`
- API: `nom.api.ts`

### Pattern Tailwind courant:

```tsx
// Cards/conteneurs
bg-gradient-to-br from-slate-900/40 to-slate-900/20 backdrop-blur-md border border-amber-500/10 rounded-sm

// Boutons
bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest

// Tables
bg-black/20 border-b border-amber-500/10 hover:bg-amber-500/5 transition-colors

// Text
text-amber-500 text-xs font-bold uppercase tracking-widest
```

---

## ⚡ RÉSUMÉ - CE QU'IL FAUT RETENIR

| Besoin | Fichier | Action |
|--------|---------|--------|
| Changer couleur ambre | `tailwind.config.cjs` | Modifier hex en `amber: { 500: '...' }` |
| Ajouter animation | `input.css` | Ajouter `@keyframes` |
| Modifier layout | Page `.tsx` | Changer les classes Tailwind |
| Ajouter composant | `components/` | Créer fichier + exporter |
| Routes/pages | `App.tsx` | Ajouter `<Route path="..." />` |
| État global | `context/` | Vérifier que c'est vraiment global |

---

## 🐛 Troubleshooting

**Q: Les couleurs n'apparaissent pas?**
A: Vérifier que la classe existe dans `tailwind.config.cjs` + relancer le serveur

**Q: Les animations ne fonctionnent pas?**
A: Vérifier la syntaxe dans `@layer utilities` ou `keyframes`

**Q: Une page affiche du blanc au lieu du noir?**
A: Vérifier que `bg-black` ou `bg-slate-900` est appliqué au conteneur parent

---

**Dernière mise à jour:** Février 2026 | Projet E-Commerce Luxury Dark Theme
