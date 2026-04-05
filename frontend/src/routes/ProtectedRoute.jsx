import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <div>Unauthorized</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
