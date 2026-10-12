import { ICreatePersonRequest } from "../../requests/ICreatePersonRequest";
import { IApiResponse } from "../../responses/IApiResponse";
import {api} from "../api";

export const CreateTecnico=async(data:ICreatePersonRequest):Promise<IApiResponse<null>>=>{
    const response = await api("/tecnicos", {method: "POST", body: JSON.stringify(data)});

    if(!response.ok){
        throw new Error("Error al crear tecnico:"+(await response.json()).errors);
    }

    return await response.json();
}