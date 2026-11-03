import type { IApiResponse } from "../../responses/IApiResponse";
import { api } from "../api";
import { Notify } from "../MessageService/ToastService";

export const eliminarEmpresa = async (id: string | number): Promise<IApiResponse<null>|undefined> => {
  const res = await api<IApiResponse<null>>(`/empresas/${id}`, {
    method: "DELETE",
  });

  if(res)Notify.success(res.message!);
  return res;
};