import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT, PRODUCT_WITH_USER_FRAGMENT } from '../fragments';

/**
 * Queries GraphQL pour les produits
 */

// Query pour récupérer tous les produits
export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      ...ProductWithUserFields
    }
  }
  ${PRODUCT_WITH_USER_FRAGMENT}
`;

// Query pour récupérer un produit par ID
export const GET_PRODUCT_BY_ID_QUERY = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      ...ProductWithUserFields
    }
  }
  ${PRODUCT_WITH_USER_FRAGMENT}
`;

// Query pour récupérer les produits avec pagination et filtres
export const GET_PRODUCTS_PAGINATED_QUERY = gql`
  query GetProductsPaginated(
    $page: Int
    $pageSize: Int
    $search: String
    $minPrice: Float
    $maxPrice: Float
    $sort: String
  ) {
    productsPaginated(
      page: $page
      pageSize: $pageSize
      search: $search
      minPrice: $minPrice
      maxPrice: $maxPrice
      sort: $sort
    ) {
      products {
        ...ProductFields
      }
      pagination {
        total
        page
        pageSize
        totalPages
      }
      maxPrice
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// Query pour récupérer un aperçu des produits (home page)
export const GET_PRODUCTS_PREVIEW_QUERY = gql`
  query GetProductsPreview($limit: Int) {
    productsPreview(limit: $limit) {
      ...ProductFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;

