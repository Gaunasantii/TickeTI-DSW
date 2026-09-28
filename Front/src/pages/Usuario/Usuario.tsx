import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { crearTicket } from "../../services/TicketServices/CrearTicket";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";

interface Ticket {
  id: string | number;
  asunto?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  estadoId?: number;
  estado?: { id?: number; nombre: string } | number | string;
  createdAt?: string;
}

const MAPA_ESTADOS: Record<number, { label: string; color: string }> = {
  1: { label: "Abierto", color: "bg-blue-100 text-blue-800" },
  2: { label: "En Progreso", color: "bg-amber-100 text-amber-800" },
  3: { label: "Resuelto", color: "bg-emerald-100 text-emerald-800" },
  4: { label: "Cerrado", color: "bg-gray-100 text-gray-800" },
};

export const UserDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");

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
      setLoading(true);
      setError(null);
      const res = await obtenerTickets();
      setTickets(res);
    } catch (err: any) {
      setError(err.message || "Error al cargar los tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Obtenemos el DNI del usuario logueado en la sesión
      const dniUsuario = String(usuario?.dni || usuario?.id || "").trim();

      if (!dniUsuario || dniUsuario.length < 8) {
        alert("El usuario de la sesión debe tener un DNI numérico válido de al menos 8 dígitos.");
        return;
      }

      await crearTicket({
        title: asunto,
        description: descripcion,
        estado: 1,
        prioridad: 1,
        categoria: 1,
        usuario: dniUsuario,
      });

      setAsunto("");
      setDescripcion("");
      await cargarTickets();
    } catch (err: any) {
      alert(err.message || "Error al crear el ticket");
    }
  };

  const ticketsActivos = tickets.filter((t) => {
    const estadoId = Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;
    return estadoId !== 4;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Encabezado */}
      <header className="border-b pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Panel de Solicitante</h1>
          <p className="text-sm text-gray-500">
            Reportá incidencias y seguí el avance de tus tickets | Usuario:{" "}
            <strong className="text-gray-700 capitalize">{usuario?.name || "Usuario"}</strong>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition active:scale-95"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Formulario */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Crear Nuevo Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Asunto</label>
            <input
              type="text"
              required
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Falla de red en oficina 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
            <textarea
              required
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describí los detalles de la falla..."
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Enviar Ticket
          </button>
        </form>
      </section>

      {/* Listado de Tickets Activos */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Mis Tickets Activos</h2>
        {loading ? (
          <p className="text-gray-500">Cargando tickets...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : ticketsActivos.length === 0 ? (
          <p className="text-gray-500">No hay tickets activos en este momento.</p>
        ) : (
          <div className="grid gap-4">
            {ticketsActivos.map((t) => {
              const estadoId =
                Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;
              const estadoInfo = MAPA_ESTADOS[estadoId] || {
                label: `Estado ${estadoId}`,
                color: "bg-gray-100 text-gray-800",
              };

              return (
                <div key={t.id} className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{t.asunto || t.title}</h3>
                    <p className="text-sm text-gray-600">{t.descripcion || t.description}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${estadoInfo.color}`}>
                    {estadoInfo.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboardPage;