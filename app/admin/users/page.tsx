'use client';
import { Card, Row, Col, Statistic } from 'antd';
import { PlusOutlined, ReloadOutlined, UserOutlined, CrownOutlined, TeamOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/layouts/AdminLayout';
import PageHeader from '../../../components/admin/PageHeader';
import AdminUsersTable from '../../../components/admin/users/AdminUsersTable';
import UserEditModal from '../../../components/admin/users/UserEditModal';
import { useAdminUsers } from '../../../hooks/useAdminUsers';
import { useAdminRedirect } from '../../../hooks/useAdminRedirect';
import { LoadingSpinner } from '../../../shared';



export default function AdminUsers() {
  const router = useRouter();
  const { redirecting, loading } = useAdminRedirect();
  
  const {
    users,
    metrics,
    totalUsers,
    usersLoading,
    metricsLoading,
    // currentPage, // Supprimé car non utilisé
    // pageSize, // Supprimé car non utilisé
    // searchText, // Supprimé car non utilisé
    editModalVisible,
    selectedUser,
    handleSearch,
    handleEditUser,
    handleSaveUser,
    handleDeleteUser,
    handlePageChange,
    handleCloseModal,
    // refetchUsers, // Supprimé car non utilisé
    refetchAll
  } = useAdminUsers();


  if (loading || redirecting) {
    return <LoadingSpinner message="Chargement des utilisateurs..." />;
  }

  return (
    <AdminLayout>
      <div style={{ padding: '24px', background: '#f9fafb', minHeight: '100vh' }}>
        {/* Header de la page */}
        <PageHeader
          title="Gestion des Utilisateurs"
          subtitle="Administration et supervision des comptes utilisateurs"
          emoji="👥"
          actions={[
            {
              key: 'refresh',
              label: 'Actualiser',
              icon: <ReloadOutlined />,
              onClick: () => refetchAll(),
              loading: usersLoading || metricsLoading
            },
            {
              key: 'export',
              label: 'Exporter',
              icon: <ExportOutlined />,
              onClick: () => console.log('Export users')
            },
            {
              key: 'new',
              label: 'Nouvel Utilisateur',
              icon: <PlusOutlined />,
              onClick: () => router.push('/signup'),
              type: 'primary'
            }
          ]}
        />

        {/* Métriques */}
        <Card
          style={{
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            marginBottom: 24
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Statistic
                title="Total Utilisateurs"
                value={metrics?.totalUsers || 0}
                prefix={<UserOutlined style={{ color: '#f97316' }} />}
                valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Statistic
                title="Administrateurs"
                value={metrics?.adminsCount || 0}
                prefix={<CrownOutlined style={{ color: '#ea580c' }} />}
                valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Statistic
                title="Utilisateurs Actifs"
                value={users.length}
                prefix={<TeamOutlined style={{ color: '#10b981' }} />}
                valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Statistic
                title="Page Actuelle"
                value={1}
                prefix={<FilterOutlined style={{ color: '#6b7280' }} />}
                valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
              />
            </Col>
          </Row>
        </Card>

        {/* Table des utilisateurs */}
        <Card
          style={{
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            background: '#ffffff'
          }}
          bodyStyle={{ padding: 0 }}
        >
          <AdminUsersTable
            users={users}
            loading={usersLoading}
            currentPage={1}
            pageSize={10}
            total={totalUsers}
            onSearch={handleSearch}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onPageChange={handlePageChange}
          />
        </Card>

        {/* Modal d'édition */}
        <UserEditModal
          visible={editModalVisible}
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCloseModal}
          loading={usersLoading}
        />
      </div>
    </AdminLayout>
  );
}