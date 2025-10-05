'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth.service';
import { useToastNotifications } from '../../hooks/useToastNotifications';

/**
 * Context d'authentification simplifié
 * Utilise authService pour toute la logique métier
 */

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
  const { notifyLoginSuccess, notifyLogoutSuccess, notifyRegistrationSuccess, notifyError } = useToastNotifications();

  // Charger l'utilisateur au démarrage si token existe
  useEffect(() => {
    const loadUser = async () => {
      if (typeof window === 'undefined') return;
      
      const token = authService.getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser as User);
      } catch (error) {
        console.error('❌ Erreur chargement utilisateur:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      setUser(response.user as User);
      notifyLoginSuccess();
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur lors de la connexion';
      notifyError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Inscription
  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.signup({ email, password });
      setUser(response.user as User);
      notifyRegistrationSuccess();
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur lors de l\'inscription';
      notifyError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const logout = () => {
    authService.logout();
    setUser(null);
    notifyLogoutSuccess();
  };

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
