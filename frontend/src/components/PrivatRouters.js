import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { authContext } from '../store/userContext';
const PrivatRouters = () => {
  const { user } = useContext(authContext);

  return user && user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivatRouters;