import {api} from '../api';

export const CambiarCategoria = async (ticketId: string | number, nuevaCategoriaId: number | string) => {
    const response = await api(`/tickets/${ticketId}/categoria`, {
        method: "PATCH",
        body: JSON.stringify({
            categoria: Number(nuevaCategoriaId)
        })
    });

    if (!response.ok) {
        throw new Error("Error al cambiar la categoría del ticket:"+(JSON.stringify((await response.json()).errors)));
    }

    return await response.json();
}