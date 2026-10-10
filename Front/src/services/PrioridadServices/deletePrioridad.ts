import { api } from "../api";
import {IApiResponse} from "../../responses/IApiResponse"

export const borrarPrioridad = async (id: number):Promise<IApiResponse<null>> =>{
    const response = await api(`/prioridad/${id}`,{method: "DELETE"});

    if(!response.ok){
        throw new Error("Error al eliminar la prioridad:" + (await response.json()).errors);
    }

    return await response.json();
}