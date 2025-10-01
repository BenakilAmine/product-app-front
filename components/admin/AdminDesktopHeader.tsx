'use client';

import React from 'react';
import { Button, Typography, Space, Avatar, Dropdown, Breadcrumb } from 'antd';
import { 
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CrownOutlined,
  DashboardOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { AdminDesktopHeaderProps, MenuItem, UserMenuItem } from '../../types';

const { Title } = Typography;

export default function AdminDesktopHeader({ pathname, onMenuClick }: AdminDesktopHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: 'Utilisateurs',
    },
    {
      key: '/admin/products',
      icon: <ShopOutlined />,
      label: 'Produits',
    },
  ];

  const userMenuItems: UserMenuItem[] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Paramètres',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Déconnexion',
      danger: true,
    },
  ];

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout();
      router.push('/');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return '#ff4d4f';
      case 'ADMIN': return '#1890ff';
      case 'USER': return '#52c41a';
      default: return '#8c8c8c';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return <CrownOutlined />;
      case 'ADMIN': return <UserOutlined />;
      case 'USER': return <UserOutlined />;
      default: return <UserOutlined />;
    }
  };

  return (
    <div style={{ 
      background: '#ffffff', 
      padding: '12px 24px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Breadcrumb
          items={[
            { title: <span style={{ color: '#8c8c8c' }}>Admin</span> },
            { title: menuItems.find(item => item.key === pathname)?.label || 'Dashboard' }
          ]}
        />
        <Title level={4} style={{ margin: 0 }}>
          {menuItems.find(item => item.key === pathname)?.label || 'Dashboard'}
        </Title>
      </div>
      
      <Space>
        <Button 
          type="text" 
          icon={<HomeOutlined />}
          onClick={() => router.push('/')}
        >
          Boutique
        </Button>
        <Dropdown
          menu={{ 
            items: userMenuItems as any, 
            onClick: handleUserMenuClick 
          }}
          placement="bottomRight"
        >
          <Space style={{ cursor: 'pointer' }}>
            <Avatar 
              style={{ 
                background: getRoleColor(user?.role || 'USER')
              }}
              icon={getRoleIcon(user?.role || 'USER')}
            />
            <div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>
                {user?.email}
              </div>
              <div style={{ color: '#8c8c8c', fontSize: 12 }}>
                {user?.role}
              </div>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </div>
  );
}