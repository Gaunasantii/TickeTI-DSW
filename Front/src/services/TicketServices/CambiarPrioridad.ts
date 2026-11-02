import {api} from '../api';
import type { IApiResponse } from '../../responses/IApiResponse';
import {Notify} from '../MessageService/ToastService';
 
export const CambiarPrioridad = async (ticketId: string | number, nuevaPrioridadId: number | string): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`/tickets/${ticketId}/priority`, {
        method: "PATCH",
        body: JSON.stringify({
            prioridad: Number(nuevaPrioridadId)
        })
    });

    Notify.success(response.message!);
    return response;
}