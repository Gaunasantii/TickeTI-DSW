import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";
import { actualizarTicket } from "../../services/TicketServices/ActualizarTicket";

interface Ticket {
  id: string | number;
  asunto?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  estadoId?: number;
  estado?: { id?: number; nombre: string } | number | string;
  prioridadId?: number;
  prioridad?: { nombre: string } | number | string;
  categoriaId?: number;
  usuario?: { nombre: string; dni?: string } | string;
}

export const MAPA_ESTADOS: Record<number, { label: string; color: string }> = {
  1: { label: "Abierto", color: "bg-blue-100 text-blue-800 border-blue-200" },
  2: { label: "En Progreso", color: "bg-amber-100 text-amber-800 border-amber-200" },
  3: { label: "Resuelto", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  4: { label: "Cerrado", color: "bg-gray-100 text-gray-700 border-gray-200" },
};

export const TecnicoPage: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actualizandoId, setActualizandoId] = useState<string | number | null>(null);

  const usuarioRaw = sessionStorage.getItem("usuario");
  let usuario = null;
  try {
    usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  } catch {
    usuario = null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("usuario");
    navigate("/login");
  };

  const cargarTickets = async () => {
    try {
      setCargando(true);
      setError(null);
      const res = await obtenerTickets();
      setTickets(res);
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
    // Si intenta Cerrar el ticket (ID 4), pedir confirmación
    if (nuevoEstadoId === 4) {
      const confirma = window.confirm(
        "¿Estás seguro de que deseás cerrar este ticket?\nUna vez cerrado, se archivará y pasará al historial."
      );
      if (!confirma) return;
    }

    try {
      setActualizandoId(ticketId);
      await actualizarTicket(ticketId, {
        estado: nuevoEstadoId,
      });
      await cargarTickets();
    } catch (err: any) {
      console.error("Error al actualizar estado:", err);
      alert(err.message || "No se pudo cambiar el estado del ticket");
    } finally {
      setActualizandoId(null);
    }
  };

  // En la bandeja activa mostramos tickets que no estén cerrados (estadoId !== 4)
  const ticketsActivos = tickets.filter((t) => {
    const estadoId = Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;
    return estadoId !== 4;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Encabezado */}
      <header className="border-b pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Panel de Soporte Técnico</h1>
          <p className="text-sm text-gray-500">
            Gestión y seguimiento de incidentes | Técnico:{" "}
            <strong className="text-gray-700 capitalize">{usuario?.name || "Técnico"}</strong>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition active:scale-95"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Bandeja de Tickets Activos</h2>
            <p className="text-xs text-gray-500">Tickets pendientes, en progreso y resueltos</p>
          </div>
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
        ) : ticketsActivos.length === 0 ? (
          <p className="text-gray-500">No hay tickets activos pendientes en la bandeja.</p>
        ) : (
          <div className="grid gap-4">
            {ticketsActivos.map((t) => {
              const estadoId =
                Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;

              const estadoInfo = MAPA_ESTADOS[estadoId] || {
                label: `Estado ${estadoId}`,
                color: "bg-gray-100 text-gray-800 border-gray-200",
              };

              return (
                <div
                  key={t.id}
                  className="p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-gray-300 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-blue-600">#{t.id}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{t.asunto || t.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{t.descripcion || t.description}</p>
                    <div className="flex gap-2 pt-2 text-xs">
                      <span className={`px-2.5 py-0.5 rounded-full font-medium border ${estadoInfo.color}`}>
                        {estadoInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Selector rápido de los 4 estados */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      disabled={actualizandoId === t.id || estadoId === 1}
                      onClick={() => handleCambiarEstado(t.id, 1)}
                      className="px-2.5 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Abierto
                    </button>
                    <button
                      disabled={actualizandoId === t.id || estadoId === 2}
                      onClick={() => handleCambiarEstado(t.id, 2)}
                      className="px-2.5 py-1.5 text-xs font-medium bg-amber-500 text-white rounded hover:bg-amber-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      En progreso
                    </button>
                    <button
                      disabled={actualizandoId === t.id || estadoId === 3}
                      onClick={() => handleCambiarEstado(t.id, 3)}
                      className="px-2.5 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded hover:bg-emerald-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Resolver
                    </button>
                    <button
                      disabled={actualizandoId === t.id || estadoId === 4}
                      onClick={() => handleCambiarEstado(t.id, 4)}
                      className="px-2.5 py-1.5 text-xs font-medium bg-gray-800 text-white rounded hover:bg-black transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Cerrar
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