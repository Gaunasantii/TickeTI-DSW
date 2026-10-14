import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  rolesPermitidos?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolesPermitidos }) => {
  const {isAdmin,isSuperAdmin,isTecnico,isAuthenticated}=useAuth();

  if(!isAuthenticated)  return <Navigate to="/login" replace />;

  if (!rolesPermitidos || rolesPermitidos.length === 0) {
    return <Outlet />;
  }

  const isUser = !isSuperAdmin && !isAdmin && !isTecnico;

  const permitidosNormalizados = rolesPermitidos.map((r) => r.toLowerCase());

  const tienePermiso = permitidosNormalizados.some((rol) => {
    switch (rol) {
      case "s_admin": return isSuperAdmin;
      case "admin":   return isAdmin;
      case "tecnico": return isTecnico;
      case "user":    return isUser;
      default:        return false;
    }
  });

  if (tienePermiso) return <Outlet />;

  if (isSuperAdmin) return <Navigate to="/superadmin" replace />;
  if (isAdmin)      return <Navigate to="/admin" replace />;
  if (isTecnico)    return <Navigate to="/tecnico" replace />;
  if (isUser)       return <Navigate to="/Mis-tickets" replace />;

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;