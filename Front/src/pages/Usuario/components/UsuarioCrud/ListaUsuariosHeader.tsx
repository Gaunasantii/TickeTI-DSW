import React from "react";
interface ListaUsuariosHeaderProps {
  esAdmin: boolean;
  onNuevoUsuario: () => void;
  onRefresh: () => void;
}

export const ListaUsuariosHeader: React.FC<ListaUsuariosHeaderProps> = ({
  esAdmin,
  onNuevoUsuario,
  onRefresh,
}) => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Nómina de Personal</h1>
      <p className="text-sm text-slate-500">Usuarios, técnicos y administradores</p>
    </div>
    <div>
    {esAdmin && (
      <button
        onClick={onNuevoUsuario}
        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition"
      >
        + Nuevo Usuario
      </button>
    )}
    <button
        onClick={() => onRefresh()}
        className="px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
      >
        Refrescar
      </button>
    </div>
  </div>
);
