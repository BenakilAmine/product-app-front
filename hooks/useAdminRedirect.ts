import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';

/**
 * Hook pour gérer la redirection des utilisateurs non autorisés
 * Utilisé dans toutes les pages admin
 */
export function useAdminRedirect() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'SUPER_ADMIN') {
        setRedirecting(true);
        router.replace('/');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  return {
    redirecting,
    loading,
    isAuthenticated,
    user
  };
}