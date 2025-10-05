import { gql } from '@apollo/client';
import { PRODUCT_WITH_USER_FRAGMENT } from '../fragments';

/**
 * Mutations GraphQL pour les produits
 */

// Mutation pour créer un produit
export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      ...ProductWithUserFields
    }
  }
  ${PRODUCT_WITH_USER_FRAGMENT}
`;

// Mutation pour modifier un produit
export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      ...ProductWithUserFields
    }
  }
  ${PRODUCT_WITH_USER_FRAGMENT}
`;

// Mutation pour supprimer un produit
export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

