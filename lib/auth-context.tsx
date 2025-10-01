'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { apolloClient } from './apollo-client';
import { useToastNotifications } from '../hooks/useToastNotifications';

// Types pour l'authentification
interface User {
  id: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Types pour les réponses GraphQL
interface MeResponse {
  me: User;
}

interface LoginResponse {
  login: {
    token: string;
    user: User;
  };
}

interface SignupResponse {
  signup: {
    token: string;
    user: User;
  };
}

// Query pour récupérer l'utilisateur actuel
const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      role
      createdAt
      updatedAt
    }
  }
`;

// Mutation pour la connexion
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

// Mutation pour l'inscription
const SIGNUP_MUTATION = gql`
  mutation Signup($input: CreateUserInput!) {
    signup(input: $input) {
      token
      user {
        id
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { notifyLoginSuccess, notifyLogoutSuccess, notifyRegistrationSuccess, notifyError } = useToastNotifications();

  // Effect pour gérer l'hydratation (approche recommandée par React)
  useEffect(() => {
    setIsClient(true);
    const storedToken = localStorage.getItem('token');
    console.log('🔑 Token récupéré du localStorage:', storedToken);
    setToken(storedToken);
  }, []);

  // Query pour récupérer l'utilisateur actuel
  const { data: meData, loading: meLoading, error: meError } = useQuery<MeResponse>(ME_QUERY, {
    skip: !isClient || !token,
    fetchPolicy: 'network-only', // Force un appel réseau pour éviter le cache
    errorPolicy: 'all'
  });

  // Gestion des résultats de la query
  useEffect(() => {
    if (meData?.me) {
      console.log('✅ Query me réussie:', meData);
      console.log('👤 Utilisateur chargé:', meData.me);
      setUser(meData.me);
    }
  }, [meData]);

  // Gestion des erreurs de la query
  useEffect(() => {
    if (meError) {
      console.log('❌ Erreur query me:', meError);
      // Si erreur, supprimer le token invalide
      if (isClient) {
        localStorage.removeItem('token');
      }
      setToken(null);
      setUser(null);
    }
  }, [meError, isClient]);

  // Mutations
  const [loginMutation] = useMutation<LoginResponse>(LOGIN_MUTATION);
  const [signupMutation] = useMutation<SignupResponse>(SIGNUP_MUTATION);

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Connexion en cours...', email);
      
      // Nettoyer le cache avant la connexion
      if (isClient) {
        apolloClient.clearStore();
      }
      
      const { data } = await loginMutation({
        variables: { 
          input: { email, password }
        }
      });

      if (data?.login?.token) {
        if (isClient) {
          localStorage.setItem('token', data.login.token);
        }
        setToken(data.login.token);
        setUser(data.login.user);
        notifyLoginSuccess();
        console.log('✅ Connexion réussie pour:', data.login.user);
        return true;
      }
      return false;
    } catch (error: any) {
      notifyError(error.message || 'Erreur lors de la connexion');
      return false;
    }
  };

  // Fonction d'inscription
  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('📝 Inscription en cours...', email);
      
      // Nettoyer le cache avant l'inscription
      if (isClient) {
        apolloClient.clearStore();
      }
      
      const { data } = await signupMutation({
        variables: { 
          input: { email, password }
        }
      });

      if (data?.signup?.token) {
        if (isClient) {
          localStorage.setItem('token', data.signup.token);
        }
        setToken(data.signup.token);
        setUser(data.signup.user);
        notifyRegistrationSuccess();
        console.log('✅ Inscription réussie pour:', data.signup.user);
        return true;
      }
      return false;
    } catch (error: any) {
      notifyError(error.message || 'Erreur lors de l\'inscription');
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    console.log('🔓 Déconnexion en cours...');
    if (isClient) {
      localStorage.removeItem('token');
      // Nettoyer aussi le cache Apollo
      apolloClient.clearStore();
    }
    setToken(null);
    setUser(null);
    notifyLogoutSuccess();
    console.log('✅ Déconnexion terminée');
  };

  // Mise à jour du loading
  useEffect(() => {
    if (!isClient) {
      setLoading(true);
    } else if (meLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [meLoading, isClient]);

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
