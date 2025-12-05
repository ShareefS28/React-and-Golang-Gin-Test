import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    axios.get("/validate" ,{
      headers: { "Cache-Control": "no-cache" }
    })
    .catch(() => {
      localStorage.clear();
      navigate("/");
    });
  }, [token, navigate])

  return <>{children}</>;
};

export default ProtectedRoute;