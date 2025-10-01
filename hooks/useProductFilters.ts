import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Product, GetProductsResponse, ProductSort } from '../types';
import { useApiWithToast } from '../shared/hooks/useApiWithToast';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
    }
  }
`;

export function useProductFilters() {
  const { useQueryApi } = useApiWithToast();
  const { data, loading } = useQueryApi(GET_PRODUCTS, {
    fetchPolicy: 'cache-first',
    showErrorMessage: true,
    errorMessage: 'Erreur lors du chargement des produits'
  });

  const products = (data as GetProductsResponse)?.products || [];

  // Filtres / tri / pagination
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sort, setSort] = useState<ProductSort>('recent');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const maxPrice = useMemo(() => {
    return products.reduce((m: number, p: Product) => Math.max(m, p.price), 0) || 1000;
  }, [products]);

  useEffect(() => {
    // Ajuster la borne haute du slider selon les données
    setPriceRange(([min]) => [min, Math.max(maxPrice, 100)]);
  }, [maxPrice]);

  const filtered = useMemo(() => {
    const searchLower = search.trim().toLowerCase();
    let list = products.filter((p: Product) =>
      p.name.toLowerCase().includes(searchLower) && p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    // 'recent' suppose l'ordre par défaut renvoyé par l'API (déjà desc par date)
    return list;
  }, [products, search, priceRange, sort]);

  const total = filtered.length;
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPage(1);
    setPriceRange(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    products: paginated,
    loading,
    total,
    page,
    pageSize,
    search,
    priceRange,
    sort,
    maxPrice,
    onSearchChange: handleSearchChange,
    onPriceRangeChange: handlePriceRangeChange,
    onSortChange: setSort,
    onPageChange: handlePageChange
  };
}