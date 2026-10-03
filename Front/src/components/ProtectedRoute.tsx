import React from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  rolesPermitidos?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rolesPermitidos }) => {
  const usuarioRaw = sessionStorage.getItem("usuario") || sessionStorage.getItem("user");

  if (!usuarioRaw) {
    return <Navigate to="/login" replace />;
  }

  let usuario: any = null;
  try {
    usuario = JSON.parse(usuarioRaw);
  } catch {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  const rolBruto = (usuario?.type || usuario?.rol || usuario?.role || usuario?.tipo || "").toLowerCase();

  let userRol = "user";
  if (rolBruto.includes("s_admin") || rolBruto.includes("super")) {
    userRol = "s_admin";
  } else if (rolBruto.includes("admin")) {
    userRol = "admin";
  } else if (rolBruto.includes("tec")) {
    userRol = "tecnico";
  }

  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const permitidosNormalizados = rolesPermitidos.map((r) => r.toLowerCase());

    const tienePermiso = permitidosNormalizados.some((p) => {
      if ((p.includes("s_admin") || p.includes("super")) && userRol === "s_admin") return true;
      if (p.includes("admin") && !p.includes("super") && !p.includes("s_") && userRol === "admin") return true;
      if (p.includes("tec") && userRol === "tecnico") return true;
      if ((p === "user" || p === "usuario" || p === "solicitante" || p === "cliente") && userRol === "user") return true;
      return p === userRol;
    });

    if (!tienePermiso) {
      if (userRol === "s_admin") return <Navigate to="/superadmin" replace />;
      if (userRol === "admin") return <Navigate to="/admin" replace />;
      if (userRol === "tecnico") return <Navigate to="/tecnico" replace />;
      return <Navigate to="/usuario" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;