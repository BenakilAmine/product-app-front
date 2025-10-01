// Formatters pour les données communes

export const formatters = {
  // Formatage des prix
  currency: (amount: number, currency = 'EUR', locale = 'fr-FR'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  },

  // Formatage des nombres
  number: (value: number, locale = 'fr-FR'): string => {
    return new Intl.NumberFormat(locale).format(value);
  },

  // Formatage des pourcentages
  percentage: (value: number, decimals = 1, locale = 'fr-FR'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  },

  // Parse robuste de dates (ISO, timestamps ms/s, chaînes sans 'T')
  _parseDate(value: string | number | Date | undefined | null): Date | null {
    if (value == null) return null;
    if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
    if (typeof value === 'number') {
      // Supporte secondes (10 chiffres) et millisecondes
      const ms = value < 1e12 ? value * 1000 : value;
      const d = new Date(ms);
      return isNaN(d.getTime()) ? null : d;
    }
    // value est string
    const str = value.trim();
    // Si numérique
    if (/^\d+$/.test(str)) {
      const num = Number(str);
      const ms = num < 1e12 ? num * 1000 : num;
      const d = new Date(ms);
      return isNaN(d.getTime()) ? null : d;
    }
    // Essai direct
    let d = new Date(str);
    if (!isNaN(d.getTime())) return d;
    // Remplacement espace -> 'T' (ex: '2025-10-01 12:34:56')
    d = new Date(str.replace(' ', 'T'));
    if (!isNaN(d.getTime())) return d;
    // Ajout 'Z' (UTC)
    d = new Date(str.replace(' ', 'T') + 'Z');
    if (!isNaN(d.getTime())) return d;
    return null;
  },

  // Formatage des dates (robuste)
  date: (date: string | number | Date | undefined | null, locale = 'fr-FR'): string => {
    const dateObj = formatters._parseDate(date);
    if (!dateObj) return 'Non disponible';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  },

  // Formatage des dates courtes (robuste)
  dateShort: (date: string | number | Date | undefined | null, locale = 'fr-FR'): string => {
    const dateObj = formatters._parseDate(date);
    if (!dateObj) return 'Non disponible';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateObj);
  },

  // Formatage des dates et heures (robuste)
  dateTime: (date: string | number | Date | undefined | null, locale = 'fr-FR'): string => {
    const dateObj = formatters._parseDate(date);
    if (!dateObj) return 'Non disponible';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  },

  // Formatage des tailles de fichiers
  fileSize: (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  },

  // Formatage des durées
  duration: (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  },

  // Formatage des nombres avec séparateurs
  numberWithSpaces: (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  },

  // Formatage des prix avec séparateurs
  priceWithSpaces: (value: number): string => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  },

  // Formatage des noms propres
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  // Formatage des noms complets
  capitalizeWords: (str: string): string => {
    return str.split(' ').map(word => formatters.capitalize(word)).join(' ');
  },

  // Formatage des emails (masquage partiel)
  maskEmail: (email: string): string => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
    return `${maskedLocal}@${domain}`;
  },

  // Formatage des téléphones
  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    return phone;
  },

  // Formatage des URLs
  truncateUrl: (url: string, maxLength = 50): string => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength - 3) + '...';
  },

  // Formatage des textes longs
  truncateText: (text: string, maxLength = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
};