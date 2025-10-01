import React, { useState, useMemo, useCallback } from 'react';
import { UseSearchOptions, UseSearchReturn } from '../../types/hooks';

export function useSearch<T>({
  data,
  searchFields,
  initialQuery = '',
  caseSensitive = false,
  debounceMs = 300
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQueryState] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce search query
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const filteredData = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return data;
    }

    const searchTerm = caseSensitive ? debouncedQuery : debouncedQuery.toLowerCase();

    return data.filter(item => {
      return searchFields.some(field => {
        const fieldValue = item[field];
        if (fieldValue == null) return false;
        
        const stringValue = String(fieldValue);
        const searchValue = caseSensitive ? stringValue : stringValue.toLowerCase();
        
        return searchValue.includes(searchTerm);
      });
    });
  }, [data, searchFields, debouncedQuery, caseSensitive]);

  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQueryState('');
    setDebouncedQuery('');
  }, []);

  const isSearching = query.trim().length > 0;
  const resultCount = filteredData.length;

  return {
    query,
    setQuery,
    filteredData,
    clearSearch,
    isSearching,
    resultCount
  };
}