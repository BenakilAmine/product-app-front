'use client';

import React from 'react';
import { Card, Typography, Button } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

interface TopCategoriesProps {
  products?: any[];
}

export default function TopCategories({ products = [] }: TopCategoriesProps) {
  // Génération de données basées sur les vrais produits
  const generateCategoryData = () => {
    if (products.length === 0) {
      return [
        { category: 'Aucun produit', value: 0, color: '#f97316' }
      ];
    }

    // Simulation de catégories basées sur les prix des produits
    const lowPrice = products.filter(p => p.price < 50).length;
    const midPrice = products.filter(p => p.price >= 50 && p.price < 200).length;
    const highPrice = products.filter(p => p.price >= 200).length;

    const data = [];
    if (lowPrice > 0) data.push({ category: 'Prix bas (<50€)', value: lowPrice, color: '#f97316' });
    if (midPrice > 0) data.push({ category: 'Prix moyen (50-200€)', value: midPrice, color: '#ea580c' });
    if (highPrice > 0) data.push({ category: 'Prix élevé (>200€)', value: highPrice, color: '#dc2626' });

    return data.length > 0 ? data : [{ category: 'Aucun produit', value: 0, color: '#f97316' }];
  };

  const data = generateCategoryData();

  const totalSales = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card
      style={{
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
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
          Top Categories
        </Title>
        <Button type="link" style={{ padding: 0, color: '#f97316', fontSize: 14, fontWeight: 500 }}>
          See All
        </Button>
      </div>

      {/* Graphique en donut avec Recharts */}
      <div style={{ 
        height: 250, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
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
          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
            Total Sales
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>
            ${totalSales.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Liste des catégories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.map((item, index) => (
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
                {item.category}
              </Text>
            </div>
            <Text style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>
              ${item.value.toLocaleString()}
            </Text>
          </div>
        ))}
      </div>
    </Card>
  );
}