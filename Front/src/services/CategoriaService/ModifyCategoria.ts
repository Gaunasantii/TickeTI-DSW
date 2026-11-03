import {api} from '../api';
import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";

import { IModifyCategoriaRequest } from "../../requests/IModifyCategoriaRequest";

export const modifyCategoria = async (categoriaId: number, categoriaData: IModifyCategoriaRequest): Promise<IApiResponse<null>|undefined> => {
    const response = await api<IApiResponse<null>>(`/categorias/${categoriaId}`, {method: "PUT", body: JSON.stringify(categoriaData)});
    if(response)Notify.success(response.message!);
    return response;
};