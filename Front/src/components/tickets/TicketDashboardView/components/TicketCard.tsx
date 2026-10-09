import React from "react";
import type { EstadoItem, TicketItem } from "../../../../types/tickets";
import type { ticketPaginatedModel } from "../../../../models/ticket.model";

interface TicketCardProps {
  ticket: ticketPaginatedModel;
  estadosEmpresa: EstadoItem[];
  onCambiarEstado?: (ticketId: string | number, nuevoEstadoId: number | string) => Promise<void>;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket: t,
}) => {
  const eId = t.estado;
  const pId = t.prioridad;
  const badgeEstado = t.estado;

  const catNombre=t.categoria;
  //const catNombre =t.categoria.nombre;;

  const fechaAlta = t.fechaCreacion;
  const fechaFin = t.fechaCierre;

  const dni =t.usuario;
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            #{t.id}
          </span>
          <h3 className="font-semibold text-slate-800 text-sm">{t.title}</h3>

          {catNombre && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              {catNombre}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 line-clamp-2">{t.description}</p>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className={`px-2 py-0.5 rounded-full font-medium border ${badgeEstado}`}>
            {t.estado}
          </span>
          <span className={`px-2 py-0.5 rounded-full font-medium border ${pId}`}>
            {t.prioridad}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600">
            Solicitante: <strong className="font-mono text-slate-800">{dni}</strong>
          </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500">
                Creado: <strong className="font-normal text-slate-700">{fechaAlta}</strong>
              </span>
          {fechaFin && (
            <>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-600">
                Cerrado: <strong className="font-medium text-emerald-700">{fechaFin}</strong>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
