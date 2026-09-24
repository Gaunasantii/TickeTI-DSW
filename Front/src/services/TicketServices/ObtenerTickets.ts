import { api } from "../api.ts";

export const obtenerTickets = async () => {
  try {
    const response = await api("/tickets", { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener los tickets");
    }

    return data;
  } catch (error) {
    console.error("Error obteniendo tickets:", error);
    throw error;
  }
};