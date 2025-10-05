'use client';

import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { 
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShopOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface KpiCardsProps {
  metrics?: {
    totalProducts?: number;
    totalValue?: number;
    averagePrice?: number;
    minPrice?: number;
    maxPrice?: number;
  };
  loading?: boolean;
}

export default function KpiCards({ metrics, loading = false }: KpiCardsProps) {
  
  // Formatage des valeurs
  const formatCurrency = (value: number) => new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);

  const formatNumber = (value: number) => new Intl.NumberFormat('fr-FR').format(value);

  const kpiData = [
    {
      title: 'Valeur Totale',
      value: loading ? 'Chargement...' : formatCurrency(metrics?.totalValue || 0),
      trend: { value: 0, isPositive: true },
      icon: <DollarOutlined style={{ fontSize: 20, color: 'white' }} />,
      iconBg: '#f97316',
      background: '#ffffff',
      borderColor: '#fef3c7'
    },
    {
      title: 'Prix Moyen',
      value: loading ? 'Chargement...' : formatCurrency(metrics?.averagePrice || 0),
      trend: { value: 0, isPositive: true },
      icon: <ShoppingCartOutlined style={{ fontSize: 20, color: 'white' }} />,
      iconBg: '#6b7280',
      background: '#ffffff',
      borderColor: '#f3f4f6'
    },
    {
      title: 'Total Produits',
      value: loading ? 'Chargement...' : formatNumber(metrics?.totalProducts || 0),
      trend: { value: 0, isPositive: true },
      icon: <ShopOutlined style={{ fontSize: 20, color: 'white' }} />,
      iconBg: '#10b981',
      background: '#ffffff',
      borderColor: '#d1fae5'
    }
  ];

  return (
    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
      {kpiData.map((item, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card
            style={{
              borderRadius: 16,
              border: `1px solid ${item.borderColor}`,
              background: item.background,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
            bodyStyle={{
              padding: '24px',
              height: '100%',
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* Icône en haut à droite */}
            <div style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: item.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}>
              {item.icon}
            </div>

            {/* Contenu principal */}
            <div style={{ marginTop: 8 }}>
              <Text style={{ 
                color: '#6b7280', 
                fontSize: 14,
                fontWeight: 500,
                display: 'block',
                marginBottom: 8
              }}>
                {item.title}
              </Text>

              <Title level={1} style={{ 
                margin: 0, 
                color: '#111827',
                fontSize: 36,
                fontWeight: 700,
                lineHeight: 1,
                marginBottom: 8
              }}>
                {item.value}
              </Title>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 4
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  color: item.trend.isPositive ? '#10b981' : '#ef4444',
                  fontSize: 14,
                  fontWeight: 500
                }}>
                  {item.trend.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  {item.trend.value}%
                </div>
                <Text style={{ 
                  color: '#6b7280', 
                  fontSize: 14
                }}>
                  vs last week
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}