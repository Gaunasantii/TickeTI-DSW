import React, { useEffect, useState } from "react";
import { getAllCategorias } from "../../services/CategoriaService/GetAllCategorias";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView } from "../../components/tickets/TicketDashboardView";
import { cambiarEstadoTicket } from "../../services/TicketServices/CambiarEstadoTicket";
import { CategoriaModel } from "../../models/categoria.model";
import { estadoModel } from "../../models/estado.model";
import { obtenerTicketsPaginado } from "../../services/TicketServices/ObtenerTicketsPaginado";
import { IObtenerTicketsParams } from "../../interfaces/IObtenerTickets.params";
import { ticketPaginatedModel } from "../../models/ticket.model";
import { getAllEstados } from "../../services/EstadoServices/GetAllEstados";
import { type IMeta } from "../../responses/IPaginatedApiResponse";
import { crearAsignacion } from "../../services/AsignacionServices/CrearAsignacion";
import { prioridadModel } from "../../models/prioridad.model";
import { getAllPrioridades } from "../../services/PrioridadServices/GetAllPrioridades";
import { CambiarCategoria } from "../../services/TicketServices/CambiarCategoria";

export const TecnicoPage: React.FC = () => {
  const [tickets, setTickets] = useState<ticketPaginatedModel[]>([]);
  const [cargando, setCargando] = useState(true);
  const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
  const [prioridades, setPrioridades] = useState<prioridadModel[]>([]);
  const [estados, setEstados] = useState<estadoModel[]>([]);
  const [meta, setMeta] = useState<IMeta>({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const cargarTickets = async (filters: IObtenerTicketsParams) => {
      const lista = await obtenerTicketsPaginado(filters);
      if(!lista)return;
      setTickets(lista.data || []);
      setMeta(lista.meta || {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1,
      });
      setCargando(false);
  };

  const cargarEstados = async () => {
      const lista = await getAllEstados();
      if(!lista)return;
      setEstados(lista.data || []);
  };

  const cargarCategorias = async () => {
      const lista = await getAllCategorias();
      if(!lista)return;
      setCategorias(lista.data || []);
  };

  const cargarPrioridades = async () => {
      const lista = await getAllPrioridades();
      if(!lista)return;
      setPrioridades(lista.data || []);
  };

  useEffect(() => {
    cargarEstados();
    cargarCategorias();
    cargarPrioridades();
    cargarTickets({ pagina: 1, cantidad: 10 });
  }, []);

  const handleTomarTicket = async (ticketId: number | string) => {
      await crearAsignacion({ticket:ticketId});
      await cargarTickets({pagina:meta.currentPage, cantidad:meta.itemsPerPage});
  };

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panel Técnico</h1>
          <p className="text-sm text-slate-500">
            Gestioná las solicitudes de soporte
          </p>
        </div>

        <TicketDashboardView
          meta={meta}
          categorias={categorias}
          estados={estados}
          tickets={tickets}
          cargando={cargando}
          onRefresh={cargarTickets}
          prioridades={prioridades}
          onTomarTicket={handleTomarTicket}
          mostrarAcciones={true}
        />
      </div>
  );
};

export const Tecnico = TecnicoPage;
export default TecnicoPage;