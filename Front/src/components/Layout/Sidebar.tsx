import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export const Sidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {isAuthenticated,isAdmin,isTecnico,isSuperAdmin,usuario,logout}=useAuth()
  console.log("isAuthenticated:", isAuthenticated);
  console.log("isAdmin:", isAdmin);
  console.log("isTecnico:", isTecnico);
  console.log("isSuperAdmin:", isSuperAdmin);
  console.log("usuario:", usuario);
  console.log("logout function:", logout);

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate("/login");
  };

  const getMenuItems = () => {
    const dashboardPath =
      isSuperAdmin
        ? "/superadmin"
        : isAdmin
        ? "/admin"
        : isTecnico
        ? "/tecnico"
        : "/Mis-tickets";

    const commonDashboard = { label: "Dashboard", path: dashboardPath };  

    if (isSuperAdmin) {
      return [
        commonDashboard,
      ];
    }

    if (isAdmin) {
      return [
        commonDashboard,
        { label: "Usuarios", path: "/usuarios" },
        { label: "Oficinas", path: "/Oficina" },
        { label: "Prioridades", path: "/prioridades/crud" },
        { label: "Categorías", path: "/categorias/crud" },
        { label: "Estados", path: "/estados/crud" },
      ];
    }

    if (isTecnico) {
      return [
        commonDashboard,
        { label: "Mis tickets" , path: "/Mis-tickets"},
        { label: "Usuarios", path: "/usuarios" },
        { label: "Mis asignaciones", path: "/mis-asignaciones" },
      ];
    }

    return [commonDashboard];
  };

  const menuItems = getMenuItems();

  return (
    <>
      <aside className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white select-none lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-3 p-3 sm:p-4 lg:justify-start lg:border-b lg:border-slate-100 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              T
            </div>
            <div>
              <span className="font-bold text-slate-800 text-base tracking-tight block">TickeTI</span>
              <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                Panel {isSuperAdmin ? "Super Admin" : isAdmin ? "Admin" : isTecnico ? "Tecnico" : "Usuario"}
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isMenuOpen}
            aria-controls="dashboard-sidebar-menu"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 transition lg:hidden"
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        <div className="hidden flex-1 flex-col justify-between lg:flex">
          <nav className="space-y-1 p-3 sm:p-4">
            {menuItems.map((item) => {
              const activo = location.pathname.toLowerCase() === item.path.toLowerCase();
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    activo
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 lg:hover:bg-slate-100 lg:hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-3 sm:p-4">
            <div className="mb-2 rounded-xl border border-slate-200/60 bg-slate-50 p-3">
              <p className="truncate text-xs font-semibold capitalize text-slate-800">
                {usuario?.name}
              </p>
              <p className="font-mono text-[11px] text-slate-500">
                {usuario?.dni}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full rounded-lg px-3 py-3 text-center text-xs font-semibold text-red-600 transition lg:hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {isMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú de navegación"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          />
          <aside
            id="dashboard-sidebar-menu"
            aria-label="Menú de navegación"
            className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col bg-white shadow-xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <span className="font-semibold text-slate-800">Menú</span>
              <button
                type="button"
                aria-label="Cerrar menú de navegación"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 transition"
              >
                <span className="text-2xl leading-none" aria-hidden="true">×</span>
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-3 sm:p-4">
              {menuItems.map((item) => {
                const activo = location.pathname.toLowerCase() === item.path.toLowerCase();
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                      activo
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 lg:hover:bg-slate-100 lg:hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-slate-100 p-3 sm:p-4">
              <div className="mb-2 rounded-xl border border-slate-200/60 bg-slate-50 p-3">
                <p className="truncate text-xs font-semibold capitalize text-slate-800">
                  {usuario?.name}
                </p>
                <p className="font-mono text-[11px] text-slate-500">
                  {usuario?.dni}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-3 text-center text-xs font-semibold text-red-600 transition lg:hover:bg-red-50"
              >
                Cerrar sesión
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;