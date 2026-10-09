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
  <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3">

    <div className="flex gap-2">
      <select
        value={filtros.estado}
        onChange={(e) => onFiltroChange({ ...filtros, estado: e.target.value ? Number(e.target.value) : undefined })}
        className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
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
        className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
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
        className="px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
      >
        Refrescar
      </button>
    </div>
  </div>
);
