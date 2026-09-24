import React, { useEffect, useState } from "react";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";
import { actualizarTicket } from "../../services/TicketServices/ActualizarTicket";

interface Ticket {
  id: string | number;
  asunto?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  estado?: { id?: number; nombre: string } | string;
  prioridad?: { nombre: string } | string;
  usuario?: { nombre: string } | string;
}

export const TecnicoPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actualizandoId, setActualizandoId] = useState<string | number | null>(null);

  const cargarTickets = async () => {
    try {
      setCargando(true);
      setError(null);
      const res = await obtenerTickets();
      setTickets(res.data || res || []);
    } catch (err: any) {
      setError(err.message || "Error al cargar los tickets asignados");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  const handleCambiarEstado = async (ticketId: string | number, nuevoEstadoId: number) => {
    try {
      setActualizandoId(ticketId);
      await actualizarTicket(ticketId, { estado: nuevoEstadoId });
      await cargarTickets();
    } catch (err: any) {
      alert(err.message || "No se pudo cambiar el estado del ticket");
    } finally {
      setActualizandoId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Soporte Técnico</h1>
        <p className="text-sm text-gray-500">Gestión, seguimiento y resolución de incidentes asignados</p>
      </header>

      <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Bandeja de Tickets</h2>
          <button
            onClick={cargarTickets}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
          >
            Refrescar
          </button>
        </div>

        {cargando ? (
          <p className="text-gray-500">Cargando tickets asignados...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500">No hay tickets asignados pendientes.</p>
        ) : (
          <div className="grid gap-4">
            {tickets.map((t) => {
              const estadoNombre =
                typeof t.estado === "object" ? t.estado?.nombre : t.estado || "Abierto";

              return (
                <div
                  key={t.id}
                  className="p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-blue-600">#{t.id}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{t.asunto || t.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{t.descripcion || t.description}</p>
                    <div className="flex gap-2 pt-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                        Prioridad: {typeof t.prioridad === "object" ? t.prioridad?.nombre : t.prioridad || "Normal"}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        Estado actual: {estadoNombre}
                      </span>
                    </div>
                  </div>

                  {/* Acciones de cambio de estado */}
                  <div className="flex items-center gap-2">
                    <button
                      disabled={actualizandoId === t.id}
                      onClick={() => handleCambiarEstado(t.id, 2)}
                      className="px-3 py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white rounded transition disabled:opacity-50"
                    >
                      En progreso
                    </button>
                    <button
                      disabled={actualizandoId === t.id}
                      onClick={() => handleCambiarEstado(t.id, 3)}
                      className="px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded transition disabled:opacity-50"
                    >
                      Resolver
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default TecnicoPage;