import React, { useState } from "react";
import type { IMeta } from "../../responses/IPaginatedApiResponse";
import type { IObtenerTicketsParams } from "../../interfaces/IObtenerTickets.params";
import type { CategoriaModel } from "../../models/categoria.model";
import { TicketFilters } from "./TicketDashboardView/components/TicketFilters";
import { TicketList } from "./TicketDashboardView/components/TicketList";
import { TicketMetrics } from "./TicketDashboardView/components/TicketMetrics";
import { Pagination } from "../Pagination";
import type { ticketPaginatedModel } from "../../models/ticket.model";
import { estadoModel } from "../../models/estado.model";

interface TicketDashboardViewProps {
  tickets: ticketPaginatedModel[];
  estados: estadoModel[];
  categorias: CategoriaModel[];
  cargando: boolean;
  onRefresh: (params: IObtenerTicketsParams) => void;
  onCambiarEstado?: (ticketId: number, nuevoEstadoId: number) => Promise<void>;
  mostrarAccionesEstado?: boolean;
  mostrarMetricas?: boolean;
  meta: IMeta;
}

export const TicketDashboardView: React.FC<TicketDashboardViewProps> = ({
  tickets,
  estados,
  categorias,
  cargando,
  meta: {
        currentPage,
        itemsPerPage,
        totalItems,
        totalPages,
  },
  onRefresh,
  onCambiarEstado,
  mostrarAccionesEstado = false,
  mostrarMetricas = true,
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
      {/*
      {mostrarMetricas  && (
        <TicketMetrics
          estados={estadosEmpresa.slice(0, 4)}
          metricasPorEstado={metricasPorEstado}
        />
      )}
      */}

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
        mostrarAccionesEstado={mostrarAccionesEstado}
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
