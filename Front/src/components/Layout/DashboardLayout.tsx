import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex">
      <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

      {/* Fondo oscuro detrás del menú en pantallas chicas */}
      {menuAbierto && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen md:ml-64">
        {/* Barra superior con el botón hamburguesa, solo en pantallas chicas */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200">
          <button
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menú"
            className="p-1.5 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <span className="font-semibold text-slate-800">TickeTI</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;