import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg border border-[#e5e5ea] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-[#d2d2d7] border-t-[#1d1d1f] rounded-full animate-spin"></div>
            <span className="text-[#1d1d1f]">Завантаження...</span>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
