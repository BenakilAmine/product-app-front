'use client';

import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

export default function TrafficSources() {
  const trafficData = [
    { source: 'Direct Traffic', percentage: 40, color: '#f97316' },
    { source: 'Organic Search', percentage: 30, color: '#ea580c' },
    { source: 'Social Media', percentage: 15, color: '#dc2626' },
    { source: 'Referral Traffic', percentage: 10, color: '#b91c1c' },
    { source: 'Email Campaigns', percentage: 5, color: '#991b1b' },
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
      <Title level={4} style={{ margin: 0, color: '#111827', marginBottom: 24, fontSize: 18, fontWeight: 600 }}>
        Traffic Sources
      </Title>

      {/* Barre empilée horizontale */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          width: '100%',
          height: 20,
          background: '#f3f4f6',
          borderRadius: 10,
          display: 'flex',
          overflow: 'hidden'
        }}>
          {trafficData.map((item, index) => (
            <div
              key={index}
              style={{
                width: `${item.percentage}%`,
                height: '100%',
                background: item.color,
                transition: 'width 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Légende */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {trafficData.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: item.color
              }} />
              <Text style={{ color: '#111827', fontSize: 14, fontWeight: 500 }}>
                {item.source}
              </Text>
            </div>
            <Text style={{ color: '#6b7280', fontSize: 14 }}>
              {item.percentage}%
            </Text>
          </div>
        ))}
      </div>
    </Card>
  );
}