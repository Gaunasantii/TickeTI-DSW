import { api } from "../api";
import type { IApiResponse } from "../../responses/IApiResponse";
import { ICreateAsignacionRequest } from "../../requests/ICreateAsignacionRequest"; 
import { Notify } from "../MessageService/ToastService";

export const crearAsignacion = async (data: ICreateAsignacionRequest): Promise<IApiResponse<null>|undefined> => {
  const res = await api<IApiResponse<null>>("/asignaciones", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if(res)Notify.success(res.message!);
  return res;
};