import {api} from "../api"
import { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";
export const eliminarOficina = async (id: number): Promise<IApiResponse<null>|undefined> => {
  const res = await api<IApiResponse<null>>(`/oficinas/${id}`, { method: "DELETE" });
  if(res)Notify.success(res.message!);
  return res
};