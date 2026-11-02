import {api} from '../api';
import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";

import { IModifyCategoriaRequest } from "../../requests/IModifyCategoriaRequest";

export const modifyCategoria = async (categoriaId: number, categoriaData: IModifyCategoriaRequest): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`/categorias/${categoriaId}`, {method: "PUT", body: JSON.stringify(categoriaData)});
    Notify.success(response.message!);
    return response;
};