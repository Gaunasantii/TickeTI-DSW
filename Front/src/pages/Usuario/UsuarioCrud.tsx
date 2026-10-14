import React, { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { ListarOficinas } from "../../services/OficinaService/ListarOficina";
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
import { TecnicoForm } from "./components/UsuarioCrud/TecnicoForm";
import { IModifyUserRequest } from "../../requests/IModifyUserRequest";
import { IOficina } from "../../models/oficina.model";
import { CreateTecnico } from "../../services/TecnicoServices/CreateTecnico";
import { eliminarTecnico } from "../../services/TecnicoServices/DeleteTecnico";
import { modificarTecnico } from "../../services/TecnicoServices/UpdateTecnico";
import { useAuth } from "../../context/AuthContext";

export const UsuarioCrudPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<personaPaginatedModel[]>([]);
  const [oficinas, setOficinas] = useState<IOficina[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filaExpandida, setFilaExpandida] = useState<string | null>(null);
  const [paramsPaginado, setParamsPaginado] = useState({
    pagina: 1,
    cantidad: 10,
  });
  const [meta, setMeta] = useState<IMeta>({} as IMeta);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoFormulario, setTipoFormulario] = useState<'usuario' | 'tecnico' | null>(null);
  const [editandoDni, setEditandoDni] = useState<string | null>(null);
  const [newUserData, setNewUserData] = useState<ICreatePersonRequest>({} as ICreatePersonRequest);
  const [updatedUserData, setUpdatedUserData] = useState<IModifyPersonRequest | IModifyUserRequest>({} as IModifyPersonRequest);
  const [guardando, setGuardando] = useState(false);
  const {isAdmin} = useAuth();

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
    if(!isAdmin) return;
    try {
      setGuardando(true);
      if (tipoFormulario === 'tecnico') {
        await modificarTecnico(editandoDni!, updatedUserData);
      } else {
        await modificarUsuario(editandoDni!, updatedUserData as IModifyUserRequest);
      };
      setMostrarModal(false);
      setEditandoDni(null);
    } catch (err: any) {
      console.error("Error al actualizar el usuario:", err);
      alert(err.message || "Error al actualizar el usuario");
    } finally {
      setGuardando(false);
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      setGuardando(true);
      if (tipoFormulario === 'tecnico') {
        await CreateTecnico(newUserData);
      } else {
        await crearUsuario(newUserData);
      }
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
    setTipoFormulario('usuario');
    setMostrarModal(true);
  };

  const handleNuevoTecnico = () => {
    setEditandoDni(null);
    setNewUserData({} as ICreatePersonRequest);
    setTipoFormulario('tecnico')
    setMostrarModal(true);
  };

  const deleteUsuario = async (usuario:personaPaginatedModel) => {
    if(!isAdmin) return;
    const esTecnico=usuario.type.toLowerCase() === 'tecnico';
    try {
      setGuardando(true);
      if (esTecnico) {
        await eliminarTecnico(usuario.dni);
      } else {
        await eliminarUsuario(usuario.dni);
      }
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
      setTipoFormulario(usuario.type === 'tecnico' ? 'tecnico' : 'usuario'); 
      setMostrarModal(true);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <ListaUsuariosHeader esAdmin={isAdmin} onNuevoUsuario={handleNuevoUsuario} onNuevoTecnico={handleNuevoTecnico} onRefresh={cargarUsuarios} />
        {isAdmin && mostrarModal && tipoFormulario === 'usuario' && (
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
        {isAdmin && mostrarModal && tipoFormulario === 'tecnico' && (
          <TecnicoForm
            editandoDni={editandoDni}
            formData={editandoDni ? updatedUserData : newUserData}
            guardando={guardando}
            onSubmit={editandoDni ? HandleUpdateSubmit : handleCreateSubmit} // Depende de si manejas endpoints diferentes
            onChange={handleChange}
            onCancel={() => setMostrarModal(false)}
          />
        )}

        <UsuariosTable
          usuarios={usuarios}
          cargando={cargando}
          filaExpandida={filaExpandida}
          esAdmin={isAdmin}
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
              </>
  );
};

export default UsuarioCrudPage;
