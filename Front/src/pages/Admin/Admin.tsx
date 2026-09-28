import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { obtenerTickets } from "../../services/TicketServices/ObtenerTickets";

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
  usuario?: { nombre?: string; dni?: string } | string;
  usuarioDni?: string;
  usuario_dni?: string;
}

const MAPA_ESTADOS: Record<number, { label: string; color: string }> = {
  1: { label: "Abierto", color: "bg-blue-100 text-blue-800" },
  2: { label: "En Progreso", color: "bg-amber-100 text-amber-800" },
  3: { label: "Resuelto", color: "bg-emerald-100 text-emerald-800" },
  4: { label: "Cerrado", color: "bg-gray-100 text-gray-800" },
};

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const res = await obtenerTickets();
      setTickets(res);
    } catch (err: any) {
      setError(err.message || "Error al cargar los tickets del sistema");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Filtramos los que no estén cerrados para el listado activo
  const ticketsActivos = tickets.filter((t) => {
    const estadoId = Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;
    return estadoId !== 4;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Encabezado */}
      <header className="border-b pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
          <p className="text-sm text-gray-500">
            Supervisión general | Administrador:{" "}
            <strong className="text-gray-700 capitalize">{usuario?.name || "Admin"}</strong>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition active:scale-95"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Accesos rápidos */}
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
          <h2 className="text-xl font-semibold text-gray-800">Tickets Activos del Sistema</h2>
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
        ) : ticketsActivos.length === 0 ? (
          <p className="text-gray-500">No hay tickets activos registrados en el sistema.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm font-semibold text-gray-600 bg-gray-50">
                  <th className="p-3">ID</th>
                  <th className="p-3">Asunto</th>
                  <th className="p-3">Solicitante (DNI)</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {ticketsActivos.map((t) => {
                  const estadoId =
                    Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;
                  const estadoInfo = MAPA_ESTADOS[estadoId] || {
                    label: `Estado ${estadoId}`,
                    color: "bg-gray-100 text-gray-800",
                  };

                  const solicitante =
                    t.usuarioDni ||
                    t.usuario_dni ||
                    (typeof t.usuario === "object" ? t.usuario?.dni || t.usuario?.nombre : t.usuario) ||
                    "-";

                  return (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">#{t.id}</td>
                      <td className="p-3 text-gray-700">{t.asunto || t.title}</td>
                      <td className="p-3 text-gray-600 font-mono text-xs">
                        {solicitante}
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${estadoInfo.color}`}>
                          {estadoInfo.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPage;