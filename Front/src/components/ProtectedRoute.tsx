import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  rolesPermitidos?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolesPermitidos }) => {
  const {isAdmin,isSuperAdmin,isTecnico,isAuthenticated}=useAuth();

  if(!isAuthenticated)  return <Navigate to="/login" replace />;

  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const permitidosNormalizados = rolesPermitidos.map((r) => r.toLowerCase());

    const tienePermiso = permitidosNormalizados.some((p) => {
      if (p === "s_admin" && isSuperAdmin) return true;
      if (p === "admin" && isAdmin) return true;
      if (p === "tecnico" && isTecnico) return true;
      if (p === "user" && !isSuperAdmin && !isAdmin && !isTecnico) return true;
      return false;
    });

    if (!tienePermiso) {
      if (isSuperAdmin) return <Navigate to="/superadmin" replace />;
      if (isAdmin) return <Navigate to="/admin" replace />;
      if (isTecnico) return <Navigate to="/tecnico" replace />;
      if(!isSuperAdmin && !isAdmin && !isTecnico) return <Navigate to="/usuario" replace />;
      return <Navigate to="/usuario" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;