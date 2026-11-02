import { IApiResponse } from "../../responses/IApiResponse";
import {api} from "../api";
import { Notify } from "../MessageService/ToastService";

export const deleteEstado = async (estadoId: number):Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`/estados/${estadoId}`, {method: "DELETE"});
    Notify.success(response.message!);
    return response;
};