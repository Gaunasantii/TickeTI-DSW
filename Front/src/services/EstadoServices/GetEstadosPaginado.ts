import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IPaginatedApiResponse } from "../../responses/IPaginatedApiResponse";
import {api} from "../api";
import type { estadoModel } from "../../models/estado.model";

export const getEstadosPaginado= async(params:IPaginadoParams): Promise<IPaginatedApiResponse<estadoModel>>=>{
    const urlParams= new URLSearchParams({
        page: params.pagina.toString(),
        cantPerPage: params.cantidad.toString()
    });
    const response = await api<IPaginatedApiResponse<estadoModel>>(`/estados/paginated?${urlParams.toString()}`,{method: 'GET'});
    return response;
}