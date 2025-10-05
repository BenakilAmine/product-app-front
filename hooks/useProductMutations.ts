import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productsService } from '../lib/services';
import { useToastNotifications } from './useToastNotifications';
import type { Product, CreateProductInput, UpdateProductInput } from '../types';

/**
 * Hook pour gérer les mutations de produits (création/édition)
 * Utilise ProductsService pour toute la logique métier
 */

interface ProductFormProps {
  productId?: string;
  mode: 'create' | 'edit';
}

export function useProductMutations({ productId, mode }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);
  const { success, error } = useToastNotifications();

  // Charger le produit en mode édition
  useEffect(() => {
    if (mode === 'edit' && productId) {
      const loadProduct = async () => {
        try {
          setLoading(true);
          const data = await productsService.getProductById(productId);
          setProductData(data);
        } catch (err) {
          error('Erreur lors du chargement du produit');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [productId, mode]);

  // Soumission du formulaire
  const handleSubmit = async (values: CreateProductInput) => {
    try {
      setLoading(true);
      
      if (mode === 'create') {
        const product = await productsService.createProduct(values);
        success(`Produit "${product.name}" créé avec succès`);
        router.push('/admin/products');
      } else if (mode === 'edit' && productId) {
        const product = await productsService.updateProduct(productId, values);
        success(`Produit "${product.name}" modifié avec succès`);
        router.push('/admin/products');
      }
    } catch (err) {
      const message = mode === 'create' 
        ? 'Erreur lors de la création du produit'
        : 'Erreur lors de la modification du produit';
      error(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    productData,
    isEdit: mode === 'edit'
  };
}