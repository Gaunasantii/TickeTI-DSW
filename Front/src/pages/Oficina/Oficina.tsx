import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { Pagination } from "../../components/Pagination";
import { OficinaSection } from "./components/OficinaSection";
import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IMeta } from "../../responses/IPaginatedApiResponse";
import { crearOficina } from "../../services/OficinaService/CrearOficina";
import { eliminarOficina } from "../../services/OficinaService/EliminarOficina";
import { oficinaPaginated } from "../../models/oficinaPaginated.model";
import { listarOficinasPaginado } from "../../services/OficinaService/ListarOficinasPaginado";
import { modificarOficina } from "../../services/OficinaService/ModificarOficina";

export const OficinaPage: React.FC = () => {
  const [oficinas, setOficinas] = useState<oficinaPaginated[]>([]);
  const [cargando, setCargando] = useState(true);
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState<number | string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [paginadoParams, setPaginadoParams] = useState<IPaginadoParams>({
    pagina: 1,
    cantidad: 10,
  });
  const [meta, setMeta] = useState<IMeta|null>(null);

  const cargarOficinas = async () => {
    try {
      setCargando(true);
      const list=await listarOficinasPaginado(paginadoParams);
      setOficinas(list.data);
      setMeta(list.meta);
    }catch(err){
      console.error("Error al cargar las oficinas:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarOficinas();
  }, [paginadoParams]);

  const handleNuevaOficina=async(e: React.FormEvent)=>{
        e.preventDefault();
        try {
          const res= await crearOficina({ nombre });
          setNombre("");
          cargarOficinas();
        } catch (err) {
          console.error("Error al manejar la nueva oficina:", err);
        }
  }

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Deseás eliminar esta oficina?")) return;
    try {
      await eliminarOficina(id);
      cargarOficinas();
    } catch (err: any) {
      alert(err.message || "Error al eliminar");
    }
  };

  const handleActualizarOficina = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await modificarOficina({ id: editandoId as number, nombre });
      cargarOficinas();
    }catch(err){
      console.error("Error al actualizar la oficina:", err);
    }
    setEditandoId(null);
    setNombre("");
  };

  const handleEditar = (oficina: oficinaPaginated) => {
    setEditandoId(oficina.id);
    setNombre(oficina.nombre);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de Oficinas</h1>
            <p className="text-sm text-slate-500">
              Administrá las dependencias y sedes de la empresa
            </p>
          </div>
          <button
            type="button"
            onClick={cargarOficinas}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
          >
            Refrescar
          </button>
        </div>

        {/* Formulario de alta / edición */}
        <form
          onSubmit={editandoId ? handleActualizarOficina : handleNuevaOficina}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={
              editandoId
                ? `Editando oficina #${editandoId}...`
                : "Nombre de la nueva oficina (ej: Piso 1 - Soporte Técnico)"
            }
            className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <div className="flex gap-2">
            {editandoId && (
              <button
                type="button"
                onClick={() => {
                  setEditandoId(null);
                  setNombre("");
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
              {guardando ? "Guardando..." : editandoId ? "Actualizar" : "+ Agregar Oficina"}
            </button>
          </div>
        </form>
        <OficinaSection
          oficinas={oficinas}
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
    </DashboardLayout>
  );
};

export default OficinaPage;