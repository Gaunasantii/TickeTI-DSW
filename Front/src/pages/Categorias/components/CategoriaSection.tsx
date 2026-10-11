import React from "react";
import { CategoriaModel } from "../../../models/categoria.model";

interface ICategoriaSectionProps {
  categorias: CategoriaModel[];
  cargando: boolean;
  onEditar: (categoria: CategoriaModel) => void;
  onEliminar: (id: number) => void;
}

export const CategoriaSection: React.FC<ICategoriaSectionProps> = ({ categorias, cargando, onEditar, onEliminar }) => {
    return (<div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
    {cargando ? (
      <p className="p-8 text-center text-slate-500 text-sm">Cargando categorías...</p>
    ) : categorias.length === 0 ? (
      <p className="p-8 text-center text-slate-500 text-sm">
        No se encontraron categorías registradas.
      </p>
    ) : (
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase bg-slate-50">
            <th className="p-4">Nombre</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="hover:bg-slate-50/70">
              <td className="p-4 font-medium text-slate-800">{categoria.nombre}</td>
              <td className="p-4 text-right space-x-2">
                <button
                  onClick={() => onEditar(categoria)}
                  className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(categoria.id)}
                  className="px-2.5 py-1 text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>)
}