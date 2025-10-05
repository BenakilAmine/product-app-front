import { useState, useEffect } from 'react';
import { adminService, type Metrics } from '../lib/services';

/**
 * Hook pour gérer les métriques du dashboard admin
 * Utilise AdminService pour charger les données
 */

export function useAdminMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Charger les métriques
  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await adminService.getMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Erreur chargement métriques:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger au démarrage et à chaque refresh
  useEffect(() => {
    loadMetrics();
  }, [refreshKey]);

  // Rafraîchir les métriques
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return {
    metrics,
    loading,
    refreshKey,
    handleRefresh
  };
}