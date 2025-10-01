'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { useAuth } from '../../../lib/auth-context';
import ProductForm from '../../../components/ProductForm';

export default function NewProductPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Rediriger vers login si non authentifié
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Afficher un spinner pendant le chargement
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  // Si pas authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null;
  }

  return <ProductForm mode="create" />;
}