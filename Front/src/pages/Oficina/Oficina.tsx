import React, { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { api } from "../../services/api";

interface OficinaItem {
  id: number | string;
  nombre: string;
}

export const OficinaPage: React.FC = () => {
  const [oficinas, setOficinas] = useState<OficinaItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState<number | string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [empresaIdRespaldo, setEmpresaIdRespaldo] = useState<number | null>(null);

  // Recuperar empresa del usuario en sesión
  const usuarioRaw = sessionStorage.getItem("usuario");
  const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  const miEmpresaId = Number(
    usuario?.empresaId ||
    usuario?.empresa?.id ||
    usuario?.empresa_id ||
    (typeof usuario?.empresa === "number" ? usuario.empresa : null)
  );

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const resOficinas = await api("/oficinas").catch(() => api("/oficina"));
      const dataOficinas = await resOficinas.json();
      setOficinas(Array.isArray(dataOficinas) ? dataOficinas : dataOficinas.data || []);

      // Si el usuario no tiene la empresa en su sessionStorage, obtenemos la primera registrada
      if (!miEmpresaId) {
        const resEmpresas = await api("/empresas").catch(() => api("/empresa"));
        const dataEmpresas = await resEmpresas.json();
        const lista = Array.isArray(dataEmpresas) ? dataEmpresas : dataEmpresas.data || [];
        if (lista.length > 0) {
          setEmpresaIdRespaldo(Number(lista[0].id));
        }
      }
    } catch (err) {
      console.error("Error al cargar oficinas:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const idEmpresaFinal = miEmpresaId || empresaIdRespaldo || 1;

    try {
      setGuardando(true);

      const payload = {
        nombre: nombre.trim(),
        empresa: Number(idEmpresaFinal),
      };

      const url = editandoId ? `/oficinas/${editandoId}` : "/oficinas";
      const fallbackUrl = editandoId ? `/oficina/${editandoId}` : "/oficina";
      const method = editandoId ? "PUT" : "POST";

      const res = await api(url, { method, body: JSON.stringify(payload) })
        .catch(() => api(fallbackUrl, { method, body: JSON.stringify(payload) }));

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error al procesar la oficina");
      }

      setNombre("");
      setEditandoId(null);
      await cargarDatos();
    } catch (err: any) {
      alert(err.message || "Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id: number | string) => {
    if (!window.confirm("¿Deseás eliminar esta oficina?")) return;
    try {
      await api(`/oficinas/${id}`, { method: "DELETE" }).catch(() => api(`/oficina/${id}`, { method: "DELETE" }));
      await cargarDatos();
    } catch (err: any) {
      alert(err.message || "Error al eliminar");
    }
  };

  const oficinasFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    return oficinas.filter((o) => !q || o.nombre.toLowerCase().includes(q) || String(o.id).includes(q));
  }, [oficinas, busqueda]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Oficinas</h1>
          <p className="text-sm text-slate-500">Administrá las dependencias y sedes de tu empresa</p>
        </div>

        {/* Formulario compacto de alta / edición */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={editandoId ? `Editando oficina #${editandoId}...` : "Nombre de la nueva oficina (ej: Sistemas - Piso 1)"}
            className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <div className="flex gap-2">
            {editandoId && (
              <button
                type="button"
                onClick={() => { setEditandoId(null); setNombre(""); }}
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

        {/* Buscador */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Filtrar por nombre o ID..."
            className="flex-1 px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white"
          />
          <button onClick={cargarDatos} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200">
            Refrescar
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {cargando ? (
            <p className="p-8 text-center text-slate-500 text-sm">Cargando oficinas...</p>
          ) : oficinasFiltradas.length === 0 ? (
            <p className="p-8 text-center text-slate-500 text-sm">No se encontraron oficinas registradas.</p>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                  <th className="p-4 w-24">ID</th>
                  <th className="p-4">Nombre</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {oficinasFiltradas.map((ofi) => (
                  <tr key={ofi.id} className="hover:bg-slate-50/70">
                    <td className="p-4 font-mono font-semibold text-slate-600">#{ofi.id}</td>
                    <td className="p-4 font-medium text-slate-800">{ofi.nombre}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => { setEditandoId(ofi.id); setNombre(ofi.nombre); }}
                        className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(ofi.id)}
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OficinaPage;