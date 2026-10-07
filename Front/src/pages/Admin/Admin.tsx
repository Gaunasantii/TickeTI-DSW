import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView, TicketItem } from "../../components/tickets/TicketDashboardView";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";
import { actualizarTicket } from "../../services/TicketServices/ActualizarTicket";
import { api } from "../../services/api";
import { cambiarEstadoTicket } from "../../services/TicketServices/CambiarEstadoTicket";

export const AdminPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
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
    cargarDatos();
  }, []);

  const handleCambiarEstado = async (ticketId: string | number, nuevoEstadoId: number | string) => {
    try {
      await cambiarEstadoTicket(ticketId, nuevoEstadoId);
      await cargarDatos();
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
          tickets={tickets}
          cargando={cargando}
          onRefresh={cargarDatos}
          onCambiarEstado={handleCambiarEstado}
          mostrarAccionesEstado={true}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;