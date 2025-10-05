/**
 * Export centralisé de toutes les opérations GraphQL
 * 
 * Centralise les queries, mutations et fragments pour une
 * utilisation facile dans les services
 */

// Fragments
export * from './fragments';

// Auth queries
export * from './queries/auth.queries';

// Products queries
export * from './queries/products.queries';

// Admin queries
export * from './queries/admin.queries';

// Auth mutations
export * from './mutations/auth.mutations';

// Products mutations
export * from './mutations/products.mutations';

// Admin mutations
export * from './mutations/admin.mutations';

