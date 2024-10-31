import React from "react";
import { Navigate } from "react-router-dom";

// Checks if user is logged in
// if not then redirect to /signup

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}
