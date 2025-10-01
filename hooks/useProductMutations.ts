import { useMutation, useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { 
  Product, 
  // ProductFormProps, // Supprimé car non utilisé 
  CreateProductInput, 
  UpdateProductInput,
  // GetProductResponse, // Supprimé car non utilisé
  // CreateProductResponse, // Supprimé car non utilisé
  // UpdateProductResponse // Supprimé car non utilisé
} from '../types';
import { useApiWithToast } from '../shared/hooks/useApiWithToast';
import { useToastNotifications } from './useToastNotifications';

// Mutation pour créer un produit
const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;

// Mutation pour mettre à jour un produit
const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;

// Query pour récupérer un produit (pour l'édition)
const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
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

export function useProductMutations({ productId, mode }: ProductFormProps) {
  const router = useRouter();
  const { useMutationApi, useQueryApi } = useApiWithToast();
  const { 
    notifyProductCreated, 
    notifyProductUpdated, 
    notifyApiError 
  } = useToastNotifications();

  // Mutations
  const { execute: createProduct, loading: createLoading } = useMutationApi(CREATE_PRODUCT, {
    onSuccess: (data: any) => {
      notifyProductCreated(data?.createProduct?.name);
    },
    onError: (error: any) => {
      notifyApiError('Erreur lors de la création du produit');
    }
  });
  
  const { execute: updateProduct, loading: updateLoading } = useMutationApi(UPDATE_PRODUCT, {
    onSuccess: (data: any) => {
      notifyProductUpdated(data?.updateProduct?.name);
    },
    onError: (error: any) => {
      notifyApiError('Erreur lors de la modification du produit');
    }
  });

  // Query pour récupérer le produit en mode édition
  const { data: productData, loading: productLoading } = useQueryApi(GET_PRODUCT, {
    variables: { id: productId },
    skip: mode === 'create' || !productId,
    onError: (error: any) => {
      notifyApiError('Erreur lors du chargement du produit');
    }
  });

  const loading = createLoading || updateLoading || productLoading;

  // Fonction de soumission du formulaire
  const handleSubmit = async (values: CreateProductInput) => {
    if (mode === 'create') {
      await createProduct({
        input: {
          name: values.name,
          price: values.price,
        }
      });
      router.push('/admin/products');
    } else if (mode === 'edit' && productId) {
      await updateProduct({
        id: productId,
        input: {
          name: values.name,
          price: values.price,
        },
      });
      router.push('/admin/products');
    }
  };

  return {
    handleSubmit,
    loading,
    productData: productData?.product,
    isEdit: mode === 'edit'
  };
}