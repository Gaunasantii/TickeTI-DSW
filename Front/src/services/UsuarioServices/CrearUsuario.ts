import { api } from "../api";
import type { ICreatePersonRequest } from "../../requests/ICreatePersonRequest";

export const crearUsuario = async (data: ICreatePersonRequest) => {
  const payload: any = {
    ...data,
    dni: String(data.dni).trim(),
    oficina: Number(data.oficina)
  };

  const res = await api("/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error al crear el usuario");
  }

  return await res.json();
};