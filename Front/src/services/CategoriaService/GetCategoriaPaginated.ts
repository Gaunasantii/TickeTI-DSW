import { IPaginadoParams } from '../../interfaces/IPaginado.params';
import { CategoriaModel } from '../../models/categoria.model';
import { IPaginatedApiResponse } from '../../responses/IPaginatedApiResponse';
import {api} from '../api';

export const getCategoriaPaginated = async (params:IPaginadoParams):Promise<IPaginatedApiResponse<CategoriaModel>>=>{
    const query = new URLSearchParams({
        page: params.pagina.toString(),
        cantPerPage: params.cantidad.toString()
    }).toString();
    const response = await api<IPaginatedApiResponse<CategoriaModel>>(`/categorias/paginated?${query}`, {method: "GET"});

    return response;
}