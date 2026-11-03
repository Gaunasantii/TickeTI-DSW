import { IPaginadoParams } from "../../interfaces/IPaginado.params.ts";
import { PersonModel } from "../../models/person.model.ts";
import { personaPaginatedModel } from "../../models/personPaginated.model.ts";
import { IPaginatedApiResponse } from "../../responses/IPaginatedApiResponse.ts";
import { api } from "../api.ts";

export const obtenerUsuariosYTecnicosPaginado = async (params:IPaginadoParams):Promise<IPaginatedApiResponse<personaPaginatedModel>|undefined> =>{
        const urlParams= new URLSearchParams({
            page: params.pagina.toString(),
            cantPerPage: params.cantidad.toString()
        });
        const response = await api<IPaginatedApiResponse<personaPaginatedModel>>(`/persons/paginate?${urlParams.toString()}`,{method:"GET"});
        return response;
}