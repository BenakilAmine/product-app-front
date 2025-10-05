import { useState, useEffect } from 'react';
import { productsService } from '../lib/services';
import type { Product } from '../types';

/**
 * Hook pour afficher un aperçu des produits (page d'accueil)
 * Utilise ProductsService pour charger un nombre limité de produits
 */

export function useProductsPreview(limit: number = 12) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        setLoading(true);
        const data = await productsService.getProductsPreview(limit);
        setProducts(data);
      } catch (error) {
        console.error('Erreur chargement aperçu:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPreview();
  }, [limit]);

  return {
    products,
    loading
  };
}