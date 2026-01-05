import { StoreApi } from 'zustand';
import { AuthState } from '../stores/authStore';

declare global {
  interface Window {
    useAuthStore: StoreApi<AuthState>;
  }
}
