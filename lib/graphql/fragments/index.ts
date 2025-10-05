import { gql } from '@apollo/client';

/**
 * Fragments GraphQL réutilisables
 * 
 * Les fragments permettent de réutiliser des morceaux de requêtes
 * et de maintenir une cohérence dans les données récupérées.
 */

// Fragment pour les informations de base d'un utilisateur
export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    email
    role
    createdAt
    updatedAt
  }
`;

// Fragment pour les informations de base d'un produit
export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    name
    price
    createdAt
    updatedAt
  }
`;

// Fragment pour un produit avec son utilisateur
export const PRODUCT_WITH_USER_FRAGMENT = gql`
  fragment ProductWithUserFields on Product {
    ...ProductFields
    user {
      ...UserFields
    }
  }
  ${PRODUCT_FRAGMENT}
  ${USER_FRAGMENT}
`;

// Fragment pour les métriques admin
export const METRICS_FRAGMENT = gql`
  fragment MetricsFields on Metrics {
    totalUsers
    totalProducts
    productsLast7d
    adminsCount
  }
`;

// Fragment pour les statistiques paginées
export const PAGINATION_INFO_FRAGMENT = gql`
  fragment PaginationInfoFields on PaginationInfo {
    total
    page
    pageSize
    totalPages
  }
`;

