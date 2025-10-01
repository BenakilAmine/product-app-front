'use client';

import { Card, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface KpiCardProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueColor?: string;
  backgroundColor?: string;
  gradient?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  footer?: React.ReactNode;
  progressPercent?: number;
  progressColor?: string;
}

export default function KpiCard({ icon, label, value, valueColor, /* backgroundColor, gradient,*/ prefix, suffix, footer /*, progressPercent, progressColor*/ }: KpiCardProps) {
  return (
    <Card
      hoverable
      role="region"
      aria-labelledby={`kpi-${label.replace(/\s+/g, '-').toLowerCase()}`}
      style={{
        borderRadius: 12,
        border: '1px solid #f0f0f0',
        transition: 'all 0.2s ease-in-out',
        background: '#ffffff'
      }}
      styles={{ 
        body: { padding: 20 }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        {icon && (
          <div 
            style={{ 
              fontSize: 22, 
              color: '#8c8c8c'
            }}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <Text 
          id={`kpi-${label.replace(/\s+/g, '-').toLowerCase()}`}
          type="secondary" 
          style={{ fontSize: 12, color: '#595959' }}
        >
          {label}
        </Text>
      </div>
      <div 
        style={{ 
          display: 'flex',
          alignItems: 'baseline',
          gap: 8
        }}
      >
        {prefix}
        <div 
          style={{ 
            fontSize: 26, 
            fontWeight: 700, 
            color: valueColor || '#1f1f1f',
            lineHeight: 1.2
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
        </div>
        {suffix}
      </div>
      {footer && (
        <div style={{ marginTop: 8 }}>
          {footer}
        </div>
      )}
    </Card>
  );
}

