'use client';

import React from 'react';
import { Card, Typography, Space, Avatar } from 'antd';
import { 
  ShoppingCartOutlined,
  EditOutlined,
  StarOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      icon: <ShoppingCartOutlined style={{ color: '#f97316', fontSize: 16 }} />,
      text: "Maureen Steel purchased 2 items totaling $120.",
      time: "10:30 AM",
      color: '#f97316'
    },
    {
      id: 2,
      icon: <EditOutlined style={{ color: '#3b82f6', fontSize: 16 }} />,
      text: "The price of 'Smart TV' was updated from $500 to $450.",
      time: "9:45 AM",
      color: '#3b82f6'
    },
    {
      id: 3,
      icon: <StarOutlined style={{ color: '#10b981', fontSize: 16 }} />,
      text: "Vincent Laurent left a 5-star review for 'Wireless Headphones.'",
      time: "8:20 AM",
      color: '#10b981'
    },
    {
      id: 4,
      icon: <WarningOutlined style={{ color: '#f59e0b', fontSize: 16 }} />,
      text: "'Running Shoes' stock is below 10 units.",
      time: "7:50 AM",
      color: '#f59e0b'
    },
    {
      id: 5,
      icon: <CheckCircleOutlined style={{ color: '#8b5cf6', fontSize: 16 }} />,
      text: "Damian Ugo's order status changed from 'Pending' to 'Processing.'",
      time: "7:00 AM",
      color: '#8b5cf6'
    },
  ];

  return (
    <Card
      style={{
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        height: '100%'
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <Title level={4} style={{ margin: 0, color: '#111827', marginBottom: 24 }}>
        Recent Activity
      </Title>

      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {activities.map((activity) => (
          <div key={activity.id} style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: 12,
            padding: '12px 0',
            borderBottom: '1px solid #f3f4f6'
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${activity.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {activity.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ 
                color: '#111827', 
                fontSize: 14, 
                lineHeight: 1.4,
                display: 'block',
                marginBottom: 4
              }}>
                {activity.text}
              </Text>
              <Text style={{ 
                color: '#6b7280', 
                fontSize: 12 
              }}>
                {activity.time}
              </Text>
            </div>
          </div>
        ))}
      </Space>
    </Card>
  );
}