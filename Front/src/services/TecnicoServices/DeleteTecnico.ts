import { IApiResponse } from "../../responses/IApiResponse";
import {api} from "../api"; 
import { Notify } from "../MessageService/ToastService";

export const eliminarTecnico = async (dni: string):Promise<IApiResponse<null>|undefined> => {
    const response = await api<IApiResponse<null>>(`/tecnicos/${dni}`,{method: "DELETE"});
    if(response)Notify.success(response.message!);
    return response;
};