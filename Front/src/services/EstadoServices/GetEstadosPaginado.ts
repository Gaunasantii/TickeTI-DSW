import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IPaginatedApiResponse } from "../../responses/IPaginatedApiResponse";
import {api} from "../api";
import type { estadoModel } from "../../models/estado.model";

export const getEstadosPaginado= async(params:IPaginadoParams): Promise<IPaginatedApiResponse<estadoModel>>=>{
    const urlParams= new URLSearchParams({
        page: params.pagina.toString(),
        cantPerPage: params.cantidad.toString()
    });
    const response = await api(`/estados/paginated?${urlParams.toString()}`,{method: 'GET'});
    
    if(!response.ok){
        throw new Error(`Error fetching paginated estados: ${(await response.json()).errors}`);
    }
    return await response.json();
}