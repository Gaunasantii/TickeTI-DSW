import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { ICreateEmpresaRequest } from "../../requests/ICreateEmpresaRequest";
import { IModifyEmpresaRequest } from "../../requests/IModifyEmpresaRequest";

interface EmpresaFormProps {
  empresaAEditar: IModifyEmpresaRequest;
  empresaNueva: ICreateEmpresaRequest;
  onSubmitUpdate: (data: IModifyEmpresaRequest) => void;
  onSubmitCreate: (data: ICreateEmpresaRequest) => void;
  onCancel: () => void;
  onChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
}

export const EmpresaForm: React.FC<EmpresaFormProps> = ({
  empresaAEditar,
  empresaNueva,
  onSubmitUpdate,
  onSubmitCreate,
  onCancel,
  onChange,
}) => {

  const [guardando, setGuardando] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
      <h2 className="text-lg font-bold text-slate-800">
        {empresaAEditar ? "Modificar Empresa" : "Alta Empresa y Administrador (Opcional)"}
      </h2>

      <form onSubmit={!empresaAEditar.id?((e)=>{e.preventDefault(); onSubmitCreate(empresaNueva);}):((e)=>{e.preventDefault(); onSubmitUpdate(empresaAEditar);})} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase">
            Razón Social / Nombre
          </label>
          <input
            type="text"
            required
            name="nombre"
            value={!empresaAEditar.id?empresaNueva.nombre:empresaAEditar.nombre}
            onChange={onChange}
            placeholder="Ej: Stark Industries"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {!empresaAEditar.id ? "Asignar / Crear Nuevo Administrador" : "Administrador (Opcional)"}
            </span>
            <span className="text-xs text-slate-400">
              Podés dejarlo vacío si no deseás agregar uno ahora
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <input
              type="text"
              name="admin.dni"
              value={!empresaAEditar.id?empresaNueva.admin.dni:empresaAEditar.admin?.dni}
              onChange={onChange}
              placeholder="DNI Admin"
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="admin.tele"
              value={!empresaAEditar.id?empresaNueva.admin.tele:empresaAEditar.admin?.tele}
              onChange={onChange}
              placeholder="Teléfono"
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="admin.name"
              value={!empresaAEditar.id?empresaNueva.admin.name:empresaAEditar.admin?.name}
              onChange={onChange}
              placeholder="Nombre"
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="admin.surName"
              value={!empresaAEditar.id?empresaNueva.admin.surName:empresaAEditar.admin?.surName}
              onChange={onChange}
              placeholder="Apellido"
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="admin.pass"
              value={!empresaAEditar.id?empresaNueva.admin.pass:empresaAEditar.admin?.pass}
              onChange={onChange}
              placeholder="Contraseña del Admin"
              className="sm:col-span-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50"
          >
            {guardando ? "Guardando..." : empresaAEditar ? "Guardar Cambios" : "Registrar Empresa"}
          </button>
        </div>
      </form>
    </div>
  );
};