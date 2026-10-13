import React, { useMemo } from "react";
import type { EstadoItem, TicketItem } from "../../../../types/tickets";
import { TicketCard } from "./TicketCard";
import { ticketPaginatedModel } from "../../../../models/ticket.model";
import { estadoModel } from "../../../../models/estado.model";
import { CategoriaModel } from "../../../../models/categoria.model";
import { prioridadModel } from "../../../../models/prioridad.model";
import { MyTicketCard } from "./MyTicketsCard";
import { filterIntermediateStates } from "../../../../helpers/FilterEstadosIntermedios";

interface TicketListProps {
  tickets: ticketPaginatedModel[];
  cargando: boolean;
  estadosEmpresa: estadoModel[];
  categoriasEmpresa:CategoriaModel[];
  prioridadesEmpresa:prioridadModel[];
  mostrarAcciones: boolean;
  onCambiarEstado?: (ticketId: string | number, nuevoEstadoId: number | string) => Promise<void>;
  onCambiarCategoria?: (ticketId: string | number, nuevaCategoriaId: number | string) => Promise<void>;
  onCambiarPrioridad?: (ticketId: string | number, nuevaPrioridadId: number | string) => Promise<void>;
  onEliminar?: (ticketId: string | number) => Promise<void>;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  cargando,
  estadosEmpresa,
  mostrarAcciones,
  onCambiarEstado,
  categoriasEmpresa,
  prioridadesEmpresa,
  onCambiarCategoria,
  onCambiarPrioridad,
  onEliminar
}) => {

  const filteredIntermediateStates = useMemo(() => {
    return filterIntermediateStates(estadosEmpresa);
  }, [estadosEmpresa]);

  return (
  <div className="space-y-3">
    {cargando ? (
      <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500 text-sm">Cargando tickets...</p>
      </div>
    ) : tickets.length === 0 ? (
      <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500 text-sm">No hay tickets registrados con estos filtros.</p>
      </div>
    ) : (
      tickets.map((ticket) => (
        mostrarAcciones ? (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            estadosEmpresa={filteredIntermediateStates}
            categoriasEmpresa={categoriasEmpresa}
            prioridadesEmpresa={prioridadesEmpresa}
            onCambiarEstado={onCambiarEstado}
            onCambiarCategoria={onCambiarCategoria}
            onCambiarPrioridad={onCambiarPrioridad}
          />
        ) : <MyTicketCard
            key={ticket.id}
            ticket={ticket}
            onEliminar={onEliminar}
          />
      ))
    )}
    </div>
  );
};
