'use client';
import { 
  Card, 
  Modal, 
  Form, 
  message, 
  Spin
} from 'antd';
import { 
  PlusOutlined,
  ReloadOutlined,
  ExportOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/contexts/auth-context';
import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import PageHeader from '../../../components/admin/PageHeader';
import FilterPanel from '../../../components/admin/FilterPanel';
import { EmptyState, LoadingSpinner } from '../../../shared';
import ErrorState from '../../../components/admin/ErrorState';
import ProductCreateModal from '../../../components/products/ProductCreateModal';
import ProductEditModal from '../../../components/products/ProductEditModal';
import ProductsMetrics from '../../../components/admin/products/ProductsMetrics';
import AdminProductsTable from '../../../components/admin/products/AdminProductsTable';
import { useAdminProducts } from '../../../hooks/useAdminProducts';
import { ProductItem, ProductFilters } from '../../../types/admin';

// const { Text } = Typography; // Supprimé car non utilisé

export default function AdminProducts() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  // const [currentPage, setCurrentPage] = useState(1); // Supprimé car non utilisé
  // const [pageSize, setPageSize] = useState(10); // Supprimé car non utilisé
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [error, setError] = useState<string | null>(null);

  // Nouvel état pour la modale d'édition
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [editForm] = Form.useForm();

  // Nouvel état pour la modale de création
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const handleCreated = () => {
    setCreateModalVisible(false);
    refetchProducts();
    // Recharger les métriques car le nombre total de produits a changé
    refetchMetrics();
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'SUPER_ADMIN') {
        setRedirecting(true);
        router.replace('/');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  const { 
    products, 
    metrics, 
    productsLoading, 
    metricsLoading,
    deleteProduct, 
    refetchProducts,
    refetchMetrics,
    refetchAll
  } = useAdminProducts(!user || user.role !== 'SUPER_ADMIN');

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    // setCurrentPage(1); // Supprimé car currentPage n'est plus utilisé
  };

  const handleClearFilters = () => {
    setFilters({});
    // setCurrentPage(1); // Supprimé car currentPage n'est plus utilisé
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      // Recharger les métriques car le nombre total de produits a changé
      refetchMetrics();
      setDeleteModalVisible(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la suppression';
      message.error(errorMessage);
    }
  };

  const confirmDelete = (product: ProductItem) => {
    setSelectedProduct(product);
    setDeleteModalVisible(true);
  };

  // Ouvrir la modale d'édition
  const openEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    editForm.setFieldsValue({
      name: product.name,
      price: product.price,
    });
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditingProduct(null);
    editForm.resetFields();
  };

  // Filtrage avancé
  const filteredProducts = (products || []).filter((product: ProductItem) => {
    if (!product) return false;
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.priceRange) {
      const [min, max] = String(filters.priceRange).split('-').map(Number);
      if (min && product.price < min) return false;
      if (max && product.price > max) return false;
    }
    if (filters.owner && product.user.email !== filters.owner) return false;
    if (filters.createdDate) {
      const productDate = new Date(product.createdAt);
      const filterDate = new Date(filters.createdDate);
      if (productDate.toDateString() !== filterDate.toDateString()) return false;
    }
    return true;
  });

  const totalValue = products.reduce((sum: number, product: ProductItem) => sum + product.price, 0);
  const averagePrice = products.length > 0 ? totalValue / products.length : 0;

  // États d'erreur
  if (error) {
    return (
      <AdminLayout>
        <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
          <ErrorState
            title="Erreur de chargement"
            description={error || 'Impossible de charger les données'}
            actions={[
              { label: 'Réessayer', onClick: () => { setError(null); refetchAll(); }, type: 'primary' },
              { label: 'Retour au dashboard', onClick: () => router.push('/admin'), type: 'default' }
            ]}
          />
        </div>
      </AdminLayout>
    );
  }

  if (loading || redirecting) {
    return <LoadingSpinner message="Chargement des produits..." />;
  }

  return (
    <AdminLayout>
      <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto', minHeight: '100vh' }}>
        {/* Header de la page */}
        <PageHeader
          title="Gestion des Produits"
          subtitle="Administration et supervision du catalogue produits"
          emoji="🛍️"
          actions={[
            {
              key: 'refresh',
              label: 'Actualiser',
              icon: <ReloadOutlined />,
              onClick: () => refetchProducts(),
              loading: productsLoading
            },
            {
              key: 'export',
              label: 'Exporter',
              icon: <ExportOutlined />,
              onClick: () => console.log('Export products')
            },
            {
              key: 'new',
              label: 'Nouveau Produit',
              icon: <PlusOutlined />,
              onClick: () => setCreateModalVisible(true),
              type: 'primary'
            }
          ]}
        />

        <ProductsMetrics
          totalProducts={metrics?.totalProducts ?? 0}
          productsLast7d={metrics?.productsLast7d ?? 0}
          totalValue={totalValue}
          averagePrice={averagePrice}
        />
        {metricsLoading && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <Spin size="small" /> Mise à jour des métriques...
          </div>
        )}

        <FilterPanel
          filters={[
            { key: 'search', label: 'Recherche', type: 'text', placeholder: 'Nom du produit...' },
            { key: 'priceRange', label: 'Prix', type: 'select', options: [
              { value: '0-10', label: '0-10€' },
              { value: '10-50', label: '10-50€' },
              { value: '50-100', label: '50-100€' },
              { value: '100+', label: '100€+' }
            ] },
            { key: 'owner', label: 'Propriétaire', type: 'select', options: (products || [])
              .filter((p: ProductItem) => p && p.user && p.user.email)
              .map((p: ProductItem) => ({ value: p.user.email, label: p.user.email })) },
            { key: 'createdDate', label: 'Date de création', type: 'date' },
          ]}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
          loading={productsLoading}
        />

        <Card>
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="Aucun produit trouvé"
              description={Object.keys(filters).length > 0 
                ? "Aucun produit ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
                : "Aucun produit n'a encore été créé. Commencez par ajouter votre premier produit."}
              actions={[(products || []).length === 0
                ? { label: 'Créer un produit', onClick: () => setCreateModalVisible(true), type: 'primary' }
                : { label: 'Effacer les filtres', onClick: handleClearFilters, type: 'default' }]}
            />
          ) : (
            <AdminProductsTable
              products={filteredProducts}
              loading={productsLoading}
              onView={(id) => router.push(`/products/${id}`)}
              onEdit={openEditModal}
              onDeleteConfirm={confirmDelete}
            />
          )}
        </Card>

        <ProductEditModal
          open={editModalVisible}
          onClose={handleEditCancel}
          onUpdated={() => { 
            setEditModalVisible(false); 
            setEditingProduct(null); 
            refetchProducts(); 
            // Pas besoin de recharger les métriques pour une modification
          }}
          product={editingProduct}
        />

        <ProductCreateModal
          open={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onCreated={handleCreated}
        />

        <Modal
          title="Confirmer la suppression"
          open={deleteModalVisible}
          onOk={() => selectedProduct?.id && handleDeleteProduct(selectedProduct.id.toString())}
          onCancel={() => setDeleteModalVisible(false)}
          okText="Supprimer"
          cancelText="Annuler"
          okButtonProps={{ danger: true }}
        >
          <p>Êtes-vous sûr de vouloir supprimer le produit <strong>&quot;{selectedProduct?.name}&quot;</strong> ?</p>
          <p>Cette action est irréversible.</p>
        </Modal>
      </div>
    </AdminLayout>
  );
}