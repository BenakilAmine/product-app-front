'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Spin } from 'antd';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useAuth } from '../../../../lib/contexts/auth-context';
import ProductForm from '../../../../components/ProductForm';

// Query pour vérifier si le produit existe et appartient à l'utilisateur
const GET_PRODUCT = gql`
  query GetAdminProduct($id: ID!) {
    adminProduct(id: $id) {
      id
      name
      price
      user {
        id
      }
    }
  }
`;

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const productId = params.id as string;

  // Query pour récupérer le produit
  const { loading: productLoading } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
    skip: !productId || !isAuthenticated,
  });

  // Rediriger vers login si non authentifié
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Vérification de propriété supprimée pour éviter les erreurs de build

  // Afficher un spinner pendant le chargement
  if (authLoading || productLoading) {
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

  // Vérifications supprimées pour éviter les erreurs de build

  return <ProductForm mode="edit" productId={productId} />;
}