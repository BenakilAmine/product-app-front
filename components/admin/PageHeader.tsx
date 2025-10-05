'use client';

import React from 'react';
import { Typography, Button, Space } from 'antd';

const { Title, Text } = Typography;

export interface PageHeaderAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  loading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface PageHeaderProps {
  title: string;
  subtitle: string;
  emoji?: string;
  actions?: PageHeaderAction[];
}

export default function PageHeader({ title, subtitle, emoji, actions = [] }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <Title level={2} style={{ margin: 0, color: '#111827', fontSize: 28, fontWeight: 700 }}>
            {emoji && `${emoji} `}{title}
          </Title>
          <Text style={{ color: '#6b7280', fontSize: 16 }}>
            {subtitle}
          </Text>
        </div>
        {actions.length > 0 && (
          <Space wrap>
            {actions.map((action) => (
              <Button
                key={action.key}
                icon={action.icon}
                onClick={action.onClick}
                type={action.type || 'default'}
                loading={action.loading}
                disabled={action.disabled}
                style={{
                  borderRadius: 8,
                  ...(action.type === 'primary' && {
                    background: '#f97316',
                    borderColor: '#f97316'
                  }),
                  ...action.style
                }}
              >
                {action.label}
              </Button>
            ))}
          </Space>
        )}
      </div>
    </div>
  );
}