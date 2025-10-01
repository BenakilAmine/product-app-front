'use client';

import React from 'react';
import { Empty, Button, Card } from 'antd';
import { 
  InboxOutlined, 
  SearchOutlined, 
  PlusOutlined,
  ReloadOutlined 
} from '@ant-design/icons';

interface EmptyStateProps {
  type?: 'no-data' | 'no-results' | 'error' | 'empty';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
    icon?: React.ReactNode;
  }>;
  showCard?: boolean;
  className?: string;
}

export default function EmptyState({
  type = 'no-data',
  title,
  description,
  icon,
  actions = [],
  showCard = false,
  className
}: EmptyStateProps) {
  const getDefaultConfig = () => {
    switch (type) {
      case 'no-data':
        return {
          title: title || 'Aucune donnée',
          description: description || 'Il n\'y a actuellement aucune donnée à afficher.',
          icon: icon || <InboxOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />,
          defaultActions: [
            {
              label: 'Actualiser',
              onClick: () => window.location.reload(),
              type: 'primary' as const,
              icon: <ReloadOutlined />
            }
          ]
        };
      case 'no-results':
        return {
          title: title || 'Aucun résultat',
          description: description || 'Aucun résultat ne correspond à vos critères de recherche.',
          icon: icon || <SearchOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />,
          defaultActions: [
            {
              label: 'Effacer les filtres',
              onClick: () => window.location.reload(),
              type: 'default' as const
            }
          ]
        };
      case 'error':
        return {
          title: title || 'Erreur de chargement',
          description: description || 'Une erreur est survenue lors du chargement des données.',
          icon: icon || <InboxOutlined style={{ fontSize: 64, color: '#ff4d4f' }} />,
          defaultActions: [
            {
              label: 'Réessayer',
              onClick: () => window.location.reload(),
              type: 'primary' as const,
              icon: <ReloadOutlined />
            }
          ]
        };
      case 'empty':
        return {
          title: title || 'Liste vide',
          description: description || 'Commencez par ajouter votre premier élément.',
          icon: icon || <PlusOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />,
          defaultActions: [
            {
              label: 'Ajouter',
              onClick: () => {},
              type: 'primary' as const,
              icon: <PlusOutlined />
            }
          ]
        };
      default:
        return {
          title: title || 'Aucune donnée',
          description: description || 'Il n\'y a actuellement aucune donnée à afficher.',
          icon: icon || <InboxOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />,
          defaultActions: []
        };
    }
  };

  const config = getDefaultConfig();
  const displayActions = actions.length > 0 ? actions : config.defaultActions;
console.log("displayActions", displayActions);
  const content = (
    <Empty
      image={config.icon}
      styles={{ image: { height: 64 } }}
      description={
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
            {config.title}
          </div>
          <div style={{ color: '#8c8c8c' }}>
            {config.description}
          </div>
        </div>
      }
    >
      {displayActions.length > 0 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {displayActions.map((action, index) => (
            <Button
              key={index}
              type={action.type || 'default'}
              // icon={action.icon}/
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </Empty>
  );

  if (showCard) {
    return (
      <Card className={className}>
        {content}
      </Card>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}