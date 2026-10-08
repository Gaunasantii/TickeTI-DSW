import {api} from '../api';
import { IPaginatedApiResponse } from '../../responses/IPaginatedApiResponse';
import { ticketPaginatedModel } from '../../models/ticket.model';
import { IObtenerTicketsParams } from '../../interfaces/IObtenerTickets.params';

export const obtenerMisTickets = async (params: IObtenerTicketsParams): Promise<IPaginatedApiResponse<ticketPaginatedModel>> => {
    try{
        const paramsUrl= new URLSearchParams({
            page: params.pagina.toString(),
            cantPerPage: params.cantidad.toString(),
            ...(params.estado !== undefined ? { estado: params.estado.toString() } : {}),
            ...(params.categoria !== undefined ? { categoria: params.categoria.toString() } : {})
        });
        const response=await api(`/My-tickets/paginated?${paramsUrl.toString()}`,{method:"GET"});
        return await response.json();
    }catch(error){
        console.error(error);
        throw error;
    }
}