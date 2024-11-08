import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const rol = sessionStorage.getItem("rol");

  if (allowedRoles.includes(rol)) {
    return <Component {...rest} />;
  }
  
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
