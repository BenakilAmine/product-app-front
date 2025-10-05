import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour les tests E2E
 * Documentation: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './__tests__/e2e',
  
  // Timeout pour chaque test
  timeout: 30 * 1000,
  
  // Nombre de tentatives en cas d'échec
  retries: 1,
  
  // Exécuter les tests en parallèle
  workers: 1,
  
  // Reporter des résultats
  reporter: 'html',
  
  use: {
    // URL de base pour les tests
    baseURL: 'http://localhost:3000',
    
    // Prendre une capture d'écran en cas d'échec
    screenshot: 'only-on-failure',
    
    // Enregistrer une vidéo en cas d'échec
    video: 'retain-on-failure',
    
    // Trace en cas d'échec
    trace: 'on-first-retry',
  },

  // Configuration des navigateurs
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Démarrer le serveur de développement avant les tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});

