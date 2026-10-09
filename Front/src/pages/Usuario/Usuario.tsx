import React, { useEffect, useState } from "react";
import { getAllCategorias } from "../../services/CategoriaService/GetAllCategorias";
import type { ICreateTicketRequest } from "../../requests/ICreateTicketRequest";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView } from "../../components/tickets/TicketDashboardView";
import { cambiarEstadoTicket } from "../../services/TicketServices/CambiarEstadoTicket";
import { crearTicket } from "../../services/TicketServices/CrearTicket";
import { CategoriaModel } from "../../models/categoria.model";
import { estadoModel } from "../../models/estado.model";
import { api } from "../../services/api";
import { obtenerMisTickets } from "../../services/TicketServices/ObtenerMisTickets";
import { obtenerTicketsPaginado } from "../../services/TicketServices/ObtenerTicketsPaginado";
import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IObtenerTicketsParams } from "../../interfaces/IObtenerTickets.params";
import { ticketPaginatedModel } from "../../models/ticket.model";
import { getAllEstados } from "../../services/EstadoServices/GetAllEstados";
import {type IMeta } from "../../responses/IPaginatedApiResponse";
import { getAllPrioridades } from "../../services/PrioridadServices/getAllPrioridades";
import type { prioridadModel } from "../../models/prioridad.model";


export const UserDashboardPage: React.FC = () => {
  const [tickets, setTickets] = useState<ticketPaginatedModel[]>([]);
  const [cargando, setCargando] = useState(true);

  const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
  const [prioridades, setPrioridades] = useState<prioridadModel[]>([]);

  const [estados,setEstados]=useState<estadoModel[]>([]);
  const [meta, setMeta] = useState<IMeta>({
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 1,
    });

  const [mostrarForm, setMostrarForm] = useState(false);
    const [creando, setCreando] = useState(false);
    const [ticketValues, setTicketValue] = useState<ICreateTicketRequest>({
      title: "",
      description: "",
      prioridad: 0,
      categoria: 0,
    });

  const usuarioRaw = sessionStorage.getItem("user") || sessionStorage.getItem("usuario");
  let usuario: any = null;
  try {
    usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  } catch {
    usuario = null;
  }

  const cargarTickets = async (filters:IObtenerTicketsParams) => {
          try {
            console.log("Cargando tickets con filtros:", filters);
            const lista = await obtenerMisTickets(filters);
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
        cargarPrioridades();
        cargarCategorias();
        cargarTickets({ pagina: 1, cantidad: 10 });
      }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreando(true);

      if (!ticketValues.categoria) {
        alert("Por favor seleccioná una categoría para el ticket.");
        return;
      }

      await crearTicket(ticketValues);

      setTicketValue({
        title: "",
        description: "",
        prioridad: 0,
        categoria: 0,
      });
      setMostrarForm(false);
      alert("Ticket reportado exitosamente.");
    } catch (err: any) {
      alert(err.message || "Error al crear el ticket");
    } finally {
      setCreando(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Panel Técnico</h1>
            <p className="text-sm text-slate-500">
              Gestioná las solicitudes de soporte y reportá nuevas incidencias
            </p>
          </div>
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition self-start sm:self-auto"
          >
            {mostrarForm ? "Cerrar formulario" : "+ Reportar nuevo ticket"}
          </button>
        </div>

        {mostrarForm && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Generar Solicitud de Incidencia</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Título del problema
                </label>
                <input
                  type="text"
                  required
                  value={ticketValues.title}
                  onChange={(e) => setTicketValue({ ...ticketValues, title: e.target.value })}
                  placeholder="Ej: Falla en switch de planta o reinstalación de SO"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Categoría del Incidente
                </label>
                <select
                  required
                  value={ticketValues.categoria}
                  onChange={(e) => setTicketValue({ ...ticketValues, categoria: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-700"
                >
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Prioridad del Incidente
                </label>
                <select
                  required
                  value={ticketValues.prioridad}
                  onChange={(e) => setTicketValue({ ...ticketValues, prioridad: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-700"
                >
                  {prioridades.map((prio) => (
                    <option key={prio.id} value={prio.id}>
                      {prio.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Descripción detallada
                </label>
                <textarea
                  required
                  rows={3}
                  value={ticketValues.description}
                  onChange={(e) => setTicketValue({ ...ticketValues, description: e.target.value })}
                  placeholder="Describí los detalles técnicos observados..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMostrarForm(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creando}
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50"
                >
                  {creando ? "Enviando..." : "Crear Ticket"}
                </button>
              </div>
            </form>
          </div>
        )}

        <TicketDashboardView
          meta={meta}
          categorias={categorias}
          estados={estados}
          tickets={tickets}
          cargando={cargando}
          onRefresh={cargarTickets}
          mostrarAccionesEstado={false}
          mostrarMetricas={false}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;