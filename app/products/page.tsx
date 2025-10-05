'use client';

import React from 'react';
import Layout from '../../components/layouts/MarketLayout';
import ProductFilters from '../../components/products/ProductFilters';
import ProductGrid from '../../components/products/ProductGrid';
import { useProductFilters } from '../../hooks/useProductFilters';

export default function ProductsPage() {
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

  return (
    <Layout 
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
    </Layout>
  );
}

