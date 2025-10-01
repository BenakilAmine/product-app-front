'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Spin, Card, Result, Button } from 'antd';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useAuth } from '../../../../lib/auth-context';
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
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const productId = params.id as string;

  // Query pour récupérer le produit
  const { data, loading: productLoading, error } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
    skip: !productId || !isAuthenticated,
  });

  // Rediriger vers login si non authentifié
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Vérifier si l'utilisateur est propriétaire du produit
  useEffect(() => {
    if (data?.adminProduct && user && data.adminProduct.user.id !== user.id) {
      router.push('/');
    }
  }, [data, user, router]);

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

  // Si erreur ou produit non trouvé
  if (error || !data?.adminProduct) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Result
            status="404"
            title="Produit non trouvé"
            subTitle="Le produit que vous recherchez n'existe pas ou vous n'avez pas les droits pour le modifier."
            extra={
              <Button type="primary" onClick={() => router.push('/')}>
                Retour à la liste
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  // Si l'utilisateur n'est pas propriétaire du produit
  if (data.adminProduct.user.id !== user?.id) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Result
            status="403"
            title="Accès refusé"
            subTitle="Vous n'avez pas les droits pour modifier ce produit."
            extra={
              <Button type="primary" onClick={() => router.push('/')}>
                Retour à la liste
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  return <ProductForm mode="edit" productId={productId} />;
}