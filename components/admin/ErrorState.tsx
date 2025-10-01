'use client';

import { Result, Button, Typography } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

const { Text } = Typography;

interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actions?: {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'default';
  }[];
  status?: 'error' | 'warning' | 'info';
}

export default function ErrorState({ 
  title = 'Une erreur est survenue',
  description = 'Impossible de charger les données. Veuillez réessayer.',
  icon,
  actions,
  status = 'error'
}: ErrorStateProps) {
  const defaultActions = [
    {
      label: 'Réessayer',
      onClick: () => window.location.reload(),
      type: 'primary' as const
    }
  ];

  return (
    <Result
      status={status}
      icon={icon || <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
      title={title}
      subTitle={
        <Text type="secondary">
          {description}
        </Text>
      }
      extra={
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {(actions || defaultActions).map((action, index) => (
            <Button 
              key={index}
              type={action.type || 'default'}
              icon={action.label === 'Réessayer' ? <ReloadOutlined /> : undefined}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      }
    />
  );
}