// Types pour les hooks partagés

// Types pour useSearch
export interface UseSearchOptions<T> {
  data: T[];
  searchFields: (keyof T)[];
  initialQuery?: string;
  caseSensitive?: boolean;
  debounceMs?: number;
}

export interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  filteredData: T[];
  clearSearch: () => void;
  isSearching: boolean;
  resultCount: number;
}

// Types pour usePagination
export interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  total?: number;
}

export interface UsePaginationReturn {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  getPaginatedData: <T>(data: T[]) => T[];
}

// Types pour useLocalStorage
export type SetValue<T> = T | ((val: T) => T);