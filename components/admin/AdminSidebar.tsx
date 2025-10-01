'use client';

import React from 'react';
import { Menu, Avatar, Typography, Button, Space } from 'antd';
import { 
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  CrownOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { AdminSidebarProps, MenuItem } from '../../types';
import { getRoleColor, getRoleIcon, getRoleBackgroundColor } from '../../utils/roleUtils';

const { Title, Text } = Typography;

export default function AdminSidebar({ collapsed, pathname, onMenuClick }: AdminSidebarProps) {
  const { user } = useAuth();
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


  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#ffffff',
      overflow: 'hidden'
    }}>
      {/* Logo et titre */}
      <div style={{ 
        padding: collapsed ? '12px 8px' : '16px', 
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 12,
        borderBottom: '1px solid #f0f0f0',
        justifyContent: collapsed ? 'center' : 'flex-start',
        minHeight: collapsed ? '60px' : 'auto',
        transition: 'all 0.2s ease-in-out'
      }}>
        <Avatar 
          size={collapsed ? 32 : 36} 
          icon={<CrownOutlined />} 
          style={{ 
            backgroundColor: '#1677ff',
            transition: 'all 0.2s ease-in-out'
          }} 
        />
        {!collapsed && (
          <div>
            <Title level={5} style={{ margin: 0 }}>
              Admin
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Super Admin
            </Text>
          </div>
        )}
      </div>

      {/* Menu de navigation */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems as any}
          onClick={onMenuClick}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '12px 8px'
          }}
        />
      </div>

      {/* Informations utilisateur */}
      <div style={{ 
        padding: collapsed ? '12px 8px' : '16px', 
        borderTop: '1px solid #f0f0f0',
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: collapsed ? 'center' : 'stretch'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: collapsed ? 8 : 12,
          justifyContent: collapsed ? 'center' : 'flex-start'
        }}>
          <Avatar 
            size={collapsed ? 32 : 40}
            style={{ 
              background: getRoleBackgroundColor(user?.role || 'USER'),
              marginRight: collapsed ? 0 : 12
            }}
            icon={getRoleIcon(user?.role || 'USER')}
          />
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                color: '#1f1f1f', 
                fontWeight: 500, 
                fontSize: 14,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user?.email}
              </div>
              <div style={{ 
                color: '#8c8c8c', 
                fontSize: 12 
              }}>
                {user?.role}
              </div>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <Button 
            type="text" 
            icon={<HomeOutlined />}
            onClick={() => router.push('/')}
            style={{ 
              color: '#595959',
              width: '100%',
              textAlign: 'left'
            }}
          >
            Retour à la boutique
          </Button>
        )}
        
        {collapsed && (
          <Button 
            type="text" 
            icon={<HomeOutlined />}
            onClick={() => router.push('/')}
            style={{ 
              color: '#595959',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px 0'
            }}
            title="Retour à la boutique"
          />
        )}
      </div>
    </div>
  );
}