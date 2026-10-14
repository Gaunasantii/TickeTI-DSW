import {api} from "../api";

import { IModifyPrioridadRequest } from "../../requests/IModifyPrioridadRequest";
import { IApiResponse } from "../../responses/IApiResponse";

export const modificarPrioridad = async (data: IModifyPrioridadRequest):Promise<IApiResponse<null>> => {
    const response = await api(`/prioridad/${data.id}`, {method: "PUT", body: JSON.stringify({nombre: data.nombre, tiempoLimiteResolucion: Number(data.tiempoLimiteResolucion)})});
    if (!response.ok) {
        throw new Error("Error al modificar la prioridad:" + (await response.json()).errors);
    }
    return await response.json();
}