import { api } from "../api";

export const cambiarEstadoTicket = async (ticketId: string | number, nuevoEstadoId: number | string) => {
  const res = await api(`/tickets/${ticketId}/state`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      estado: Number(nuevoEstadoId),
    }),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || "Error al actualizar el estado del ticket");
  }

  return await res.json();
};