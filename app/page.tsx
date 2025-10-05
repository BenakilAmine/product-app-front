'use client';

import React from 'react';
import Layout from '../components/layouts/MarketLayout';
import HeroSection from '../components/home/HeroSection';
import ProductGrid from '../components/home/ProductGrid';
import { useProductsPreview } from '../hooks/useProductsPreview';

export default function HomeLanding() {
  const { products, loading } = useProductsPreview();

  return (
    <Layout>
      <HeroSection />
      <ProductGrid products={products} loading={loading} />
    </Layout>
  );
}
