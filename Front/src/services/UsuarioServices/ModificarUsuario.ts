import { api } from "../api";
import { IModifyUserRequest } from "../../requests/IModifyUserRequest";
import { IApiResponse } from "../../responses/IApiResponse";
import { Notify } from "../MessageService/ToastService";


export const modificarUsuario = async (dni: string | number, data: IModifyUserRequest): Promise<IApiResponse<null>|undefined> => {

  const payload = {...data,oficina:Number(data.oficina)}

  const res = await api<IApiResponse<null>>(`/usuarios/${dni}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if(res)Notify.success(res.message!);

  return res;
};