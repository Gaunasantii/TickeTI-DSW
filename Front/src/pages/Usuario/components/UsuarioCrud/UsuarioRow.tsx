import React from "react";
import type { UsuarioItem } from "../../../../types/usuarios";
import type { IModifyPersonRequest } from "../../../../requests/IModifyPersonRequest";
import { personaPaginatedModel } from "../../../../models/personPaginated.model";

interface UsuarioRowProps {
  usuario: personaPaginatedModel;
  abierta: boolean;
  nombreOficina: string;
  esAdmin: boolean;
  onToggle: (dni: string, abierta: boolean) => void;
  onEditar: (usuario: personaPaginatedModel) => void;
  onEliminar: (dni: string) => void;
}

export const UsuarioRow: React.FC<UsuarioRowProps> = ({
  usuario: u,
  abierta,
  nombreOficina,
  esAdmin,
  onToggle,
  onEditar,
  onEliminar,
}) => {
  const r = u.type.toUpperCase();

  return (
    <div>
      <div
        onClick={() => onToggle(u.dni, abierta)}
        className={`grid grid-cols-12 px-5 py-3.5 items-center cursor-pointer text-sm ${
          abierta ? "bg-blue-50/40" : "hover:bg-slate-50"
        }`}
      >
        <div className="col-span-3 font-mono font-semibold text-slate-700 flex items-center gap-2">
          <span className={`text-xs ${abierta ? "rotate-90 text-blue-600" : "text-slate-400"}`}>▶</span>
          {u.dni}
        </div>
        <div className="col-span-4 font-medium text-slate-800">
          {u.name} {u.surName || ""}
        </div>
        <div className="col-span-3 text-xs text-slate-600 truncate">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
            {nombreOficina}
          </span>
        </div>
        <div className="col-span-2 text-right">
          <span
            className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${
                 r.includes("TEC")
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {r}
          </span>
        </div>
      </div>
      {abierta && (
        <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 text-xs flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap gap-6 text-slate-600">
            <div><strong>Email:</strong> {u.mail || "Automático"}</div>
            <div><strong>Teléfono:</strong> {u.tele || "N/A"}</div>
            <div><strong>Oficina:</strong> {nombreOficina}</div>
          </div>
          {esAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => onEditar(u)}
                className="px-2.5 py-1 font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                Editar
              </button>
              <button
                onClick={() => onEliminar(u.dni)}
                className="px-2.5 py-1 font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100 transition"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
