import React from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  rolesPermitidos?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolesPermitidos }) => {
  const usuarioRaw = sessionStorage.getItem("usuario");

  // Si no hay datos de usuario en sessionStorage, va al login
  if (!usuarioRaw) {
    return <Navigate to="/login" replace />;
  }

  let usuario: any = null;
  try {
    usuario = JSON.parse(usuarioRaw);
  } catch {
    sessionStorage.removeItem("usuario");
    return <Navigate to="/login" replace />;
  }

  const userRol = (usuario?.rol || usuario?.role || usuario?.type || "").toLowerCase();

  // Si el objeto no contiene un rol válido, limpiamos y va al login
  if (!userRol) {
    sessionStorage.removeItem("usuario");
    return <Navigate to="/login" replace />;
  }

  // Si se definieron roles permitidos y el rol no coincide con la ruta
  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const permitidosNormalizados = rolesPermitidos.map((r) => r.toLowerCase());

    if (!permitidosNormalizados.includes(userRol)) {
      if (userRol === "admin" || userRol === "administrador") {
        return <Navigate to="/admin" replace />;
      } else if (userRol === "tecnico") {
        return <Navigate to="/tecnico" replace />;
      } else if (userRol === "usuario" || userRol === "solicitante" || userRol === "cliente") {
        return <Navigate to="/usuario" replace />;
      } else {
        sessionStorage.removeItem("usuario");
        return <Navigate to="/login" replace />;
      }
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;