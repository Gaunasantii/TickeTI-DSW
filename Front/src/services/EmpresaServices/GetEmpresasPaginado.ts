import { IPaginadoParams } from "../../interfaces/IPaginado.params.ts";
import { EmpresaPaginatedModel } from "../../models/empresaPaginated.model.ts";
import { IPaginatedApiResponse } from "../../responses/IPaginatedApiResponse.ts";
import { api } from "../api.ts";

export const ObtenerEmpresasPaginated = async (params: IPaginadoParams): Promise<IPaginatedApiResponse<EmpresaPaginatedModel>> => {
    try {
        const urlParams = new URLSearchParams({
            page: params.pagina.toString(),
            cantPerPage: params.cantidad.toString()
        });
        const response = await api(`/empresas?${urlParams.toString()}`, { method: "GET" });

        

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}