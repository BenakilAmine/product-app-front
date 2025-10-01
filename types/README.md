# 📁 Structure des Types et Interfaces

Ce dossier contient tous les types et interfaces TypeScript organisés par domaine fonctionnel.

## 🗂️ Organisation

### `common.ts`
Types communs utilisés dans toute l'application :
- `BaseEntity` - Interface de base pour toutes les entités
- `User` - Interface utilisateur
- `ApiResponse<T>` - Interface pour les réponses API
- `PaginationParams` - Paramètres de pagination
- `SortParams` - Paramètres de tri
- `FilterParams` - Paramètres de filtrage

### `product.ts`
Types liés aux produits :
- `Product` - Interface produit complète
- `ProductPreview` - Interface produit simplifiée
- `CreateProductInput` - Input pour créer un produit
- `UpdateProductInput` - Input pour modifier un produit
- `ProductSort` - Types de tri des produits
- `ProductFilters` - Interface des filtres
- `ProductStats` - Interface des statistiques
- Props des composants produits

### `admin.ts`
Types liés à l'administration :
- `DashboardMetrics` - Métriques du dashboard
- `AdminSidebarProps` - Props de la sidebar admin
- `AdminHeaderProps` - Props de l'en-tête admin
- `MetricsCardsProps` - Props des cartes de métriques
- `QuickActionsProps` - Props des actions rapides
- `MenuItem` - Interface des éléments de menu
- `UserMenuItem` - Interface des éléments de menu utilisateur
- `PageAction` - Interface des actions de page

### `auth.ts`
Types liés à l'authentification :
- `AuthContextType` - Interface du contexte d'authentification
- `LoginCredentials` - Credentials de connexion
- `RegisterCredentials` - Credentials d'inscription
- Types des réponses GraphQL d'authentification

### `home.ts`
Types liés à la page d'accueil :
- `HomePageProps` - Props de la page d'accueil
- `HeroSectionProps` - Props de la section hero
- `ProductGridProps` - Props de la grille de produits
- `UseProductsPreviewReturn` - Retour du hook useProductsPreview

## 🚀 Utilisation

### Import centralisé
```typescript
import { Product, User, DashboardMetrics } from '../types';
```

### Import spécifique
```typescript
import { Product } from '../types/product';
import { User } from '../types/common';
```

## ✅ Avantages

1. **Centralisation** : Tous les types au même endroit
2. **Réutilisabilité** : Types partagés entre composants
3. **Maintenabilité** : Modifications centralisées
4. **Type Safety** : Meilleure sécurité des types
5. **Documentation** : Types auto-documentés
6. **Évolutivité** : Facile d'ajouter de nouveaux types

## 📋 Bonnes pratiques

1. **Nommage** : Utiliser des noms descriptifs et cohérents
2. **Groupement** : Grouper les types par domaine fonctionnel
3. **Exports** : Exporter via `index.ts` pour un import centralisé
4. **Documentation** : Commenter les interfaces complexes
5. **Évolution** : Ajouter de nouveaux types plutôt que de modifier les existants