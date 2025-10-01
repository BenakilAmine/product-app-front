import { User } from './common';

// Types pour l'authentification
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

// Types pour les réponses GraphQL d'authentification
export interface LoginResponse {
  login: {
    user: User;
    token: string;
  };
}

export interface RegisterResponse {
  register: {
    user: User;
    token: string;
  };
}

export interface MeResponse {
  me: User;
}