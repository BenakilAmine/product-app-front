'use client';

import React from 'react';
import Link from 'next/link';
import { Layout, Row, Col, Input, Button, Space, Dropdown, Menu, Typography } from 'antd';
import { ShoppingOutlined, SearchOutlined, UserOutlined, LogoutOutlined, CrownOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '../../lib/contexts/auth-context';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer } = Layout;

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function MyLayout({ 
  children, 
  showSearch = true, 
  searchValue = '', 
  onSearchChange 
}: LayoutProps) {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', label: 'Profil', icon: <UserOutlined /> },
    { key: 'products', label: 'Mes produits', icon: <AppstoreOutlined /> },
    ...(user?.role === 'SUPER_ADMIN' ? [{ key: 'admin', label: 'Admin', icon: <CrownOutlined /> }] : []),
    { type: 'divider' as const },
    { key: 'logout', label: 'Déconnexion', icon: <LogoutOutlined /> },
  ];

  const onUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') return logout();
    if (key === 'profile') return router.push('/profile');
    if (key === 'products') return router.push('/products');
    if (key === 'admin') return router.push('/admin');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header My-style */}
      <Header style={{
        background: '#131921',
        color: 'white',
        padding: '8px 0',
        height: 'auto',
        lineHeight: 'normal'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Row align="middle" gutter={[16, 8]}>
            <Col xs={24} sm={6} md={3}>
              <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
                <Space>
                  <ShoppingOutlined style={{ fontSize: 24, color: '#ff9900' }} />
                  <Typography.Title level={5} style={{ color: 'white', fontSize: 18 }}>ProductManager</Typography.Title>
                </Space>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={12}>
              {showSearch && (
                <Input.Search
                  placeholder="Rechercher des produits..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="large"
                  style={{ borderRadius: 0 }}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              )}
            </Col>
            <Col xs={24} sm={6} md={9}>
              <Space style={{ justifyContent: 'flex-end', width: '100%' }} wrap>
                {loading ? (
                  <div style={{ 
                    color: 'white', 
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    minWidth: '120px',
                    textAlign: 'center'
                  }}>
                    Chargement...
                  </div>
                ) : !isAuthenticated ? (
                  <>
                    <Link href="/login">
                      <Button type="text" style={{ color: 'white' }}>Se connecter</Button>
                    </Link>
                    <Link href="/signup">
                      <Button type="primary" style={{ background: '#ff9900', borderColor: '#ff9900' }}>
                        S&apos;inscrire
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Dropdown 
                    menu={{ items: userMenuItems, onClick: onUserMenuClick }} 
                    placement="bottomRight" 
                    trigger={['click']}
                  >
                    <Button type="text" style={{ color: 'white' }} icon={<UserOutlined />}>
                      {user?.email}
                    </Button>
                  </Dropdown>
                )}
                <Button type="text" style={{ color: 'white' }} icon={<ShoppingCartOutlined />}>
                  Panier
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </Header>

      {/* Navigation My-style */}
      <div style={{
        background: '#232f3e',
        color: 'white',
        padding: '8px 0'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Menu
            mode="horizontal"
            style={{ background: 'transparent', border: 'none', color: 'white' }}
            items={[
              { key: 'all', label: 'Tous les produits' },
              { key: 'bureau', label: 'Bureau' },
              { key: 'entrepot', label: 'Entrepôt' },
              { key: 'industriel', label: 'Industriel' },
              { key: 'securite', label: 'Sécurité' },
              { key: 'hygiene', label: 'Hygiène' },
            ]}
          />
        </div>
      </div>

      {/* Contenu principal */}
      <Content style={{ flex: 1 }}>
        {children}
      </Content>

      {/* Footer My-style */}
      <Footer style={{
        background: '#131921',
        color: 'white',
        padding: '40px 0'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" size={12}>
                <Typography.Title level={5}  style={{ color: 'white' }}>À propos</Typography.Title>
                <Space direction="vertical" size={4}>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>Qui sommes-nous</Typography.Title>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>Carrières</Typography.Title>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>Presse</Typography.Title>
                </Space>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" size={12}>
                <Typography.Title level={5} style={{ color: 'white' }}>Aide</Typography.Title>
                <Space direction="vertical" size={4}>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>Centre d&apos;aide</Typography.Title>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>Nous contacter</Typography.Title>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>FAQ</Typography.Title>
                </Space>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" size={12}>
                <Typography.Title level={5} style={{ color: 'white' }}>Services</Typography.Title>
                <Space direction="vertical" size={4}>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>Livraison</Typography.Title>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>Retours</Typography.Title>
                  <Typography.Title level={5} style={{ color: '#ccc' }}>Garantie</Typography.Title>
                </Space>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" size={12}>
                <Typography.Title level={5} style={{ color: 'white' }}>Newsletter</Typography.Title>
                <Space direction="vertical" size={8}>
                  <Input placeholder="Votre email" style={{ background: 'white' }} />
                  <Button type="primary" style={{ background: '#ff9900', borderColor: '#ff9900' }}>
                    S&apos;abonner
                  </Button>
                </Space>
              </Space>
            </Col>
          </Row>
          <div style={{ borderTop: '1px solid #3a4553', marginTop: 32, paddingTop: 20, textAlign: 'center' }}>
            <Typography.Title level={5} style={{ color: '#ccc' }}>© 2024 ProductManager. Tous droits réservés.</Typography.Title>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}