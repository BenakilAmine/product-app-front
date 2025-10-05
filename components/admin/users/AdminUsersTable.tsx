import React from 'react';
import { Table, Space, Avatar, Tag, Button, Tooltip, Popconfirm, Input, Typography, Card } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, SearchOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons';
import { formatters } from '../../../shared/utils/formatters';
import { UserItem } from '../../../types/admin';
import { getRoleColor, getRoleIcon, getRoleBackgroundColor } from '../../../utils/roleUtils';

const { Text } = Typography;
const { Search } = Input;

interface AdminUsersTableProps {
  users: UserItem[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
  onSearch: (value: string) => void;
  onEditUser: (user: UserItem) => void;
  onDeleteUser: (userId: string) => void;
  onPageChange: (page: number, size?: number) => void;
}

export default function AdminUsersTable({
  users,
  loading,
  currentPage,
  pageSize,
  total,
  onSearch,
  onEditUser,
  onDeleteUser,
  onPageChange
}: AdminUsersTableProps) {

  const columns = [
    {
      title: 'Utilisateur',
      key: 'user',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (record: UserItem) => (
        <Space>
          <Avatar 
            icon={<UserOutlined />} 
            style={{ 
              background: getRoleBackgroundColor(record.role)
            }}
          />
          <div>
            <div style={{ fontWeight: 500, color: '#111827' }}>{record.email}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              ID: {record.id}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      render: (role: string) => (
        <Tag 
          color={getRoleColor(role)} 
          icon={getRoleIcon(role)}
          style={{ borderRadius: 6, padding: '4px 8px', fontWeight: 500 }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: 'Date de création',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['md', 'lg', 'xl', 'xxl'] as const,
      render: (date: string) => (
        <Text style={{ color: '#6b7280', fontSize: 14 }}>
          {formatters.dateShort(date)}
        </Text>
      ),
    },
    {
      title: 'Dernière modification',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      responsive: ['lg', 'xl', 'xxl'] as const,
      render: (date: string) => (
        <Text style={{ color: '#6b7280', fontSize: 14 }}>
          {formatters.dateShort(date)}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const,
      width: 120,
      render: (record: UserItem) => (
        <Space>
          <Tooltip title="Modifier le rôle">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEditUser(record)}
              style={{ color: '#f97316' }}
            />
          </Tooltip>
          {record.role !== 'SUPER_ADMIN' && (
            <Popconfirm
              title="Supprimer cet utilisateur ?"
              description="Cette action est irréversible"
              onConfirm={() => onDeleteUser(record.id.toString())}
              okText="Supprimer"
              cancelText="Annuler"
            >
              <Tooltip title="Supprimer">
                <Button 
                  type="text" 
                  icon={<DeleteOutlined />} 
                  danger
                />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <style jsx global>{`
        .users-table .ant-table-thead > tr > th {
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 16px;
          font-weight: 600;
          font-size: 13px;
          color: #6b7280;
          text-align: left;
        }
        
        .users-table .ant-table-tbody > tr {
          border-bottom: 1px solid #f3f4f6;
          transition: all 0.2s ease;
        }
        
        .users-table .ant-table-tbody > tr:hover {
          background-color: #f9fafb !important;
        }
        
        .users-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          vertical-align: middle;
        }
        
        .users-search-container {
          padding: 20px 24px;
          border-bottom: 1px solid #f3f4f6;
          background: #ffffff;
        }
        
        .users-search {
          max-width: 400px;
        }
        
        @media (max-width: 640px) {
          .users-search {
            max-width: 100%;
          }
          
          .users-table .ant-table-thead > tr > th {
            padding: 8px 12px;
            font-size: 12px;
          }
          
          .users-table .ant-table-tbody > tr > td {
            padding: 8px 12px;
            font-size: 12px;
          }
        }
      `}</style>
      
      <div>
        {/* Barre de recherche */}
        <div className="users-search-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography.Title level={4} style={{ margin: 0, color: '#111827', fontSize: 18, fontWeight: 600 }}>
                Liste des Utilisateurs
              </Typography.Title>
              <Typography.Text style={{ color: '#6b7280', fontSize: 14 }}>
                Gérez et supervisez tous les comptes utilisateurs
              </Typography.Text>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Button 
                icon={<FilterOutlined />} 
                style={{ borderRadius: 8 }}
              >
                Filtres
              </Button>
            </div>
          </div>
          
          <div style={{ marginTop: 16 }}>
            <Search
              placeholder="Rechercher par email..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={onSearch}
              className="users-search"
            />
          </div>
        </div>

        {/* Tableau */}
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          className="users-table"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} sur ${total} utilisateurs`,
            onChange: onPageChange,
            style: { margin: '16px 24px' }
          }}
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
}