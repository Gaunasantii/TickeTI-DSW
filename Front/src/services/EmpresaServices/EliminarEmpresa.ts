import type { IApiResponse } from "../../responses/IApiResponse";
import { api } from "../api";
import { Notify } from "../MessageService/ToastService";

export const eliminarEmpresa = async (id: string | number): Promise<IApiResponse<null>> => {
  const res = await api<IApiResponse<null>>(`/empresas/${id}`, {
    method: "DELETE",
  });

  Notify.success(res.message!);
  return res;
};