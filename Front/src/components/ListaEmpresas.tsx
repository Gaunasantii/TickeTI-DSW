import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { DashboardLayout } from "./Layout/DashboardLayout";
import { api } from "../services/api";

interface EmpresaItem {
  id: number;
  razonSocial: string;
  nombre?: string;
  oficinas?: any[];
}

export const ListaEmpresas: React.FC = () => {
  const [empresas, setEmpresas] = useState<EmpresaItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  // Modal / Formulario de Alta Empresa + Admin
  const [mostrarModal, setMostrarModal] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // Campos Empresa
  const [razonSocial, setRazonSocial] = useState("");

  // Campos Admin Principal
  const [dniAdmin, setDniAdmin] = useState("");
  const [nombreAdmin, setNombreAdmin] = useState("");
  const [apellidoAdmin, setApellidoAdmin] = useState("");
  const [telefonoAdmin, setTelefonoAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [passAdmin, setPassAdmin] = useState("");

  const cargarEmpresas = async () => {
    try {
      setCargando(true);
      const res = await api("/empresas");
      if (!res.ok) return setEmpresas([]);
      const json = await res.json();
      setEmpresas(json?.data || (Array.isArray(json) ? json : []));
    } catch (err) {
      console.error("Error al cargar empresas:", err);
      setEmpresas([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const handleCrearEmpresaYAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setGuardando(true);

      // 1. Crear Empresa
      const resEmpresa = await api("/empresas", {
        method: "POST",
        body: JSON.stringify({ razonSocial: razonSocial.trim() }),
      });

      if (!resEmpresa.ok) {
        const err = await resEmpresa.json().catch(() => ({}));
        throw new Error(err.message || "Error al crear la empresa");
      }

      const dataEmpresa = await resEmpresa.json();
      const nuevaEmpresaId = dataEmpresa?.data?.id || dataEmpresa?.id;

      // 2. Crear Admin asignado a la empresa
      const payloadAdmin = {
        dni: dniAdmin.trim(),
        name: nombreAdmin.trim(),
        surName: apellidoAdmin.trim(),
        tele: telefonoAdmin.trim(),
        mail: emailAdmin.trim(),
        pass: passAdmin.trim(),
        empresa: nuevaEmpresaId ? Number(nuevaEmpresaId) : undefined,
      };

      const resAdmin = await api("/admins", {
        method: "POST",
        body: JSON.stringify(payloadAdmin),
      });

      if (!resAdmin.ok) {
        const err = await resAdmin.json().catch(() => ({}));
        throw new Error(`Empresa creada, pero falló el registro del admin: ${err.message || "Error"}`);
      }

      // Limpiar y recargar
      setMostrarModal(false);
      setRazonSocial("");
      setDniAdmin("");
      setNombreAdmin("");
      setApellidoAdmin("");
      setTelefonoAdmin("");
      setEmailAdmin("");
      setPassAdmin("");
      await cargarEmpresas();
      alert("¡Empresa y Administrador creados exitosamente!");
    } catch (err: any) {
      alert(err.message || "Error en el alta");
    } finally {
      setGuardando(false);
    }
  };

  const empresasFiltradas = empresas.filter((emp) => {
    const q = busqueda.toLowerCase().trim();
    const nombre = (emp.razonSocial || emp.nombre || "").toLowerCase();
    return !q || nombre.includes(q) || String(emp.id).includes(q);
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de Empresas</h1>
            <p className="text-sm text-slate-500">Empresas registradas y administradores iniciales</p>
          </div>
          <button
            onClick={() => setMostrarModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition"
          >
            + Nueva Empresa
          </button>
        </div>

        {/* Modal de Alta Empresa + Admin */}
        {mostrarModal && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800">Dar de Alta Empresa y Administrador Principal</h2>
            <form onSubmit={handleCrearEmpresaYAdmin} className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                <span className="block text-xs font-bold text-slate-500 uppercase">Datos de la Empresa</span>
                <input
                  type="text"
                  required
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  placeholder="Razón Social / Nombre (ej: Stark Industries)"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-3">
                <span className="block text-xs font-bold text-slate-500 uppercase">Administrador Asignado</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <input
                    type="text"
                    required
                    value={dniAdmin}
                    onChange={(e) => setDniAdmin(e.target.value)}
                    placeholder="DNI Admin"
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    required
                    value={telefonoAdmin}
                    onChange={(e) => setTelefonoAdmin(e.target.value)}
                    placeholder="Teléfono"
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    required
                    value={nombreAdmin}
                    onChange={(e) => setNombreAdmin(e.target.value)}
                    placeholder="Nombre"
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    required
                    value={apellidoAdmin}
                    onChange={(e) => setApellidoAdmin(e.target.value)}
                    placeholder="Apellido"
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="email"
                    required
                    value={emailAdmin}
                    onChange={(e) => setEmailAdmin(e.target.value)}
                    placeholder="Correo Electrónico"
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="password"
                    required
                    value={passAdmin}
                    onChange={(e) => setPassAdmin(e.target.value)}
                    placeholder="Contraseña"
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-50"
                >
                  {guardando ? "Registrando..." : "Registrar Empresa y Admin"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Buscador */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar empresa por nombre o ID..."
            className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
          <button
            onClick={cargarEmpresas}
            className="px-3.5 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
          >
            Refrescar
          </button>
        </div>

        {/* Listado */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {cargando ? (
            <p className="p-8 text-center text-slate-500 text-sm">Cargando empresas...</p>
          ) : empresasFiltradas.length === 0 ? (
            <p className="p-8 text-center text-slate-500 text-sm">No se encontraron empresas.</p>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                  <th className="p-4 w-24">ID</th>
                  <th className="p-4">Razón Social</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {empresasFiltradas.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/70">
                    <td className="p-4 font-mono font-semibold text-slate-600">#{emp.id}</td>
                    <td className="p-4 font-medium text-slate-800">{emp.razonSocial || emp.nombre}</td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/empresas/${emp.id}/oficinas`}
                        className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                      >
                        Ver Oficinas →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ListaEmpresas;