// Palette de couleurs centralisée

export const colors = {
  // Couleurs principales Amazon
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#ff9900', // Couleur principale
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },

  // Couleurs de statut
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#00a650', // Vert Amazon
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#B12704', // Rouge Amazon
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#007185', // Bleu Amazon
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // Couleurs neutres
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Couleurs spécifiques Amazon
  amazon: {
    orange: '#ff9900',
    darkOrange: '#e68900',
    red: '#B12704',
    blue: '#007185',
    darkBlue: '#232f3e',
    lightGray: '#f3f3f3',
    darkGray: '#131921',
    text: '#131921',
    textSecondary: '#565959',
    textTertiary: '#8a8a8a',
    border: '#e7e7e7',
    borderSecondary: '#d5d5d5',
  },

  // Couleurs de rôles
  roles: {
    superAdmin: '#ff4d4f',
    admin: '#1890ff',
    user: '#52c41a',
    guest: '#8c8c8c',
  },

  // Couleurs de statut de commande
  orderStatus: {
    pending: '#faad14',
    processing: '#1890ff',
    shipped: '#13c2c2',
    delivered: '#52c41a',
    cancelled: '#ff4d4f',
    returned: '#722ed1',
  },

  // Couleurs de priorité
  priority: {
    low: '#52c41a',
    medium: '#faad14',
    high: '#ff7875',
    urgent: '#ff4d4f',
  },

  // Couleurs de performance
  performance: {
    excellent: '#52c41a',
    good: '#73d13d',
    average: '#faad14',
    poor: '#ff7875',
    critical: '#ff4d4f',
  }
};

// Couleurs sémantiques pour l'accessibilité
export const semanticColors = {
  text: {
    primary: colors.amazon.text,
    secondary: colors.amazon.textSecondary,
    tertiary: colors.amazon.textTertiary,
    inverse: '#ffffff',
    link: colors.amazon.blue,
    linkHover: colors.amazon.darkBlue,
  },
  background: {
    primary: '#ffffff',
    secondary: colors.gray[50],
    tertiary: colors.gray[100],
    inverse: colors.amazon.darkBlue,
  },
  border: {
    primary: colors.amazon.border,
    secondary: colors.amazon.borderSecondary,
    focus: colors.primary[500],
    error: colors.error[500],
    success: colors.success[500],
  },
  status: {
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    info: colors.info[500],
  }
};

// Couleurs pour les thèmes
export const themeColors = {
  light: {
    ...semanticColors,
    mode: 'light' as const,
  },
  dark: {
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      tertiary: '#666666',
      inverse: '#000000',
      link: colors.primary[400],
      linkHover: colors.primary[300],
    },
    background: {
      primary: '#1a1a1a',
      secondary: '#2a2a2a',
      tertiary: '#3a3a3a',
      inverse: '#ffffff',
    },
    border: {
      primary: '#404040',
      secondary: '#555555',
      focus: colors.primary[400],
      error: colors.error[400],
      success: colors.success[400],
    },
    status: {
      success: colors.success[400],
      warning: colors.warning[400],
      error: colors.error[400],
      info: colors.info[400],
    },
    mode: 'dark' as const,
  }
};