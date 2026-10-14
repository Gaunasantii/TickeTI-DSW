import React, { useEffect, useState, useCallback } from "react";
import { Pagination } from "../../components/Pagination";
import { ObtenerEmpresasPaginated } from "../../services/EmpresaServices/GetEmpresasPaginado";
import { EmpresaPaginatedModel } from "../../models/empresaPaginated.model";
import { EmpresasTable } from "../../components/Empresas/EmpresaTable";
import { EmpresaForm } from "../../components/Empresas/EmpresaForm";
import { eliminarEmpresa } from "../../services/EmpresaServices/EliminarEmpresa";
import { IMeta } from "../../responses/IPaginatedApiResponse";
import { ICreateEmpresaRequest } from "../../requests/ICreateEmpresaRequest";
import { IModifyEmpresaRequest } from "../../requests/IModifyEmpresaRequest";
import { AgregarEmpresa } from "../../services/EmpresaServices/AgregarEmpresa";
import { modificarEmpresa } from "../../services/EmpresaServices/ModificarEmpresa";

export const SuperAdminPage: React.FC = () => {
  const [empresas, setEmpresas] = useState<EmpresaPaginatedModel[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [empresaAEditar, setEmpresaAEditar] = useState<IModifyEmpresaRequest>({ id: "", nombre: "", admin: { dni: "", name: "", surName: "", tele: "", pass: "" } });
  const [paginadoParams, setPaginadoParams] = useState({
    pagina: 1,
    cantidad: 10,
  });
  const [newEmpresa, setNewEmpresa] = useState<ICreateEmpresaRequest>({ nombre: "", admin: { dni: "", name: "", surName: "", tele: "", pass: "" } });
  const [meta, setMeta] = useState<IMeta|null>(null); 

  const cargarEmpresas = useCallback(async () => {
    try {
      setCargando(true);
      const res: any = await ObtenerEmpresasPaginated({
        pagina: paginadoParams.pagina,
        cantidad: paginadoParams.cantidad,
      });
      setEmpresas(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error("Error al cargar empresas:", err);
      setEmpresas([]);
    } finally {
      setCargando(false);
    }
  }, [paginadoParams]);

  useEffect(() => {
    cargarEmpresas();
  }, [cargarEmpresas]);

  const handleEliminar = async (empresa: EmpresaPaginatedModel) => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar la empresa "${empresa.nombre}"?`
    );
    if (!confirmar) return;

    try {
      let idAEliminar = empresa.id;
      await eliminarEmpresa(idAEliminar);
      await cargarEmpresas();
      alert("Empresa eliminada correctamente.");
    } catch (err: any) {
      alert(err.message || "Error al eliminar la empresa");
    }
  };

  const handleModificar = (empresa: EmpresaPaginatedModel) => {
    setEmpresaAEditar({
      id: String(empresa.id),
      nombre: empresa.nombre,
      admin: empresa.admin? empresa.admin : { dni: "", name: "", surName: "", tele: "" , pass:""},
    });
    setMostrarModal(true);
  };

  const handleCreate=async (data: ICreateEmpresaRequest) => {
    try {
      console.log("entro en creacion")
      await AgregarEmpresa(data);
      alert("Empresa creada correctamente.");
      setNewEmpresa({ nombre: "", admin: { dni: "", name: "", surName: "", tele: "", pass: "" } });
    } catch (err: any) {
      alert(err.message || "Error al crear la empresa");
    }
  };

  const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const updateState = (prevState: any) => {
          if (!prevState) return prevState;

    
          if (name.includes('.')) {
            const [parentKey, childKey] = name.split('.');
            return {
              ...prevState,
              [parentKey]: {
                ...prevState[parentKey], 
                [childKey]: value,
              },
            };
          }
          return { ...prevState, [name]: value };
        };

        if (empresaAEditar.id!=="") {
          setEmpresaAEditar(updateState);
        } else {
          setNewEmpresa(updateState);
        }
  };

  const handleUpdate=async (data: IModifyEmpresaRequest) => {
    try {
      console.log("entro en modificacion")
      await modificarEmpresa(data);
      await cargarEmpresas();
      alert("Empresa modificada correctamente.");
      setMostrarModal(false);
      setEmpresaAEditar({ id: "", nombre: "", admin: { dni: "", name: "", surName: "", tele: "", pass: "" } });
    } catch (err: any) {
      alert(err.message || "Error al modificar la empresa");
    }
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">Gestión de Empresas</h1>
            <p className="text-xs text-slate-500 sm:text-sm">
              Empresas registradas y administradores asignados en el sistema
            </p>
          </div>
          <button
            onClick={() => {
              setEmpresaAEditar({ id: "", nombre: "", admin: { dni: "", name: "", surName: "", tele: "", pass: "" } });
              setMostrarModal(!mostrarModal);
            }}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition sm:w-auto sm:self-auto lg:hover:bg-blue-700"
          >
            {mostrarModal ? "Cerrar formulario" : "+ Nueva Empresa"}
          </button>
        </div>

        {mostrarModal && (
          <EmpresaForm
            empresaAEditar={empresaAEditar}
            empresaNueva={newEmpresa}
            onChange={handleChange}
            onCancel={() => {
              setMostrarModal(false);
              setEmpresaAEditar({ id: "", nombre: "", admin: { dni: "", name: "", surName: "", tele: "", pass: "" } });
            }}
            onSubmitCreate={handleCreate}
            onSubmitUpdate={handleUpdate}
          />
        )}

        <EmpresasTable
          empresas={empresas}
          cargando={cargando}
          onModificar={handleModificar}
          onEliminar={handleEliminar}
        />

        {meta && meta.totalPages > 1 && (
          <Pagination
            cantidad={meta.totalItems}
            cantidadVisible={empresas.length}
            paginaActual={paginadoParams.pagina}
            totalPaginas={meta.totalPages}
            onAnterior={() => setPaginadoParams((prev) => ({ ...prev, pagina: Math.max(prev.pagina - 1, 1) }))}
            onSiguiente={() => setPaginadoParams((prev) => ({ ...prev, pagina: Math.min(prev.pagina + 1, meta.totalPages) }))}
          />
        )}
      </div>
    </>
  );
};

export const SuperAdmin = SuperAdminPage;
export default SuperAdminPage;