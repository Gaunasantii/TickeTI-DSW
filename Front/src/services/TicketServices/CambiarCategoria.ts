import {api} from '../api';
import type { IApiResponse } from '../../responses/IApiResponse';
import {Notify} from '../MessageService/ToastService';

export const CambiarCategoria = async (ticketId: string | number, nuevaCategoriaId: number | string): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`/tickets/${ticketId}/categoria`, {
        method: "PATCH",
        body: JSON.stringify({
            categoria: Number(nuevaCategoriaId)
        })
    });

    Notify.success(response.message!);
    return response;
}