import {api} from '../api'

export const resolverTicket = async (ticketId: number|string, solucion: string) => {
    const response = await api(`/tickets/${ticketId}/resolve`, {method: 'PATCH', body: JSON.stringify({solucion:solucion})});

    if(!response.ok) {
        throw new Error('Error al resolver el ticket');
    }

    return await response.json();
}
