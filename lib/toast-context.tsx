'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// Types simples pour les toasts
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Options simples pour les toasts
export interface ToastOptions {
  duration?: number;
  position?: string;
  icon?: any;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Interface simple du contexte
interface ToastContextType {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
}

// Création du contexte
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook pour utiliser le contexte
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast doit être utilisé dans un ToastProvider');
  }
  return context;
};

// Composant Toast personnalisé (simplifié)
const CustomToast = ({ 
  message, 
  type, 
  icon, 
  action 
}: { 
  message: string; 
  type: ToastType; 
  icon?: any; 
  action?: { label: string; onClick: () => void; };
}) => {
  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'error':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'info':
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '12px 16px',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: `1px solid ${type === 'error' ? '#ff4d4f' : type === 'warning' ? '#faad14' : type === 'success' ? '#52c41a' : '#1890ff'}`,
      minWidth: '300px',
      maxWidth: '400px'
    }}>
      {getIcon()}
      <span style={{ flex: 1, fontSize: '14px', color: '#262626' }}>
        {message}
      </span>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: 'none',
            border: 'none',
            color: '#1890ff',
            cursor: 'pointer',
            fontSize: '12px',
            textDecoration: 'underline',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

// Provider du contexte (simplifié)
export const ToastProvider = ({ children }: { children: any }) => {
  const showToast = (message: string, type: ToastType = 'info', options: ToastOptions = {}) => {
    const { duration = 4000, position = 'top-right', icon, action } = options;
    
    return toast.custom(
      (t) => (
        <CustomToast 
          message={message} 
          type={type} 
          icon={icon}
          action={action}
        />
      ),
      {
        duration,
        position,
        id: `${type}-${Date.now()}`,
      }
    );
  };

  const success = (message: string, options?: ToastOptions) => 
    showToast(message, 'success', options);
  
  const error = (message: string, options?: ToastOptions) => 
    showToast(message, 'error', options);
  
  const warning = (message: string, options?: ToastOptions) => 
    showToast(message, 'warning', options);
  
  const info = (message: string, options?: ToastOptions) => 
    showToast(message, 'info', options);

  const dismiss = (toastId: string) => toast.dismiss(toastId);
  const dismissAll = () => toast.dismiss();

  const value: ToastContextType = {
    showToast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
        }}
      />
    </ToastContext.Provider>
  );
};