import React from "react";
import type { OficinaItem } from "../../../../types/usuarios";
import { ICreatePersonRequest } from "../../../../requests/ICreatePersonRequest";
import type { IModifyPersonRequest } from "../../../../requests/IModifyPersonRequest";

interface UsuarioFormProps {
  editandoDni: string | null;
  formData: ICreatePersonRequest|IModifyPersonRequest;
  oficinas: OficinaItem[];
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
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
    <h2 className="font-bold text-slate-800 text-base">
      {editandoDni ? `Modificar Usuario (DNI: ${editandoDni})` : "Registrar Nuevo Usuario"}
    </h2>
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      {!editandoDni && (
      <input
        type="text"
        required
        value={(formData as ICreatePersonRequest).dni}
        onChange={onChange}
        placeholder="DNI (mínimo 8 números)"
        name="dni"
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
      />
      )}
      <input
        type="text"
        required
        value={formData.tele}
        onChange={onChange}
        placeholder="Teléfono"
        name="tele"
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
      />
      <input
        type="text"
        required
        value={formData.name}
        onChange={onChange}
        placeholder="Nombre"
        name="name"
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
      />
      <input
        type="text"
        required
        value={formData.surName}
        onChange={onChange}
        placeholder="Apellido"
        name="surName"
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
      />

      {!editandoDni && (
      <select
        value={(formData as ICreatePersonRequest).oficina}
        onChange={onChange}
        name="oficina"
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
      >
        <option value="">Sin oficina asignada</option>
        {oficinas.map((of) => (
          <option key={of.id} value={String(of.id)}>
            {of.nombre}
          </option>
        ))}
      </select>

      )}
      {!editandoDni ? (
        <input
          type="password"
          required
          value={(formData as ICreatePersonRequest).pass}
          onChange={onChange}
          placeholder="Contraseña"
          name="pass"
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
        />
      ) : (
        <div className="hidden sm:block" />
      )}

      <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={guardando}
          className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50"
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  </div>
);
