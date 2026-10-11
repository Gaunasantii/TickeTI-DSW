import {api} from '../api';

import { IModifyCategoriaRequest } from "../../requests/IModifyCategoriaRequest";

export const modifyCategoria = async (categoriaId: number, categoriaData: IModifyCategoriaRequest) => {
    const response = await api(`/categorias/${categoriaId}`, {method: "PUT", body: JSON.stringify(categoriaData)});

    if(!response.ok) {
        throw new Error("Error modificando la categoría:" + (await response.json()).errors);
    }

    return await response.json();
};