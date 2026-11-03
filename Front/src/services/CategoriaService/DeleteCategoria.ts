import {api} from '../api';
import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from '../MessageService/ToastService';

export const deleteCategoria = async (categoriaId: number): Promise<IApiResponse<null>|undefined> => {
    const response = await api<IApiResponse<null>>(`/categorias/${categoriaId}`, {method: "DELETE"});
    if(response)Notify.success(response.message!);
    return response;
};