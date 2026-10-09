import React from "react";

interface PaginationProps {
  cantidad: number;
  cantidadVisible: number;
  paginaActual: number;
  totalPaginas: number;
  onAnterior: () => void;
  onSiguiente: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  cantidad,
  cantidadVisible,
  paginaActual,
  totalPaginas,
  onAnterior,
  onSiguiente,
}) => (
  <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-600">
    <span>
      Mostrando {cantidadVisible} de {cantidad}
    </span>
    <div className="flex items-center gap-2">
      <button
        disabled={paginaActual === 1}
        onClick={onAnterior}
        className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
      >
        Anterior
      </button>
      <span className="font-semibold text-slate-800">
        {paginaActual} / {totalPaginas}
      </span>
      <button
        disabled={paginaActual === totalPaginas}
        onClick={onSiguiente}
        className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
      >
        Siguiente
      </button>
    </div>
  </div>
);
