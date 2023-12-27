import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({
  isAuthenticated,
  redirectPath = '/login',
  children,
}) => {
  if (!isAuthenticated) return <Navigate to={redirectPath} />;
  return <div>{children ? children : <Outlet />}</div>;
};

export default PrivateRoutes;
