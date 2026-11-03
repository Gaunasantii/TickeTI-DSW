import React, { useEffect } from "react";
import AsignacionList from "./components/AsignacionList";
import { abandonarAsignacion } from "../../services/AsignacionServices/AbandonarAsignacion";
import { asignacionModel } from "../../models/asignacion.model";
import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IMeta } from "../../responses/IPaginatedApiResponse";
import { obtenerMisAsignaciones } from "../../services/AsignacionServices/ObtenerMisAsignaciones";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { resolverTicket } from "../../services/TicketServices/ResolverTicket";
import { getAllEstados } from "../../services/EstadoServices/GetAllEstados";
import { getAllCategorias } from "../../services/CategoriaService/GetAllCategorias";
import { estadoModel } from "../../models/estado.model";
import { CategoriaModel } from "../../models/categoria.model";
import { Pagination } from "../../components/Pagination";
import { CambiarCategoria } from "../../services/TicketServices/CambiarCategoria";
import { filterIntermediateStates } from "../../helpers/FilterEstadosIntermedios";

const MisAsignacionesPage:React.FC=()=>{
    const[asignaciones, setAsignaciones] = React.useState<asignacionModel[]>([]);
    const [paginadoParams, setPaginadoParams] = React.useState<IPaginadoParams>({pagina: 1, cantidad: 10});
    const [meta, setMeta] = React.useState<IMeta|null>(null);
    const [estados, setEstados] = React.useState<estadoModel[]>([]);
    const [categorias, setCategorias] = React.useState<CategoriaModel[]>([]);
    const [cargando, setCargando] = React.useState<boolean>(false);

    const cargarAsignaciones = async (params: IPaginadoParams) => {
        setCargando(true);
            const response = await obtenerMisAsignaciones(params);
            if(!response){
                setCargando(false);
                return;
            }
            setAsignaciones(response.data);
            setMeta(response.meta);
        setCargando(false);
    }

    const handleResolver = async (ticketId: number|string, solucion: string) => {
            await resolverTicket(ticketId, solucion);
            cargarAsignaciones(paginadoParams);
    }

    const handleCambiarCategoria = async (ticketId: string | number, nuevaCategoriaId: number | string) => {
            await CambiarCategoria(ticketId, nuevaCategoriaId);
            cargarAsignaciones(paginadoParams);
    };

    const handleAbandonar = async (asignacionId: number|string) => {
            await abandonarAsignacion(asignacionId);
            cargarAsignaciones(paginadoParams);
            alert("Asignación abandonada correctamente");
    }

    const cargarEstados = async () => {
          const lista = await getAllEstados();
          if(!lista){
            setEstados([]);
            return;
          }
          setEstados(filterIntermediateStates(lista.data) || []);
      };
    
      const cargarCategorias = async () => {
          const lista = await getAllCategorias();
          if(!lista){
            setCategorias([]);
            return;
          }
          setCategorias(lista.data || []);
      };

    useEffect(() => {
        cargarAsignaciones(paginadoParams);
    }, [paginadoParams]);

    useEffect(() => {
        cargarEstados();
        cargarCategorias();
    }, []);

    return (
        <>
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Mis asignaciones pendientes</h1>
                <p className="text-sm text-slate-500">
                    Supervisión y control de todas las incidencias registradas en la empresa
                </p>
            </div>
            <div className="space-y-6">

                {meta && meta.totalItems > meta.itemsPerPage && (
                        <Pagination
                          cantidad={meta.totalItems}
                          cantidadVisible={meta.itemsPerPage}
                          paginaActual={meta.currentPage}
                          totalPaginas={meta.totalPages}
                          onAnterior={() => cargarAsignaciones({ ...paginadoParams, pagina: Math.max(meta.currentPage - 1, 1) })}
                          onSiguiente={() => cargarAsignaciones({ ...paginadoParams, pagina: Math.min(meta.currentPage + 1, meta.totalPages) })}
                        />
                      )}

                <AsignacionList cargando={cargando} categorias={categorias} estados={estados} onChangeCategoriaTicket={handleCambiarCategoria} asignaciones={asignaciones} onResolver={handleResolver} onAbandonar={handleAbandonar}>
                </AsignacionList>

                {meta && meta.totalItems > meta.itemsPerPage && (
                        <Pagination
                          cantidad={meta.totalItems}
                          cantidadVisible={meta.itemsPerPage}
                          paginaActual={meta.currentPage}
                          totalPaginas={meta.totalPages}
                          onAnterior={() => cargarAsignaciones({ ...paginadoParams, pagina: Math.max(meta.currentPage - 1, 1) })}
                          onSiguiente={() => cargarAsignaciones({ ...paginadoParams, pagina: Math.min(meta.currentPage + 1, meta.totalPages) })}
                        />
                      )}
            </div>
        </div>
        </>
    );
}

export default MisAsignacionesPage;