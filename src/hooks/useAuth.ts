import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import type { LoginCredentials } from '../stores/authTypes';
import { loginSchema } from '../stores/authTypes';
import { ZodError } from 'zod';

// Custom hook for authentication
export const useAuth = () => {
  const { user, token, refreshToken, isAuthenticated, isLoading, error, login, logout, clearError, refreshAccessToken } = useAuthStore();
  const [validationError, setValidationError] = useState<string | null>(null);

  // Handle login with validation
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      // Clear previous errors
      setValidationError(null);
      clearError();
      
      // Validate credentials using Zod schema
      loginSchema.parse(credentials);
      
      // If validation passes, attempt login
      await login(credentials);
      return true;
    } catch (err) {
      // Handle validation errors
      if (err instanceof ZodError) {
        const message = err.errors[0]?.message || 'Invalid credentials';
        setValidationError(message);
      }
      return false;
    }
  };

  return {
    user,
    token,
    refreshToken,
    isAuthenticated,
    isLoading,
    error,         // API error
    validationError, // Validation error
    login: handleLogin,
    logout,
    refreshAccessToken, // Expose refresh token functionality
    clearError: () => {
      clearError();
      setValidationError(null);
    },
  };
};
