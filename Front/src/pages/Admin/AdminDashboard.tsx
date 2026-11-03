import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView } from "../../components/tickets/TicketDashboardView";
import type { IObtenerTicketsParams } from "../../interfaces/IObtenerTickets.params";
import { obtenerTicketsPaginado } from "../../services/TicketServices/ObtenerTicketsPaginado";
import type { CategoriaModel } from "../../models/categoria.model";
import type { prioridadModel } from "../../models/prioridad.model";
import { getAllPrioridades } from "../../services/PrioridadServices/GetAllPrioridades"; 
import type { estadoModel } from "../../models/estado.model";
import type { IMeta } from "../../responses/IPaginatedApiResponse";
import { cambiarEstadoTicket } from "../../services/TicketServices/CambiarEstadoTicket";
import { ticketPaginatedModel } from "../../models/ticket.model";
import { getAllCategorias } from "../../services/CategoriaService/GetAllCategorias";
import { getAllEstados } from "../../services/EstadoServices/GetAllEstados"; 
import { CambiarCategoria } from "../../services/TicketServices/CambiarCategoria";
import { CambiarPrioridad } from "../../services/TicketServices/CambiarPrioridad";

export const AdminPage: React.FC = () => {
  const [tickets, setTickets] = useState<ticketPaginatedModel[]>([]);
  const [cargando, setCargando] = useState(true);
  
  const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
  const [prioridades, setPrioridades] = useState<prioridadModel[]>([]);

  const cargarPrioridades = async () => {
      const lista = await getAllPrioridades();
      if(!lista){
        setPrioridades([]);
        return;
      }
      setPrioridades(lista.data || []);
  };
  
  const [estados,setEstados]=useState<estadoModel[]>([]);
  const [meta, setMeta] = useState<IMeta>({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1,
      });


  const cargarEstados = async () => {
            const lista= await getAllEstados();
            if(!lista){
              setEstados([]);
              return;
            }
            setEstados(lista.data || []);
    };
        
    const cargarCategorias = async () => {
        const lista = await getAllCategorias();
        if(!lista){
          setCategorias([]);
          return;
        }
        setCategorias(lista.data || []);
      };

  const cargarTickets = async (filters:IObtenerTicketsParams) => {
            console.log("Cargando tickets con filtros:", filters);
            const lista = await obtenerTicketsPaginado(filters);
            if(!lista){
              setTickets([]);
              setMeta({
                currentPage: 1,
                itemsPerPage: 10,
                totalItems: 0,
                totalPages: 1,
              });
              setCargando(false);
              return;
            }
            setTickets(lista.data||[]);
            setMeta(lista.meta || {
              currentPage: 1,
              itemsPerPage: 10,
              totalItems: 0,
              totalPages: 1,
            });
            setCargando(false);
        };
     

  useEffect(() => {
    cargarEstados();
    cargarCategorias();
    cargarPrioridades();
    cargarTickets({ pagina: 1, cantidad: 10 });
  }, []);
  const handleCambiarEstado = async (ticketId: string | number, nuevoEstadoId: number | string) => {
      await cambiarEstadoTicket(ticketId, nuevoEstadoId);
  };

  const handleCambiarCategoria = async (ticketId: string | number, nuevaCategoriaId: number | string) => {
      await CambiarCategoria(ticketId, nuevaCategoriaId);
  };

  const handleCambiarPrioridad = async (ticketId: string | number, nuevaPrioridadId: number | string) => {
      await CambiarPrioridad(ticketId, nuevaPrioridadId);
  };


  return (
    <>
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
                  prioridades={prioridades}
                  tickets={tickets}
                  cargando={cargando}
                  onRefresh={cargarTickets}
                  onCambiarEstado={handleCambiarEstado}
                  onCambiarCategoria={handleCambiarCategoria}
                  onCambiarPrioridad={handleCambiarPrioridad}
                  mostrarAcciones={true}
                />
      </div>
    </>
  );
};

export default AdminPage;