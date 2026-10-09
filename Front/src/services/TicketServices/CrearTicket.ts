import { api } from "../api";
import type { ICreateTicketRequest } from "../../requests/ICreateTicketRequest";

export const crearTicket = async (data: ICreateTicketRequest) => {
  const payload = {
    title: data.title.trim(),
    description: data.description.trim(),
    prioridad: Number(data.prioridad),
    categoria: Number(data.categoria),
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