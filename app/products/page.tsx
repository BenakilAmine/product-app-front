'use client';

import React from 'react';
import { useAuth } from '../../lib/auth-context';
import AmazonLayout from '../../components/MarketLayout';
import ProductFilters from '../../components/products/ProductFilters';
import ProductGrid from '../../components/products/ProductGrid';
import { useProductFilters } from '../../hooks/useProductFilters';
// import { ProductGridPageProps } from '../../types'; // Supprimé car non utilisé
import { LoadingState } from '../../shared';

export default function ProductsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const {
    products,
    loading,
    total,
    page,
    pageSize,
    search,
    priceRange,
    sort,
    maxPrice,
    onSearchChange,
    onPriceRangeChange,
    onSortChange,
    onPageChange
  } = useProductFilters();

  if (loading) {
    return <LoadingState type="spinner" message="Chargement des produits..." />;
  }

  return (
    <AmazonLayout 
      searchValue={search}
      onSearchChange={onSearchChange}
    >
      <ProductFilters
        search={search}
        onSearchChange={onSearchChange}
        priceRange={priceRange}
        onPriceRangeChange={onPriceRangeChange}
        sort={sort}
        onSortChange={onSortChange}
        maxPrice={maxPrice}
      />

      <div style={{ padding: '0 16px 16px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1200 }}>
          <ProductGrid
            products={products}
            loading={loading}
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </AmazonLayout>
  );
}

