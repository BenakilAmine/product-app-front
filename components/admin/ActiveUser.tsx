'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ActiveUser() {
  const userData = [
    { country: 'United States', percentage: 36, color: '#f97316' },
    { country: 'United Kingdom', percentage: 24, color: '#ea580c' },
    { country: 'Indonesia', percentage: 17.5, color: '#dc2626' },
    { country: 'Russia', percentage: 15, color: '#b91c1c' },
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
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0, color: '#111827', fontSize: 18, fontWeight: 600 }}>
          Active User
        </Title>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          marginTop: 8
        }}>
          <Text style={{ color: '#111827', fontSize: 24, fontWeight: 700 }}>
            2,758 Users
          </Text>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4,
            color: '#10b981',
            fontSize: 12,
            fontWeight: 500
          }}>
            <ArrowUpOutlined />
            8.02%
          </div>
        </div>
        <Text style={{ color: '#6b7280', fontSize: 12 }}>
          from last month
        </Text>
      </div>

      {/* Barres horizontales simples */}
      <div style={{ marginBottom: 20 }}>
        {userData.map((item, index) => (
          <div key={index} style={{ marginBottom: 16 }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 8
            }}>
              <Text style={{ color: '#111827', fontSize: 14, fontWeight: 500 }}>
                {item.country}
              </Text>
              <Text style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>
                {item.percentage}%
              </Text>
            </div>
            <div style={{
              width: '100%',
              height: 8,
              background: '#f3f4f6',
              borderRadius: 4,
              position: 'relative'
            }}>
              <div style={{
                width: `${item.percentage}%`,
                height: '100%',
                background: '#f97316',
                borderRadius: 4,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}