import {api} from '../api';
 
export const CambiarPrioridad = async (ticketId: string | number, nuevaPrioridadId: number | string) => {
    const response = await api(`/tickets/${ticketId}/priority`, {
        method: "PATCH",
        body: JSON.stringify({
            prioridad: Number(nuevaPrioridadId)
        })
    });

    if (!response.ok) {
        throw new Error("Error al cambiar la prioridad del ticket:"+(JSON.stringify((await response.json()).errors)));
    }

    return await response.json();
}