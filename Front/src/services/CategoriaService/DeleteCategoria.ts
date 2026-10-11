import {api} from '../api';

export const deleteCategoria = async (categoriaId: number) => {
    const response = await api(`/categorias/${categoriaId}`, {method: "DELETE"});

    if(!response.ok) {
        throw new Error("Error eliminando la categoría:" + (await response.json()).errors);
    }

    return await response.json();
};