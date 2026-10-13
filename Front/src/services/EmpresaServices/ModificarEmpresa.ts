import { IModifyEmpresaRequest } from '../../requests/IModifyEmpresaRequest';
import { IApiResponse } from '../../responses/IApiResponse';
import {api} from '../api';

export const modificarEmpresa = async (data: IModifyEmpresaRequest):Promise<IApiResponse<null>> =>{
    const response=await api(`/empresas/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });

    if(!response.ok){
        throw new Error("Error al modificar la empresa:" + JSON.stringify((await response.json()).errors));
    }

    return await response.json();
} 