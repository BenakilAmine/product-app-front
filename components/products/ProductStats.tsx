'use client';

import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { ShoppingOutlined, DollarOutlined } from '@ant-design/icons';
// import { ProductStatsProps } from '../../types'; // Supprimé car non utilisé
import { colors } from '../../shared';

export default function ProductStats({ totalProducts, totalValue, averagePrice }: ProductStatsProps) {
  return (
    <Card style={{ marginBottom: '24px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="Total des produits"
            value={totalProducts}
            prefix={<ShoppingOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Valeur totale"
            value={totalValue}
            prefix={<DollarOutlined />}
            precision={2}
            valueStyle={{ color: colors.success[500] }}
            formatter={(value) => `${value} €`}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Prix moyen"
            value={averagePrice}
            precision={2}
            valueStyle={{ color: colors.warning[500] }}
            formatter={(value) => `${value} €`}
          />
        </Col>
      </Row>
    </Card>
  );
}