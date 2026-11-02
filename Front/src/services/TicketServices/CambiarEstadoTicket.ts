import { api } from "../api";
import type { IApiResponse } from '../../responses/IApiResponse';
import { Notify } from '../MessageService/ToastService';

export const cambiarEstadoTicket = async (ticketId: string | number, nuevoEstadoId: number | string): Promise<IApiResponse<null>> => {
  const res = await api<IApiResponse<null>>(`/tickets/${ticketId}/state`, {
    method: "PATCH",
    body: JSON.stringify({
      estado: Number(nuevoEstadoId),
    }),
  });

  Notify.success(res.message!);
  return res;
};