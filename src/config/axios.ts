import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store for the refresh token promise to prevent multiple refresh calls
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = useAuthStore.getState().refreshToken;
        
        // If no refresh token, just logout and reject
        if (!refreshToken) {
            useAuthStore.getState().logout();
            return Promise.reject(error);
        }

        try {
            // Use the correct endpoint from AUTH_API constants
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            useAuthStore.setState({ token: accessToken, refreshToken: newRefreshToken });

            // Update the authorization header with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (error) {
            console.error('Token refresh failed:', error);
            useAuthStore.getState().logout();
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
})

export default api;
