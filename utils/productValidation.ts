import { ValidationRule } from '../types';

export const productValidationRules: Record<string, ValidationRule[]> = {
  name: [
    { required: true, message: 'Veuillez saisir le nom du produit !' },
    { min: 2, message: 'Le nom doit contenir au moins 2 caractères !' },
    { max: 100, message: 'Le nom ne peut pas dépasser 100 caractères !' }
  ],
  price: [
    { required: true, message: 'Veuillez saisir le prix !' },
    { type: 'number', min: 0.01, message: 'Le prix doit être supérieur à 0 !' },
    { type: 'number', max: 999999.99, message: 'Le prix ne peut pas dépasser 999 999,99 € !' }
  ]
};