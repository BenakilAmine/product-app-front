'use client';

import React from 'react';
import { ToastProvider } from '@/lib/toast-context';

interface ToastContainerProps {
  children: React.ReactNode;
}

export default function ToastContainer({ children }: ToastContainerProps) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}