import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { Pagination } from "../../components/Pagination";
import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IMeta } from "../../responses/IPaginatedApiResponse";
import { deleteEstado } from "../../services/EstadoServices/DeleteEstado";
import { estadoModel } from "../../models/estado.model";
import { ICreateEstadoRequest } from "../../requests/ICreateEstadoRequest";
import { IModifyEstadoRequest } from "../../requests/IModifyEstadoRequest";
import { createEstado } from "../../services/EstadoServices/CreateEstado";
import { modifyEstado } from "../../services/EstadoServices/ModifyEstado";
import { getEstadosPaginado } from "../../services/EstadoServices/GetEstadosPaginado";
import { EstadoSection } from "../Estado/components/EstadoSection";
import { EstadoForm } from "./components/EstadoForm";



export const EstadoCrudPage: React.FC = () => {
  const [estados, setEstados] = useState<estadoModel[]>([]);
  const [cargando, setCargando] = useState(true);
  const [estadoNew,setEstadoNew] = useState<ICreateEstadoRequest|null>({ nombre: "" ,descripcion: "" });
  const [updatedEstado, setUpdatedEstado] = useState<IModifyEstadoRequest|null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [paginadoParams, setPaginadoParams] = useState<IPaginadoParams>({
    pagina: 1,
    cantidad: 10,
  });
  const [meta, setMeta] = useState<IMeta|null>(null);

  const cargarEstados = async () => {
    try {
      setCargando(true);
      console.log("Cargando estados con parámetros de paginado:", paginadoParams);
      const list=await getEstadosPaginado(paginadoParams);
      setEstados(list.data);
      setMeta(list.meta);
    }catch(err){
      console.error("Error al cargar los estados:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEstados();
  }, [paginadoParams]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (updatedEstado) {
      setUpdatedEstado({ ...updatedEstado, [name]: value });
    } else {
      setEstadoNew({ ...estadoNew!, [name]: value });
    }
  };

  const handleNuevaCategoria=async(e: React.FormEvent)=>{
        e.preventDefault();
        try {
          const res= await createEstado(estadoNew!);
          cargarEstados();
        } catch (err) {
          console.error("Error al manejar el nuevo estado:", err);
        }
  }

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Deseás eliminar este estado?")) return;
    try {
      await deleteEstado(id);
      cargarEstados();
    } catch (err: any) {
      alert(err.message || "Error al eliminar");
    }
  };

  const handleActualizarEstado = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await modifyEstado(editandoId!,updatedEstado!);
      cargarEstados();
    }catch(err){
      console.error("Error al actualizar el estado:", err);
    }
    setEditandoId(null);
    setUpdatedEstado({ nombre: "" ,descripcion: "" });
  };

  const handleEditar = (estado: estadoModel) => {
    setEditandoId(estado.id);
    setUpdatedEstado((prev) => ({ ...prev, ...estado }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de Estados</h1>
            <p className="text-sm text-slate-500">
              Administrá los estados de la empresa
            </p>
          </div>
          <button
            type="button"
            onClick={cargarEstados}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
          >
            Refrescar
          </button>
        </div>

        {/* Formulario de alta / edición */}

        <EstadoForm
          editandoId={editandoId}
          formData={updatedEstado ? updatedEstado : estadoNew!}
          guardando={guardando}
          onSubmit={updatedEstado ? handleActualizarEstado : handleNuevaCategoria}
          onChange={handleChange}
          onCancel={() => {
            setEditandoId(null);
            setUpdatedEstado(null);
            setEstadoNew({ nombre: "" ,descripcion: "" });
          }}
        />
        
        <EstadoSection
          estados={estados}
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

export default EstadoCrudPage;