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
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:space-y-5 sm:p-5 lg:p-6">
      <h2 className="break-words text-base font-bold text-slate-800 sm:text-lg">
        {empresaAEditar ? "Modificar Empresa" : "Alta Empresa y Administrador (Opcional)"}
      </h2>

      <form onSubmit={!empresaAEditar.id?((e)=>{e.preventDefault(); onSubmitCreate(empresaNueva);}):((e)=>{e.preventDefault(); onSubmitUpdate(empresaAEditar);})} className="space-y-4 sm:space-y-5">
        <div className="space-y-2">
          <label className="block text-[11px] font-bold uppercase text-slate-500 sm:text-xs">
            Razón Social / Nombre
          </label>
          <input
            type="text"
            required
            name="nombre"
            value={!empresaAEditar.id?empresaNueva.nombre:empresaAEditar.nombre}
            onChange={onChange}
            placeholder="Ej: Stark Industries"
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2.5"
          />
        </div>

        <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 sm:p-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <span className="text-[11px] font-bold uppercase text-slate-500 sm:text-xs">
              {!empresaAEditar.id ? "Asignar / Crear Nuevo Administrador" : "Administrador (Opcional)"}
            </span>
            <span className="text-xs text-slate-400 sm:max-w-sm sm:text-right">
              Podés dejarlo vacío si no deseás agregar uno ahora
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:gap-3">
            <input
              type="text"
              name="admin.dni"
              value={!empresaAEditar.id?empresaNueva.admin.dni:empresaAEditar.admin?.dni}
              onChange={onChange}
              placeholder="DNI Admin"
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2"
            />
            <input
              type="text"
              name="admin.tele"
              value={!empresaAEditar.id?empresaNueva.admin.tele:empresaAEditar.admin?.tele}
              onChange={onChange}
              placeholder="Teléfono"
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2"
            />
            <input
              type="text"
              name="admin.name"
              value={!empresaAEditar.id?empresaNueva.admin.name:empresaAEditar.admin?.name}
              onChange={onChange}
              placeholder="Nombre"
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2"
            />
            <input
              type="text"
              name="admin.surName"
              value={!empresaAEditar.id?empresaNueva.admin.surName:empresaAEditar.admin?.surName}
              onChange={onChange}
              placeholder="Apellido"
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2"
            />
            <input
              type="password"
              name="admin.pass"
              value={!empresaAEditar.id?empresaNueva.admin.pass:empresaAEditar.admin?.pass}
              onChange={onChange}
              placeholder="Contraseña del Admin"
              className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2 sm:py-2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2 md:flex-row md:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 transition md:w-auto md:py-2 lg:hover:bg-slate-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-50 md:w-auto md:py-2 lg:hover:bg-blue-700"
          >
            {guardando ? "Guardando..." : empresaAEditar ? "Guardar Cambios" : "Registrar Empresa"}
          </button>
        </div>
      </form>
    </div>
  );
};