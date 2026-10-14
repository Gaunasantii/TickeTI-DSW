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
    try {
      const lista = await obtenerTicketsPaginado(filters);
      setTickets(lista.data || []);
      setMeta(lista.meta || {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1,
      });
      setCargando(false);
    } catch (err) {
      console.error("Error al cargar tickets:", err);
    }
  };

  const cargarEstados = async () => {
    try {
      const lista = await getAllEstados();
      setEstados(lista.data || []);
    } catch (err) {
      console.error("Error al cargar estados de la empresa:", err);
    }
  };

  const cargarCategorias = async () => {
    try {
      const lista = await getAllCategorias();
      setCategorias(lista.data || []);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  };

  const cargarPrioridades = async () => {
    try {
      const lista = await getAllPrioridades();
      setPrioridades(lista.data || []);
    } catch (err) {
      console.error("Error al cargar prioridades:", err);
    }
  };

  useEffect(() => {
    cargarEstados();
    cargarCategorias();
    cargarPrioridades();
    cargarTickets({ pagina: 1, cantidad: 10 });
  }, []);

  const handleTomarTicket = async (ticketId: number | string) => {
    try {
      await crearAsignacion({ticket:ticketId});
      await cargarTickets({pagina:meta.currentPage, cantidad:meta.itemsPerPage});
    } catch (err: any) {
      console.error("Error al tomar ticket:", err);
      alert(err.message || "Error al tomar el ticket");
    }
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