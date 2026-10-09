import { IPaginadoParams } from "../../interfaces/IPaginado.params.ts";
import { PersonModel } from "../../models/person.model.ts";
import { personaPaginatedModel } from "../../models/personPaginated.model.ts";
import { IPaginatedApiResponse } from "../../responses/IPaginatedApiResponse.ts";
import { api } from "../api.ts";

export const obtenerUsuariosYTecnicosPaginado = async (params:IPaginadoParams):Promise<IPaginatedApiResponse<personaPaginatedModel>> =>{
    try{
        const urlParams= new URLSearchParams({
            page: params.pagina.toString(),
            cantPerPage: params.cantidad.toString()
        });
        const response = await api(`/persons/paginate?${urlParams.toString()}`,{method:"GET"});
        return await response.json();
    }catch(error){
        console.error(error);
        throw error;
    }
}