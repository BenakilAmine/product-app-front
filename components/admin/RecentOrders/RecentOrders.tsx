'use client';

import React, { useState } from 'react';
import { Card, Typography, Table, message, Modal } from 'antd';
import { ordersData, Order } from '../data/ordersData';
import { getOrderTableColumns } from './OrderTableColumns';
import { OrderStats } from './OrderStats';
import { OrderFilters } from './OrderFilters';
import { OrderDetailsModal } from './OrderDetailsModal';

const { Title } = Typography;

export default function RecentOrders() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Filtrage et recherche
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = searchText === '' || 
      order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status.name.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Tri
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key as keyof Order];
    const bValue = b[sortConfig.key as keyof Order];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  // Actions du menu
  const handleMenuClick = (action: string, record: Order) => {
    switch (action) {
      case 'view':
        setSelectedOrder(record);
        setIsModalVisible(true);
        break;
      case 'edit':
        message.info(`Édition de la commande ${record.orderId}`);
        break;
      case 'delete':
        Modal.confirm({
          title: 'Supprimer la commande',
          content: `Êtes-vous sûr de vouloir supprimer la commande ${record.orderId} ?`,
          onOk: () => message.success('Commande supprimée'),
        });
        break;
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExport = () => {
    message.info('Export en cours...');
  };

  const columns = getOrderTableColumns({ sortConfig, setSortConfig, handleMenuClick });

  return (
    <>
      <style jsx global>{`
        .recent-orders-table .ant-table-tbody > tr {
          border-bottom: 1px solid #f3f4f6;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .recent-orders-table .ant-table-tbody > tr:hover {
          background-color: #f9fafb !important;
        }
        
        /* Responsive table styles */
        .recent-orders-table .ant-table-thead > tr > th {
          white-space: nowrap;
          padding: 8px 12px;
        }
        
        .recent-orders-table .ant-table-tbody > tr > td {
          padding: 8px 12px;
          white-space: nowrap;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .recent-orders-table .ant-table-thead > tr > th {
            padding: 6px 8px;
            font-size: 12px;
          }
          
          .recent-orders-table .ant-table-tbody > tr > td {
            padding: 6px 8px;
            font-size: 12px;
          }
          
          .recent-orders-table .ant-table {
            font-size: 12px;
          }
        }
        
        /* Tablet optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          .recent-orders-table .ant-table-thead > tr > th {
            padding: 10px 12px;
            font-size: 13px;
          }
          
          .recent-orders-table .ant-table-tbody > tr > td {
            padding: 10px 12px;
            font-size: 13px;
          }
        }
      `}</style>
      
      <Card
        style={{
          borderRadius: 16,
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          marginBottom: 24
        }}
        bodyStyle={{ padding: '24px' }}
      >
        {/* En-tête avec statistiques */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={4} style={{ margin: 0, color: '#111827', fontSize: 20, fontWeight: 700 }}>
              Recent Orders
            </Title>
          </div>

          <OrderStats orders={sortedOrders} />
        </div>

        {/* Barre de recherche et filtres */}
        <OrderFilters
          searchText={searchText}
          setSearchText={setSearchText}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        {/* Tableau avec pagination */}
        <Table
          columns={columns}
          dataSource={sortedOrders}
          pagination={{
            pageSize: 4,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} sur ${total} commandes`,
            pageSizeOptions: ['4', '8', '12', '20'],
            style: { marginTop: 16 }
          }}
          size="middle"
          style={{ 
            background: '#ffffff',
            borderRadius: 8
          }}
          className="recent-orders-table"
          scroll={{ x: 800 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedOrder(record);
              setIsModalVisible(true);
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          })}
          components={{
            header: {
              cell: (props: any) => (
                <th {...props} style={{
                  ...props.style,
                  background: '#f8fafc',
                  borderBottom: '1px solid #e5e7eb',
                  padding: '12px 16px',
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#6b7280',
                  textAlign: 'left'
                }} />
              ),
            },
          }}
        />
      </Card>

      {/* Modal de détails de commande */}
      <OrderDetailsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        order={selectedOrder}
      />
    </>
  );
}