import { apolloClient } from '../apollo/client';
import { 
  ME_QUERY,
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
} from '../graphql';

/**
 * Service d'authentification
 * 
 * Centralise toute la logique d'authentification et de gestion des tokens
 */

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface MeQueryResult {
  me: {
    id: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface LoginMutationResult {
  login: AuthResponse;
}

interface SignupMutationResult {
  signup: AuthResponse;
}

/**
 * Service d'authentification (approche hybride)
 * Objet avec fonctions pour faciliter les tests et le mocking
 */
export const authService = {
  /**
   * Récupérer l'utilisateur connecté
   */
  getCurrentUser: async () => {
    const { data } = await apolloClient.query<MeQueryResult>({
      query: ME_QUERY,
      fetchPolicy: 'network-only',
    });
    return data?.me || null;
  },

  /**
   * Connexion utilisateur
   */
  login: async (input: LoginInput): Promise<AuthResponse> => {
    const { data } = await apolloClient.mutate<LoginMutationResult>({
      mutation: LOGIN_MUTATION,
      variables: { input },
    });

    if (!data?.login) {
      throw new Error('Échec de la connexion');
    }

    // Sauvegarder le token
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.login.token);
    }

    return data.login;
  },

  /**
   * Inscription utilisateur
   */
  signup: async (input: SignupInput): Promise<AuthResponse> => {
    const { data } = await apolloClient.mutate<SignupMutationResult>({
      mutation: SIGNUP_MUTATION,
      variables: { input },
    });

    if (!data?.signup) {
      throw new Error('Échec de l\'inscription');
    }

    // Sauvegarder le token
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.signup.token);
    }

    return data.signup;
  },

  /**
   * Déconnexion utilisateur
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      apolloClient.clearStore();
    }
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  },

  /**
   * Récupérer le token
   */
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },
} as const;

