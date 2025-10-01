'use client';

import React from 'react';
import { Card, Row, Col, Button, Space, Typography } from 'antd';
import { 
  UserOutlined, 
  ShopOutlined, 
  ShoppingCartOutlined 
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { QuickActionsProps } from '../../types';

const { Text } = Typography;

export default function QuickActions({ metrics }: QuickActionsProps) {
  const router = useRouter();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <Card title="🚀 Actions Rapides">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button 
              type="primary" 
              size="large" 
              icon={<UserOutlined />}
              block
              onClick={() => router.push('/admin/users')}
              style={{ height: 48 }}
            >
              Gérer les Utilisateurs
            </Button>
            <Button 
              size="large" 
              icon={<ShopOutlined />}
              block
              onClick={() => router.push('/admin/products')}
              style={{ height: 48 }}
            >
              Gérer les Produits
            </Button>
            <Button 
              size="large" 
              icon={<ShoppingCartOutlined />}
              block
              onClick={() => router.push('/')}
              style={{ height: 48 }}
            >
              Voir la Boutique
            </Button>
          </Space>
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        <Card title="📊 Statistiques Récentes">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>Utilisateurs actifs</Text>
              <Text style={{ fontSize: 18 }}>{metrics?.totalUsers ?? 0}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>Produits en stock</Text>
              <Text style={{ fontSize: 18 }}>{metrics?.totalProducts ?? 0}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>Nouveautés (7j)</Text>
              <Text style={{ fontSize: 18 }}>{metrics?.productsLast7d ?? 0}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>Équipe admin</Text>
              <Text style={{ fontSize: 18 }}>{metrics?.adminsCount ?? 0}</Text>
            </div>
          </Space>
        </Card>
      </Col>
    </Row>
  );
}