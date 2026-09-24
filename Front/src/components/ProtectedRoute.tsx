import React from "react";
import { Navigate, Outlet } from "react-router";
import { decodeToken, tokenExpirado } from "../utils/decodeToken";

interface ProtectedRouteProps {
  rolesPermitidos?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolesPermitidos }) => {
  const token = localStorage.getItem("token");

  // Si no hay token o está vencido, al login
  if (!token || tokenExpirado(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  const decoded = decodeToken(token);
  const userRol = (decoded?.rol || decoded?.type || decoded?.role || "").toLowerCase();

  // Si se especificaron roles y el rol del usuario no está en la lista, redirigir a su área segura
  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const permitidosNormalizados = rolesPermitidos.map((r) => r.toLowerCase());
    
    if (!permitidosNormalizados.includes(userRol)) {
      if (userRol === "admin" || userRol === "administrador") {
        return <Navigate to="/admin" replace />;
      } else if (userRol === "tecnico") {
        return <Navigate to="/tecnico" replace />;
      } else {
        return <Navigate to="/usuario" replace />;
      }
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;