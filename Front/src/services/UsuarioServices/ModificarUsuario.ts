import { api } from "../api";

export interface ModifyUsuarioInput {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  oficina?: number | string | null;
}

export const modificarUsuario = async (dni: string | number, data: ModifyUsuarioInput) => {
  const payload: any = {
    ...data,
    oficina: data.oficina !== undefined && data.oficina !== "" ? Number(data.oficina) : null,
  };

  const res = await api(`/usuarios/${dni}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error al actualizar el usuario");
  }

  return await res.json();
};