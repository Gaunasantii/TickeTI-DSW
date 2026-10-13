import { ICreateEmpresaRequest } from "../../requests/ICreateEmpresaRequest.ts";
import { api } from "../api.ts";

export const AgregarEmpresa = async (empresa:ICreateEmpresaRequest)=>{
        const response = await api("/empresas",{method:"POST", body: JSON.stringify(empresa)});

        if(!response.ok){
            throw new Error("Error al agregar empresa:"+(JSON.stringify((await response.json()).errors)));
        }

        return await response.json();
    
}