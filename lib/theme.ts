import type { ThemeConfig } from 'antd';

export const amazonTheme: ThemeConfig = {
  token: {
    // Couleurs principales Amazon
    colorPrimary: '#ff9900',
    colorSuccess: '#00a650',
    colorWarning: '#ff9900',
    colorError: '#B12704',
    colorInfo: '#007185',
    
    // Couleurs de fond
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f8f9fa',
    
    // Couleurs de texte
    colorText: '#131921',
    colorTextSecondary: '#565959',
    colorTextTertiary: '#8a8a8a',
    
    // Bordures
    colorBorder: '#e7e7e7',
    colorBorderSecondary: '#d5d5d5',
    
    // Rayons de bordure
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 4,
    
    // Espacements
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    
    // Tailles de police
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontSizeXL: 18,
    
    // Hauteurs
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
    
    // Ombres
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    boxShadowSecondary: '0 1px 4px rgba(0,0,0,0.08)',
  },
  components: {
    Button: {
      primaryColor: '#ffffff',
      primaryShadow: '0 2px 4px rgba(255, 153, 0, 0.3)',
      defaultShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    Card: {
      borderRadiusLG: 8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      boxShadowTertiary: '0 1px 2px rgba(0,0,0,0.05)',
    },
    Input: {
      borderRadius: 0,
      activeBorderColor: '#ff9900',
      hoverBorderColor: '#ff9900',
    },
    Menu: {
      itemSelectedBg: 'rgba(255, 153, 0, 0.1)',
      itemSelectedColor: '#ff9900',
      itemHoverBg: 'rgba(255, 153, 0, 0.05)',
    },
    Typography: {
      titleMarginBottom: '0.5em',
      titleMarginTop: '0',
    },
  },
};