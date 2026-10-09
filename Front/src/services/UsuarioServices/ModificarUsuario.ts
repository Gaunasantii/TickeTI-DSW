import { api } from "../api";
import type { IModifyPersonRequest } from "../../requests/IModifyPersonRequest";


export const modificarUsuario = async (dni: string | number, data: IModifyPersonRequest) => {

  const res = await api(`/usuarios/${dni}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error al actualizar el usuario");
  }

  return await res.json();
};