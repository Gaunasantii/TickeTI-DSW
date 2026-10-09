import {api} from "../../services/api";
import type { IApiResponse } from "../../responses/IApiResponse";
import type { CategoriaModel } from "../../models/categoria.model";

export const getAllCategorias = async ():Promise<IApiResponse<CategoriaModel[]>> => {
    const response = await api("/categorias", { method: "GET" });
    const json = await response.json();
    if(!response.ok) throw new Error("Error al obtener las categorías");
    return json;
};