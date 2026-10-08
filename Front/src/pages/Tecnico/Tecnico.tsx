import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView, TicketItem } from "../../components/tickets/TicketDashboardView";
import { api } from "../../services/api";
import { cambiarEstadoTicket } from "../../services/TicketServices/CambiarEstadoTicket";
import { crearTicket } from "../../services/TicketServices/CrearTicket";

export const TecnicoPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [cargando, setCargando] = useState(true);

  // Categorías dinámicas
  const [categorias, setCategorias] = useState<{ id: number | string; nombre: string }[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");

  // Formulario de creación de ticket
  const [mostrarForm, setMostrarForm] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [creando, setCreando] = useState(false);

  const usuarioRaw = sessionStorage.getItem("user") || sessionStorage.getItem("usuario");
  let usuario: any = null;
  try {
    usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  } catch {
    usuario = null;
  }

  const cargarTickets = async () => {
    try {
      setCargando(true);
      const res = await api("/tickets");
      if (!res.ok) {
        setTickets([]);
        return;
      }
      const json = await res.json();
      const lista: TicketItem[] = json?.data || (Array.isArray(json) ? json : []);
      setTickets(lista);
    } catch (err) {
      console.error("Error al cargar tickets:", err);
      setTickets([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTickets();

    const cargarCategorias = async () => {
      try {
        const res = await api("/categorias").catch(() => api("/categoria"));
        if (!res.ok) return;
        const json = await res.json();
        const lista = json?.data || (Array.isArray(json) ? json : []);
        setCategorias(lista);
        if (lista.length > 0) {
          setCategoriaSeleccionada(String(lista[0].id));
        }
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };
    cargarCategorias();
  }, []);

  const handleCambiarEstado = async (ticketId: string | number, nuevoEstadoId: number | string) => {
    try {
      await cambiarEstadoTicket(ticketId, nuevoEstadoId);
      await cargarTickets();
    } catch (err: any) {
      console.error("Error al cambiar estado:", err);
      alert(err.message || "Error al cambiar el estado del ticket");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreando(true);
      const dniTecnico = String(usuario?.dni || usuario?.id || "").trim();

      if (!dniTecnico || dniTecnico.length < 8) {
        alert("El técnico debe contar con un DNI válido de al menos 8 dígitos.");
        return;
      }

      if (!categoriaSeleccionada) {
        alert("Por favor seleccioná una categoría para el ticket.");
        return;
      }

      await crearTicket({
        title: asunto,
        description: descripcion,
        estado: 1,
        prioridad: 1,
        categoria: Number(categoriaSeleccionada),
        usuario: dniTecnico,
      });

      setAsunto("");
      setDescripcion("");
      setMostrarForm(false);
      await cargarTickets();
      alert("Ticket creado exitosamente.");
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
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
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
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
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
                  Descripción detallada
                </label>
                <textarea
                  required
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
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

export const Tecnico = TecnicoPage;
export default TecnicoPage;