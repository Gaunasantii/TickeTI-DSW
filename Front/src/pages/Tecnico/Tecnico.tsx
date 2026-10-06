import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView, TicketItem } from "../../components/tickets/TicketDashboardView";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";
import { actualizarTicket } from "../../services/TicketServices/ActualizarTicket";
import { crearTicket } from "../../services/TicketServices/CrearTicket";
import { api } from "../../services/api";

export const TecnicoPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [creando, setCreando] = useState(false);

  const usuarioRaw = sessionStorage.getItem("user");
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
    if (!res.ok) return setTickets([]);
    const json = await res.json();
    // El backend ya devuelve exactamente los tickets autorizados para la sesión actual
    setTickets(json?.data || (Array.isArray(json) ? json : []));
  } catch (err) {
    console.error("Error al cargar tickets:", err);
    setTickets([]);
  } finally {
    setCargando(false);
  }
};

  useEffect(() => {
    cargarTickets();
  }, []);

  const handleCrearTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreando(true);
      const dniTecnico = String(usuario?.dni || usuario?.id || "").trim();

      if (!dniTecnico || dniTecnico.length < 8) {
        alert("El usuario técnico debe tener un DNI numérico válido de al menos 8 dígitos.");
        return;
      }

      await crearTicket({
        title: asunto,
        description: descripcion,
        estado: 1,
        prioridad: 1,
        categoria: 1,
        usuario: dniTecnico,
      });

      setAsunto("");
      setDescripcion("");
      setMostrarForm(false);
      await cargarTickets();
      alert("Ticket reportado exitosamente.");
    } catch (err: any) {
      alert(err.message || "Error al crear el ticket");
    } finally {
      setCreando(false);
    }
  };

  const handleCambiarEstado = async (ticketId: string | number, nuevoEstadoId: number | string) => {
    const ticketActual = tickets.find((t) => String(t.id) === String(ticketId));
    if (!ticketActual) return;

    try {
      // Extraemos IDs numéricos de forma segura
      const pId = typeof ticketActual.prioridad === "object" && ticketActual.prioridad !== null
        ? Number((ticketActual.prioridad as any).id) || 1
        : Number(ticketActual.prioridad) || 1;

      const cId = typeof ticketActual.categoria === "object" && ticketActual.categoria !== null
        ? Number((ticketActual.categoria as any).id) || 1
        : Number(ticketActual.categoria) || 1;

      // El body cumple de forma exacta con ModifyTicketSchema
      const payload = {
        title: ticketActual.title || ticketActual.asunto || "Sin título",
        description: ticketActual.description || ticketActual.descripcion || "Sin descripción",
        estado: Number(nuevoEstadoId),
        prioridad: pId,
        categoria: cId,
      };

      await actualizarTicket(ticketId, payload);
      await cargarTickets();
    } catch (err: any) {
      console.error("Detalle del error:", err);
      alert(err.message || "Error al cambiar estado del ticket");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Centro de Operaciones Técnicas</h1>
          <p className="text-sm text-slate-500">
            Gestión, seguimiento y resolución de incidentes
          </p>
        </div>

        {/* Barra alargada a lo ancho para desplegar el formulario */}
        <div className="w-full">
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="w-full py-3.5 px-6 bg-white hover:bg-slate-50 border-2 border-dashed border-blue-300 hover:border-blue-500 text-blue-600 rounded-2xl font-semibold text-sm transition-all shadow-sm flex items-center justify-between"
          >
            <span>{mostrarForm ? "Ocultar formulario de reporte" : "+ Reportar nuevo ticket o solicitar asistencia"}</span>
            <span className="text-xs bg-blue-50 px-3 py-1 rounded-full">
              {mostrarForm ? "Cerrar" : "Desplegar"}
            </span>
          </button>
        </div>

        {mostrarForm && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Cargar Nuevo Ticket</h2>
            <form onSubmit={handleCrearTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  placeholder="Ej: Falla en enlace o switch secundario"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Descripción detallada</label>
                <textarea
                  required
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Detalles del problema técnico..."
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

export default TecnicoPage;