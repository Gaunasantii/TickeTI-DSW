import React, { useState } from "react";
import type { EstadoItem } from "../../../../types/tickets";
import type { ticketPaginatedModel } from "../../../../models/ticket.model";
import { useAuth } from "../../../../context/AuthContext";
import { crearAsignacion } from "../../../../services/AsignacionServices/CrearAsignacion";

interface TicketCardProps {
  ticket: ticketPaginatedModel;
  estadosEmpresa?: EstadoItem[];
  onCambiarEstado?: (ticketId: string | number, nuevoEstadoId: number | string) => Promise<void>;
  onTicketUpdated?: () => void;
  esMisTickets?: boolean;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket: t,
  onTicketUpdated,
  esMisTickets = false,
}) => {
  const auth = useAuth() as any;
  const user = auth?.user || auth?.usuario;
  const [loading, setLoading] = useState(false);

  const catNombre = t.categoria;
  const fechaAlta = t.fechaCreacion;
  const fechaFin = t.fechaCierre;
  const dni = t.usuario;

  const rolUsuario = user?.type || user?.rol || user?.role;
  const esTecnico = String(rolUsuario || "").toLowerCase().includes("tecnico");

  const estadoRaw = typeof t.estado === "object" ? (t.estado as any)?.nombre : String(t.estado || "");
  const esEstadoAbierto = estadoRaw.toLowerCase().includes("abierto") || estadoRaw === "1";

  const tecnicoAsignado = (t as any).tecnico || (t as any).idTecnico || (t as any).asignacion;

  const esPropio = t.usuario === user?.dni || t.usuario === user?.name;

  const sinAsignar = !tecnicoAsignado && esEstadoAbierto && !esPropio && !esMisTickets;

  const handleTomarTicket = async () => {

    const userId = user?.id || user?.idUsuario || user?.idTecnico || user?.dni;

    if (!userId) {
      alert("Error: No se pudo identificar al usuario actual.");
      return;
    }

    setLoading(true);

    try {
    await crearAsignacion({
      ticket: Number(t.id),
      tecnico: String(userId),
    });

      if (onTicketUpdated) {
        onTicketUpdated();
      }
    } catch (error: any) {
      console.error("Error al tomar el ticket:", error);
      alert(error?.message || "Ocurrió un error al intentar tomar el ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            #{t.id}
          </span>
          <h3 className="font-semibold text-slate-800 text-sm">{t.title}</h3>

          {catNombre && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              {catNombre}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 line-clamp-2">{t.description}</p>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="px-2 py-0.5 rounded-full font-medium border bg-slate-50 text-slate-700">
            {estadoRaw}
          </span>
          <span className="px-2 py-0.5 rounded-full font-medium border bg-slate-50 text-slate-700">
            {t.prioridad}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600">
            Solicitante: <strong className="font-mono text-slate-800">{dni}</strong>
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">
            Creado: <strong className="font-normal text-slate-700">{fechaAlta}</strong>
          </span>
          {fechaFin && (
            <>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-600">
                Cerrado: <strong className="font-medium text-emerald-700">{fechaFin}</strong>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Botón de Acción para Tomar Ticket */}
      {esTecnico && sinAsignar && (
        <div className="flex items-center justify-end">
          <button
            onClick={handleTomarTicket}
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Tomando..." : "Tomar Ticket"}
          </button>
        </div>
      )}
    </div>
  );
};