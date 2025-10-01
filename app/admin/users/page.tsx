'use client';
import { Card } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
// import { useAuth } from '../../../lib/auth-context'; // Supprimé car non utilisé
// import { useEffect, useState } from 'react'; // Supprimé car non utilisé
import AdminLayout from '../../../components/AdminLayout';
import PageHeader from '../../../components/admin/PageHeader';
import UsersMetrics from '../../../components/admin/users/UsersMetrics';
import AdminUsersTable from '../../../components/admin/users/AdminUsersTable';
import UserEditModal from '../../../components/admin/users/UserEditModal';
import { useAdminUsers } from '../../../hooks/useAdminUsers';
import { useAdminRedirect } from '../../../hooks/useAdminRedirect';
import { LoadingSpinner, glassCardStyle, adminPageContainerStyle } from '../../../shared';



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
      <div style={adminPageContainerStyle}>
        <PageHeader
          title="👥 Gestion des Utilisateurs"
          subtitle="Administration et supervision des comptes utilisateurs"
          actions={[
            {
              key: 'refresh',
              label: 'Actualiser',
              icon: <ReloadOutlined />,
              onClick: () => refetchAll(),
              loading: usersLoading || metricsLoading,
            },
            {
              key: 'new',
              label: 'Nouvel Utilisateur',
              icon: <PlusOutlined />,
              onClick: () => router.push('/signup'),
              type: 'primary',
            },
          ]}
        />

        {/* Métriques */}
        <UsersMetrics
          totalUsers={metrics?.totalUsers}
          adminsCount={metrics?.adminsCount}
          activeUsers={users.length}
          currentPage={1}
        />

        {/* Table des utilisateurs */}
        <Card style={glassCardStyle}>
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