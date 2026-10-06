import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const usuarioRaw =
    sessionStorage.getItem("user") ||
    sessionStorage.getItem("usuario");

  let usuario: any = null;

  try {
    usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  } catch {
    usuario = null;
  }

  const rolRaw = (
    usuario?.type ||
    usuario?.rol ||
    usuario?.role ||
    usuario?.tipo ||
    ""
  ).toLowerCase();

  // Mapeo seguro de roles
  let rol = "user";

  if (rolRaw.includes("s_admin") || rolRaw.includes("super")) {
    rol = "superadmin";
  } else if (rolRaw.includes("admin")) {
    rol = "admin";
  } else if (rolRaw.includes("tec")) {
    rol = "tecnico";
  }

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("usuario");
    navigate("/login");
  };

  const getMenuItems = () => {
    const dashboardPath =
      rol === "superadmin"
        ? "/superadmin"
        : rol === "admin"
        ? "/admin"
        : rol === "tecnico"
        ? "/tecnico"
        : "/usuario";

    const commonDashboard = {
      label: "Dashboard",
      path: dashboardPath,
    };

    const ajustesItem = {
      label: "Ajustes",
      path: "/ajustes",
    };

    if (rol === "superadmin") {
      return [
        commonDashboard,
        { label: "Empresas", path: "/empresas" },
        ajustesItem,
      ];
    }

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

    return [commonDashboard, ajustesItem];
  };

  const menuItems = getMenuItems();

  return (
    <aside
      className="
        w-64 h-screen fixed top-0 left-0
        bg-white dark:bg-slate-900
        border-r border-slate-200 dark:border-slate-700
        flex flex-col justify-between
        z-30 shrink-0 select-none
        transition-colors duration-200
      "
    >
      <div>
        {/* Logo / encabezado */}
        <div
          className="
            p-6
            border-b border-slate-100 dark:border-slate-700
            flex items-center gap-3
          "
        >
          <div
            className="
              w-9 h-9 rounded-lg
              bg-blue-600
              text-white
              flex items-center justify-center
              font-bold text-base
              shadow-sm
            "
          >
            T
          </div>

          <div>
            <span
              className="
                font-bold
                text-slate-800 dark:text-white
                text-base tracking-tight block
              "
            >
              TickeTI
            </span>

            <span
              className="
                text-[11px]
                font-semibold
                text-blue-600 dark:text-blue-400
                uppercase tracking-wider
              "
            >
              Panel {rol === "superadmin" ? "Super Admin" : rol}
            </span>
          </div>
        </div>

        {/* Menú */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const activo =
              location.pathname.toLowerCase() ===
              item.path.toLowerCase();

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  block
                  px-4 py-2.5
                  rounded-lg
                  text-sm font-medium
                  transition-all

                  ${
                    activo
                      ? "bg-blue-600 text-white shadow-sm"
                      : `
                        text-slate-600 dark:text-slate-300
                        hover:bg-slate-100 dark:hover:bg-slate-800
                        hover:text-slate-900 dark:hover:text-white
                      `
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Usuario / cerrar sesión */}
      <div
        className="
          p-4
          border-t border-slate-100 dark:border-slate-700
        "
      >
        <div
          className="
            p-3
            bg-slate-50 dark:bg-slate-800
            rounded-xl
            border border-slate-200/60 dark:border-slate-700
            mb-2
          "
        >
          <p
            className="
              text-xs font-semibold
              text-slate-800 dark:text-white
              truncate capitalize
            "
          >
            {usuario?.name ||
              usuario?.nombre ||
              "Super Administrador"}
          </p>

          <p
            className="
              text-[11px]
              text-slate-500 dark:text-slate-400
              font-mono
            "
          >
            {usuario?.dni
              ? `DNI: ${usuario.dni}`
              : "Sesión activa"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            w-full
            text-center
            px-3 py-2
            text-xs font-semibold
            text-red-600 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-red-950/30
            rounded-lg
            transition
          "
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;