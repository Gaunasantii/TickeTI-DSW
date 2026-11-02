import { api } from "../api";
import { oficinaPaginated } from "../../models/oficinaPaginated.model";
import { IPaginadoParams } from "../../interfaces/IPaginado.params";
import { IPaginatedApiResponse } from "../../responses/IPaginatedApiResponse";

export const listarOficinasPaginado = async (paginadoParams: IPaginadoParams): Promise<IPaginatedApiResponse<oficinaPaginated>> => {
    const query = new URLSearchParams({
      page: paginadoParams.pagina.toString(),
      cantPerPage: paginadoParams.cantidad.toString(),
    }).toString();
  const res = await api<IPaginatedApiResponse<oficinaPaginated>>(`/oficinas/paginated?${query}`);
  return res;
};