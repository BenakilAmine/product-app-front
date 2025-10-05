/**
 * Test d'Intégration : useProductList
 * 
 * Test du hook avec le service de produits
 */

import { renderHook, waitFor } from '@testing-library/react';
import { useProductList } from '@/hooks/useProductList';
import { productsService } from '@/lib/services';

// Mock du service products
jest.mock('@/lib/services', () => ({
  productsService: {
    getAllProducts: jest.fn(),
    deleteProduct: jest.fn(),
    calculateStats: jest.fn(),
  },
}));

// Mock du hook de notifications
jest.mock('@/hooks/useToastNotifications', () => ({
  useToastNotifications: () => ({
    success: jest.fn(),
    error: jest.fn(),
  }),
}));

describe('useProductList - Test d\'Intégration', () => {
  const mockProducts = [
    { 
      id: '1', 
      name: 'Produit Test 1', 
      price: 100,
      user: { id: 'user1', email: 'test@test.com' },
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    { 
      id: '2', 
      name: 'Produit Test 2', 
      price: 200,
      user: { id: 'user1', email: 'test@test.com' },
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock par défaut
    (productsService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    (productsService.calculateStats as jest.Mock).mockReturnValue({
      totalProducts: 2,
      totalValue: 300,
      averagePrice: 150,
    });
  });

  it('devrait charger les produits au montage', async () => {
    // Act
    const { result } = renderHook(() => useProductList());

    // Assert - Vérifier l'état de chargement initial
    expect(result.current.loading).toBe(true);

    // Attendre que les produits soient chargés
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Vérifier que les produits sont chargés
    expect(result.current.products).toHaveLength(2);
    expect(result.current.products[0].name).toBe('Produit Test 1');
    expect(productsService.getAllProducts).toHaveBeenCalledTimes(1);
  });

  it('devrait filtrer les produits par recherche', async () => {
    // Act
    const { result } = renderHook(() => useProductList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Simuler une recherche avec act()
    await waitFor(() => {
      result.current.setSearchText('Test 1');
    });

    // Assert
    await waitFor(() => {
      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].name).toBe('Produit Test 1');
    });
  });

  it('devrait calculer les statistiques correctement', async () => {
    // Act
    const { result } = renderHook(() => useProductList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Assert
    expect(result.current.stats).toBeDefined();
    expect(result.current.stats.totalProducts).toBe(2);
    expect(productsService.calculateStats).toHaveBeenCalled();
  });
});

