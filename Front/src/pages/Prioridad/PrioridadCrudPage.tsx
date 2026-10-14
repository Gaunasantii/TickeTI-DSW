import React, { useEffect, useState } from "react";
import { prioridadModel } from "../../models/prioridad.model";
import { IModifyPrioridadRequest } from "../../requests/IModifyPrioridadRequest";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { Pagination } from "../../components/Pagination";
import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IMeta } from "../../responses/IPaginatedApiResponse";;
import { eliminarOficina } from "../../services/OficinaService/EliminarOficina";
import { oficinaPaginated } from "../../models/oficinaPaginated.model";
import { getPrioridadesPaginated } from "../../services/PrioridadServices/getPrioridadesPaginated";
import { modificarOficina } from "../../services/OficinaService/ModificarOficina";
import { borrarPrioridad } from "../../services/PrioridadServices/deletePrioridad";
import { ICreatePrioridadRequest } from "../../requests/ICreatePrioridadRequest";
import { createPrioridad } from "../../services/PrioridadServices/createPrioridad";
import { modificarPrioridad } from "../../services/PrioridadServices/modifyPrioridad";
import { PrioridadSection } from "./components/PrioridadSection";


export const PrioridadCrudPage: React.FC = () => {
  const [prioridades, setPrioridades] = useState<prioridadModel[]>([]);
  const [cargando, setCargando] = useState(true);
  const [prioridadNew,setPrioridadNew] = useState<ICreatePrioridadRequest|null>(null);
  const [updatedPrioridad, setUpdatedPrioridad] = useState<IModifyPrioridadRequest|null>(null);
  const [editandoId, setEditandoId] = useState<number | string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [paginadoParams, setPaginadoParams] = useState<IPaginadoParams>({
    pagina: 1,
    cantidad: 10,
  });
  const [meta, setMeta] = useState<IMeta|null>(null);

  const cargarPrioridades = async () => {
    try {
      setCargando(true);
      const list=await getPrioridadesPaginated(paginadoParams);
      setPrioridades(list.data);
      setMeta(list.meta);
    }catch(err){
      console.error("Error al cargar las prioridades:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPrioridades();
  }, [paginadoParams]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (updatedPrioridad) {
      setUpdatedPrioridad({ ...updatedPrioridad!, [name]: value });
    } else {
      setPrioridadNew({ ...prioridadNew!, [name]: value });
    }
  };

  const handleNuevaPrioridad=async(e: React.FormEvent)=>{
        e.preventDefault();
        try {
          const res= await createPrioridad(prioridadNew!);
          cargarPrioridades();
        } catch (err) {
          console.error("Error al manejar la nueva prioridad:", err);
        }
  }

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Deseás eliminar esta prioridad?")) return;
    try {
      await borrarPrioridad(id);
      cargarPrioridades();
    } catch (err: any) {
      alert(err.message || "Error al eliminar");
    }
  };

  const handleActualizarPrioridad = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await modificarPrioridad(updatedPrioridad!);
    }catch(err){
      console.error("Error al actualizar la prioridad:", err);
    }
    setEditandoId(null);
    setUpdatedPrioridad(null);
  };

  const handleEditar = (prioridad: prioridadModel) => {
    setUpdatedPrioridad((prev) => ({ ...prev, ...prioridad }));
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de Prioridades</h1>
            <p className="text-sm text-slate-500">
              Administrá las prioridades de la empresa
            </p>
          </div>
          <button
            type="button"
            onClick={cargarPrioridades}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
          >
            Refrescar
          </button>
        </div>

        {/* Formulario de alta / edición */}
        <form
          onSubmit={updatedPrioridad ? handleActualizarPrioridad : handleNuevaPrioridad}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            required
            name="nombre"
            value={updatedPrioridad? updatedPrioridad.nombre : prioridadNew?.nombre}
            onChange={handleChange}
            placeholder={
              updatedPrioridad
                ? `Editando prioridad #${updatedPrioridad.id}...`
                : "Nombre de la nueva prioridad (ej: Alta)"
            }
            className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <input
            type="number"
            required
            name="tiempoLimiteResolucion"
            value={updatedPrioridad? updatedPrioridad.tiempoLimiteResolucion : prioridadNew?.tiempoLimiteResolucion}
            onChange={handleChange}
            placeholder={
              updatedPrioridad
                ? `Editando tiempo límite de resolución de prioridad #${updatedPrioridad.id}...`
                : "Tiempo límite de resolución de la nueva prioridad"
            }
            className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <div className="flex gap-2">
            {updatedPrioridad && (
              <button
                type="button"
                onClick={() => {
                  setUpdatedPrioridad(null);
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
              {guardando ? "Guardando..." : updatedPrioridad ? "Actualizar" : "+ Agregar Prioridad"}
            </button>
          </div>
        </form>
        <PrioridadSection
          prioridades={prioridades}
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

export default PrioridadCrudPage;