'use client';

import React from 'react';
import { Row, Col } from 'antd';
import KpiCard from '../../admin/KpiCard';
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
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard icon={<ShopOutlined />} label="Total Produits" value={totalProducts} />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard icon={<CalendarOutlined />} label="Nouveaux (7j)" value={productsLast7d} />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard icon={<DollarOutlined />} label="Valeur Totale" value={formatPrice(totalValue)} />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard icon={<FilterOutlined />} label="Prix Moyen" value={formatPrice(averagePrice)} />
      </Col>
    </Row>
  );
}