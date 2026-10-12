import React from "react";
import { IModifyEstadoRequest} from "../../../requests/IModifyEstadoRequest";
import { ICreateEstadoRequest } from "../../../requests/ICreateEstadoRequest";

interface EstadoFormProps {
  editandoId: number | null;
  formData: ICreateEstadoRequest|IModifyEstadoRequest;
  guardando: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCancel: () => void;
}

export const EstadoForm: React.FC<EstadoFormProps> = ({
  editandoId,
  formData,
  guardando,
  onSubmit,
  onChange,
  onCancel,
}) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
    <h2 className="font-bold text-slate-800 text-base">
      {editandoId ? `Modificar Estado (ID: ${editandoId})` : "Registrar Nuevo Estado"}
    </h2>
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      <input
        type="text"
        required
        value={formData.nombre}
        onChange={onChange}
        placeholder="Nombre"
        name="nombre"
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
      />
      <input
        type="text"
        required
        value={formData.descripcion}
        onChange={onChange}
        placeholder="Descripción"
        name="descripcion"
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
      />

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
