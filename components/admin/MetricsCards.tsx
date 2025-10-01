'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { UserOutlined, ShopOutlined, LineChartOutlined, CrownOutlined } from '@ant-design/icons';
import KpiCard from './KpiCard';
import { MetricsCardsProps } from '../../types';

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard
          icon={<UserOutlined />}
          label="Utilisateurs Totaux"
          value={metrics?.totalUsers ?? '-'}
          valueColor="#1f1f1f"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard
          icon={<ShopOutlined />}
          label="Produits Totaux"
          value={metrics?.totalProducts ?? '-'}
          valueColor="#1f1f1f"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard
          icon={<LineChartOutlined />}
          label="Nouveaux Produits (7j)"
          value={metrics?.productsLast7d ?? '-'}
          valueColor="#1f1f1f"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard
          icon={<CrownOutlined />}
          label="Administrateurs"
          value={metrics?.adminsCount ?? '-'}
          valueColor="#1f1f1f"
        />
      </Col>
    </Row>
  );
}