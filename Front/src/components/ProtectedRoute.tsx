import React from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  rolesPermitidos?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolesPermitidos }) => {
  const usuarioRaw = localStorage.getItem("usuario");

  // Si no hay datos de usuario en localStorage, redirigir al login
  if (!usuarioRaw) {
    return <Navigate to="/login" replace />;
  }

  let usuario: any = null;
  try {
    usuario = JSON.parse(usuarioRaw);
  } catch {
    localStorage.removeItem("usuario");
    return <Navigate to="/login" replace />;
  }

  const userRol = (usuario?.rol || usuario?.role || usuario?.type || "").toLowerCase();

  // Si se definieron roles permitidos y el rol no coincide
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