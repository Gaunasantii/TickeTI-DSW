import { IPaginadoParams } from "../../interfaces/IPaginado.params.ts";
import { PersonModel } from "../../models/person.model.ts";
import { IPaginatedApiResponse } from "../../responses/IPaginatedApiResponse.ts";
import { api } from "../api.ts";

export const obtenerUsuariosYTecnicosPaginado = async (params:IPaginadoParams):Promise<IPaginatedApiResponse<PersonModel>> =>{
    try{
        const urlParams= new URLSearchParams({
            page: params.pagina.toString(),
            cantPerPage: params.cantidad.toString()
        });
        const response = await api(`/usuarios-tecnicos?${urlParams.toString()}`,{method:"GET"});
        return await response.json();
    }catch(error){
        console.error(error);
        throw error;
    }
}