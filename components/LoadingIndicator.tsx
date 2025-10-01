'use client';

import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

interface LoadingIndicatorProps {
  loading?: boolean;
  children: React.ReactNode;
}

export default function LoadingIndicator({ loading = false, children }: LoadingIndicatorProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai minimum pour éviter le flash
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Retirer la classe loading du body
      document.body.classList.remove('loading');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: '#666' }}>
            Chargement...
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}