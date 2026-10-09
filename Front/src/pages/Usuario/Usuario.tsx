import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { TicketDashboardView, TicketItem } from "../../components/tickets/TicketDashboardView";
import { api } from "../../services/api";
import { crearTicket } from "../../services/TicketServices/CrearTicket";

export const UserDashboardPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [cargando, setCargando] = useState(true);

  // Parámetros dinámicos de la empresa
  const [categorias, setCategorias] = useState<{ id: number | string; nombre: string }[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");
  const [estadoInicialId, setEstadoInicialId] = useState<number | null>(null);
  const [prioridadInicialId, setPrioridadInicialId] = useState<number | null>(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [creando, setCreando] = useState(false);

  const usuarioRaw = sessionStorage.getItem("user") || sessionStorage.getItem("usuario");
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
      if (!res.ok) {
        setTickets([]);
        return;
      }
      const json = await res.json();
      const lista: TicketItem[] = json?.data || (Array.isArray(json) ? json : []);
      setTickets(lista);
    } catch (err) {
      console.error("Error al cargar tickets:", err);
      setTickets([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTickets();

    const cargarParametrosEmpresa = async () => {
      try {
        const [resCat, resEst, resPrio] = await Promise.allSettled([
          api("/categorias").catch(() => api("/categoria")),
          api("/estados").catch(() => api("/estado")),
          api("/prioridad").catch(() => api("/prioridad")),
        ]);

        // 1. Categorías de la empresa
        if (resCat.status === "fulfilled" && resCat.value.ok) {
          const jsonCat = await resCat.value.json();
          const listaCat = jsonCat?.data || (Array.isArray(jsonCat) ? jsonCat : []);
          setCategorias(listaCat);
          if (listaCat.length > 0) {
            setCategoriaSeleccionada(String(listaCat[0].id));
          }
        }

        // 2. Estado inicial por flag booleano (es_estado_inicial = 1 / true)
        if (resEst.status === "fulfilled" && resEst.value.ok) {
          const jsonEst = await resEst.value.json();
          const listaEst: any[] = jsonEst?.data || (Array.isArray(jsonEst) ? jsonEst : []);
          if (listaEst.length > 0) {
            const inicial = listaEst.find(
              (e) => e.es_estado_inicial === true || e.es_estado_inicial === 1
            ) || listaEst[0];
            setEstadoInicialId(Number(inicial.id));
          }
        }

        // 3. Prioridad baja dentro de la empresa
        if (resPrio.status === "fulfilled" && resPrio.value.ok) {
          const jsonPrio = await resPrio.value.json();
          const listaPrio: any[] = jsonPrio?.data || (Array.isArray(jsonPrio) ? jsonPrio : []);
          if (listaPrio.length > 0) {
            const baja = listaPrio.find((p) => {
              const n = (p.nombre || "").trim().toLowerCase();
              return n.includes("baja") || n.includes("bajo");
            }) || listaPrio[0];
            setPrioridadInicialId(Number(baja.id));
          }
        }
      } catch (err) {
        console.error("Error al cargar configuración de la empresa:", err);
      }
    };

    cargarParametrosEmpresa();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreando(true);
      const dniUsuario = String(usuario?.dni || usuario?.id || "").trim();

      if (!dniUsuario || dniUsuario.length < 8) {
        alert("El usuario debe tener un DNI numérico válido de al menos 8 dígitos.");
        return;
      }

      if (!categoriaSeleccionada) {
        alert("Por favor seleccioná una categoría para el ticket.");
        return;
      }

      if (!estadoInicialId || !prioridadInicialId) {
        alert("No se pudieron determinar el estado o la prioridad inicial de la empresa.");
        return;
      }

      await crearTicket({
        title: asunto,
        description: descripcion,
        estado: estadoInicialId,
        prioridad: prioridadInicialId,
        categoria: Number(categoriaSeleccionada),
        usuario: dniUsuario,
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Centro de Asistencia</h1>
          <p className="text-sm text-slate-500">
            Reportá incidentes técnicos y hacé el seguimiento de tus solicitudes
          </p>
        </div>

        <div className="w-full">
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="w-full py-3.5 px-6 bg-white hover:bg-slate-50 border-2 border-dashed border-blue-300 hover:border-blue-500 text-blue-600 rounded-2xl font-semibold text-sm transition-all shadow-sm flex items-center justify-between"
          >
            <span>{mostrarForm ? "Ocultar formulario de ticket" : "+ Reportar nuevo problema o incidencia"}</span>
            <span className="text-xs bg-blue-50 px-3 py-1 rounded-full">
              {mostrarForm ? "Cerrar" : "Crear ticket"}
            </span>
          </button>
        </div>

        {mostrarForm && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Generar Solicitud de Soporte</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Título del problema</label>
                <input
                  type="text"
                  required
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  placeholder="Ej: Falla al encender equipo o conexión de red"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Categoría del Incidente</label>
                <select
                  required
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-700"
                >
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Descripción detallada</label>
                <textarea
                  required
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describí los detalles de la falla que estás experimentando..."
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
                  {creando ? "Enviando..." : "Enviar Solicitud"}
                </button>
              </div>
            </form>
          </div>
        )}

        <TicketDashboardView
          tickets={tickets}
          cargando={cargando}
          onRefresh={cargarTickets}
          mostrarAccionesEstado={false}
          mostrarMetricas={false}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;