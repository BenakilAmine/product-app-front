/**
 * Configuration et validation des variables d'environnement
 * 
 * Ce fichier centralise toutes les variables d'environnement
 * et assure leur validation au démarrage de l'application
 */

interface EnvConfig {
  graphqlUrl: string;
  nodeEnv: string;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
}

/**
 * Valider qu'une variable d'environnement existe
 */
function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;
  
  if (!value) {
    throw new Error(
      `❌ Variable d'environnement manquante: ${key}\n` +
      `Assurez-vous d'avoir créé un fichier .env avec cette variable.\n` +
      `Consultez le fichier env.example pour plus d'informations.`
    );
  }
  
  return value;
}

/**
 * Configuration de l'environnement
 */
export const env: EnvConfig = {
  // URL de l'API GraphQL
  graphqlUrl: requireEnv(
    'NEXT_PUBLIC_GRAPHQL_URL',
    // 'http://localhost:4000/graphql'
  ),
  
  // Environnement Node.js
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Helpers pour vérifier l'environnement
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

/**
 * Valider la configuration au démarrage
 */
export function validateEnvConfig(): void {
  console.log('🔍 Validation de la configuration...');
  
  // Vérifier l'URL GraphQL
  try {
    new URL(env.graphqlUrl);
    console.log('✅ GRAPHQL_URL:', env.graphqlUrl);
  } catch {
    throw new Error(
      `❌ URL GraphQL invalide: ${env.graphqlUrl}\n` +
      `L'URL doit être valide (ex: http://localhost:4000/graphql)`
    );
  }
  
  console.log('✅ Configuration validée avec succès');
  console.log('📊 Environnement:', env.nodeEnv);
}

// Validation automatique en développement
if (env.isDevelopment && typeof window === 'undefined') {
  validateEnvConfig();
}

export default env;

