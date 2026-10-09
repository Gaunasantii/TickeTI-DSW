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
  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
    {cargando ? (
      <p className="p-8 text-center text-slate-500 text-sm">Cargando oficinas...</p>
    ) : oficinas.length === 0 ? (
      <p className="p-8 text-center text-slate-500 text-sm">
        No se encontraron oficinas registradas.
      </p>
    ) : (
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase bg-slate-50">
            <th className="p-4">Nombre</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {oficinas.map((oficina) => (
            <tr key={oficina.id} className="hover:bg-slate-50/70">
              <td className="p-4 font-medium text-slate-800">{oficina.nombre}</td>
              <td className="p-4 text-right space-x-2">
                <button
                  onClick={() => onEditar(oficina)}
                  className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(oficina.id)}
                  className="px-2.5 py-1 text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
