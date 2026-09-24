import React, { useEffect, useState } from "react";
import { crearTicket } from "../../services/TicketServices/CrearTicket";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";

interface Ticket {
  id: string | number;
  asunto?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  estado?: { nombre: string } | string;
  createdAt?: string;
}

export const UserDashboardPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const cargarTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await obtenerTickets();
      setTickets(res.data || res || []);
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
      await crearTicket({
        asunto,
        descripcion,
        categoria: 1,
        prioridad: 1,
      });
      setAsunto("");
      setDescripcion("");
      await cargarTickets();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Panel de Solicitante</h1>
        <p className="text-sm text-gray-500">Reportá incidencias y seguí el avance de tus tickets</p>
      </header>

      {/* Formulario de Nuevo Ticket */}
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

      {/* Listado de Tickets */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Mis Tickets</h2>
        {loading ? (
          <p className="text-gray-500">Cargando tickets...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500">No hay tickets registrados todavía.</p>
        ) : (
          <div className="grid gap-4">
            {tickets.map((t) => (
              <div key={t.id} className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{t.asunto || t.title}</h3>
                  <p className="text-sm text-gray-600">{t.descripcion || t.description}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                  {typeof t.estado === "object" ? t.estado?.nombre : t.estado || "Abierto"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};