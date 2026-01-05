// Environment configuration for Vite

// Helper to get environment variables safely with Vite's import.meta.env
const getEnv = (key: string, defaultValue: string): string => {
  // For Vite, we use import.meta.env
  const envKey = `VITE_${key}`;
  const envValue = import.meta.env[envKey];
  
  return envValue !== undefined ? String(envValue) : defaultValue;
};

// API URLs
export const API_URL = getEnv('API_URL', 'http://localhost:3000/api');
export const AUTH_API = {
  LOGIN: `${API_URL}/auth/login`,
  REFRESH: `${API_URL}/auth/refresh`,
  LOGOUT: `${API_URL}/auth/logout`,
};

// Token configuration
export const AUTH_TOKEN_EXPIRY = parseInt(getEnv('AUTH_TOKEN_EXPIRY', '3600'), 10); // 1 hour in seconds
export const REFRESH_TOKEN_EXPIRY = parseInt(getEnv('REFRESH_TOKEN_EXPIRY', '604800'), 10); // 7 days in seconds
