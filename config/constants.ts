/**
 * Constantes de l'application
 * 
 * Centralise toutes les constantes utilisées dans l'application
 */

export const APP_CONFIG = {
  name: 'Product Manager',
  version: '2.0.0',
  description: 'Application de gestion de produits avec authentification',
  defaultLocale: 'fr',
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  products: '/products',
  productDetail: (id: string) => `/products/${id}`,
  productEdit: (id: string) => `/products/${id}/edit`,
  productNew: '/products/new',
  admin: '/admin',
  adminProducts: '/admin/products',
  adminUsers: '/admin/users',
} as const;

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const PAGINATION = {
  defaultPage: 1,
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48, 96],
} as const;

export const PRODUCT_SORT_OPTIONS = {
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
  NEWEST: 'newest',
  OLDEST: 'oldest',
} as const;

export const LOCAL_STORAGE_KEYS = {
  token: 'token',
  theme: 'theme',
  language: 'language',
} as const;

export const API_CONFIG = {
  timeout: 30000, // 30 secondes
  retryAttempts: 3,
  retryDelay: 1000, // 1 seconde
} as const;

export const VALIDATION = {
  password: {
    minLength: 6,
    maxLength: 50,
  },
  email: {
    maxLength: 255,
  },
  product: {
    name: {
      minLength: 3,
      maxLength: 100,
    },
    price: {
      min: 0,
      max: 1000000,
    },
  },
} as const;

