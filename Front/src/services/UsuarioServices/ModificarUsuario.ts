import { api } from "../api";
import { IModifyUserRequest } from "../../requests/IModifyUserRequest";


export const modificarUsuario = async (dni: string | number, data: IModifyUserRequest) => {

  const payload = {...data,oficina:Number(data.oficina)}

  const res = await api(`/usuarios/${dni}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar el usuario:"+ (await res.json()).errors);
  }

  return await res.json();
};