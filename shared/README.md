# 🚀 Bibliothèque de Composants Partagés

Cette bibliothèque contient tous les composants, hooks, utilitaires et constantes réutilisables pour maintenir la cohérence et la maintenabilité du projet.

## 📁 Structure

```
shared/
├── components/
│   ├── ui/                 # Composants UI réutilisables
│   └── examples/           # Exemples d'utilisation
├── hooks/                  # Hooks personnalisés réutilisables
├── utils/                  # Utilitaires et helpers
├── constants/              # Constantes et configurations
└── index.ts               # Export centralisé
```

## 🎯 Composants UI

### LoadingState
Composant de chargement avec différents types d'affichage.

```tsx
import { LoadingState } from '../shared';

<LoadingState 
  type="skeleton" 
  rows={3} 
  columns={4} 
  message="Chargement des produits..." 
/>
```

### EmptyState
Composant d'état vide avec actions personnalisables.

```tsx
import { EmptyState } from '../shared';

<EmptyState
  type="no-data"
  title="Aucun produit"
  description="Commencez par ajouter votre premier produit"
  actions={[
    {
      label: 'Ajouter',
      onClick: () => console.log('Add'),
      type: 'primary'
    }
  ]}
/>
```

### SearchBar
Barre de recherche réutilisable avec options avancées.

```tsx
import { SearchBar } from '../shared';

<SearchBar
  value={query}
  onChange={setQuery}
  placeholder="Rechercher..."
  onClear={() => setQuery('')}
  showSearchButton
/>
```

### ActionButtons
Boutons d'action avec confirmations et icônes.

```tsx
import { ActionButtons } from '../shared';

<ActionButtons
  actions={[
    {
      key: 'edit',
      label: 'Modifier',
      icon: <EditOutlined />,
      onClick: () => console.log('Edit')
    },
    {
      key: 'delete',
      label: 'Supprimer',
      danger: true,
      confirm: {
        title: 'Confirmer la suppression',
        description: 'Cette action est irréversible'
      },
      onClick: () => console.log('Delete')
    }
  ]}
/>
```

### FormLayout
Layout standardisé pour les formulaires.

```tsx
import { FormLayout } from '../shared';

<FormLayout
  title="Nouveau produit"
  subtitle="Ajoutez un produit à votre catalogue"
  icon={<ShoppingOutlined />}
  backUrl="/products"
  actions={<Button type="primary">Sauvegarder</Button>}
>
  {/* Contenu du formulaire */}
</FormLayout>
```

## 🪝 Hooks Réutilisables

### useApi
Hook pour gérer les appels API GraphQL avec gestion d'erreurs.

```tsx
import { useApi } from '../shared';

const { useQueryApi, useMutationApi } = useApi();

// Query
const { data, loading, error, refetch } = useQueryApi(GET_PRODUCTS, {
  showSuccessMessage: false,
  errorMessage: 'Erreur de chargement'
});

// Mutation
const { execute, loading } = useMutationApi(CREATE_PRODUCT, {
  successMessage: 'Produit créé avec succès',
  onSuccess: (data) => console.log('Success:', data)
});
```

### usePagination
Hook pour gérer la pagination.

```tsx
import { usePagination } from '../shared';

const {
  page,
  pageSize,
  total,
  totalPages,
  setPage,
  nextPage,
  previousPage,
  getPaginatedData
} = usePagination({
  initialPage: 1,
  initialPageSize: 10,
  total: products.length
});

const paginatedProducts = getPaginatedData(products);
```

### useSearch
Hook pour gérer la recherche avec debounce.

```tsx
import { useSearch } from '../shared';

const { query, setQuery, filteredData, clearSearch } = useSearch({
  data: products,
  searchFields: ['name', 'description'],
  initialQuery: '',
  debounceMs: 300
});
```

### useLocalStorage
Hook pour gérer le localStorage avec synchronisation.

```tsx
import { useLocalStorage } from '../shared';

const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
```

## 🛠️ Utilitaires

### Formatters
Fonctions de formatage des données.

```tsx
import { formatters } from '../shared';

formatters.currency(1299.99); // "1 299,99 €"
formatters.date('2024-01-15'); // "15 janvier 2024"
formatters.fileSize(1024000); // "1 MB"
formatters.truncateText('Long text...', 50); // "Long text..."
```

### Validators
Fonctions de validation des formulaires.

```tsx
import { validators, validationMessages } from '../shared';

const isValidEmail = validators.email('user@example.com');
const isValidPassword = validators.strongPassword('MyPass123!');
const message = validationMessages.email; // "Veuillez saisir une adresse email valide"
```

## 🎨 Constantes

### Couleurs
Palette de couleurs centralisée.

```tsx
import { colors, semanticColors } from '../shared';

// Couleurs Amazon
colors.amazon.orange; // "#ff9900"
colors.amazon.red; // "#B12704"

// Couleurs sémantiques
semanticColors.text.primary; // "#131921"
semanticColors.status.success; // "#00a650"
```

### Tailles
Constantes de tailles et espacements.

```tsx
import { sizes } from '../shared';

sizes.spacing[4]; // "16px"
sizes.fontSize.lg; // "18px"
sizes.borderRadius.lg; // "8px"
sizes.breakpoints.md; // "768px"
```

### Messages
Messages centralisés pour l'internationalisation.

```tsx
import { messages } from '../shared';

messages.success.created; // "Créé avec succès"
messages.error.network; // "Erreur de connexion réseau"
messages.validation.required; // "Ce champ est obligatoire"
```

## 📖 Exemples d'Utilisation

### Composant de Liste Refactorisé

```tsx
import { 
  LoadingState, 
  EmptyState, 
  SearchBar, 
  ActionButtons,
  useApi,
  usePagination,
  useSearch,
  messages 
} from '../shared';

export default function ProductList() {
  const { useQueryApi } = useApi();
  const { data, loading, error, refetch } = useQueryApi(GET_PRODUCTS);
  
  const { query, setQuery, filteredData } = useSearch({
    data: data?.products || [],
    searchFields: ['name', 'price']
  });

  const { page, pageSize, total, getPaginatedData } = usePagination({
    total: filteredData.length
  });

  if (loading) return <LoadingState type="skeleton" />;
  if (error) return <EmptyState type="error" onRetry={refetch} />;
  if (filteredData.length === 0) return <EmptyState type="no-data" />;

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />
      <ActionButtons actions={actions} />
      <ProductTable products={getPaginatedData(filteredData)} />
    </div>
  );
}
```

## ✅ Avantages

1. **🔄 Réutilisabilité** : Composants et hooks réutilisables dans tout le projet
2. **🎯 Cohérence** : Design et comportements uniformes
3. **🛠️ Maintenabilité** : Modifications centralisées
4. **📚 Documentation** : Code auto-documenté et exemples
5. **🚀 Productivité** : Développement plus rapide
6. **🧪 Testabilité** : Composants isolés et testables
7. **♿ Accessibilité** : Composants accessibles par défaut
8. **📱 Responsive** : Design adaptatif intégré

## 🚀 Utilisation

```tsx
// Import centralisé
import { 
  LoadingState, 
  EmptyState, 
  SearchBar, 
  ActionButtons,
  useApi,
  usePagination,
  useSearch,
  formatters,
  validators,
  colors,
  messages 
} from '../shared';

// Utilisation
const MyComponent = () => {
  const { useQueryApi } = useApi();
  // ... logique du composant
};
```

Cette bibliothèque partagée permet de maintenir un code propre, cohérent et maintenable tout en accélérant le développement ! 🎉