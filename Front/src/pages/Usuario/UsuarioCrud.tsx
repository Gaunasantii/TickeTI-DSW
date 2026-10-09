import React, { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { ListarOficinas } from "../../services/OficinaService/ListarOficina";
import type { OficinaItem, UsuarioItem } from "../../types/usuarios";
import { ListaUsuariosHeader } from "./components/UsuarioCrud/ListaUsuariosHeader";
import { UsuarioForm } from "./components/UsuarioCrud/UsuarioForm";
import { UsuariosTable } from "./components/UsuarioCrud/UsuariosTable";
import {ICreatePersonRequest} from "../../requests/ICreatePersonRequest";
import type {IModifyPersonRequest} from "../../requests/IModifyPersonRequest";
import { personaPaginatedModel } from "../../models/personPaginated.model";
import { obtenerUsuariosYTecnicosPaginado } from "../../services/PersonService/ObtenerUsuariosYTecnicosPaginado";
import { eliminarUsuario } from "../../services/UsuarioServices/EliminarUsuario";
import { Pagination } from "../../components/Pagination";
import type {IMeta} from "../../responses/IPaginatedApiResponse"
import { modificarUsuario } from "../../services/UsuarioServices/ModificarUsuario";
import { crearUsuario } from "../../services/UsuarioServices/CrearUsuario";

export const UsuarioCrudPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<personaPaginatedModel[]>([]);
  const [oficinas, setOficinas] = useState<OficinaItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filaExpandida, setFilaExpandida] = useState<string | null>(null);
  const [paramsPaginado, setParamsPaginado] = useState({
    pagina: 1,
    cantidad: 10,
  });
  const [meta, setMeta] = useState<IMeta>({} as IMeta);

  // Formulario rápido para Admin
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editandoDni, setEditandoDni] = useState<string | null>(null);
  const [newUserData, setNewUserData] = useState<ICreatePersonRequest>({} as ICreatePersonRequest);
  const [updatedUserData, setUpdatedUserData] = useState<IModifyPersonRequest>({} as IModifyPersonRequest);
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

  const cargarUsuarios=async ()=>{
    try {
      const res= await obtenerUsuariosYTecnicosPaginado(paramsPaginado)
      setUsuarios(res.data || [])
      setMeta(res.meta || {});
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    } finally {
      setCargando(false);
    }
  }

  const cargarOficinas = async () => {
    try {
      const res = await ListarOficinas();
      setOficinas(res.data || []);
    } catch (err) {
      console.error("Error al cargar oficinas:", err);
    }
  };

  useEffect(() => {
    setCargando(true);
    cargarUsuarios();
    cargarOficinas();
  }, []);

  useEffect(()=>{
    cargarUsuarios();
  }, [paramsPaginado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editandoDni) {
      setUpdatedUserData({ ...updatedUserData, [name]: value });
    } else {
      setNewUserData({ ...newUserData, [name]: value });
    }
  };

  const HandleUpdateSubmit=async(e:React.FormEvent) => {
    e.preventDefault();
    if(!esAdmin) return;
    try {
      setGuardando(true);
      await modificarUsuario(editandoDni!, updatedUserData);
      setMostrarModal(false);
      setEditandoDni(null);
    } catch (err: any) {
      alert(err.message || "Error al actualizar el usuario");
    } finally {
      setGuardando(false);
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      setGuardando(true);
      console.log(newUserData);
      await crearUsuario(newUserData);
      setMostrarModal(false);
      setNewUserData({} as ICreatePersonRequest);
    }catch(err: any){
      alert(err.message || "Error al crear el usuario");
    }finally{
      setGuardando(false);
    }
  }

  const handleNuevoUsuario = () => {
    setEditandoDni(null);
    setNewUserData({} as ICreatePersonRequest);
    setMostrarModal(true);
  };

  const deleteUsuario = async (dni: string) => {
    if(!esAdmin) return;
    try {
      setGuardando(true);
      await eliminarUsuario(dni);
      cargarUsuarios();
    } catch (err: any) {
      alert(err.message || "Error al eliminar el usuario");
    } finally {
      setGuardando(false);
    }
  };

  const handleEditar = (usuario: personaPaginatedModel) => {
    if (usuario) {
      setEditandoDni(usuario.dni);
      setUpdatedUserData(usuario);
      setMostrarModal(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ListaUsuariosHeader esAdmin={esAdmin} onNuevoUsuario={handleNuevoUsuario} onRefresh={cargarUsuarios} />
        {console.log(usuarios)}
        {esAdmin && mostrarModal && (
          <UsuarioForm
            editandoDni={editandoDni}
            formData={editandoDni ? updatedUserData : newUserData}
            oficinas={oficinas}
            guardando={guardando}
            onSubmit={editandoDni ? HandleUpdateSubmit : handleCreateSubmit}
            onChange={handleChange}
            onCancel={() => setMostrarModal(false)}
          />
        )}

        <UsuariosTable
          usuarios={usuarios}
          cargando={cargando}
          filaExpandida={filaExpandida}
          esAdmin={esAdmin}
          onToggle={(dniUsuario, abierta) => setFilaExpandida(abierta ? null : dniUsuario)}
          onEditar={handleEditar}
          onEliminar={deleteUsuario}
        />
      </div>

      {meta.totalItems > meta.itemsPerPage && (
              <Pagination
                cantidad={meta.totalItems}
                cantidadVisible={meta.itemsPerPage}
                paginaActual={meta.currentPage}
                totalPaginas={meta.totalPages}
                onAnterior={() => {
                  setParamsPaginado({ ...paramsPaginado, pagina: Math.max(meta.currentPage - 1, 1) });
                }}
                onSiguiente={() => {
                  setParamsPaginado({ ...paramsPaginado, pagina: Math.min(meta.currentPage + 1, meta.totalPages) });
                }}
              />
            )}
      
    </DashboardLayout>//Reemplazar y usar reactLayout
  );
};

export default UsuarioCrudPage;
