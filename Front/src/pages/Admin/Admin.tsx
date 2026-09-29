import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView, TicketItem } from "../../components/tickets/TicketDashboardView";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";
import { actualizarTicket } from "../../services/TicketServices/ActualizarTicket";

export const AdminPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const res = await obtenerTickets();
      setTickets(res);
    } catch (err: any) {
      console.error("Error al cargar tickets:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCambiarEstado = async (ticketId: string | number, nuevoEstadoId: number) => {
    if (nuevoEstadoId === 4) {
      const confirma = window.confirm(
        "¿Deseás archivar y marcar como cerrado este ticket?"
      );
      if (!confirma) return;
    }

    const ticketActual = tickets.find((t) => String(t.id) === String(ticketId));
    if (!ticketActual) return;

    try {
      await actualizarTicket(ticketId, {
        title: ticketActual.title || ticketActual.asunto || "Sin título",
        description: ticketActual.description || ticketActual.descripcion || "Sin descripción",
        estado: Number(nuevoEstadoId),
        prioridad: Number(
          ticketActual.prioridadId ??
          (typeof ticketActual.prioridad === "object" ? (ticketActual.prioridad as any)?.id : ticketActual.prioridad) ??
          1
        ),
        categoria: Number(
          ticketActual.categoriaId ??
          (typeof ticketActual.categoria === "object" ? (ticketActual.categoria as any)?.id : ticketActual.categoria) ??
          1
        ),
      });

      await cargarDatos();
    } catch (err: any) {
      console.error("Error al cambiar estado:", err);
      alert(err.message || "Error al cambiar estado");
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