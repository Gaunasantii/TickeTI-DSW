import React, { useEffect, useState, useCallback } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { Pagination } from "../../components/Pagination";
import { ObtenerEmpresasPaginated } from "../../services/EmpresaServices/GetEmpresasPaginado";
import { EmpresaPaginatedModel } from "../../models/empresaPaginated.model";
import { EmpresasTable } from "./components/EmpresaTable";
import { EmpresaForm } from "./components/EmpresaForm";
import { eliminarEmpresa } from "../../services/EmpresaServices/EliminarEmpresa";
import { api } from "../../services/api";

export const SuperAdminPage: React.FC = () => {
  const [empresas, setEmpresas] = useState<EmpresaPaginatedModel[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [empresaAEditar, setEmpresaAEditar] = useState<EmpresaPaginatedModel | null>(null);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const cantidadPorPagina = 10;

  const cargarEmpresas = useCallback(async () => {
    try {
      setCargando(true);
      const res: any = await ObtenerEmpresasPaginated({
        pagina: paginaActual,
        cantidad: cantidadPorPagina,
      });

      const lista = res?.data || (Array.isArray(res) ? res : []);
      setEmpresas(lista);
      setTotalPaginas(res?.totalPaginas ?? res?.totalPages ?? 1);
      setTotalItems(res?.totalItems ?? res?.total ?? lista.length);
    } catch (err) {
      console.error("Error al cargar empresas:", err);
      setEmpresas([]);
    } finally {
      setCargando(false);
    }
  }, [paginaActual]);

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

      // Si el endpoint de paginado no adjuntó el campo id, obtenemos el ID buscando por el endpoint general
      if (!idAEliminar) {
        const resAll = await api("/empresas");
        if (resAll.ok) {
          const jsonAll = await resAll.json();
          const listaAll: any[] = jsonAll?.data || (Array.isArray(jsonAll) ? jsonAll : []);
          const encontrada = listaAll.find((e) => e.nombre === empresa.nombre);
          if (encontrada) idAEliminar = Number(encontrada.id);
        }
      }

      if (!idAEliminar || isNaN(idAEliminar)) {
        alert("No se pudo determinar el ID numérico de la empresa.");
        return;
      }

      await eliminarEmpresa(idAEliminar);
      await cargarEmpresas();
      alert("Empresa eliminada correctamente.");
    } catch (err: any) {
      alert(err.message || "Error al eliminar la empresa");
    }
  };

  const handleModificar = (empresa: EmpresaPaginatedModel) => {
    setEmpresaAEditar(empresa);
    setMostrarModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de Empresas</h1>
            <p className="text-sm text-slate-500">
              Empresas registradas y administradores asignados en el sistema
            </p>
          </div>
          <button
            onClick={() => {
              setEmpresaAEditar(null);
              setMostrarModal(!mostrarModal);
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition self-start sm:self-auto"
          >
            {mostrarModal ? "Cerrar formulario" : "+ Nueva Empresa"}
          </button>
        </div>

        {mostrarModal && (
          <EmpresaForm
            empresaAEditar={empresaAEditar}
            onSuccess={() => {
              setMostrarModal(false);
              setEmpresaAEditar(null);
              cargarEmpresas();
            }}
            onCancel={() => {
              setMostrarModal(false);
              setEmpresaAEditar(null);
            }}
          />
        )}

        <EmpresasTable
          empresas={empresas}
          cargando={cargando}
          onModificar={handleModificar}
          onEliminar={handleEliminar}
        />

        {totalPaginas > 1 && (
          <Pagination
            cantidad={totalItems}
            cantidadVisible={empresas.length}
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onAnterior={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            onSiguiente={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export const SuperAdmin = SuperAdminPage;
export default SuperAdminPage;