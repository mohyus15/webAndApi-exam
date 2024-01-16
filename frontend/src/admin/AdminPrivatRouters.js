import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminPrivatRouters = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivatRouters;
