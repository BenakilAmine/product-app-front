'use client';

import React from 'react';
import { Button, Typography, Avatar, Dropdown } from 'antd';
import { 
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { AdminHeaderProps, UserMenuItem } from '../../types';
import { getRoleColor, getRoleIcon, getRoleBackgroundColor } from '../../utils/roleUtils';

const { Title } = Typography;

export default function AdminHeader({ pathname, onMenuClick, onMobileMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

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


  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.95)', 
      padding: '8px 24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Button 
        type="text" 
        icon={<MenuOutlined />} 
        onClick={onMobileMenuClick}
        style={{ fontSize: 18 }}
      />
      <Title level={4} style={{ margin: 0, color: '#1f2937' }}>
        Admin Panel
      </Title>
        <Dropdown
          menu={{ 
            items: userMenuItems as [], 
            onClick: handleUserMenuClick 
          }}
          placement="bottomRight"
        >
        <Avatar 
          style={{ 
            background: getRoleBackgroundColor(user?.role || 'USER'),
            cursor: 'pointer'
          }}
          icon={getRoleIcon(user?.role || 'USER')}
        />
      </Dropdown>
    </div>
  );
}