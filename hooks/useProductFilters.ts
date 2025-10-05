import { useState, useEffect, useMemo } from 'react';
import { productsService } from '../lib/services';
import type { Product } from '../types';

/**
 * Hook pour gérer les filtres, tri et pagination des produits
 * Utilise ProductsService pour charger les données
 */

type ProductSort = 'recent' | 'price_asc' | 'price_desc';

export function useProductFilters() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sort, setSort] = useState<ProductSort>('recent');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Charger les produits
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productsService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erreur chargement produits:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Prix maximum des produits
  const maxPrice = useMemo(() => {
    return products.reduce((m, p) => Math.max(m, p.price), 0) || 1000;
  }, [products]);

  // Ajuster le slider selon les données
  useEffect(() => {
    setPriceRange(([min]) => [min, Math.max(maxPrice, 100)]);
  }, [maxPrice]);

  // Filtrer et trier les produits
  const filtered = useMemo(() => {
    const searchLower = search.trim().toLowerCase();
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(searchLower) && 
      p.price >= priceRange[0] && 
      p.price <= priceRange[1]
    );
    
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    
    return list;
  }, [products, search, priceRange, sort]);

  // Pagination
  const total = filtered.length;
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Handlers
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