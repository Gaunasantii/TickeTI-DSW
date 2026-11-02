import { IApiResponse } from '../../responses/IApiResponse';
import {api} from '../api';
import {Notify} from '../MessageService/ToastService';

export const eliminarMiTicket = async (ticketId: number|string):Promise<IApiResponse<null>> => {
  const response= await api<IApiResponse<null>>(`/My-tickets/${ticketId}`,{
    method: 'DELETE'
  });
  Notify.success(response.message!);
  return response;
  
};