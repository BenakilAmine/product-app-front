// Constantes de tailles et espacements

export const sizes = {
  // Tailles de police
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },

  // Hauteurs de composants
  height: {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '56px',
    '2xl': '64px',
  },

  // Largeurs de composants
  width: {
    xs: '80px',
    sm: '120px',
    md: '160px',
    lg: '200px',
    xl: '240px',
    '2xl': '320px',
    '3xl': '400px',
    '4xl': '480px',
    '5xl': '560px',
    '6xl': '640px',
    full: '100%',
    screen: '100vw',
  },

  // Espacements (padding, margin)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },

  // Rayons de bordure
  borderRadius: {
    none: '0px',
    sm: '2px',
    base: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },

  // Ombres
  boxShadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Z-index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Breakpoints responsive
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Tailles de conteneurs
  container: {
    xs: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },

  // Tailles d'icônes
  icon: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
  },

  // Tailles d'avatar
  avatar: {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '64px',
    '2xl': '80px',
    '3xl': '96px',
  },

  // Tailles de boutons
  button: {
    xs: {
      height: '24px',
      padding: '0 8px',
      fontSize: '12px',
    },
    sm: {
      height: '32px',
      padding: '0 12px',
      fontSize: '14px',
    },
    md: {
      height: '40px',
      padding: '0 16px',
      fontSize: '16px',
    },
    lg: {
      height: '48px',
      padding: '0 20px',
      fontSize: '18px',
    },
    xl: {
      height: '56px',
      padding: '0 24px',
      fontSize: '20px',
    },
  },

  // Tailles de cartes
  card: {
    sm: {
      padding: '12px',
      borderRadius: '6px',
    },
    md: {
      padding: '16px',
      borderRadius: '8px',
    },
    lg: {
      padding: '24px',
      borderRadius: '12px',
    },
    xl: {
      padding: '32px',
      borderRadius: '16px',
    },
  },

  // Tailles de formulaires
  form: {
    input: {
      height: '40px',
      padding: '0 12px',
      fontSize: '16px',
    },
    label: {
      fontSize: '14px',
      marginBottom: '8px',
    },
    error: {
      fontSize: '12px',
      marginTop: '4px',
    },
  },

  // Tailles de tableaux
  table: {
    cell: {
      padding: '12px 16px',
      fontSize: '14px',
    },
    header: {
      padding: '16px',
      fontSize: '14px',
      fontWeight: '600',
    },
  },

  // Tailles de modales
  modal: {
    sm: '400px',
    md: '600px',
    lg: '800px',
    xl: '1000px',
    '2xl': '1200px',
  },

  // Tailles de drawer
  drawer: {
    sm: '320px',
    md: '400px',
    lg: '480px',
    xl: '560px',
  },
};