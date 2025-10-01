import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { GetMetricsResponse } from '../types';
import { useApiWithToast } from '../shared/hooks/useApiWithToast';

const METRICS_QUERY = gql`
  query Metrics {
    metrics {
      totalUsers
      totalProducts
      productsLast7d
      adminsCount
    }
  }
`;

export function useAdminMetrics() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { useQueryApi } = useApiWithToast();

  const { data, loading, error, refetch } = useQueryApi(METRICS_QUERY, {
    fetchPolicy: 'cache-and-network',
    showErrorMessage: true,
    errorMessage: 'Erreur lors du chargement des métriques',
    onError: (error: any) => {
      console.error('❌ Erreur query metrics:', error);
      console.error('❌ Détails erreur:', error.message);
      console.error('❌ Network error:', error.networkError);
      console.error('❌ GraphQL errors:', error.graphQLErrors);
    },
    onCompleted: (data: any) => {
      console.log('✅ Query metrics réussie:', data);
    }
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  return {
    metrics: (data as GetMetricsResponse)?.metrics ?? null,
    loading,
    error,
    refreshKey,
    handleRefresh
  };
}