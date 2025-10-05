'use client';

import { ApolloProvider } from '@apollo/client/react';
import { ConfigProvider } from 'antd';
import { apolloClient } from '../lib/apollo/client';
import { AuthProvider } from '../lib/contexts/auth-context';
import { MyTheme } from '../lib/theme';
import ToastContainer from './ToastContainer';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ConfigProvider theme={MyTheme}>
        <ToastContainer>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ToastContainer>
      </ConfigProvider>
    </ApolloProvider>
  );
}