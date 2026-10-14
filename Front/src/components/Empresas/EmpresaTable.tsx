import React from "react";
import { EmpresaPaginatedModel } from "../../models/empresaPaginated.model";

interface EmpresasTableProps {
  empresas: EmpresaPaginatedModel[];
  cargando: boolean;
  onModificar: (empresa: EmpresaPaginatedModel) => void;
  onEliminar: (empresa: EmpresaPaginatedModel) => void;
}

export const EmpresasTable: React.FC<EmpresasTableProps> = ({
  empresas,
  cargando,
  onModificar,
  onEliminar,
}) => {
  if (cargando) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-500 sm:p-6 lg:p-8">
        Cargando nómina de empresas...
      </div>
    );
  }

  if (empresas.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-500 sm:p-6 lg:p-8">
        No se encontraron empresas registradas.
      </div>
    );
  }

  return (
    <div className="space-y-3">
        {empresas.map((emp) => (
          <article
            key={emp.id ?? emp.nombre}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="break-words text-base font-semibold text-slate-800 sm:text-lg">
                {emp.nombre}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 sm:shrink-0">
                <span>Empleados</span>
                <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-2 py-1 font-semibold text-slate-700">
                  {emp.cantidadEmpleados ?? 0}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 text-sm sm:grid-cols-2">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">Administrador</p>
                <p className="mt-1 break-words text-slate-700">
                  {emp.nombreAdmin || (
                    <span className="inline-block rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-700">
                      Sin admin asignado
                    </span>
                  )}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">Contacto Admin</p>
                <p className="mt-1 break-all font-mono text-xs text-slate-600">
                  {emp.telAdmin || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row">
              <button
                onClick={() => onModificar(emp)}
                className="w-full rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700 transition sm:w-auto lg:hover:bg-blue-100"
              >
                Modificar
              </button>
              <button
                onClick={() => onEliminar(emp)}
                className="w-full rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-700 transition sm:w-auto lg:hover:bg-rose-100"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
    </div>
  );
};