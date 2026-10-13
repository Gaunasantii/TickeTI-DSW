import { api } from "../api";

export interface ICrearAsignacionRequest {
  ticket: number;  // Debe ser número
  tecnico: string; // Debe ser texto (ej. DNI o ID en string)
}

export const crearAsignacion = async (data: ICrearAsignacionRequest) => {
  const res = await api("/asignaciones", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al crear la asignación");
  }

  return await res.json();
};