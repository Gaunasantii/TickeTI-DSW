import { IPaginadoParams } from '../../interfaces/IPaginado.params';
import {api} from '../api'
import type { IApiResponse } from "../../responses/IApiResponse";
import { IPaginatedApiResponse } from '../../responses/IPaginatedApiResponse';
import type { asignacionModel } from '../../models/asignacion.model';

export const obtenerMisAsignaciones = async (params:IPaginadoParams):Promise<IPaginatedApiResponse<asignacionModel>> => {
    const queryParams=new URLSearchParams({
        page: params.pagina.toString(),
        cantPerPage: params.cantidad.toString()
    });
    const response=await api<IPaginatedApiResponse<asignacionModel>>(`/Mis-asignaciones/pendientes?${queryParams.toString()}`, { method: 'GET' });

    return response;
};