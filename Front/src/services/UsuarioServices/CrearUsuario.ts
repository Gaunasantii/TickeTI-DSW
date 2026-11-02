import { api } from "../api";
import type { ICreatePersonRequest } from "../../requests/ICreatePersonRequest";
import type { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";

export const crearUsuario = async (data: ICreatePersonRequest): Promise<IApiResponse<null>> => {
  const payload: any = {
    ...data,
    dni: String(data.dni).trim(),
    oficina: Number(data.oficina)
  };

  const res = await api<IApiResponse<null>>("/usuarios", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  Notify.success(res.message!);

  return res;
};