'use client';

import React from 'react';
import { Card, Row, Col, Input, Typography, Slider, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ProductFiltersProps } from '../../types';

const { Text } = Typography;

export default function ProductFilters({
  search,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  sort,
  onSortChange,
  maxPrice
}: ProductFiltersProps) {
  return (
    <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1200 }}>
        <Card style={{ borderRadius: 12 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={10}>
              <Input
                size="large"
                placeholder="Rechercher un produit"
                prefix={<SearchOutlined />}
                allowClear
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Text type="secondary">Prix</Text>
                <Slider
                  range
                  min={0}
                  max={Math.max(maxPrice, 100)}
                  step={1}
                  value={priceRange}
                  onChange={(val) => onPriceRangeChange(val as [number, number])}
                />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                size="large"
                style={{ width: '100%' }}
                value={sort}
                onChange={(v) => onSortChange(v)}
                options={[
                  { value: 'recent', label: 'Plus récents' },
                  { value: 'price_asc', label: 'Prix croissant' },
                  { value: 'price_desc', label: 'Prix décroissant' },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}