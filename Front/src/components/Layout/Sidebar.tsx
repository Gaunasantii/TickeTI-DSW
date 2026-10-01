import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Leemos tanto 'user' como 'usuario' por compatibilidad con el Login
  const usuarioRaw = sessionStorage.getItem("user") || sessionStorage.getItem("usuario");
  let usuario: any = null;
  try {
    usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  } catch {
    usuario = null;
  }

  // Detectamos el rol normalizando strings
  const rolRaw = (
    usuario?.type ||
    usuario?.rol ||
    usuario?.role ||
    usuario?.tipo ||
    ""
  ).toLowerCase();

  // Rutas verdaderamente exclusivas de admin (quitamos /usuarios porque es compartida)
  const esRutaAdmin = ["/admin", "/oficina", "/empresas"].some((r) =>
    location.pathname.toLowerCase().startsWith(r)
  );

  let rol = "user";
  if (rolRaw.includes("admin")) {
    rol = "admin";
  } else if (rolRaw.includes("tec")) {
    rol = "tecnico";
  } else if (esRutaAdmin) {
    rol = "admin";
  }

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("usuario");
    navigate("/login");
  };

  const getMenuItems = () => {
    const dashboardPath = rol === "admin" ? "/admin" : rol === "tecnico" ? "/tecnico" : "/usuario";
    const commonDashboard = { label: "Dashboard", path: dashboardPath };
    const ajustesItem = { label: "Ajustes", path: "/ajustes" };

    if (rol === "admin") {
      return [
        commonDashboard,
        { label: "Usuarios", path: "/usuarios" },
        { label: "Oficinas", path: "/Oficina" },
        ajustesItem,
      ];
    }

    if (rol === "tecnico") {
      return [
        commonDashboard,
        { label: "Usuarios", path: "/usuarios" },
        ajustesItem,
      ];
    }

    return [
      commonDashboard,
      ajustesItem,
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-white border-r border-slate-200 flex flex-col justify-between z-30 shrink-0 select-none">
      <div>
        {/* Cabecera */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            T
          </div>
          <div>
            <span className="font-bold text-slate-800 text-base tracking-tight block">TickeTI</span>
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
              Panel {rol}
            </span>
          </div>
        </div>

        {/* Menú de opciones */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const activo = location.pathname.toLowerCase() === item.path.toLowerCase();
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activo
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Pie con usuario y logout */}
      <div className="p-4 border-t border-slate-100">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 mb-2">
          <p className="text-xs font-semibold text-slate-800 truncate capitalize">
            {usuario?.name || usuario?.nombre || "Usuario"}
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            {usuario?.dni ? `DNI: ${usuario.dni}` : "Sesión activa"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-center px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;