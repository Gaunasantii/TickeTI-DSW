import { IModifyEmpresaRequest } from '../../requests/IModifyEmpresaRequest';
import { IApiResponse } from '../../responses/IApiResponse';
import {api} from '../api';
import { Notify } from '../MessageService/ToastService';

export const modificarEmpresa = async (data: IModifyEmpresaRequest):Promise<IApiResponse<null>|undefined> =>{
    const response=await api<IApiResponse<null>>(`/empresas/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });

    if(response)Notify.success(response.message!);

    return response;
} 