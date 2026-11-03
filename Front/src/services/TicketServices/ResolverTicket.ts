import { IApiResponse } from '../../responses/IApiResponse';
import {api} from '../api'
import { Notify } from '../MessageService/ToastService';

export const resolverTicket = async (ticketId: number|string, solucion: string): Promise<IApiResponse<null>|undefined> => {
    const response = await api<IApiResponse<null>>(`/tickets/${ticketId}/resolve`, {method: 'PATCH', body: JSON.stringify({solucion:solucion})});

    if(response)Notify.success(response.message!);
    return response;
}
