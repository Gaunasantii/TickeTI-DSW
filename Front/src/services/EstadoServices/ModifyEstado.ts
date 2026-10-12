import {api} from "../api";
import type { IModifyEstadoRequest } from "../../requests/IModifyEstadoRequest";

import type { IApiResponse } from "../../responses/IApiResponse";

export const modifyEstado = async (estadoId: number, estadoData: IModifyEstadoRequest): Promise<IApiResponse<null>> => {
    const response = await api(`/estados/${estadoId}`, {method: "PUT", body: JSON.stringify(estadoData)});

    if(!response.ok) {
        throw new Error("Error modificando el estado:" + (await response.json()).errors);
    }

    return await response.json();
};