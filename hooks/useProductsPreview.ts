import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
// import { GetProductsResponse } from '../types'; // Supprimé car non utilisé
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

export function useProductsPreview() {
  const { useQueryApi } = useApiWithToast();
  const { data, loading } = useQueryApi(GET_PRODUCTS_PREVIEW, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    showErrorMessage: true,
    errorMessage: 'Erreur lors du chargement des produits'
  });

  const preview = (((data as any)?.products) || []).slice(0, 12);
  const previewList = loading
    ? Array.from({ length: 8 }).map(() => null)
    : preview;

  return {
    products: previewList,
    loading
  };
}