import React, { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { api } from "../../services/api";
import { ListarOficinas } from "../../services/OficinaService/ListarOficina";

interface OficinaItem {
  id: number | string;
  nombre: string;
}

interface UsuarioItem {
  dni: string;
  name: string;
  surName?: string;
  mail?: string;
  tele?: string;
  type?: string;
  rol?: string;
  oficina?: { id: number | string; nombre: string } | number | string | null;
}

export const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioItem[]>([]);
  const [oficinas, setOficinas] = useState<OficinaItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("TODOS");
  const [filaExpandida, setFilaExpandida] = useState<string | null>(null);

  // Formulario rápido para Admin
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editandoDni, setEditandoDni] = useState<string | null>(null);
  const [dni, setDni] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [tele, setTele] = useState("");
  const [oficinaId, setOficinaId] = useState<string>("");
  const [pass, setPass] = useState("");
  const [guardando, setGuardando] = useState(false);

  const usuarioRaw = sessionStorage.getItem("user") || sessionStorage.getItem("usuario");
  let usuarioSesion: any = null;
  try {
    usuarioSesion = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  } catch {
    usuarioSesion = null;
  }
  const rolSesion = (usuarioSesion?.type || usuarioSesion?.rol || "").toLowerCase();
  const esAdmin = rolSesion.includes("admin");

  const unwrap = (r: any): any[] => (r?.data ? r.data : Array.isArray(r) ? r : []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [resU, resT, resA, resOf] = await Promise.allSettled([
        api("/usuarios").then((r) => (r.ok ? r.json() : [])),
        api("/tecnicos").then((r) => (r.ok ? r.json() : [])),
        api("/admins").then((r) => (r.ok ? r.json() : [])),
        ListarOficinas(),
      ]);

      const listaU = resU.status === "fulfilled" ? unwrap(resU.value) : [];
      const listaT = resT.status === "fulfilled" ? unwrap(resT.value) : [];
      const listaA = resA.status === "fulfilled" ? unwrap(resA.value) : [];
      const listaOf = resOf.status === "fulfilled" ? unwrap(resOf.value) : [];

      setOficinas(listaOf);

      const normU = listaU.map((u) => ({ ...u, type: "USER" }));
      const normT = listaT.map((t) => ({ ...t, type: "TECNICO" }));
      const normA = listaA.map((a) => ({ ...a, type: "ADMIN" }));

      // Unificar por DNI
      const mapa = new Map<string, UsuarioItem>();
      [...normU, ...normT, ...normA].forEach((item) => {
        if (item.dni) mapa.set(String(item.dni), item);
      });

      setUsuarios(Array.from(mapa.values()));
    } catch (err) {
      console.error("Error al cargar nómina u oficinas:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const resolverNombreOficina = (oficinaVal: any): string => {
    if (!oficinaVal) return "Sin oficina";
    if (typeof oficinaVal === "object" && oficinaVal.nombre) return oficinaVal.nombre;
    const encontrada = oficinas.find((o) => String(o.id) === String(oficinaVal));
    return encontrada ? encontrada.nombre : "Sin oficina";
  };

  const resolverIdOficina = (oficinaVal: any): string => {
    if (!oficinaVal) return "";
    if (typeof oficinaVal === "object") return String(oficinaVal.id ?? "");
    return String(oficinaVal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esAdmin) return;
    try {
      setGuardando(true);
      const endpoint = editandoDni ? `/usuarios/${editandoDni}` : "/usuarios";
      const method = editandoDni ? "PUT" : "POST";

      const payload: any = editandoDni
        ? {
            name: name.trim(),
            surName: surName.trim(),
            tele: tele.trim(),
            oficina: oficinaId ? Number(oficinaId) : null,
          }
        : {
            dni: dni.trim(),
            name: name.trim(),
            surName: surName.trim(),
            tele: tele.trim(),
            pass: pass.trim(),
            oficina: oficinaId ? Number(oficinaId) : null,
          };

      const res = await api(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error al procesar usuario");
      }

      setMostrarModal(false);
      setEditandoDni(null);
      setDni("");
      setName("");
      setSurName("");
      setTele("");
      setOficinaId("");
      setPass("");
      await cargarDatos();
    } catch (err: any) {
      alert(err.message || "Error en la operación");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (dniUser: string) => {
    if (!esAdmin || !window.confirm(`¿Eliminar usuario DNI ${dniUser}?`)) return;
    try {
      await api(`/usuarios/${dniUser}`, { method: "DELETE" });
      await cargarDatos();
    } catch (err: any) {
      alert(err.message || "Error al eliminar");
    }
  };

  const usuariosFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    return usuarios.filter((u) => {
      const r = (u.type || u.rol || "USER").toUpperCase();
      if (filtroRol === "ADMIN" && !r.includes("ADMIN")) return false;
      if (filtroRol === "TECNICO" && !r.includes("TEC")) return false;
      if (filtroRol === "USER" && (r.includes("ADMIN") || r.includes("TEC"))) return false;

      const nomOf = resolverNombreOficina(u.oficina).toLowerCase();

      return (
        !q ||
        u.dni?.toLowerCase().includes(q) ||
        u.name?.toLowerCase().includes(q) ||
        u.surName?.toLowerCase().includes(q) ||
        u.mail?.toLowerCase().includes(q) ||
        nomOf.includes(q)
      );
    });
  }, [usuarios, busqueda, filtroRol, oficinas]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Nómina de Personal</h1>
            <p className="text-sm text-slate-500">Usuarios, técnicos y administradores</p>
          </div>
          {esAdmin && (
            <button
              onClick={() => {
                setEditandoDni(null);
                setDni("");
                setName("");
                setSurName("");
                setTele("");
                setOficinaId("");
                setPass("");
                setMostrarModal(true);
              }}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition"
            >
              + Nuevo Usuario
            </button>
          )}
        </div>

        {/* Modal / Formulario */}
        {esAdmin && mostrarModal && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-800 text-base">
              {editandoDni ? `Modificar Usuario (DNI: ${editandoDni})` : "Registrar Nuevo Usuario"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <input
                type="text"
                disabled={!!editandoDni}
                required
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="DNI (mínimo 8 números)"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <input
                type="text"
                required
                value={tele}
                onChange={(e) => setTele(e.target.value)}
                placeholder="Teléfono"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <input
                type="text"
                required
                value={surName}
                onChange={(e) => setSurName(e.target.value)}
                placeholder="Apellido"
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />

              {/* Selector dinámico de Oficina */}
              <select
                value={oficinaId}
                onChange={(e) => setOficinaId(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
              >
                <option value="">Sin oficina asignada</option>
                {oficinas.map((of) => (
                  <option key={of.id} value={String(of.id)}>
                    {of.nombre}
                  </option>
                ))}
              </select>

              {!editandoDni ? (
                <input
                  type="password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Contraseña"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              ) : (
                <div className="hidden sm:block" />
              )}

              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
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
        )}

        {/* Buscador */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por DNI, nombre, apellido, oficina..."
            className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
          >
            <option value="TODOS">Todos los roles</option>
            <option value="ADMIN">Administradores</option>
            <option value="TECNICO">Técnicos</option>
            <option value="USER">Usuarios</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {cargando ? (
            <p className="p-8 text-center text-slate-500 text-sm">Cargando...</p>
          ) : usuariosFiltrados.length === 0 ? (
            <p className="p-8 text-center text-slate-500 text-sm">No se encontraron usuarios.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                <div className="col-span-3">DNI</div>
                <div className="col-span-4">Nombre y Apellido</div>
                <div className="col-span-3">Oficina</div>
                <div className="col-span-2 text-right">Rol</div>
              </div>
              {usuariosFiltrados.map((u) => {
                const abierta = filaExpandida === u.dni;
                const r = (u.type || u.rol || "USER").toUpperCase();
                const nombreOf = resolverNombreOficina(u.oficina);

                return (
                  <div key={u.dni}>
                    <div
                      onClick={() => setFilaExpandida(abierta ? null : u.dni)}
                      className={`grid grid-cols-12 px-5 py-3.5 items-center cursor-pointer text-sm ${
                        abierta ? "bg-blue-50/40" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="col-span-3 font-mono font-semibold text-slate-700 flex items-center gap-2">
                        <span className={`text-xs ${abierta ? "rotate-90 text-blue-600" : "text-slate-400"}`}>▶</span>
                        {u.dni}
                      </div>
                      <div className="col-span-4 font-medium text-slate-800">
                        {u.name} {u.surName || ""}
                      </div>
                      <div className="col-span-3 text-xs text-slate-600 truncate">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                          {nombreOf}
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${
                            r.includes("ADMIN")
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : r.includes("TEC")
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {r.includes("ADMIN") ? "Admin" : r.includes("TEC") ? "Técnico" : "Usuario"}
                        </span>
                      </div>
                    </div>
                    {abierta && (
                      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 text-xs flex flex-wrap justify-between items-center gap-3">
                        <div className="flex flex-wrap gap-6 text-slate-600">
                          <div><strong>Email:</strong> {u.mail || "Automático"}</div>
                          <div><strong>Teléfono:</strong> {u.tele || "N/A"}</div>
                          <div><strong>Oficina:</strong> {nombreOf}</div>
                        </div>
                        {esAdmin && !r.includes("ADMIN") && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditandoDni(u.dni);
                                setDni(u.dni);
                                setName(u.name);
                                setSurName(u.surName || "");
                                setTele(u.tele || "");
                                setOficinaId(resolverIdOficina(u.oficina));
                                setMostrarModal(true);
                              }}
                              className="px-2.5 py-1 font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleEliminar(u.dni)}
                              className="px-2.5 py-1 font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100 transition"
                            >
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ListaUsuarios;