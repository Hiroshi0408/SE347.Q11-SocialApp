import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../../api/authService";

function PrivateRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  // Nếu chưa login thì redirect về login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Đã login thì cho phép truy cập
  return children;
}

export default PrivateRoute;
