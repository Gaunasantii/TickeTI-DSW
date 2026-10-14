import { IPaginadoParams } from '../../interfaces/IPaginado.params';
import {api} from '../api'

export const obtenerMisAsignaciones = async (params:IPaginadoParams) => {
    const queryParams=new URLSearchParams({
        page: params.pagina.toString(),
        cantPerPage: params.cantidad.toString()
    });
    const response=await api(`/Mis-asignaciones/pendientes?${queryParams.toString()}`, { method: 'GET' });

    if(!response.ok){
        throw new Error('Error al obtener mis asignaciones:'+JSON.stringify((await response.json()).errors));
    }

    return await response.json();
};