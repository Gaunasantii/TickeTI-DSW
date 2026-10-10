import { api } from "../api";
import { IPaginadoParams } from "../../interfaces/IPaginado.params"
import { IPaginatedApiResponse } from "../../responses/IPaginatedApiResponse";
import { prioridadModel } from "../../models/prioridad.model";

export const getPrioridadesPaginated = async (params: IPaginadoParams):Promise<IPaginatedApiResponse<prioridadModel>> => {
    const urlParams= new URLSearchParams({
        page: params.pagina.toString(),
        cantPerPage: params.cantidad.toString()
    });
    const response = await api(`/prioridad/paginated?${urlParams.toString()}`,{method: 'GET'});
    
    if(!response.ok){
        throw new Error(`Error fetching paginated prioridades: ${(await response.json()).errors}`);
    }
    return await response.json();
}