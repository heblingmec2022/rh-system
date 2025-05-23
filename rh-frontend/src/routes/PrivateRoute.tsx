import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // <- evita render antes de saber se o usuário está autenticado

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;



