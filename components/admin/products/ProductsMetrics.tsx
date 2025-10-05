'use client';

import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { ShopOutlined, CalendarOutlined, DollarOutlined, FilterOutlined } from '@ant-design/icons';

export interface ProductsMetricsProps {
  totalProducts: number;
  productsLast7d: number;
  totalValue: number;
  averagePrice: number;
}

export default function ProductsMetrics({ totalProducts, productsLast7d, totalValue, averagePrice }: ProductsMetricsProps) {
  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

  return (
    <Card
      style={{
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        background: '#ffffff',
        marginBottom: 24
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Statistic
            title="Total Produits"
            value={totalProducts}
            prefix={<ShopOutlined style={{ color: '#f97316' }} />}
            valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic
            title="Nouveaux (7j)"
            value={productsLast7d}
            prefix={<CalendarOutlined style={{ color: '#10b981' }} />}
            valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic
            title="Valeur Totale"
            value={totalValue}
            prefix={<DollarOutlined style={{ color: '#10b981' }} />}
            formatter={(value) => formatPrice(Number(value))}
            valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic
            title="Prix Moyen"
            value={averagePrice}
            prefix={<FilterOutlined style={{ color: '#6b7280' }} />}
            formatter={(value) => formatPrice(Number(value))}
            valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
          />
        </Col>
      </Row>
    </Card>
  );
}