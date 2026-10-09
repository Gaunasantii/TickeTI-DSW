import React from "react";
import type { EstadoItem } from "../../../../types/tickets";

interface TicketMetricsProps {
  estados: EstadoItem[];
  metricasPorEstado: Record<string, number>;
}

export const TicketMetrics: React.FC<TicketMetricsProps> = ({
  estados,
  metricasPorEstado,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {estados.map((est) => (
      <div key={est.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <p className="text-xs font-semibold text-slate-400 uppercase truncate">{est.nombre}</p>
        <p className="text-2xl font-bold text-slate-800 mt-1">
          {metricasPorEstado[String(est.id)] || 0}
        </p>
      </div>
    ))}
  </div>
);
