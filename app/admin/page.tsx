'use client';
// import { Alert, Button } from 'antd'; // Supprimé car non utilisé
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import MetricsCards from '../../components/admin/MetricsCards';
import QuickActions from '../../components/admin/QuickActions';
import { EmptyState, LoadingSpinner } from '../../shared';
import { useAdminMetrics } from '../../hooks/useAdminMetrics';
import { ReloadOutlined } from '@ant-design/icons';
import { PageAction } from '../../types';

export default function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const { metrics, loading: metricsLoading, error, handleRefresh } = useAdminMetrics();

  useEffect(() => {
    console.log('🔍 Admin Dashboard - État auth:', { loading, isAuthenticated, user });
    if (!loading) {
      if (!isAuthenticated) {
        console.log('❌ Redirection - Pas authentifié');
        setRedirecting(true);
        router.replace('/login');
      } else if (user?.role !== 'SUPER_ADMIN') {
        console.log('❌ Redirection - Rôle insuffisant:', user?.role);
        setRedirecting(true);
        router.replace('/');
      } else {
        console.log('✅ Utilisateur authentifié comme SUPER_ADMIN:', user);
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || redirecting || metricsLoading) {
    return <LoadingSpinner message="Chargement du dashboard..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Erreur de chargement"
        description="Impossible de charger les métriques du dashboard"
        actions={[{
          label: 'Réessayer',
          onClick: handleRefresh,
          type: 'primary'
        }]}
      />
    );
  }

  return (
    <AdminLayout>
      <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto', minHeight: '100vh' }}>
        <PageHeader
          title="🎯 Dashboard Administrateur"
          subtitle="Vue d'ensemble de la plateforme et supervision des activités"
          actions={[
            {
              key: 'refresh',
              label: 'Actualiser',
              type: 'primary',
              icon: <ReloadOutlined />,
              onClick: handleRefresh,
              loading: metricsLoading,
            },
          ] as PageAction[]}
        />

        <MetricsCards metrics={metrics} />

        <QuickActions metrics={metrics} />
      </div>
    </AdminLayout>
  );
}