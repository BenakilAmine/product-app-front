import React from 'react';
import { Table, Space, Avatar, Tag, Button, Tooltip, Popconfirm, Input } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
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
      render: (record: UserItem) => (
        <Space>
          <Avatar 
            icon={<UserOutlined />} 
            style={{ 
              background: getRoleBackgroundColor(record.role)
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.email}</div>
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
      render: (role: string) => (
        <Tag 
          color={getRoleColor(role)} 
          icon={getRoleIcon(role)}
          style={{ borderRadius: 6, padding: '4px 8px' }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: 'Date de création',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatters.dateShort(date),
    },
    {
      title: 'Dernière modification',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => formatters.dateShort(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: UserItem) => (
        <Space>
          <Tooltip title="Modifier le rôle">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEditUser(record)}
              style={{ color: '#1890ff' }}
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
    <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Rechercher par email..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
          style={{ maxWidth: 400 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} sur ${total} utilisateurs`,
          onChange: onPageChange,
        }}
        scroll={{ x: 800 }}
      />
    </div>
  );
}