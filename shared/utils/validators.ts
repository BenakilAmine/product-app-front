// Validateurs communs pour les formulaires

export const validators = {
  // Validation email
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  // Validation téléphone français
  phone: (value: string): boolean => {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(value.replace(/\s/g, ''));
  },

  // Validation mot de passe fort
  strongPassword: (value: string): boolean => {
    // Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(value);
  },

  // Validation mot de passe moyen
  mediumPassword: (value: string): boolean => {
    // Au moins 6 caractères, 1 majuscule ou 1 minuscule, 1 chiffre
    const mediumPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return mediumPasswordRegex.test(value);
  },

  // Validation URL
  url: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  // Validation nombre entier
  integer: (value: string | number): boolean => {
    return Number.isInteger(Number(value));
  },

  // Validation nombre positif
  positive: (value: string | number): boolean => {
    return Number(value) > 0;
  },

  // Validation nombre négatif
  negative: (value: string | number): boolean => {
    return Number(value) < 0;
  },

  // Validation plage de nombres
  range: (value: string | number, min: number, max: number): boolean => {
    const num = Number(value);
    return num >= min && num <= max;
  },

  // Validation longueur de chaîne
  length: (value: string, min: number, max?: number): boolean => {
    if (max === undefined) {
      return value.length >= min;
    }
    return value.length >= min && value.length <= max;
  },

  // Validation chaîne non vide
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },

  // Validation chaîne alphabétique
  alpha: (value: string): boolean => {
    const alphaRegex = /^[a-zA-Z\s]+$/;
    return alphaRegex.test(value);
  },

  // Validation chaîne alphanumérique
  alphanumeric: (value: string): boolean => {
    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    return alphanumericRegex.test(value);
  },

  // Validation chaîne numérique
  numeric: (value: string): boolean => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(value);
  },

  // Validation date
  date: (value: string): boolean => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  },

  // Validation date future
  futureDate: (value: string): boolean => {
    const date = new Date(value);
    return date > new Date();
  },

  // Validation date passée
  pastDate: (value: string): boolean => {
    const date = new Date(value);
    return date < new Date();
  },

  // Validation code postal français
  frenchPostalCode: (value: string): boolean => {
    const postalCodeRegex = /^(0[1-9]|[1-8][0-9]|9[0-8])[0-9]{3}$/;
    return postalCodeRegex.test(value);
  },

  // Validation SIRET
  siret: (value: string): boolean => {
    const cleaned = value.replace(/\s/g, '');
    if (cleaned.length !== 14) return false;
    
    // Algorithme de validation SIRET
    let sum = 0;
    for (let i = 0; i < 13; i++) {
      let digit = parseInt(cleaned[i]);
      if (i % 2 === 1) digit *= 2;
      if (digit > 9) digit -= 9;
      sum += digit;
    }
    
    return (10 - (sum % 10)) % 10 === parseInt(cleaned[13]);
  },

  // Validation IBAN français
  frenchIban: (value: string): boolean => {
    const cleaned = value.replace(/\s/g, '').toUpperCase();
    if (!cleaned.startsWith('FR') || cleaned.length !== 27) return false;
    
    // Algorithme de validation IBAN
    const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
    const numericString = rearranged.replace(/[A-Z]/g, (char) => 
      (char.charCodeAt(0) - 55).toString()
    );
    
    let remainder = 0;
    for (let i = 0; i < numericString.length; i++) {
      remainder = (remainder * 10 + parseInt(numericString[i])) % 97;
    }
    
    return remainder === 1;
  }
};

// Messages d'erreur associés
export const validationMessages = {
  email: 'Veuillez saisir une adresse email valide',
  phone: 'Veuillez saisir un numéro de téléphone valide',
  strongPassword: 'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
  mediumPassword: 'Le mot de passe doit contenir au moins 6 caractères avec des lettres et des chiffres',
  url: 'Veuillez saisir une URL valide',
  integer: 'Veuillez saisir un nombre entier',
  positive: 'Veuillez saisir un nombre positif',
  negative: 'Veuillez saisir un nombre négatif',
  range: (min: number, max: number) => `Veuillez saisir un nombre entre ${min} et ${max}`,
  length: (min: number, max?: number) => 
    max ? `Veuillez saisir entre ${min} et ${max} caractères` : `Veuillez saisir au moins ${min} caractères`,
  required: 'Ce champ est obligatoire',
  alpha: 'Veuillez saisir uniquement des lettres',
  alphanumeric: 'Veuillez saisir uniquement des lettres et des chiffres',
  numeric: 'Veuillez saisir uniquement des chiffres',
  date: 'Veuillez saisir une date valide',
  futureDate: 'Veuillez saisir une date future',
  pastDate: 'Veuillez saisir une date passée',
  frenchPostalCode: 'Veuillez saisir un code postal français valide',
  siret: 'Veuillez saisir un SIRET valide',
  frenchIban: 'Veuillez saisir un IBAN français valide'
};