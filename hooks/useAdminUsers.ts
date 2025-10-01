import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { UserItem, UsersResponse, UsersQueryVars, UsersMetricsResponse } from '../types/admin';
import { useToastNotifications } from './useToastNotifications';

const USERS_QUERY = gql`
  query Users($page: Int, $pageSize: Int, $search: String) {
    users(page: $page, pageSize: $pageSize, search: $search) {
      items {
        id
        email
        role
        createdAt
        updatedAt
      }
      total
      page
      pageSize
    }
  }
`;

const SET_USER_ROLE_MUTATION = gql`
  mutation SetUserRole($userId: ID!, $role: Role!) {
    setUserRole(userId: $userId, role: $role) {
      id
      email
      role
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const METRICS_QUERY = gql`
  query Metrics {
    metrics {
      totalUsers
      adminsCount
    }
  }
`;

export function useAdminUsers() {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  
  const { success, notifyApiError } = useToastNotifications();

  // Queries
  const { data: usersData, loading: usersLoading, refetch: refetchUsers } = useQuery<UsersResponse, UsersQueryVars>(USERS_QUERY, {
    variables: {
      page: currentPage,
      pageSize: pageSize,
      search: searchText || undefined
    }
  });

  const { data: metricsData, loading: metricsLoading, refetch: refetchMetrics } = useQuery<UsersMetricsResponse>(METRICS_QUERY);

  // Mutations
  const [setUserRole] = useMutation(SET_USER_ROLE_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  // Handlers
  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleEditUser = (user: UserItem) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleSaveUser = async (role: string) => {
    if (!selectedUser) return;
    
    try {
      await setUserRole({
        variables: {
          userId: selectedUser.id.toString(),
          role: role
        }
      });
      success(`Utilisateur "${selectedUser.email}" mis à jour avec succès`);
      setEditModalVisible(false);
      refetchUsers();
    } catch (error: any) {
      notifyApiError(error.message || 'Erreur lors de la mise à jour du rôle');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser({
        variables: { id: userId }
      });
      success(`Utilisateur supprimé avec succès`);
      refetchUsers();
    } catch (error: any) {
      notifyApiError(error.message || 'Erreur lors de la suppression de l\'utilisateur');
    }
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    setPageSize(size || 10);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
    setSelectedUser(null);
  };

  const refetchAll = () => {
    refetchUsers();
    refetchMetrics();
  };

  return {
    // Data
    users: usersData?.users?.items || [],
    metrics: metricsData?.metrics,
    totalUsers: usersData?.users?.total || 0,
    
    // Loading states
    usersLoading,
    metricsLoading,
    
    // Pagination
    currentPage,
    pageSize,
    searchText,
    
    // Modal state
    editModalVisible,
    selectedUser,
    
    // Handlers
    handleSearch,
    handleEditUser,
    handleSaveUser,
    handleDeleteUser,
    handlePageChange,
    handleCloseModal,
    refetchUsers,
    refetchAll
  };
}