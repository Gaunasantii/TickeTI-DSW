import React, { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { api } from "../../services/api";

interface UsuarioItem {
  dni: string;
  name: string;
  surName?: string;
  mail?: string;
  tele?: string;
  type?: string;
  rol?: string;
  empresa?: any;
  oficina?: { id: number | string; nombre: string; empresa?: any } | null;
}

export const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("TODOS");

  // Estado para la fila desplegada
  const [filaExpandida, setFilaExpandida] = useState<string | null>(null);

  // Formulario Modal / Panel
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editandoDni, setEditandoDni] = useState<string | null>(null);
  const [dni, setDni] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [tele, setTele] = useState("");
  const [pass, setPass] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Sesión actual (leemos tanto 'user' como 'usuario')
  const usuarioRaw = sessionStorage.getItem("user") || sessionStorage.getItem("usuario");
  let usuarioSesion: any = null;
  try {
    usuarioSesion = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  } catch {
    usuarioSesion = null;
  }

  const rolSesion = (
    usuarioSesion?.type ||
    usuarioSesion?.rol ||
    usuarioSesion?.role ||
    usuarioSesion?.tipo ||
    ""
  ).toLowerCase();

  const esAdmin = rolSesion.includes("admin");

  const extraerLista = (resVal: any): any[] => {
    if (!resVal) return [];
    if (Array.isArray(resVal)) return resVal;
    if (Array.isArray(resVal.data)) return resVal.data;
    return [];
  };

  const cargarUsuarios = async () => {
    try {
      setCargando(true);

      const [resUsuarios, resTecnicos, resAdmins, resOficinas, resEmpresas] =
        await Promise.allSettled([
          api("/usuarios").then((r) => (r.ok ? r.json() : [])),
          api("/tecnicos").catch(() => api("/tecnico")).then((r) => (r.ok ? r.json() : [])),
          api("/admins").catch(() => api("/admin")).then((r) => (r.ok ? r.json() : [])),
          api("/oficinas").catch(() => api("/oficina")).then((r) => (r.ok ? r.json() : [])),
          api("/empresas").catch(() => api("/empresa")).then((r) => (r.ok ? r.json() : [])),
        ]);

      const listaU: UsuarioItem[] =
        resUsuarios.status === "fulfilled" ? extraerLista(resUsuarios.value) : [];

      const listaT: UsuarioItem[] =
        resTecnicos.status === "fulfilled" ? extraerLista(resTecnicos.value) : [];

      const listaA: UsuarioItem[] =
        resAdmins.status === "fulfilled" ? extraerLista(resAdmins.value) : [];

      const listaOfi: any[] =
        resOficinas.status === "fulfilled" ? extraerLista(resOficinas.value) : [];

      const listaEmp: any[] =
        resEmpresas.status === "fulfilled" ? extraerLista(resEmpresas.value) : [];

      // Deducir el ID de la empresa activa a partir de las oficinas del usuario
      let idEmpresaActiva: number | null = null;
      if (listaOfi.length > 0) {
        const primeraOfi = listaOfi[0];
        const valEmp = primeraOfi.empresa?.id ?? primeraOfi.empresa_id ?? primeraOfi.empresa;
        if (valEmp !== undefined && valEmp !== null && !isNaN(Number(valEmp))) {
          idEmpresaActiva = Number(valEmp);
        }
      }

      // Si tenemos el ID, buscar el nombre de la empresa en /empresas
      let nombreEmpresaActiva = "";
      if (idEmpresaActiva !== null && listaEmp.length > 0) {
        const empEncontrada = listaEmp.find((e: any) => Number(e.id) === idEmpresaActiva);
        if (empEncontrada) {
          nombreEmpresaActiva = (empEncontrada.razonSocial || empEncontrada.nombre || "").toLowerCase().trim();
        }
      }

      // Si el logueado es admin, su propio nombre nos da una pauta segura de la empresa
      if (esAdmin && usuarioSesion?.name) {
        nombreEmpresaActiva = usuarioSesion.name.toLowerCase().replace(/\d+$/, "").trim();
      }

      // Filtrar los Administradores para mostrar TODOS los que pertenezcan a la empresa activa
      const adminsDeMiEmpresa = listaA.filter((a: any) => {
        const aDni = String(a.dni || "");
        const aNombre = String(a.name || "").toLowerCase().trim();

        // 1. Si el usuario logueado es este mismo admin
        if (usuarioSesion?.dni && aDni === String(usuarioSesion.dni)) {
          return true;
        }

        // 2. Si coincide el nombre/razón social (ej: 'Umbrella' en 'Umbrella1')
        if (nombreEmpresaActiva && (aNombre.includes(nombreEmpresaActiva) || nombreEmpresaActiva.includes(aNombre.replace(/\d+$/, "")))) {
          return true;
        }

        // 3. Si el ID de empresa coincide con la terminación del DNI o nombre (convención multi-empresa)
        if (idEmpresaActiva !== null) {
          if (aDni.endsWith(String(idEmpresaActiva)) || aNombre.endsWith(String(idEmpresaActiva))) {
            return true;
          }
        }

        // 4. Si el objeto admin viniera con la empresa poblada
        const empId = a.empresa?.id ?? a.empresa_id ?? (typeof a.empresa === "number" ? a.empresa : null);
        if (idEmpresaActiva !== null && empId !== null && Number(empId) === idEmpresaActiva) {
          return true;
        }

        return false;
      });

      // Asegurar que si el logueado es Admin siempre figure en la nómina
      if (esAdmin && usuarioSesion && !adminsDeMiEmpresa.some((a) => String(a.dni) === String(usuarioSesion.dni))) {
        adminsDeMiEmpresa.push({
          dni: usuarioSesion.dni || "00000000",
          name: usuarioSesion.name || "Administrador",
          surName: usuarioSesion.surName || "",
          mail: usuarioSesion.mail || usuarioSesion.email,
          tele: usuarioSesion.tele,
          type: "ADMIN",
        });
      }

      // Normalizar roles
      const normU = listaU.map((u) => ({ ...u, type: "USER" }));
      const normT = listaT.map((t) => ({ ...t, type: "TECNICO" }));
      const normA = adminsDeMiEmpresa.map((a) => ({ ...a, type: "ADMIN" }));

      // Unificar por DNI
      const mapa = new Map<string, UsuarioItem>();
      [...normU, ...normT, ...normA].forEach((item) => {
        if (item.dni) {
          mapa.set(String(item.dni), item);
        }
      });

      setUsuarios(Array.from(mapa.values()));
    } catch (err) {
      console.error("Error al cargar la nómina de usuarios:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const limpiarFormulario = () => {
    setEditandoDni(null);
    setDni("");
    setName("");
    setSurName("");
    setTele("");
    setPass("");
    setMostrarModal(false);
  };

  const toggleFila = (dniUser: string) => {
    setFilaExpandida((prev) => (prev === dniUser ? null : dniUser));
  };

  const handleEditar = (u: UsuarioItem) => {
    if (!esAdmin) return;
    setEditandoDni(u.dni);
    setDni(u.dni);
    setName(u.name || "");
    setSurName(u.surName || "");
    setTele(u.tele || "");
    setPass("");
    setMostrarModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esAdmin) return;

    if (!editandoDni && dni.trim().length < 8) {
      alert("El DNI debe contener al menos 8 números.");
      return;
    }

    try {
      setGuardando(true);

      if (editandoDni) {
        const payload = {
          name: name.trim(),
          surName: surName.trim(),
          tele: tele.trim(),
        };

        const res = await api(`/usuarios/${editandoDni}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Error al actualizar el usuario");
        }
      } else {
        const payload = {
          dni: dni.trim(),
          name: name.trim(),
          surName: surName.trim(),
          tele: tele.trim(),
          pass: pass.trim(),
        };

        const res = await api("/usuarios", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Error al registrar el usuario");
        }
      }

      limpiarFormulario();
      await cargarUsuarios();
    } catch (err: any) {
      alert(err.message || "Error al procesar la solicitud");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (dniEliminar: string) => {
    if (!esAdmin) return;
    if (!window.confirm(`¿Confirmás la eliminación del usuario con DNI ${dniEliminar}?`)) return;
    try {
      const res = await api(`/usuarios/${dniEliminar}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error al eliminar el usuario");
      }
      setFilaExpandida(null);
      await cargarUsuarios();
    } catch (err: any) {
      alert(err.message || "Error al eliminar");
    }
  };

  const usuariosFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();

    return usuarios.filter((u) => {
      const rolUpper = (u.type || u.rol || "USER").toUpperCase();

      if (filtroRol !== "TODOS") {
        if (filtroRol === "ADMIN" && !rolUpper.includes("ADMIN")) return false;
        if (filtroRol === "TECNICO" && !rolUpper.includes("TEC")) return false;
        if (filtroRol === "USER" && (rolUpper.includes("ADMIN") || rolUpper.includes("TEC"))) return false;
      }

      if (!q) return true;

      const coincideDni = u.dni?.toLowerCase().includes(q);
      const coincideNombre = u.name?.toLowerCase().includes(q);
      const coincideApellido = u.surName?.toLowerCase().includes(q);
      const coincideMail = u.mail?.toLowerCase().includes(q);

      return coincideDni || coincideNombre || coincideApellido || coincideMail;
    });
  }, [usuarios, busqueda, filtroRol]);

  const renderBadgeRol = (tipoRaw?: string) => {
    const tipo = (tipoRaw || "USER").toUpperCase();

    if (tipo.includes("ADMIN")) {
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          Admin
        </span>
      );
    }
    if (tipo.includes("TEC")) {
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Técnico
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
        Usuario
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Nómina de Personal</h1>
          <p className="text-sm text-slate-500">
            {esAdmin
              ? "Visualizá y administrá los accesos de la nómina de personal"
              : "Consulta de usuarios, técnicos y administradores de la empresa"}
          </p>
        </div>

        {/* Botón de crear usuario: Exclusivo para Administradores */}
        {esAdmin && (
          <button
            onClick={() => {
              limpiarFormulario();
              setMostrarModal(true);
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-sm font-semibold flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]"
          >
            <span className="text-xl leading-none font-bold">+</span>
            <span className="text-base tracking-wide">Cargar Nuevo Usuario</span>
          </button>
        )}

        {/* Modal / Formulario: Solo si es Admin */}
        {esAdmin && mostrarModal && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800">
              {editandoDni ? `Modificar Usuario (DNI: ${editandoDni})` : "Registrar Nuevo Usuario"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    DNI
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!!editandoDni}
                    value={dni}
                    onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
                    placeholder="Solo números (mínimo 8)"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    required
                    value={tele}
                    onChange={(e) => setTele(e.target.value)}
                    placeholder="Ej: +543415551234 o 3415551234"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    required
                    value={surName}
                    onChange={(e) => setSurName(e.target.value)}
                    placeholder="Apellido"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                {!editandoDni && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                      Contraseña Temporal
                    </label>
                    <input
                      type="password"
                      required
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={limpiarFormulario}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50"
                >
                  {guardando ? "Guardando..." : editandoDni ? "Guardar Cambios" : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Buscador y Filtro */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por DNI, nombre, apellido..."
            className="flex-1 w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />

          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
            >
              <option value="TODOS">Todos los roles</option>
              <option value="ADMIN">Administradores</option>
              <option value="TECNICO">Técnicos</option>
              <option value="USER">Usuarios estándar</option>
            </select>

            <button
              onClick={cargarUsuarios}
              className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition"
            >
              Refrescar
            </button>
          </div>
        </div>

        {/* Tabla desplegable */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {cargando ? (
            <p className="p-8 text-center text-slate-500 text-sm">Cargando nómina...</p>
          ) : usuariosFiltrados.length === 0 ? (
            <p className="p-8 text-center text-slate-500 text-sm">
              No se encontraron usuarios registrados.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-bold text-slate-500 uppercase bg-slate-50 select-none">
                <div className="col-span-3">DNI</div>
                <div className="col-span-6">Nombre y Apellido</div>
                <div className="col-span-3 text-right">Rol</div>
              </div>

              {usuariosFiltrados.map((u) => {
                const abierta = filaExpandida === u.dni;
                const filaEsAdmin = (u.type || u.rol || "").toUpperCase().includes("ADMIN");

                return (
                  <div key={u.dni} className="transition-colors">
                    <div
                      onClick={() => toggleFila(u.dni)}
                      className={`grid grid-cols-12 px-5 py-3.5 items-center cursor-pointer select-none transition ${
                        abierta ? "bg-blue-50/40" : "hover:bg-slate-50/80"
                      }`}
                    >
                      <div className="col-span-3 font-mono font-semibold text-slate-700 text-sm flex items-center gap-2">
                        <span
                          className={`text-xs text-slate-400 transform transition-transform ${
                            abierta ? "rotate-90 text-blue-600" : ""
                          }`}
                        >
                          ▶
                        </span>
                        {u.dni}
                      </div>
                      <div className="col-span-6 font-medium text-slate-800 text-sm">
                        {u.name} {u.surName || ""}
                      </div>
                      <div className="col-span-3 text-right">
                        {renderBadgeRol(u.type || u.rol)}
                      </div>
                    </div>

                    {/* Detalle desplegado */}
                    {abierta && (
                      <div className="px-6 py-4 bg-slate-50/70 border-t border-b border-slate-100 text-sm space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                            <span className="block text-[11px] font-semibold text-slate-400 uppercase">
                              Correo Electrónico
                            </span>
                            <span className="font-mono text-xs text-slate-700">
                              {u.mail || "Generado automáticamente"}
                            </span>
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                            <span className="block text-[11px] font-semibold text-slate-400 uppercase">
                              Teléfono de Contacto
                            </span>
                            <span className="text-slate-700">{u.tele || "No especificado"}</span>
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                            <span className="block text-[11px] font-semibold text-slate-400 uppercase">
                              Oficina Asignada
                            </span>
                            <span className="text-slate-700">
                              {u.oficina?.nombre || "Sin oficina"}
                            </span>
                          </div>
                        </div>

                        {/* Botones de acción: Exclusivos para Admin */}
                        {esAdmin && (
                          <div className="flex justify-end items-center gap-2 pt-2">
                            {filaEsAdmin ? (
                              <span className="text-xs text-slate-400 italic">
                                * La gestión de administradores solo puede realizarla Super Admin
                              </span>
                            ) : (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditar(u);
                                  }}
                                  className="px-3.5 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-100 transition"
                                >
                                  Editar Datos
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEliminar(u.dni);
                                  }}
                                  className="px-3.5 py-1.5 text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-xl hover:bg-rose-100 transition"
                                >
                                  Eliminar Usuario
                                </button>
                              </>
                            )}
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