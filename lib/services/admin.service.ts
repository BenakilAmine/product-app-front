import { apolloClient } from '../apollo/client';
import {
  GET_METRICS_QUERY,
  GET_ALL_USERS_QUERY,
  GET_ALL_PRODUCTS_ADMIN_QUERY,
  UPDATE_USER_ROLE_MUTATION,
  DELETE_USER_MUTATION,
} from '../graphql';

/**
 * Service d'administration
 * 
 * Centralise toute la logique métier liée à l'administration
 */

export interface Metrics {
  totalUsers: number;
  totalProducts: number;
  productsLast7d: number;
  adminsCount: number;
}

export interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface MetricsQueryResult {
  metrics: Metrics;
}

interface UsersQueryResult {
  users: {
    items: User[];
    total: number;
    page: number;
    pageSize: number;
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductsQueryResult {
  products: Product[];
}

interface UpdateUserRoleMutationResult {
  updateUserRole: User;
}

interface DeleteUserMutationResult {
  deleteUser: boolean;
}

/**
 * Service d'administration (approche hybride)
 * Objet avec fonctions pour faciliter les tests et le mocking
 */
export const adminService = {
  /**
   * Récupérer les métriques du dashboard
   */
  getMetrics: async (): Promise<Metrics | null> => {
    try {
      const { data } = await apolloClient.query<MetricsQueryResult>({
        query: GET_METRICS_QUERY,
        fetchPolicy: 'network-only',
      });
      return data?.metrics || null;
    } catch (error) {
      console.error('Erreur lors de la récupération des métriques:', error);
      return null;
    }
  },

  /**
   * Récupérer tous les utilisateurs
   */
  getAllUsers: async (): Promise<User[]> => {
    const { data } = await apolloClient.query<UsersQueryResult>({
      query: GET_ALL_USERS_QUERY,
      fetchPolicy: 'network-only',
    });
    return data?.users?.items || [];
  },

  /**
   * Récupérer tous les produits (vue admin)
   */
  getAllProducts: async () => {
    const { data } = await apolloClient.query<ProductsQueryResult>({
      query: GET_ALL_PRODUCTS_ADMIN_QUERY,
      fetchPolicy: 'network-only',
    });
    return data?.products || [];
  },

  /**
   * Mettre à jour le rôle d'un utilisateur
   */
  updateUserRole: async (userId: string, role: string): Promise<User> => {
    const { data } = await apolloClient.mutate<UpdateUserRoleMutationResult>({
      mutation: UPDATE_USER_ROLE_MUTATION,
      variables: { id: userId, role },
      refetchQueries: [{ query: GET_ALL_USERS_QUERY }],
    });

    if (!data?.updateUserRole) {
      throw new Error('Échec de la mise à jour du rôle');
    }

    return data.updateUserRole;
  },

  /**
   * Supprimer un utilisateur
   */
  deleteUser: async (userId: string): Promise<boolean> => {
    const { data } = await apolloClient.mutate<DeleteUserMutationResult>({
      mutation: DELETE_USER_MUTATION,
      variables: { id: userId },
      refetchQueries: [{ query: GET_ALL_USERS_QUERY }],
    });

    return data?.deleteUser || false;
  },

  /**
   * Vérifier si l'utilisateur a le rôle admin
   */
  isAdmin: (userRole: string): boolean => {
    return userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
  },

  /**
   * Vérifier si l'utilisateur est super admin
   */
  isSuperAdmin: (userRole: string): boolean => {
    return userRole === 'SUPER_ADMIN';
  },

  /**
   * Calculer les statistiques avancées
   */
  calculateAdvancedStats: (products: Product[], users: User[]) => {
    const totalProducts = products.length;
    const totalUsers = users.length;
    const adminsCount = users.filter(u => adminService.isAdmin(u.role)).length;
    
    // Produits créés dans les 7 derniers jours
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const productsLast7d = products.filter(
      p => new Date(p.createdAt) >= sevenDaysAgo
    ).length;

    return {
      totalProducts,
      totalUsers,
      adminsCount,
      productsLast7d,
    };
  },
} as const;

