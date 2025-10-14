import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * ProtectedRoute component for handling authentication-based routing
 * - requireAuth=true: Only authenticated users can access (default)
 * - requireAuth=false: Only non-authenticated users can access (for login/signup pages)
 */
const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
        <LoadingSpinner size="large" text="Loading..." />
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If authentication is NOT required but user IS logged in (e.g., login/signup pages)
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  // User has proper access, render children
  return <>{children}</>;
};

export default ProtectedRoute;
