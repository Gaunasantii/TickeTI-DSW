import { api } from "../api";
import {IApiResponse} from "../../responses/IApiResponse"
import { Notify } from "../MessageService/ToastService";

export const borrarPrioridad = async (id: number):Promise<IApiResponse<null>|undefined> =>{
    const response = await api<IApiResponse<null>>(`/prioridad/${id}`,{method: "DELETE"});
    if(response)Notify.success(response.message!);
    return response;
}