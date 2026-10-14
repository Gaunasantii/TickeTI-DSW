import React from "react";
interface ListaUsuariosHeaderProps {
  esAdmin: boolean;
  onNuevoUsuario: () => void;
  onNuevoTecnico: () => void;
  onRefresh: () => void;
}

export const ListaUsuariosHeader: React.FC<ListaUsuariosHeaderProps> = ({
  esAdmin,
  onNuevoUsuario,
  onNuevoTecnico,
  onRefresh,
}) => (
  <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
    <div className="min-w-0">
      <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">Nómina de Personal</h1>
      <p className="text-xs text-slate-500 sm:text-sm">Usuarios, técnicos y administradores</p>
    </div>
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap md:justify-end">
      {esAdmin && (
        <>
          <button
            onClick={onNuevoUsuario}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition sm:flex-1 md:w-auto md:flex-initial lg:hover:bg-blue-700"
          >
            + Nuevo Usuario
          </button>
          <button
            onClick={onNuevoTecnico}
            className="w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition sm:flex-1 md:w-auto md:flex-initial lg:hover:bg-green-700"
          >
            + Nuevo Técnico
          </button>
        </>
      )}
      <button
        onClick={() => onRefresh()}
        className="w-full rounded-xl bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-700 transition sm:flex-1 md:w-auto md:flex-initial lg:hover:bg-slate-200"
      >
        Refrescar
      </button>
    </div>
  </div>
);
