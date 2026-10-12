import {api} from "../api";
import type { ICreateEstadoRequest } from "../../requests/ICreateEstadoRequest";

import type { IApiResponse } from "../../responses/IApiResponse";

export const createEstado = async (estadoData: ICreateEstadoRequest): Promise<IApiResponse<null>> => {
    const response = await api(`/estados`, {method: "POST", body: JSON.stringify(estadoData)});

    if(!response.ok) {
        throw new Error("Error creando el estado:" + (await response.json()).errors);
    }

    return await response.json();
};