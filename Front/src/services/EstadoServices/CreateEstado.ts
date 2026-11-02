import {api} from "../api";
import type { ICreateEstadoRequest } from "../../requests/ICreateEstadoRequest";

import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";

export const createEstado = async (estadoData: ICreateEstadoRequest): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`/estados`, {method: "POST", body: JSON.stringify(estadoData)});
    Notify.success(response.message!);
    return response;
};