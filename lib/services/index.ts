/**
 * Export centralisé de tous les services (approche hybride)
 * 
 * Les services encapsulent la logique métier et les appels API/GraphQL
 * Ils fournissent une interface propre pour les hooks et composants
 * 
 * Architecture hybride : objets avec fonctions pour faciliter les tests
 */

export { authService } from './auth.service';
export type { LoginInput, SignupInput, AuthResponse } from './auth.service';

export { productsService } from './products.service';
export type { 
  ProductsPaginatedParams, 
  ProductsPaginatedResponse 
} from './products.service';

export { adminService } from './admin.service';
export type { Metrics, User } from './admin.service';

