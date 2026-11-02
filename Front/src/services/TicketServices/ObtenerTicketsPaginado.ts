import {api} from '../api';
import { IPaginatedApiResponse } from '../../responses/IPaginatedApiResponse';
import { ticketPaginatedModel } from '../../models/ticket.model';
import { IObtenerTicketsParams } from '../../interfaces/IObtenerTickets.params';

export const obtenerTicketsPaginado = async (params: IObtenerTicketsParams): Promise<IPaginatedApiResponse<ticketPaginatedModel>> => {
        const paramsUrl= new URLSearchParams({
            page: params.pagina.toString(),
            cantPerPage: params.cantidad.toString(),
            ...(params.estado ? { estado: params.estado.toString() } : {}),
            ...(params.categoria ? { categoria: params.categoria.toString() } : {})
        });
        const response=await api<IPaginatedApiResponse<ticketPaginatedModel>>(`/tickets/paginated?${paramsUrl.toString()}`,{method:"GET"});
        return response;
}