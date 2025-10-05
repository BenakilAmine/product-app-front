import React from 'react';
import { Typography, Badge, Tag, Dropdown, Button, Menu } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Order } from '../data/ordersData';

const { Text } = Typography;

interface OrderTableColumnsProps {
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  setSortConfig: (config: { key: string; direction: 'asc' | 'desc' }) => void;
  handleMenuClick: (action: string, record: Order) => void;
}

export const getOrderTableColumns = ({ sortConfig, setSortConfig, handleMenuClick }: OrderTableColumnsProps) => {
  const getActionMenu = (record: Order) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      <Menu.Item key="view" icon={<EyeOutlined />}>
        Voir les détails
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Modifier
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        Supprimer
      </Menu.Item>
    </Menu>
  );

  return [
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
             onClick={() => setSortConfig({ key: 'no', direction: sortConfig?.key === 'no' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
          <span>No</span>
          {sortConfig?.key === 'no' ? (
            sortConfig.direction === 'asc' ? <ArrowUpOutlined style={{ fontSize: 10, color: '#f97316' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#f97316' }} />
          ) : <ArrowUpOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
        </div>
      ),
      dataIndex: 'no',
      key: 'no',
      width: 60,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (no: number) => (
        <Badge count={no} style={{ backgroundColor: '#f97316' }} />
      ),
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
             onClick={() => setSortConfig({ key: 'orderId', direction: sortConfig?.key === 'orderId' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
          <span>Order ID</span>
          {sortConfig?.key === 'orderId' ? (
            sortConfig.direction === 'asc' ? <ArrowUpOutlined style={{ fontSize: 10, color: '#f97316' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#f97316' }} />
          ) : <ArrowUpOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
        </div>
      ),
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (orderId: string) => (
        <Text style={{ color: '#111827', fontSize: 14, fontWeight: 600, fontFamily: 'monospace' }}>
          {orderId}
        </Text>
      ),
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
             onClick={() => setSortConfig({ key: 'customer', direction: sortConfig?.key === 'customer' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
          <span>Customer</span>
          {sortConfig?.key === 'customer' ? (
            sortConfig.direction === 'asc' ? <ArrowUpOutlined style={{ fontSize: 10, color: '#f97316' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#f97316' }} />
          ) : <ArrowUpOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
        </div>
      ),
      dataIndex: 'customer',
      key: 'customer',
      width: 160,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (customer: string, record: Order) => (
        <div>
          <Text style={{ color: '#111827', fontSize: 14, fontWeight: 500, display: 'block' }}>
            {customer}
          </Text>
          <Text style={{ color: '#6b7280', fontSize: 12 }}>
            {record.email}
          </Text>
        </div>
      ),
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
             onClick={() => setSortConfig({ key: 'product', direction: sortConfig?.key === 'product' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
          <span>Product</span>
          {sortConfig?.key === 'product' ? (
            sortConfig.direction === 'asc' ? <ArrowUpOutlined style={{ fontSize: 10, color: '#f97316' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#f97316' }} />
          ) : <ArrowUpOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
        </div>
      ),
      dataIndex: 'product',
      key: 'product',
      responsive: ['md', 'lg', 'xl', 'xxl'] as const,
      render: (product: Order['product']) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: product.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {product.icon}
          </div>
          <div>
            <Text style={{ color: '#111827', fontSize: 14, fontWeight: 500, display: 'block' }}>
              {product.name}
            </Text>
            <Tag color="blue" style={{ fontSize: 11, margin: 0 }}>
              {product.category}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
             onClick={() => setSortConfig({ key: 'qty', direction: sortConfig?.key === 'qty' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
          <span>Qty</span>
          {sortConfig?.key === 'qty' ? (
            sortConfig.direction === 'asc' ? <ArrowUpOutlined style={{ fontSize: 10, color: '#f97316' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#f97316' }} />
          ) : <ArrowUpOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
        </div>
      ),
      dataIndex: 'qty',
      key: 'qty',
      width: 80,
      responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (qty: number) => (
        <Badge count={qty} style={{ backgroundColor: '#10b981' }} />
      ),
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
             onClick={() => setSortConfig({ key: 'total', direction: sortConfig?.key === 'total' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
          <span>Total</span>
          {sortConfig?.key === 'total' ? (
            sortConfig.direction === 'asc' ? <ArrowUpOutlined style={{ fontSize: 10, color: '#f97316' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#f97316' }} />
          ) : <ArrowUpOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
        </div>
      ),
      dataIndex: 'total',
      key: 'total',
      width: 100,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (total: number) => (
        <Text style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>
          ${total.toFixed(2)}
        </Text>
      ),
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
             onClick={() => setSortConfig({ key: 'status', direction: sortConfig?.key === 'status' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
          <span>Status</span>
          {sortConfig?.key === 'status' ? (
            sortConfig.direction === 'asc' ? <ArrowUpOutlined style={{ fontSize: 10, color: '#f97316' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#f97316' }} />
          ) : <ArrowUpOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
        </div>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (status: Order['status']) => (
        <Tag
          color={status.name === 'Delivered' ? 'green' : status.name === 'Shipped' ? 'orange' : status.name === 'Processing' ? 'blue' : status.name === 'Pending' ? 'yellow' : 'red'}
          style={{
            borderRadius: 12,
            padding: '4px 12px',
            fontWeight: 500,
            fontSize: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: status.dotColor
            }} />
            {status.name}
          </div>
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      responsive: ['md', 'lg', 'xl', 'xxl'] as const,
      render: (date: string, record: Order) => (
        <div>
          <Text style={{ color: '#111827', fontSize: 12, fontWeight: 500, display: 'block' }}>
            {new Date(date).toLocaleDateString()}
          </Text>
          <Text style={{ color: '#6b7280', fontSize: 11 }}>
            {record.time}
          </Text>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (record: Order) => (
        <Dropdown overlay={getActionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} style={{ color: '#6b7280' }} />
        </Dropdown>
      ),
    },
  ];
};