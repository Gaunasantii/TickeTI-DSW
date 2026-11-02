import {api} from "../api";
import { Notify } from "../MessageService/ToastService";
import type { IModifyEstadoRequest } from "../../requests/IModifyEstadoRequest";

import type { IApiResponse } from "../../responses/IApiResponse";

export const modifyEstado = async (estadoId: number, estadoData: IModifyEstadoRequest): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`/estados/${estadoId}`, {method: "PUT", body: JSON.stringify(estadoData)});
    Notify.success(response.message!);
    return response;
};