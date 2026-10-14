import React, { useState } from "react";
import type { EstadoItem } from "../../../../types/tickets";
import type { ticketPaginatedModel } from "../../../../models/ticket.model";
import { useAuth } from "../../../../context/AuthContext";
import { crearAsignacion } from "../../../../services/AsignacionServices/CrearAsignacion";


interface TicketCardProps {
  ticket: ticketPaginatedModel;
  estadosEmpresa: EstadoItem[];
  categoriasEmpresa: { id: string | number; nombre: string }[];
  prioridadesEmpresa: { id: string | number; nombre: string }[];
  onCambiarCategoria?: (ticketId: string | number, nuevaCategoriaId: number | string) => Promise<void>;
  onCambiarPrioridad?: (ticketId: string | number, nuevaPrioridadId: number | string) => Promise<void>;
  onCambiarEstado?: (ticketId: string | number, nuevoEstadoId: number | string) => Promise<void>;
  onTomarTicket?: (id: string | number) => Promise<void>;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket: t,
  onCambiarCategoria,
  onCambiarPrioridad,
  onCambiarEstado,
  categoriasEmpresa,
  prioridadesEmpresa,
  estadosEmpresa,
}) => {
  const [desplegableActivo, setDesplegableActivo] = useState<'categoria' | 'prioridad' | 'estado' | null>(null);
  const [cargando, setCargando] = useState(false);
  const { isAdmin, isTecnico,usuario } = useAuth();

  const catNombre=t.categoria instanceof Object ? t.categoria.nombre : t.categoria;
  const estadoNombre=t.estado instanceof Object ? t.estado.nombre : t.estado;
  const prioridadNombre=t.prioridad instanceof Object ? t.prioridad.nombre : t.prioridad;

  const handleSeleccionar = (e: React.ChangeEvent<HTMLSelectElement>, tipo: 'categoria' | 'prioridad' | 'estado') => {
    const valor = e.target.value;
    switch (tipo) {
      case 'categoria':
        onCambiarCategoria?.(t.id, valor);
        break;
      case 'prioridad':
        onCambiarPrioridad?.(t.id, valor);
        break;
      case 'estado':
        onCambiarEstado?.(t.id, valor);
        break;
    }
    setDesplegableActivo(null);
  };

  const obtenerOpciones = () => {
    switch (desplegableActivo) {
      case 'categoria':
        return categoriasEmpresa;
      case 'prioridad':
        return prioridadesEmpresa;
      case 'estado':
        return estadosEmpresa;
      default:
        return [];
    }
  };

  const handleTomarTicket = async (id: string | number) => {

    setCargando(true);

    try {
    await crearAsignacion({
      ticket: Number(id),
    });
    } catch (error: any) {
      console.error("Error al tomar el ticket:", error);
      alert(error?.message || "Ocurrió un error al intentar tomar el ticket.");
    } finally {
      setCargando(false);
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
            {estadoNombre}
          </span>
          <span className="px-2 py-0.5 rounded-full font-medium border bg-slate-50 text-slate-700">
            {prioridadNombre}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600">
            Solicitante: <strong className="font-mono text-slate-800">{t.usuario}</strong>
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">
            Creado: <strong className="font-normal text-slate-700">{t.fechaCreacion}</strong>
          </span>
          {t.fechaCierre && (
            <>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-600">
                Cerrado: <strong className="font-medium text-emerald-700">{t.fechaCierre}</strong>
              </span>
            </>
          )}
          {t.solucion && (
            <>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">
                Solución: <strong className="font-normal text-slate-700">{t.solucion}</strong>
              </span>
            </>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          {onCambiarCategoria && (isAdmin) && (
            <button 
              type="button"
              onClick={() => setDesplegableActivo("categoria")}
              className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 rounded-xl transition shadow-xs"
            >
              Cambiar categoría
            </button>
          )}

          {onCambiarPrioridad && isAdmin && (
            <button 
              type="button"
              onClick={() => setDesplegableActivo("prioridad")}
              className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-xl transition shadow-xs"
            >
              Cambiar prioridad
            </button>
          )}

          {onCambiarEstado && isAdmin && (
            <button 
              type="button"
              onClick={() => setDesplegableActivo("estado")}
              className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-xl transition shadow-xs"
            >
              Cambiar estado
            </button>
          )}
        </div>
        {desplegableActivo && (
          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
            <span className="text-xs font-semibold text-slate-600 capitalize">
              Seleccionar nueva {desplegableActivo}:
            </span>

            <select
              disabled={cargando}
              defaultValue=""
              onChange={(e) => handleSeleccionar(e, desplegableActivo)}
              className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 disabled:opacity-50 cursor-pointer"
            >
              <option value="" disabled>
                -- Seleccionar opción --
              </option>
              {obtenerOpciones().map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select>

            {cargando && (
              <span className="text-xs text-blue-600 font-medium animate-pulse">
                Guardando cambios...
              </span>
            )}

            <button
              type="button"
              onClick={() => setDesplegableActivo(null)}
              className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-0.5 rounded hover:bg-slate-200 transition"
              title="Cerrar"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      
      {isTecnico && !t.estaTomado&& (
        <div className="flex items-center justify-end">
          <button
            onClick={() => handleTomarTicket(t.id)}
            disabled={cargando}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {cargando ? "Tomando..." : "Tomar Ticket"}
          </button>
        </div>
      )}
    </div>
  );
};