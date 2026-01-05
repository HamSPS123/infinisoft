import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PersistOptions } from 'zustand/middleware';
import type { LoginCredentials, AuthResponse, User, RefreshTokenResponse } from './authTypes';
import api from '../config/axios';
import { AUTH_API } from '../config/env';

// Define the auth store state and actions
export type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshAccessToken: () => Promise<string | null>;
  updateProfile: (profileData: { name: string; email?: string }) => Promise<void>;
  changePassword: (passwordData: { currentPassword: string; newPassword: string }) => Promise<void>;
}

// Define the persistence configuration
type AuthPersist = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

type AuthPersistOptions = PersistOptions<AuthState, AuthPersist>;

// Persistence options
const persistOptions: AuthPersistOptions = {
  name: 'auth-storage',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    user: state.user,
    token: state.token,
    refreshToken: state.refreshToken,
    isAuthenticated: state.isAuthenticated
  }),
};

// Create the auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null });
          
          // Make API request to login endpoint
          const response = await api.post<AuthResponse>(
            AUTH_API.LOGIN,
            credentials
          );
          
          // Update state with response data - match the backend response format
          set({
            user: response.data.user,
            token: response.data.accessToken, // Changed from token to accessToken
            refreshToken: response.data.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
          
          // Make the auth store available to the window object for the axios interceptor
          if (typeof window !== 'undefined') {
            window.useAuthStore = useAuthStore;
          }
        } catch (error) {
          // Handle error
          const apiError = error as ApiError;
          const errorMessage = 
            apiError.response?.data?.message || 'Authentication failed';
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      // Logout action
      logout: () => {
        // Attempt to call logout endpoint if we have a token
        const { token } = get();
        if (token) {
          api.post(AUTH_API.LOGOUT).catch(() => {
            // Silently fail if the logout request fails
            console.log('Logout request failed, but state was cleared');
          });
        }

        // Clear auth state
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      // Refresh token action
      refreshAccessToken: async () => {
        try {
          const { refreshToken } = get();
          
          if (!refreshToken) {
            return null;
          }
          
          const response = await api.post<RefreshTokenResponse>(
            AUTH_API.REFRESH,
            {},
            {
              headers: {
                'Authorization': `Bearer ${refreshToken}`
              }
            }
          );
          
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Update state with new tokens
          set({
            token: accessToken, // Changed from token to accessToken
            ...(newRefreshToken ? { refreshToken: newRefreshToken } : {})
          });
          
          return accessToken;
        } catch (error) {
          const apiError = error as ApiError;
          console.error('Token refresh failed:', apiError);
          
          // If refresh fails, log the user out
          get().logout();
          return null;
        }
      },

      // Clear error action
      clearError: () => set({ error: null }),

      // Update profile action
      updateProfile: async (profileData: { name: string; email?: string }) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await api.patch('/auth/profile', profileData);
          
          if (response.status === 200) {
            // Update the user in the store
            set({
              user: response.data.user,
              isLoading: false,
            });
          }
        } catch (error) {
          // Handle error
          const apiError = error as ApiError;
          const errorMessage = 
            apiError.response?.data?.message || 'Failed to update profile';
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      // Change password action
      changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await api.patch('/auth/change-password', passwordData);
          
          if (response.status === 200) {
            set({ isLoading: false });
            return;
          }
        } catch (error) {
          // Handle error
          const apiError = error as ApiError;
          const errorMessage = 
            apiError.response?.data?.message || 'Failed to change password';
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
    }),
    persistOptions
  )
);

// Define error types for better type safety
type ApiError = Error & {
  response?: {
    data?: {
      message?: string;
    };
  };
};

// Initialize auth store for the window object
const initializeAuth = () => {
  // Make the auth store available to the window object for the axios interceptor
  if (typeof window !== 'undefined') {
    window.useAuthStore = useAuthStore;
  }
};

// Call initialization
initializeAuth();
