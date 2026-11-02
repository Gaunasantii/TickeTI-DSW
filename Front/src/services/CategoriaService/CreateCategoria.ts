import {api} from "../api";
import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";

import { ICreateCategoriaRequest } from "../../requests/ICreateCategoriaRequest";

export const createCategoria = async (categoriaData: ICreateCategoriaRequest): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>("/categorias", {method: "POST", body: JSON.stringify(categoriaData)});
    Notify.success(response.message!);
    return response;
};