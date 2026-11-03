import {api} from '../api'
import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";
export const abandonarAsignacion = async(id:number|string):Promise<IApiResponse<null>|undefined>=>{
    const response = await api<IApiResponse<null>>(`/Mis-asignaciones/${id}/abandonar`, {
        method: 'POST'
    });
    if(response)Notify.success(response.message!);
    return response;
}
