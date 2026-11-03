import { ICreateEmpresaRequest } from "../../requests/ICreateEmpresaRequest.ts";
import { api } from "../api.ts";
import type { IApiResponse } from "../../responses/IApiResponse.ts";
import { Notify } from "../MessageService/ToastService.ts";

export const AgregarEmpresa = async (empresa:ICreateEmpresaRequest):Promise<IApiResponse<null>|undefined>=>{
        const response = await api<IApiResponse<null>>("/empresas",{method:"POST", body: JSON.stringify(empresa)});
        if(response)Notify.success(response.message!);
        return response;
    
}