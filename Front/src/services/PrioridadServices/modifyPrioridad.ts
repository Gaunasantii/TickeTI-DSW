import {api} from "../api";
import { Notify } from "../MessageService/ToastService";

import { IModifyPrioridadRequest } from "../../requests/IModifyPrioridadRequest";
import { IApiResponse } from "../../responses/IApiResponse";

export const modificarPrioridad = async (data: IModifyPrioridadRequest):Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`/prioridad/${data.id}`, {method: "PUT", body: JSON.stringify({nombre: data.nombre, tiempoLimiteResolucion: Number(data.tiempoLimiteResolucion)})});
    Notify.success(response.message!);
    return response;
}