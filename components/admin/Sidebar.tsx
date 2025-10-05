'use client';

import React from 'react';
import { Menu, Button, Typography } from 'antd';
import { 
  DashboardOutlined,
  ShopOutlined,
  UserOutlined,
  BarChartOutlined,
  PercentageOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  CrownOutlined
} from '@ant-design/icons';
import { AdminSidebarProps } from '../../types';
import type { MenuProps } from 'antd';

const { Title } = Typography;

export default function Sidebar({ collapsed, pathname, onMenuClick }: AdminSidebarProps) {

  const menuItems: MenuProps['items'] = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/products',
      icon: <ShopOutlined />,
      label: 'Products',
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: 'Customers',
    },
    {
      key: '/admin/reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
    },
    {
      key: '/admin/discounts',
      icon: <PercentageOutlined />,
      label: '% Discounts',
    },
    {
      key: '/admin/integrations',
      icon: <LinkOutlined />,
      label: 'Integrations',
    },
    {
      key: '/admin/help',
      icon: <QuestionCircleOutlined />,
      label: 'Help',
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      overflow: 'hidden'
    }}>
      {/* Logo */}
      <div style={{ 
        padding: collapsed ? '20px 16px' : '24px 20px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        minHeight: collapsed ? '60px' : 'auto',
        borderBottom: '1px solid #e5e7eb'
      }}>
        {!collapsed && (
          <Title level={3} style={{ 
            margin: 0, 
            color: '#374151',
            fontSize: 24,
            fontWeight: 700,
            height: '24px'
          }}>
            <CrownOutlined /> Admin Panel
          </Title>
        )}
        {collapsed && (
          <CrownOutlined style={{ fontSize: 24, color: '#f97316',height: '32px' }} />
        )}
      </div>

      {/* Menu de navigation */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        padding: '16px 0'
      }}>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={onMenuClick}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0 12px'
          }}
          theme="light"
        />
      </div>

      {/* Version collapsed */}
      {collapsed && (
        <div style={{ padding: '16px 8px' }}>
          <Button
            type="primary"
            icon={<CrownOutlined />}
            size="small"
            style={{
              background: '#f97316',
              border: 'none',
              borderRadius: 6,
              width: '100%',
              height: 32
            }}
          />
        </div>
      )}
    </div>
  );
}