'use client';

import React from 'react';
import { Space, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../lib/contexts/auth-context';
import ProductStats from './products/ProductStats';
import ProductTable from './products/ProductTable';
import { useProductList } from '../hooks/useProductList';
import { SearchBar, ActionButtons } from '../shared';

const { Title } = Typography;

export default function ProductList() {
  const { user } = useAuth();
  const { 
    products, 
    loading, 
    searchText, 
    setSearchText, 
    handleDelete, 
    stats 
  } = useProductList();

  return (
    <div style={{ padding: '24px' }}>
      {/* Statistiques */}
      <ProductStats
        totalProducts={stats.totalProducts}
        totalValue={stats.totalValue}
        averagePrice={stats.averagePrice}
      />

      {/* Barre d'actions et de recherche */}
      <Card>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>
            Liste des produits
          </Title>
          <Space>
            <SearchBar
              value={searchText}
              onChange={setSearchText}
              placeholder="Rechercher un produit..."
              style={{ width: 300 }}
            />
            <ActionButtons
              actions={[
                {
                  key: 'add',
                  label: 'Ajouter un produit',
                  icon: <PlusOutlined />,
                  type: 'primary',
                  onClick: () => window.location.href = '/products/new'
                }
              ]}
            />
          </Space>
        </div>

        {/* Tableau des produits */}
        <ProductTable
          products={products}
          loading={loading}
          onDelete={handleDelete}
          currentUserId={user?.id}
        />
      </Card>
    </div>
  );
}