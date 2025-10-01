import React from 'react';
import { Spin } from 'antd';
import { centeredLoadingStyle } from '../../constants/styles';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  message?: string;
  style?: React.CSSProperties;
}

/**
 * Composant de chargement centré réutilisable
 */
export default function LoadingSpinner({ 
  size = 'large', 
  message,
  style 
}: LoadingSpinnerProps) {
  return (
    <div style={{ ...centeredLoadingStyle, ...style }}>
      <Spin size={size} />
      {message && (
        <div style={{ marginTop: 16, color: '#666' }}>
          {message}
        </div>
      )}
    </div>
  );
}