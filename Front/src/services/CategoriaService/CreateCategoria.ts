import {api} from "../api";

import { ICreateCategoriaRequest } from "../../requests/ICreateCategoriaRequest";

export const createCategoria = async (categoriaData: ICreateCategoriaRequest) => {
    const response = await api("/categorias", {method: "POST", body: JSON.stringify(categoriaData)});

    if(!response.ok) {
        throw new Error("Error creando la categoría:" + (await response.json()).errors);
    }

    return await response.json();
};