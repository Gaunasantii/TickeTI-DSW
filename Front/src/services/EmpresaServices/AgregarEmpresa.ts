import { ICreateEmpresaRequest } from "../../requests/ICreateEmpresaRequest.ts";
import { api } from "../api.ts";

export const AgregarEmpresa = async (empresa:ICreateEmpresaRequest)=>{
    try {
        const response = await api("/empresa",{method:"POST", body: JSON.stringify(empresa)});
        return await response.json();
    } catch (error) {
        console.error("Error al agregar empresa:", error);
        throw error;
    }
}