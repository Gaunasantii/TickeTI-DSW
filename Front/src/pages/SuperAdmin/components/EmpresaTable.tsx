import React from "react";
import { EmpresaPaginatedModel } from "../../../models/empresaPaginated.model";

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
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
        Cargando nómina de empresas...
      </div>
    );
  }

  if (empresas.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
        No se encontraron empresas registradas.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="divide-y divide-slate-100">
        <div className="grid grid-cols-12 px-6 py-3.5 text-xs font-bold text-slate-500 uppercase bg-slate-50">
          <div className="col-span-4">Empresa</div>
          <div className="col-span-3">Administrador</div>
          <div className="col-span-2">Contacto Admin</div>
          <div className="col-span-1 text-center">Empleados</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        {empresas.map((emp) => (
          <div
            key={emp.id ?? emp.nombre}
            className="grid grid-cols-12 px-6 py-4 items-center text-sm hover:bg-slate-50/70 transition"
          >
            <div className="col-span-4 font-semibold text-slate-800">
              {emp.nombre}
            </div>
            <div className="col-span-3 text-slate-700 text-xs">
              {emp.nombreAdmin || (
                <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Sin admin asignado
                </span>
              )}
            </div>
            <div className="col-span-2 text-xs font-mono text-slate-500">
              {emp.telAdmin || "N/A"}
            </div>
            <div className="col-span-1 text-center">
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {emp.cantidadEmpleados ?? 0}
              </span>
            </div>
            <div className="col-span-2 text-right flex justify-end gap-1.5">
              <button
                onClick={() => onModificar(emp)}
                className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                Modificar
              </button>
              <button
                onClick={() => onEliminar(emp)}
                className="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};