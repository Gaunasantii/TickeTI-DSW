import React, { useMemo, useState } from "react";

export interface TicketItem {
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
  categoria?: { nombre: string } | number | string;
  usuario?: { nombre?: string; dni?: string } | string;
  usuarioDni?: string;
  usuario_dni?: string;
}

interface TicketDashboardViewProps {
  tickets: TicketItem[];
  cargando: boolean;
  onRefresh: () => void;
  onCambiarEstado?: (ticketId: string | number, nuevoEstadoId: number) => Promise<void>;
  mostrarAccionesEstado?: boolean;
  mostrarMetricas?: boolean;
}

const MAPA_ESTADOS: Record<number, { label: string; bgBadge: string }> = {
  1: { label: "Abierto", bgBadge: "bg-blue-50 text-blue-700 border-blue-200" },
  2: { label: "En Progreso", bgBadge: "bg-amber-50 text-amber-700 border-amber-200" },
  3: { label: "Resuelto", bgBadge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  4: { label: "Cerrado", bgBadge: "bg-slate-100 text-slate-700 border-slate-200" },
};

const MAPA_PRIORIDADES: Record<number, { label: string; color: string }> = {
  1: { label: "Baja", color: "bg-gray-100 text-gray-700" },
  2: { label: "Media", color: "bg-sky-100 text-sky-700" },
  3: { label: "Alta", color: "bg-orange-100 text-orange-700" },
  4: { label: "Crítica", color: "bg-rose-100 text-rose-700" },
};

export const TicketDashboardView: React.FC<TicketDashboardViewProps> = ({
  tickets,
  cargando,
  onRefresh,
  onCambiarEstado,
  mostrarAccionesEstado = false,
  mostrarMetricas = true,
}) => {
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("activos");
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>("todas");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");

  const [paginaActual, setPaginaActual] = useState(1);
  const ticketsPorPagina = 10;

  const metricas = useMemo(() => {
    let abiertos = 0;
    let enProgreso = 0;
    let resueltos = 0;
    let cerrados = 0;

    tickets.forEach((t) => {
      const eId = Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;
      if (eId === 1) abiertos++;
      else if (eId === 2) enProgreso++;
      else if (eId === 3) resueltos++;
      else if (eId === 4) cerrados++;
    });

    return {
      abiertos,
      enProgreso,
      activos: abiertos + enProgreso,
      resueltos,
      cerrados,
      total: tickets.length,
    };
  }, [tickets]);

  const ticketsFiltrados = useMemo(() => {
    return tickets
      .slice()
      .sort((a, b) => Number(b.id) - Number(a.id))
      .filter((t) => {
        const eId = Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;
        const pId = Number(t.prioridadId ?? (typeof t.prioridad === "object" ? (t.prioridad as any)?.id : t.prioridad)) || 1;
        const cId = Number(t.categoriaId ?? (typeof t.categoria === "object" ? (t.categoria as any)?.id : t.categoria)) || 1;

        if (filtroEstado === "activos" && eId === 4) return false;
        if (filtroEstado !== "todos" && filtroEstado !== "activos" && eId !== Number(filtroEstado)) {
          return false;
        }

        if (filtroPrioridad !== "todas" && pId !== Number(filtroPrioridad)) {
          return false;
        }

        if (filtroCategoria !== "todas" && cId !== Number(filtroCategoria)) {
          return false;
        }

        if (filtroTexto.trim() !== "") {
          const q = filtroTexto.toLowerCase();
          const coincideId = String(t.id).includes(q);
          const coincideTitulo = (t.asunto || t.title || "").toLowerCase().includes(q);
          const coincideDesc = (t.descripcion || t.description || "").toLowerCase().includes(q);
          const coincideDni = String(t.usuarioDni || t.usuario_dni || t.usuario || "").toLowerCase().includes(q);

          if (!coincideId && !coincideTitulo && !coincideDesc && !coincideDni) {
            return false;
          }
        }

        return true;
      });
  }, [tickets, filtroEstado, filtroPrioridad, filtroCategoria, filtroTexto]);

  const totalPaginas = Math.ceil(ticketsFiltrados.length / ticketsPorPagina) || 1;
  const ticketsPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * ticketsPorPagina;
    return ticketsFiltrados.slice(inicio, inicio + ticketsPorPagina);
  }, [ticketsFiltrados, paginaActual, ticketsPorPagina]);

  const resetFilters = () => {
    setFiltroTexto("");
    setFiltroEstado("activos");
    setFiltroPrioridad("todas");
    setFiltroCategoria("todas");
    setPaginaActual(1);
  };

  return (
    <div className="space-y-6">
      {/* 1. Métricas Superiores (Condicional) */}
      {mostrarMetricas && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Abiertos</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-1">{metricas.abiertos}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">En Progreso</p>
            <p className="text-3xl font-extrabold text-amber-500 mt-1">{metricas.enProgreso}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Resueltos</p>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">{metricas.resueltos}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cerrados</p>
            <p className="text-3xl font-extrabold text-slate-600 mt-1">{metricas.cerrados}</p>
          </div>
        </div>
      )}

      {/* 2. Barra de Filtros */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-2">
            <input
              type="text"
              value={filtroTexto}
              onChange={(e) => {
                setFiltroTexto(e.target.value);
                setPaginaActual(1);
              }}
              placeholder="Buscar por ID, título o DNI..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <select
              value={filtroEstado}
              onChange={(e) => {
                setFiltroEstado(e.target.value);
                setPaginaActual(1);
              }}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium text-slate-700"
            >
              <option value="activos">Activos (Sin Cerrados)</option>
              <option value="todos">Todos los Estados</option>
              <option value="1">Solo Abiertos</option>
              <option value="2">Solo En Progreso</option>
              <option value="3">Solo Resueltos</option>
              <option value="4">Solo Cerrados</option>
            </select>
          </div>

          <div>
            <select
              value={filtroPrioridad}
              onChange={(e) => {
                setFiltroPrioridad(e.target.value);
                setPaginaActual(1);
              }}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium text-slate-700"
            >
              <option value="todas">Todas las Prioridades</option>
              <option value="1">Baja</option>
              <option value="2">Media</option>
              <option value="3">Alta</option>
              <option value="4">Crítica</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetFilters}
              className="flex-1 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Limpiar
            </button>
            <button
              onClick={onRefresh}
              className="px-4 py-2 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition"
            >
              Refrescar
            </button>
          </div>
        </div>
      </div>

      {/* 3. Listado de Tickets */}
      <div className="space-y-3">
        {cargando ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">Cargando tickets...</p>
          </div>
        ) : ticketsPaginados.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No se encontraron tickets con los filtros aplicados.</p>
            <button
              onClick={resetFilters}
              className="mt-3 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          ticketsPaginados.map((t) => {
            const eId = Number(t.estadoId ?? (typeof t.estado === "object" ? t.estado?.id : t.estado)) || 1;
            const pId = Number(t.prioridadId ?? (typeof t.prioridad === "object" ? (t.prioridad as any)?.id : t.prioridad)) || 1;

            const estadoInfo = MAPA_ESTADOS[eId] || {
              label: `Estado ${eId}`,
              bgBadge: "bg-slate-100 text-slate-700 border-slate-200",
            };

            const prioridadInfo = MAPA_PRIORIDADES[pId] || {
              label: `Prioridad ${pId}`,
              color: "bg-slate-100 text-slate-700",
            };

            const solicitanteDni =
              t.usuarioDni ||
              t.usuario_dni ||
              (typeof t.usuario === "object" ? t.usuario?.dni || t.usuario?.nombre : t.usuario) ||
              "N/A";

            return (
              <div
                key={t.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      #{t.id}
                    </span>
                    <h3 className="text-base font-semibold text-slate-800 tracking-tight">
                      {t.asunto || t.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-500 line-clamp-2">
                    {t.descripcion || t.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full font-medium border ${estadoInfo.bgBadge}`}>
                      {estadoInfo.label}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full font-medium ${prioridadInfo.color}`}>
                      {prioridadInfo.label}
                    </span>

                    <span className="text-slate-400">|</span>

                    <span className="text-slate-600 font-medium">
                      Solicitante DNI: <strong className="font-mono text-slate-800">{solicitanteDni}</strong>
                    </span>
                  </div>
                </div>

                {mostrarAccionesEstado && onCambiarEstado && (
                  <div className="flex items-center gap-1.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      type="button"
                      disabled={Number(eId) === 1}
                      onClick={() => onCambiarEstado(t.id, 1)}
                      className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {Number(eId) === 1 ? "Abierto ✓" : "Abierto"}
                    </button>
                    <button
                      type="button"
                      disabled={Number(eId) === 2}
                      onClick={() => onCambiarEstado(t.id, 2)}
                      className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-lg border border-amber-200 hover:bg-amber-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {Number(eId) === 2 ? "En progreso ✓" : "En progreso"}
                    </button>
                    <button
                      type="button"
                      disabled={Number(eId) === 3}
                      onClick={() => onCambiarEstado(t.id, 3)}
                      className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {Number(eId) === 3 ? "Resuelto ✓" : "Resolver"}
                    </button>
                    <button
                      type="button"
                      disabled={Number(eId) === 4}
                      onClick={() => onCambiarEstado(t.id, 4)}
                      className="px-2.5 py-1 text-xs font-medium bg-slate-800 text-white rounded-lg hover:bg-black transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Cerrar
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. Paginador */}
      {ticketsFiltrados.length > ticketsPorPagina && (
        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-sm text-xs font-medium text-slate-600">
          <span>
            Mostrando {ticketsPaginados.length} de {ticketsFiltrados.length} tickets
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span className="px-2 font-semibold text-slate-800">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
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