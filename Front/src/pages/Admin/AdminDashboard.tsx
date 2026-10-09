import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView } from "../../components/tickets/TicketDashboardView";
import type { IObtenerTicketsParams } from "../../interfaces/IObtenerTickets.params";
import { obtenerTicketsPaginado } from "../../services/TicketServices/ObtenerTicketsPaginado";
import type { CategoriaModel } from "../../models/categoria.model";
import type { prioridadModel } from "../../models/prioridad.model";
import type { estadoModel } from "../../models/estado.model";
import type { IMeta } from "../../responses/IPaginatedApiResponse";
import { cambiarEstadoTicket } from "../../services/TicketServices/CambiarEstadoTicket";
import { ticketPaginatedModel } from "../../models/ticket.model";
import { getAllCategorias } from "../../services/CategoriaService/GetAllCategorias";
import { getAllEstados } from "../../services/EstadoServices/GetAllEstados"; 

export const AdminPage: React.FC = () => {
  const [tickets, setTickets] = useState<ticketPaginatedModel[]>([]);
  const [cargando, setCargando] = useState(true);
  
  const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
  
  const [estados,setEstados]=useState<estadoModel[]>([]);
  const [meta, setMeta] = useState<IMeta>({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1,
      });


  const cargarEstados = async () => {
          try {
            const lista= await getAllEstados();
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

  const cargarTickets = async (filters:IObtenerTicketsParams) => {
          try {
            console.log("Cargando tickets con filtros:", filters);
            const lista = await obtenerTicketsPaginado(filters);
            setTickets(lista.data||[]);
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
     

  useEffect(() => {
    cargarEstados();
    cargarCategorias();
    cargarTickets({ pagina: 1, cantidad: 10 });
  }, []);

  const handleCambiarEstado = async (ticketId: string | number, nuevoEstadoId: number | string) => {
    try {
      await cambiarEstadoTicket(ticketId, nuevoEstadoId);
    } catch (err: any) {
      console.error("Error al cambiar estado:", err);
      alert(err.message || "Error al cambiar el estado del ticket");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panel de Administrador</h1>
          <p className="text-sm text-slate-500">
            Supervisión y control de todas las incidencias registradas en la empresa
          </p>
        </div>

        <TicketDashboardView
                  meta={meta}
                  categorias={categorias}
                  estados={estados}
                  tickets={tickets}
                  cargando={cargando}
                  onRefresh={cargarTickets}
                  onCambiarEstado={handleCambiarEstado}
                  mostrarAccionesEstado={true}
                  mostrarMetricas={true}
                />
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;