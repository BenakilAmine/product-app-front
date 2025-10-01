import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { GetProductsResponse, UseProductsPreviewReturn } from '../types';
import { useApiWithToast } from '../shared/hooks/useApiWithToast';

const GET_PRODUCTS_PREVIEW = gql`
  query GetProductsPreview {
    products {
      id
      name
      price
    }
  }
`;

export function useProductsPreview(): UseProductsPreviewReturn {
  const { useQueryApi } = useApiWithToast();
  const { data, loading } = useQueryApi<GetProductsResponse>(GET_PRODUCTS_PREVIEW, {
    fetchPolicy: 'cache-first',
    showErrorMessage: true,
    errorMessage: 'Erreur lors du chargement des produits'
  });

  const preview = (data?.products || []).slice(0, 12);
  const previewList = loading
    ? Array.from({ length: 8 }).map(() => null)
    : preview;

  return {
    products: previewList,
    loading
  };
}