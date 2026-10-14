import React from "react";
import { oficinaPaginated } from "../../../models/oficinaPaginated.model";

interface OficinaSectionProps {
  oficinas: oficinaPaginated[];
  cargando: boolean;
  onEditar: (oficina: oficinaPaginated) => void;
  onEliminar: (id: number) => void;
}

export const OficinaSection: React.FC<OficinaSectionProps> = ({
  oficinas,
  cargando,
  onEditar,
  onEliminar,
}) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
    {cargando ? (
      <p className="p-4 text-center text-sm text-slate-500 sm:p-6 lg:p-8">Cargando oficinas...</p>
    ) : oficinas.length === 0 ? (
      <p className="p-4 text-center text-sm text-slate-500 sm:p-6 lg:p-8">
        No se encontraron oficinas registradas.
      </p>
    ) : (
      <>
        <div className="space-y-3 p-3 md:hidden">
          {oficinas.map((oficina) => (
            <article key={oficina.id} className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
              <h3 className="break-words text-sm font-semibold text-slate-800 sm:text-base">
                {oficina.nombre}
              </h3>
              <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                Cantidad de empleados
              </p>
              <p className="text-sm font-medium text-slate-800">{oficina.cantidadUsuarios}</p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => onEditar(oficina)}
                  className="w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700 transition lg:hover:bg-blue-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(oficina.id)}
                  className="w-full rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-700 transition lg:hover:bg-rose-100"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase text-slate-500">
                <th className="p-3 sm:p-4">Nombre</th>
                <th className="p-3 sm:p-4">Cantidad de empleados</th>
                <th className="p-3 text-right sm:p-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {oficinas.map((oficina) => (
                <tr key={oficina.id} className="lg:hover:bg-slate-50/70">
                  <td className="p-3 font-medium text-slate-800 sm:p-4">{oficina.nombre}</td>
                  <td className="p-3 font-medium text-slate-800 sm:p-4">{oficina.cantidadUsuarios}</td>
                  <td className="space-x-2 p-3 text-right sm:p-4">
                    <button
                      onClick={() => onEditar(oficina)}
                      className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-2 text-xs font-medium text-blue-700 transition lg:hover:bg-blue-100"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onEliminar(oficina.id)}
                      className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-2 text-xs font-medium text-rose-700 transition lg:hover:bg-rose-100"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
);
