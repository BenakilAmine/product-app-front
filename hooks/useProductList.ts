import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { message } from 'antd';
import { 
  Product, 
  // GetProductsResponse, // Supprimé car non utilisé 
  // DeleteProductResponse, // Supprimé car non utilisé
  // ProductStats // Supprimé car non utilisé 
} from '../types';
import { useApiWithToast } from '../shared/hooks/useApiWithToast';

// Query pour récupérer tous les produits
const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      createdAt
      updatedAt
      user {
        id
        email
      }
    }
  }
`;

// Mutation pour supprimer un produit
const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export function useProductList() {
  const [searchText, setSearchText] = useState('');
  const { useQueryApi, useMutationApi } = useApiWithToast();

  // Query pour récupérer les produits
  const { data, loading, error, refetch } = useQueryApi(GET_PRODUCTS, {
    showErrorMessage: true,
    errorMessage: 'Erreur lors du chargement des produits'
  });
  
  const { execute: deleteProduct } = useMutationApi(DELETE_PRODUCT, {
    successMessage: 'Produit supprimé avec succès',
    errorMessage: 'Erreur lors de la suppression'
  });

  // Fonction pour supprimer un produit (variables au niveau racine + refetch)
  const handleDelete = async (id: string) => {
    await deleteProduct({ id });
    await refetch();
  };

  // Filtrage des produits par nom
  const filteredProducts = data?.products?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  // Calcul des statistiques
  const totalProducts = filteredProducts.length;
  const totalValue = filteredProducts.reduce((sum: number, product: Product) => sum + product.price, 0);
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  const stats: ProductStats = {
    totalProducts,
    totalValue,
    averagePrice
  };

  return {
    products: filteredProducts,
    loading,
    error,
    refetch,
    searchText,
    setSearchText,
    handleDelete,
    stats
  };
}