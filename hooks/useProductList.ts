import { useState, useEffect } from 'react';
import { productsService } from '../lib/services';
import { useToastNotifications } from './useToastNotifications';
import type { Product } from '../types';

/**
 * Hook pour gérer la liste des produits avec recherche et suppression
 * Utilise ProductsService pour toute la logique métier
 */

export interface ProductStats {
  totalProducts: number;
  totalValue: number;
  averagePrice: number;
}

export function useProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const { success, error } = useToastNotifications();

  // Charger les produits
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAllProducts();
      setProducts(data);
    } catch (err) {
      error('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Charger au démarrage
  useEffect(() => {
    loadProducts();
  }, []);

  // Supprimer un produit
  const handleDelete = async (id: string) => {
    try {
      await productsService.deleteProduct(id);
      success('Produit supprimé avec succès');
      await loadProducts(); // Recharger la liste
    } catch (err) {
      error('Erreur lors de la suppression');
      console.error(err);
    }
  };

  // Filtrage par nom
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Calcul des statistiques
  const stats: ProductStats = productsService.calculateStats(filteredProducts);

  return {
    products: filteredProducts,
    loading,
    searchText,
    setSearchText,
    handleDelete,
    refetch: loadProducts,
    stats
  };
}