import React from "react";
import type { EstadoItem } from "../../../../types/tickets";
import type { CategoriaModel } from "../../../../models/categoria.model";
import type { IObtenerTicketsParams } from "../../../../interfaces/IObtenerTickets.params";

interface TicketFiltersProps {
  filtros:{
    categoria: number|undefined;
    estado: number|undefined;
  }
  estadosEmpresa: EstadoItem[];
  categorias: CategoriaModel[];
  onFiltroChange: (filtros: { categoria: number|undefined; estado: number|undefined }) => void;
  onRefresh: (params: Partial<IObtenerTicketsParams>) => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({
  filtros,
  estadosEmpresa,
  categorias,
  onFiltroChange,
  onRefresh,
}) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4 lg:p-5">

    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center md:flex-nowrap">
      <select
        value={filtros.estado}
        onChange={(e) => onFiltroChange({ ...filtros, estado: e.target.value ? Number(e.target.value) : undefined })}
        className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 sm:min-w-[12rem] sm:flex-1 sm:py-2"
      >
        <option value={undefined}>Todos los estados</option>
        {estadosEmpresa.map((est) => (
          <option key={est.id} value={String(est.id)}>
            {est.nombre}
          </option>
        ))}
      </select>

      <select
        value={filtros.categoria}
        onChange={(e) => onFiltroChange({ ...filtros, categoria: e.target.value ? Number(e.target.value) : undefined  } )}
        className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 sm:min-w-[12rem] sm:flex-1 sm:py-2"
      >
        <option value={undefined}>Todas las categorías</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={String(cat.id)}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <button
        onClick={() => onRefresh(filtros)}
        className="w-full rounded-xl bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-700 transition sm:w-auto sm:py-2 lg:hover:bg-slate-200"
      >
        Refrescar
      </button>
    </div>
  </div>
);
