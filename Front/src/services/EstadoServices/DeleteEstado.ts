import { IApiResponse } from "../../responses/IApiResponse";
import {api} from "../api";
import { Notify } from "../MessageService/ToastService";

export const deleteEstado = async (estadoId: number):Promise<IApiResponse<null>|undefined> => {
    const response = await api<IApiResponse<null>>(`/estados/${estadoId}`, {method: "DELETE"});
    if(response)Notify.success(response.message!);
    return response;
};