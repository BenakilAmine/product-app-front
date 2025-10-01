import { ProductPreview } from './product';

// Types pour la page d'accueil
export interface HomePageProps {
  // Props spécifiques à la page d'accueil si nécessaire
}

export interface HeroSectionProps {
  // Props spécifiques à la section hero si nécessaire
}

export interface ProductGridProps {
  products: (ProductPreview | null)[];
  loading: boolean;
}

export interface ProductGridPageProps {
  products: ProductPreview[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

// Types pour les hooks de la page d'accueil
export interface UseProductsPreviewReturn {
  products: (ProductPreview | null)[];
  loading: boolean;
}