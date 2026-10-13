import React from 'react';
import { TicketCard } from './TicketCard';
import type { ticketPaginatedModel } from '../../../../models/ticket.model';
import type { EstadoItem } from '../../../../types/tickets';

interface TicketListProps {
  tickets: ticketPaginatedModel[];
  estadosEmpresa?: EstadoItem[];
  onCambiarEstado?: (ticketId: string | number, nuevoEstadoId: number | string) => Promise<void>;
  onTicketUpdated?: () => void;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  estadosEmpresa,
  onCambiarEstado,
  onTicketUpdated,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          estadosEmpresa={estadosEmpresa}
          onCambiarEstado={onCambiarEstado}
          onTicketUpdated={onTicketUpdated}
        />
      ))}
    </div>
  );
};