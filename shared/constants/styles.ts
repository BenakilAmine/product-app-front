/**
 * Styles communs réutilisables dans toute l'application
 */

// Styles pour les cartes avec effet glassmorphism
export const glassCardStyle = {
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
} as const;

// Styles pour les spinners de chargement centrés
export const centeredLoadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
} as const;

// Styles pour les conteneurs de page admin
export const adminPageContainerStyle = {
  padding: 24,
  maxWidth: 1400,
  margin: '0 auto',
  minHeight: '100vh',
} as const;

// Styles pour les cartes de métriques
export const metricsCardStyle = {
  borderRadius: 12,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
} as const;

// Styles pour les boutons d'action
export const actionButtonStyle = {
  borderRadius: 6,
  padding: '4px 8px',
} as const;