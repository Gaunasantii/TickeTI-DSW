import { api } from "../api";
import type { prioridadModel } from "../../models/prioridad.model";
import type { IApiResponse } from "../../responses/IApiResponse";


export const getAllPrioridades = async (): Promise<IApiResponse<prioridadModel[]>> => {
    const response = await api("/prioridad",{method: "GET"});
    const json = await response.json();
    if(!response.ok) {
        throw new Error("Error al obtener prioridades");
    }
    return json;
};