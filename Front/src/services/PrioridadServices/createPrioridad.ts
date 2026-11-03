import { prioridadModel } from "../../models/prioridad.model";
import { ICreatePrioridadRequest } from "../../requests/ICreatePrioridadRequest";
import { IApiResponse } from "../../responses/IApiResponse";
import { api } from "../api";
import { Notify } from "../MessageService/ToastService";

export const createPrioridad=async(data: ICreatePrioridadRequest):Promise<IApiResponse<prioridadModel>|undefined>=>{
    const res= await api<IApiResponse<prioridadModel>>("/prioridad",{method:"POST",body: JSON.stringify({...data,tiempoLimiteResolucion: Number(data.tiempoLimiteResolucion)})})
    if(res)Notify.success(res.message!);
    return res;
}