import { BaseEntity } from './common';

// Types pour le dashboard admin
export interface DashboardMetrics {
  totalUsers: number;
  totalProducts: number;
  productsLast7d: number;
  adminsCount: number;
}

export interface GetMetricsResponse {
  metrics: DashboardMetrics;
}

// Types pour les composants admin
export interface AdminSidebarProps {
  collapsed: boolean;
  pathname: string;
  onMenuClick: ({ key }: { key: string }) => void;
}

export interface AdminHeaderProps {
  pathname: string;
  onMenuClick: ({ key }: { key: string }) => void;
  onMobileMenuClick: () => void;
}

export interface AdminDesktopHeaderProps {
  pathname: string;
  onMenuClick: ({ key }: { key: string }) => void;
}

export interface MobileDrawerProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface MetricsCardsProps {
  metrics: DashboardMetrics | null;
}

export interface QuickActionsProps {
  metrics: DashboardMetrics | null;
}

// Types pour les éléments de menu
export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

export interface UserMenuItem {
  key?: string;
  icon?: React.ReactNode;
  label?: string;
  danger?: boolean;
  type?: 'divider';
}

// Types pour les layouts
export interface AdminLayoutProps {
  children: React.ReactNode;
}

// Types pour les actions de page
export interface PageAction {
  key: string;
  label: string;
  type: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  icon?: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
}

// Types pour la gestion des utilisateurs admin
export interface UserItem {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: {
    items: UserItem[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface UsersQueryVars {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface UsersMetricsResponse {
  metrics: {
    totalUsers: number;
    adminsCount: number;
  };
}

// Types pour les produits admin
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ProductsResponse {
  products: ProductItem[];
}

export interface ProductFilters {
  search?: string;
  priceRange?: string;
  owner?: string;
  createdDate?: string;
}

export interface AdminProductsTableProps {
  products: ProductItem[];
  loading: boolean;
  onView: (id: string) => void;
  onEdit: (product: ProductItem) => void;
  onDeleteConfirm: (product: ProductItem) => void;
}