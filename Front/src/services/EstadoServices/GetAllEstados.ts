import { api } from "../api";
import {IApiResponse} from "../../responses/IApiResponse";

import type { estadoModel } from "../../models/estado.model";

export const getAllEstados = async ():Promise<IApiResponse<estadoModel[]>> => {
    const res = await api("/estados",{method: "GET"});
    const json = await res.json();
    if(!res.ok)throw new Error("Error al obtener los estados");
    return json;
}