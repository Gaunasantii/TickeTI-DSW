import {api} from "../api";
import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";

import { ICreateCategoriaRequest } from "../../requests/ICreateCategoriaRequest";

export const createCategoria = async (categoriaData: ICreateCategoriaRequest): Promise<IApiResponse<null>|undefined> => {
    const response = await api<IApiResponse<null>>("/categorias", {method: "POST", body: JSON.stringify(categoriaData)});
    if(response)Notify.success(response.message!);
    return response;
};