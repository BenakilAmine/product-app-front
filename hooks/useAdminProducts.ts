import { useState, useEffect } from 'react';
import { adminService, productsService } from '../lib/services';
import { useToastNotifications } from './useToastNotifications';
import type { Product } from '../types';

/**
 * Hook pour gérer les produits dans l'admin
 * Utilise ProductsService et AdminService
 */

export function useAdminProducts(skip: boolean = false) {
  const [products, setProducts] = useState<Product[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { success, error } = useToastNotifications();

  // Charger les produits
  const loadProducts = async () => {
    if (skip) return;
    try {
      setProductsLoading(true);
      const data = await adminService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Erreur chargement produits:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  // Charger les métriques
  const loadMetrics = async () => {
    if (skip) return;
    try {
      setMetricsLoading(true);
      const data = await adminService.getMetrics();
      setMetrics(data);
    } catch (err) {
      console.error('Erreur chargement métriques:', err);
    } finally {
      setMetricsLoading(false);
    }
  };

  // Charger au démarrage
  useEffect(() => {
    if (!skip) {
      loadProducts();
      loadMetrics();
    }
  }, [skip]);

  // Supprimer un produit
  const deleteProduct = async (id: string) => {
    try {
      setDeleting(true);
      await productsService.deleteProduct(id);
      success('Produit supprimé avec succès');
      await loadProducts(); // Recharger la liste
    } catch (err) {
      error('Erreur lors de la suppression');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  // Recharger tout
  const refetchAll = async () => {
    await Promise.all([loadProducts(), loadMetrics()]);
  };

  return {
    products,
    metrics,
    productsLoading,
    metricsLoading,
    deleting,
    deleteProduct,
    refetchProducts: loadProducts,
    refetchMetrics: loadMetrics,
    refetchAll,
  };
}