import { api } from "../api";

export interface CreateUsuarioInput {
  dni: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  mail?: string;
  contrasenia?: string;
  oficina?: number | string;
}

export const crearUsuario = async (data: CreateUsuarioInput) => {
  const payload: any = {
    ...data,
    dni: String(data.dni).trim(),
    oficina: data.oficina ? Number(data.oficina) : undefined,
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