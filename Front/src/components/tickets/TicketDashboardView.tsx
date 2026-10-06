import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";

export interface EstadoItem {
  id: number | string;
  nombre: string;
  descripcion?: string;
}

export interface TicketItem {
  id: string | number;
  asunto?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  fechaCreacion?: string | Date;
  fecha_creacion?: string | Date;
  createdAt?: string | Date;
  fechaCierre?: string | Date | null;
  fecha_cierre?: string | Date | null;
  estado?: { id?: number | string; nombre: string } | number | string;
  prioridad?: { id?: number | string; nombre: string } | number | string;
  categoria?: { id?: number | string; nombre: string } | number | string;
  usuario?: { nombre?: string; dni?: string } | string;
  usuarioDni?: string;
}

interface TicketDashboardViewProps {
  tickets: TicketItem[];
  cargando: boolean;
  onRefresh: () => void;
  onCambiarEstado?: (ticketId: string | number, nuevoEstadoId: number | string) => Promise<void>;
  mostrarAccionesEstado?: boolean;
  mostrarMetricas?: boolean;
}

const MAPA_PRIORIDADES: Record<string, { label: string; color: string }> = {
  "1": { label: "Baja", color: "bg-slate-100 text-slate-700" },
  "2": { label: "Media", color: "bg-sky-100 text-sky-700" },
  "3": { label: "Alta", color: "bg-orange-100 text-orange-700" },
  "4": { label: "Crítica", color: "bg-rose-100 text-rose-700" },
};

export const TicketDashboardView: React.FC<TicketDashboardViewProps> = ({
  tickets,
  cargando,
  onRefresh,
  onCambiarEstado,
  mostrarAccionesEstado = false,
  mostrarMetricas = true,
}) => {
  const [estadosEmpresa, setEstadosEmpresa] = useState<EstadoItem[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>("todas");
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  // Cargar estados correspondientes a la empresa activa
  useEffect(() => {
    const cargarEstados = async () => {
      try {
        const res = await api("/estados").catch(() => api("/estado"));
        if (!res.ok) return;
        const json = await res.json();
        const lista: EstadoItem[] = json?.data || (Array.isArray(json) ? json : []);
        setEstadosEmpresa(lista);
      } catch (err) {
        console.error("Error al cargar estados de la empresa:", err);
      }
    };
    cargarEstados();
  }, []);

  const getId = (val: any): string => {
    if (!val) return "";
    if (typeof val === "object") return String(val.id ?? "");
    return String(val);
  };

  const getNombreEstado = (val: any): string => {
    if (!val) return "Sin Estado";
    if (typeof val === "object" && val.nombre) return val.nombre;
    const encontrado = estadosEmpresa.find((e) => String(e.id) === String(val));
    return encontrado ? encontrado.nombre : `Estado #${val}`;
  };

  const getBadgeEstado = (nombre: string) => {
    const n = nombre.toLowerCase();
    if (n.includes("abierto") || n.includes("nuevo")) {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    if (n.includes("progreso") || n.includes("curso") || n.includes("proceso")) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (n.includes("resuelto") || n.includes("solucion")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (n.includes("cerrado") || n.includes("cancel")) {
      return "bg-slate-100 text-slate-700 border-slate-300";
    }
    return "bg-purple-50 text-purple-700 border-purple-200";
  };

  const formatearFecha = (fechaRaw?: string | Date | null) => {
    if (!fechaRaw) return null;
    try {
      const d = new Date(fechaRaw);
      return isNaN(d.getTime())
        ? null
        : d.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
    } catch {
      return null;
    }
  };

  // Conteo dinámico de métricas según los estados de la empresa
  const metricasPorEstado = useMemo(() => {
    const conteo: Record<string, number> = {};
    estadosEmpresa.forEach((est) => {
      conteo[String(est.id)] = 0;
    });

    tickets.forEach((t) => {
      const eId = getId(t.estado);
      if (conteo[eId] !== undefined) {
        conteo[eId]++;
      }
    });

    return conteo;
  }, [tickets, estadosEmpresa]);

  const ticketsFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    return tickets
      .slice()
      .sort((a, b) => Number(b.id) - Number(a.id))
      .filter((t) => {
        const eId = getId(t.estado);
        const pId = getId(t.prioridad);

        if (filtroEstado !== "todos" && eId !== filtroEstado) {
          return false;
        }
        if (filtroPrioridad !== "todas" && pId !== filtroPrioridad) {
          return false;
        }

        if (q) {
          const tit = (t.asunto || t.title || "").toLowerCase();
          const desc = (t.descripcion || t.description || "").toLowerCase();
          const dni = String(
            (typeof t.usuario === "object" && t.usuario ? t.usuario.dni : t.usuarioDni || t.usuario) || ""
          ).toLowerCase();
          return tit.includes(q) || desc.includes(q) || dni.includes(q) || String(t.id).includes(q);
        }
        return true;
      });
  }, [tickets, busqueda, filtroEstado, filtroPrioridad]);

  const totalPaginas = Math.ceil(ticketsFiltrados.length / itemsPorPagina) || 1;
  const ticketsPaginados = ticketsFiltrados.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  return (
    <div className="space-y-6">
      {/* 1. Métricas Dinámicas según Estados de la Empresa */}
      {mostrarMetricas && estadosEmpresa.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {estadosEmpresa.slice(0, 4).map((est) => (
            <div key={est.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase truncate">{est.nombre}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">
                {metricasPorEstado[String(est.id)] || 0}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 2. Barra de Filtros */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          placeholder="Buscar por ID, título, descripción o DNI..."
          className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
        />

        <div className="flex gap-2">
          {/* Selector dinámico de Estados */}
          <select
            value={filtroEstado}
            onChange={(e) => {
              setFiltroEstado(e.target.value);
              setPaginaActual(1);
            }}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
          >
            <option value="todos">Todos los estados</option>
            {estadosEmpresa.map((est) => (
              <option key={est.id} value={String(est.id)}>
                {est.nombre}
              </option>
            ))}
          </select>

          {/* Selector de Prioridades */}
          <select
            value={filtroPrioridad}
            onChange={(e) => {
              setFiltroPrioridad(e.target.value);
              setPaginaActual(1);
            }}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
          >
            <option value="todas">Todas las prioridades</option>
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
            <option value="4">Crítica</option>
          </select>

          <button
            onClick={onRefresh}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
          >
            Refrescar
          </button>
        </div>
      </div>

      {/* 3. Lista de Tickets */}
      <div className="space-y-3">
        {cargando ? (
          <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">Cargando tickets...</p>
          </div>
        ) : ticketsPaginados.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No hay tickets registrados con estos filtros.</p>
          </div>
        ) : (
          ticketsPaginados.map((t) => {
            const eId = getId(t.estado);
            const pId = getId(t.prioridad);
            const nombreEstado = getNombreEstado(t.estado);
            const badgeEstado = getBadgeEstado(nombreEstado);
            const pri = MAPA_PRIORIDADES[pId] || { label: `Prioridad ${pId}`, color: "bg-slate-100 text-slate-700" };

            const catNombre =
              typeof t.categoria === "object" && t.categoria !== null
                ? t.categoria.nombre
                : typeof t.categoria === "string"
                ? t.categoria
                : null;

            const fechaAlta = formatearFecha(t.fechaCreacion || t.fecha_creacion || t.createdAt);
            const fechaFin = formatearFecha(t.fechaCierre || t.fecha_cierre);

            const dni =
              typeof t.usuario === "object" && t.usuario !== null
                ? t.usuario.dni
                : t.usuarioDni || t.usuario || "N/A";

            return (
              <div
                key={t.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      #{t.id}
                    </span>
                    <h3 className="font-semibold text-slate-800 text-sm">{t.asunto || t.title}</h3>

                    {catNombre && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {catNombre}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">{t.descripcion || t.description}</p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-medium border ${badgeEstado}`}>
                      {nombreEstado}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-medium ${pri.color}`}>
                      {pri.label}
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-600">
                      Solicitante: <strong className="font-mono text-slate-800">{dni}</strong>
                    </span>

                    {fechaAlta && (
                      <>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-500">
                          Creado: <strong className="font-normal text-slate-700">{fechaAlta}</strong>
                        </span>
                      </>
                    )}

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

                {/* Botones dinámicos de cambio de estado */}
                {mostrarAccionesEstado && onCambiarEstado && estadosEmpresa.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {estadosEmpresa.map((est) => {
                      const esActual = String(est.id) === eId;
                      return (
                        <button
                          key={est.id}
                          type="button"
                          disabled={esActual}
                          onClick={() => onCambiarEstado(t.id, est.id)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition ${
                            esActual
                              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {est.nombre} {esActual && "✓"}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. Paginación */}
      {ticketsFiltrados.length > itemsPorPagina && (
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-600">
          <span>
            Mostrando {ticketsPaginados.length} de {ticketsFiltrados.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              Anterior
            </button>
            <span className="font-semibold text-slate-800">
              {paginaActual} / {totalPaginas}
            </span>
            <button
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
              className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDashboardView;