import { gql } from '@apollo/client';
import { METRICS_FRAGMENT, USER_FRAGMENT, PRODUCT_WITH_USER_FRAGMENT } from '../fragments';

/**
 * Queries GraphQL pour l'administration
 */

// Query pour récupérer les métriques du dashboard
export const GET_METRICS_QUERY = gql`
  query GetMetrics {
    metrics {
      ...MetricsFields
    }
  }
  ${METRICS_FRAGMENT}
`;

// Query pour récupérer tous les utilisateurs (admin)
export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      items {
        id
        email
        role
        createdAt
        updatedAt
      }
      total
      page
      pageSize
    }
  }
`;

// Query pour récupérer tous les produits (admin)
export const GET_ALL_PRODUCTS_ADMIN_QUERY = gql`
  query GetAllProductsAdmin {
    products {
      ...ProductWithUserFields
    }
  }
  ${PRODUCT_WITH_USER_FRAGMENT}
`;

