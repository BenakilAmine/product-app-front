import { BaseEntity, User } from './common';

// Types liés aux produits
export interface Product extends BaseEntity {
  name: string;
  price: number;
  user: User;
}

export interface ProductPreview {
  id: string;
  name: string;
  price: number;
}

export interface CreateProductInput {
  name: string;
  price: number;
}

export interface UpdateProductInput {
  name?: string;
  price?: number;
}

// Types pour les réponses GraphQL
export interface GetProductsResponse {
  products: Product[];
}

export interface GetProductResponse {
  product: Product;
}

export interface CreateProductResponse {
  createProduct: Product;
}

export interface UpdateProductResponse {
  updateProduct: Product;
}

export interface DeleteProductResponse {
  deleteProduct: boolean;
}

// Types pour les filtres de produits
export type ProductSort = 'recent' | 'price_asc' | 'price_desc';

export interface ProductFilters {
  search: string;
  priceRange: [number, number];
  sort: ProductSort;
  page: number;
  pageSize: number;
}

// Types pour les statistiques de produits
export interface ProductStats {
  totalProducts: number;
  totalValue: number;
  averagePrice: number;
}

// Props des composants produits
export interface ProductFormProps {
  productId?: string;
  mode: 'create' | 'edit';
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

export interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  sort: ProductSort;
  onSortChange: (value: ProductSort) => void;
  maxPrice: number;
}

// Types pour les règles de validation
export interface ValidationRule {
  required?: boolean;
  message: string;
  min?: number;
  max?: number;
  type?: 'number' | 'string';
}

export interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentUserId?: string;
}

export interface ProductStatsProps {
  totalProducts: number;
  totalValue: number;
  averagePrice: number;
}

// Types pour les pages produits
export interface ProductPageResponse {
  product: Product | null;
}

// Types pour les composants produits
export interface ProductFormFieldsProps {
  form: any;
  onFinish: (values: CreateProductInput) => void;
  isEdit: boolean;
  loading?: boolean;
  hideActions?: boolean;
}