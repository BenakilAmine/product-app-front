'use client';

import { useCallback } from 'react';
import { useToast } from '../lib/contexts/toast-context';
import { messages } from '@/shared/constants/messages';

// Types simples pour les notifications
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

// Options simples pour les notifications
export interface NotificationOptions {
  duration?: number;
  position?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Hook personnalisé pour les notifications
export const useToastNotifications = () => {
  const { success, error, warning, info, showToast } = useToast();

  // Notifications pour les opérations CRUD
  const notifyProductCreated = useCallback((productName?: string) => {
    const message = productName 
      ? `Produit "${productName}" créé avec succès`
      : messages.success.created;
    success(message, { duration: 3000 });
  }, [success]);

  const notifyProductUpdated = useCallback((productName?: string) => {
    const message = productName 
      ? `Produit "${productName}" mis à jour avec succès`
      : messages.success.updated;
    success(message, { duration: 3000 });
  }, [success]);

  const notifyProductDeleted = useCallback((productName?: string) => {
    const message = productName 
      ? `Produit "${productName}" supprimé avec succès`
      : messages.success.deleted;
    success(message, { duration: 3000 });
  }, [success]);

  // Notifications pour l'authentification
  const notifyLoginSuccess = useCallback(() => {
    success(messages.success.loggedIn, { duration: 2000 });
  }, [success]);

  const notifyLogoutSuccess = useCallback(() => {
    success(messages.success.loggedOut, { duration: 2000 });
  }, [success]);

  const notifyRegistrationSuccess = useCallback(() => {
    success(messages.success.registered, { duration: 3000 });
  }, [success]);

  // Notifications pour les erreurs
  const notifyError = useCallback((message: string, options?: NotificationOptions) => {
    error(message, { duration: 5000, ...options });
  }, [error]);

  const notifyApiError = useCallback((errorMessage?: string) => {
    const message = errorMessage || messages.error.generic;
    error(message, { duration: 5000 });
  }, [error]);

  const notifyValidationError = useCallback((field?: string) => {
    const message = field 
      ? `Erreur de validation pour le champ "${field}"`
      : 'Erreur de validation des données';
    error(message, { duration: 4000 });
  }, [error]);

  // Notifications pour les avertissements
  const notifyWarning = useCallback((message: string, options?: NotificationOptions) => {
    warning(message, { duration: 4000, ...options });
  }, [warning]);

  const notifyUnsavedChanges = useCallback(() => {
    warning('Vous avez des modifications non sauvegardées', {
      duration: 6000,
      action: {
        label: 'Sauvegarder',
        onClick: () => {
          // Cette action sera gérée par le composant parent
          console.log('Sauvegarder les modifications');
        }
      }
    });
  }, [warning]);

  // Notifications pour les informations
  const notifyInfo = useCallback((message: string, options?: NotificationOptions) => {
    info(message, { duration: 3000, ...options });
  }, [info]);

  const notifyLoading = useCallback((message: string = 'Chargement...') => {
    return showToast(message, 'info', { duration: 0 }); // Duration 0 = pas de fermeture automatique
  }, [showToast]);



  // Notifications pour les opérations de recherche
  const notifySearchResults = useCallback((count: number) => {
    const message = count > 0 
      ? `${count} résultat${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`
      : 'Aucun résultat trouvé';
    info(message, { duration: 2000 });
  }, [info]);

  // Notifications pour les opérations de filtrage
  const notifyFiltersApplied = useCallback((filterCount: number) => {
    const message = filterCount > 0 
      ? `${filterCount} filtre${filterCount > 1 ? 's' : ''} appliqué${filterCount > 1 ? 's' : ''}`
      : 'Filtres supprimés';
    info(message, { duration: 2000 });
  }, [info]);

  return {
    // Notifications génériques
    success,
    error,
    warning,
    info,
    showToast,
    notifyError,
    notifyWarning,
    notifyInfo,
    notifyLoading,

    // Notifications spécifiques aux produits
    notifyProductCreated,
    notifyProductUpdated,
    notifyProductDeleted,

    // Notifications d'authentification
    notifyLoginSuccess,
    notifyLogoutSuccess,
    notifyRegistrationSuccess,

    // Notifications d'erreurs
    notifyApiError,
    notifyValidationError,

    // Notifications spéciales
    notifyUnsavedChanges,


    // Notifications de recherche et filtrage
    notifySearchResults,
    notifyFiltersApplied,
  };
};