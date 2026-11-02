import {api} from '../api';
import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from '../MessageService/ToastService';

export const deleteCategoria = async (categoriaId: number): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`/categorias/${categoriaId}`, {method: "DELETE"});
    Notify.success(response.message!);
    return response;
};