import { useState, useEffect } from 'react';
import { adminService, type User } from '../lib/services';
import { useToastNotifications } from './useToastNotifications';

/**
 * Hook pour gérer les utilisateurs dans l'admin
 * Utilise AdminService pour toute la logique métier
 */

interface UserItem {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export function useAdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [usersLoading, setUsersLoading] = useState(true);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  
  const { success, error } = useToastNotifications();

  // Charger les utilisateurs
  const loadUsers = async () => {
    try {
      setUsersLoading(true);
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Erreur chargement utilisateurs:', err);
    } finally {
      setUsersLoading(false);
    }
  };

  // Charger les métriques
  const loadMetrics = async () => {
    try {
      setMetricsLoading(true);
      const data = await adminService.getMetrics();
      setMetrics(data);
    } catch (err) {
      console.error('Erreur chargement métriques:', err);
    } finally {
      setMetricsLoading(false);
    }
  };

  // Charger au démarrage
  useEffect(() => {
    loadUsers();
    loadMetrics();
  }, []);

  // Filtrer par recherche
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination
  const start = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(start, start + pageSize);

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
      await adminService.updateUserRole(selectedUser.id, role);
      success(`Utilisateur "${selectedUser.email}" mis à jour avec succès`);
      setEditModalVisible(false);
      await loadUsers();
    } catch (err) {
      error('Erreur lors de la mise à jour du rôle');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await adminService.deleteUser(userId);
      success('Utilisateur supprimé avec succès');
      await loadUsers();
    } catch (err) {
      error('Erreur lors de la suppression de l\'utilisateur');
      console.error(err);
    }
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
    setSelectedUser(null);
  };

  const refetchAll = () => {
    loadUsers();
    loadMetrics();
  };

  return {
    // Data
    users: paginatedUsers,
    metrics,
    totalUsers: filteredUsers.length,
    
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
    refetchUsers: loadUsers,
    refetchAll
  };
}