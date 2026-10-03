import { api } from "../api.ts";

export interface ActualizarTicketData {
  estado?: string | number;
  resolucion?: string;
  [key: string]: any;
}

export const actualizarTicket = async (id: string | number, data: ActualizarTicketData) => {
  try {
    const response = await api(`/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Error al actualizar el ticket");
    }

    return resData;
  } catch (error) {
    console.error("Error actualizando ticket:", error);
    throw error;
  }
};