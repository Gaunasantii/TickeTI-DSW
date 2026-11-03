import { api } from "../api";
import {IApiResponse} from "../../responses/IApiResponse";

import type { estadoModel } from "../../models/estado.model";

export const getAllEstados = async ():Promise<IApiResponse<estadoModel[]>|undefined> => {
    const res = await api<IApiResponse<estadoModel[]>>("/estados",{method: "GET"});
    return res;
}