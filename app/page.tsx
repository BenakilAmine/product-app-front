'use client';

import React from 'react';
import { useAuth } from '../lib/auth-context';
import AmazonLayout from '../components/AmazonLayout';
import HeroSection from '../components/home/HeroSection';
import ProductGrid from '../components/home/ProductGrid';
import { useProductsPreview } from '../hooks/useProductsPreview';

export default function HomeLanding() {
  const { isAuthenticated } = useAuth();
  const { products, loading } = useProductsPreview();

  return (
    <AmazonLayout>
      <HeroSection />
      <ProductGrid products={products} loading={loading} />
    </AmazonLayout>
  );
}
