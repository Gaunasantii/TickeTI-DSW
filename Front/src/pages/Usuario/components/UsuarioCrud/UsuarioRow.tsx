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
  onEliminar: (usuario: personaPaginatedModel) => void;
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
  const roleClasses = r.includes("TEC")
    ? "border-blue-200 bg-blue-50 text-blue-700"
    : "border-slate-200 bg-slate-100 text-slate-700";

  return (
    <div className="border-b border-slate-100 p-3 last:border-b-0 md:p-0">
      <div className={`overflow-hidden rounded-xl border border-slate-200 md:hidden ${abierta ? "bg-blue-50/40" : "bg-white"}`}>
        <button
          type="button"
          aria-expanded={abierta}
          onClick={() => onToggle(u.dni, abierta)}
          className="flex w-full flex-col gap-3 p-3 text-left sm:p-4"
        >
          <div className="flex w-full items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2">
              <span className={`mt-0.5 shrink-0 text-xs transition ${abierta ? "rotate-90 text-blue-600" : "text-slate-400"}`} aria-hidden="true">
                ▶
              </span>
              <div className="min-w-0">
                <p className="break-all font-mono text-xs font-semibold text-slate-700">{u.dni}</p>
                <p className="break-words text-sm font-medium text-slate-800">
                  {u.name} {u.surName || ""}
                </p>
              </div>
            </div>
            <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${roleClasses}`}>
              {r}
            </span>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-1 border-t border-slate-100 pt-2">
            <span className="text-xs text-slate-500">Oficina</span>
            <span className="break-words text-xs text-slate-700">{nombreOficina}</span>
          </div>
        </button>
        {abierta && (
          <div className="space-y-3 border-t border-slate-100 px-3 py-3 text-xs text-slate-600 sm:px-4">
            <div className="space-y-2">
              <p className="break-all"><strong>Email:</strong> {u.mail || "Automático"}</p>
              <p><strong>Teléfono:</strong> {u.tele || "N/A"}</p>
              <p className="break-words"><strong>Oficina:</strong> {nombreOficina}</p>
            </div>
            {esAdmin && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onEditar(u)}
                  className="w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 font-semibold text-blue-700 transition lg:hover:bg-blue-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(u)}
                  className="w-full rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 font-semibold text-rose-700 transition lg:hover:bg-rose-100"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-expanded={abierta}
        onClick={() => onToggle(u.dni, abierta)}
        className={`hidden w-full grid-cols-12 items-center px-4 py-3.5 text-left text-sm transition lg:px-5 md:grid ${
          abierta ? "bg-blue-50/40" : "lg:hover:bg-slate-50"
        }`}
      >
        <span className="col-span-3 flex min-w-0 items-center gap-2 font-mono font-semibold text-slate-700">
          <span className={`shrink-0 text-xs ${abierta ? "rotate-90 text-blue-600" : "text-slate-400"}`} aria-hidden="true">▶</span>
          <span className="truncate">{u.dni}</span>
        </span>
        <span className="col-span-4 min-w-0 break-words pr-2 font-medium text-slate-800">
          {u.name} {u.surName || ""}
        </span>
        <span className="col-span-3 min-w-0 truncate text-xs text-slate-600">
          <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-1">
            {nombreOficina}
          </span>
        </span>
        <span className="col-span-2 text-right">
          <span className={`inline-block rounded-full border px-2 py-1 text-[10px] font-semibold sm:text-xs ${roleClasses}`}>
            {r}
          </span>
        </span>
      </button>

      {abierta && (
        <div className="hidden flex-col gap-3 rounded-b-xl border-t border-slate-100 bg-slate-50/70 px-4 py-4 text-xs md:flex md:flex-row md:items-center md:justify-between lg:px-6">
          <div className="flex min-w-0 flex-col gap-2 text-slate-600 sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-6">
            <div className="break-all"><strong>Email:</strong> {u.mail || "Automático"}</div>
            <div><strong>Teléfono:</strong> {u.tele || "N/A"}</div>
            <div className="break-words"><strong>Oficina:</strong> {nombreOficina}</div>
          </div>
          {esAdmin && (
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => onEditar(u)}
                className="w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 font-semibold text-blue-700 transition sm:w-auto lg:hover:bg-blue-100"
              >
                Editar
              </button>
              <button
                onClick={() => onEliminar(u)}
                className="w-full rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 font-semibold text-rose-700 transition sm:w-auto lg:hover:bg-rose-100"
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
