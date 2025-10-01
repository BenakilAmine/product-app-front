'use client';

import React from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined, 
  SaveOutlined,
  ReloadOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons';

interface ActionButton {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  confirm?: {
    title: string;
    description?: string;
    okText?: string;
    cancelText?: string;
  };
}

interface ActionButtonsProps {
  actions: ActionButton[];
  size?: 'small' | 'middle' | 'large';
  direction?: 'horizontal' | 'vertical';
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const defaultIcons: Record<string, React.ReactNode> = {
  edit: <EditOutlined />,
  delete: <DeleteOutlined />,
  add: <PlusOutlined />,
  save: <SaveOutlined />,
  refresh: <ReloadOutlined />,
  view: <EyeOutlined />,
  download: <DownloadOutlined />,
};

export default function ActionButtons({
  actions,
  size = 'middle',
  direction = 'horizontal',
  wrap = false,
  className,
  style
}: ActionButtonsProps) {
  const renderButton = (action: ActionButton) => {
    const button = (
      <Button
        key={action.key}
        type={action.type || 'default'}
        danger={action.danger}
        loading={action.loading}
        disabled={action.disabled}
        icon={action.icon || defaultIcons[action.key]}
        onClick={action.onClick}
        size={size}
      >
        {action.label}
      </Button>
    );

    if (action.confirm) {
      return (
        <Popconfirm
          key={action.key}
          title={action.confirm.title}
          description={action.confirm.description}
          onConfirm={action.onClick}
          okText={action.confirm.okText || 'Confirmer'}
          cancelText={action.confirm.cancelText || 'Annuler'}
        >
          {button}
        </Popconfirm>
      );
    }

    return button;
  };

  return (
    <Space
      direction={direction}
      wrap={wrap}
      className={className}
      style={style}
    >
      {actions.map(renderButton)}
    </Space>
  );
}