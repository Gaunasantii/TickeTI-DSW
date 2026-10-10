import { prioridadModel } from "../../models/prioridad.model";
import { ICreatePrioridadRequest } from "../../requests/ICreatePrioridadRequest";
import { IApiResponse } from "../../responses/IApiResponse";
import { api } from "../api";

export const createPrioridad=async(data: ICreatePrioridadRequest):Promise<IApiResponse<prioridadModel>>=>{
    const res= await api("/prioridad",{method:"POST",body: JSON.stringify(data)})
    if(!res.ok){
        throw new Error("Error al crear la prioridad");
    }
    return res.json();
}