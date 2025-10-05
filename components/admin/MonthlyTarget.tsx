'use client';

import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

export default function MonthlyTarget() {
  const data = [
    { name: 'Completed', value: 85, color: '#f97316' },
    { name: 'Remaining', value: 15, color: '#e5e7eb' },
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
        Monthly Target
      </Title>

      {/* Graphique en demi-cercle avec Recharts */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ 
          height: 200, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative'
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>
              85%
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Text style={{ color: '#10b981', fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 8 }}>
          +8.02% from last month
        </Text>
        <Text style={{ color: '#111827', fontSize: 16, fontWeight: 600, display: 'block', marginBottom: 4 }}>
          Great Progress! 🎉
        </Text>
        <Text style={{ color: '#6b7280', fontSize: 12, display: 'block', lineHeight: 1.4 }}>
          Our achievement increased by $200,000, let's reach 100% next month.
        </Text>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <div style={{ 
            padding: '12px', 
            background: '#f9fafb', 
            borderRadius: 8,
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <Text style={{ color: '#6b7280', fontSize: 12, display: 'block', marginBottom: 4 }}>
              Target
            </Text>
            <Text style={{ color: '#111827', fontSize: 16, fontWeight: 600 }}>
              $600.000
            </Text>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ 
            padding: '12px', 
            background: '#f9fafb', 
            borderRadius: 8,
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <Text style={{ color: '#6b7280', fontSize: 12, display: 'block', marginBottom: 4 }}>
              Revenue
            </Text>
            <Text style={{ color: '#111827', fontSize: 16, fontWeight: 600 }}>
              $510.000
            </Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
}