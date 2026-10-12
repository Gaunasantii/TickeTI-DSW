import { IApiResponse } from "../../responses/IApiResponse";
import {api} from "../api"; 

export const eliminarTecnico = async (dni: string):Promise<IApiResponse<null>> => {
    const response = await api(`/tecnicos/${dni}`,{method: "DELETE"});
    
    if(!response.ok){
        throw new Error("Error al eliminar el técnico:"+(await response.json()).errors);
    }

    return await response.json();
};