import React from "react";
import type{asignacionModel} from "../../../models/asignacion.model";

import AsignacionCard from "./AsignacionCard";
import { estadoModel } from "../../../models/estado.model";
import { CategoriaModel } from "../../../models/categoria.model";

interface AsignacionListProps {
    asignaciones: asignacionModel[];
    estados: estadoModel[];
    categorias: CategoriaModel[];
    cargando: boolean;
    onAbandonar?: (asignacionId: string | number) => Promise<void>;
    onResolver?: (asignacionId: string | number, solucion: string) => Promise<void>;
    onChangeCategoriaTicket: (ticketId: string | number, nuevaCategoria: string) => Promise<void>;
}

const AsignacionList: React.FC<AsignacionListProps> = ({ asignaciones, onAbandonar, onResolver, onChangeCategoriaTicket, estados, categorias, cargando}) => {
    return (
        <div className="space-y-3">
            {cargando ? (
              <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500 text-sm">Cargando asignaciones...</p>
              </div>
            ) : asignaciones.length === 0 ? (
              <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500 text-sm">No tienes asignaciones pendientes</p>
              </div>
            ) : (
              asignaciones.map((asignacion) => (
                <AsignacionCard
                  key={asignacion.id}
                  estados={estados}
                  categorias={categorias}
                  asignacion={asignacion}
                  onEliminar={onAbandonar}
                  onResolver={onResolver}
                  onCambiarCategoria={onChangeCategoriaTicket}
                />
              ))
            )}
            </div>
    );
};

export default AsignacionList;