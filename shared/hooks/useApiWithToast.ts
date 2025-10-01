import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { DocumentNode } from '@apollo/client';
import { useToastNotifications } from '../../hooks/useToastNotifications';

export function useApiWithToast() {
  const [loading, setLoading] = useState(false);
  const { success, error, info, warning } = useToastNotifications();

  // Fonction pour les requêtes 
  const useQueryApi = (query: DocumentNode, options: any = {}) => {
    const {
      onSuccess,
      onError,
      showSuccessMessage = false,
      showErrorMessage = true,
      successMessage = 'Données chargées avec succès',
      errorMessage = 'Erreur lors du chargement des données',
      ...queryOptions
    } = options;

    const { data, loading: queryLoading, error: queryError, refetch } = useQuery(query, {
      ...queryOptions,
      onCompleted: (data: any) => {
        if (onSuccess) onSuccess(data);
        if (showSuccessMessage) success(successMessage);
      },
      onError: (error: any) => {
        if (onError) onError(error);
        if (showErrorMessage) error(errorMessage);
        console.error('API Error:', error);
      }
    });

    return {
      data,
      loading: queryLoading,
      error: queryError,
      refetch
    };
  };

  // Fonction pour les mutations 
    const useMutationApi = (mutation: DocumentNode, options: any = {}) => {
    const {
      onSuccess,
      onError,
      showSuccessMessage = true,
      showErrorMessage = true,
      successMessage = 'Opération réussie',
      errorMessage = 'Erreur lors de l\'opération',
      refetchQueries,
      update,
      ...mutationOptions
    } = options;

    const [executeMutation, { loading: mutationLoading, error: mutationError }] = useMutation(mutation, {
      ...mutationOptions,
      refetchQueries,
      update,
      onCompleted: (data: any) => {
        if (onSuccess) onSuccess(data);
        if (showSuccessMessage) success(successMessage);
      },
      onError: (error: any) => {
        if (onError) onError(error);
        if (showErrorMessage) error(errorMessage);
        console.error('Mutation Error:', error);
      }
    });

    const execute = useCallback(async (variables: any) => {
      setLoading(true);
      try {
        const result = await executeMutation({ variables });
        return result;
      } finally {
        setLoading(false);
      }
    }, [executeMutation]);

    return {
      execute,
      loading: mutationLoading || loading,
      error: mutationError
    };
  };

  return {
    useQueryApi,
    useMutationApi,
    loading
  };
}