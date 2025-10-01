'use client';

import React from 'react';
import { Form, Card, Space, Divider, Button, Row, Col } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  onBack?: () => void;
  backUrl?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  showCard?: boolean;
  className?: string;
}

export default function FormLayout({
  title,
  subtitle,
  icon,
  children,
  loading = false,
  onBack,
  backUrl,
  backLabel = 'Retour',
  actions,
  showCard = true,
  className
}: FormLayoutProps) {
  const renderBackButton = () => {
    if (onBack) {
      return (
        <Button 
          icon={<ArrowLeftOutlined />} 
          type="text" 
          onClick={onBack}
          disabled={loading}
        >
          {backLabel}
        </Button>
      );
    }

    if (backUrl) {
      return (
        <Link href={backUrl}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            type="text"
            disabled={loading}
          >
            {backLabel}
          </Button>
        </Link>
      );
    }

    return null;
  };

  const header = (
    <div style={{ marginBottom: 24 }}>
      <Space align="center" style={{ marginBottom: 16 }}>
        {renderBackButton()}
      </Space>
      
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        {icon && (
          <div style={{ marginBottom: 16 }}>
            {icon}
          </div>
        )}
        <h2 style={{ margin: 0, color: '#131921' }}>{title}</h2>
        {subtitle && (
          <p style={{ color: '#8c8c8c', margin: '8px 0 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>

      <Divider />
    </div>
  );

  const content = (
    <div className={className}>
      {header}
      {children}
      {actions && (
        <>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            {actions}
          </div>
        </>
      )}
    </div>
  );

  if (showCard) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          {content}
        </Card>
      </div>
    );
  }

  return content;
}