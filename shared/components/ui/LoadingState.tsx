'use client';

import React from 'react';
import { Spin, Card, Skeleton, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingStateProps {
  type?: 'spinner' | 'skeleton' | 'card';
  message?: string;
  size?: 'small' | 'default' | 'large';
  rows?: number;
  columns?: number;
  height?: number;
  className?: string;
}

export default function LoadingState({
  type = 'spinner',
  message = 'Chargement...',
  size = 'large',
  rows = 3,
  columns = 4,
  height = 200,
  className
}: LoadingStateProps) {
  if (type === 'spinner') {
    return (
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: height,
          flexDirection: 'column',
          gap: 16
        }}
        className={className}
      >
        <Spin 
          size={size} 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
        />
        <span style={{ color: '#8c8c8c' }}>{message}</span>
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className={className}>
        <Row gutter={[16, 16]}>
          {Array.from({ length: rows * columns }).map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card>
                <Skeleton.Image active style={{ width: '100%', height: 200 }} />
                <div style={{ padding: 16 }}>
                  <Skeleton active paragraph={{ rows: 2 }} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <Card className={className}>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin 
            size={size} 
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
          />
          <div style={{ marginTop: 16, color: '#8c8c8c' }}>{message}</div>
        </div>
      </Card>
    );
  }

  return null;
}