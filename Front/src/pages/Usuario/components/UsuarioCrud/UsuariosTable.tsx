import React from "react";
import type { UsuarioItem } from "../../../../types/usuarios";
import type { IModifyPersonRequest } from "../../../../requests/IModifyPersonRequest";
import { UsuarioRow } from "./UsuarioRow";
import { personaPaginatedModel } from "../../../../models/personPaginated.model";

interface UsuariosTableProps {
  usuarios: personaPaginatedModel[];
  cargando: boolean;
  filaExpandida: string | null;
  esAdmin: boolean;
  onToggle: (dni: string, abierta: boolean) => void;
  onEditar: (usuario: personaPaginatedModel) => void;
  onEliminar: (usuario: personaPaginatedModel) => void;
}

export const UsuariosTable: React.FC<UsuariosTableProps> = ({
  usuarios,
  cargando,
  filaExpandida,
  esAdmin,
  onToggle,
  onEditar,
  onEliminar,
}) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {cargando ? (
      <p className="p-4 text-center text-sm text-slate-500 sm:p-6 lg:p-8">Cargando...</p>
    ) : usuarios.length === 0 ? (
      <p className="p-4 text-center text-sm text-slate-500 sm:p-6 lg:p-8">No se encontraron usuarios.</p>
    ) : (
      <div>
        <div className="hidden grid-cols-12 border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-bold uppercase text-slate-500 md:grid lg:px-5">
          <div className="col-span-3">DNI</div>
          <div className="col-span-4">Nombre y Apellido</div>
          <div className="col-span-3">Oficina</div>
          <div className="col-span-2 text-right">Rol</div>
        </div>
        {usuarios.map((usuario) => (
          <UsuarioRow
            key={usuario.dni}
            usuario={usuario}
            abierta={filaExpandida === usuario.dni}
            nombreOficina={usuario.oficina}
            esAdmin={esAdmin}
            onToggle={onToggle}
            onEditar={onEditar}
            onEliminar={onEliminar}
          />
        ))}
      </div>
    )}
  </div>
);
