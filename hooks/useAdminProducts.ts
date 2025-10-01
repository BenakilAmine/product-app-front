import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useMemo } from 'react';

const PRODUCTS_QUERY = gql`
  query AdminProducts {
    adminProducts {
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

const METRICS_QUERY = gql`
  query Metrics {
    metrics {
      totalProducts
      productsLast7d
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export function useAdminProducts(skip: boolean) {
  const { data: productsData, loading: productsLoading, error: productsError, refetch: refetchProducts } = useQuery(PRODUCTS_QUERY, { skip });
  const { data: metricsData, loading: metricsLoading, error: metricsError, refetch: refetchMetrics } = useQuery(METRICS_QUERY, { skip });
  const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRODUCT_MUTATION);

  const products = useMemo(() => productsData?.adminProducts ?? [], [productsData]);
  const metrics = metricsData?.metrics;

  const refetchAll = async () => {
    await Promise.all([refetchProducts(), refetchMetrics()]);
  };

  return {
    products,
    metrics,
    productsLoading,
    metricsLoading,
    productsError,
    metricsError,
    deleteProduct,
    deleting,
    refetchProducts,
    refetchMetrics,
    refetchAll,
  };
}