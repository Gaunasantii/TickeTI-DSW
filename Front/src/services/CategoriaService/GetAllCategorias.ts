import {api} from "../../services/api";
import type { IApiResponse } from "../../responses/IApiResponse";
import type { CategoriaModel } from "../../models/categoria.model";

export const getAllCategorias = async ():Promise<IApiResponse<CategoriaModel[]>> => {
    const response = await api<IApiResponse<CategoriaModel[]>>("/categorias", { method: "GET" });
    return response;
};