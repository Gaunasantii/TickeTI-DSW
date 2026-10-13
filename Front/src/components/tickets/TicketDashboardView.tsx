import React, { useState } from "react";
import type { IMeta } from "../../responses/IPaginatedApiResponse";
import type { IObtenerTicketsParams } from "../../interfaces/IObtenerTickets.params";
import type { CategoriaModel } from "../../models/categoria.model";
import { TicketFilters } from "./TicketDashboardView/components/TicketFilters";
import { TicketList } from "./TicketDashboardView/components/TicketList";
import { Pagination } from "../Pagination";
import type { ticketPaginatedModel } from "../../models/ticket.model";
import { estadoModel } from "../../models/estado.model";
import { prioridadModel } from "../../models/prioridad.model";

interface TicketDashboardViewProps {
  tickets: ticketPaginatedModel[];
  estados: estadoModel[];
  categorias: CategoriaModel[];
  prioridades: prioridadModel[];
  cargando: boolean;
  onRefresh: (params: IObtenerTicketsParams) => void;
  onCambiarEstado?: (ticketId: number | string, nuevoEstadoId: number | string) => Promise<void>;
  onCambiarCategoria?: (ticketId: number|string, nuevaCategoriaId: number | string) => Promise<void>;
  onCambiarPrioridad?: (ticketId: number | string, nuevaPrioridadId: number | string) => Promise<void>;
  onEliminar?: (ticketId: number | string) => Promise<void>;
  mostrarAcciones: boolean;
  meta: IMeta;
}

export const TicketDashboardView: React.FC<TicketDashboardViewProps> = ({
  tickets,
  estados,
  categorias,
  prioridades,
  cargando,
  meta: {
        currentPage,
        itemsPerPage,
        totalItems,
        totalPages,
  },
  onRefresh,
  onCambiarEstado,
  onCambiarCategoria,
  onCambiarPrioridad,
  mostrarAcciones,
  onEliminar,
}) => {
  const [filtro,setFiltro]=useState<IObtenerTicketsParams>({
    estado: undefined,
    categoria: undefined,
    pagina: 1,
    cantidad: 10,
  });
  const itemsPorPagina = 10;

  return (
    <div className="space-y-6">

      <TicketFilters
        filtros={{ estado: filtro.estado, categoria: filtro.categoria }}
        estadosEmpresa={estados}
        onFiltroChange={(valores) => {
          setFiltro({ estado: valores.estado, categoria: valores.categoria, pagina: 1, cantidad: 10 });
        }}
        categorias={categorias}
        onRefresh={() => {
          onRefresh(filtro as IObtenerTicketsParams);
        }}
      />

      {totalItems > itemsPorPagina && (
        <Pagination
          cantidad={totalItems}
          cantidadVisible={itemsPorPagina}
          paginaActual={currentPage}
          totalPaginas={totalPages}
          onAnterior={() => onRefresh({ ...filtro, pagina: Math.max(currentPage - 1, 1) })}
          onSiguiente={() => onRefresh({ ...filtro, pagina: Math.min(currentPage + 1, totalPages) })}
        />
      )}

      <TicketList
        tickets={tickets}
        cargando={cargando}
        estadosEmpresa={estados}
        prioridadesEmpresa={prioridades}
        categoriasEmpresa={categorias}
        mostrarAcciones={mostrarAcciones}
        onCambiarEstado={onCambiarEstado}
        onCambiarCategoria={onCambiarCategoria}
        onCambiarPrioridad={onCambiarPrioridad}
        onEliminar={onEliminar}
      />

      {totalItems > itemsPorPagina && (
        <Pagination
          cantidad={totalItems}
          cantidadVisible={itemsPorPagina}
          paginaActual={currentPage}
          totalPaginas={totalPages}
          onAnterior={() => onRefresh({ ...filtro, pagina: Math.max(currentPage - 1, 1) })}
          onSiguiente={() => onRefresh({ ...filtro, pagina: Math.min(currentPage + 1, totalPages) })}
        />
      )}
    </div>
  );
};

export default TicketDashboardView;
