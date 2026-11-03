import { api } from "../api.ts"
import { IApiResponse } from "../../responses/IApiResponse.ts";
import { IOficina } from "../../models/oficina.model.ts";

export const ListarOficinas = async ():Promise<IApiResponse<IOficina[]>|undefined> => {
    const response = await api<IApiResponse<IOficina[]>>("oficinas", { method: "GET" });

    return response;
}