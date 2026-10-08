import { api } from "../api";

export interface CrearTicketInput {
  title: string;
  description: string;
  estado?: number | string;
  prioridad?: number | string;
  categoria: number | string;
  usuario: string;
}

export const crearTicket = async (data: CrearTicketInput) => {
  const payload = {
    title: data.title.trim(),
    description: data.description.trim(),
    estado: Number(data.estado ?? 1),
    prioridad: Number(data.prioridad ?? 1),
    categoria: Number(data.categoria),
    usuario: String(data.usuario).trim(),
  };

  const res = await api("/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al crear el ticket");
  }

  return await res.json();
};