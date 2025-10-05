'use client';

import React from 'react';
import { Card, Typography, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ConversionRate() {
  const conversionData = [
    { stage: 'Product Views', count: 25000, trend: 9, isPositive: true, color: '#f97316' },
    { stage: 'Add to Cart', count: 12000, trend: 6, isPositive: true, color: '#ea580c' },
    { stage: 'Proceed to Checkout', count: 8500, trend: 4, isPositive: true, color: '#dc2626' },
    { stage: 'Completed Purchases', count: 6200, trend: 7, isPositive: true, color: '#b91c1c' },
    { stage: 'Abandoned Carts', count: 3000, trend: 5, isPositive: false, color: '#6b7280' },
  ];

  return (
    <Card
      style={{
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        height: '100%',
        background: '#ffffff'
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <Title level={4} style={{ margin: 0, color: '#111827', fontSize: 18, fontWeight: 600 }}>
          Conversion Rate
        </Title>
        <Button 
          style={{ 
            background: '#f97316',
            borderColor: '#f97316',
            color: 'white',
            borderRadius: 8,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 500,
            fontSize: 14
          }}
        >
          This Week
          <DownOutlined style={{ fontSize: 12 }} />
        </Button>
      </div>

      {/* Barres en forme d'entonnoir */}
      <div style={{ marginBottom: 20 }}>
        {conversionData.map((item, index) => (
          <div key={index} style={{ marginBottom: 12 }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 4
            }}>
              <Text style={{ color: '#111827', fontSize: 14, fontWeight: 500 }}>
                {item.stage}
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Text style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>
                  {item.count.toLocaleString()}
                </Text>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 4,
                  color: item.isPositive ? '#10b981' : '#ef4444',
                  fontSize: 12,
                  fontWeight: 500
                }}>
                  {item.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  {item.trend}%
                </div>
              </div>
            </div>
            <div style={{
              width: '100%',
              height: 12,
              background: item.color,
              borderRadius: 6,
              position: 'relative'
            }} />
          </div>
        ))}
      </div>
    </Card>
  );
}