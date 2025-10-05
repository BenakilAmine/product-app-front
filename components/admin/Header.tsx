'use client';

import React, { useState } from 'react';
import { Input, Button, Avatar, Badge, Space, Typography, Dropdown } from 'antd';
import { 
  SearchOutlined,
  MessageOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { AdminHeaderProps } from '../../types';

const { Text } = Typography;

export default function Header({ pathname, onMenuClick, onMobileMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <UserOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <UserOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout();
      router.push('/');
    }
  };

  const handleSearch = (value: string) => {
    console.log('Recherche:', value);
  };

  return (
    <>
      <style jsx global>{`
        .header {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 12px 16px;
        }
        
        @media (min-width: 640px) {
          .header {
            padding: 16px 24px;
          }
        }
        
        .mobile-menu-btn {
          display: flex !important;
        }
        
        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
        
        .search-container {
          flex: 1;
          max-width: 400px;
          margin: 0 16px;
        }
        
        @media (max-width: 640px) {
          .search-container {
            margin: 0 8px;
            max-width: 200px;
          }
        }
        
        .actions-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        @media (min-width: 640px) {
          .actions-container {
            gap: 16px;
          }
        }
        
        .action-btn {
          color: #6b7280;
          font-size: 18px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 640px) {
          .action-btn {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 8px;
          transition: background-color 0.2s;
        }
        
        .user-profile:hover {
          background-color: #f3f4f6;
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        @media (max-width: 640px) {
          .user-info {
            display: none;
          }
        }
        
        .mobile-hidden {
          display: flex;
        }
        
        @media (max-width: 640px) {
          .mobile-hidden {
            display: none;
          }
        }
        
        .tablet-hidden {
          display: flex;
        }
        
        @media (max-width: 768px) {
          .tablet-hidden {
            display: none;
          }
        }
        
        .search-input {
          border-radius: 8px;
          border: 1px solid #d1d5db;
          height: 40px;
        }
        
        @media (max-width: 640px) {
          .search-input {
            height: 36px;
            font-size: 14px;
          }
        }
        
        .search-input::placeholder {
          font-size: 14px;
        }
        
        @media (min-width: 640px) {
          .search-input::placeholder {
            font-size: 16px;
          }
        }
      `}</style>
      
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Section gauche - Menu mobile + Recherche */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {/* Bouton menu mobile */}
            <Button 
              type="text" 
              icon={<MenuOutlined />}
              onClick={onMobileMenuClick}
              className="mobile-menu-btn"
            />

            {/* Barre de recherche */}
            <div className="search-container">
              <Input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                suffix={<SearchOutlined style={{ color: '#9ca3af' }} />}
                className="search-input"
              />
            </div>
          </div>

          {/* Section droite - Actions et profil */}
          <div className="actions-container">
            {/* Chat - Masqué sur mobile */}
            <Button 
              type="text" 
              icon={<MessageOutlined />}
              className="action-btn mobile-hidden"
            />

            {/* Notifications */}
            <Badge count={2} size="small">
              <Button 
                type="text" 
                icon={<BellOutlined />}
                className="action-btn"
              />
            </Badge>

            {/* Shopping Cart - Masqué sur tablette et mobile */}
            <Button 
              type="text" 
              icon={<ShoppingCartOutlined />}
              className="action-btn tablet-hidden"
            />

            {/* Profil utilisateur */}
            <Dropdown
              menu={{ 
                items: userMenuItems, 
                onClick: handleUserMenuClick 
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="user-profile">
                <Avatar 
                  size={32}
                  style={{ 
                    background: '#f97316'
                  }}
                  icon={<UserOutlined />}
                />
                <div className="user-info">
                  <Text style={{ 
                    color: '#111827', 
                    fontWeight: 500, 
                    fontSize: 14,
                    lineHeight: 1.2
                  }}>
                    Marcus George
                  </Text>
                  <Text style={{ 
                    color: '#6b7280', 
                    fontSize: 12,
                    lineHeight: 1.2
                  }}>
                    Admin
                  </Text>
                </div>
                <DownOutlined style={{ color: '#6b7280', fontSize: 12 }} />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}