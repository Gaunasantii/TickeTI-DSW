import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";

interface Ticket {
  id: string | number;
  asunto?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  estado?: { nombre: string } | string;
  prioridad?: { nombre: string } | string;
  usuario?: { nombre: string } | string;
}

export const AdminPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const res = await obtenerTickets();
      setTickets(res.data || res || []);
    } catch (err: any) {
      setError(err.message || "Error al cargar los tickets del sistema");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Encabezado */}
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
        <p className="text-sm text-gray-500">Supervisión general, gestión de recursos y tickets</p>
      </header>

      {/* Accesos rápidos a la gestión de entidades */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/usuarios"
          className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">Gestión de Usuarios</h3>
          <p className="text-sm text-gray-500 mt-1">Ver altas, técnicos y clientes registrados</p>
        </Link>
        <Link
          to="/empresas"
          className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">Gestión de Empresas</h3>
          <p className="text-sm text-gray-500 mt-1">Administración de clientes corporativos</p>
        </Link>
        <Link
          to="/Oficina"
          className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">Gestión de Oficinas</h3>
          <p className="text-sm text-gray-500 mt-1">Configuración de sedes y dependencias</p>
        </Link>
      </section>

      {/* Tabla general de tickets */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Todos los Tickets del Sistema</h2>
          <button
            onClick={cargarDatos}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
          >
            Refrescar
          </button>
        </div>

        {cargando ? (
          <p className="text-gray-500">Cargando tickets...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500">No hay tickets registrados en el sistema.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm font-semibold text-gray-600 bg-gray-50">
                  <th className="p-3">ID</th>
                  <th className="p-3">Asunto</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Prioridad</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">#{t.id}</td>
                    <td className="p-3 text-gray-700">{t.asunto || t.title}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {typeof t.estado === "object" ? t.estado?.nombre : t.estado || "Abierto"}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">
                      {typeof t.prioridad === "object" ? t.prioridad?.nombre : t.prioridad || "Normal"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPage;