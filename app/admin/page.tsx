'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { ReloadOutlined, ExportOutlined, SettingOutlined } from '@ant-design/icons';
import AdminLayout from '../../components/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import KpiCards from '../../components/admin/KpiCards';
import RevenueAnalytics from '../../components/admin/RevenueAnalytics';
import MonthlyTarget from '../../components/admin/MonthlyTarget';
import TopCategories from '../../components/admin/TopCategories';
import ActiveUser from '../../components/admin/ActiveUser';
import ConversionRate from '../../components/admin/ConversionRate';
import TrafficSources from '../../components/admin/TrafficSources';
import RecentOrders from '../../components/admin/RecentOrders/RecentOrders';
import RecentActivity from '../../components/admin/RecentActivity';
import { useAuth } from '../../lib/auth-context';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '../../shared';

export default function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  
  // Récupération des données des produits
  const { products, productsLoading } = useAdminProducts(false);

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

  if (loading || redirecting) {
    return <LoadingSpinner message="Chargement du dashboard..." />;
  }

  // Affichage conditionnel du contenu - on affiche le dashboard même en cas de chargement
  // if (productsLoading) {
  //   return (
  //     <AdminLayout>
  //       <div style={{ 
  //         padding: '24px', 
  //         background: '#f9fafb',
  //         minHeight: '100vh',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center'
  //       }}>
  //         <LoadingSpinner message="Chargement des données des produits..." />
  //       </div>
  //     </AdminLayout>
  //   );
  // }

  // Calcul des métriques réelles basées sur les produits
  const totalProducts = products?.length || 0;
  const totalValue = products?.reduce((sum: number, product: any) => sum + (product.price || 0), 0) || 0;
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;
  
  // Calcul des prix min/max pour plus d'informations
  const prices = products?.map((product: any) => product.price || 0) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  
  // Métriques basées uniquement sur les vraies données
  const metrics = {
    totalProducts,
    totalValue,
    averagePrice,
    minPrice,
    maxPrice,
    // Suppression des estimations fictives
    totalSales: totalValue, // Utilise la valeur réelle des produits
    totalOrders: totalProducts, // Utilise le nombre réel de produits
    totalVisitors: totalProducts // Utilise le nombre réel de produits
  };

  return (
    <AdminLayout>
      <div style={{ 
        padding: '24px', 
        background: '#f9fafb',
        minHeight: '100vh'
      }}>
        {/* Header de la page */}
        <PageHeader
          title="Dashboard Administrateur"
          subtitle={productsLoading ? "Chargement des données des produits..." : "Vue d'ensemble des performances et métriques de l'application"}
          emoji="📊"
          actions={[
            {
              key: 'refresh',
              label: 'Actualiser',
              icon: <ReloadOutlined />,
              onClick: () => window.location.reload(),
              loading: productsLoading
            },
            {
              key: 'export',
              label: 'Exporter',
              icon: <ExportOutlined />,
              onClick: () => console.log('Export dashboard')
            },
            {
              key: 'settings',
              label: 'Paramètres',
              icon: <SettingOutlined />,
              onClick: () => console.log('Open settings')
            }
          ]}
        />


        {/* KPI Cards */}
        <KpiCards metrics={metrics} loading={productsLoading} />

        {/* Analytics Row */}
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          <Col xs={24} xl={24} xxl={12}>
            <RevenueAnalytics products={products} totalValue={totalValue} />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={6}>
            <MonthlyTarget />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={6}>
            <TopCategories products={products} />
          </Col>
        </Row>

        {/* User Metrics Row */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <ActiveUser />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <ConversionRate />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <TrafficSources />
          </Col>
        </Row>

        {/* Recent Orders Row */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <RecentOrders />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <RecentActivity />
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
}