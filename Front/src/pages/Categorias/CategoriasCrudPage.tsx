import React, { useEffect, useState } from "react";
import { prioridadModel } from "../../models/prioridad.model";
import { IModifyPrioridadRequest } from "../../requests/IModifyPrioridadRequest";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { Pagination } from "../../components/Pagination";
import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IMeta } from "../../responses/IPaginatedApiResponse";
import { deleteCategoria } from "../../services/CategoriaService/DeleteCategoria";
import { CategoriaModel } from "../../models/categoria.model";
import { ICreateCategoriaRequest } from "../../requests/ICreateCategoriaRequest";
import { IModifyCategoriaRequest } from "../../requests/IModifyCategoriaRequest";
import { createCategoria } from "../../services/CategoriaService/CreateCategoria";
import { modifyCategoria } from "../../services/CategoriaService/ModifyCategoria";
import { PrioridadSection } from "../Prioridad/components/PrioridadSection";
import { CategoriaSection } from "./components/CategoriaSection";
import { getCategoriaPaginated } from "../../services/CategoriaService/GetCategoriaPaginated";



export const CategoriasCrudPage: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaNew,setCategoriaNew] = useState<ICreateCategoriaRequest|null>(null);
  const [updatedCategoria, setUpdatedCategoria] = useState<IModifyCategoriaRequest|null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [paginadoParams, setPaginadoParams] = useState<IPaginadoParams>({
    pagina: 1,
    cantidad: 10,
  });
  const [meta, setMeta] = useState<IMeta|null>(null);

  const cargarCategorias = async () => {
    try {
      setCargando(true);
      const list=await getCategoriaPaginated(paginadoParams);
      setCategorias(list.data);
      setMeta(list.meta);
    }catch(err){
      console.error("Error al cargar las categorías:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, [paginadoParams]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (updatedCategoria) {
      setUpdatedCategoria({ ...updatedCategoria!, [name]: value });
    } else {
      setCategoriaNew({ ...categoriaNew!, [name]: value });
    }
  };

  const handleNuevaCategoria=async(e: React.FormEvent)=>{
        e.preventDefault();
        try {
          const res= await createCategoria(categoriaNew!);
          cargarCategorias();
        } catch (err) {
          console.error("Error al manejar la nueva categoría:", err);
        }
  }

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Deseás eliminar esta categoría?")) return;
    try {
      await deleteCategoria(id);
      cargarCategorias();
    } catch (err: any) {
      alert(err.message || "Error al eliminar");
    }
  };

  const handleActualizarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await modifyCategoria(editandoId!,updatedCategoria!);
      cargarCategorias();
    }catch(err){
      console.error("Error al actualizar la categoría:", err);
    }
    setEditandoId(null);
    setUpdatedCategoria(null);
  };

  const handleEditar = (categoria: CategoriaModel) => {
    setEditandoId(categoria.id);
    setUpdatedCategoria((prev) => ({ ...prev, ...categoria }));
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de Categorías</h1>
            <p className="text-sm text-slate-500">
              Administrá las categorías de la empresa
            </p>
          </div>
          <button
            type="button"
            onClick={cargarCategorias}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
          >
            Refrescar
          </button>
        </div>

        {/* Formulario de alta / edición */}
        <form
          onSubmit={updatedCategoria ? handleActualizarCategoria   : handleNuevaCategoria}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            required
            name="nombre"
            value={updatedCategoria? updatedCategoria.nombre : categoriaNew?.nombre}
            onChange={handleChange}
            placeholder={
              updatedCategoria
                ? `Editando categoría #${editandoId}...`
                : "Nombre de la nueva categoría (ej: Alta)"
            }
            className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <div className="flex gap-2">
            {updatedCategoria && (
              <button
                type="button"
                onClick={() => {
                  setUpdatedCategoria(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              disabled={guardando}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50"
            >
              {guardando ? "Guardando..." : updatedCategoria ? "Actualizar" : "+ Agregar Categoría"}
            </button>
          </div>
        </form>
        <CategoriaSection
          categorias={categorias}
          cargando={cargando}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
        {meta && meta.totalPages > 1 && (
          <Pagination
            cantidad={meta.totalItems}
            cantidadVisible={meta.itemsPerPage}
            paginaActual={paginadoParams.pagina}
            totalPaginas={meta.totalPages}
            onAnterior={() => setPaginadoParams((prev) => ({ ...prev, pagina: Math.max(prev.pagina - 1, 1) }))}
            onSiguiente={() =>
              setPaginadoParams((prev) => ({ ...prev, pagina: Math.min(prev.pagina + 1, meta.totalPages) }))
            }
          />
        )}
      </div>
    </>
  );
};

export default CategoriasCrudPage;