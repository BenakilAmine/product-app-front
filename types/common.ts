// Types communs utilisés dans toute l'application

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  dateRange?: [string, string];
  status?: string;
}