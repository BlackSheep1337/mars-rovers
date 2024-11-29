// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
