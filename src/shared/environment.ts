const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'] as const;

function validateEnvVar(key: string): string {
  const value = import.meta.env[key] || process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  supabase: {
    url: validateEnvVar('SUPABASE_URL'),
    anonKey: validateEnvVar('SUPABASE_ANON_KEY'),
  },
  isProduction:
    import.meta.env.PROD || process.env['NODE_ENV'] === 'production',
  isDevelopment:
    import.meta.env.DEV || process.env['NODE_ENV'] === 'development',
  port: process.env['PORT'] || '3000',
} as const;

// Validate all required environment variables at startup
requiredEnvVars.forEach((key) => {
  validateEnvVar(key);
});

export type Environment = typeof env;
