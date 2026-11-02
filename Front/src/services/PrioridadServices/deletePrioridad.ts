import { api } from "../api";
import {IApiResponse} from "../../responses/IApiResponse"
import { Notify } from "../MessageService/ToastService";

export const borrarPrioridad = async (id: number):Promise<IApiResponse<null>> =>{
    const response = await api<IApiResponse<null>>(`/prioridad/${id}`,{method: "DELETE"});
    Notify.success(response.message!);
    return response;
}