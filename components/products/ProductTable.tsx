'use client';

import React from 'react';
import { Table, Button, Space, Popconfirm, Tag, Tooltip, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Product, ProductTableProps } from '../../types';
import { formatters } from '../../shared';

const { Text } = Typography;

export default function ProductTable({ products, loading, onDelete, currentUserId }: ProductTableProps) {
  // Configuration des colonnes du tableau
  const columns = [
    {
      title: 'Nom du produit',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ fontSize: '16px' }}>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Créé le {formatters.date(record.createdAt)}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <Tag color="green" style={{ fontSize: '14px', padding: '4px 8px' }}>
          {formatters.currency(price)}
        </Tag>
      ),
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Propriétaire',
      dataIndex: ['user', 'email'],
      key: 'owner',
      render: (email: string, record: Product) => (
        <Space>
          <Text>{email}</Text>
          {record.user.id === currentUserId && (
            <Tag color="blue">Vous</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Product) => (
        <Space>
          <Tooltip title="Modifier">
            <Link href={`/products/${record.id}/edit`}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                disabled={record.user.id !== currentUserId}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Supprimer">
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer ce produit ?"
              onConfirm={() => onDelete(record.id)}
              okText="Oui"
              cancelText="Non"
              disabled={record.user.id !== currentUserId}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                disabled={record.user.id !== currentUserId}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} sur ${total} produits`,
      }}
      scroll={{ x: 800 }}
    />
  );
}