/**
 * Utilitaires pour la gestion des prix
 * Gère le formatage et le parsing des prix avec espaces
 */

/**
 * Formate un nombre en prix avec espaces pour les milliers
 * @param value - Valeur numérique à formater
 * @returns Chaîne formatée avec espaces
 */
export const formatPrice = (value: number | string | undefined): string => {
  if (!value) return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

/**
 * Parse une chaîne de prix en nombre
 * Gère les espaces, virgules et points
 * @param value - Chaîne à parser
 * @returns Nombre parsé
 */
export const parsePrice = (value: string | undefined): number => {
  if (!value) return 0.01;
  
  // Supprimer tous les espaces et caractères non numériques sauf le point et la virgule
  const cleanValue = value.replace(/[^\d.,]/g, '').replace(',', '.');
  const num = parseFloat(cleanValue);
  
  // Retourner 0.01 si la valeur n'est pas valide
  if (isNaN(num)) return 0.01;
  
  // Limiter entre 0.01 et 999999.99
  return Math.max(0.01, Math.min(999999.99, num));
};

/**
 * Valide qu'un prix est dans la plage acceptable
 * @param value - Valeur à valider
 * @returns true si valide, false sinon
 */
export const isValidPrice = (value: number): boolean => {
  return value >= 0.01 && value <= 999999.99 && !isNaN(value);
};

/**
 * Formate un prix pour l'affichage avec devise
 * @param value - Valeur numérique
 * @param currency - Code devise (défaut: 'EUR')
 * @param locale - Locale (défaut: 'fr-FR')
 * @returns Prix formaté avec devise
 */
export const formatPriceWithCurrency = (
  value: number, 
  currency: string = 'EUR', 
  locale: string = 'fr-FR'
): string => {
  return value.toLocaleString(locale, { 
    style: 'currency', 
    currency: currency 
  });
};

/**
 * Configuration pour InputNumber d'Ant Design
 */
export const priceInputConfig = {
  min: 0.01,
  max: 999999.99,
  step: 0.01,
  precision: 2,
  formatter: (value: string | number | undefined) => formatPrice(value),
  parser: (value: string | undefined) => parsePrice(value),
};