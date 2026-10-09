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
  onEliminar: (dni: string) => void;
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
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    {cargando ? (
      <p className="p-8 text-center text-slate-500 text-sm">Cargando...</p>
    ) : usuarios.length === 0 ? (
      <p className="p-8 text-center text-slate-500 text-sm">No se encontraron usuarios.</p>
    ) : (
      <div className="divide-y divide-slate-100">
        <div className="grid grid-cols-12 px-5 py-3 text-xs font-bold text-slate-500 uppercase bg-slate-50">
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
