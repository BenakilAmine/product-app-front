'use client';
import { Layout } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
// import AdminSidebar from './admin/AdminSidebar';
// import ModernAdminSidebar from './admin/ModernAdminSidebar';
import Sidebar from './admin/Sidebar';
// import AdminHeader from './admin/AdminHeader';
// import ModernAdminHeader from './admin/ModernAdminHeader';
import Header from './admin/Header';
// import AdminDesktopHeader from './admin/AdminDesktopHeader';
import MobileDrawer from './admin/MobileDrawer';
import { AdminLayoutProps } from '../types';

const { Sider, Content } = Layout;

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
    if (isMobile) {
      setMobileDrawerVisible(false);
    }
  };

  const handleMobileMenuClick = () => {
    setMobileDrawerVisible(true);
  };

  if (isMobile) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f9fafb' }}>
          <Header
            pathname={pathname}
            onMenuClick={handleMenuClick}
            onMobileMenuClick={handleMobileMenuClick}
          />

        <Content style={{ padding: 0, background: '#f9fafb' }}>
          {children}
        </Content>

        <MobileDrawer
          visible={mobileDrawerVisible}
          onClose={() => setMobileDrawerVisible(false)}
        >
          <Sidebar
            collapsed={false}
            pathname={pathname}
            onMenuClick={handleMenuClick}
          />
        </MobileDrawer>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={280}
        collapsedWidth={80}
        style={{
          background: 'transparent',
          borderRight: 'none',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Sidebar
          collapsed={collapsed}
          pathname={pathname}
          onMenuClick={handleMenuClick}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'margin-left 0.3s ease' }}>
          <Header
            pathname={pathname}
            onMenuClick={handleMenuClick}
            onMobileMenuClick={handleMobileMenuClick}
          />

        <Content style={{ padding: 0, background: '#f9fafb' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}