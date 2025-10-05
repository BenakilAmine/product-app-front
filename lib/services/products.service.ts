import { apolloClient } from '../apollo/client';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_ID_QUERY,
  GET_PRODUCTS_PAGINATED_QUERY,
  GET_PRODUCTS_PREVIEW_QUERY,
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
} from '../graphql';
import { Product, CreateProductInput, UpdateProductInput } from '../../types';

/**
 * Service de gestion des produits
 * 
 * Centralise toute la logique métier liée aux produits
 */

export interface ProductsPaginatedParams {
  page?: number;
  pageSize?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface ProductsPaginatedResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  maxPrice: number;
}

/**
 * Service de gestion des produits (approche hybride)
 * Objet avec fonctions pour faciliter les tests et le mocking
 */
export const productsService = {
  /**
   * Récupérer tous les produits
   */
  getAllProducts: async (): Promise<Product[]> => {
    const { data } = await apolloClient.query({
      query: GET_PRODUCTS_QUERY,
      fetchPolicy: 'network-only',
    });
    return data?.products || [];
  },

  /**
   * Récupérer un produit par ID
   */
  getProductById: async (id: string): Promise<Product | null> => {
    const { data } = await apolloClient.query({
      query: GET_PRODUCT_BY_ID_QUERY,
      variables: { id },
      fetchPolicy: 'network-only',
    });
    return data?.product || null;
  },

  /**
   * Récupérer les produits avec pagination et filtres
   */
  getProductsPaginated: async (
    params: ProductsPaginatedParams
  ): Promise<ProductsPaginatedResponse> => {
    const { data } = await apolloClient.query({
      query: GET_PRODUCTS_PAGINATED_QUERY,
      variables: params,
      fetchPolicy: 'network-only',
    });

    return {
      products: data?.productsPaginated?.products || [],
      pagination: data?.productsPaginated?.pagination || {
        total: 0,
        page: 1,
        pageSize: 12,
        totalPages: 0,
      },
      maxPrice: data?.productsPaginated?.maxPrice || 0,
    };
  },

  /**
   * Récupérer un aperçu des produits (pour la page d'accueil)
   */
  getProductsPreview: async (limit: number = 12): Promise<Product[]> => {
    const { data } = await apolloClient.query({
      query: GET_PRODUCTS_PREVIEW_QUERY,
      variables: { limit },
      fetchPolicy: 'network-only',
    });
    return data?.productsPreview || [];
  },

  /**
   * Créer un nouveau produit
   */
  createProduct: async (input: CreateProductInput): Promise<Product> => {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_PRODUCT_MUTATION,
      variables: { input },
      refetchQueries: [{ query: GET_PRODUCTS_QUERY }],
    });

    if (!data?.createProduct) {
      throw new Error('Échec de la création du produit');
    }

    return data.createProduct;
  },

  /**
   * Mettre à jour un produit
   */
  updateProduct: async (
    id: string,
    input: UpdateProductInput
  ): Promise<Product> => {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_PRODUCT_MUTATION,
      variables: { id, input },
      refetchQueries: [
        { query: GET_PRODUCTS_QUERY },
        { query: GET_PRODUCT_BY_ID_QUERY, variables: { id } },
      ],
    });

    if (!data?.updateProduct) {
      throw new Error('Échec de la mise à jour du produit');
    }

    return data.updateProduct;
  },

  /**
   * Supprimer un produit
   */
  deleteProduct: async (id: string): Promise<boolean> => {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_PRODUCT_MUTATION,
      variables: { id },
      refetchQueries: [{ query: GET_PRODUCTS_QUERY }],
    });

    return data?.deleteProduct || false;
  },

  /**
   * Calculer les statistiques des produits
   */
  calculateStats: (products: Product[]) => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + product.price, 0);
    const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;
    const minPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;
    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 0;

    return {
      totalProducts,
      totalValue,
      averagePrice,
      minPrice,
      maxPrice,
    };
  },
} as const;

