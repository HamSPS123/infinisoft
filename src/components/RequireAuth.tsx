import { Navigate } from 'react-router';
import { useAuthStore } from '../stores/authStore';

// Protected route component
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
