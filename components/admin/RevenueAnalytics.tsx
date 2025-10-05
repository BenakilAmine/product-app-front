'use client';

import React, { useState } from 'react';
import { Card, Typography, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

interface RevenueAnalyticsProps {
  products?: any[];
  totalValue?: number;
}

export default function RevenueAnalytics({ products = [], totalValue = 0 }: RevenueAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('revenue');

  // Génération de données basées sur les vrais produits
  const generateRevenueData = () => {
    if (products.length === 0) {
      return [
        { date: '12 Aug', revenue: 0, orders: 0 },
        { date: '13 Aug', revenue: 0, orders: 0 },
        { date: '14 Aug', revenue: 0, orders: 0 },
        { date: '15 Aug', revenue: 0, orders: 0 },
        { date: '16 Aug', revenue: 0, orders: 0 },
        { date: '17 Aug', revenue: 0, orders: 0 },
        { date: '18 Aug', revenue: 0, orders: 0 },
        { date: '19 Aug', revenue: 0, orders: 0 },
      ];
    }

    // Simulation de données basées sur la valeur réelle des produits
    const baseValue = totalValue / 8; // Répartir sur 8 jours
    return [
      { date: '12 Aug', revenue: Math.round(baseValue * 0.8), orders: Math.round(products.length * 0.3) },
      { date: '13 Aug', revenue: Math.round(baseValue * 0.9), orders: Math.round(products.length * 0.33) },
      { date: '14 Aug', revenue: Math.round(baseValue * 1.0), orders: Math.round(products.length * 0.36) },
      { date: '15 Aug', revenue: Math.round(baseValue * 0.95), orders: Math.round(products.length * 0.35) },
      { date: '16 Aug', revenue: Math.round(baseValue * 0.88), orders: Math.round(products.length * 0.34) },
      { date: '17 Aug', revenue: Math.round(baseValue * 0.92), orders: Math.round(products.length * 0.35) },
      { date: '18 Aug', revenue: Math.round(baseValue * 1.05), orders: Math.round(products.length * 0.4) },
      { date: '19 Aug', revenue: Math.round(baseValue * 1.02), orders: Math.round(products.length * 0.38) },
    ];
  };

  const data = generateRevenueData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div style={{
          background: 'rgba(249, 115, 22, 0.1)',
          border: '1px solid #f97316',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 12,
          color: '#111827',
          fontWeight: 500
        }}>
          <p style={{ margin: 0 }}>Revenue {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)}</p>
        </div>
      );
    }
    return null;
  };

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
          Revenue Analytics
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
          Last 8 Days
          <DownOutlined style={{ fontSize: 12 }} />
        </Button>
      </div>

      {/* Onglets Revenue/Order */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 24,
        marginBottom: 20,
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            paddingBottom: 8,
            borderBottom: activeTab === 'revenue' ? '2px solid #f97316' : 'none',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('revenue')}
        >
          <Text style={{ 
            color: activeTab === 'revenue' ? '#f97316' : '#6b7280', 
            fontSize: 14, 
            fontWeight: activeTab === 'revenue' ? 600 : 500 
          }}>
            Revenue
          </Text>
        </div>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            paddingBottom: 8,
            borderBottom: activeTab === 'order' ? '2px solid #f97316' : 'none',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('order')}
        >
          <Text style={{ 
            color: activeTab === 'order' ? '#f97316' : '#6b7280', 
            fontSize: 14, 
            fontWeight: activeTab === 'order' ? 600 : 500 
          }}>
            Order
          </Text>
        </div>
      </div>

      {/* Graphique Recharts */}
      <div style={{ height: 300, marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 16000]}
              tickFormatter={(value) => `${value/1000}K`}
            />
            <Tooltip 
              content={<CustomTooltip />}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#f97316" 
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#f97316', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#f97316" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Message tooltip */}
      <div style={{ 
        padding: '12px 16px', 
        background: '#f9fafb', 
        borderRadius: 8,
        border: '1px solid #e5e7eb'
      }}>
        <Text style={{ color: '#6b7280', fontSize: 12 }}>
          Tooltip: $14,521 on 14 Aug
        </Text>
      </div>
    </Card>
  );
}