import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { authContext } from '../store/userContext';
const AdminPrivateRoutes = () => {
  const { user } = useContext(authContext);

  return user && user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminPrivateRoutes;
