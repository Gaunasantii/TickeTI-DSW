import { api } from "../api.ts"

export const crearTicket = async (ticketData: any) => {
  try {
    const response = await api("/tickets", { method: "POST", body: JSON.stringify(ticketData) });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al Crear ticket");
    }

    return data;
  } catch (error) {
    console.error('Error creando ticket:', error);
    throw error;
  }
}