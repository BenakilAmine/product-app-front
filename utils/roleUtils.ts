import React from 'react';
import { CrownOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

/**
 * Retourne la couleur associée à un rôle utilisateur
 */
export const getRoleColor = (role: string): string => {
  switch (role) {
    case 'SUPER_ADMIN': return 'red';
    case 'ADMIN': return 'blue';
    case 'USER': return 'green';
    default: return 'default';
  }
};

/**
 * Retourne l'icône associée à un rôle utilisateur
 */
export const getRoleIcon = (role: string): React.ReactNode => {
  switch (role) {
    case 'SUPER_ADMIN': return React.createElement(CrownOutlined);
    case 'ADMIN': return React.createElement(TeamOutlined);
    case 'USER': return React.createElement(UserOutlined);
    default: return React.createElement(UserOutlined);
  }
};

/**
 * Retourne la couleur de fond pour l'avatar selon le rôle
 */
export const getRoleBackgroundColor = (role: string): string => {
  switch (role) {
    case 'SUPER_ADMIN': return '#ff4d4f';
    case 'ADMIN': return '#1890ff';
    case 'USER': return '#52c41a';
    default: return '#d9d9d9';
  }
};