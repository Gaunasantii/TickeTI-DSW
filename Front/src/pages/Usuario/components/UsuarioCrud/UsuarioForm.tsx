import React from "react";
import type { OficinaItem } from "../../../../types/usuarios";
import { ICreatePersonRequest } from "../../../../requests/ICreatePersonRequest";
import type { IModifyPersonRequest } from "../../../../requests/IModifyPersonRequest";
import { IOficina } from "../../../../models/oficina.model";

interface UsuarioFormProps {
  editandoDni: string | null;
  formData: ICreatePersonRequest|IModifyPersonRequest;
  oficinas: IOficina[];
  guardando: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCancel: () => void;
}

export const UsuarioForm: React.FC<UsuarioFormProps> = ({
  editandoDni,
  formData,
  oficinas,
  guardando,
  onSubmit,
  onChange,
  onCancel,
}) => (
  <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
    <h2 className="break-words text-base font-bold text-slate-800 sm:text-lg">
      {editandoDni ? `Modificar Usuario (DNI: ${editandoDni})` : "Registrar Nuevo Usuario"}
    </h2>
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:gap-3">
      {!editandoDni && (
      <input
        type="text"
        required
        value={(formData as ICreatePersonRequest).dni}
        onChange={onChange}
        placeholder="DNI (mínimo 8 números)"
        name="dni"
        className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:py-2"
      />
      )}
      <input
        type="text"
        required
        value={formData.tele}
        onChange={onChange}
        placeholder="Teléfono"
        name="tele"
        className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:py-2"
      />
      <input
        type="text"
        required
        value={formData.name}
        onChange={onChange}
        placeholder="Nombre"
        name="name"
        className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:py-2"
      />
      <input
        type="text"
        required
        value={formData.surName}
        onChange={onChange}
        placeholder="Apellido"
        name="surName"
        className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:py-2"
      />

      <select
        value={(formData as ICreatePersonRequest).oficina}
        onChange={onChange}
        name="oficina"
        className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-700 sm:py-2"
      >
        <option value="">Sin oficina asignada</option>
        {oficinas.map((of) => (
          <option key={of.id} value={String(of.id)}>
            {of.nombre}
          </option>
        ))}
      </select>

      
      {!editandoDni ? (
        <input
          type="password"
          required
          value={(formData as ICreatePersonRequest).pass}
          onChange={onChange}
          placeholder="Contraseña"
          name="pass"
          className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:py-2"
        />
      ) : (
        <div className="hidden sm:block" />
      )}

      <div className="flex flex-col gap-2 pt-2 sm:col-span-2 md:flex-row md:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-xl bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-600 transition md:w-auto md:py-2 lg:hover:bg-slate-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={guardando}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition disabled:opacity-50 md:w-auto md:py-2 lg:hover:bg-blue-700"
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  </div>
);
