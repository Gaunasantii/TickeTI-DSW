import React from "react";
import type { EstadoItem, TicketItem } from "../../../../types/tickets";
import { TicketCard } from "./TicketCard";
import { ticketPaginatedModel } from "../../../../models/ticket.model";

interface TicketListProps {
  tickets: ticketPaginatedModel[];
  cargando: boolean;
  estadosEmpresa: EstadoItem[];
  mostrarAccionesEstado: boolean;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  cargando,
  estadosEmpresa
}) => (
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
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          estadosEmpresa={estadosEmpresa}
        />
      ))
    )}
  </div>
);
