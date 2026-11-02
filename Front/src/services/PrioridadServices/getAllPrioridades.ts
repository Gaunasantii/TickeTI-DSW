import { api } from "../api";
import type { prioridadModel } from "../../models/prioridad.model";
import type { IApiResponse } from "../../responses/IApiResponse";


export const getAllPrioridades = async (): Promise<IApiResponse<prioridadModel[]>> => {
    const response = await api<IApiResponse<prioridadModel[]>>("/prioridad",{method: "GET"});
    return response;
};