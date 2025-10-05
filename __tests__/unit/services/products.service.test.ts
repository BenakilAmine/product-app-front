/**
 * Test Unitaire : productsService
 * 
 * Test simple du service de produits sans dépendances externes
 */

import { productsService } from '@/lib/services/products.service';
import { apolloClient } from '@/lib/apollo/client';

// Mock Apollo Client
jest.mock('@/lib/apollo/client', () => ({
  apolloClient: {
    query: jest.fn(),
    mutate: jest.fn(),
  },
}));

describe('productsService - Test Unitaire', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  describe('calculateStats', () => {
    it('devrait calculer les statistiques correctement', () => {
      // Arrange - Préparer les données de test
      const products = [
        { id: '1', name: 'Produit 1', price: 100 },
        { id: '2', name: 'Produit 2', price: 200 },
        { id: '3', name: 'Produit 3', price: 300 },
      ];

      // Act - Exécuter la fonction à tester
      const stats = productsService.calculateStats(products as any);

      // Assert - Vérifier les résultats
      expect(stats.totalProducts).toBe(3);
      expect(stats.totalValue).toBe(600);
      expect(stats.averagePrice).toBe(200);
      expect(stats.minPrice).toBe(100);
      expect(stats.maxPrice).toBe(300);
    });

    it('devrait retourner des valeurs par défaut pour un tableau vide', () => {
      // Arrange
      const products: any[] = [];

      // Act
      const stats = productsService.calculateStats(products);

      // Assert
      expect(stats.totalProducts).toBe(0);
      expect(stats.totalValue).toBe(0);
      expect(stats.averagePrice).toBe(0);
      expect(stats.minPrice).toBe(0);
      expect(stats.maxPrice).toBe(0);
    });
  });

  describe('getAllProducts', () => {
    it('devrait récupérer tous les produits', async () => {
      // Arrange
      const mockProducts = [
        { id: '1', name: 'Produit 1', price: 100 },
        { id: '2', name: 'Produit 2', price: 200 },
      ];

      (apolloClient.query as jest.Mock).mockResolvedValue({
        data: { products: mockProducts },
      });

      // Act
      const products = await productsService.getAllProducts();

      // Assert
      expect(products).toEqual(mockProducts);
      expect(apolloClient.query).toHaveBeenCalledTimes(1);
    });

    it('devrait retourner un tableau vide en cas d\'erreur', async () => {
      // Arrange
      (apolloClient.query as jest.Mock).mockResolvedValue({
        data: null,
      });

      // Act
      const products = await productsService.getAllProducts();

      // Assert
      expect(products).toEqual([]);
    });
  });
});

