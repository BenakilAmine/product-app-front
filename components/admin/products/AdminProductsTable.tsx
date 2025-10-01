'use client';

import React from 'react';
import { Table, Space, Avatar, Tag, Tooltip, Typography } from 'antd';
import { ShopOutlined, UserOutlined, CalendarOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatters } from '../../../shared';

const { Text } = Typography;

export interface AdminProductsTableProps {
  products: any[];
  loading: boolean;
  onView: (productId: string) => void;
  onEdit: (product: any) => void;
  onDeleteConfirm: (product: any) => void;
}

export default function AdminProductsTable({ products, loading, onView, onEdit, onDeleteConfirm }: AdminProductsTableProps) {
  const getPriceColor = (price: number) => {
    if (price < 10) return '#52c41a';
    if (price < 50) return '#fa8c16';
    return '#ff4d4f';
  };

  const columns = [
    {
      title: 'Produit',
      key: 'product',
      render: (record: any) => (
        <Space>
          <Avatar icon={<ShopOutlined />} style={{ background: getPriceColor(record.price) }} />
          <div>
            <div style={{ fontWeight: 500, fontSize: 16 }}>{record.name}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>ID: {record.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <Tag color={getPriceColor(price)} style={{ borderRadius: 6, padding: '4px 8px', fontSize: 14, fontWeight: 500 }}>
          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)}
        </Tag>
      ),
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: 'Propriétaire',
      key: 'owner',
      render: (record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" style={{ background: '#1890ff' }} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.user.email}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>ID: {record.user.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Date de création',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Space>
          <CalendarOutlined style={{ color: '#8c8c8c' }} />
          <Text>{formatters.dateShort(date)}</Text>
        </Space>
      ),
      sorter: (a: any, b: any) => {
        const dateA = formatters._parseDate(a.createdAt);
        const dateB = formatters._parseDate(b.createdAt);
        if (!dateA || !dateB) return 0;
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      title: 'Dernière modification',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => (
        <Space>
          <CalendarOutlined style={{ color: '#8c8c8c' }} />
          <Text>{formatters.dateShort(date)}</Text>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Tooltip title="Voir le produit">
            <EyeOutlined onClick={() => onView(record.id)} style={{ color: '#1890ff' }} />
          </Tooltip>
          <Tooltip title="Modifier">
            <EditOutlined onClick={() => onEdit(record)} style={{ color: '#fa8c16' }} />
          </Tooltip>
          <Tooltip title="Supprimer">
            <DeleteOutlined onClick={() => onDeleteConfirm(record)} style={{ color: '#ff4d4f' }} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns as any}
      dataSource={products}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true, showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} produits` }}
      scroll={{ x: 1000 }}
    />
  );
}