import { IPaginadoParams } from '../../interfaces/IPaginado.params';
import {api} from '../api';

export const getCategoriaPaginated = async (params:IPaginadoParams)=>{
    const query = new URLSearchParams({
        page: params.pagina.toString(),
        cantPerPage: params.cantidad.toString()
    }).toString();
    const response = await api(`/categorias/paginated?${query}`, {method: "GET"});

    if(!response.ok) {
        throw new Error("Error obteniendo las categorías paginadas:" + (await response.json()).errors);
    }

    return await response.json();
}