'use client';

import { Button, Space, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

interface PageHeaderAction {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
  loading?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: PageHeaderAction[];
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header
      role="banner"
      aria-labelledby="page-title"
      style={{
        background: '#ffffff',
        padding: 24,
        borderRadius: 12,
        marginBottom: 24,
        border: '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <Title level={2} id="page-title" style={{ margin: 0, color: '#1f1f1f' }}>
            {title}
          </Title>
          {subtitle && (
            <Text type="secondary" style={{ fontSize: 14, color: '#666666' }}>
              {subtitle}
            </Text>
          )}
        </div>
        {actions && actions.length > 0 && (
          <nav role="toolbar" aria-label="Actions de la page">
            <Space wrap>
              {actions.map((action) => (
                <Button
                  key={action.key}
                  type={action.type}
                  icon={action.icon}
                  onClick={action.onClick}
                  loading={action.loading}
                  aria-label={typeof action.label === 'string' ? action.label : undefined}
                >
                  {action.label}
                </Button>
              ))}
            </Space>
          </nav>
        )}
      </div>
    </header>
  );
}

